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
        var stream = cached.stream;
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
            console.error(err);
        };
        // // Expat-specific handler.
        // stream.on("data", (data: Buffer) => {
        //   xml.parse(data, false);
        // });
        parser.onend = function () {
            // xml.on('end', () => {
            // Finish parsing the file (synchronous call).
            // xml.parse("", true); // Expat-specific line.
            resolve(importList.map(function (spec) {
                console.log("IMPORT into " + spec.namespace.name + " from " + spec.url);
                return loader.importFile(spec.url, spec.namespace);
            }));
        };
        try {
            parser.write(stream.read());
        }
        finally {
            parser.close();
        }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGFyc2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcGFyc2VyX3NjYWZmb2xkX2dlbmVyYXRvci9zcmMveHNkL1BhcnNlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsb0VBQW9FO0FBQ3BFLCtDQUErQzs7O0FBRS9DLHlCQUEyQjtBQUMzQixrQ0FBb0M7QUFHcEMsK0JBQThCO0FBRTlCLCtCQUFpQztBQUVqQyxpQ0FBZ0M7QUFJaEMsaUNBQWdDO0FBS2hDLHVEQUF1RDtBQUV2RCxTQUFTLFNBQVMsQ0FBQyxJQUFxQixFQUFFLE9BQWdCO0lBQ3hELElBQUksSUFBSSxDQUFDLElBQUk7UUFBRSxPQUFPLElBQUksQ0FBQyxJQUFZLENBQUM7SUFFeEMsSUFBSSxJQUFJLEdBQUcsSUFBSSxXQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFFMUIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7SUFFakIsS0FBeUIsVUFBaUIsRUFBakIsS0FBQSxJQUFJLENBQUMsVUFBVSxFQUFFLEVBQWpCLGNBQWlCLEVBQWpCLElBQWlCLEVBQUU7UUFBdkMsSUFBSSxZQUFZLFNBQUE7UUFDbkIsSUFBSSxRQUFRLEdBQUcsWUFBK0IsQ0FBQztRQUMvQyxJQUFJLFlBQVksR0FBRyxJQUFJLGFBQUssRUFBRSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUUzRSxJQUFJLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsR0FBRyxTQUFTLENBQUMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQ3ZFLElBQUksQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxHQUFHLFNBQVMsQ0FBQyxRQUFRLEVBQUUsT0FBTyxDQUFDLENBQUM7S0FDcEU7SUFFRCxJQUFJLEdBQUcsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDO0lBRXJCLEtBQWdCLFVB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LENBQUMsVUFBVTtvQkFDM0IsTUFBTTtvQkFDTixLQUFLLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FDbkIsQ0FBQztnQkFDRixPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUN0QixPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUMxQjtTQUNGO1FBRUQsSUFBSSxDQUFDLFdBQVcsR0FBRyxFQUFFLENBQUM7SUFDeEIsQ0FBQztJQWFILGFBQUM7QUFBRCxDQUFDLEFBaE5ELElBZ05DO0FBaE5ZLHdCQUFNIiwic291cmNlc0NvbnRlbnQiOlsiLy8gVGhpcyBmaWxlIGlzIHBhcnQgb2YgY3hzZCwgY29weXJpZ2h0IChjKSAyMDE1LTIwMTYgQnVzRmFzdGVyIEx0ZC5cbi8vIFJlbGVhc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSwgc2VlIExJQ0VOU0UuXG5cbmltcG9ydCAqIGFzIHNheCBmcm9tIFwic2F4XCI7XG5pbXBvcnQgKiBhcyBQcm9taXNlIGZyb20gXCJibHVlYmlyZFwiO1xuXG5pbXBvcnQgeyBDYWNoZVJlc3VsdCB9IGZyb20gXCJjZ2V0XCI7XG5pbXBvcnQgeyBSdWxlIH0gZnJvbSBcIi4vUnVsZVwiO1xuXG5pbXBvcnQgKiBhcyB0eXBlcyBmcm9tIFwiLi90eXBlc1wiO1xuaW1wb3J0IHsgQ29udGV4dCB9IGZyb20gXCIuL0NvbnRleHRcIjtcbmltcG9ydCB7IFN0YXRlIH0gZnJvbSBcIi4vU3RhdGVcIjtcbmltcG9ydCB7IE5hbWVzcGFjZSB9IGZyb20gXCIuL05hbWVzcGFjZVwiO1xuaW1wb3J0IHsgTG9hZGVyIH0gZnJvbSBcIi4vTG9hZGVyXCI7XG5pbXBvcnQgeyBTb3VyY2UgfSBmcm9tIFwiLi9Tb3VyY2VcIjtcbmltcG9ydCB7IFFOYW1lIH0gZnJvbSBcIi4vUU5hbWVcIjtcblxuaW1wb3J0ICogYXMgdXRpbCBmcm9tIFwidXRpbFwiO1xuaW1wb3J0IHsgQmFzZSB9IGZyb20gXCIuL3R5cGVzL0Jhc2VcIjtcblxuLyoqIFBhcnNlIHN5bnRheCBydWxlcyBlbmNvZGVkIGludG8gaGFuZGxlciBjbGFzc2VzLiAqL1xuXG5mdW5jdGlvbiBwYXJzZVJ1bGUoY3RvcjogdHlwZXMuQmFzZUNsYXNzLCBjb250ZXh0OiBDb250ZXh0KSB7XG4gIGlmIChjdG9yLnJ1bGUpIHJldHVybiBjdG9yLnJ1bGUgYXMgUnVsZTtcblxuICB2YXIgcnVsZSA9IG5ldyBSdWxlKGN0b3IpO1xuXG4gIGN0b3IucnVsZSA9IHJ1bGU7XG5cbiAgZm9yICh2YXIgYmFzZUZvbGxvd2VyIG9mIGN0b3IubWF5Q29udGFpbigpKSB7XG4gICAgdmFyIGZvbGxvd2VyID0gYmFzZUZvbGxvd2VyIGFzIHR5cGVzLkJhc2VDbGFzcztcbiAgICB2YXIgZm9sbG93ZXJOYW1lID0gbmV3IFFOYW1lKCkucGFyc2VDbGFzcyhmb2xsb3dlci5uYW1lLCBjb250ZXh0LnhzZFNwYWNlKTtcblxuICAgIHJ1bGUuZm9sbG93ZXJUYmxbZm9sbG93ZXJOYW1lLm5hbWVGdWxsXSA9IHBhcnNlUnVsZShmb2xsb3dlciwgY29udGV4dCk7XG4gICAgcnVsZS5mb2xsb3dlclRibFtmb2xsb3dlck5hbWUubmFtZV0gPSBwYXJzZVJ1bGUoZm9sbG93ZXIsIGNvbnRleHQpO1xuICB9XG5cbiAgdmFyIG9iaiA9IG5ldyBjdG9yKCk7XG5cbiAgZm9yICh2YXIga2V5IG9mIE9iamVjdC5rZXlzKG9iaikpIHtcbiAgICBydWxlLmF0dHJpYnV0ZUxpc3QucHVzaChrZXkpO1xuICB9XG5cbiAgcmV0dXJuIHJ1bGU7XG59XG5cbmV4cG9ydCBjbGFzcyBQYXJzZXIge1xuICBjb25zdHJ1Y3Rvcihjb250ZXh0OiBDb250ZXh0KSB7XG4gICAgdGhpcy5jb250ZXh0ID0gY29udGV4dDtcbiAgICB0aGlzLnJvb3RSdWxlID0gcGFyc2VSdWxlKHR5cGVzLlJvb3QsIGNvbnRleHQpO1xuICB9XG5cbiAgc3RhcnRFbGVtZW50KFxuICAgIHN0YXRlOiBTdGF0ZSxcbiAgICBuYW1lOiBzdHJpbmcsXG4gICAgYXR0clRibDogc2F4LlRhZ1tcImF0dHJpYnV0ZXNcIl0gfCBzYXguUXVhbGlmaWVkVGFnW1wiYXR0cmlidXRlc1wiXVxuICApIHtcbiAgICB2YXIgcU5hbWUgPSB0aGlzLnFOYW1lO1xuXG4gICAgcU5hbWUucGFyc2UobmFtZSwgc3RhdGUuc291cmNlLCBzdGF0ZS5zb3VyY2UuZGVmYXVsdE5hbWVzcGFjZSk7XG5cbiAgICB2YXIgcnVsZSA9IHN0YXRlLnJ1bGU7XG5cbiAgICBpZiAocnVsZSkge1xuICAgICAgcnVsZSA9XG4gICAgICAgIHJ1bGUuZm9sbG93ZXJUYmxbcU5hbWUubmFtZUZ1bGxdIHx8XG4gICAgICAgIHJ1bGUuZm9sbG93ZXJUYmxbcU5hbWUubmFtZV0gfHxcbiAgICAgICAgcnVsZS5mb2xsb3dlclRibFtcIipcIl07XG4gICAgICAvLyBpZighcnVsZSkgY29uc29sZS5sb2coJ1VuaGFuZGxlZCBjaGlsZCAnICsgc3RhdGUucnVsZS5xTmFtZS5uYW1lRnVsbCArICcgLT4gJyArIHFOYW1lLm5hbWVGdWxsKTtcbiAgICB9XG5cbiAgICBzdGF0ZSA9IG5ldyBTdGF0ZShzdGF0ZSwgcnVsZSk7XG5cbiAgICBpZiAoIXJ1bGUgfHwgIXJ1bGUucHJvdG8pIHJldHVybiBzdGF0ZTtcblxuICAgIHZhciB4c2RFbGVtID0gbmV3IChydWxlLnByb3RvIGFzIHR5cGVzLkJhc2VDbGFzcykoc3RhdGUpO1xuXG4gICAgc3RhdGUueHNkRWxlbWVudCA9IHhzZEVsZW07XG5cbiAgICAvLyBNYWtlIGFsbCBhdHRyaWJ1dGVzIGxvd2VyY2FzZS5cblxuICAgIGZvciAodmFyIGtleSBvZiBPYmplY3Qua2V5cyhhdHRyVGJsKSkge1xuICAgICAgdmFyIGtleUxvd2VyID0ga2V5LnRvTG93ZXJDYXNlKCk7XG5cbiAgICAgIGlmIChrZXkgIT0ga2V5TG93ZXIgJiYgIWF0dHJUYmwuaGFzT3duUHJvcGVydHkoa2V5TG93ZXIpKSB7XG4gICAgICAgIGF0dHJUYmxba2V5TG93ZXJdID0gYXR0clRibFtrZXldO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIENvcHkga25vd24gYXR0cmlidXRlcyB0byBYU0QgZWxlbWVudC5cblxuICAgIGZvciAodmFyIGtleSBvZiBydWxlLmF0dHJpYnV0ZUxpc3QpIHtcbiAgICAgIGlmIChhdHRyVGJsLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgKHhzZEVsZW0gYXMgYW55KVtrZXldID0gYXR0clRibFtrZXldO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICh4c2RFbGVtLmluaXQpIHtcbiAgICAgIHN0YXRlLmF0dHJpYnV0ZVRibCA9IGF0dHJUYmw7XG5cbiAgICAgIHhzZEVsZW0uaW5pdChzdGF0ZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHN0YXRlO1xuICB9XG5cbiAgaW5pdChjYWNoZWQ6IENhY2hlUmVzdWx0LCBzb3VyY2U6IFNvdXJjZSwgbG9hZGVyOiBMb2FkZXIpIHtcbiAgICB2YXIgc3RhdGUgPSBuZXcgU3RhdGUobnVsbCwgdGhpcy5yb290UnVsZSwgc291cmNlKTtcbiAgICB2YXIgaW1wb3J0TGlzdDogeyBuYW1lc3BhY2U6IE5hbWVzcGFjZTsgdXJsOiBzdHJpbmcgfVtdID0gW107XG5cbiAgICB2YXIgcGFyc2VyID0gc2F4LnBhcnNlcih0cnVlLCB7IHBvc2l0aW9uOiB0cnVlIH0pO1xuXG4gICAgc3RhdGUuc3RhdGVTdGF0aWMgPSB7XG4gICAgICBjb250ZXh0OiB0aGlzLmNvbnRleHQsXG5cbiAgICAgIGFkZEltcG9ydDogKG5hbWVzcGFjZVRhcmdldDogTmFtZXNwYWNlLCB1cmxSZW1vdGU6IHN0cmluZykgPT4ge1xuICAgICAgICBpbXBvcnRMaXN0LnB1c2goeyBuYW1lc3BhY2U6IG5hbWVzcGFjZVRhcmdldCwgdXJsOiB1cmxSZW1vdGUgfSk7XG4gICAgICB9LFxuXG4gICAgICBnZXRMaW5lTnVtYmVyOiAoKSA9PiB7XG4gICAgICAgIHJldHVybiBwYXJzZXIubGluZSArIDE7XG4gICAgICB9LFxuXG4gICAgICBnZXRCeXRlUG9zOiAoKSA9PiB7XG4gICAgICAgIHJldHVybiBwYXJzZXIucG9zaXRpb247XG4gICAgICB9LFxuXG4gICAgICB0ZXh0RGVwdGg6IDAsXG4gICAgICB0ZXh0SGFuZGxlckxpc3Q6IFtdLFxuICAgIH07XG5cbiAgICB2YXIgc3RhdGVTdGF0aWMgPSBzdGF0ZS5zdGF0ZVN0YXRpYztcbiAgICB2YXIgcmVzb2x2ZTogKHJlc3VsdDogU291cmNlW10pID0+IHZvaWQ7XG4gICAgdmFyIHJlamVjdDogKGVycjogYW55KSA9PiB2b2lkO1xuXG4gICAgdmFyIHByb21pc2UgPSBuZXcgUHJvbWlzZTxTb3VyY2VbXT4oKHJlcywgcmVqKSA9PiB7XG4gICAgICByZXNvbHZlID0gcmVzO1xuICAgICAgcmVqZWN0ID0gcmVqO1xuICAgIH0pO1xuXG4gICAgdmFyIHN0cmVhbSA9IGNhY2hlZC5zdHJlYW07XG5cbiAgICB2YXIgcGVuZGluZ0xpc3QgPSB0aGlzLnBlbmRpbmdMaXN0O1xuXG4gICAgcGFyc2VyLm9ub3BlbnRhZyA9ICh0YWc6IHNheC5UYWcgfCBzYXguUXVhbGlmaWVkVGFnKSA9PiB7XG4gICAgICAvLyB4bWwub24oJ29wZW50YWcnLCAobm9kZTogc2F4LlRhZykgPT4ge1xuICAgICAgLy8gdmFyIG5hbWUgPSBub2RlLm5hbWU7XG4gICAgICAvLyB2YXIgYXR0clRibCA9IG5vZGUuYXR0cmlidXRlcztcblxuICAgICAgdHJ5IHtcbiAgICAgICAgc3RhdGUgPSB0aGlzLnN0YXJ0RWxlbWVudChzdGF0ZSwgdGFnLm5hbWUsIHRhZy5hdHRyaWJ1dGVzKTtcbiAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAvLyBFeGNlcHRpb25zIGVzY2FwaW5nIGZyb20gbm9kZS1leHBhdCdzIGV2ZW50IGhhbmRsZXJzIGNhdXNlIHdlaXJkIGVmZmVjdHMuXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcbiAgICAgICAgY29uc29sZS5sb2coXCJTdGFjazpcIik7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyLnN0YWNrKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgcGFyc2VyLm9uY2xvc2V0YWcgPSBmdW5jdGlvbiAobmFtZTogc3RyaW5nKSB7XG4gICAgICAvLyB4bWwub24oJ2Nsb3NldGFnJywgZnVuY3Rpb24oKSB7XG4gICAgICBpZiAoc3RhdGUueHNkRWxlbWVudCkge1xuICAgICAgICBpZiAoc3RhdGUueHNkRWxlbWVudC5sb2FkZWQpIHtcbiAgICAgICAgICBzdGF0ZS54c2RFbGVtZW50LmxvYWRlZChzdGF0ZSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc3RhdGUueHNkRWxlbWVudC5yZXNvbHZlKSB7XG4gICAgICAgICAgLy8gU2NoZWR1bGUgcmVzb2x2ZSBob29rIHRvIHJ1biBhZnRlciBwYXJzaW5nIGlzIGRvbmUuXG4gICAgICAgICAgLy8gSXQgbWlnaHQgZGVwZW5kIG9uIGRlZmluaXRpb25zIGluIHNjb3BlIGJ1dCBhcHBlYXJpbmcgbGF0ZXIsXG4gICAgICAgICAgLy8gYW5kIHNlbGVjdGl2ZWx5IHBvc3Rwb25pbmcgb25seSBob29rcyB0aGF0IGNhbm5vdCBydW4geWV0XG4gICAgICAgICAgLy8gd291bGQgYmUgZXh0cmVtZWx5IGNvbXBsaWNhdGVkLlxuXG4gICAgICAgICAgcGVuZGluZ0xpc3QucHVzaChzdGF0ZSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgc3RhdGUgPSBzdGF0ZS5wYXJlbnQ7XG4gICAgfTtcblxuICAgIHBhcnNlci5vbnRleHQgPSBmdW5jdGlvbiAodGV4dDogc3RyaW5nKSB7XG4gICAgICBpZiAoc3RhdGVTdGF0aWMudGV4dERlcHRoKSB7XG4gICAgICAgIHN0YXRlU3RhdGljLnRleHRIYW5kbGVyTGlzdFtzdGF0ZVN0YXRpYy50ZXh0RGVwdGggLSAxXS5hZGRUZXh0KFxuICAgICAgICAgIHN0YXRlLFxuICAgICAgICAgIHRleHRcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgcGFyc2VyLm9uZXJyb3IgPSBmdW5jdGlvbiAoZXJyOiBhbnkpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcbiAgICB9O1xuXG4gICAgLy8gLy8gRXhwYXQtc3BlY2lmaWMgaGFuZGxlci5cbiAgICAvLyBzdHJlYW0ub24oXCJkYXRhXCIsIChkYXRhOiBCdWZmZXIpID0+IHtcbiAgICAvLyAgIHhtbC5wYXJzZShkYXRhLCBmYWxzZSk7XG4gICAgLy8gfSk7XG5cbiAgICBwYXJzZXIub25lbmQgPSAoKSA9PiB7XG4gICAgICAvLyB4bWwub24oJ2VuZCcsICgpID0+IHtcbiAgICAgIC8vIEZpbmlzaCBwYXJzaW5nIHRoZSBmaWxlIChzeW5jaHJvbm91cyBjYWxsKS5cblxuICAgICAgLy8geG1sLnBhcnNlKFwiXCIsIHRydWUpOyAvLyBFeHBhdC1zcGVjaWZpYyBsaW5lLlxuXG4gICAgICByZXNvbHZlKFxuICAgICAgICBpbXBvcnRMaXN0Lm1hcCgoc3BlYzogeyBuYW1lc3BhY2U6IE5hbWVzcGFjZTsgdXJsOiBzdHJpbmcgfSkgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKFxuICAgICAgICAgICAgXCJJTVBPUlQgaW50byBcIiArIHNwZWMubmFtZXNwYWNlLm5hbWUgKyBcIiBmcm9tIFwiICsgc3BlYy51cmxcbiAgICAgICAgICApO1xuICAgICAgICAgIHJldHVybiBsb2FkZXIuaW1wb3J0RmlsZShzcGVjLnVybCwgc3BlYy5uYW1lc3BhY2UpO1xuICAgICAgICB9KVxuICAgICAgKTtcbiAgICB9O1xuICAgIHRyeSB7XG4gICAgICBwYXJzZXIud3JpdGUoc3RyZWFtLnJlYWQoKSk7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIHBhcnNlci5jbG9zZSgpO1xuICAgIH1cblxuICAgIHJldHVybiBwcm9taXNlO1xuICB9XG5cbiAgLyoqIEJpbmQgcmVmZXJlbmNlcywgY2FsbCBhZnRlciBhbGwgaW1wb3J0cyBoYXZlIGJlZW4gaW5pdGlhbGl6ZWQuICovXG4gIHJlc29sdmUoKSB7XG4gICAgZm9yICh2YXIgcG9zID0gMDsgcG9zIDwgdGhpcy5wZW5kaW5nTGlzdC5sZW5ndGg7ICsrcG9zKSB7XG4gICAgICB2YXIgc3RhdGUgPSB0aGlzLnBlbmRpbmdMaXN0W3Bvc107XG4gICAgICB0cnkge1xuICAgICAgICBzdGF0ZS54c2RFbGVtZW50LnJlc29sdmUoc3RhdGUpO1xuICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXG4gICAgICAgICAgZXJyICtcbiAgICAgICAgICAgIFwiIG9uIGxpbmUgXCIgK1xuICAgICAgICAgICAgc3RhdGUueHNkRWxlbWVudC5saW5lTnVtYmVyICtcbiAgICAgICAgICAgIFwiIG9mIFwiICtcbiAgICAgICAgICAgIHN0YXRlLnNvdXJjZS51cmxcbiAgICAgICAgKTtcbiAgICAgICAgY29uc29sZS5sb2coXCJTdGFjazpcIik7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyLnN0YWNrKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLnBlbmRpbmdMaXN0ID0gW107XG4gIH1cblxuICBwcml2YXRlIGNvbnRleHQ6IENvbnRleHQ7XG5cbiAgLyoqIFRlbXBvcmFyaWx5IGhvbGRzIGEgcXVhbGlmaWVkIG5hbWUsIHJlLXVzZWQgdG8gYXZvaWQgYWxsb2NhdGluZyBvYmplY3RzLiAqL1xuICBwcml2YXRlIHFOYW1lID0gbmV3IFFOYW1lKCk7XG5cbiAgLyoqIExpc3Qgb2YgcGFyc2VyIHN0YXRlcyBzdGlsbCBuZWVkaW5nIGZ1cnRoZXIgcHJvY2Vzc2luZ1xuICAgKiBhZnRlciBwcmV2aW91cyBzdGFnZSBpcyBkb25lLiAqL1xuICBwcml2YXRlIHBlbmRpbmdMaXN0OiBTdGF0ZVtdID0gW107XG5cbiAgLyoqIERlZmluZXMgdmFsaWQgY29udGVudHMgZm9yIHRoZSBYTUwgZmlsZSByb290IGVsZW1lbnQuICovXG4gIHByaXZhdGUgcm9vdFJ1bGU6IFJ1bGU7XG59XG4iXX0=