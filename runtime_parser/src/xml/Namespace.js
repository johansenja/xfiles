"use strict";
// This file is part of cxml, copyright (c) 2016 BusFaster Ltd.
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
exports.Namespace = void 0;
var NamespaceBase_1 = require("./NamespaceBase");
var Namespace = /** @class */ (function (_super) {
    __extends(Namespace, _super);
    function Namespace() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.importNamespaceList = [];
        _this.typeSpecList = [];
        _this.memberSpecList = [];
        _this.exportTypeTbl = {};
        _this.exportMemberTbl = {};
        return _this;
    }
    Namespace.prototype.init = function (importSpecList) {
        this.importSpecList = importSpecList;
        // Separately defined document type is number 0.
        var importTypeOffset = 1;
        // Member number 0 is skipped.
        var importMemberOffset = 1;
        for (var _i = 0, importSpecList_1 = importSpecList; _i < importSpecList_1.length; _i++) {
            var importSpec = importSpecList_1[_i];
            importTypeOffset += importSpec[1].length;
            importMemberOffset += importSpec[2].length;
        }
        this.typeSpecList.length = importTypeOffset;
        this.memberSpecList.length = importMemberOffset;
        return (this);
    };
    Namespace.prototype.addType = function (spec) {
        if (this.doc)
            this.typeSpecList.push(spec);
        else {
            // First type added after imports is number 0, the document type.
            this.doc = spec;
        }
        if (spec.safeName)
            this.exportTypeTbl[spec.safeName] = spec;
    };
    Namespace.prototype.addMember = function (spec) {
        this.memberSpecList.push(spec);
        if (spec.name)
            this.exportMemberTbl[spec.name] = spec;
    };
    Namespace.prototype.typeByNum = function (num) {
        return (this.typeSpecList[num]);
    };
    Namespace.prototype.memberByNum = function (num) {
        return (this.memberSpecList[num]);
    };
    Namespace.prototype.link = function () {
        // Skip the document type.
        var typeNum = 1;
        var memberNum = 1;
        for (var _i = 0, _a = this.importSpecList; _i < _a.length; _i++) {
            var importSpec = _a[_i];
            var other = importSpec[0]._cxml[0];
            this.importNamespaceList.push(other);
            for (var _b = 0, _c = importSpec[1]; _b < _c.length; _b++) {
                var typeName = _c[_b];
                this.typeSpecList[typeNum++] = other.exportTypeTbl[typeName];
            }
            for (var _d = 0, _e = importSpec[2]; _d < _e.length; _d++) {
                var memberName = _e[_d];
                this.memberSpecList[memberNum++] = other.exportMemberTbl[memberName];
            }
        }
        this.exportOffset = typeNum;
        var typeSpecList = this.typeSpecList;
        var typeCount = typeSpecList.length;
        while (typeNum < typeCount) {
            var typeSpec = typeSpecList[typeNum++];
            if (typeSpec.item.parentNum) {
                typeSpec.item.setParent(typeSpecList[typeSpec.item.parentNum]);
            }
        }
        var memberSpecList = this.memberSpecList;
        var memberCount = memberSpecList.length;
        while (memberNum < memberCount) {
            var memberSpec = memberSpecList[memberNum++];
            if (memberSpec.item.parentNum) {
                memberSpec.item.setParent(memberSpecList[memberSpec.item.parentNum]);
            }
        }
    };
    Namespace.prototype.exportTypes = function (exports) {
        var typeSpecList = this.typeSpecList;
        var typeCount = typeSpecList.length;
        for (var typeNum = this.exportOffset; typeNum < typeCount; ++typeNum) {
            var typeSpec = typeSpecList[typeNum];
            exports[typeSpec.safeName] = typeSpec.getProto();
        }
    };
    Namespace.prototype.exportDocument = function (exports) {
        exports['document'] = this.doc.getProto().prototype;
    };
    /** Get an internally used arbitrary prefix for fully qualified names
      * in this namespace. */
    Namespace.prototype.getPrefix = function () { return (this.id + ':'); };
    return Namespace;
}(NamespaceBase_1.NamespaceBase));
exports.Namespace = Namespace;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTmFtZXNwYWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiTmFtZXNwYWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSwrREFBK0Q7QUFDL0QsK0NBQStDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFL0MsaURBQThDO0FBYTlDO0lBQStCLDZCQUFpQztJQUFoRTtRQUFBLHFFQXNIQztRQVJBLHlCQUFtQixHQUFnQixFQUFFLENBQUM7UUFFdEMsa0JBQVksR0FBZSxFQUFFLENBQUM7UUFDOUIsb0JBQWMsR0FBaUIsRUFBRSxDQUFDO1FBR2xDLG1CQUFhLEdBQWlDLEVBQUUsQ0FBQztRQUNqRCxxQkFBZSxHQUFtQyxFQUFFLENBQUM7O0lBQ3RELENBQUM7SUFySEEsd0JBQUksR0FBSixVQUFLLGNBQTRCO1FBQ2hDLElBQUksQ0FBQyxjQUFjLEdBQUcsY0FBYyxDQUFDO1FBRXJDLGdEQUFnRDtRQUNoRCxJQUFJLGdCQUFnQixHQUFHLENBQUMsQ0FBQztRQUN6Qiw4QkFBOEI7UUFDOUIsSUFBSSxrQkFBa0IsR0FBRyxDQUFDLENBQUM7UUFFM0IsS0FBc0IsVUFBYyxFQUFkLGlDQUFjLEVBQWQsNEJBQWMsRUFBZCxJQUFjLEVBQUU7WUFBbEMsSUFBSSxVQUFVLHVCQUFBO1lBQ2pCLGdCQUFnQixJQUFJLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUM7WUFDekMsa0JBQWtCLElBQUksVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQztTQUMzQztRQUVELElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxHQUFHLGdCQUFnQixDQUFDO1FBQzVDLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxHQUFHLGtCQUFrQixDQUFDO1FBQ2hELE9BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNkLENBQUM7SUFFRCwyQkFBTyxHQUFQLFVBQVEsSUFBYztRQUNyQixJQUFHLElBQUksQ0FBQyxHQUFHO1lBQUUsSUFBSSxDQUFDLFlBQVksQ0FB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QWMsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7YUFDckU7U0FDRDtJQUNGLENBQUM7SUFFRCwrQkFBVyxHQUFYLFVBQVksT0FBc0I7UUFDakMsSUFBSSxZQUFZLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQztRQUNyQyxJQUFJLFNBQVMsR0FBRyxZQUFZLENBQUMsTUFBTSxDQUFDO1FBRXBDLEtBQUksSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLFlBQVksRUFBRSxPQUFPLEdBQUcsU0FBUyxFQUFFLEVBQUUsT0FBTyxFQUFFO1lBQ3BFLElBQUksUUFBUSxHQUFHLFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUVyQyxPQUFPLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQztTQUNqRDtJQUNGLENBQUM7SUFFRCxrQ0FBYyxHQUFkLFVBQWUsT0FBc0I7UUFDcEMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLENBQUMsU0FBUyxDQUFDO0lBQ3JELENBQUM7SUFFRDs2QkFDeUI7SUFFekIsNkJBQVMsR0FBVCxjQUFjLE9BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQWF2QyxnQkFBQztBQUFELENBQUMsQUF0SEQsQ0FBK0IsNkJBQWEsR0FzSDNDO0FBdEhZLDhCQUFTIiwic291cmNlc0NvbnRlbnQiOlsiLy8gVGhpcyBmaWxlIGlzIHBhcnQgb2YgY3htbCwgY29weXJpZ2h0IChjKSAyMDE2IEJ1c0Zhc3RlciBMdGQuXG4vLyBSZWxlYXNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UsIHNlZSBMSUNFTlNFLlxuXG5pbXBvcnQge05hbWVzcGFjZUJhc2V9IGZyb20gJy4vTmFtZXNwYWNlQmFzZSc7XG5pbXBvcnQge1R5cGVTcGVjfSBmcm9tICcuL1R5cGVTcGVjJztcbmltcG9ydCB7TWVtYmVyU3BlY30gZnJvbSAnLi9NZW1iZXInO1xuaW1wb3J0IHtDb250ZXh0fSBmcm9tICcuL0NvbnRleHQnO1xuXG5leHBvcnQgaW50ZXJmYWNlIE1vZHVsZUV4cG9ydHMge1xuXHRbbmFtZTogc3RyaW5nXTogYW55O1xuXHRfY3htbDogWyBOYW1lc3BhY2UgXTtcbn1cblxuLyoqIFR1cGxlOiBtb2R1bGUgZXhwb3J0cyBvYmplY3QsIGxpc3Qgb2YgaW1wb3J0ZWQgdHlwZSBuYW1lcyAqL1xuZXhwb3J0IHR5cGUgSW1wb3J0U3BlYyA9IFsgTW9kdWxlRXhwb3J0cywgc3RyaW5nW10sIHN0cmluZ1tdIF07XG5cbmV4cG9ydCBjbGFzcyBOYW1lc3BhY2UgZXh0ZW5kcyBOYW1lc3BhY2VCYXNlPENvbnRleHQsIE5hbWVzcGFjZT4ge1xuXHRpbml0KGltcG9ydFNwZWNMaXN0OiBJbXBvcnRTcGVjW10pIHtcblx0XHR0aGlzLmltcG9ydFNwZWNMaXN0ID0gaW1wb3J0U3BlY0xpc3Q7XG5cblx0XHQvLyBTZXBhcmF0ZWx5IGRlZmluZWQgZG9jdW1lbnQgdHlwZSBpcyBudW1iZXIgMC5cblx0XHR2YXIgaW1wb3J0VHlwZU9mZnNldCA9IDE7XG5cdFx0Ly8gTWVtYmVyIG51bWJlciAwIGlzIHNraXBwZWQuXG5cdFx0dmFyIGltcG9ydE1lbWJlck9mZnNldCA9IDE7XG5cblx0XHRmb3IodmFyIGltcG9ydFNwZWMgb2YgaW1wb3J0U3BlY0xpc3QpIHtcblx0XHRcdGltcG9ydFR5cGVPZmZzZXQgKz0gaW1wb3J0U3BlY1sxXS5sZW5ndGg7XG5cdFx0XHRpbXBvcnRNZW1iZXJPZmZzZXQgKz0gaW1wb3J0U3BlY1syXS5sZW5ndGg7XG5cdFx0fVxuXG5cdFx0dGhpcy50eXBlU3BlY0xpc3QubGVuZ3RoID0gaW1wb3J0VHlwZU9mZnNldDtcblx0XHR0aGlzLm1lbWJlclNwZWNMaXN0Lmxlbmd0aCA9IGltcG9ydE1lbWJlck9mZnNldDtcblx0XHRyZXR1cm4odGhpcyk7XG5cdH1cblxuXHRhZGRUeXBlKHNwZWM6IFR5cGVTcGVjKSB7XG5cdFx0aWYodGhpcy5kb2MpIHRoaXMudHlwZVNwZWNMaXN0LnB1c2goc3BlYyk7XG5cdFx0ZWxzZSB7XG5cdFx0XHQvLyBGaXJzdCB0eXBlIGFkZGVkIGFmdGVyIGltcG9ydHMgaXMgbnVtYmVyIDAsIHRoZSBkb2N1bWVudCB0eXBlLlxuXHRcdFx0dGhpcy5kb2MgPSBzcGVjO1xuXHRcdH1cblxuXHRcdGlmKHNwZWMuc2FmZU5hbWUpIHRoaXMuZXhwb3J0VHlwZVRibFtzcGVjLnNhZmVOYW1lXSA9IHNwZWM7XG5cdH1cblxuXHRhZGRNZW1iZXIoc3BlYzogTWVtYmVyU3BlYykge1xuXHRcdHRoaXMubWVtYmVyU3BlY0xpc3QucHVzaChzcGVjKTtcblxuXHRcdGlmKHNwZWMubmFtZSkgdGhpcy5leHBvcnRNZW1iZXJUYmxbc3BlYy5uYW1lXSA9IHNwZWM7XG5cdH1cblxuXHR0eXBlQnlOdW0obnVtOiBudW1iZXIpIHtcblx0XHRyZXR1cm4odGhpcy50eXBlU3BlY0xpc3RbbnVtXSk7XG5cdH1cblxuXHRtZW1iZXJCeU51bShudW06IG51bWJlcikge1xuXHRcdHJldHVybih0aGlzLm1lbWJlclNwZWNMaXN0W251bV0pO1xuXHR9XG5cblx0bGluaygpIHtcblx0XHQvLyBTa2lwIHRoZSBkb2N1bWVudCB0eXBlLlxuXHRcdHZhciB0eXBlTnVtID0gMTtcblx0XHR2YXIgbWVtYmVyTnVtID0gMTtcblxuXHRcdGZvcih2YXIgaW1wb3J0U3BlYyBvZiB0aGlzLmltcG9ydFNwZWNMaXN0KSB7XG5cdFx0XHR2YXIgb3RoZXIgPSBpbXBvcnRTcGVjWzBdLl9jeG1sWzBdO1xuXG5cdFx0XHR0aGlzLmltcG9ydE5hbWVzcGFjZUxpc3QucHVzaChvdGhlcik7XG5cblx0XHRcdGZvcih2YXIgdHlwZU5hbWUgb2YgaW1wb3J0U3BlY1sxXSkge1xuXHRcdFx0XHR0aGlzLnR5cGVTcGVjTGlzdFt0eXBlTnVtKytdID0gb3RoZXIuZXhwb3J0VHlwZVRibFt0eXBlTmFtZV07XG5cdFx0XHR9XG5cblx0XHRcdGZvcih2YXIgbWVtYmVyTmFtZSBvZiBpbXBvcnRTcGVjWzJdKSB7XG5cdFx0XHRcdHRoaXMubWVtYmVyU3BlY0xpc3RbbWVtYmVyTnVtKytdID0gb3RoZXIuZXhwb3J0TWVtYmVyVGJsW21lbWJlck5hbWVdO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHRoaXMuZXhwb3J0T2Zmc2V0ID0gdHlwZU51bTtcblxuXHRcdHZhciB0eXBlU3BlY0xpc3QgPSB0aGlzLnR5cGVTcGVjTGlzdDtcblx0XHR2YXIgdHlwZUNvdW50ID0gdHlwZVNwZWNMaXN0Lmxlbmd0aDtcblxuXHRcdHdoaWxlKHR5cGVOdW0gPCB0eXBlQ291bnQpIHtcblx0XHRcdHZhciB0eXBlU3BlYyA9IHR5cGVTcGVjTGlzdFt0eXBlTnVtKytdO1xuXG5cdFx0XHRpZih0eXBlU3BlYy5pdGVtLnBhcmVudE51bSkge1xuXHRcdFx0XHR0eXBlU3BlYy5pdGVtLnNldFBhcmVudCh0eXBlU3BlY0xpc3RbdHlwZVNwZWMuaXRlbS5wYXJlbnROdW1dKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHR2YXIgbWVtYmVyU3BlY0xpc3QgPSB0aGlzLm1lbWJlclNwZWNMaXN0O1xuXHRcdHZhciBtZW1iZXJDb3VudCA9IG1lbWJlclNwZWNMaXN0Lmxlbmd0aDtcblxuXHRcdHdoaWxlKG1lbWJlck51bSA8IG1lbWJlckNvdW50KSB7XG5cdFx0XHR2YXIgbWVtYmVyU3BlYyA9IG1lbWJlclNwZWNMaXN0W21lbWJlck51bSsrXTtcblxuXHRcdFx0aWYobWVtYmVyU3BlYy5pdGVtLnBhcmVudE51bSkge1xuXHRcdFx0XHRtZW1iZXJTcGVjLml0ZW0uc2V0UGFyZW50KG1lbWJlclNwZWNMaXN0W21lbWJlclNwZWMuaXRlbS5wYXJlbnROdW1dKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRleHBvcnRUeXBlcyhleHBvcnRzOiBNb2R1bGVFeHBvcnRzKSB7XG5cdFx0dmFyIHR5cGVTcGVjTGlzdCA9IHRoaXMudHlwZVNwZWNMaXN0O1xuXHRcdHZhciB0eXBlQ291bnQgPSB0eXBlU3BlY0xpc3QubGVuZ3RoO1xuXG5cdFx0Zm9yKHZhciB0eXBlTnVtID0gdGhpcy5leHBvcnRPZmZzZXQ7IHR5cGVOdW0gPCB0eXBlQ291bnQ7ICsrdHlwZU51bSkge1xuXHRcdFx0dmFyIHR5cGVTcGVjID0gdHlwZVNwZWNMaXN0W3R5cGVOdW1dO1xuXG5cdFx0XHRleHBvcnRzW3R5cGVTcGVjLnNhZmVOYW1lXSA9IHR5cGVTcGVjLmdldFByb3RvKCk7XG5cdFx0fVxuXHR9XG5cblx0ZXhwb3J0RG9jdW1lbnQoZXhwb3J0czogTW9kdWxlRXhwb3J0cykge1xuXHRcdGV4cG9ydHNbJ2RvY3VtZW50J10gPSB0aGlzLmRvYy5nZXRQcm90bygpLnByb3RvdHlwZTtcblx0fVxuXG5cdC8qKiBHZXQgYW4gaW50ZXJuYWxseSB1c2VkIGFyYml0cmFyeSBwcmVmaXggZm9yIGZ1bGx5IHF1YWxpZmllZCBuYW1lc1xuXHQgICogaW4gdGhpcyBuYW1lc3BhY2UuICovXG5cblx0Z2V0UHJlZml4KCkgeyByZXR1cm4odGhpcy5pZCArICc6Jyk7IH1cblxuXHRkb2M6IFR5cGVTcGVjO1xuXG5cdGltcG9ydFNwZWNMaXN0OiBJbXBvcnRTcGVjW107XG5cdGltcG9ydE5hbWVzcGFjZUxpc3Q6IE5hbWVzcGFjZVtdID0gW107XG5cdGV4cG9ydFR5cGVOYW1lTGlzdDogc3RyaW5nW107XG5cdHR5cGVTcGVjTGlzdDogVHlwZVNwZWNbXSA9IFtdO1xuXHRtZW1iZXJTcGVjTGlzdDogTWVtYmVyU3BlY1tdID0gW107XG5cdGV4cG9ydE9mZnNldDogbnVtYmVyO1xuXG5cdGV4cG9ydFR5cGVUYmw6IHsgW25hbWU6IHN0cmluZ106IFR5cGVTcGVjIH0gPSB7fTtcblx0ZXhwb3J0TWVtYmVyVGJsOiB7IFtuYW1lOiBzdHJpbmddOiBNZW1iZXJTcGVjIH0gPSB7fTtcbn1cbiJdfQ==