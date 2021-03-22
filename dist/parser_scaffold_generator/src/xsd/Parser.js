"use strict";
// This file is part of cxsd, copyright (c) 2015-2016 BusFaster Ltd.
// Released under the MIT license, see LICENSE.
Object.defineProperty(exports, "__esModule", { value: true });
exports.Parser = void 0;
var sax = require("sax");
var Rule_1 = require("./Rule");
var types = require("./types");
var State_1 = require("./State");
var QName_1 = require("./QName");
/** Parse syntax rules encoded into handler classes. */
function parseRule(ctor, context) {
    if (ctor.rule)
        return ctor.rule;
    var rule = new Rule_1.Rule(ctor);
    ctor.rule = rule;
    for (var _i = 0, _a = ctor.mayContain(); _i < _a.length; _i++) {
        var baseFollower = _a[_i];
        var follower = baseFollower;
        var followerName = new QName_1.QName().parseClass(follower.name, context.xsdSpace);
        rule.followerTbl[followerName.nameFull] = parseRule(follower, context);
        rule.followerTbl[followerName.name] = parseRule(follower, context);
    }
    var obj = new ctor();
    for (var _b = 0, _c = Object.keys(obj); _b < _c.length; _b++) {
        var key = _c[_b];
        rule.attributeList.push(key);
    }
    return rule;
}
var Parser = /** @class */ (function () {
    function Parser(context) {
        /** Temporarily holds a qualified name, re-used to avoid allocating objects. */
        this.qName = new QName_1.QName();
        /** List of parser states still needing further processing
         * after previous stage is done. */
        this.pendingList = [];
        this.context = context;
        this.rootRule = parseRule(types.Root, context);
    }
    Parser.prototype.startElement = function (state, name, attrTbl) {
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
        state = new State_1.State(state, rule);
        if (!rule || !rule.proto)
            return state;
        var xsdElem = new rule.proto(state);
        state.xsdElement = xsdElem;
        // Make all attributes lowercase.
        for (var _i = 0, _a = Object.keys(attrTbl); _i < _a.length; _i++) {
            var key = _a[_i];
            var keyLower = key.toLowerCase();
            if (key != keyLower && !attrTbl.hasOwnProperty(keyLower)) {
                attrTbl[keyLower] = attrTbl[key];
            }
        }
        // Copy known attributes to XSD element.
        for (var _b = 0, _c = rule.attributeList; _b < _c.length; _b++) {
            var key = _c[_b];
            if (attrTbl.hasOwnProperty(key)) {
                xsdElem[key] = attrTbl[key];
            }
        }
        if (xsdElem.init) {
            state.attributeTbl = attrTbl;
            xsdElem.init(state);
        }
        return state;
    };
    Parser.prototype.init = function (xml, source, loader) {
        var _this = this;
        var state = new State_1.State(null, this.rootRule, source);
        var importList = [];
        var parser = sax.parser(true, { position: true });
        state.stateStatic = {
            context: this.context,
            addImport: function (namespaceTarget, urlRemote) {
                importList.push({ namespace: namespaceTarget, url: urlRemote });
            },
            getLineNumber: function () {
                return parser.line + 1;
            },
            getBytePos: function () {
                return parser.position;
            },
            textDepth: 0,
            textHandlerList: [],
        };
        var stateStatic = state.stateStatic;
        var resolve;
        var reject;
        var promise = new Promise(function (res, rej) {
            resolve = res;
            reject = rej;
        });
        var pendingList = this.pendingList;
        parser.onopentag = function (tag) {
            // xml.on('opentag', (node: sax.Tag) => {
            // var name = node.name;
            // var attrTbl = node.attributes;
            try {
                state = _this.startElement(state, tag.name, tag.attributes);
            }
            catch (err) {
                // Exceptions escaping from node-expat's event handlers cause weird effects.
                console.error(err);
                console.log("Stack:");
                console.error(err.stack);
            }
        };
        parser.onclosetag = function (name) {
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
        parser.ontext = function (text) {
            if (stateStatic.textDepth) {
                stateStatic.textHandlerList[stateStatic.textDepth - 1].addText(state, text);
            }
        };
        parser.onerror = function (err) {
            console.log("here", parser.position, parser.tag);
            console.error(err);
        };
        // // Expat-specific handler.
        // stream.on("data", (data: Buffer) => {
        //   xml.parse(data, false);
        // });
        var fileList;
        parser.onend = function () {
            // xml.on('end', () => {
            // Finish parsing the file (synchronous call).
            // xml.parse("", true); // Expat-specific line.
            fileList = importList.map(function (spec) {
                console.log("IMPORT into " + spec.namespace.name + " from " + spec.url);
                return loader.importFile(spec.url, spec.namespace);
            });
        };
        parser.write(xml).close();
        return fileList;
    };
    /** Bind references, call after all imports have been initialized. */
    Parser.prototype.resolve = function () {
        for (var pos = 0; pos < this.pendingList.length; ++pos) {
            var state = this.pendingList[pos];
            try {
                state.xsdElement.resolve(state);
            }
            catch (err) {
                console.error(err +
                    " on line " +
                    state.xsdElement.lineNumber +
                    " of " +
                    state.source.url);
                console.log("Stack:");
                console.error(err.stack);
            }
        }
        this.pendingList = [];
    };
    return Parser;
}());
exports.Parser = Parser;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGFyc2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcGFyc2VyX3NjYWZmb2xkX2dlbmVyYXRvci9zcmMveHNkL1BhcnNlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsb0VBQW9FO0FBQ3BFLCtDQUErQzs7O0FBRS9DLHlCQUEyQjtBQUczQiwrQkFBOEI7QUFFOUIsK0JBQWlDO0FBRWpDLGlDQUFnQztBQUloQyxpQ0FBZ0M7QUFLaEMsdURBQXVEO0FBRXZELFNBQVMsU0FBUyxDQUFDLElBQXFCLEVBQUUsT0FBZ0I7SUFDeEQsSUFBSSxJQUFJLENBQUMsSUFBSTtRQUFFLE9BQU8sSUFBSSxDQUFDLElBQVksQ0FBQztJQUV4QyxJQUFJLElBQUksR0FBRyxJQUFJLFdBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUUxQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztJQUVqQixLQUF5QixVQUFpQixFQUFqQixLQUFBLElBQUksQ0FBQyxVQUFVLEVBQUUsRUFBakIsY0FBaUIsRUFBakIsSUFBaUIsRUFBRTtRQUF2QyxJQUFJLFlBQVksU0FBQTtRQUNuQixJQUFJLFFBQVEsR0FBRyxZQUErQixDQUFDO1FBQy9DLElBQUksWUFBWSxHQUFHLElBQUksYUFBSyxFQUFFLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBRTNFLElBQUksQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxRQUFRLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDdkUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEdBQUcsU0FBUyxDQUFDLFFBQVEsRUFBRSxPQUFPLENBQUMsQ0FBQztLQUNwRTtJQUVELElBQUksR0FBRyxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7SUFFckIsS0FBZ0IsVUFBZ0IsRUFBaEIsS0FBQSxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFoQixjQUFnQixFQUFoQixJQUFnQixFQUFFO1FBQTdCLElBQUksR0FBRyxTQUFBO1FBQ1YsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7S0FDOUI7SUFFRCxPQUFPLElBQUksQ0FBQztBQUNkLENBQUM7QUFFRDtJQUNFLGdCQUFZLE9BQWdCO1FBa001QiwrRUFBK0U7UUFDdkUsVUFBSyxHQUFHLElBQUksYUFBSyxFQUFFLENBQUM7UUFFNUI7MkNBQ21DO1FBQzNCLGdCQUFXLEdBQVksRUFBRSxDQUFDO1FBdE1oQyxJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztRQUN2QixJQUFJLENBQUMsUUFBUSxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQ2pELENBQUM7SUFFRCw2QkFBWSxHQUFaLFVBQ0UsS0FBWSxFQUNaLElBQVksRUFDWixPQUErRDtRQUUvRCxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBRXZCLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBRS9ELElBQUksSUFBSSxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUM7UUFFdEIsSUFBSSxJQUFJLEVBQUU7WUFDUixJQUFJO2dCQUNGLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQztvQkFDaEMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDO29CQUM1QixJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3hCLG1HQUFtRztTQUNwRztRQUVELEtBQUssR0FBRyxJQUFJLGFBQUssQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFFL0IsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLO1lBQUUsT0FBTyxLQUFLLENBQUM7UUFFdkMsSUFBSSxPQUFPLEdBQUcsSUFBSyxJQUFJLENBQUMsS0FBeUIsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUV6RCxLQUFLLENBQUMsVUFBVSxHQUFHLE9BQU8sQ0FBQztRQUUzQixpQ0FBaUM7UUFFakMsS0FBZ0IsVUFBb0IsRUFBcEIsS0FBQSxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFwQixjQUFvQixFQUFwQixJQUFvQixFQUFFO1lBQWpDLElBQUksR0FBRyxTQUFBO1lBQ1YsSUFBSSxRQUFRLEdBQUcsR0FBRyxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBRWpDLElBQUksR0FBRyxJQUFJLFFBQVEsSUFBSSxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLEVBQUU7Z0JBQ3hELE9BQU8sQ0FBQyxRQUFRLENBQUMsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDbEM7U0FDRjtRQUVELHdDQUF3QztRQUV4QyxLQUFnQixVQUFrQixFQUFsQixLQUFBLElBQUksQ0FBQyxhQUFhLEVBQWxCLGNBQWtCLEVBQWxCLElBQWtCLEVBQUU7WUFBL0IsSUFBSSxHQUFHLFNBQUE7WUFDVixJQUFJLE9BQU8sQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLEVBQUU7Z0JBQzlCLE9BQWUsQ0FBQyxHQUFHLENBQUMsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDdEM7U0FDRjtRQUVELElBQUksT0FBTyxDQUFDLElBQUksRUFBRTtZQUNoQixLQUFLLENBQUMsWUFBWSxHQUFHLE9BQU8sQ0FBQztZQUU3QixPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ3JCO1FBRUQsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDO0lBRUQscUJBQUksR0FBSixVQUFLLEdBQVcsRUFBRSxNQUFjLEVBQUUsTUFBYztRQUFoRCxpQkE2R0M7UUE1R0MsSUFBSSxLQUFLLEdBQUcsSUFBSSxhQUFLLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDbkQsSUFBSSxVQUFVLEdBQTRDLEVBQUUsQ0FBQztRQUU3RCxJQUFJLE1BQU0sR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO1FBRWxELEtBQUssQ0FBQyxXQUFXLEdBQUc7WUFDbEIsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPO1lBRXJCLFNBQVMsRUFBRSxVQUFDLGVBQTBCLEVBQUUsU0FBaUI7Z0JBQ3ZELFVBQVUsQ0FBQyxJQUFJLENBQUMsRUFBRSxTQUFTLEVBQUUsZUFBZSxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUUsQ0FBQyxDQUFDO1lBQ2xFLENBQUM7WUFFRCxhQUFhLEVBQUU7Z0JBQ2IsT0FBTyxNQUFNLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQztZQUN6QixDQUFDO1lBRUQsVUFBVSxFQUFFO2dCQUNWLE9BQU8sTUFBTSxDQUFDLFFBQVEsQ0FBQztZQUN6QixDQUFDO1lBRUQsU0FBUyxFQUFFLENBQUM7WUFDWixlQUFlLEVBQUUsRUFBRTtTQUNwQixDQUFDO1FBRUYsSUFBSSxXQUFXLEdBQUcsS0FBSyxDQUFDLFdBQVcsQ0FBQztRQUNwQyxJQUFJLE9BQW1DLENBQUM7UUFDeEMsSUFBSSxNQUEwQixDQUFDO1FBRS9CLElBQUksT0FBTyxHQUFHLElBQUksT0FBTyxDQUFXLFVBQUMsR0FBRyxFQUFFLEdBQUc7WUFDM0MsT0FBTyxHQUFHLEdBQUcsQ0FBQztZQUNkLE1BQU0sR0FBRyxHQUFHLENBQUM7UUFDZixDQUFDLENBQUMsQ0FBQztRQUVILElBQUksV0FBVyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUM7UUFFbkMsTUFBTSxDQUFDLFNBQVMsR0FBRyxVQUFDLEdBQStCO1lBQ2pELHlDQUF5QztZQUN6Qyx3QkFBd0I7WUFDeEIsaUNBQWlDO1lBRWpDLElBQUk7Z0JBQ0YsS0FBSyxHQUFHLEtBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDO2FBQzVEO1lBQUMsT0FBTyxHQUFHLEVBQUU7Z0JBQ1osNEVBQTRFO2dCQUM1RSxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUNuQixPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUN0QixPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUMxQjtRQUNILENBQUMsQ0FBQztRQUVGLE1BQU0sQ0FBQyxVQUFVLEdBQUcsVUFBVSxJQUFZO1lBQ3hDLGtDQUFrQztZQUNsQyxJQUFJLEtBQUssQ0FBQyxVQUFVLEVBQUU7Z0JBQ3BCLElBQUksS0FBSyxDQUFDLFVBQVUsQ0FBQyxNQUFNLEVBQUU7b0JBQzNCLEtBQUssQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO2lCQUNoQztnQkFFRCxJQUFJLEtBQUssQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFFO29CQUM1QixzREFBc0Q7b0JBQ3RELCtEQUErRDtvQkFDL0QsNERBQTREO29CQUM1RCxrQ0FBa0M7b0JBRWxDLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7aUJBQ3pCO2FBQ0Y7WUFFRCxLQUFLLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQztRQUN2QixDQUFDLENBQUM7UUFFRixNQUFNLENBQUMsTUFBTSxHQUFHLFVBQVUsSUFBWTtZQUNwQyxJQUFJLFdBQVcsQ0FBQyxTQUFTLEVBQUU7Z0JBQ3pCLFdBQVcsQ0FBQyxlQUFlLENBQUMsV0FBVyxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQzVELEtBQUssRUFDTCxJQUFJLENBQ0wsQ0FBQzthQUNIO1FBQ0gsQ0FBQyxDQUFDO1FBRUYsTUFBTSxDQUFDLE9BQU8sR0FBRyxVQUFVLEdBQVE7WUFDakMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDakQsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNyQixDQUFDLENBQUM7UUFFRiw2QkFBNkI7UUFDN0Isd0NBQXdDO1FBQ3hDLDRCQUE0QjtRQUM1QixNQUFNO1FBRU4sSUFBSSxRQUFrQixDQUFDO1FBQ3ZCLE1BQU0sQ0FBQyxLQUFLLEdBQUc7WUFDYix3QkFBd0I7WUFDeEIsOENBQThDO1lBRTlDLCtDQUErQztZQUUvQyxRQUFRLEdBQUcsVUFBVSxDQUFDLEdBQUcsQ0FDdkIsVUFBQyxJQUEyQztnQkFDMUMsT0FBTyxDQUFDLEdBQUcsQ0FDVCxjQUFjLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEdBQUcsUUFBUSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQzNELENBQUM7Z0JBQ0YsT0FBTyxNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQ3JELENBQUMsQ0FDRixDQUFDO1FBQ0osQ0FBQyxDQUFDO1FBQ0YsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUUxQixPQUFPLFFBQVEsQ0FBQztJQUNsQixDQUFDO0lBRUQscUVBQXFFO0lBQ3JFLHdCQUFPLEdBQVA7UUFDRSxLQUFLLElBQUksR0FBRyxHQUFHLENBQUMsRUFBRSxHQUFHLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEVBQUUsRUFBRSxHQUFHLEVBQUU7WUFDdEQsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNsQyxJQUFJO2dCQUNGLEtBQUssQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQ2pDO1lBQUMsT0FBTyxHQUFHLEVBQUU7Z0JBQ1osT0FBTyxDQUFDLEtBQUssQ0FDWCxHQUFHO29CQUNELFdBQVc7b0JBQ1gsS0FBSyxDQUFDLFVBQVUsQ0FBQyxVQUFVO29CQUMzQixNQUFNO29CQUNOLEtBQUssQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUNuQixDQUFDO2dCQUNGLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBQ3RCLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQzFCO1NBQ0Y7UUFFRCxJQUFJLENBQUMsV0FBVyxHQUFHLEVBQUUsQ0FBQztJQUN4QixDQUFDO0lBYUgsYUFBQztBQUFELENBQUMsQUE1TUQsSUE0TUM7QUE1TVksd0JBQU0iLCJzb3VyY2VzQ29udGVudCI6WyIvLyBUaGlzIGZpbGUgaXMgcGFydCBvZiBjeHNkLCBjb3B5cmlnaHQgKGMpIDIwMTUtMjAxNiBCdXNGYXN0ZXIgTHRkLlxuLy8gUmVsZWFzZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlLCBzZWUgTElDRU5TRS5cblxuaW1wb3J0ICogYXMgc2F4IGZyb20gXCJzYXhcIjtcblxuaW1wb3J0IHsgQ2FjaGVSZXN1bHQgfSBmcm9tIFwiY2dldFwiO1xuaW1wb3J0IHsgUnVsZSB9IGZyb20gXCIuL1J1bGVcIjtcblxuaW1wb3J0ICogYXMgdHlwZXMgZnJvbSBcIi4vdHlwZXNcIjtcbmltcG9ydCB7IENvbnRleHQgfSBmcm9tIFwiLi9Db250ZXh0XCI7XG5pbXBvcnQgeyBTdGF0ZSB9IGZyb20gXCIuL1N0YXRlXCI7XG5pbXBvcnQgeyBOYW1lc3BhY2UgfSBmcm9tIFwiLi9OYW1lc3BhY2VcIjtcbmltcG9ydCB7IExvYWRlciB9IGZyb20gXCIuL0xvYWRlclwiO1xuaW1wb3J0IHsgU291cmNlIH0gZnJvbSBcIi4vU291cmNlXCI7XG5pbXBvcnQgeyBRTmFtZSB9IGZyb20gXCIuL1FOYW1lXCI7XG5cbmltcG9ydCAqIGFzIHV0aWwgZnJvbSBcInV0aWxcIjtcbmltcG9ydCB7IEJhc2UgfSBmcm9tIFwiLi90eXBlcy9CYXNlXCI7XG5cbi8qKiBQYXJzZSBzeW50YXggcnVsZXMgZW5jb2RlZCBpbnRvIGhhbmRsZXIgY2xhc3Nlcy4gKi9cblxuZnVuY3Rpb24gcGFyc2VSdWxlKGN0b3I6IHR5cGVzLkJhc2VDbGFzcywgY29udGV4dDogQ29udGV4dCkge1xuICBpZiAoY3Rvci5ydWxlKSByZXR1cm4gY3Rvci5ydWxlIGFzIFJ1bGU7XG5cbiAgdmFyIHJ1bGUgPSBuZXcgUnVsZShjdG9yKTtcblxuICBjdG9yLnJ1bGUgPSBydWxlO1xuXG4gIGZvciAodmFyIGJhc2VGb2xsb3dlciBvZiBjdG9yLm1heUNvbnRhaW4oKSkge1xuICAgIHZhciBmb2xsb3dlciA9IGJhc2VGb2xsb3dlciBhcyB0eXBlcy5CYXNlQ2xhc3M7XG4gICAgdmFyIGZvbGxvd2VyTmFtZSA9IG5ldyBRTmFtZSgpLnBhcnNlQ2xhc3MoZm9sbG93ZXIubmFtZSwgY29udGV4dC54c2RTcGFjZSk7XG5cbiAgICBydWxlLmZvbGxvd2VyVGJsW2ZvbGxvd2VyTmFtZS5uYW1lRnVsbF0gPSBwYXJzZVJ1bGUoZm9sbG93ZXIsIGNvbnRleHQpO1xuICAgIHJ1bGUuZm9sbG93ZXJUYmxbZm9sbG93ZXJOYW1lLm5hbWVdID0gcGFyc2VSdWxlKGZvbGxvd2VyLCBjb250ZXh0KTtcbiAgfVxuXG4gIHZhciBvYmogPSBuZXcgY3RvcigpO1xuXG4gIGZvciAodmFyIGtleSBvZiBPYmplY3Qua2V5cyhvYmopKSB7XG4gICAgcnVsZS5hdHRyaWJ1dGVMaXN0LnB1c2goa2V5KTtcbiAgfVxuXG4gIHJldHVybiBydWxlO1xufVxuXG5leHBvcnQgY2xhc3MgUGFyc2VyIHtcbiAgY29uc3RydWN0b3IoY29udGV4dDogQ29udGV4dCkge1xuICAgIHRoaXMuY29udGV4dCA9IGNvbnRleHQ7XG4gICAgdGhpcy5yb290UnVsZSA9IHBhcnNlUnVsZSh0eXBlcy5Sb290LCBjb250ZXh0KTtcbiAgfVxuXG4gIHN0YXJ0RWxlbWVudChcbiAgICBzdGF0ZTogU3RhdGUsXG4gICAgbmFtZTogc3RyaW5nLFxuICAgIGF0dHJUYmw6IHNheC5UYWdbXCJhdHRyaWJ1dGVzXCJdIHwgc2F4LlF1YWxpZmllZFRhZ1tcImF0dHJpYnV0ZXNcIl1cbiAgKSB7XG4gICAgdmFyIHFOYW1lID0gdGhpcy5xTmFtZTtcblxuICAgIHFOYW1lLnBhcnNlKG5hbWUsIHN0YXRlLnNvdXJjZSwgc3RhdGUuc291cmNlLmRlZmF1bHROYW1lc3BhY2UpO1xuXG4gICAgdmFyIHJ1bGUgPSBzdGF0ZS5ydWxlO1xuXG4gICAgaWYgKHJ1bGUpIHtcbiAgICAgIHJ1bGUgPVxuICAgICAgICBydWxlLmZvbGxvd2VyVGJsW3FOYW1lLm5hbWVGdWxsXSB8fFxuICAgICAgICBydWxlLmZvbGxvd2VyVGJsW3FOYW1lLm5hbWVdIHx8XG4gICAgICAgIHJ1bGUuZm9sbG93ZXJUYmxbXCIqXCJdO1xuICAgICAgLy8gaWYoIXJ1bGUpIGNvbnNvbGUubG9nKCdVbmhhbmRsZWQgY2hpbGQgJyArIHN0YXRlLnJ1bGUucU5hbWUubmFtZUZ1bGwgKyAnIC0+ICcgKyBxTmFtZS5uYW1lRnVsbCk7XG4gICAgfVxuXG4gICAgc3RhdGUgPSBuZXcgU3RhdGUoc3RhdGUsIHJ1bGUpO1xuXG4gICAgaWYgKCFydWxlIHx8ICFydWxlLnByb3RvKSByZXR1cm4gc3RhdGU7XG5cbiAgICB2YXIgeHNkRWxlbSA9IG5ldyAocnVsZS5wcm90byBhcyB0eXBlcy5CYXNlQ2xhc3MpKHN0YXRlKTtcblxuICAgIHN0YXRlLnhzZEVsZW1lbnQgPSB4c2RFbGVtO1xuXG4gICAgLy8gTWFrZSBhbGwgYXR0cmlidXRlcyBsb3dlcmNhc2UuXG5cbiAgICBmb3IgKHZhciBrZXkgb2YgT2JqZWN0LmtleXMoYXR0clRibCkpIHtcbiAgICAgIHZhciBrZXlMb3dlciA9IGtleS50b0xvd2VyQ2FzZSgpO1xuXG4gICAgICBpZiAoa2V5ICE9IGtleUxvd2VyICYmICFhdHRyVGJsLmhhc093blByb3BlcnR5KGtleUxvd2VyKSkge1xuICAgICAgICBhdHRyVGJsW2tleUxvd2VyXSA9IGF0dHJUYmxba2V5XTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBDb3B5IGtub3duIGF0dHJpYnV0ZXMgdG8gWFNEIGVsZW1lbnQuXG5cbiAgICBmb3IgKHZhciBrZXkgb2YgcnVsZS5hdHRyaWJ1dGVMaXN0KSB7XG4gICAgICBpZiAoYXR0clRibC5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICh4c2RFbGVtIGFzIGFueSlba2V5XSA9IGF0dHJUYmxba2V5XTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoeHNkRWxlbS5pbml0KSB7XG4gICAgICBzdGF0ZS5hdHRyaWJ1dGVUYmwgPSBhdHRyVGJsO1xuXG4gICAgICB4c2RFbGVtLmluaXQoc3RhdGUpO1xuICAgIH1cblxuICAgIHJldHVybiBzdGF0ZTtcbiAgfVxuXG4gIGluaXQoeG1sOiBzdHJpbmcsIHNvdXJjZTogU291cmNlLCBsb2FkZXI6IExvYWRlcikge1xuICAgIHZhciBzdGF0ZSA9IG5ldyBTdGF0ZShudWxsLCB0aGlzLnJvb3RSdWxlLCBzb3VyY2UpO1xuICAgIHZhciBpbXBvcnRMaXN0OiB7IG5hbWVzcGFjZTogTmFtZXNwYWNlOyB1cmw6IHN0cmluZyB9W10gPSBbXTtcblxuICAgIHZhciBwYXJzZXIgPSBzYXgucGFyc2VyKHRydWUsIHsgcG9zaXRpb246IHRydWUgfSk7XG5cbiAgICBzdGF0ZS5zdGF0ZVN0YXRpYyA9IHtcbiAgICAgIGNvbnRleHQ6IHRoaXMuY29udGV4dCxcblxuICAgICAgYWRkSW1wb3J0OiAobmFtZXNwYWNlVGFyZ2V0OiBOYW1lc3BhY2UsIHVybFJlbW90ZTogc3RyaW5nKSA9PiB7XG4gICAgICAgIGltcG9ydExpc3QucHVzaCh7IG5hbWVzcGFjZTogbmFtZXNwYWNlVGFyZ2V0LCB1cmw6IHVybFJlbW90ZSB9KTtcbiAgICAgIH0sXG5cbiAgICAgIGdldExpbmVOdW1iZXI6ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIHBhcnNlci5saW5lICsgMTtcbiAgICAgIH0sXG5cbiAgICAgIGdldEJ5dGVQb3M6ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIHBhcnNlci5wb3NpdGlvbjtcbiAgICAgIH0sXG5cbiAgICAgIHRleHREZXB0aDogMCxcbiAgICAgIHRleHRIYW5kbGVyTGlzdDogW10sXG4gICAgfTtcblxuICAgIHZhciBzdGF0ZVN0YXRpYyA9IHN0YXRlLnN0YXRlU3RhdGljO1xuICAgIHZhciByZXNvbHZlOiAocmVzdWx0OiBTb3VyY2VbXSkgPT4gdm9pZDtcbiAgICB2YXIgcmVqZWN0OiAoZXJyOiBhbnkpID0+IHZvaWQ7XG5cbiAgICB2YXIgcHJvbWlzZSA9IG5ldyBQcm9taXNlPFNvdXJjZVtdPigocmVzLCByZWopID0+IHtcbiAgICAgIHJlc29sdmUgPSByZXM7XG4gICAgICByZWplY3QgPSByZWo7XG4gICAgfSk7XG5cbiAgICB2YXIgcGVuZGluZ0xpc3QgPSB0aGlzLnBlbmRpbmdMaXN0O1xuXG4gICAgcGFyc2VyLm9ub3BlbnRhZyA9ICh0YWc6IHNheC5UYWcgfCBzYXguUXVhbGlmaWVkVGFnKSA9PiB7XG4gICAgICAvLyB4bWwub24oJ29wZW50YWcnLCAobm9kZTogc2F4LlRhZykgPT4ge1xuICAgICAgLy8gdmFyIG5hbWUgPSBub2RlLm5hbWU7XG4gICAgICAvLyB2YXIgYXR0clRibCA9IG5vZGUuYXR0cmlidXRlcztcblxuICAgICAgdHJ5IHtcbiAgICAgICAgc3RhdGUgPSB0aGlzLnN0YXJ0RWxlbWVudChzdGF0ZSwgdGFnLm5hbWUsIHRhZy5hdHRyaWJ1dGVzKTtcbiAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAvLyBFeGNlcHRpb25zIGVzY2FwaW5nIGZyb20gbm9kZS1leHBhdCdzIGV2ZW50IGhhbmRsZXJzIGNhdXNlIHdlaXJkIGVmZmVjdHMuXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcbiAgICAgICAgY29uc29sZS5sb2coXCJTdGFjazpcIik7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyLnN0YWNrKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgcGFyc2VyLm9uY2xvc2V0YWcgPSBmdW5jdGlvbiAobmFtZTogc3RyaW5nKSB7XG4gICAgICAvLyB4bWwub24oJ2Nsb3NldGFnJywgZnVuY3Rpb24oKSB7XG4gICAgICBpZiAoc3RhdGUueHNkRWxlbWVudCkge1xuICAgICAgICBpZiAoc3RhdGUueHNkRWxlbWVudC5sb2FkZWQpIHtcbiAgICAgICAgICBzdGF0ZS54c2RFbGVtZW50LmxvYWRlZChzdGF0ZSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc3RhdGUueHNkRWxlbWVudC5yZXNvbHZlKSB7XG4gICAgICAgICAgLy8gU2NoZWR1bGUgcmVzb2x2ZSBob29rIHRvIHJ1biBhZnRlciBwYXJzaW5nIGlzIGRvbmUuXG4gICAgICAgICAgLy8gSXQgbWlnaHQgZGVwZW5kIG9uIGRlZmluaXRpb25zIGluIHNjb3BlIGJ1dCBhcHBlYXJpbmcgbGF0ZXIsXG4gICAgICAgICAgLy8gYW5kIHNlbGVjdGl2ZWx5IHBvc3Rwb25pbmcgb25seSBob29rcyB0aGF0IGNhbm5vdCBydW4geWV0XG4gICAgICAgICAgLy8gd291bGQgYmUgZXh0cmVtZWx5IGNvbXBsaWNhdGVkLlxuXG4gICAgICAgICAgcGVuZGluZ0xpc3QucHVzaChzdGF0ZSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgc3RhdGUgPSBzdGF0ZS5wYXJlbnQ7XG4gICAgfTtcblxuICAgIHBhcnNlci5vbnRleHQgPSBmdW5jdGlvbiAodGV4dDogc3RyaW5nKSB7XG4gICAgICBpZiAoc3RhdGVTdGF0aWMudGV4dERlcHRoKSB7XG4gICAgICAgIHN0YXRlU3RhdGljLnRleHRIYW5kbGVyTGlzdFtzdGF0ZVN0YXRpYy50ZXh0RGVwdGggLSAxXS5hZGRUZXh0KFxuICAgICAgICAgIHN0YXRlLFxuICAgICAgICAgIHRleHRcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgcGFyc2VyLm9uZXJyb3IgPSBmdW5jdGlvbiAoZXJyOiBhbnkpIHtcbiAgICAgIGNvbnNvbGUubG9nKFwiaGVyZVwiLCBwYXJzZXIucG9zaXRpb24sIHBhcnNlci50YWcpO1xuICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xuICAgIH07XG5cbiAgICAvLyAvLyBFeHBhdC1zcGVjaWZpYyBoYW5kbGVyLlxuICAgIC8vIHN0cmVhbS5vbihcImRhdGFcIiwgKGRhdGE6IEJ1ZmZlcikgPT4ge1xuICAgIC8vICAgeG1sLnBhcnNlKGRhdGEsIGZhbHNlKTtcbiAgICAvLyB9KTtcblxuICAgIGxldCBmaWxlTGlzdDogU291cmNlW107XG4gICAgcGFyc2VyLm9uZW5kID0gKCkgPT4ge1xuICAgICAgLy8geG1sLm9uKCdlbmQnLCAoKSA9PiB7XG4gICAgICAvLyBGaW5pc2ggcGFyc2luZyB0aGUgZmlsZSAoc3luY2hyb25vdXMgY2FsbCkuXG5cbiAgICAgIC8vIHhtbC5wYXJzZShcIlwiLCB0cnVlKTsgLy8gRXhwYXQtc3BlY2lmaWMgbGluZS5cblxuICAgICAgZmlsZUxpc3QgPSBpbXBvcnRMaXN0Lm1hcChcbiAgICAgICAgKHNwZWM6IHsgbmFtZXNwYWNlOiBOYW1lc3BhY2U7IHVybDogc3RyaW5nIH0pID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhcbiAgICAgICAgICAgIFwiSU1QT1JUIGludG8gXCIgKyBzcGVjLm5hbWVzcGFjZS5uYW1lICsgXCIgZnJvbSBcIiArIHNwZWMudXJsXG4gICAgICAgICAgKTtcbiAgICAgICAgICByZXR1cm4gbG9hZGVyLmltcG9ydEZpbGUoc3BlYy51cmwsIHNwZWMubmFtZXNwYWNlKTtcbiAgICAgICAgfVxuICAgICAgKTtcbiAgICB9O1xuICAgIHBhcnNlci53cml0ZSh4bWwpLmNsb3NlKCk7XG5cbiAgICByZXR1cm4gZmlsZUxpc3Q7XG4gIH1cblxuICAvKiogQmluZCByZWZlcmVuY2VzLCBjYWxsIGFmdGVyIGFsbCBpbXBvcnRzIGhhdmUgYmVlbiBpbml0aWFsaXplZC4gKi9cbiAgcmVzb2x2ZSgpIHtcbiAgICBmb3IgKHZhciBwb3MgPSAwOyBwb3MgPCB0aGlzLnBlbmRpbmdMaXN0Lmxlbmd0aDsgKytwb3MpIHtcbiAgICAgIHZhciBzdGF0ZSA9IHRoaXMucGVuZGluZ0xpc3RbcG9zXTtcbiAgICAgIHRyeSB7XG4gICAgICAgIHN0YXRlLnhzZEVsZW1lbnQucmVzb2x2ZShzdGF0ZSk7XG4gICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihcbiAgICAgICAgICBlcnIgK1xuICAgICAgICAgICAgXCIgb24gbGluZSBcIiArXG4gICAgICAgICAgICBzdGF0ZS54c2RFbGVtZW50LmxpbmVOdW1iZXIgK1xuICAgICAgICAgICAgXCIgb2YgXCIgK1xuICAgICAgICAgICAgc3RhdGUuc291cmNlLnVybFxuICAgICAgICApO1xuICAgICAgICBjb25zb2xlLmxvZyhcIlN0YWNrOlwiKTtcbiAgICAgICAgY29uc29sZS5lcnJvcihlcnIuc3RhY2spO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMucGVuZGluZ0xpc3QgPSBbXTtcbiAgfVxuXG4gIHByaXZhdGUgY29udGV4dDogQ29udGV4dDtcblxuICAvKiogVGVtcG9yYXJpbHkgaG9sZHMgYSBxdWFsaWZpZWQgbmFtZSwgcmUtdXNlZCB0byBhdm9pZCBhbGxvY2F0aW5nIG9iamVjdHMuICovXG4gIHByaXZhdGUgcU5hbWUgPSBuZXcgUU5hbWUoKTtcblxuICAvKiogTGlzdCBvZiBwYXJzZXIgc3RhdGVzIHN0aWxsIG5lZWRpbmcgZnVydGhlciBwcm9jZXNzaW5nXG4gICAqIGFmdGVyIHByZXZpb3VzIHN0YWdlIGlzIGRvbmUuICovXG4gIHByaXZhdGUgcGVuZGluZ0xpc3Q6IFN0YXRlW10gPSBbXTtcblxuICAvKiogRGVmaW5lcyB2YWxpZCBjb250ZW50cyBmb3IgdGhlIFhNTCBmaWxlIHJvb3QgZWxlbWVudC4gKi9cbiAgcHJpdmF0ZSByb290UnVsZTogUnVsZTtcbn1cbiJdfQ==