"use strict";
// This file is part of cxsd, copyright (c) 2015-2016 BusFaster Ltd.
// Released under the MIT license, see LICENSE.
Object.defineProperty(exports, "__esModule", { value: true });
exports.Parser = void 0;
var sax = require("sax");
var Promise = require("bluebird");
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
    Parser.prototype.init = function (cached, source, loader) {
        var _this = this;
        var state = new State_1.State(null, this.rootRule, source);
        var importList = [];
        var xml = sax.createStream(true, { position: true });
        state.stateStatic = {
            context: this.context,
            addImport: function (namespaceTarget, urlRemote) {
                importList.push({ namespace: namespaceTarget, url: urlRemote });
            },
            getLineNumber: function () {
                // return xml.getCurrentLineNumber();
                return 0;
            },
            getBytePos: function () {
                // return xml.getCurrentByteIndex();
                return 0;
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
        var stream = cached.stream;
        var pendingList = this.pendingList;
        xml.on("startElement", function (name, attrTbl) {
            // xml.on('opentag', (node: sax.Tag) => {
            // var name = node.name;
            // var attrTbl = node.attributes;
            try {
                state = _this.startElement(state, name, attrTbl);
            }
            catch (err) {
                // Exceptions escaping from node-expat's event handlers cause weird effects.
                console.error(err);
                console.log("Stack:");
                console.error(err.stack);
            }
        });
        xml.on("endElement", function (name) {
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
        });
        xml.on("text", function (text) {
            if (stateStatic.textDepth) {
                stateStatic.textHandlerList[stateStatic.textDepth - 1].addText(state, text);
            }
        });
        xml.on("error", function (err) {
            console.error(err);
        });
        // // Expat-specific handler.
        // stream.on("data", (data: Buffer) => {
        //   xml.parse(data, false);
        // });
        stream.on("end", function () {
            // xml.on('end', () => {
            // Finish parsing the file (synchronous call).
            // xml.parse("", true); // Expat-specific line.
            resolve(importList.map(function (spec) {
                console.log("IMPORT into " + spec.namespace.name + " from " + spec.url);
                return loader.importFile(spec.url, spec.namespace);
            }));
        });
        stream.pipe(xml);
        return promise;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGFyc2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcGFyc2VyX3NjYWZmb2xkX2dlbmVyYXRvci9zcmMveHNkL1BhcnNlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsb0VBQW9FO0FBQ3BFLCtDQUErQzs7O0FBRS9DLHlCQUEyQjtBQUMzQixrQ0FBb0M7QUFHcEMsK0JBQThCO0FBRTlCLCtCQUFpQztBQUVqQyxpQ0FBZ0M7QUFJaEMsaUNBQWdDO0FBSWhDLHVEQUF1RDtBQUV2RCxTQUFTLFNBQVMsQ0FBQyxJQUFxQixFQUFFLE9BQWdCO0lBQ3hELElBQUksSUFBSSxDQUFDLElBQUk7UUFBRSxPQUFPLElBQUksQ0FBQyxJQUFZLENBQUM7SUFFeEMsSUFBSSxJQUFJLEdBQUcsSUFBSSxXQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFFMUIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7SUFFakIsS0FBeUIsVUFBaUIsRUFBakIsS0FBQSxJQUFJLENBQUMsVUFBVSxFQUFFLEVBQWpCLGNBQWlCLEVBQWpCLElBQWlCLEVBQUU7UUFBdkMsSUFBSSxZQUFZLFNBQUE7UUFDbkIsSUFBSSxRQUFRLEdBQUcsWUFBK0IsQ0FBQztRQUMvQyxJQUFJLFlBQVksR0FBRyxJQUFJLGFBQUssRUFBRSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUUzRSxJQUFJLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsR0FBRyxTQUFTLENBQUMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQ3ZFLElBQUksQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxHQUFHLFNBQVMsQ0FBQyxRQUFRLEVBQUUsT0FBTyxDQUFDLENBQUM7S0FDcEU7SUFFRCxJQUFJLEdBQUcsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDO0lBRXJCLEtBQWdCLFVBQWdCLEVBQWhCLEtBQUEsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBaEIsY0FBZ0IsRUFBaEIsSUFBZ0IsRUFBRTtRQUE3QixJQUFJLEdBQUcsU0FBQTtRQUNWLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0tBQzlCO0lBRUQsT0FBTyxJQUFJLENBQUM7QUFDZCxDQUFDO0FBRUQ7SUFDRSxnQkFBWSxPQUFnQjtRQXdNNUIsK0VBQStFO1FBQ3ZFLFVBQUssR0FBRyxJQUFJLGFBQUssRUFBRSxDQUFDO1FBRTVCOzJDQUNtQztRQUMzQixnQkFBVyxHQUFZLEVBQUUsQ0FBQztRQTVNaEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFDdkIsSUFBSSxDQUFDLFFBQVEsR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQztJQUNqRCxDQUFDO0lBRUQsNkJBQVksR0FBWixVQUNFLEtBQVksRUFDWixJQUFZLEVBQ1osT0FBbUM7UUFFbkMsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztRQUV2QixLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUUvRCxJQUFJLElBQUksR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDO1FBRXRCLElBQUksSUFBSSxFQUFFO1lBQ1IsSUFBSTtnQkFDRixJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUM7b0JBQ2hDLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQztvQkFDNUIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUN4QixtR0FBbUc7U0FDcEc7UUFFRCxLQUFLLEdBQUcsSUFBSSxhQUFLLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBRS9CLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSztZQUFFLE9BQU8sS0FBSyxDQUFDO1FBRXZDLElBQUksT0FBTyxHQUFHLElBQUssSUFBSSxDQUFDLEtBQXlCLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFekQsS0FBSyxDQUFDLFVBQVUsR0FBRyxPQUFPLENBQUM7UUFFM0IsaUNBQWlDO1FBRWpDLEtBQWdCLFVBQW9CLEVBQXBCLEtBQUEsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBcEIsY0FBb0IsRUFBcEIsSUFBb0IsRUFBRTtZQUFqQyxJQUFJLEdBQUcsU0FBQTtZQUNWLElBQUksUUFBUSxHQUFHLEdBQUcsQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUVqQyxJQUFJLEdBQUcsSUFBSSxRQUFRLElBQUksQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxFQUFFO2dCQUN4RCxPQUFPLENBQUMsUUFBUSxDQUFDLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2FBQ2xDO1NBQ0Y7UUFFRCx3Q0FBd0M7UUFFeEMsS0FBZ0IsVUFBa0IsRUFBbEIsS0FBQSxJQUFJLENBQUMsYUFBYSxFQUFsQixjQUFrQixFQUFsQixJQUFrQixFQUFFO1lBQS9CLElBQUksR0FBRyxTQUFBO1lBQ1YsSUFBSSxPQUFPLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxFQUFFO2dCQUM3QixPQUE2QyxDQUFDLEdBQUcsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUNyRTtTQUNGO1FBRUQsSUFBSSxPQUFPLENBQUMsSUFBSSxFQUFFO1lBQ2hCLEtBQUssQ0FBQyxZQUFZLEdBQUcsT0FBTyxDQUFDO1lBRTdCLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDckI7UUFFRCxPQUFPLEtBQUssQ0FBQztJQUNmLENBQUM7SUFFRCxxQkFBSSxHQUFKLFVBQUssTUFBbUIsRUFBRSxNQUFjLEVBQUUsTUFBYztRQUF4RCxpQkFtSEM7UUFsSEMsSUFBSSxLQUFLLEdBQUcsSUFBSSxhQUFLLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDbkQsSUFBSSxVQUFVLEdBQTRDLEVBQUUsQ0FBQztRQUU3RCxJQUFJLEdBQUcsR0FBRyxHQUFHLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO1FBRXJELEtBQUssQ0FBQyxXQUFXLEdBQUc7WUFDbEIsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPO1lBRXJCLFNBQVMsRUFBRSxVQUFDLGVBQTBCLEVBQUUsU0FBaUI7Z0JBQ3ZELFVBQVUsQ0FBQyxJQUFJLENBQUMsRUFBRSxTQUFTLEVBQUUsZUFBZSxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUUsQ0FBQyxDQUFDO1lBQ2xFLENBQUM7WUFFRCxhQUFhLEVBQUU7Z0JBQ2IscUNBQXFDO2dCQUNyQyxPQUFPLENBQUMsQ0FBQztZQUNYLENBQUM7WUFFRCxVQUFVLEVBQUU7Z0JBQ1Ysb0NBQW9DO2dCQUNwQyxPQUFPLENBQUMsQ0FBQztZQUNYLENBQUM7WUFFRCxTQUFTLEVBQUUsQ0FBQztZQUNaLGVBQWUsRUFBRSxFQUFFO1NBQ3BCLENBQUM7UUFFRixJQUFJLFdBQVcsR0FBRyxLQUFLLENBQUMsV0FBVyxDQUFDO1FBQ3BDLElBQUksT0FBbUMsQ0FBQztRQUN4QyxJQUFJLE1BQTBCLENBQUM7UUFFL0IsSUFBSSxPQUFPLEdBQUcsSUFBSSxPQUFPLENBQVcsVUFBQyxHQUFHLEVBQUUsR0FBRztZQUMzQyxPQUFPLEdBQUcsR0FBRyxDQUFDO1lBQ2QsTUFBTSxHQUFHLEdBQUcsQ0FBQztRQUNmLENBQUMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxNQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQztRQUUzQixJQUFJLFdBQVcsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDO1FBRW5DLEdBQUcsQ0FBQyxFQUFFLENBQ0osY0FBYyxFQUNkLFVBQUMsSUFBWSxFQUFFLE9BQW1DO1lBQ2hELHlDQUF5QztZQUN6Qyx3QkFBd0I7WUFDeEIsaUNBQWlDO1lBRWpDLElBQUk7Z0JBQ0YsS0FBSyxHQUFHLEtBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQzthQUNqRDtZQUFDLE9BQU8sR0FBRyxFQUFFO2dCQUNaLDRFQUE0RTtnQkFDNUUsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDbkIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDdEIsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDMUI7UUFDSCxDQUFDLENBQ0YsQ0FBQztRQUVGLEdBQUcsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLFVBQVUsSUFBWTtZQUN6QyxrQ0FBa0M7WUFDbEMsSUFBSSxLQUFLLENBQUMsVUFBVSxFQUFFO2dCQUNwQixJQUFJLEtBQUssQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUFFO29CQUMzQixLQUFLLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztpQkFDaEM7Z0JBRUQsSUFBSSxLQUFLLENBQUMsVUFBVSxDQUFDLE9BQU8sRUFBRTtvQkFDNUIsc0RBQXNEO29CQUN0RCwrREFBK0Q7b0JBQy9ELDREQUE0RDtvQkFDNUQsa0NBQWtDO29CQUVsQyxXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO2lCQUN6QjthQUNGO1lBRUQsS0FBSyxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUM7UUFDdkIsQ0FBQyxDQUFDLENBQUM7UUFFSCxHQUFHLENBQUMsRUFBRSxDQUFDLE1BQU0sRUFBRSxVQUFVLElBQVk7WUFDbkMsSUFBSSxXQUFXLENBQUMsU0FBUyxFQUFFO2dCQUN6QixXQUFXLENBQUMsZUFBZSxDQUFDLFdBQVcsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUM1RCxLQUFLLEVBQ0wsSUFBSSxDQUNMLENBQUM7YUFDSDtRQUNILENBQUMsQ0FBQyxDQUFDO1FBRUgsR0FBRyxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsVUFBVSxHQUFRO1lBQ2hDLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDckIsQ0FBQyxDQUFDLENBQUM7UUFFSCw2QkFBNkI7UUFDN0Isd0NBQXdDO1FBQ3hDLDRCQUE0QjtRQUM1QixNQUFNO1FBRU4sTUFBTSxDQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUU7WUFDZix3QkFBd0I7WUFDeEIsOENBQThDO1lBRTlDLCtDQUErQztZQUUvQyxPQUFPLENBQ0wsVUFBVSxDQUFDLEdBQUcsQ0FBQyxVQUFDLElBQTJDO2dCQUN6RCxPQUFPLENBQUMsR0FBRyxDQUNULGNBQWMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksR0FBRyxRQUFRLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FDM0QsQ0FBQztnQkFDRixPQUFPLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDckQsQ0FBQyxDQUFDLENBQ0gsQ0FBQztRQUNKLENBQUMsQ0FBQyxDQUFDO1FBRUgsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUVqQixPQUFPLE9BQU8sQ0FBQztJQUNqQixDQUFDO0lBRUQscUVBQXFFO0lBQ3JFLHdCQUFPLEdBQVA7UUFDRSxLQUFLLElBQUksR0FBRyxHQUFHLENBQUMsRUFBRSxHQUFHLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEVBQUUsRUFBRSxHQUFHLEVBQUU7WUFDdEQsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNsQyxJQUFJO2dCQUNGLEtBQUssQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQ2pDO1lBQUMsT0FBTyxHQUFHLEVBQUU7Z0JBQ1osT0FBTyxDQUFDLEtBQUssQ0FDWCxHQUFHO29CQUNELFdBQVc7b0JBQ1gsS0FBSyxDQUFDLFVBQVUsQ0FBQyxVQUFVO29CQUMzQixNQUFNO29CQUNOLEtBQUssQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUNuQixDQUFDO2dCQUNGLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBQ3RCLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQzFCO1NBQ0Y7UUFFRCxJQUFJLENBQUMsV0FBVyxHQUFHLEVBQUUsQ0FBQztJQUN4QixDQUFDO0lBYUgsYUFBQztBQUFELENBQUMsQUFsTkQsSUFrTkM7QUFsTlksd0JBQU0iLCJzb3VyY2VzQ29udGVudCI6WyIvLyBUaGlzIGZpbGUgaXMgcGFydCBvZiBjeHNkLCBjb3B5cmlnaHQgKGMpIDIwMTUtMjAxNiBCdXNGYXN0ZXIgTHRkLlxuLy8gUmVsZWFzZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlLCBzZWUgTElDRU5TRS5cblxuaW1wb3J0ICogYXMgc2F4IGZyb20gXCJzYXhcIjtcbmltcG9ydCAqIGFzIFByb21pc2UgZnJvbSBcImJsdWViaXJkXCI7XG5cbmltcG9ydCB7IENhY2hlUmVzdWx0IH0gZnJvbSBcImNnZXRcIjtcbmltcG9ydCB7IFJ1bGUgfSBmcm9tIFwiLi9SdWxlXCI7XG5cbmltcG9ydCAqIGFzIHR5cGVzIGZyb20gXCIuL3R5cGVzXCI7XG5pbXBvcnQgeyBDb250ZXh0IH0gZnJvbSBcIi4vQ29udGV4dFwiO1xuaW1wb3J0IHsgU3RhdGUgfSBmcm9tIFwiLi9TdGF0ZVwiO1xuaW1wb3J0IHsgTmFtZXNwYWNlIH0gZnJvbSBcIi4vTmFtZXNwYWNlXCI7XG5pbXBvcnQgeyBMb2FkZXIgfSBmcm9tIFwiLi9Mb2FkZXJcIjtcbmltcG9ydCB7IFNvdXJjZSB9IGZyb20gXCIuL1NvdXJjZVwiO1xuaW1wb3J0IHsgUU5hbWUgfSBmcm9tIFwiLi9RTmFtZVwiO1xuXG5pbXBvcnQgKiBhcyB1dGlsIGZyb20gXCJ1dGlsXCI7XG5cbi8qKiBQYXJzZSBzeW50YXggcnVsZXMgZW5jb2RlZCBpbnRvIGhhbmRsZXIgY2xhc3Nlcy4gKi9cblxuZnVuY3Rpb24gcGFyc2VSdWxlKGN0b3I6IHR5cGVzLkJhc2VDbGFzcywgY29udGV4dDogQ29udGV4dCkge1xuICBpZiAoY3Rvci5ydWxlKSByZXR1cm4gY3Rvci5ydWxlIGFzIFJ1bGU7XG5cbiAgdmFyIHJ1bGUgPSBuZXcgUnVsZShjdG9yKTtcblxuICBjdG9yLnJ1bGUgPSBydWxlO1xuXG4gIGZvciAodmFyIGJhc2VGb2xsb3dlciBvZiBjdG9yLm1heUNvbnRhaW4oKSkge1xuICAgIHZhciBmb2xsb3dlciA9IGJhc2VGb2xsb3dlciBhcyB0eXBlcy5CYXNlQ2xhc3M7XG4gICAgdmFyIGZvbGxvd2VyTmFtZSA9IG5ldyBRTmFtZSgpLnBhcnNlQ2xhc3MoZm9sbG93ZXIubmFtZSwgY29udGV4dC54c2RTcGFjZSk7XG5cbiAgICBydWxlLmZvbGxvd2VyVGJsW2ZvbGxvd2VyTmFtZS5uYW1lRnVsbF0gPSBwYXJzZVJ1bGUoZm9sbG93ZXIsIGNvbnRleHQpO1xuICAgIHJ1bGUuZm9sbG93ZXJUYmxbZm9sbG93ZXJOYW1lLm5hbWVdID0gcGFyc2VSdWxlKGZvbGxvd2VyLCBjb250ZXh0KTtcbiAgfVxuXG4gIHZhciBvYmogPSBuZXcgY3RvcigpO1xuXG4gIGZvciAodmFyIGtleSBvZiBPYmplY3Qua2V5cyhvYmopKSB7XG4gICAgcnVsZS5hdHRyaWJ1dGVMaXN0LnB1c2goa2V5KTtcbiAgfVxuXG4gIHJldHVybiBydWxlO1xufVxuXG5leHBvcnQgY2xhc3MgUGFyc2VyIHtcbiAgY29uc3RydWN0b3IoY29udGV4dDogQ29udGV4dCkge1xuICAgIHRoaXMuY29udGV4dCA9IGNvbnRleHQ7XG4gICAgdGhpcy5yb290UnVsZSA9IHBhcnNlUnVsZSh0eXBlcy5Sb290LCBjb250ZXh0KTtcbiAgfVxuXG4gIHN0YXJ0RWxlbWVudChcbiAgICBzdGF0ZTogU3RhdGUsXG4gICAgbmFtZTogc3RyaW5nLFxuICAgIGF0dHJUYmw6IHsgW25hbWU6IHN0cmluZ106IHN0cmluZyB9XG4gICkge1xuICAgIHZhciBxTmFtZSA9IHRoaXMucU5hbWU7XG5cbiAgICBxTmFtZS5wYXJzZShuYW1lLCBzdGF0ZS5zb3VyY2UsIHN0YXRlLnNvdXJjZS5kZWZhdWx0TmFtZXNwYWNlKTtcblxuICAgIHZhciBydWxlID0gc3RhdGUucnVsZTtcblxuICAgIGlmIChydWxlKSB7XG4gICAgICBydWxlID1cbiAgICAgICAgcnVsZS5mb2xsb3dlclRibFtxTmFtZS5uYW1lRnVsbF0gfHxcbiAgICAgICAgcnVsZS5mb2xsb3dlclRibFtxTmFtZS5uYW1lXSB8fFxuICAgICAgICBydWxlLmZvbGxvd2VyVGJsW1wiKlwiXTtcbiAgICAgIC8vIGlmKCFydWxlKSBjb25zb2xlLmxvZygnVW5oYW5kbGVkIGNoaWxkICcgKyBzdGF0ZS5ydWxlLnFOYW1lLm5hbWVGdWxsICsgJyAtPiAnICsgcU5hbWUubmFtZUZ1bGwpO1xuICAgIH1cblxuICAgIHN0YXRlID0gbmV3IFN0YXRlKHN0YXRlLCBydWxlKTtcblxuICAgIGlmICghcnVsZSB8fCAhcnVsZS5wcm90bykgcmV0dXJuIHN0YXRlO1xuXG4gICAgdmFyIHhzZEVsZW0gPSBuZXcgKHJ1bGUucHJvdG8gYXMgdHlwZXMuQmFzZUNsYXNzKShzdGF0ZSk7XG5cbiAgICBzdGF0ZS54c2RFbGVtZW50ID0geHNkRWxlbTtcblxuICAgIC8vIE1ha2UgYWxsIGF0dHJpYnV0ZXMgbG93ZXJjYXNlLlxuXG4gICAgZm9yICh2YXIga2V5IG9mIE9iamVjdC5rZXlzKGF0dHJUYmwpKSB7XG4gICAgICB2YXIga2V5TG93ZXIgPSBrZXkudG9Mb3dlckNhc2UoKTtcblxuICAgICAgaWYgKGtleSAhPSBrZXlMb3dlciAmJiAhYXR0clRibC5oYXNPd25Qcm9wZXJ0eShrZXlMb3dlcikpIHtcbiAgICAgICAgYXR0clRibFtrZXlMb3dlcl0gPSBhdHRyVGJsW2tleV07XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gQ29weSBrbm93biBhdHRyaWJ1dGVzIHRvIFhTRCBlbGVtZW50LlxuXG4gICAgZm9yICh2YXIga2V5IG9mIHJ1bGUuYXR0cmlidXRlTGlzdCkge1xuICAgICAgaWYgKGF0dHJUYmwuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAoKHhzZEVsZW0gYXMgYW55KSBhcyB7IFtrZXk6IHN0cmluZ106IHN0cmluZyB9KVtrZXldID0gYXR0clRibFtrZXldO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICh4c2RFbGVtLmluaXQpIHtcbiAgICAgIHN0YXRlLmF0dHJpYnV0ZVRibCA9IGF0dHJUYmw7XG5cbiAgICAgIHhzZEVsZW0uaW5pdChzdGF0ZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHN0YXRlO1xuICB9XG5cbiAgaW5pdChjYWNoZWQ6IENhY2hlUmVzdWx0LCBzb3VyY2U6IFNvdXJjZSwgbG9hZGVyOiBMb2FkZXIpIHtcbiAgICB2YXIgc3RhdGUgPSBuZXcgU3RhdGUobnVsbCwgdGhpcy5yb290UnVsZSwgc291cmNlKTtcbiAgICB2YXIgaW1wb3J0TGlzdDogeyBuYW1lc3BhY2U6IE5hbWVzcGFjZTsgdXJsOiBzdHJpbmcgfVtdID0gW107XG5cbiAgICB2YXIgeG1sID0gc2F4LmNyZWF0ZVN0cmVhbSh0cnVlLCB7IHBvc2l0aW9uOiB0cnVlIH0pO1xuXG4gICAgc3RhdGUuc3RhdGVTdGF0aWMgPSB7XG4gICAgICBjb250ZXh0OiB0aGlzLmNvbnRleHQsXG5cbiAgICAgIGFkZEltcG9ydDogKG5hbWVzcGFjZVRhcmdldDogTmFtZXNwYWNlLCB1cmxSZW1vdGU6IHN0cmluZykgPT4ge1xuICAgICAgICBpbXBvcnRMaXN0LnB1c2goeyBuYW1lc3BhY2U6IG5hbWVzcGFjZVRhcmdldCwgdXJsOiB1cmxSZW1vdGUgfSk7XG4gICAgICB9LFxuXG4gICAgICBnZXRMaW5lTnVtYmVyOiAoKSA9PiB7XG4gICAgICAgIC8vIHJldHVybiB4bWwuZ2V0Q3VycmVudExpbmVOdW1iZXIoKTtcbiAgICAgICAgcmV0dXJuIDA7XG4gICAgICB9LFxuXG4gICAgICBnZXRCeXRlUG9zOiAoKSA9PiB7XG4gICAgICAgIC8vIHJldHVybiB4bWwuZ2V0Q3VycmVudEJ5dGVJbmRleCgpO1xuICAgICAgICByZXR1cm4gMDtcbiAgICAgIH0sXG5cbiAgICAgIHRleHREZXB0aDogMCxcbiAgICAgIHRleHRIYW5kbGVyTGlzdDogW10sXG4gICAgfTtcblxuICAgIHZhciBzdGF0ZVN0YXRpYyA9IHN0YXRlLnN0YXRlU3RhdGljO1xuICAgIHZhciByZXNvbHZlOiAocmVzdWx0OiBTb3VyY2VbXSkgPT4gdm9pZDtcbiAgICB2YXIgcmVqZWN0OiAoZXJyOiBhbnkpID0+IHZvaWQ7XG5cbiAgICB2YXIgcHJvbWlzZSA9IG5ldyBQcm9taXNlPFNvdXJjZVtdPigocmVzLCByZWopID0+IHtcbiAgICAgIHJlc29sdmUgPSByZXM7XG4gICAgICByZWplY3QgPSByZWo7XG4gICAgfSk7XG5cbiAgICB2YXIgc3RyZWFtID0gY2FjaGVkLnN0cmVhbTtcblxuICAgIHZhciBwZW5kaW5nTGlzdCA9IHRoaXMucGVuZGluZ0xpc3Q7XG5cbiAgICB4bWwub24oXG4gICAgICBcInN0YXJ0RWxlbWVudFwiLFxuICAgICAgKG5hbWU6IHN0cmluZywgYXR0clRibDogeyBbbmFtZTogc3RyaW5nXTogc3RyaW5nIH0pID0+IHtcbiAgICAgICAgLy8geG1sLm9uKCdvcGVudGFnJywgKG5vZGU6IHNheC5UYWcpID0+IHtcbiAgICAgICAgLy8gdmFyIG5hbWUgPSBub2RlLm5hbWU7XG4gICAgICAgIC8vIHZhciBhdHRyVGJsID0gbm9kZS5hdHRyaWJ1dGVzO1xuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgc3RhdGUgPSB0aGlzLnN0YXJ0RWxlbWVudChzdGF0ZSwgbmFtZSwgYXR0clRibCk7XG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgIC8vIEV4Y2VwdGlvbnMgZXNjYXBpbmcgZnJvbSBub2RlLWV4cGF0J3MgZXZlbnQgaGFuZGxlcnMgY2F1c2Ugd2VpcmQgZWZmZWN0cy5cbiAgICAgICAgICBjb25zb2xlLmVycm9yKGVycik7XG4gICAgICAgICAgY29uc29sZS5sb2coXCJTdGFjazpcIik7XG4gICAgICAgICAgY29uc29sZS5lcnJvcihlcnIuc3RhY2spO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgKTtcblxuICAgIHhtbC5vbihcImVuZEVsZW1lbnRcIiwgZnVuY3Rpb24gKG5hbWU6IHN0cmluZykge1xuICAgICAgLy8geG1sLm9uKCdjbG9zZXRhZycsIGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKHN0YXRlLnhzZEVsZW1lbnQpIHtcbiAgICAgICAgaWYgKHN0YXRlLnhzZEVsZW1lbnQubG9hZGVkKSB7XG4gICAgICAgICAgc3RhdGUueHNkRWxlbWVudC5sb2FkZWQoc3RhdGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHN0YXRlLnhzZEVsZW1lbnQucmVzb2x2ZSkge1xuICAgICAgICAgIC8vIFNjaGVkdWxlIHJlc29sdmUgaG9vayB0byBydW4gYWZ0ZXIgcGFyc2luZyBpcyBkb25lLlxuICAgICAgICAgIC8vIEl0IG1pZ2h0IGRlcGVuZCBvbiBkZWZpbml0aW9ucyBpbiBzY29wZSBidXQgYXBwZWFyaW5nIGxhdGVyLFxuICAgICAgICAgIC8vIGFuZCBzZWxlY3RpdmVseSBwb3N0cG9uaW5nIG9ubHkgaG9va3MgdGhhdCBjYW5ub3QgcnVuIHlldFxuICAgICAgICAgIC8vIHdvdWxkIGJlIGV4dHJlbWVseSBjb21wbGljYXRlZC5cblxuICAgICAgICAgIHBlbmRpbmdMaXN0LnB1c2goc3RhdGUpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHN0YXRlID0gc3RhdGUucGFyZW50O1xuICAgIH0pO1xuXG4gICAgeG1sLm9uKFwidGV4dFwiLCBmdW5jdGlvbiAodGV4dDogc3RyaW5nKSB7XG4gICAgICBpZiAoc3RhdGVTdGF0aWMudGV4dERlcHRoKSB7XG4gICAgICAgIHN0YXRlU3RhdGljLnRleHRIYW5kbGVyTGlzdFtzdGF0ZVN0YXRpYy50ZXh0RGVwdGggLSAxXS5hZGRUZXh0KFxuICAgICAgICAgIHN0YXRlLFxuICAgICAgICAgIHRleHRcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHhtbC5vbihcImVycm9yXCIsIGZ1bmN0aW9uIChlcnI6IGFueSkge1xuICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xuICAgIH0pO1xuXG4gICAgLy8gLy8gRXhwYXQtc3BlY2lmaWMgaGFuZGxlci5cbiAgICAvLyBzdHJlYW0ub24oXCJkYXRhXCIsIChkYXRhOiBCdWZmZXIpID0+IHtcbiAgICAvLyAgIHhtbC5wYXJzZShkYXRhLCBmYWxzZSk7XG4gICAgLy8gfSk7XG5cbiAgICBzdHJlYW0ub24oXCJlbmRcIiwgKCkgPT4ge1xuICAgICAgLy8geG1sLm9uKCdlbmQnLCAoKSA9PiB7XG4gICAgICAvLyBGaW5pc2ggcGFyc2luZyB0aGUgZmlsZSAoc3luY2hyb25vdXMgY2FsbCkuXG5cbiAgICAgIC8vIHhtbC5wYXJzZShcIlwiLCB0cnVlKTsgLy8gRXhwYXQtc3BlY2lmaWMgbGluZS5cblxuICAgICAgcmVzb2x2ZShcbiAgICAgICAgaW1wb3J0TGlzdC5tYXAoKHNwZWM6IHsgbmFtZXNwYWNlOiBOYW1lc3BhY2U7IHVybDogc3RyaW5nIH0pID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhcbiAgICAgICAgICAgIFwiSU1QT1JUIGludG8gXCIgKyBzcGVjLm5hbWVzcGFjZS5uYW1lICsgXCIgZnJvbSBcIiArIHNwZWMudXJsXG4gICAgICAgICAgKTtcbiAgICAgICAgICByZXR1cm4gbG9hZGVyLmltcG9ydEZpbGUoc3BlYy51cmwsIHNwZWMubmFtZXNwYWNlKTtcbiAgICAgICAgfSlcbiAgICAgICk7XG4gICAgfSk7XG5cbiAgICBzdHJlYW0ucGlwZSh4bWwpO1xuXG4gICAgcmV0dXJuIHByb21pc2U7XG4gIH1cblxuICAvKiogQmluZCByZWZlcmVuY2VzLCBjYWxsIGFmdGVyIGFsbCBpbXBvcnRzIGhhdmUgYmVlbiBpbml0aWFsaXplZC4gKi9cbiAgcmVzb2x2ZSgpIHtcbiAgICBmb3IgKHZhciBwb3MgPSAwOyBwb3MgPCB0aGlzLnBlbmRpbmdMaXN0Lmxlbmd0aDsgKytwb3MpIHtcbiAgICAgIHZhciBzdGF0ZSA9IHRoaXMucGVuZGluZ0xpc3RbcG9zXTtcbiAgICAgIHRyeSB7XG4gICAgICAgIHN0YXRlLnhzZEVsZW1lbnQucmVzb2x2ZShzdGF0ZSk7XG4gICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihcbiAgICAgICAgICBlcnIgK1xuICAgICAgICAgICAgXCIgb24gbGluZSBcIiArXG4gICAgICAgICAgICBzdGF0ZS54c2RFbGVtZW50LmxpbmVOdW1iZXIgK1xuICAgICAgICAgICAgXCIgb2YgXCIgK1xuICAgICAgICAgICAgc3RhdGUuc291cmNlLnVybFxuICAgICAgICApO1xuICAgICAgICBjb25zb2xlLmxvZyhcIlN0YWNrOlwiKTtcbiAgICAgICAgY29uc29sZS5lcnJvcihlcnIuc3RhY2spO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMucGVuZGluZ0xpc3QgPSBbXTtcbiAgfVxuXG4gIHByaXZhdGUgY29udGV4dDogQ29udGV4dDtcblxuICAvKiogVGVtcG9yYXJpbHkgaG9sZHMgYSBxdWFsaWZpZWQgbmFtZSwgcmUtdXNlZCB0byBhdm9pZCBhbGxvY2F0aW5nIG9iamVjdHMuICovXG4gIHByaXZhdGUgcU5hbWUgPSBuZXcgUU5hbWUoKTtcblxuICAvKiogTGlzdCBvZiBwYXJzZXIgc3RhdGVzIHN0aWxsIG5lZWRpbmcgZnVydGhlciBwcm9jZXNzaW5nXG4gICAqIGFmdGVyIHByZXZpb3VzIHN0YWdlIGlzIGRvbmUuICovXG4gIHByaXZhdGUgcGVuZGluZ0xpc3Q6IFN0YXRlW10gPSBbXTtcblxuICAvKiogRGVmaW5lcyB2YWxpZCBjb250ZW50cyBmb3IgdGhlIFhNTCBmaWxlIHJvb3QgZWxlbWVudC4gKi9cbiAgcHJpdmF0ZSByb290UnVsZTogUnVsZTtcbn1cbiJdfQ==