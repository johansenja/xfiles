"use strict";
// This file is part of cxsd, copyright (c) 2015-2016 BusFaster Ltd.
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
exports.Union = void 0;
var types = require("../types");
var TypedBase_1 = require("./TypedBase");
/** <xsd:union> */
var Union = /** @class */ (function (_super) {
    __extends(Union, _super);
    function Union() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.memberType = null;
        return _this;
    }
    Union.prototype.resolve = function (state) {
        // var type = this.resolveType(this.memberType, state);
        // Convert union types to strings for now.
        var type = this.resolveType('string', state);
        state.parent.xsdElement.parent = type;
    };
    Union.mayContain = function () { return [
        types.SimpleType
    ]; };
    return Union;
}(TypedBase_1.TypedBase));
exports.Union = Union;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVW5pb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wYXJzZXJfc2NhZmZvbGRfZ2VuZXJhdG9yL3NyYy94c2QvdHlwZXMvVW5pb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLG9FQUFvRTtBQUNwRSwrQ0FBK0M7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUkvQyxnQ0FBa0M7QUFDbEMseUNBQXNDO0FBRXRDLGtCQUFrQjtBQUVsQjtJQUEyQix5QkFBUztJQUFwQztRQUFBLHFFQWFDO1FBREEsZ0JBQVUsR0FBVyxJQUFJLENBQUM7O0lBQzNCLENBQUM7SUFSQSx1QkFBTyxHQUFQLFVBQVEsS0FBWTtRQUNuQix1REFBdUQ7UUFDdkQsMENBQTBDO1FBQzFDLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQzVDLEtBQUssQ0FBQyxNQUFNLENBQUMsVUFBK0IsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO0lBQzdELENBQUM7SUFUTSxnQkFBVSxHQUE0QixjQUFNLE9BQUE7UUFDbEQsS0FBSyxDQUFDLFVBQVU7S0FDaEIsRUFGa0QsQ0FFbEQsQ0FBQTtJQVVGLFlBQUM7Q0FBQSxBQWJELENBQTJCLHFCQUFTLEdBYW5DO0FBYlksc0JBQUsiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBUaGlzIGZpbGUgaXMgcGFydCBvZiBjeHNkLCBjb3B5cmlnaHQgKGMpIDIwMTUtMjAxNiBCdXNGYXN0ZXIgTHRkLlxuLy8gUmVsZWFzZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlLCBzZWUgTElDRU5TRS5cblxuaW1wb3J0IHtTdGF0ZX0gZnJvbSAnLi4vU3RhdGUnO1xuaW1wb3J0IHtRTmFtZX0gZnJvbSAnLi4vUU5hbWUnO1xuaW1wb3J0ICogYXMgdHlwZXMgZnJvbSAnLi4vdHlwZXMnO1xuaW1wb3J0IHtUeXBlZEJhc2V9IGZyb20gJy4vVHlwZWRCYXNlJztcblxuLyoqIDx4c2Q6dW5pb24+ICovXG5cbmV4cG9ydCBjbGFzcyBVbmlvbiBleHRlbmRzIFR5cGVkQmFzZSB7XG5cdHN0YXRpYyBtYXlDb250YWluOiAoKSA9PiB0eXBlcy5CYXNlQ2xhc3NbXSA9ICgpID0+IFtcblx0XHR0eXBlcy5TaW1wbGVUeXBlXG5cdF1cblxuXHRyZXNvbHZlKHN0YXRlOiBTdGF0ZSkge1xuXHRcdC8vIHZhciB0eXBlID0gdGhpcy5yZXNvbHZlVHlwZSh0aGlzLm1lbWJlclR5cGUsIHN0YXRlKTtcblx0XHQvLyBDb252ZXJ0IHVuaW9uIHR5cGVzIHRvIHN0cmluZ3MgZm9yIG5vdy5cblx0XHR2YXIgdHlwZSA9IHRoaXMucmVzb2x2ZVR5cGUoJ3N0cmluZycsIHN0YXRlKTtcblx0XHQoc3RhdGUucGFyZW50LnhzZEVsZW1lbnQgYXMgdHlwZXMuU2ltcGxlVHlwZSkucGFyZW50ID0gdHlwZTtcblx0fVxuXG5cdG1lbWJlclR5cGU6IHN0cmluZyA9IG51bGw7XG59XG4iXX0=