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
        return "var " + shortName + " = require(" + "'" + relativePath + "'" + ");";
    };
    JS.prototype.writeMember = function (member, typeNumTbl, memberNumTbl) {
        var substituteNum = 0;
        var memberTypeList = member.typeList.map(function (memberType) { return typeNumTbl[memberType.surrogateKey]; });
        var name = member.safeName;
        if (member.name != name)
            name += ":" + member.name;
        var flags = 0;
        if (member.isAbstract)
            flags |= Member_1.Member.abstractFlag;
        if (member.isSubstituted)
            flags |= Member_1.Member.substitutedFlag;
        if (member.name == "*")
            flags |= Member_1.Member.anyFlag;
        if (member.substitutes)
            substituteNum = memberNumTbl[member.substitutes.surrogateKey];
        return ("\n\t[" +
            "'" +
            name +
            "', " +
            "[" +
            memberTypeList.join(", ") +
            "]" +
            ", " +
            flags +
            (substituteNum ? ", " + substituteNum : "") +
            "]");
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
        return ("[" +
            memberNumTbl[member.surrogateKey] +
            ", " +
            flags +
            (name ? ", " + "'" + name + "'" : "") +
            "]");
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
        return ("\n\t[" +
            flags +
            ", " +
            parentNum +
            ", " +
            "[" +
            childSpecList.join(", ") +
            "], " +
            "[" +
            attributeSpecList.join(", ") +
            "]" +
            "]");
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
        exportedTypeList.sort(function (a, b) {
            return a.safeName.localeCompare(b.safeName);
        });
        hiddenTypeList.sort(function (a, b) {
            return a.safeName.localeCompare(b.safeName);
        });
        return {
            all: exportedTypeList.concat(hiddenTypeList),
            exported: exportedTypeList,
        };
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
        exportedMemberList.sort(function (a, b) {
            return a.name.localeCompare(b.name);
        });
        // TODO: merge identical hidden members.
        hiddenMemberList.sort(function (a, b) {
            return a.name.localeCompare(b.name);
        });
        return {
            all: exportedMemberList.concat(hiddenMemberList),
            exported: exportedMemberList,
        };
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
            importSpecList.push("\n\t" +
                "[" +
                importName +
                ", " +
                "[" +
                importTypeNameList.join(", ") +
                "], " +
                "[" +
                importMemberNameList.join(", ") +
                "]" +
                "]");
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
                name += ":" + type.name;
            exportTypeNameList.push("\n\t" + "'" + name + "'");
        }
        return []
            .concat(['var cxml = require("xfiles");'], this.writeHeader(), [
            "",
            "cxml.register(" +
                "'" +
                namespace.name +
                "', " +
                "exports, " +
                "[" +
                importSpecList.join(",") +
                "\n], " +
                "[" +
                exportTypeNameList.join(",") +
                "\n], " +
                "[" +
                typeSpecList.join(",") +
                "\n], " +
                "[" +
                memberSpecList.join(",") +
                "\n]" +
                ");",
        ])
            .join("\n");
    };
    JS.prototype.getOutName = function (name) {
        return name + ".js";
    };
    return JS;
}(Exporter_1.Exporter));
exports.JS = JS;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSlMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wYXJzZXJfc2NhZmZvbGRfZ2VuZXJhdG9yL3NyYy9zY2hlbWEvZXhwb3J0ZXIvSlMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLCtEQUErRDtBQUMvRCwrQ0FBK0M7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUcvQyx1Q0FBc0M7QUFFdEMsb0NBQW1DO0FBQ25DLDBDQUF5QztBQUN6QyxnQ0FBK0I7QUFJL0I7SUFBd0Isc0JBQVE7SUFBaEM7UUFBQSxxRUE0UUM7UUFEQyxlQUFTLEdBQUcsRUFBRSxDQUFDOztJQUNqQixDQUFDO0lBM1FDLHdCQUFXLEdBQVgsVUFBWSxTQUFpQixFQUFFLFlBQW9CLEVBQUUsWUFBb0I7UUFDdkUsT0FBTyxNQUFNLEdBQUcsU0FBUyxHQUFHLGFBQWEsR0FBRyxHQUFHLEdBQUcsWUFBWSxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUM7SUFDOUUsQ0FBQztJQUVELHdCQUFXLEdBQVgsVUFBWSxNQUFjLEVBQUUsVUFBa0IsRUFBRSxZQUFvQjtRQUNsRSxJQUFJLGFBQWEsR0FBRyxDQUFDLENBQUM7UUFDdEIsSUFBSSxjQUFjLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQ3RDLFVBQUMsVUFBZ0IsSUFBSyxPQUFBLFVBQVUsQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLEVBQW5DLENBQW1DLENBQzFELENBQUM7UUFFRixJQUFJLElBQUksR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDO1FBQzNCLElBQUksTUFBTSxDQUFDLElBQUksSUFBSSxJQUFJO1lBQUUsSUFBSSxJQUFJLEdBQUcsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDO1FBRW5ELElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQztRQUNkLElBQUksTUFBTSxDQUFDLFVBQVU7WUFBRSxLQUFLLElBQUksZUFBTSxDQUFDLFlBQVksQ0FBQztRQUNwRCxJQUFJLE1BQU0sQ0FBQyxhQUFh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QUU7WUFBL0IsSUFBSSxJQUFJLFNBQUE7WUFDWCxJQUFJLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztZQUNyQixJQUFJLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJO2dCQUFFLElBQUksSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztZQUU1RCxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLEdBQUcsR0FBRyxJQUFJLEdBQUcsR0FBRyxDQUFDLENBQUM7U0FDcEQ7UUFFRCxPQUFPLEVBQUU7YUFDTixNQUFNLENBQUMsQ0FBQywrQkFBK0IsQ0FBQyxFQUFFLElBQUksQ0FBQyxXQUFXLEVBQUUsRUFBRTtZQUM3RCxFQUFFO1lBQ0YsZ0JBQWdCO2dCQUNkLEdBQUc7Z0JBQ0gsU0FBUyxDQUFDLElBQUk7Z0JBQ2QsS0FBSztnQkFDTCxXQUFXO2dCQUNYLEdBQUc7Z0JBQ0gsY0FBYyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUM7Z0JBQ3hCLE9BQU87Z0JBQ1AsR0FBRztnQkFDSCxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDO2dCQUM1QixPQUFPO2dCQUNQLEdBQUc7Z0JBQ0gsWUFBWSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUM7Z0JBQ3RCLE9BQU87Z0JBQ1AsR0FBRztnQkFDSCxjQUFjLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQztnQkFDeEIsS0FBSztnQkFDTCxJQUFJO1NBQ1AsQ0FBQzthQUNELElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNoQixDQUFDO0lBRUQsdUJBQVUsR0FBVixVQUFXLElBQVk7UUFDckIsT0FBTyxJQUFJLEdBQUcsS0FBSyxDQUFDO0lBQ3RCLENBQUM7SUFHSCxTQUFDO0FBQUQsQ0FBQyxBQTVRRCxDQUF3QixtQkFBUSxHQTRRL0I7QUE1UVksZ0JBQUUiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBUaGlzIGZpbGUgaXMgcGFydCBvZiBjeHNkLCBjb3B5cmlnaHQgKGMpIDIwMTYgQnVzRmFzdGVyIEx0ZC5cbi8vIFJlbGVhc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSwgc2VlIExJQ0VOU0UuXG5cbmltcG9ydCB7IENhY2hlIH0gZnJvbSBcImNnZXRcIjtcbmltcG9ydCB7IEV4cG9ydGVyIH0gZnJvbSBcIi4vRXhwb3J0ZXJcIjtcbmltcG9ydCB7IE5hbWVzcGFjZSB9IGZyb20gXCIuLi9OYW1lc3BhY2VcIjtcbmltcG9ydCB7IE1lbWJlciB9IGZyb20gXCIuLi9NZW1iZXJcIjtcbmltcG9ydCB7IE1lbWJlclJlZiB9IGZyb20gXCIuLi9NZW1iZXJSZWZcIjtcbmltcG9ydCB7IFR5cGUgfSBmcm9tIFwiLi4vVHlwZVwiO1xuXG5leHBvcnQgdHlwZSBOdW1UYmwgPSB7IFtpZDogc3RyaW5nXTogbnVtYmVyIH07XG5cbmV4cG9ydCBjbGFzcyBKUyBleHRlbmRzIEV4cG9ydGVyIHtcbiAgd3JpdGVJbXBvcnQoc2hvcnROYW1lOiBzdHJpbmcsIHJlbGF0aXZlUGF0aDogc3RyaW5nLCBhYnNvbHV0ZVBhdGg6IHN0cmluZykge1xuICAgIHJldHVybiBcInZhciBcIiArIHNob3J0TmFtZSArIFwiID0gcmVxdWlyZShcIiArIFwiJ1wiICsgcmVsYXRpdmVQYXRoICsgXCInXCIgKyBcIik7XCI7XG4gIH1cblxuICB3cml0ZU1lbWJlcihtZW1iZXI6IE1lbWJlciwgdHlwZU51bVRibDogTnVtVGJsLCBtZW1iZXJOdW1UYmw6IE51bVRibCkge1xuICAgIHZhciBzdWJzdGl0dXRlTnVtID0gMDtcbiAgICB2YXIgbWVtYmVyVHlwZUxpc3QgPSBtZW1iZXIudHlwZUxpc3QubWFwKFxuICAgICAgKG1lbWJlclR5cGU6IFR5cGUpID0+IHR5cGVOdW1UYmxbbWVtYmVyVHlwZS5zdXJyb2dhdGVLZXldXG4gICAgKTtcblxuICAgIHZhciBuYW1lID0gbWVtYmVyLnNhZmVOYW1lO1xuICAgIGlmIChtZW1iZXIubmFtZSAhPSBuYW1lKSBuYW1lICs9IFwiOlwiICsgbWVtYmVyLm5hbWU7XG5cbiAgICB2YXIgZmxhZ3MgPSAwO1xuICAgIGlmIChtZW1iZXIuaXNBYnN0cmFjdCkgZmxhZ3MgfD0gTWVtYmVyLmFic3RyYWN0RmxhZztcbiAgICBpZiAobWVtYmVyLmlzU3Vic3RpdHV0ZWQpIGZsYWdzIHw9IE1lbWJlci5zdWJzdGl0dXRlZEZsYWc7XG4gICAgaWYgKG1lbWJlci5uYW1lID09IFwiKlwiKSBmbGFncyB8PSBNZW1iZXIuYW55RmxhZztcblxuICAgIGlmIChtZW1iZXIuc3Vic3RpdHV0ZXMpXG4gICAgICBzdWJzdGl0dXRlTnVtID0gbWVtYmVyTnVtVGJsW21lbWJlci5zdWJzdGl0dXRlcy5zdXJyb2dhdGVLZXldO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIFwiXFxuXFx0W1wiICtcbiAgICAgIFwiJ1wiICtcbiAgICAgIG5hbWUgK1xuICAgICAgXCInLCBcIiArXG4gICAgICBcIltcIiArXG4gICAgICBtZW1iZXJUeXBlTGlzdC5qb2luKFwiLCBcIikgK1xuICAgICAgXCJdXCIgK1xuICAgICAgXCIsIFwiICtcbiAgICAgIGZsYWdzICtcbiAgICAgIChzdWJzdGl0dXRlTnVtID8gXCIsIFwiICsgc3Vic3RpdHV0ZU51bSA6IFwiXCIpICtcbiAgICAgIFwiXVwiXG4gICAgKTtcbiAgfVxuXG4gIHdyaXRlTWVtYmVyUmVmKHJlZjogTWVtYmVyUmVmLCBtZW1iZXJOdW1UYmw6IE51bVRibCkge1xuICAgIHZhciBtZW1iZXIgPSByZWYubWVtYmVyO1xuICAgIHZhciBuYW1lID0gcmVmLnNhZmVOYW1lO1xuICAgIGlmIChuYW1lID09IG1lbWJlci5zYWZlTmFtZSkgbmFtZSA9IG51bGw7XG5cbiAgICB2YXIgZmxhZ3MgPSAwO1xuICAgIGlmIChyZWYubWluIDwgMSkgZmxhZ3MgfD0gTWVtYmVyUmVmLm9wdGlvbmFsRmxhZztcbiAgICBpZiAocmVmLm1heCA+IDEpIGZsYWdzIHw9IE1lbWJlclJlZi5hcnJheUZsYWc7XG5cbiAgICByZXR1cm4gKFxuICAgICAgXCJbXCIgK1xuICAgICAgbWVtYmVyTnVtVGJsW21lbWJlci5zdXJyb2dhdGVLZXldICtcbiAgICAgIFwiLCBcIiArXG4gICAgICBmbGFncyArXG4gICAgICAobmFtZSA/IFwiLCBcIiArIFwiJ1wiICsgbmFtZSArIFwiJ1wiIDogXCJcIikgK1xuICAgICAgXCJdXCJcbiAgICApO1xuICB9XG5cbiAgd3JpdGVUeXBlKHR5cGU6IFR5cGUsIHR5cGVOdW1UYmw6IE51bVRibCwgbWVtYmVyTnVtVGJsOiBOdW1UYmwpIHtcbiAgICB2YXIgY2hpbGRTcGVjTGlzdDogc3RyaW5nW10gPSBbXTtcbiAgICB2YXIgYXR0cmlidXRlU3BlY0xpc3Q6IHN0cmluZ1tdID0gW107XG5cbiAgICB2YXIgcGFyZW50TnVtID0gMDtcbiAgICB2YXIgZmxhZ3MgPSAwO1xuXG4gICAgaWYgKHR5cGUucHJpbWl0aXZlVHlwZSkgZmxhZ3MgfD0gVHlwZS5wcmltaXRpdmVGbGFnO1xuICAgIGlmICh0eXBlLmlzUGxhaW5QcmltaXRpdmUpIGZsYWdzIHw9IFR5cGUucGxhaW5QcmltaXRpdmVGbGFnO1xuXG4gICAgaWYgKHR5cGUuaXNMaXN0KSB7XG4gICAgICBmbGFncyB8PSBUeXBlLmxpc3RGbGFnIHwgVHlwZS5wcmltaXRpdmVGbGFnIHwgVHlwZS5wbGFpblByaW1pdGl2ZUZsYWc7XG4gICAgICBwYXJlbnROdW0gPSB0eXBlTnVtVGJsW3R5cGUuY2hpbGRMaXN0WzBdLm1lbWJlci50eXBlTGlzdFswXS5zdXJyb2dhdGVLZXldO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAodHlwZS5jaGlsZExpc3QpIHtcbiAgICAgICAgZm9yICh2YXIgbWVtYmVyIG9mIHR5cGUuY2hpbGRMaXN0KSB7XG4gICAgICAgICAgY2hpbGRTcGVjTGlzdC5wdXNoKHRoaXMud3JpdGVNZW1iZXJSZWYobWVtYmVyLCBtZW1iZXJOdW1UYmwpKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAodHlwZS5hdHRyaWJ1dGVMaXN0KSB7XG4gICAgICAgIGZvciAodmFyIG1lbWJlciBvZiB0eXBlLmF0dHJpYnV0ZUxpc3QpIHtcbiAgICAgICAgICBhdHRyaWJ1dGVTcGVjTGlzdC5wdXNoKHRoaXMud3JpdGVNZW1iZXJSZWYobWVtYmVyLCBtZW1iZXJOdW1UYmwpKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAodHlwZS5wYXJlbnQpIHBhcmVudE51bSA9IHR5cGVOdW1UYmxbdHlwZS5wYXJlbnQuc3Vycm9nYXRlS2V5XTtcbiAgICB9XG5cbiAgICByZXR1cm4gKFxuICAgICAgXCJcXG5cXHRbXCIgK1xuICAgICAgZmxhZ3MgK1xuICAgICAgXCIsIFwiICtcbiAgICAgIHBhcmVudE51bSArXG4gICAgICBcIiwgXCIgK1xuICAgICAgXCJbXCIgK1xuICAgICAgY2hpbGRTcGVjTGlzdC5qb2luKFwiLCBcIikgK1xuICAgICAgXCJdLCBcIiArXG4gICAgICBcIltcIiArXG4gICAgICBhdHRyaWJ1dGVTcGVjTGlzdC5qb2luKFwiLCBcIikgK1xuICAgICAgXCJdXCIgK1xuICAgICAgXCJdXCJcbiAgICApO1xuICB9XG5cbiAgYnVpbGRUeXBlTGlzdChuYW1lc3BhY2U6IE5hbWVzcGFjZSkge1xuICAgIHZhciBleHBvcnRlZFR5cGVMaXN0OiBUeXBlW10gPSBbXTtcbiAgICB2YXIgaGlkZGVuVHlwZUxpc3Q6IFR5cGVbXSA9IFtdO1xuXG4gICAgZm9yICh2YXIgdHlwZSBvZiBuYW1lc3BhY2UudHlwZUxpc3QpIHtcbiAgICAgIGlmICghdHlwZSkgY29udGludWU7XG4gICAgICBpZiAodHlwZS5pc0V4cG9ydGVkKSBleHBvcnRlZFR5cGVMaXN0LnB1c2godHlwZSk7XG4gICAgICBlbHNlIGhpZGRlblR5cGVMaXN0LnB1c2godHlwZSk7XG4gICAgfVxuXG4gICAgZXhwb3J0ZWRUeXBlTGlzdC5zb3J0KChhOiBUeXBlLCBiOiBUeXBlKSA9PlxuICAgICAgYS5zYWZlTmFtZS5sb2NhbGVDb21wYXJlKGIuc2FmZU5hbWUpXG4gICAgKTtcbiAgICBoaWRkZW5UeXBlTGlzdC5zb3J0KChhOiBUeXBlLCBiOiBUeXBlKSA9PlxuICAgICAgYS5zYWZlTmFtZS5sb2NhbGVDb21wYXJlKGIuc2FmZU5hbWUpXG4gICAgKTtcblxuICAgIHJldHVybiB7XG4gICAgICBhbGw6IGV4cG9ydGVkVHlwZUxpc3QuY29uY2F0KGhpZGRlblR5cGVMaXN0KSxcbiAgICAgIGV4cG9ydGVkOiBleHBvcnRlZFR5cGVMaXN0LFxuICAgIH07XG4gIH1cblxuICBidWlsZE1lbWJlckxpc3QobmFtZXNwYWNlOiBOYW1lc3BhY2UpIHtcbiAgICB2YXIgZXhwb3J0ZWRNZW1iZXJMaXN0OiBNZW1iZXJbXSA9IFtdO1xuICAgIHZhciBoaWRkZW5NZW1iZXJMaXN0OiBNZW1iZXJbXSA9IFtdO1xuXG4gICAgZm9yICh2YXIgbWVtYmVyIG9mIG5hbWVzcGFjZS5tZW1iZXJMaXN0KSB7XG4gICAgICBpZiAoIW1lbWJlcikgY29udGludWU7XG4gICAgICBpZiAobWVtYmVyLmlzRXhwb3J0ZWQpIGV4cG9ydGVkTWVtYmVyTGlzdC5wdXNoKG1lbWJlcik7XG4gICAgICBlbHNlIGhpZGRlbk1lbWJlckxpc3QucHVzaChtZW1iZXIpO1xuICAgIH1cblxuICAgIGV4cG9ydGVkTWVtYmVyTGlzdC5zb3J0KChhOiBNZW1iZXIsIGI6IE1lbWJlcikgPT5cbiAgICAgIGEubmFtZS5sb2NhbGVDb21wYXJlKGIubmFtZSlcbiAgICApO1xuICAgIC8vIFRPRE86IG1lcmdlIGlkZW50aWNhbCBoaWRkZW4gbWVtYmVycy5cbiAgICBoaWRkZW5NZW1iZXJMaXN0LnNvcnQoKGE6IE1lbWJlciwgYjogTWVtYmVyKSA9PlxuICAgICAgYS5uYW1lLmxvY2FsZUNvbXBhcmUoYi5uYW1lKVxuICAgICk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgYWxsOiBleHBvcnRlZE1lbWJlckxpc3QuY29uY2F0KGhpZGRlbk1lbWJlckxpc3QpLFxuICAgICAgZXhwb3J0ZWQ6IGV4cG9ydGVkTWVtYmVyTGlzdCxcbiAgICB9O1xuICB9XG5cbiAgLyoqIE91dHB1dCBuYW1lc3BhY2UgY29udGVudHMgdG8gdGhlIGdpdmVuIGNhY2hlIGtleS4gKi9cblxuICB3cml0ZUNvbnRlbnRzKCk6IHN0cmluZyB7XG4gICAgdmFyIGRvYyA9IHRoaXMuZG9jO1xuICAgIHZhciBuYW1lc3BhY2UgPSBkb2MubmFtZXNwYWNlO1xuXG4gICAgdmFyIHR5cGVOdW1UYmw6IE51bVRibCA9IHt9O1xuICAgIHZhciBtZW1iZXJOdW1UYmw6IE51bVRibCA9IHt9O1xuICAgIC8vIFNlcGFyYXRlbHkgZGVmaW5lZCBkb2N1bWVudCB0eXBlIGlzIG51bWJlciAwLlxuICAgIHZhciB0eXBlTnVtID0gMTtcbiAgICAvLyBNZW1iZXIgbnVtYmVyIDAgaXMgc2tpcHBlZC5cbiAgICB2YXIgbWVtYmVyTnVtID0gMTtcblxuICAgIHZhciBpbXBvcnRUYmwgPSBuYW1lc3BhY2UuZ2V0VXNlZEltcG9ydFRibCgpO1xuICAgIHZhciBpbXBvcnRTcGVjTGlzdDogc3RyaW5nW10gPSBbXTtcbiAgICB2YXIgaW1wb3J0TnVtVGJsOiBOdW1UYmwgPSB7fTtcbiAgICB2YXIgbnVtID0gMDtcblxuICAgIGZvciAodmFyIGltcG9ydE5hbWUgb2YgT2JqZWN0LmtleXMoaW1wb3J0VGJsKSkge1xuICAgICAgdmFyIG90aGVyTmFtZXNwYWNlSWQgPSBpbXBvcnRUYmxbaW1wb3J0TmFtZV0uaWQ7XG4gICAgICB2YXIgY29udGVudCA9IG5hbWVzcGFjZS5pbXBvcnRDb250ZW50VGJsW290aGVyTmFtZXNwYWNlSWRdO1xuICAgICAgdmFyIGltcG9ydFR5cGVOYW1lTGlzdDogc3RyaW5nW10gPSBbXTtcbiAgICAgIHZhciBpbXBvcnRNZW1iZXJOYW1lTGlzdDogc3RyaW5nW10gPSBbXTtcblxuICAgICAgZm9yICh2YXIgbmFtZSBvZiBPYmplY3Qua2V5cyhjb250ZW50LnR5cGVUYmwgfHwge30pLnNvcnQoKSkge1xuICAgICAgICB2YXIgdHlwZSA9IGNvbnRlbnQudHlwZVRibFtuYW1lXTtcblxuICAgICAgICBpbXBvcnRUeXBlTmFtZUxpc3QucHVzaChcIidcIiArIHR5cGUuc2FmZU5hbWUgKyBcIidcIik7XG4gICAgICAgIHR5cGVOdW1UYmxbdHlwZS5zdXJyb2dhdGVLZXldID0gdHlwZU51bSsrO1xuICAgICAgfVxuXG4gICAgICBmb3IgKHZhciBuYW1lIG9mIE9iamVjdC5rZXlzKGNvbnRlbnQubWVtYmVyVGJsIHx8IHt9KS5zb3J0KCkpIHtcbiAgICAgICAgdmFyIG1lbWJlciA9IGNvbnRlbnQubWVtYmVyVGJsW25hbWVdO1xuXG4gICAgICAgIGltcG9ydE1lbWJlck5hbWVMaXN0LnB1c2goXCInXCIgKyBtZW1iZXIubmFtZSArIFwiJ1wiKTtcbiAgICAgICAgbWVtYmVyTnVtVGJsW21lbWJlci5zdXJyb2dhdGVLZXldID0gbWVtYmVyTnVtKys7XG4gICAgICB9XG5cbiAgICAgIGltcG9ydFNwZWNMaXN0LnB1c2goXG4gICAgICAgIFwiXFxuXFx0XCIgK1xuICAgICAgICAgIFwiW1wiICtcbiAgICAgICAgICBpbXBvcnROYW1lICtcbiAgICAgICAgICBcIiwgXCIgK1xuICAgICAgICAgIFwiW1wiICtcbiAgICAgICAgICBpbXBvcnRUeXBlTmFtZUxpc3Quam9pbihcIiwgXCIpICtcbiAgICAgICAgICBcIl0sIFwiICtcbiAgICAgICAgICBcIltcIiArXG4gICAgICAgICAgaW1wb3J0TWVtYmVyTmFtZUxpc3Quam9pbihcIiwgXCIpICtcbiAgICAgICAgICBcIl1cIiArXG4gICAgICAgICAgXCJdXCJcbiAgICAgICk7XG5cbiAgICAgIGltcG9ydE51bVRibFtvdGhlck5hbWVzcGFjZUlkXSA9IG51bSsrO1xuICAgIH1cblxuICAgIHZhciB0eXBlTGlzdCA9IHRoaXMuYnVpbGRUeXBlTGlzdChuYW1lc3BhY2UpO1xuICAgIHZhciBtZW1iZXJMaXN0ID0gdGhpcy5idWlsZE1lbWJlckxpc3QobmFtZXNwYWNlKTtcblxuICAgIGZvciAodmFyIHR5cGUgb2YgdHlwZUxpc3QuYWxsKSB7XG4gICAgICB0eXBlTnVtVGJsW3R5cGUuc3Vycm9nYXRlS2V5XSA9IHR5cGVOdW0rKztcbiAgICB9XG5cbiAgICBmb3IgKHZhciBtZW1iZXIgb2YgbWVtYmVyTGlzdC5hbGwpIHtcbiAgICAgIG1lbWJlck51bVRibFttZW1iZXIuc3Vycm9nYXRlS2V5XSA9IG1lbWJlck51bSsrO1xuICAgIH1cblxuICAgIHZhciB0eXBlU3BlY0xpc3Q6IHN0cmluZ1tdID0gW107XG5cbiAgICB0eXBlU3BlY0xpc3QucHVzaCh0aGlzLndyaXRlVHlwZShuYW1lc3BhY2UuZG9jLCB0eXBlTnVtVGJsLCBtZW1iZXJOdW1UYmwpKTtcblxuICAgIGZvciAodmFyIHR5cGUgb2YgdHlwZUxpc3QuYWxsKSB7XG4gICAgICB0eXBlU3BlY0xpc3QucHVzaCh0aGlzLndyaXRlVHlwZSh0eXBlLCB0eXBlTnVtVGJsLCBtZW1iZXJOdW1UYmwpKTtcbiAgICB9XG5cbiAgICB2YXIgbWVtYmVyU3BlY0xpc3Q6IHN0cmluZ1tdID0gW107XG5cbiAgICBmb3IgKHZhciBtZW1iZXIgb2YgbWVtYmVyTGlzdC5hbGwpIHtcbiAgICAgIC8qIGlmKG1lbWJlci5uYW1lICE9ICcqJykgKi9cbiAgICAgIG1lbWJlclNwZWNMaXN0LnB1c2godGhpcy53cml0ZU1lbWJlcihtZW1iZXIsIHR5cGVOdW1UYmwsIG1lbWJlck51bVRibCkpO1xuICAgIH1cblxuICAgIHZhciBleHBvcnRUeXBlTmFtZUxpc3Q6IHN0cmluZ1tdID0gW107XG5cbiAgICBmb3IgKHZhciB0eXBlIG9mIHR5cGVMaXN0LmV4cG9ydGVkKSB7XG4gICAgICBuYW1lID0gdHlwZS5zYWZlTmFtZTtcbiAgICAgIGlmICh0eXBlLm5hbWUgJiYgdHlwZS5uYW1lICE9IG5hbWUpIG5hbWUgKz0gXCI6XCIgKyB0eXBlLm5hbWU7XG5cbiAgICAgIGV4cG9ydFR5cGVOYW1lTGlzdC5wdXNoKFwiXFxuXFx0XCIgKyBcIidcIiArIG5hbWUgKyBcIidcIik7XG4gICAgfVxuXG4gICAgcmV0dXJuIFtdXG4gICAgICAuY29uY2F0KFsndmFyIGN4bWwgPSByZXF1aXJlKFwieGZpbGVzXCIpOyddLCB0aGlzLndyaXRlSGVhZGVyKCksIFtcbiAgICAgICAgXCJcIixcbiAgICAgICAgXCJjeG1sLnJlZ2lzdGVyKFwiICtcbiAgICAgICAgICBcIidcIiArXG4gICAgICAgICAgbmFtZXNwYWNlLm5hbWUgK1xuICAgICAgICAgIFwiJywgXCIgK1xuICAgICAgICAgIFwiZXhwb3J0cywgXCIgK1xuICAgICAgICAgIFwiW1wiICtcbiAgICAgICAgICBpbXBvcnRTcGVjTGlzdC5qb2luKFwiLFwiKSArXG4gICAgICAgICAgXCJcXG5dLCBcIiArXG4gICAgICAgICAgXCJbXCIgK1xuICAgICAgICAgIGV4cG9ydFR5cGVOYW1lTGlzdC5qb2luKFwiLFwiKSArXG4gICAgICAgICAgXCJcXG5dLCBcIiArXG4gICAgICAgICAgXCJbXCIgK1xuICAgICAgICAgIHR5cGVTcGVjTGlzdC5qb2luKFwiLFwiKSArXG4gICAgICAgICAgXCJcXG5dLCBcIiArXG4gICAgICAgICAgXCJbXCIgK1xuICAgICAgICAgIG1lbWJlclNwZWNMaXN0LmpvaW4oXCIsXCIpICtcbiAgICAgICAgICBcIlxcbl1cIiArXG4gICAgICAgICAgXCIpO1wiLFxuICAgICAgXSlcbiAgICAgIC5qb2luKFwiXFxuXCIpO1xuICB9XG5cbiAgZ2V0T3V0TmFtZShuYW1lOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gbmFtZSArIFwiLmpzXCI7XG4gIH1cblxuICBjb25zdHJ1Y3QgPSBKUztcbn1cbiJdfQ==