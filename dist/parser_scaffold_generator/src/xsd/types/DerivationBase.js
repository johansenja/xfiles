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
exports.DerivationBase = void 0;
var QName_1 = require("../QName");
var types = require("../types");
/** Derived type support, allows types to inherit others. */
var DerivationBase = /** @class */ (function (_super) {
    __extends(DerivationBase, _super);
    function DerivationBase() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.id = null;
        _this.base = null;
        return _this;
    }
    DerivationBase.prototype.resolve = function (state) {
        var base = new QName_1.QName(this.base, state.source);
        state.parent.xsdElement.parent = this.scope.lookup(base, 'type') || base;
        this.scope.addAllToParent('element');
        this.scope.addAllToParent('attribute');
        this.scope.addAllToParent('group');
        this.scope.addAllToParent('attributeGroup');
    };
    DerivationBase.mayContain = function () { return [
        types.Group,
        types.All,
        types.Choice,
        types.Sequence,
        types.Attribute,
        types.AttributeGroup,
        types.AnyAttribute
    ]; };
    return DerivationBase;
}(types.Base));
exports.DerivationBase = DerivationBase;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGVyaXZhdGlvbkJhc2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wYXJzZXJfc2NhZmZvbGRfZ2VuZXJhdG9yL3NyYy94c2QvdHlwZXMvRGVyaXZhdGlvbkJhc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLG9FQUFvRTtBQUNwRSwrQ0FBK0M7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUcvQyxrQ0FBK0I7QUFFL0IsZ0NBQWtDO0FBRWxDLDREQUE0RDtBQUU1RDtJQUFvQyxrQ0FBVTtJQUE5QztRQUFBLHFFQXVCQztRQUZBLFFBQUUsR0FBVyxJQUFJLENBQUM7UUFDbEIsVUFBSSxHQUFXLElBQUksQ0FBQzs7SUFDckIsQ0FBQztJQVpBLGdDQUFPLEdBQVAsVUFBUSxLQUFZO1FBQ25CLElBQUksSUFBSSxHQUFHLElBQUksYUFBSyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzdDLEtBQUssQ0FBQyxNQUFNLENBQUMsVUFBK0MsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBbUIsSUFBSSxJQUFJLENBQUM7UUFFakksSUFBSSxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDckMsSUFBSSxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDdkMsSUFBSSxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDbkMsSUFBSSxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztJQUM3QyxDQUFDO0lBbEJNLHlCQUFVLEdBQTRCLGNBQU0sT0FBQTtRQUNsRCxLQUFLLENBQUMsS0FBSztRQUNYLEtBQUssQ0FBQyxHQUFHO1FBQ1QsS0FBSyxDQUFDLE1BQU07UUFDWixLQUFLLENBQUMsUUFBUTtRQUNkLEtBQUssQ0FBQyxTQUFTO1FBQ2YsS0FBSyxDQUFDLGNBQWM7UUFDcEIsS0FBSyxDQUFDLFlBQVk7S0FDbEIsRUFSa0QsQ0FRbEQsQ0FBQTtJQWNGLHFCQUFDO0NBQUEsQUF2QkQsQ0FBb0MsS0FBSyxDQUFDLElBQUksR0F1QjdDO0FBdkJZLHdDQUFjIiwic291cmNlc0NvbnRlbnQiOlsiLy8gVGhpcyBmaWxlIGlzIHBhcnQgb2YgY3hzZCwgY29weXJpZ2h0IChjKSAyMDE1LTIwMTYgQnVzRmFzdGVyIEx0ZC5cbi8vIFJlbGVhc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSwgc2VlIExJQ0VOU0UuXG5cbmltcG9ydCB7U3RhdGV9IGZyb20gJy4uL1N0YXRlJztcbmltcG9ydCB7UU5hbWV9IGZyb20gJy4uL1FOYW1lJztcbmltcG9ydCB7Q29udGVudEJhc2V9IGZyb20gJy4vQ29tcGxleFR5cGUnO1xuaW1wb3J0ICogYXMgdHlwZXMgZnJvbSAnLi4vdHlwZXMnO1xuXG4vKiogRGVyaXZlZCB0eXBlIHN1cHBvcnQsIGFsbG93cyB0eXBlcyB0byBpbmhlcml0IG90aGVycy4gKi9cblxuZXhwb3J0IGNsYXNzIERlcml2YXRpb25CYXNlIGV4dGVuZHMgdHlwZXMuQmFzZSB7XG5cdHN0YXRpYyBtYXlDb250YWluOiAoKSA9PiB0eXBlcy5CYXNlQ2xhc3NbXSA9ICgpID0+IFtcblx0XHR0eXBlcy5Hcm91cCxcblx0XHR0eXBlcy5BbGwsXG5cdFx0dHlwZXMuQ2hvaWNlLFxuXHRcdHR5cGVzLlNlcXVlbmNlLFxuXHRcdHR5cGVzLkF0dHJpYnV0ZSxcblx0XHR0eXBlcy5BdHRyaWJ1dGVHcm91cCxcblx0XHR0eXBlcy5BbnlBdHRyaWJ1dGVcblx0XVxuXG5cdHJlc29sdmUoc3RhdGU6IFN0YXRlKSB7XG5cdFx0dmFyIGJhc2UgPSBuZXcgUU5hbWUodGhpcy5iYXNlLCBzdGF0ZS5zb3VyY2UpO1xuXHRcdChzdGF0ZS5wYXJlbnQueHNkRWxlbWVudCBhcyAoQ29udGVudEJhc2UgfCB0eXBlcy5TaW1wbGVUeXBlKSkucGFyZW50ID0gdGhpcy5zY29wZS5sb29rdXAoYmFzZSwgJ3R5cGUnKSBhcyB0eXBlcy5UeXBlQmFzZSB8fCBiYXNlO1xuXG5cdFx0dGhpcy5zY29wZS5hZGRBbGxUb1BhcmVudCgnZWxlbWVudCcpO1xuXHRcdHRoaXMuc2NvcGUuYWRkQWxsVG9QYXJlbnQoJ2F0dHJpYnV0ZScpO1xuXHRcdHRoaXMuc2NvcGUuYWRkQWxsVG9QYXJlbnQoJ2dyb3VwJyk7XG5cdFx0dGhpcy5zY29wZS5hZGRBbGxUb1BhcmVudCgnYXR0cmlidXRlR3JvdXAnKTtcblx0fVxuXG5cdGlkOiBzdHJpbmcgPSBudWxsO1xuXHRiYXNlOiBzdHJpbmcgPSBudWxsO1xufVxuIl19