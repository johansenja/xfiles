"use strict";
// This file is part of cxsd, copyright (c) 2015-2016 BusFaster Ltd.
// Released under the MIT license, see LICENSE.
Object.defineProperty(exports, "__esModule", { value: true });
exports.Parser = void 0;
var expat = require("node-expat");
//import * as sax from 'sax';
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
    return (rule);
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
            rule = (rule.followerTbl[qName.nameFull] ||
                rule.followerTbl[qName.name] ||
                rule.followerTbl['*']);
            // if(!rule) console.log('Unhandled child ' + state.rule.qName.nameFull + ' -> ' + qName.nameFull);
        }
        state = new State_1.State(state, rule);
        if (!rule || !rule.proto)
            return (state);
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
        return (state);
    };
    Parser.prototype.init = function (cached, source, loader) {
        var _this = this;
        var state = new State_1.State(null, this.rootRule, source);
        var importList = [];
        var xml = new expat.Parser(null);
        // var xml = sax.createStream(true, { position: true });
        state.stateStatic = {
            context: this.context,
            addImport: function (namespaceTarget, urlRemote) {
                importList.push({ namespace: namespaceTarget, url: urlRemote });
            },
            getLineNumber: function () {
                return (xml.getCurrentLineNumber());
                // return(0);
            },
            getBytePos: function () {
                return (xml.getCurrentByteIndex());
                // return(0);
            },
            textDepth: 0,
            textHandlerList: []
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
        xml.on('startElement', function (name, attrTbl) {
            // xml.on('opentag', (node: sax.Tag) => {
            // var name = node.name;
            // var attrTbl = node.attributes;
            try {
                state = _this.startElement(state, name, attrTbl);
            }
            catch (err) {
                // Exceptions escaping from node-expat's event handlers cause weird effects.
                console.error(err);
                console.log('Stack:');
                console.error(err.stack);
            }
        });
        xml.on('endElement', function (name) {
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
        xml.on('text', function (text) {
            if (stateStatic.textDepth) {
                stateStatic.textHandlerList[stateStatic.textDepth - 1].addText(state, text);
            }
        });
        xml.on('error', function (err) {
            console.error(err);
        });
        // Expat-specific handler.
        stream.on('data', function (data) {
            xml.parse(data, false);
        });
        stream.on('end', function () {
            // xml.on('end', () => {
            // Finish parsing the file (synchronous call).
            xml.parse('', true); // Expat-specific line.
            resolve(importList.map(function (spec) {
                console.log('IMPORT into ' + spec.namespace.name + ' from ' + spec.url);
                return (loader.importFile(spec.url, spec.namespace));
            }));
        });
        // stream.pipe(xml);
        return (promise);
    };
    /** Bind references, call after all imports have been initialized. */
    Parser.prototype.resolve = function () {
        for (var pos = 0; pos < this.pendingList.length; ++pos) {
            var state = this.pendingList[pos];
            try {
                state.xsdElement.resolve(state);
            }
            catch (err) {
                console.error(err + ' on line ' + state.xsdElement.lineNumber + ' of ' + state.source.url);
                console.log('Stack:');
                console.error(err.stack);
            }
        }
        this.pendingList = [];
    };
    return Parser;
}());
exports.Parser = Parser;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGFyc2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcGFyc2VyX3NjYWZmb2xkX2dlbmVyYXRvci9zcmMveHNkL1BhcnNlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsb0VBQW9FO0FBQ3BFLCtDQUErQzs7O0FBRS9DLGtDQUFvQztBQUNwQyw2QkFBNkI7QUFDN0Isa0NBQW9DO0FBR3BDLCtCQUE0QjtBQUU1QiwrQkFBaUM7QUFFakMsaUNBQThCO0FBSTlCLGlDQUE4QjtBQUk5Qix1REFBdUQ7QUFFdkQsU0FBUyxTQUFTLENBQUMsSUFBcUIsRUFBRSxPQUFnQjtJQUN6RCxJQUFHLElBQUksQ0FBQyxJQUFJO1FBQUUsT0FBTyxJQUFJLENBQUMsSUFBYSxDQUFDO0lBRXhDLElBQUksSUFBSSxHQUFHLElBQUksV0FBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBRTFCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO0lBRWpCLEtBQXdCLFVBQWlCLEVBQWpCLEtBQUEsSUFBSSxDQUFDLFVBQVUsRUFBRSxFQUFqQixjQUFpQixFQUFqQixJQUFpQixFQUFFO1FBQXZDLElBQUksWUFBWSxTQUFBO1FBQ25CLElBQUksUUFBUSxHQUFHLFlBQStCLENBQUM7UUFDL0MsSUFBSSxZQUFZLEdBQUcsSUFBSSxhQUFLLEVBQUUsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7UUFFM0UsSUFBSSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLEdBQUcsU0FBUyxDQUFDLFFBQVEsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUN2RSxJQUFJLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsR0FBRyxTQUFTLENBQUMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0tBQ25FO0lBRUQsSUFBSSxHQUFHLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQztJ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LElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDbEMsSUFBSTtnQkFDSCxLQUFLLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUNoQztZQUFDLE9BQU0sR0FBRyxFQUFFO2dCQUNaLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxHQUFHLFdBQVcsR0FBRyxLQUFLLENBQUMsVUFBVSxDQUFDLFVBQVUsR0FBRyxNQUFNLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDM0YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDdEIsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDekI7U0FDRDtRQUVELElBQUksQ0FBQyxXQUFXLEdBQUcsRUFBRSxDQUFDO0lBQ3ZCLENBQUM7SUFhRixhQUFDO0FBQUQsQ0FBQyxBQWhNRCxJQWdNQztBQWhNWSx3QkFBTSIsInNvdXJjZXNDb250ZW50IjpbIi8vIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIGN4c2QsIGNvcHlyaWdodCAoYykgMjAxNS0yMDE2IEJ1c0Zhc3RlciBMdGQuXG4vLyBSZWxlYXNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UsIHNlZSBMSUNFTlNFLlxuXG5pbXBvcnQgKiBhcyBleHBhdCBmcm9tICdub2RlLWV4cGF0Jztcbi8vaW1wb3J0ICogYXMgc2F4IGZyb20gJ3NheCc7XG5pbXBvcnQgKiBhcyBQcm9taXNlIGZyb20gJ2JsdWViaXJkJztcblxuaW1wb3J0IHtDYWNoZVJlc3VsdH0gZnJvbSAnY2dldCc7XG5pbXBvcnQge1J1bGV9IGZyb20gJy4vUnVsZSc7XG5cbmltcG9ydCAqIGFzIHR5cGVzIGZyb20gJy4vdHlwZXMnO1xuaW1wb3J0IHtDb250ZXh0fSBmcm9tICcuL0NvbnRleHQnO1xuaW1wb3J0IHtTdGF0ZX0gZnJvbSAnLi9TdGF0ZSc7XG5pbXBvcnQge05hbWVzcGFjZX0gZnJvbSAnLi9OYW1lc3BhY2UnO1xuaW1wb3J0IHtMb2FkZXJ9IGZyb20gJy4vTG9hZGVyJztcbmltcG9ydCB7U291cmNlfSBmcm9tICcuL1NvdXJjZSc7XG5pbXBvcnQge1FOYW1lfSBmcm9tICcuL1FOYW1lJztcblxuaW1wb3J0ICogYXMgdXRpbCBmcm9tICd1dGlsJztcblxuLyoqIFBhcnNlIHN5bnRheCBydWxlcyBlbmNvZGVkIGludG8gaGFuZGxlciBjbGFzc2VzLiAqL1xuXG5mdW5jdGlvbiBwYXJzZVJ1bGUoY3RvcjogdHlwZXMuQmFzZUNsYXNzLCBjb250ZXh0OiBDb250ZXh0KSB7XG5cdGlmKGN0b3IucnVsZSkgcmV0dXJuKGN0b3IucnVsZSBhcyBSdWxlKTtcblxuXHR2YXIgcnVsZSA9IG5ldyBSdWxlKGN0b3IpO1xuXG5cdGN0b3IucnVsZSA9IHJ1bGU7XG5cblx0Zm9yKHZhciBiYXNlRm9sbG93ZXIgb2YgY3Rvci5tYXlDb250YWluKCkpIHtcblx0XHR2YXIgZm9sbG93ZXIgPSBiYXNlRm9sbG93ZXIgYXMgdHlwZXMuQmFzZUNsYXNzO1xuXHRcdHZhciBmb2xsb3dlck5hbWUgPSBuZXcgUU5hbWUoKS5wYXJzZUNsYXNzKGZvbGxvd2VyLm5hbWUsIGNvbnRleHQueHNkU3BhY2UpO1xuXG5cdFx0cnVsZS5mb2xsb3dlclRibFtmb2xsb3dlck5hbWUubmFtZUZ1bGxdID0gcGFyc2VSdWxlKGZvbGxvd2VyLCBjb250ZXh0KTtcblx0XHRydWxlLmZvbGxvd2VyVGJsW2ZvbGxvd2VyTmFtZS5uYW1lXSA9IHBhcnNlUnVsZShmb2xsb3dlciwgY29udGV4dCk7XG5cdH1cblxuXHR2YXIgb2JqID0gbmV3IGN0b3IoKTtcblxuXHRmb3IodmFyIGtleSBvZiBPYmplY3Qua2V5cyhvYmopKSB7XG5cdFx0cnVsZS5hdHRyaWJ1dGVMaXN0LnB1c2goa2V5KTtcblx0fVxuXG5cdHJldHVybihydWxlKTtcbn1cblxuZXhwb3J0IGNsYXNzIFBhcnNlciB7XG5cdGNvbnN0cnVjdG9yKGNvbnRleHQ6IENvbnRleHQpIHtcblx0XHR0aGlzLmNvbnRleHQgPSBjb250ZXh0O1xuXHRcdHRoaXMucm9vdFJ1bGUgPSBwYXJzZVJ1bGUodHlwZXMuUm9vdCwgY29udGV4dCk7XG5cdH1cblxuXHRzdGFydEVsZW1lbnQoc3RhdGU6IFN0YXRlLCBuYW1lOiBzdHJpbmcsIGF0dHJUYmw6IHtbbmFtZTogc3RyaW5nXTogc3RyaW5nfSkge1xuXHRcdHZhciBxTmFtZSA9IHRoaXMucU5hbWU7XG5cblx0XHRxTmFtZS5wYXJzZShuYW1lLCBzdGF0ZS5zb3VyY2UsIHN0YXRlLnNvdXJjZS5kZWZhdWx0TmFtZXNwYWNlKTtcblxuXHRcdHZhciBydWxlID0gc3RhdGUucnVsZTtcblxuXHRcdGlmKHJ1bGUpIHtcblx0XHRcdHJ1bGUgPSAoXG5cdFx0XHRcdHJ1bGUuZm9sbG93ZXJUYmxbcU5hbWUubmFtZUZ1bGxdIHx8XG5cdFx0XHRcdHJ1bGUuZm9sbG93ZXJUYmxbcU5hbWUubmFtZV0gfHxcblx0XHRcdFx0cnVsZS5mb2xsb3dlclRibFsnKiddXG5cdFx0XHQpO1xuXHRcdFx0Ly8gaWYoIXJ1bGUpIGNvbnNvbGUubG9nKCdVbmhhbmRsZWQgY2hpbGQgJyArIHN0YXRlLnJ1bGUucU5hbWUubmFtZUZ1bGwgKyAnIC0+ICcgKyBxTmFtZS5uYW1lRnVsbCk7XG5cdFx0fVxuXG5cdFx0c3RhdGUgPSBuZXcgU3RhdGUoc3RhdGUsIHJ1bGUpO1xuXG5cdFx0aWYoIXJ1bGUgfHwgIXJ1bGUucHJvdG8pIHJldHVybihzdGF0ZSk7XG5cblx0XHR2YXIgeHNkRWxlbSA9IG5ldyAocnVsZS5wcm90byBhcyB0eXBlcy5CYXNlQ2xhc3MpKHN0YXRlKTtcblxuXHRcdHN0YXRlLnhzZEVsZW1lbnQgPSB4c2RFbGVtO1xuXG5cdFx0Ly8gTWFrZSBhbGwgYXR0cmlidXRlcyBsb3dlcmNhc2UuXG5cblx0XHRmb3IodmFyIGtleSBvZiBPYmplY3Qua2V5cyhhdHRyVGJsKSkge1xuXHRcdFx0dmFyIGtleUxvd2VyID0ga2V5LnRvTG93ZXJDYXNlKCk7XG5cblx0XHRcdGlmKGtleSAhPSBrZXlMb3dlciAmJiAhYXR0clRibC5oYXNPd25Qcm9wZXJ0eShrZXlMb3dlcikpIHtcblx0XHRcdFx0YXR0clRibFtrZXlMb3dlcl0gPSBhdHRyVGJsW2tleV07XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Ly8gQ29weSBrbm93biBhdHRyaWJ1dGVzIHRvIFhTRCBlbGVtZW50LlxuXG5cdFx0Zm9yKHZhciBrZXkgb2YgcnVsZS5hdHRyaWJ1dGVMaXN0KSB7XG5cdFx0XHRpZihhdHRyVGJsLmhhc093blByb3BlcnR5KGtleSkpIHtcblx0XHRcdFx0KHhzZEVsZW0gYXMgYW55IGFzIHtba2V5OiBzdHJpbmddOiBzdHJpbmd9KVtrZXldID0gYXR0clRibFtrZXldO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGlmKHhzZEVsZW0uaW5pdCkge1xuXHRcdFx0c3RhdGUuYXR0cmlidXRlVGJsID0gYXR0clRibDtcblxuXHRcdFx0eHNkRWxlbS5pbml0KHN0YXRlKTtcblx0XHR9XG5cblx0XHRyZXR1cm4oc3RhdGUpO1xuXHR9XG5cblx0aW5pdChjYWNoZWQ6IENhY2hlUmVzdWx0LCBzb3VyY2U6IFNvdXJjZSwgbG9hZGVyOiBMb2FkZXIpIHtcblx0XHR2YXIgc3RhdGUgPSBuZXcgU3RhdGUobnVsbCwgdGhpcy5yb290UnVsZSwgc291cmNlKTtcblx0XHR2YXIgaW1wb3J0TGlzdDoge25hbWVzcGFjZTogTmFtZXNwYWNlLCB1cmw6IHN0cmluZ31bXSA9IFtdO1xuXG5cdFx0dmFyIHhtbCA9IG5ldyBleHBhdC5QYXJzZXIobnVsbCk7XG5cdFx0Ly8gdmFyIHhtbCA9IHNheC5jcmVhdGVTdHJlYW0odHJ1ZSwgeyBwb3NpdGlvbjogdHJ1ZSB9KTtcblxuXHRcdHN0YXRlLnN0YXRlU3RhdGljID0ge1xuXHRcdFx0Y29udGV4dDogdGhpcy5jb250ZXh0LFxuXG5cdFx0XHRhZGRJbXBvcnQ6IChuYW1lc3BhY2VUYXJnZXQ6IE5hbWVzcGFjZSwgdXJsUmVtb3RlOiBzdHJpbmcpID0+IHtcblx0XHRcdFx0aW1wb3J0TGlzdC5wdXNoKHtuYW1lc3BhY2U6IG5hbWVzcGFjZVRhcmdldCwgdXJsOiB1cmxSZW1vdGV9KTtcblx0XHRcdH0sXG5cblx0XHRcdGdldExpbmVOdW1iZXI6ICgpID0+IHtcblx0XHRcdFx0cmV0dXJuKHhtbC5nZXRDdXJyZW50TGluZU51bWJlcigpKTtcblx0XHRcdFx0Ly8gcmV0dXJuKDApO1xuXHRcdFx0fSxcblxuXHRcdFx0Z2V0Qnl0ZVBvczogKCkgPT4ge1xuXHRcdFx0XHRyZXR1cm4oeG1sLmdldEN1cnJlbnRCeXRlSW5kZXgoKSk7XG5cdFx0XHRcdC8vIHJldHVybigwKTtcblx0XHRcdH0sXG5cblx0XHRcdHRleHREZXB0aDogMCxcblx0XHRcdHRleHRIYW5kbGVyTGlzdDogW11cblx0XHR9O1xuXG5cdFx0dmFyIHN0YXRlU3RhdGljID0gc3RhdGUuc3RhdGVTdGF0aWM7XG5cdFx0dmFyIHJlc29sdmU6IChyZXN1bHQ6IFNvdXJjZVtdKSA9PiB2b2lkO1xuXHRcdHZhciByZWplY3Q6IChlcnI6IGFueSkgPT4gdm9pZDtcblxuXHRcdHZhciBwcm9taXNlID0gbmV3IFByb21pc2U8U291cmNlW10+KChyZXMsIHJlaikgPT4ge1xuXHRcdFx0cmVzb2x2ZSA9IHJlcztcblx0XHRcdHJlamVjdCA9IHJlajtcblx0XHR9KVxuXG5cdFx0dmFyIHN0cmVhbSA9IGNhY2hlZC5zdHJlYW07XG5cblx0XHR2YXIgcGVuZGluZ0xpc3QgPSB0aGlzLnBlbmRpbmdMaXN0O1xuXG5cdFx0eG1sLm9uKCdzdGFydEVsZW1lbnQnLCAobmFtZTogc3RyaW5nLCBhdHRyVGJsOiB7W25hbWU6IHN0cmluZ106IHN0cmluZ30pID0+IHtcblx0XHQvLyB4bWwub24oJ29wZW50YWcnLCAobm9kZTogc2F4LlRhZykgPT4ge1xuXHRcdFx0Ly8gdmFyIG5hbWUgPSBub2RlLm5hbWU7XG5cdFx0XHQvLyB2YXIgYXR0clRibCA9IG5vZGUuYXR0cmlidXRlcztcblxuXHRcdFx0dHJ5IHtcblx0XHRcdFx0c3RhdGUgPSB0aGlzLnN0YXJ0RWxlbWVudChzdGF0ZSwgbmFtZSwgYXR0clRibCk7XG5cdFx0XHR9IGNhdGNoKGVycikge1xuXHRcdFx0XHQvLyBFeGNlcHRpb25zIGVzY2FwaW5nIGZyb20gbm9kZS1leHBhdCdzIGV2ZW50IGhhbmRsZXJzIGNhdXNlIHdlaXJkIGVmZmVjdHMuXG5cdFx0XHRcdGNvbnNvbGUuZXJyb3IoZXJyKTtcblx0XHRcdFx0Y29uc29sZS5sb2coJ1N0YWNrOicpO1xuXHRcdFx0XHRjb25zb2xlLmVycm9yKGVyci5zdGFjayk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cblx0XHR4bWwub24oJ2VuZEVsZW1lbnQnLCBmdW5jdGlvbihuYW1lOiBzdHJpbmcpIHtcblx0XHQvLyB4bWwub24oJ2Nsb3NldGFnJywgZnVuY3Rpb24oKSB7XG5cdFx0XHRpZihzdGF0ZS54c2RFbGVtZW50KSB7XG5cdFx0XHRcdGlmKHN0YXRlLnhzZEVsZW1lbnQubG9hZGVkKSB7XG5cdFx0XHRcdFx0c3RhdGUueHNkRWxlbWVudC5sb2FkZWQoc3RhdGUpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYoc3RhdGUueHNkRWxlbWVudC5yZXNvbHZlKSB7XG5cdFx0XHRcdFx0Ly8gU2NoZWR1bGUgcmVzb2x2ZSBob29rIHRvIHJ1biBhZnRlciBwYXJzaW5nIGlzIGRvbmUuXG5cdFx0XHRcdFx0Ly8gSXQgbWlnaHQgZGVwZW5kIG9uIGRlZmluaXRpb25zIGluIHNjb3BlIGJ1dCBhcHBlYXJpbmcgbGF0ZXIsXG5cdFx0XHRcdFx0Ly8gYW5kIHNlbGVjdGl2ZWx5IHBvc3Rwb25pbmcgb25seSBob29rcyB0aGF0IGNhbm5vdCBydW4geWV0XG5cdFx0XHRcdFx0Ly8gd291bGQgYmUgZXh0cmVtZWx5IGNvbXBsaWNhdGVkLlxuXG5cdFx0XHRcdFx0cGVuZGluZ0xpc3QucHVzaChzdGF0ZSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0c3RhdGUgPSBzdGF0ZS5wYXJlbnQ7XG5cdFx0fSk7XG5cblx0XHR4bWwub24oJ3RleHQnLCBmdW5jdGlvbih0ZXh0OiBzdHJpbmcpIHtcblx0XHRcdGlmKHN0YXRlU3RhdGljLnRleHREZXB0aCkge1xuXHRcdFx0XHRzdGF0ZVN0YXRpYy50ZXh0SGFuZGxlckxpc3Rbc3RhdGVTdGF0aWMudGV4dERlcHRoIC0gMV0uYWRkVGV4dChzdGF0ZSwgdGV4dCk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cblx0XHR4bWwub24oJ2Vycm9yJywgZnVuY3Rpb24oZXJyOiBhbnkpIHtcblx0XHRcdGNvbnNvbGUuZXJyb3IoZXJyKTtcblx0XHR9KTtcblxuXHRcdC8vIEV4cGF0LXNwZWNpZmljIGhhbmRsZXIuXG5cdFx0c3RyZWFtLm9uKCdkYXRhJywgKGRhdGE6IEJ1ZmZlcikgPT4ge1xuXHRcdFx0eG1sLnBhcnNlKGRhdGEsIGZhbHNlKTtcblx0XHR9KTtcblxuXHRcdHN0cmVhbS5vbignZW5kJywgKCkgPT4ge1xuXHRcdC8vIHhtbC5vbignZW5kJywgKCkgPT4ge1xuXHRcdFx0Ly8gRmluaXNoIHBhcnNpbmcgdGhlIGZpbGUgKHN5bmNocm9ub3VzIGNhbGwpLlxuXG5cdFx0XHR4bWwucGFyc2UoJycsIHRydWUpOyAvLyBFeHBhdC1zcGVjaWZpYyBsaW5lLlxuXG5cdFx0XHRyZXNvbHZlKGltcG9ydExpc3QubWFwKChzcGVjOiB7bmFtZXNwYWNlOiBOYW1lc3BhY2UsIHVybDogc3RyaW5nfSkgPT4ge1xuXHRcdFx0XHRjb25zb2xlLmxvZygnSU1QT1JUIGludG8gJyArIHNwZWMubmFtZXNwYWNlLm5hbWUgKyAnIGZyb20gJyArIHNwZWMudXJsKTtcblx0XHRcdFx0cmV0dXJuKGxvYWRlci5pbXBvcnRGaWxlKHNwZWMudXJsLCBzcGVjLm5hbWVzcGFjZSkpO1xuXHRcdFx0fSkpXG5cdFx0fSk7XG5cblx0XHQvLyBzdHJlYW0ucGlwZSh4bWwpO1xuXG5cdFx0cmV0dXJuKHByb21pc2UpO1xuXHR9XG5cblx0LyoqIEJpbmQgcmVmZXJlbmNlcywgY2FsbCBhZnRlciBhbGwgaW1wb3J0cyBoYXZlIGJlZW4gaW5pdGlhbGl6ZWQuICovXG5cdHJlc29sdmUoKSB7XG5cdFx0Zm9yKHZhciBwb3MgPSAwOyBwb3MgPCB0aGlzLnBlbmRpbmdMaXN0Lmxlbmd0aDsgKytwb3MpIHtcblx0XHRcdHZhciBzdGF0ZSA9IHRoaXMucGVuZGluZ0xpc3RbcG9zXTtcblx0XHRcdHRyeSB7XG5cdFx0XHRcdHN0YXRlLnhzZEVsZW1lbnQucmVzb2x2ZShzdGF0ZSk7XG5cdFx0XHR9IGNhdGNoKGVycikge1xuXHRcdFx0XHRjb25zb2xlLmVycm9yKGVyciArICcgb24gbGluZSAnICsgc3RhdGUueHNkRWxlbWVudC5saW5lTnVtYmVyICsgJyBvZiAnICsgc3RhdGUuc291cmNlLnVybCk7XG5cdFx0XHRcdGNvbnNvbGUubG9nKCdTdGFjazonKTtcblx0XHRcdFx0Y29uc29sZS5lcnJvcihlcnIuc3RhY2spO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHRoaXMucGVuZGluZ0xpc3QgPSBbXTtcblx0fVxuXG5cdHByaXZhdGUgY29udGV4dDogQ29udGV4dDtcblxuXHQvKiogVGVtcG9yYXJpbHkgaG9sZHMgYSBxdWFsaWZpZWQgbmFtZSwgcmUtdXNlZCB0byBhdm9pZCBhbGxvY2F0aW5nIG9iamVjdHMuICovXG5cdHByaXZhdGUgcU5hbWUgPSBuZXcgUU5hbWUoKTtcblxuXHQvKiogTGlzdCBvZiBwYXJzZXIgc3RhdGVzIHN0aWxsIG5lZWRpbmcgZnVydGhlciBwcm9jZXNzaW5nXG5cdCAgKiBhZnRlciBwcmV2aW91cyBzdGFnZSBpcyBkb25lLiAqL1xuXHRwcml2YXRlIHBlbmRpbmdMaXN0OiBTdGF0ZVtdID0gW107XG5cblx0LyoqIERlZmluZXMgdmFsaWQgY29udGVudHMgZm9yIHRoZSBYTUwgZmlsZSByb290IGVsZW1lbnQuICovXG5cdHByaXZhdGUgcm9vdFJ1bGU6IFJ1bGU7XG59XG4iXX0=