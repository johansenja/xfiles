// This file is part of cxsd, copyright (c) 2015-2016 BusFaster Ltd.
// Released under the MIT license, see LICENSE.
import * as fs from "fs";
import { Address, FetchOptions, Cache, CacheResult, util } from "cget";

import { Context } from "./Context";
import { Namespace } from "./Namespace";
import { Source } from "./Source";
import { Parser } from "./Parser";

/** Loader handles caching schema definitions and calling parser stages. */

export class Loader {
  constructor(context: Context, options?: FetchOptions) {
    this.context = context;
    this.options = util.clone(options);
    this.parser = new Parser(context);
  }

  import(filePath: string) {
    this.source = this.importFile(filePath);
    return this.source.targetNamespace;
  }

  importFile(path: string, namespace?: Namespace) {
    var options = this.options;

    var source = Loader.sourceTbl[path];

    if (!source) {
      source = new Source(path, this.context, namespace);

      const xml = fs.readFileSync(path).toString();
      const dependencyList = this.parser.init(xml, source, this);

      // TODO: The source could be parsed already if all dependencies
      // (and recursively their dependencies) have been preprocessed.

      if (--this.pendingCount == 0) this.finish();

      Loader.sourceTbl[path] = source;
      ++this.pendingCount;
    }

    return source;
  }

  private finish() {
    this.parser.resolve();
  }

  getOptions() {
    return this.options;
  }

  private static cache = new Cache("cache/xsd", "_index.xsd");
  private static sourceTbl: { [path: string]: Source } = {};

  private context: Context;
  private options: FetchOptions;
  private parser: Parser;
  private source: Source;

  private pendingCount = 0;

  private resolve: (result: Namespace) => void;
  private reject: (err: any) => void;
}
