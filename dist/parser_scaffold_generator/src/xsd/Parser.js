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
        // stream.pipe(xml);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGFyc2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcGFyc2VyX3NjYWZmb2xkX2dlbmVyYXRvci9zcmMveHNkL1BhcnNlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsb0VBQW9FO0FBQ3BFLCtDQUErQzs7O0FBRS9DLHlCQUEyQjtBQUMzQixrQ0FBb0M7QUFHcEMsK0JBQThCO0FBRTlCLCtCQUFpQztBQUVqQyxpQ0FBZ0M7QUFJaEMsaUNBQWdDO0FBSWhDLHVEQUF1RDtBQUV2RCxTQUFTLFNBQVMsQ0FBQyxJQUFxQixFQUFFLE9BQWdCO0lBQ3hELElBQUksSUFBSSxDQUFDLElBQUk7UUFBRSxPQUFPLElBQUksQ0FBQyxJQUFZLENBQUM7SUFFeEMsSUFBSSxJQUFJLEdBQUcsSUFBSSxXQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFFMUIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7SUFFakIsS0FBeUIsVUFBaUIsRUFBakIsS0FBQSxJQUFJLENBQUMsVUFBVSxFQUFFLEVBQWpCLGNBQWlCLEVBQWpCLElBQWlCLEVBQUU7UUFBdkMsSUFBSSxZQUFZLFNBQUE7UUFDbkIsSUFBSSxRQUFRLEdBQUcsWUFBK0IsQ0FBQztRQUMvQyxJQUFJLFlBQVksR0FBRyxJQUFJLGFBQUssRUFBRSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUUzRSxJQUFJLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsR0FBRyxTQUFTLENBQUMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQ3ZFLElBQUksQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxHQUFHLFNBQVMsQ0FBQyxRQUFRLEVBQUUsT0FBTyxDQUFDLENBQUM7S0FDcEU7SUFFRCxJQUFJLEdBQUcsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDO0lBRXJCLEtBQWdCLFVB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LE1BQU0sQ0FBQyxHQUFHLENBQ25CLENBQUM7Z0JBQ0YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDdEIsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDMUI7U0FDRjtRQUVELElBQUksQ0FBQyxXQUFXLEdBQUcsRUFBRSxDQUFDO0lBQ3hCLENBQUM7SUFhSCxhQUFDO0FBQUQsQ0FBQyxBQWxORCxJQWtOQztBQWxOWSx3QkFBTSIsInNvdXJjZXNDb250ZW50IjpbIi8vIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIGN4c2QsIGNvcHlyaWdodCAoYykgMjAxNS0yMDE2IEJ1c0Zhc3RlciBMdGQuXG4vLyBSZWxlYXNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UsIHNlZSBMSUNFTlNFLlxuXG5pbXBvcnQgKiBhcyBzYXggZnJvbSBcInNheFwiO1xuaW1wb3J0ICogYXMgUHJvbWlzZSBmcm9tIFwiYmx1ZWJpcmRcIjtcblxuaW1wb3J0IHsgQ2FjaGVSZXN1bHQgfSBmcm9tIFwiY2dldFwiO1xuaW1wb3J0IHsgUnVsZSB9IGZyb20gXCIuL1J1bGVcIjtcblxuaW1wb3J0ICogYXMgdHlwZXMgZnJvbSBcIi4vdHlwZXNcIjtcbmltcG9ydCB7IENvbnRleHQgfSBmcm9tIFwiLi9Db250ZXh0XCI7XG5pbXBvcnQgeyBTdGF0ZSB9IGZyb20gXCIuL1N0YXRlXCI7XG5pbXBvcnQgeyBOYW1lc3BhY2UgfSBmcm9tIFwiLi9OYW1lc3BhY2VcIjtcbmltcG9ydCB7IExvYWRlciB9IGZyb20gXCIuL0xvYWRlclwiO1xuaW1wb3J0IHsgU291cmNlIH0gZnJvbSBcIi4vU291cmNlXCI7XG5pbXBvcnQgeyBRTmFtZSB9IGZyb20gXCIuL1FOYW1lXCI7XG5cbmltcG9ydCAqIGFzIHV0aWwgZnJvbSBcInV0aWxcIjtcblxuLyoqIFBhcnNlIHN5bnRheCBydWxlcyBlbmNvZGVkIGludG8gaGFuZGxlciBjbGFzc2VzLiAqL1xuXG5mdW5jdGlvbiBwYXJzZVJ1bGUoY3RvcjogdHlwZXMuQmFzZUNsYXNzLCBjb250ZXh0OiBDb250ZXh0KSB7XG4gIGlmIChjdG9yLnJ1bGUpIHJldHVybiBjdG9yLnJ1bGUgYXMgUnVsZTtcblxuICB2YXIgcnVsZSA9IG5ldyBSdWxlKGN0b3IpO1xuXG4gIGN0b3IucnVsZSA9IHJ1bGU7XG5cbiAgZm9yICh2YXIgYmFzZUZvbGxvd2VyIG9mIGN0b3IubWF5Q29udGFpbigpKSB7XG4gICAgdmFyIGZvbGxvd2VyID0gYmFzZUZvbGxvd2VyIGFzIHR5cGVzLkJhc2VDbGFzcztcbiAgICB2YXIgZm9sbG93ZXJOYW1lID0gbmV3IFFOYW1lKCkucGFyc2VDbGFzcyhmb2xsb3dlci5uYW1lLCBjb250ZXh0LnhzZFNwYWNlKTtcblxuICAgIHJ1bGUuZm9sbG93ZXJUYmxbZm9sbG93ZXJOYW1lLm5hbWVGdWxsXSA9IHBhcnNlUnVsZShmb2xsb3dlciwgY29udGV4dCk7XG4gICAgcnVsZS5mb2xsb3dlclRibFtmb2xsb3dlck5hbWUubmFtZV0gPSBwYXJzZVJ1bGUoZm9sbG93ZXIsIGNvbnRleHQpO1xuICB9XG5cbiAgdmFyIG9iaiA9IG5ldyBjdG9yKCk7XG5cbiAgZm9yICh2YXIga2V5IG9mIE9iamVjdC5rZXlzKG9iaikpIHtcbiAgICBydWxlLmF0dHJpYnV0ZUxpc3QucHVzaChrZXkpO1xuICB9XG5cbiAgcmV0dXJuIHJ1bGU7XG59XG5cbmV4cG9ydCBjbGFzcyBQYXJzZXIge1xuICBjb25zdHJ1Y3Rvcihjb250ZXh0OiBDb250ZXh0KSB7XG4gICAgdGhpcy5jb250ZXh0ID0gY29udGV4dDtcbiAgICB0aGlzLnJvb3RSdWxlID0gcGFyc2VSdWxlKHR5cGVzLlJvb3QsIGNvbnRleHQpO1xuICB9XG5cbiAgc3RhcnRFbGVtZW50KFxuICAgIHN0YXRlOiBTdGF0ZSxcbiAgICBuYW1lOiBzdHJpbmcsXG4gICAgYXR0clRibDogeyBbbmFtZTogc3RyaW5nXTogc3RyaW5nIH1cbiAgKSB7XG4gICAgdmFyIHFOYW1lID0gdGhpcy5xTmFtZTtcblxuICAgIHFOYW1lLnBhcnNlKG5hbWUsIHN0YXRlLnNvdXJjZSwgc3RhdGUuc291cmNlLmRlZmF1bHROYW1lc3BhY2UpO1xuXG4gICAgdmFyIHJ1bGUgPSBzdGF0ZS5ydWxlO1xuXG4gICAgaWYgKHJ1bGUpIHtcbiAgICAgIHJ1bGUgPVxuICAgICAgICBydWxlLmZvbGxvd2VyVGJsW3FOYW1lLm5hbWVGdWxsXSB8fFxuICAgICAgICBydWxlLmZvbGxvd2VyVGJsW3FOYW1lLm5hbWVdIHx8XG4gICAgICAgIHJ1bGUuZm9sbG93ZXJUYmxbXCIqXCJdO1xuICAgICAgLy8gaWYoIXJ1bGUpIGNvbnNvbGUubG9nKCdVbmhhbmRsZWQgY2hpbGQgJyArIHN0YXRlLnJ1bGUucU5hbWUubmFtZUZ1bGwgKyAnIC0+ICcgKyBxTmFtZS5uYW1lRnVsbCk7XG4gICAgfVxuXG4gICAgc3RhdGUgPSBuZXcgU3RhdGUoc3RhdGUsIHJ1bGUpO1xuXG4gICAgaWYgKCFydWxlIHx8ICFydWxlLnByb3RvKSByZXR1cm4gc3RhdGU7XG5cbiAgICB2YXIgeHNkRWxlbSA9IG5ldyAocnVsZS5wcm90byBhcyB0eXBlcy5CYXNlQ2xhc3MpKHN0YXRlKTtcblxuICAgIHN0YXRlLnhzZEVsZW1lbnQgPSB4c2RFbGVtO1xuXG4gICAgLy8gTWFrZSBhbGwgYXR0cmlidXRlcyBsb3dlcmNhc2UuXG5cbiAgICBmb3IgKHZhciBrZXkgb2YgT2JqZWN0LmtleXMoYXR0clRibCkpIHtcbiAgICAgIHZhciBrZXlMb3dlciA9IGtleS50b0xvd2VyQ2FzZSgpO1xuXG4gICAgICBpZiAoa2V5ICE9IGtleUxvd2VyICYmICFhdHRyVGJsLmhhc093blByb3BlcnR5KGtleUxvd2VyKSkge1xuICAgICAgICBhdHRyVGJsW2tleUxvd2VyXSA9IGF0dHJUYmxba2V5XTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBDb3B5IGtub3duIGF0dHJpYnV0ZXMgdG8gWFNEIGVsZW1lbnQuXG5cbiAgICBmb3IgKHZhciBrZXkgb2YgcnVsZS5hdHRyaWJ1dGVMaXN0KSB7XG4gICAgICBpZiAoYXR0clRibC5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICgoeHNkRWxlbSBhcyBhbnkpIGFzIHsgW2tleTogc3RyaW5nXTogc3RyaW5nIH0pW2tleV0gPSBhdHRyVGJsW2tleV07XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHhzZEVsZW0uaW5pdCkge1xuICAgICAgc3RhdGUuYXR0cmlidXRlVGJsID0gYXR0clRibDtcblxuICAgICAgeHNkRWxlbS5pbml0KHN0YXRlKTtcbiAgICB9XG5cbiAgICByZXR1cm4gc3RhdGU7XG4gIH1cblxuICBpbml0KGNhY2hlZDogQ2FjaGVSZXN1bHQsIHNvdXJjZTogU291cmNlLCBsb2FkZXI6IExvYWRlcikge1xuICAgIHZhciBzdGF0ZSA9IG5ldyBTdGF0ZShudWxsLCB0aGlzLnJvb3RSdWxlLCBzb3VyY2UpO1xuICAgIHZhciBpbXBvcnRMaXN0OiB7IG5hbWVzcGFjZTogTmFtZXNwYWNlOyB1cmw6IHN0cmluZyB9W10gPSBbXTtcblxuICAgIHZhciB4bWwgPSBzYXguY3JlYXRlU3RyZWFtKHRydWUsIHsgcG9zaXRpb246IHRydWUgfSk7XG5cbiAgICBzdGF0ZS5zdGF0ZVN0YXRpYyA9IHtcbiAgICAgIGNvbnRleHQ6IHRoaXMuY29udGV4dCxcblxuICAgICAgYWRkSW1wb3J0OiAobmFtZXNwYWNlVGFyZ2V0OiBOYW1lc3BhY2UsIHVybFJlbW90ZTogc3RyaW5nKSA9PiB7XG4gICAgICAgIGltcG9ydExpc3QucHVzaCh7IG5hbWVzcGFjZTogbmFtZXNwYWNlVGFyZ2V0LCB1cmw6IHVybFJlbW90ZSB9KTtcbiAgICAgIH0sXG5cbiAgICAgIGdldExpbmVOdW1iZXI6ICgpID0+IHtcbiAgICAgICAgLy8gcmV0dXJuIHhtbC5nZXRDdXJyZW50TGluZU51bWJlcigpO1xuICAgICAgICByZXR1cm4gMDtcbiAgICAgIH0sXG5cbiAgICAgIGdldEJ5dGVQb3M6ICgpID0+IHtcbiAgICAgICAgLy8gcmV0dXJuIHhtbC5nZXRDdXJyZW50Qnl0ZUluZGV4KCk7XG4gICAgICAgIHJldHVybiAwO1xuICAgICAgfSxcblxuICAgICAgdGV4dERlcHRoOiAwLFxuICAgICAgdGV4dEhhbmRsZXJMaXN0OiBbXSxcbiAgICB9O1xuXG4gICAgdmFyIHN0YXRlU3RhdGljID0gc3RhdGUuc3RhdGVTdGF0aWM7XG4gICAgdmFyIHJlc29sdmU6IChyZXN1bHQ6IFNvdXJjZVtdKSA9PiB2b2lkO1xuICAgIHZhciByZWplY3Q6IChlcnI6IGFueSkgPT4gdm9pZDtcblxuICAgIHZhciBwcm9taXNlID0gbmV3IFByb21pc2U8U291cmNlW10+KChyZXMsIHJlaikgPT4ge1xuICAgICAgcmVzb2x2ZSA9IHJlcztcbiAgICAgIHJlamVjdCA9IHJlajtcbiAgICB9KTtcblxuICAgIHZhciBzdHJlYW0gPSBjYWNoZWQuc3RyZWFtO1xuXG4gICAgdmFyIHBlbmRpbmdMaXN0ID0gdGhpcy5wZW5kaW5nTGlzdDtcblxuICAgIHhtbC5vbihcbiAgICAgIFwic3RhcnRFbGVtZW50XCIsXG4gICAgICAobmFtZTogc3RyaW5nLCBhdHRyVGJsOiB7IFtuYW1lOiBzdHJpbmddOiBzdHJpbmcgfSkgPT4ge1xuICAgICAgICAvLyB4bWwub24oJ29wZW50YWcnLCAobm9kZTogc2F4LlRhZykgPT4ge1xuICAgICAgICAvLyB2YXIgbmFtZSA9IG5vZGUubmFtZTtcbiAgICAgICAgLy8gdmFyIGF0dHJUYmwgPSBub2RlLmF0dHJpYnV0ZXM7XG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBzdGF0ZSA9IHRoaXMuc3RhcnRFbGVtZW50KHN0YXRlLCBuYW1lLCBhdHRyVGJsKTtcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgLy8gRXhjZXB0aW9ucyBlc2NhcGluZyBmcm9tIG5vZGUtZXhwYXQncyBldmVudCBoYW5kbGVycyBjYXVzZSB3ZWlyZCBlZmZlY3RzLlxuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcbiAgICAgICAgICBjb25zb2xlLmxvZyhcIlN0YWNrOlwiKTtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKGVyci5zdGFjayk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICApO1xuXG4gICAgeG1sLm9uKFwiZW5kRWxlbWVudFwiLCBmdW5jdGlvbiAobmFtZTogc3RyaW5nKSB7XG4gICAgICAvLyB4bWwub24oJ2Nsb3NldGFnJywgZnVuY3Rpb24oKSB7XG4gICAgICBpZiAoc3RhdGUueHNkRWxlbWVudCkge1xuICAgICAgICBpZiAoc3RhdGUueHNkRWxlbWVudC5sb2FkZWQpIHtcbiAgICAgICAgICBzdGF0ZS54c2RFbGVtZW50LmxvYWRlZChzdGF0ZSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc3RhdGUueHNkRWxlbWVudC5yZXNvbHZlKSB7XG4gICAgICAgICAgLy8gU2NoZWR1bGUgcmVzb2x2ZSBob29rIHRvIHJ1biBhZnRlciBwYXJzaW5nIGlzIGRvbmUuXG4gICAgICAgICAgLy8gSXQgbWlnaHQgZGVwZW5kIG9uIGRlZmluaXRpb25zIGluIHNjb3BlIGJ1dCBhcHBlYXJpbmcgbGF0ZXIsXG4gICAgICAgICAgLy8gYW5kIHNlbGVjdGl2ZWx5IHBvc3Rwb25pbmcgb25seSBob29rcyB0aGF0IGNhbm5vdCBydW4geWV0XG4gICAgICAgICAgLy8gd291bGQgYmUgZXh0cmVtZWx5IGNvbXBsaWNhdGVkLlxuXG4gICAgICAgICAgcGVuZGluZ0xpc3QucHVzaChzdGF0ZSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgc3RhdGUgPSBzdGF0ZS5wYXJlbnQ7XG4gICAgfSk7XG5cbiAgICB4bWwub24oXCJ0ZXh0XCIsIGZ1bmN0aW9uICh0ZXh0OiBzdHJpbmcpIHtcbiAgICAgIGlmIChzdGF0ZVN0YXRpYy50ZXh0RGVwdGgpIHtcbiAgICAgICAgc3RhdGVTdGF0aWMudGV4dEhhbmRsZXJMaXN0W3N0YXRlU3RhdGljLnRleHREZXB0aCAtIDFdLmFkZFRleHQoXG4gICAgICAgICAgc3RhdGUsXG4gICAgICAgICAgdGV4dFxuICAgICAgICApO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgeG1sLm9uKFwiZXJyb3JcIiwgZnVuY3Rpb24gKGVycjogYW55KSB7XG4gICAgICBjb25zb2xlLmVycm9yKGVycik7XG4gICAgfSk7XG5cbiAgICAvLyAvLyBFeHBhdC1zcGVjaWZpYyBoYW5kbGVyLlxuICAgIC8vIHN0cmVhbS5vbihcImRhdGFcIiwgKGRhdGE6IEJ1ZmZlcikgPT4ge1xuICAgIC8vICAgeG1sLnBhcnNlKGRhdGEsIGZhbHNlKTtcbiAgICAvLyB9KTtcblxuICAgIHN0cmVhbS5vbihcImVuZFwiLCAoKSA9PiB7XG4gICAgICAvLyB4bWwub24oJ2VuZCcsICgpID0+IHtcbiAgICAgIC8vIEZpbmlzaCBwYXJzaW5nIHRoZSBmaWxlIChzeW5jaHJvbm91cyBjYWxsKS5cblxuICAgICAgLy8geG1sLnBhcnNlKFwiXCIsIHRydWUpOyAvLyBFeHBhdC1zcGVjaWZpYyBsaW5lLlxuXG4gICAgICByZXNvbHZlKFxuICAgICAgICBpbXBvcnRMaXN0Lm1hcCgoc3BlYzogeyBuYW1lc3BhY2U6IE5hbWVzcGFjZTsgdXJsOiBzdHJpbmcgfSkgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKFxuICAgICAgICAgICAgXCJJTVBPUlQgaW50byBcIiArIHNwZWMubmFtZXNwYWNlLm5hbWUgKyBcIiBmcm9tIFwiICsgc3BlYy51cmxcbiAgICAgICAgICApO1xuICAgICAgICAgIHJldHVybiBsb2FkZXIuaW1wb3J0RmlsZShzcGVjLnVybCwgc3BlYy5uYW1lc3BhY2UpO1xuICAgICAgICB9KVxuICAgICAgKTtcbiAgICB9KTtcblxuICAgIC8vIHN0cmVhbS5waXBlKHhtbCk7XG5cbiAgICByZXR1cm4gcHJvbWlzZTtcbiAgfVxuXG4gIC8qKiBCaW5kIHJlZmVyZW5jZXMsIGNhbGwgYWZ0ZXIgYWxsIGltcG9ydHMgaGF2ZSBiZWVuIGluaXRpYWxpemVkLiAqL1xuICByZXNvbHZlKCkge1xuICAgIGZvciAodmFyIHBvcyA9IDA7IHBvcyA8IHRoaXMucGVuZGluZ0xpc3QubGVuZ3RoOyArK3Bvcykge1xuICAgICAgdmFyIHN0YXRlID0gdGhpcy5wZW5kaW5nTGlzdFtwb3NdO1xuICAgICAgdHJ5IHtcbiAgICAgICAgc3RhdGUueHNkRWxlbWVudC5yZXNvbHZlKHN0YXRlKTtcbiAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICBjb25zb2xlLmVycm9yKFxuICAgICAgICAgIGVyciArXG4gICAgICAgICAgICBcIiBvbiBsaW5lIFwiICtcbiAgICAgICAgICAgIHN0YXRlLnhzZEVsZW1lbnQubGluZU51bWJlciArXG4gICAgICAgICAgICBcIiBvZiBcIiArXG4gICAgICAgICAgICBzdGF0ZS5zb3VyY2UudXJsXG4gICAgICAgICk7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiU3RhY2s6XCIpO1xuICAgICAgICBjb25zb2xlLmVycm9yKGVyci5zdGFjayk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5wZW5kaW5nTGlzdCA9IFtdO1xuICB9XG5cbiAgcHJpdmF0ZSBjb250ZXh0OiBDb250ZXh0O1xuXG4gIC8qKiBUZW1wb3JhcmlseSBob2xkcyBhIHF1YWxpZmllZCBuYW1lLCByZS11c2VkIHRvIGF2b2lkIGFsbG9jYXRpbmcgb2JqZWN0cy4gKi9cbiAgcHJpdmF0ZSBxTmFtZSA9IG5ldyBRTmFtZSgpO1xuXG4gIC8qKiBMaXN0IG9mIHBhcnNlciBzdGF0ZXMgc3RpbGwgbmVlZGluZyBmdXJ0aGVyIHByb2Nlc3NpbmdcbiAgICogYWZ0ZXIgcHJldmlvdXMgc3RhZ2UgaXMgZG9uZS4gKi9cbiAgcHJpdmF0ZSBwZW5kaW5nTGlzdDogU3RhdGVbXSA9IFtdO1xuXG4gIC8qKiBEZWZpbmVzIHZhbGlkIGNvbnRlbnRzIGZvciB0aGUgWE1MIGZpbGUgcm9vdCBlbGVtZW50LiAqL1xuICBwcml2YXRlIHJvb3RSdWxlOiBSdWxlO1xufVxuIl19