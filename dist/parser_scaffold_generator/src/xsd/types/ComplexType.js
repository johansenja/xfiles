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
exports.ComplexContent = exports.SimpleContent = exports.ContentBase = exports.ComplexType = void 0;
var types = require("../types");
/** <xsd:complextype> */
var ComplexType = /** @class */ (function (_super) {
    __extends(ComplexType, _super);
    function ComplexType() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ComplexType.mayContain = function () { return [
        types.Annotation,
        SimpleContent,
        ComplexContent,
        types.Attribute,
        types.AnyAttribute,
        types.Sequence,
        types.Choice,
        types.AttributeGroup,
        types.Group
    ]; };
    return ComplexType;
}(types.TypeBase));
exports.ComplexType = ComplexType;
var ContentBase = /** @class */ (function (_super) {
    __extends(ContentBase, _super);
    function ContentBase() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ContentBase.prototype.resolve = function (state) {
        state.parent.xsdElement.parent = this.parent;
        // Pass elements and attributes defined in child extension or restriction
        // onwards to the parent type definition.
        this.scope.addAllToParent('element');
        this.scope.addAllToParent('attribute');
        this.scope.addAllToParent('group');
        this.scope.addAllToParent('attributeGroup');
    };
    ContentBase.mayContain = function () { return [
        types.Extension,
        types.Restriction
    ]; };
    return ContentBase;
}(types.Base));
exports.ContentBase = ContentBase;
/** <xsd:simplecontent> */
var SimpleContent = /** @class */ (function (_super) {
    __extends(SimpleContent, _super);
    function SimpleContent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return SimpleContent;
}(ContentBase));
exports.SimpleContent = SimpleContent;
/** <xsd:complexcontent> */
var ComplexContent = /** @class */ (function (_super) {
    __extends(ComplexContent, _super);
    function ComplexContent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ComplexContent;
}(ContentBase));
exports.ComplexContent = ComplexContent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29tcGxleFR5cGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wYXJzZXJfc2NhZmZvbGRfZ2VuZXJhdG9yL3NyYy94c2QvdHlwZXMvQ29tcGxleFR5cGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLG9FQUFvRTtBQUNwRSwrQ0FBK0M7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUkvQyxnQ0FBa0M7QUFFbEMsd0JBQXdCO0FBRXhCO0lBQWlDLCtCQUFjO0lBQS9DOztJQVlBLENBQUM7SUFYTyxzQkFBVSxHQUE0QixjQUFNLE9BQUE7UUFDbEQsS0FBSyxDQUFDLFVBQVU7UUFDaEIsYUFBYTtRQUNiLGNBQWM7UUFDZCxLQUFLLENBQUMsU0FBUztRQUNmLEtBQUssQ0FBQyxZQUFZO1FBQ2xCLEtBQUssQ0FBQyxRQUFRO1FBQ2QsS0FBSyxDQUFDLE1BQU07UUFDWixLQUFLLENBQUMsY0FBYztRQUNwQixLQUFLLENBQUMsS0FBSztLQUNYLEVBVmtELENBVWxELENBQUM7SUFDSCxrQkFBQztDQUFBLEFBWkQsQ0FBaUMsS0FBSyxDQUFDLFFBQVEsR0FZOUM7QUFaWSxrQ0FBVztBQWN4QjtJQUFpQywrQkFBVTtJQUEzQzs7SUFtQkEsQ0FBQztJQWJBLDZCQUFPLEdBQVAsVUFBUSxLQUFZO1FBQ2xCLEtBQUssQ0FBQyxNQUFNLENBQUMsVUFBNkIsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUVqRSx5RUFBeUU7UUFDekUseUNBQXlDO1FBQ3pDLElBQUksQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3JDLElBQUksQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ25DLElBQUksQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLGdCQUFnQixDQUFDLENBQUM7SUFDN0MsQ0FBQztJQWRNLHNCQUFVLEdBQTRCLGNBQU0sT0FBQTtRQUNsRCxLQUFLLENBQUMsU0FBUztRQUNmLEtBQUssQ0FBQyxXQUFXO0tBQ2pCLEVBSGtELENBR2xELENBQUE7SUFlRixrQkFBQztDQUFBLEFBbkJELENBQWlDLEtBQUssQ0FBQyxJQUFJLEdBbUIxQztBQW5CWSxrQ0FBVztBQXFCeEIsMEJBQTBCO0FBRTFCO0lBQW1DLGlDQUFXO0lBQTlDOztJQUNBLENBQUM7SUFBRCxvQkFBQztBQUFELENBQUMsQUFERCxDQUFtQyxXQUFXLEdBQzdDO0FBRFksc0NBQWE7QUFHMUIsMkJBQTJCO0FBRTNCO0lBQW9DLGtDQUFXO0lBQS9DOztJQUNBLENBQUM7SUFBRCxxQkFBQztBQUFELENBQUMsQUFERCxDQUFvQyxXQUFXLEdBQzlDO0FBRFksd0NBQWMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBUaGlzIGZpbGUgaXMgcGFydCBvZiBjeHNkLCBjb3B5cmlnaHQgKGMpIDIwMTUtMjAxNiBCdXNGYXN0ZXIgTHRkLlxuLy8gUmVsZWFzZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlLCBzZWUgTElDRU5TRS5cblxuaW1wb3J0IHtTdGF0ZX0gZnJvbSAnLi4vU3RhdGUnO1xuaW1wb3J0IHtRTmFtZX0gZnJvbSAnLi4vUU5hbWUnO1xuaW1wb3J0ICogYXMgdHlwZXMgZnJvbSAnLi4vdHlwZXMnO1xuXG4vKiogPHhzZDpjb21wbGV4dHlwZT4gKi9cblxuZXhwb3J0IGNsYXNzIENvbXBsZXhUeXBlIGV4dGVuZHMgdHlwZXMuVHlwZUJhc2Uge1xuXHRzdGF0aWMgbWF5Q29udGFpbjogKCkgPT4gdHlwZXMuQmFzZUNsYXNzW10gPSAoKSA9PiBbXG5cdFx0dHlwZXMuQW5ub3RhdGlvbixcblx0XHRTaW1wbGVDb250ZW50LFxuXHRcdENvbXBsZXhDb250ZW50LFxuXHRcdHR5cGVzLkF0dHJpYnV0ZSxcblx0XHR0eXBlcy5BbnlBdHRyaWJ1dGUsXG5cdFx0dHlwZXMuU2VxdWVuY2UsXG5cdFx0dHlwZXMuQ2hvaWNlLFxuXHRcdHR5cGVzLkF0dHJpYnV0ZUdyb3VwLFxuXHRcdHR5cGVzLkdyb3VwXG5cdF07XG59XG5cbmV4cG9ydCBjbGFzcyBDb250ZW50QmFzZSBleHRlbmRzIHR5cGVzLkJhc2Uge1xuXHRzdGF0aWMgbWF5Q29udGFpbjogKCkgPT4gdHlwZXMuQmFzZUNsYXNzW10gPSAoKSA9PiBbXG5cdFx0dHlwZXMuRXh0ZW5zaW9uLFxuXHRcdHR5cGVzLlJlc3RyaWN0aW9uXG5cdF1cblxuXHRyZXNvbHZlKHN0YXRlOiBTdGF0ZSkge1xuXHRcdChzdGF0ZS5wYXJlbnQueHNkRWxlbWVudCBhcyB0eXBlcy5UeXBlQmFzZSkucGFyZW50ID0gdGhpcy5wYXJlbnQ7XG5cblx0XHQvLyBQYXNzIGVsZW1lbnRzIGFuZCBhdHRyaWJ1dGVzIGRlZmluZWQgaW4gY2hpbGQgZXh0ZW5zaW9uIG9yIHJlc3RyaWN0aW9uXG5cdFx0Ly8gb253YXJkcyB0byB0aGUgcGFyZW50IHR5cGUgZGVmaW5pdGlvbi5cblx0XHR0aGlzLnNjb3BlLmFkZEFsbFRvUGFyZW50KCdlbGVtZW50Jyk7XG5cdFx0dGhpcy5zY29wZS5hZGRBbGxUb1BhcmVudCgnYXR0cmlidXRlJyk7XG5cdFx0dGhpcy5zY29wZS5hZGRBbGxUb1BhcmVudCgnZ3JvdXAnKTtcblx0XHR0aGlzLnNjb3BlLmFkZEFsbFRvUGFyZW50KCdhdHRyaWJ1dGVHcm91cCcpO1xuXHR9XG5cblx0Ly8gSW50ZXJuYWxseSB1c2VkIG1lbWJlcnNcblx0cGFyZW50OiB0eXBlcy5UeXBlQmFzZSB8IFFOYW1lO1xufVxuXG4vKiogPHhzZDpzaW1wbGVjb250ZW50PiAqL1xuXG5leHBvcnQgY2xhc3MgU2ltcGxlQ29udGVudCBleHRlbmRzIENvbnRlbnRCYXNlIHtcbn1cblxuLyoqIDx4c2Q6Y29tcGxleGNvbnRlbnQ+ICovXG5cbmV4cG9ydCBjbGFzcyBDb21wbGV4Q29udGVudCBleHRlbmRzIENvbnRlbnRCYXNlIHtcbn1cbiJdfQ==