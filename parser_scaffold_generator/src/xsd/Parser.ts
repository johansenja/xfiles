// This file is part of cxsd, copyright (c) 2015-2016 BusFaster Ltd.
// Released under the MIT license, see LICENSE.

import * as sax from "sax";
import * as Promise from "bluebird";

import { CacheResult } from "cget";
import { Rule } from "./Rule";

import * as types from "./types";
import { Context } from "./Context";
import { State } from "./State";
import { Namespace } from "./Namespace";
import { Loader } from "./Loader";
import { Source } from "./Source";
import { QName } from "./QName";

import * as util from "util";
import { Base } from "./types/Base";

/** Parse syntax rules encoded into handler classes. */

function parseRule(ctor: types.BaseClass, context: Context) {
  if (ctor.rule) return ctor.rule as Rule;

  var rule = new Rule(ctor);

  ctor.rule = rule;

  for (var baseFollower of ctor.mayContain()) {
    var follower = baseFollower as types.BaseClass;
    var followerName = new QName().parseClass(follower.name, context.xsdSpace);

    rule.followerTbl[followerName.nameFull] = parseRule(follower, context);
    rule.followerTbl[followerName.name] = parseRule(follower, context);
  }

  var obj = new ctor();

  for (var key of Object.keys(obj)) {
    rule.attributeList.push(key);
  }

  return rule;
}

export class Parser {
  constructor(context: Context) {
    this.context = context;
    this.rootRule = parseRule(types.Root, context);
  }

  startElement(
    state: State,
    name: string,
    attrTbl: sax.Tag["attributes"] | sax.QualifiedTag["attributes"]
  ) {
    var qName = this.qName;

    qName.parse(name, state.source, state.source.defaultNamespace);

    var rule = state.rule;

    if (rule) {
      rule =
        rule.followerTbl[qName.nameFull] ||
        rule.followerTbl[qName.name] ||
        rule.followerTbl["*"];
      // if(!rule) console.log('Unhandled child ' + state.rule.qName.nameFull + ' -> ' + qName.nameFull);
    }

    state = new State(state, rule);

    if (!rule || !rule.proto) return state;

    var xsdElem = new (rule.proto as types.BaseClass)(state);

    state.xsdElement = xsdElem;

    // Make all attributes lowercase.

    for (var key of Object.keys(attrTbl)) {
      var keyLower = key.toLowerCase();

      if (key != keyLower && !attrTbl.hasOwnProperty(keyLower)) {
        attrTbl[keyLower] = attrTbl[key];
      }
    }

    // Copy known attributes to XSD element.

    for (var key of rule.attributeList) {
      if (attrTbl.hasOwnProperty(key)) {
        (xsdElem as any)[key] = attrTbl[key];
      }
    }

    if (xsdElem.init) {
      state.attributeTbl = attrTbl;

      xsdElem.init(state);
    }

    return state;
  }

  init(cached: CacheResult, source: Source, loader: Loader) {
    var state = new State(null, this.rootRule, source);
    var importList: { namespace: Namespace; url: string }[] = [];

    var parser = sax.parser(true, { position: true });

    state.stateStatic = {
      context: this.context,

      addImport: (namespaceTarget: Namespace, urlRemote: string) => {
        importList.push({ namespace: namespaceTarget, url: urlRemote });
      },

      getLineNumber: () => {
        return parser.line + 1;
      },

      getBytePos: () => {
        return parser.position;
      },

      textDepth: 0,
      textHandlerList: [],
    };

    var stateStatic = state.stateStatic;
    var resolve: (result: Source[]) => void;
    var reject: (err: any) => void;

    var promise = new Promise<Source[]>((res, rej) => {
      resolve = res;
      reject = rej;
    });

    var stream = cached.stream;

    var pendingList = this.pendingList;

    parser.onopentag = (tag: sax.Tag | sax.QualifiedTag) => {
      // xml.on('opentag', (node: sax.Tag) => {
      // var name = node.name;
      // var attrTbl = node.attributes;

      try {
        state = this.startElement(state, tag.name, tag.attributes);
      } catch (err) {
        // Exceptions escaping from node-expat's event handlers cause weird effects.
        console.error(err);
        console.log("Stack:");
        console.error(err.stack);
      }
    };

    parser.onclosetag = function (name: string) {
      // xml.on('closetag', function() {
      if (state.xsdElement) {
        if (state.xsdElement.loaded) {
          state.xsdElement.loaded(state);
        }

        if (state.xsdElement.resolve) {
          // Schedule resolve hook to run after parsing is done.
          // It might depend on definitions in scope but appearing later,
          // and selectively postponing only hooks that cannot run yet
          // would be extremely complicated.

          pendingList.push(state);
        }
      }

      state = state.parent;
    };

    parser.ontext = function (text: string) {
      if (stateStatic.textDepth) {
        stateStatic.textHandlerList[stateStatic.textDepth - 1].addText(
          state,
          text
        );
      }
    };

    parser.onerror = function (err: any) {
      console.error(err);
    };

    // // Expat-specific handler.
    // stream.on("data", (data: Buffer) => {
    //   xml.parse(data, false);
    // });

    parser.onend = () => {
      // xml.on('end', () => {
      // Finish parsing the file (synchronous call).

      // xml.parse("", true); // Expat-specific line.

      resolve(
        importList.map((spec: { namespace: Namespace; url: string }) => {
          console.log(
            "IMPORT into " + spec.namespace.name + " from " + spec.url
          );
          return loader.importFile(spec.url, spec.namespace);
        })
      );
    };
    try {
      parser.write(stream.read());
    } finally {
      parser.close();
    }

    return promise;
  }

  /** Bind references, call after all imports have been initialized. */
  resolve() {
    for (var pos = 0; pos < this.pendingList.length; ++pos) {
      var state = this.pendingList[pos];
      try {
        state.xsdElement.resolve(state);
      } catch (err) {
        console.error(
          err +
            " on line " +
            state.xsdElement.lineNumber +
            " of " +
            state.source.url
        );
        console.log("Stack:");
        console.error(err.stack);
      }
    }

    this.pendingList = [];
  }

  private context: Context;

  /** Temporarily holds a qualified name, re-used to avoid allocating objects. */
  private qName = new QName();

  /** List of parser states still needing further processing
   * after previous stage is done. */
  private pendingList: State[] = [];

  /** Defines valid contents for the XML file root element. */
  private rootRule: Rule;
}
