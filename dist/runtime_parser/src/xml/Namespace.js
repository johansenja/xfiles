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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTmFtZXNwYWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcnVudGltZV9wYXJzZXIvc3JjL3htbC9OYW1lc3BhY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLCtEQUErRDtBQUMvRCwrQ0FBK0M7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUUvQyxpREFBOEM7QUFhOUM7SUFBK0IsNkJBQWlDO0lBQWhFO1FBQUEscUVBc0hDO1FBUkEseUJBQW1CLEdBQWdCLEVBQUUsQ0FBQztRQUV0QyxrQkFBWSxHQUFlLEVBQUUsQ0FBQztRQUM5QixvQkFBYyxHQUFpQixFQUFFLENBQUM7UUFHbEMsbUJBQWEsR0FBaUMsRUFBRSxDQUFDO1FBQ2pELHFCQUFlLEdBQW1DLEVBQUUsQ0FBQzs7SUFDdEQsQ0FBQztJQXJIQSx3QkFBSSxHQUFKLFVBQUssY0FBNEI7UUFDaEMsSUFBSSxDQUFDLGNBQWMsR0FBRyxjQUFjLENBQUM7UUFFckMsZ0RBQWdEO1FBQ2hELElBQUksZ0JBQWdCLEdBQUcsQ0FBQyxDQUFDO1FBQ3pCLDhCQUE4QjtRQUM5QixJQUFJLGtCQUFrQixHQUFHLENBQUMsQ0FBQztRQUUzQixLQUFzQixVQUFjLEVBQWQsaUNBQWMsRUFBZCw0QkFBYyxFQUFkLElBQWMsRUFBRTtZQUFsQyxJQUFJLFVBQVUsdUJBQUE7WUFDakIsZ0JBQWdCLElBQUksVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQztZQUN6QyxrQkFBa0IsSUFBSSxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDO1NBQzNDO1FBRUQsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLEdBQUcsZ0JBQWdCLENBQUM7UUFDNUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEdBQUcsa0JBQWtCLENBQUM7UUFDaEQsT0FBTSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2QsQ0FBQztJQUVELDJCQUFPLEdBQVAsVUFBUSxJQUFjO1FBQ3JCLElBQUcsSUFB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N0IsVUFBVSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQzthQUNyRTtTQUNEO0lBQ0YsQ0FBQztJQUVELCtCQUFXLEdBQVgsVUFBWSxPQUFzQjtRQUNqQyxJQUFJLFlBQVksR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDO1FBQ3JDLElBQUksU0FBUyxHQUFHLFlBQVksQ0FBQyxNQUFNLENBQUM7UUFFcEMsS0FBSSxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsWUFBWSxFQUFFLE9BQU8sR0FBRyxTQUFTLEVBQUUsRUFBRSxPQUFPLEVBQUU7WUFDcEUsSUFBSSxRQUFRLEdBQUcsWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBRXJDLE9BQU8sQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEdBQUcsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDO1NBQ2pEO0lBQ0YsQ0FBQztJQUVELGtDQUFjLEdBQWQsVUFBZSxPQUFzQjtRQUNwQyxPQUFPLENBQUMsVUFBVSxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxTQUFTLENBQUM7SUFDckQsQ0FBQztJQUVEOzZCQUN5QjtJQUV6Qiw2QkFBUyxHQUFULGNBQWMsT0FBTSxDQUFDLElBQUksQ0FBQyxFQUFFLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBYXZDLGdCQUFDO0FBQUQsQ0FBQyxBQXRIRCxDQUErQiw2QkFBYSxHQXNIM0M7QUF0SFksOEJBQVMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBUaGlzIGZpbGUgaXMgcGFydCBvZiBjeG1sLCBjb3B5cmlnaHQgKGMpIDIwMTYgQnVzRmFzdGVyIEx0ZC5cbi8vIFJlbGVhc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSwgc2VlIExJQ0VOU0UuXG5cbmltcG9ydCB7TmFtZXNwYWNlQmFzZX0gZnJvbSAnLi9OYW1lc3BhY2VCYXNlJztcbmltcG9ydCB7VHlwZVNwZWN9IGZyb20gJy4vVHlwZVNwZWMnO1xuaW1wb3J0IHtNZW1iZXJTcGVjfSBmcm9tICcuL01lbWJlcic7XG5pbXBvcnQge0NvbnRleHR9IGZyb20gJy4vQ29udGV4dCc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgTW9kdWxlRXhwb3J0cyB7XG5cdFtuYW1lOiBzdHJpbmddOiBhbnk7XG5cdF9jeG1sOiBbIE5hbWVzcGFjZSBdO1xufVxuXG4vKiogVHVwbGU6IG1vZHVsZSBleHBvcnRzIG9iamVjdCwgbGlzdCBvZiBpbXBvcnRlZCB0eXBlIG5hbWVzICovXG5leHBvcnQgdHlwZSBJbXBvcnRTcGVjID0gWyBNb2R1bGVFeHBvcnRzLCBzdHJpbmdbXSwgc3RyaW5nW10gXTtcblxuZXhwb3J0IGNsYXNzIE5hbWVzcGFjZSBleHRlbmRzIE5hbWVzcGFjZUJhc2U8Q29udGV4dCwgTmFtZXNwYWNlPiB7XG5cdGluaXQoaW1wb3J0U3BlY0xpc3Q6IEltcG9ydFNwZWNbXSkge1xuXHRcdHRoaXMuaW1wb3J0U3BlY0xpc3QgPSBpbXBvcnRTcGVjTGlzdDtcblxuXHRcdC8vIFNlcGFyYXRlbHkgZGVmaW5lZCBkb2N1bWVudCB0eXBlIGlzIG51bWJlciAwLlxuXHRcdHZhciBpbXBvcnRUeXBlT2Zmc2V0ID0gMTtcblx0XHQvLyBNZW1iZXIgbnVtYmVyIDAgaXMgc2tpcHBlZC5cblx0XHR2YXIgaW1wb3J0TWVtYmVyT2Zmc2V0ID0gMTtcblxuXHRcdGZvcih2YXIgaW1wb3J0U3BlYyBvZiBpbXBvcnRTcGVjTGlzdCkge1xuXHRcdFx0aW1wb3J0VHlwZU9mZnNldCArPSBpbXBvcnRTcGVjWzFdLmxlbmd0aDtcblx0XHRcdGltcG9ydE1lbWJlck9mZnNldCArPSBpbXBvcnRTcGVjWzJdLmxlbmd0aDtcblx0XHR9XG5cblx0XHR0aGlzLnR5cGVTcGVjTGlzdC5sZW5ndGggPSBpbXBvcnRUeXBlT2Zmc2V0O1xuXHRcdHRoaXMubWVtYmVyU3BlY0xpc3QubGVuZ3RoID0gaW1wb3J0TWVtYmVyT2Zmc2V0O1xuXHRcdHJldHVybih0aGlzKTtcblx0fVxuXG5cdGFkZFR5cGUoc3BlYzogVHlwZVNwZWMpIHtcblx0XHRpZih0aGlzLmRvYykgdGhpcy50eXBlU3BlY0xpc3QucHVzaChzcGVjKTtcblx0XHRlbHNlIHtcblx0XHRcdC8vIEZpcnN0IHR5cGUgYWRkZWQgYWZ0ZXIgaW1wb3J0cyBpcyBudW1iZXIgMCwgdGhlIGRvY3VtZW50IHR5cGUuXG5cdFx0XHR0aGlzLmRvYyA9IHNwZWM7XG5cdFx0fVxuXG5cdFx0aWYoc3BlYy5zYWZlTmFtZSkgdGhpcy5leHBvcnRUeXBlVGJsW3NwZWMuc2FmZU5hbWVdID0gc3BlYztcblx0fVxuXG5cdGFkZE1lbWJlcihzcGVjOiBNZW1iZXJTcGVjKSB7XG5cdFx0dGhpcy5tZW1iZXJTcGVjTGlzdC5wdXNoKHNwZWMpO1xuXG5cdFx0aWYoc3BlYy5uYW1lKSB0aGlzLmV4cG9ydE1lbWJlclRibFtzcGVjLm5hbWVdID0gc3BlYztcblx0fVxuXG5cdHR5cGVCeU51bShudW06IG51bWJlcikge1xuXHRcdHJldHVybih0aGlzLnR5cGVTcGVjTGlzdFtudW1dKTtcblx0fVxuXG5cdG1lbWJlckJ5TnVtKG51bTogbnVtYmVyKSB7XG5cdFx0cmV0dXJuKHRoaXMubWVtYmVyU3BlY0xpc3RbbnVtXSk7XG5cdH1cblxuXHRsaW5rKCkge1xuXHRcdC8vIFNraXAgdGhlIGRvY3VtZW50IHR5cGUuXG5cdFx0dmFyIHR5cGVOdW0gPSAxO1xuXHRcdHZhciBtZW1iZXJOdW0gPSAxO1xuXG5cdFx0Zm9yKHZhciBpbXBvcnRTcGVjIG9mIHRoaXMuaW1wb3J0U3BlY0xpc3QpIHtcblx0XHRcdHZhciBvdGhlciA9IGltcG9ydFNwZWNbMF0uX2N4bWxbMF07XG5cblx0XHRcdHRoaXMuaW1wb3J0TmFtZXNwYWNlTGlzdC5wdXNoKG90aGVyKTtcblxuXHRcdFx0Zm9yKHZhciB0eXBlTmFtZSBvZiBpbXBvcnRTcGVjWzFdKSB7XG5cdFx0XHRcdHRoaXMudHlwZVNwZWNMaXN0W3R5cGVOdW0rK10gPSBvdGhlci5leHBvcnRUeXBlVGJsW3R5cGVOYW1lXTtcblx0XHRcdH1cblxuXHRcdFx0Zm9yKHZhciBtZW1iZXJOYW1lIG9mIGltcG9ydFNwZWNbMl0pIHtcblx0XHRcdFx0dGhpcy5tZW1iZXJTcGVjTGlzdFttZW1iZXJOdW0rK10gPSBvdGhlci5leHBvcnRNZW1iZXJUYmxbbWVtYmVyTmFtZV07XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0dGhpcy5leHBvcnRPZmZzZXQgPSB0eXBlTnVtO1xuXG5cdFx0dmFyIHR5cGVTcGVjTGlzdCA9IHRoaXMudHlwZVNwZWNMaXN0O1xuXHRcdHZhciB0eXBlQ291bnQgPSB0eXBlU3BlY0xpc3QubGVuZ3RoO1xuXG5cdFx0d2hpbGUodHlwZU51bSA8IHR5cGVDb3VudCkge1xuXHRcdFx0dmFyIHR5cGVTcGVjID0gdHlwZVNwZWNMaXN0W3R5cGVOdW0rK107XG5cblx0XHRcdGlmKHR5cGVTcGVjLml0ZW0ucGFyZW50TnVtKSB7XG5cdFx0XHRcdHR5cGVTcGVjLml0ZW0uc2V0UGFyZW50KHR5cGVTcGVjTGlzdFt0eXBlU3BlYy5pdGVtLnBhcmVudE51bV0pO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHZhciBtZW1iZXJTcGVjTGlzdCA9IHRoaXMubWVtYmVyU3BlY0xpc3Q7XG5cdFx0dmFyIG1lbWJlckNvdW50ID0gbWVtYmVyU3BlY0xpc3QubGVuZ3RoO1xuXG5cdFx0d2hpbGUobWVtYmVyTnVtIDwgbWVtYmVyQ291bnQpIHtcblx0XHRcdHZhciBtZW1iZXJTcGVjID0gbWVtYmVyU3BlY0xpc3RbbWVtYmVyTnVtKytdO1xuXG5cdFx0XHRpZihtZW1iZXJTcGVjLml0ZW0ucGFyZW50TnVtKSB7XG5cdFx0XHRcdG1lbWJlclNwZWMuaXRlbS5zZXRQYXJlbnQobWVtYmVyU3BlY0xpc3RbbWVtYmVyU3BlYy5pdGVtLnBhcmVudE51bV0pO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdGV4cG9ydFR5cGVzKGV4cG9ydHM6IE1vZHVsZUV4cG9ydHMpIHtcblx0XHR2YXIgdHlwZVNwZWNMaXN0ID0gdGhpcy50eXBlU3BlY0xpc3Q7XG5cdFx0dmFyIHR5cGVDb3VudCA9IHR5cGVTcGVjTGlzdC5sZW5ndGg7XG5cblx0XHRmb3IodmFyIHR5cGVOdW0gPSB0aGlzLmV4cG9ydE9mZnNldDsgdHlwZU51bSA8IHR5cGVDb3VudDsgKyt0eXBlTnVtKSB7XG5cdFx0XHR2YXIgdHlwZVNwZWMgPSB0eXBlU3BlY0xpc3RbdHlwZU51bV07XG5cblx0XHRcdGV4cG9ydHNbdHlwZVNwZWMuc2FmZU5hbWVdID0gdHlwZVNwZWMuZ2V0UHJvdG8oKTtcblx0XHR9XG5cdH1cblxuXHRleHBvcnREb2N1bWVudChleHBvcnRzOiBNb2R1bGVFeHBvcnRzKSB7XG5cdFx0ZXhwb3J0c1snZG9jdW1lbnQnXSA9IHRoaXMuZG9jLmdldFByb3RvKCkucHJvdG90eXBlO1xuXHR9XG5cblx0LyoqIEdldCBhbiBpbnRlcm5hbGx5IHVzZWQgYXJiaXRyYXJ5IHByZWZpeCBmb3IgZnVsbHkgcXVhbGlmaWVkIG5hbWVzXG5cdCAgKiBpbiB0aGlzIG5hbWVzcGFjZS4gKi9cblxuXHRnZXRQcmVmaXgoKSB7IHJldHVybih0aGlzLmlkICsgJzonKTsgfVxuXG5cdGRvYzogVHlwZVNwZWM7XG5cblx0aW1wb3J0U3BlY0xpc3Q6IEltcG9ydFNwZWNbXTtcblx0aW1wb3J0TmFtZXNwYWNlTGlzdDogTmFtZXNwYWNlW10gPSBbXTtcblx0ZXhwb3J0VHlwZU5hbWVMaXN0OiBzdHJpbmdbXTtcblx0dHlwZVNwZWNMaXN0OiBUeXBlU3BlY1tdID0gW107XG5cdG1lbWJlclNwZWNMaXN0OiBNZW1iZXJTcGVjW10gPSBbXTtcblx0ZXhwb3J0T2Zmc2V0OiBudW1iZXI7XG5cblx0ZXhwb3J0VHlwZVRibDogeyBbbmFtZTogc3RyaW5nXTogVHlwZVNwZWMgfSA9IHt9O1xuXHRleHBvcnRNZW1iZXJUYmw6IHsgW25hbWU6IHN0cmluZ106IE1lbWJlclNwZWMgfSA9IHt9O1xufVxuIl19