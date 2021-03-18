"use strict";
// This file is part of cxsd, copyright (c) 2016 BusFaster Ltd.
// Released under the MIT license, see LICENSE.
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.JS = void 0;
var Exporter_1 = require("./Exporter");
var Member_1 = require("../Member");
var MemberRef_1 = require("../MemberRef");
var Type_1 = require("../Type");
var JS = /** @class */ (function (_super) {
    __extends(JS, _super);
    function JS() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.construct = JS;
        return _this;
    }
    JS.prototype.writeImport = function (shortName, relativePath, absolutePath) {
        return ('var ' +
            shortName +
            ' = require(' +
            "'" + relativePath + "'" +
            ');');
    };
    JS.prototype.writeMember = function (member, typeNumTbl, memberNumTbl) {
        var substituteNum = 0;
        var memberTypeList = member.typeList.map(function (memberType) {
            return typeNumTbl[memberType.surrogateKey];
        });
        var name = member.safeName;
        if (member.name != name)
            name += ':' + member.name;
        var flags = 0;
        if (member.isAbstract)
            flags |= Member_1.Member.abstractFlag;
        if (member.isSubstituted)
            flags |= Member_1.Member.substitutedFlag;
        if (member.name == '*')
            flags |= Member_1.Member.anyFlag;
        if (member.substitutes)
            substituteNum = memberNumTbl[member.substitutes.surrogateKey];
        return ('\n\t[' +
            "'" + name + "', " +
            '[' + memberTypeList.join(', ') + ']' + ', ' +
            flags +
            (substituteNum ? ', ' + substituteNum : '') +
            ']');
    };
    JS.prototype.writeMemberRef = function (ref, memberNumTbl) {
        var member = ref.member;
        var name = ref.safeName;
        if (name == member.safeName)
            name = null;
        var flags = 0;
        if (ref.min < 1)
            flags |= MemberRef_1.MemberRef.optionalFlag;
        if (ref.max > 1)
            flags |= MemberRef_1.MemberRef.arrayFlag;
        return ('[' +
            memberNumTbl[member.surrogateKey] + ', ' +
            flags +
            (name ? ', ' + "'" + name + "'" : '') +
            ']');
    };
    JS.prototype.writeType = function (type, typeNumTbl, memberNumTbl) {
        var childSpecList = [];
        var attributeSpecList = [];
        var parentNum = 0;
        var flags = 0;
        if (type.primitiveType)
            flags |= Type_1.Type.primitiveFlag;
        if (type.isPlainPrimitive)
            flags |= Type_1.Type.plainPrimitiveFlag;
        if (type.isList) {
            flags |= Type_1.Type.listFlag | Type_1.Type.primitiveFlag | Type_1.Type.plainPrimitiveFlag;
            parentNum = typeNumTbl[type.childList[0].member.typeList[0].surrogateKey];
        }
        else {
            if (type.childList) {
                for (var _i = 0, _a = type.childList; _i < _a.length; _i++) {
                    var member = _a[_i];
                    childSpecList.push(this.writeMemberRef(member, memberNumTbl));
                }
            }
            if (type.attributeList) {
                for (var _b = 0, _c = type.attributeList; _b < _c.length; _b++) {
                    var member = _c[_b];
                    attributeSpecList.push(this.writeMemberRef(member, memberNumTbl));
                }
            }
            if (type.parent)
                parentNum = typeNumTbl[type.parent.surrogateKey];
        }
        return ('\n\t[' +
            flags + ', ' +
            parentNum + ', ' +
            '[' + childSpecList.join(', ') + '], ' +
            '[' + attributeSpecList.join(', ') + ']' +
            ']');
    };
    JS.prototype.buildTypeList = function (namespace) {
        var exportedTypeList = [];
        var hiddenTypeList = [];
        for (var _i = 0, _a = namespace.typeList; _i < _a.length; _i++) {
            var type = _a[_i];
            if (!type)
                continue;
            if (type.isExported)
                exportedTypeList.push(type);
            else
                hiddenTypeList.push(type);
        }
        exportedTypeList.sort(function (a, b) { return a.safeName.localeCompare(b.safeName); });
        hiddenTypeList.sort(function (a, b) { return a.safeName.localeCompare(b.safeName); });
        return ({
            all: exportedTypeList.concat(hiddenTypeList),
            exported: exportedTypeList
        });
    };
    JS.prototype.buildMemberList = function (namespace) {
        var exportedMemberList = [];
        var hiddenMemberList = [];
        for (var _i = 0, _a = namespace.memberList; _i < _a.length; _i++) {
            var member = _a[_i];
            if (!member)
                continue;
            if (member.isExported)
                exportedMemberList.push(member);
            else
                hiddenMemberList.push(member);
        }
        exportedMemberList.sort(function (a, b) { return a.name.localeCompare(b.name); });
        // TODO: merge identical hidden members.
        hiddenMemberList.sort(function (a, b) { return a.name.localeCompare(b.name); });
        return ({
            all: exportedMemberList.concat(hiddenMemberList),
            exported: exportedMemberList
        });
    };
    /** Output namespace contents to the given cache key. */
    JS.prototype.writeContents = function () {
        var doc = this.doc;
        var namespace = doc.namespace;
        var typeNumTbl = {};
        var memberNumTbl = {};
        // Separately defined document type is number 0.
        var typeNum = 1;
        // Member number 0 is skipped.
        var memberNum = 1;
        var importTbl = namespace.getUsedImportTbl();
        var importSpecList = [];
        var importNumTbl = {};
        var num = 0;
        for (var _i = 0, _a = Object.keys(importTbl); _i < _a.length; _i++) {
            var importName = _a[_i];
            var otherNamespaceId = importTbl[importName].id;
            var content = namespace.importContentTbl[otherNamespaceId];
            var importTypeNameList = [];
            var importMemberNameList = [];
            for (var _b = 0, _c = Object.keys(content.typeTbl || {}).sort(); _b < _c.length; _b++) {
                var name = _c[_b];
                var type = content.typeTbl[name];
                importTypeNameList.push("'" + type.safeName + "'");
                typeNumTbl[type.surrogateKey] = typeNum++;
            }
            for (var _d = 0, _e = Object.keys(content.memberTbl || {}).sort(); _d < _e.length; _d++) {
                var name = _e[_d];
                var member = content.memberTbl[name];
                importMemberNameList.push("'" + member.name + "'");
                memberNumTbl[member.surrogateKey] = memberNum++;
            }
            importSpecList.push('\n\t' + '[' + importName + ', ' +
                '[' + importTypeNameList.join(', ') + '], ' +
                '[' + importMemberNameList.join(', ') + ']' +
                ']');
            importNumTbl[otherNamespaceId] = num++;
        }
        var typeList = this.buildTypeList(namespace);
        var memberList = this.buildMemberList(namespace);
        for (var _f = 0, _g = typeList.all; _f < _g.length; _f++) {
            var type = _g[_f];
            typeNumTbl[type.surrogateKey] = typeNum++;
        }
        for (var _h = 0, _j = memberList.all; _h < _j.length; _h++) {
            var member = _j[_h];
            memberNumTbl[member.surrogateKey] = memberNum++;
        }
        var typeSpecList = [];
        typeSpecList.push(this.writeType(namespace.doc, typeNumTbl, memberNumTbl));
        for (var _k = 0, _l = typeList.all; _k < _l.length; _k++) {
            var type = _l[_k];
            typeSpecList.push(this.writeType(type, typeNumTbl, memberNumTbl));
        }
        var memberSpecList = [];
        for (var _m = 0, _o = memberList.all; _m < _o.length; _m++) {
            var member = _o[_m];
            /* if(member.name != '*') */
            memberSpecList.push(this.writeMember(member, typeNumTbl, memberNumTbl));
        }
        var exportTypeNameList = [];
        for (var _p = 0, _q = typeList.exported; _p < _q.length; _p++) {
            var type = _q[_p];
            name = type.safeName;
            if (type.name && type.name != name)
                name += ':' + type.name;
            exportTypeNameList.push('\n\t' + "'" + name + "'");
        }
        return ([].concat([
            'var cxml = require("cxml");',
        ], this.writeHeader(), [
            '',
            'cxml.register(' +
                "'" + namespace.name + "', " +
                'exports, ' +
                '[' + importSpecList.join(',') + '\n], ' +
                '[' + exportTypeNameList.join(',') + '\n], ' +
                '[' + typeSpecList.join(',') + '\n], ' +
                '[' + memberSpecList.join(',') + '\n]' +
                ');'
        ]).join('\n'));
    };
    JS.prototype.getOutName = function (name) {
        return (name + '.js');
    };
    return JS;
}(Exporter_1.Exporter));
exports.JS = JS;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSlMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wYXJzZXJfc2NhZmZvbGRfZ2VuZXJhdG9yL3NyYy9zY2hlbWEvZXhwb3J0ZXIvSlMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLCtEQUErRDtBQUMvRCwrQ0FBK0M7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUcvQyx1Q0FBb0M7QUFFcEMsb0NBQWlDO0FBQ2pDLDBDQUF1QztBQUN2QyxnQ0FBNkI7QUFJN0I7SUFBd0Isc0JBQVE7SUFBaEM7UUFBQSxxRUFnUEM7UUFEQSxlQUFTLEdBQUcsRUFBRSxDQUFDOztJQUNoQixDQUFDO0lBL09BLHdCQUFXLEdBQVgsVUFBWSxTQUFpQixFQUFFLFlBQW9CLEVBQUUsWUFBb0I7UUFDeEUsT0FBTSxDQUNMLE1BQU07WUFDTixTQUFTO1lBQ1QsYUFBYTtZQUNiLEdBQUcsR0FBRyxZQUFZLEdBQUcsR0FBRztZQUN4QixJQUFJLENBQ0osQ0FBQztJQUNILENBQUM7SUFFRCx3QkFBVyxHQUFYLFVBQVksTUFBYyxFQUFFLFVBQWtCLEVBQUUsWUFBb0I7UUFDbkUsSUFBSSxhQUFhLEdBQUcsQ0FBQyxDQUFDO1FBQ3RCLElBQUksY0FBYyxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLFVBQUMsVUFBZ0I7WUFDekQsT0FBQSxVQUFVLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQztRQUFuQyxDQUFtQyxDQUNuQyxDQUFDO1FBRUYsSUFBSSxJQUFJLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQztRQUMzQixJQUFHLE1BQU0sQ0FBQyxJQUFJLElBQUksSUFBSTtZQUFFLElBQUksSUFBSSxHQUFHLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQztRQUVsRCxJQUFJLEtBQUssR0FBRyxDQUFDLENBQUM7UUFDZCxJQUFHLE1BQU0sQ0FBQyxVQUFVO1lBQUUsS0FBSyxJQUFJLGVBQU0sQ0FBQyxZQUFZLENBQUM7UUFDbkQsSUFBRyxNQUFN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LCBjb3B5cmlnaHQgKGMpIDIwMTYgQnVzRmFzdGVyIEx0ZC5cbi8vIFJlbGVhc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSwgc2VlIExJQ0VOU0UuXG5cbmltcG9ydCB7Q2FjaGV9IGZyb20gJ2NnZXQnXG5pbXBvcnQge0V4cG9ydGVyfSBmcm9tICcuL0V4cG9ydGVyJztcbmltcG9ydCB7TmFtZXNwYWNlfSBmcm9tICcuLi9OYW1lc3BhY2UnO1xuaW1wb3J0IHtNZW1iZXJ9IGZyb20gJy4uL01lbWJlcic7XG5pbXBvcnQge01lbWJlclJlZn0gZnJvbSAnLi4vTWVtYmVyUmVmJztcbmltcG9ydCB7VHlwZX0gZnJvbSAnLi4vVHlwZSc7XG5cbmV4cG9ydCB0eXBlIE51bVRibCA9IHsgW2lkOiBzdHJpbmddOiBudW1iZXIgfTtcblxuZXhwb3J0IGNsYXNzIEpTIGV4dGVuZHMgRXhwb3J0ZXIge1xuXHR3cml0ZUltcG9ydChzaG9ydE5hbWU6IHN0cmluZywgcmVsYXRpdmVQYXRoOiBzdHJpbmcsIGFic29sdXRlUGF0aDogc3RyaW5nKSB7XG5cdFx0cmV0dXJuKFxuXHRcdFx0J3ZhciAnICtcblx0XHRcdHNob3J0TmFtZSArXG5cdFx0XHQnID0gcmVxdWlyZSgnICtcblx0XHRcdFwiJ1wiICsgcmVsYXRpdmVQYXRoICsgXCInXCIgK1xuXHRcdFx0Jyk7J1xuXHRcdCk7XG5cdH1cblxuXHR3cml0ZU1lbWJlcihtZW1iZXI6IE1lbWJlciwgdHlwZU51bVRibDogTnVtVGJsLCBtZW1iZXJOdW1UYmw6IE51bVRibCkge1xuXHRcdHZhciBzdWJzdGl0dXRlTnVtID0gMDtcblx0XHR2YXIgbWVtYmVyVHlwZUxpc3QgPSBtZW1iZXIudHlwZUxpc3QubWFwKChtZW1iZXJUeXBlOiBUeXBlKSA9PlxuXHRcdFx0dHlwZU51bVRibFttZW1iZXJUeXBlLnN1cnJvZ2F0ZUtleV1cblx0XHQpO1xuXG5cdFx0dmFyIG5hbWUgPSBtZW1iZXIuc2FmZU5hbWU7XG5cdFx0aWYobWVtYmVyLm5hbWUgIT0gbmFtZSkgbmFtZSArPSAnOicgKyBtZW1iZXIubmFtZTtcblxuXHRcdHZhciBmbGFncyA9IDA7XG5cdFx0aWYobWVtYmVyLmlzQWJzdHJhY3QpIGZsYWdzIHw9IE1lbWJlci5hYnN0cmFjdEZsYWc7XG5cdFx0aWYobWVtYmVyLmlzU3Vic3RpdHV0ZWQpIGZsYWdzIHw9IE1lbWJlci5zdWJzdGl0dXRlZEZsYWc7XG5cdFx0aWYobWVtYmVyLm5hbWUgPT0gJyonKSBmbGFncyB8PSBNZW1iZXIuYW55RmxhZztcblxuXHRcdGlmKG1lbWJlci5zdWJzdGl0dXRlcykgc3Vic3RpdHV0ZU51bSA9IG1lbWJlck51bVRibFttZW1iZXIuc3Vic3RpdHV0ZXMuc3Vycm9nYXRlS2V5XTtcblxuXHRcdHJldHVybihcblx0XHRcdCdcXG5cXHRbJyArXG5cdFx0XHRcIidcIiArIG5hbWUgKyBcIicsIFwiICtcblx0XHRcdCdbJyArIG1lbWJlclR5cGVMaXN0LmpvaW4oJywgJykgKyAnXScgKyAnLCAnICtcblx0XHRcdGZsYWdzICtcblx0XHRcdChzdWJzdGl0dXRlTnVtID8gJywgJyArIHN1YnN0aXR1dGVOdW0gOiAnJykgK1xuXHRcdFx0J10nXG5cdFx0KTtcblx0fVxuXG5cdHdyaXRlTWVtYmVyUmVmKHJlZjogTWVtYmVyUmVmLCBtZW1iZXJOdW1UYmw6IE51bVRibCkge1xuXHRcdHZhciBtZW1iZXIgPSByZWYubWVtYmVyO1xuXHRcdHZhciBuYW1lID0gcmVmLnNhZmVOYW1lO1xuXHRcdGlmKG5hbWUgPT0gbWVtYmVyLnNhZmVOYW1lKSBuYW1lID0gbnVsbDtcblxuXHRcdHZhciBmbGFncyA9IDA7XG5cdFx0aWYocmVmLm1pbiA8IDEpIGZsYWdzIHw9IE1lbWJlclJlZi5vcHRpb25hbEZsYWc7XG5cdFx0aWYocmVmLm1heCA+IDEpIGZsYWdzIHw9IE1lbWJlclJlZi5hcnJheUZsYWc7XG5cblx0XHRyZXR1cm4oXG5cdFx0XHQnWycgK1xuXHRcdFx0bWVtYmVyTnVtVGJsW21lbWJlci5zdXJyb2dhdGVLZXldICsgJywgJyArXG5cdFx0XHRmbGFncyArXG5cdFx0XHQobmFtZSA/ICcsICcgKyBcIidcIiArIG5hbWUgKyBcIidcIiA6ICcnKSArXG5cdFx0XHQnXSdcblx0XHQpO1xuXHR9XG5cblx0d3JpdGVUeXBlKHR5cGU6IFR5cGUsIHR5cGVOdW1UYmw6IE51bVRibCwgbWVtYmVyTnVtVGJsOiBOdW1UYmwpIHtcblx0XHR2YXIgY2hpbGRTcGVjTGlzdDogc3RyaW5nW10gPSBbXTtcblx0XHR2YXIgYXR0cmlidXRlU3BlY0xpc3Q6IHN0cmluZ1tdID0gW107XG5cblx0XHR2YXIgcGFyZW50TnVtID0gMDtcblx0XHR2YXIgZmxhZ3MgPSAwO1xuXG5cdFx0aWYodHlwZS5wcmltaXRpdmVUeXBlKSBmbGFncyB8PSBUeXBlLnByaW1pdGl2ZUZsYWc7XG5cdFx0aWYodHlwZS5pc1BsYWluUHJpbWl0aXZlKSBmbGFncyB8PSBUeXBlLnBsYWluUHJpbWl0aXZlRmxhZztcblxuXHRcdGlmKHR5cGUuaXNMaXN0KSB7XG5cdFx0XHRmbGFncyB8PSBUeXBlLmxpc3RGbGFnIHwgVHlwZS5wcmltaXRpdmVGbGFnIHwgVHlwZS5wbGFpblByaW1pdGl2ZUZsYWc7XG5cdFx0XHRwYXJlbnROdW0gPSB0eXBlTnVtVGJsW3R5cGUuY2hpbGRMaXN0WzBdLm1lbWJlci50eXBlTGlzdFswXS5zdXJyb2dhdGVLZXldO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRpZih0eXBlLmNoaWxkTGlzdCkge1xuXHRcdFx0XHRmb3IodmFyIG1lbWJlciBvZiB0eXBlLmNoaWxkTGlzdCkge1xuXHRcdFx0XHRcdGNoaWxkU3BlY0xpc3QucHVzaCh0aGlzLndyaXRlTWVtYmVyUmVmKG1lbWJlciwgbWVtYmVyTnVtVGJsKSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0aWYodHlwZS5hdHRyaWJ1dGVMaXN0KSB7XG5cdFx0XHRcdGZvcih2YXIgbWVtYmVyIG9mIHR5cGUuYXR0cmlidXRlTGlzdCkge1xuXHRcdFx0XHRcdGF0dHJpYnV0ZVNwZWNMaXN0LnB1c2godGhpcy53cml0ZU1lbWJlclJlZihtZW1iZXIsIG1lbWJlck51bVRibCkpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdGlmKHR5cGUucGFyZW50KSBwYXJlbnROdW0gPSB0eXBlTnVtVGJsW3R5cGUucGFyZW50LnN1cnJvZ2F0ZUtleV07XG5cdFx0fVxuXG5cdFx0cmV0dXJuKFxuXHRcdFx0J1xcblxcdFsnICtcblx0XHRcdGZsYWdzICsgJywgJyArXG5cdFx0XHRwYXJlbnROdW0gKyAnLCAnICtcblx0XHRcdCdbJyArIGNoaWxkU3BlY0xpc3Quam9pbignLCAnKSArICddLCAnICtcblx0XHRcdCdbJyArIGF0dHJpYnV0ZVNwZWNMaXN0LmpvaW4oJywgJykgKyAnXScgK1xuXHRcdFx0J10nXG5cdFx0KTtcblx0fVxuXG5cdGJ1aWxkVHlwZUxpc3QobmFtZXNwYWNlOiBOYW1lc3BhY2UpIHtcblx0XHR2YXIgZXhwb3J0ZWRUeXBlTGlzdDogVHlwZVtdID0gW107XG5cdFx0dmFyIGhpZGRlblR5cGVMaXN0OiBUeXBlW10gPSBbXTtcblxuXHRcdGZvcih2YXIgdHlwZSBvZiBuYW1lc3BhY2UudHlwZUxpc3QpIHtcblx0XHRcdGlmKCF0eXBlKSBjb250aW51ZTtcblx0XHRcdGlmKHR5cGUuaXNFeHBvcnRlZCkgZXhwb3J0ZWRUeXBlTGlzdC5wdXNoKHR5cGUpO1xuXHRcdFx0ZWxzZSBoaWRkZW5UeXBlTGlzdC5wdXNoKHR5cGUpO1xuXHRcdH1cblxuXHRcdGV4cG9ydGVkVHlwZUxpc3Quc29ydCgoYTogVHlwZSwgYjogVHlwZSkgPT4gYS5zYWZlTmFtZS5sb2NhbGVDb21wYXJlKGIuc2FmZU5hbWUpKTtcblx0XHRoaWRkZW5UeXBlTGlzdC5zb3J0KChhOiBUeXBlLCBiOiBUeXBlKSA9PiBhLnNhZmVOYW1lLmxvY2FsZUNvbXBhcmUoYi5zYWZlTmFtZSkpO1xuXG5cdFx0cmV0dXJuKHtcblx0XHRcdGFsbDogZXhwb3J0ZWRUeXBlTGlzdC5jb25jYXQoaGlkZGVuVHlwZUxpc3QpLFxuXHRcdFx0ZXhwb3J0ZWQ6IGV4cG9ydGVkVHlwZUxpc3Rcblx0XHR9KTtcblx0fVxuXG5cdGJ1aWxkTWVtYmVyTGlzdChuYW1lc3BhY2U6IE5hbWVzcGFjZSkge1xuXHRcdHZhciBleHBvcnRlZE1lbWJlckxpc3Q6IE1lbWJlcltdID0gW107XG5cdFx0dmFyIGhpZGRlbk1lbWJlckxpc3Q6IE1lbWJlcltdID0gW107XG5cblx0XHRmb3IodmFyIG1lbWJlciBvZiBuYW1lc3BhY2UubWVtYmVyTGlzdCkge1xuXHRcdFx0aWYoIW1lbWJlcikgY29udGludWU7XG5cdFx0XHRpZihtZW1iZXIuaXNFeHBvcnRlZCkgZXhwb3J0ZWRNZW1iZXJMaXN0LnB1c2gobWVtYmVyKTtcblx0XHRcdGVsc2UgaGlkZGVuTWVtYmVyTGlzdC5wdXNoKG1lbWJlcik7XG5cdFx0fVxuXG5cdFx0ZXhwb3J0ZWRNZW1iZXJMaXN0LnNvcnQoKGE6IE1lbWJlciwgYjogTWVtYmVyKSA9PiBhLm5hbWUubG9jYWxlQ29tcGFyZShiLm5hbWUpKTtcblx0XHQvLyBUT0RPOiBtZXJnZSBpZGVudGljYWwgaGlkZGVuIG1lbWJlcnMuXG5cdFx0aGlkZGVuTWVtYmVyTGlzdC5zb3J0KChhOiBNZW1iZXIsIGI6IE1lbWJlcikgPT4gYS5uYW1lLmxvY2FsZUNvbXBhcmUoYi5uYW1lKSk7XG5cblx0XHRyZXR1cm4oe1xuXHRcdFx0YWxsOiBleHBvcnRlZE1lbWJlckxpc3QuY29uY2F0KGhpZGRlbk1lbWJlckxpc3QpLFxuXHRcdFx0ZXhwb3J0ZWQ6IGV4cG9ydGVkTWVtYmVyTGlzdFxuXHRcdH0pO1xuXHR9XG5cblx0LyoqIE91dHB1dCBuYW1lc3BhY2UgY29udGVudHMgdG8gdGhlIGdpdmVuIGNhY2hlIGtleS4gKi9cblxuXHR3cml0ZUNvbnRlbnRzKCk6IHN0cmluZyB7XG5cdFx0dmFyIGRvYyA9IHRoaXMuZG9jO1xuXHRcdHZhciBuYW1lc3BhY2UgPSBkb2MubmFtZXNwYWNlO1xuXG5cdFx0dmFyIHR5cGVOdW1UYmw6IE51bVRibCA9IHt9O1xuXHRcdHZhciBtZW1iZXJOdW1UYmw6IE51bVRibCA9IHt9O1xuXHRcdC8vIFNlcGFyYXRlbHkgZGVmaW5lZCBkb2N1bWVudCB0eXBlIGlzIG51bWJlciAwLlxuXHRcdHZhciB0eXBlTnVtID0gMTtcblx0XHQvLyBNZW1iZXIgbnVtYmVyIDAgaXMgc2tpcHBlZC5cblx0XHR2YXIgbWVtYmVyTnVtID0gMTtcblxuXHRcdHZhciBpbXBvcnRUYmwgPSBuYW1lc3BhY2UuZ2V0VXNlZEltcG9ydFRibCgpO1xuXHRcdHZhciBpbXBvcnRTcGVjTGlzdDogc3RyaW5nW10gPSBbXTtcblx0XHR2YXIgaW1wb3J0TnVtVGJsOiBOdW1UYmwgPSB7fTtcblx0XHR2YXIgbnVtID0gMDtcblxuXHRcdGZvcih2YXIgaW1wb3J0TmFtZSBvZiBPYmplY3Qua2V5cyhpbXBvcnRUYmwpKSB7XG5cdFx0XHR2YXIgb3RoZXJOYW1lc3BhY2VJZCA9IGltcG9ydFRibFtpbXBvcnROYW1lXS5pZDtcblx0XHRcdHZhciBjb250ZW50ID0gbmFtZXNwYWNlLmltcG9ydENvbnRlbnRUYmxbb3RoZXJOYW1lc3BhY2VJZF07XG5cdFx0XHR2YXIgaW1wb3J0VHlwZU5hbWVMaXN0OiBzdHJpbmdbXSA9IFtdO1xuXHRcdFx0dmFyIGltcG9ydE1lbWJlck5hbWVMaXN0OiBzdHJpbmdbXSA9IFtdO1xuXG5cdFx0XHRmb3IodmFyIG5hbWUgb2YgT2JqZWN0LmtleXMoY29udGVudC50eXBlVGJsIHx8IHt9KS5zb3J0KCkpIHtcblx0XHRcdFx0dmFyIHR5cGUgPSBjb250ZW50LnR5cGVUYmxbbmFtZV07XG5cblx0XHRcdFx0aW1wb3J0VHlwZU5hbWVMaXN0LnB1c2goXCInXCIgKyB0eXBlLnNhZmVOYW1lICsgXCInXCIpO1xuXHRcdFx0XHR0eXBlTnVtVGJsW3R5cGUuc3Vycm9nYXRlS2V5XSA9IHR5cGVOdW0rKztcblx0XHRcdH1cblxuXHRcdFx0Zm9yKHZhciBuYW1lIG9mIE9iamVjdC5rZXlzKGNvbnRlbnQubWVtYmVyVGJsIHx8IHt9KS5zb3J0KCkpIHtcblx0XHRcdFx0dmFyIG1lbWJlciA9IGNvbnRlbnQubWVtYmVyVGJsW25hbWVdO1xuXG5cdFx0XHRcdGltcG9ydE1lbWJlck5hbWVMaXN0LnB1c2goXCInXCIgKyBtZW1iZXIubmFtZSArIFwiJ1wiKTtcblx0XHRcdFx0bWVtYmVyTnVtVGJsW21lbWJlci5zdXJyb2dhdGVLZXldID0gbWVtYmVyTnVtKys7XG5cdFx0XHR9XG5cblx0XHRcdGltcG9ydFNwZWNMaXN0LnB1c2goXG5cdFx0XHRcdCdcXG5cXHQnICsgJ1snICsgaW1wb3J0TmFtZSArICcsICcgK1xuXHRcdFx0XHQnWycgKyBpbXBvcnRUeXBlTmFtZUxpc3Quam9pbignLCAnKSArICddLCAnICtcblx0XHRcdFx0J1snICsgaW1wb3J0TWVtYmVyTmFtZUxpc3Quam9pbignLCAnKSArICddJyArXG5cdFx0XHRcdCddJ1xuXHRcdFx0KTtcblxuXHRcdFx0aW1wb3J0TnVtVGJsW290aGVyTmFtZXNwYWNlSWRdID0gbnVtKys7XG5cdFx0fVxuXG5cdFx0dmFyIHR5cGVMaXN0ID0gdGhpcy5idWlsZFR5cGVMaXN0KG5hbWVzcGFjZSk7XG5cdFx0dmFyIG1lbWJlckxpc3QgPSB0aGlzLmJ1aWxkTWVtYmVyTGlzdChuYW1lc3BhY2UpO1xuXG5cdFx0Zm9yKHZhciB0eXBlIG9mIHR5cGVMaXN0LmFsbCkge1xuXHRcdFx0dHlwZU51bVRibFt0eXBlLnN1cnJvZ2F0ZUtleV0gPSB0eXBlTnVtKys7XG5cdFx0fVxuXG5cdFx0Zm9yKHZhciBtZW1iZXIgb2YgbWVtYmVyTGlzdC5hbGwpIHtcblx0XHRcdG1lbWJlck51bVRibFttZW1iZXIuc3Vycm9nYXRlS2V5XSA9IG1lbWJlck51bSsrO1xuXHRcdH1cblxuXHRcdHZhciB0eXBlU3BlY0xpc3Q6IHN0cmluZ1tdID0gW107XG5cblx0XHR0eXBlU3BlY0xpc3QucHVzaCh0aGlzLndyaXRlVHlwZShuYW1lc3BhY2UuZG9jLCB0eXBlTnVtVGJsLCBtZW1iZXJOdW1UYmwpKTtcblxuXHRcdGZvcih2YXIgdHlwZSBvZiB0eXBlTGlzdC5hbGwpIHtcblx0XHRcdHR5cGVTcGVjTGlzdC5wdXNoKHRoaXMud3JpdGVUeXBlKHR5cGUsIHR5cGVOdW1UYmwsIG1lbWJlck51bVRibCkpO1xuXHRcdH1cblxuXHRcdHZhciBtZW1iZXJTcGVjTGlzdDogc3RyaW5nW10gPSBbXTtcblxuXHRcdGZvcih2YXIgbWVtYmVyIG9mIG1lbWJlckxpc3QuYWxsKSB7XG5cdFx0XHQvKiBpZihtZW1iZXIubmFtZSAhPSAnKicpICovXG5cdFx0XHRtZW1iZXJTcGVjTGlzdC5wdXNoKHRoaXMud3JpdGVNZW1iZXIobWVtYmVyLCB0eXBlTnVtVGJsLCBtZW1iZXJOdW1UYmwpKTtcblx0XHR9XG5cblx0XHR2YXIgZXhwb3J0VHlwZU5hbWVMaXN0OiBzdHJpbmdbXSA9IFtdO1xuXG5cdFx0Zm9yKHZhciB0eXBlIG9mIHR5cGVMaXN0LmV4cG9ydGVkKSB7XG5cdFx0XHRuYW1lID0gdHlwZS5zYWZlTmFtZTtcblx0XHRcdGlmKHR5cGUubmFtZSAmJiB0eXBlLm5hbWUgIT0gbmFtZSkgbmFtZSArPSAnOicgKyB0eXBlLm5hbWU7XG5cblx0XHRcdGV4cG9ydFR5cGVOYW1lTGlzdC5wdXNoKCdcXG5cXHQnICsgXCInXCIgKyBuYW1lICsgXCInXCIpO1xuXHRcdH1cblxuXHRcdHJldHVybihbXS5jb25jYXQoXG5cdFx0XHRbXG5cdFx0XHRcdCd2YXIgY3htbCA9IHJlcXVpcmUoXCJjeG1sXCIpOycsXG5cdFx0XHRdLFxuXHRcdFx0dGhpcy53cml0ZUhlYWRlcigpLFxuXHRcdFx0W1xuXHRcdFx0XHQnJyxcblx0XHRcdFx0J2N4bWwucmVnaXN0ZXIoJyArXG5cdFx0XHRcdFwiJ1wiICsgbmFtZXNwYWNlLm5hbWUrIFwiJywgXCIgK1xuXHRcdFx0XHQnZXhwb3J0cywgJyArXG5cdFx0XHRcdCdbJyArIGltcG9ydFNwZWNMaXN0LmpvaW4oJywnKSArICdcXG5dLCAnICtcblx0XHRcdFx0J1snICsgZXhwb3J0VHlwZU5hbWVMaXN0LmpvaW4oJywnKSArICdcXG5dLCAnICtcblx0XHRcdFx0J1snICsgdHlwZVNwZWNMaXN0LmpvaW4oJywnKSArICdcXG5dLCAnICtcblx0XHRcdFx0J1snICsgbWVtYmVyU3BlY0xpc3Quam9pbignLCcpICsgJ1xcbl0nICtcblx0XHRcdFx0Jyk7J1xuXHRcdFx0XVxuXHRcdCkuam9pbignXFxuJykpO1xuXHR9XG5cblx0Z2V0T3V0TmFtZShuYW1lOiBzdHJpbmcpIHtcblx0XHRyZXR1cm4obmFtZSArICcuanMnKTtcblx0fVxuXG5cdGNvbnN0cnVjdCA9IEpTO1xufVxuIl19