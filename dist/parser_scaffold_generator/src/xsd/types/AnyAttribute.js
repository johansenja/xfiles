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
exports.AnyAttribute = void 0;
var types = require("../types");
/** <xsd:anyAttribute> */
var AnyAttribute = /** @class */ (function (_super) {
    __extends(AnyAttribute, _super);
    function AnyAttribute() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.namespace = null;
        _this.processContents = 'strict';
        return _this;
    }
    AnyAttribute.prototype.init = function (state) {
        this.name = '*';
        _super.prototype.init.call(this, state);
    };
    AnyAttribute.prototype.resolve = function (state) {
        this.typeRef = this.resolveType('anytype', state);
    };
    return AnyAttribute;
}(types.Attribute));
exports.AnyAttribute = AnyAttribute;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQW55QXR0cmlidXRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcGFyc2VyX3NjYWZmb2xkX2dlbmVyYXRvci9zcmMveHNkL3R5cGVzL0FueUF0dHJpYnV0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsb0VBQW9FO0FBQ3BFLCtDQUErQzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRy9DLGdDQUFrQztBQUVsQyx5QkFBeUI7QUFFekI7SUFBa0MsZ0NBQWU7SUFBakQ7UUFBQSxxRUFZQztRQUZBLGVBQVMsR0FBVyxJQUFJLENBQUM7UUFDekIscUJBQWUsR0FBOEIsUUFBUSxDQUFDOztJQUN2RCxDQUFDO0lBWEEsMkJBQUksR0FBSixVQUFLLEtBQVk7UUFDaEIsSUFBSSxDQUFDLElBQUksR0FBRyxHQUFHLENBQUM7UUFDaEIsaUJBQU0sSUFBSSxZQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ25CLENBQUM7SUFFRCw4QkFBTyxHQUFQLFVBQVEsS0FBWTtRQUNuQixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ25ELENBQUM7SUFJRixtQkFBQztBQUFELENBQUMsQUFaRCxDQUFrQyxLQUFLLENBQUMsU0FBUyxHQVloRDtBQVpZLG9DQUFZIiwic291cmNlc0NvbnRlbnQiOlsiLy8gVGhpcyBmaWxlIGlzIHBhcnQgb2YgY3hzZCwgY29weXJpZ2h0IChjKSAyMDE1LTIwMTYgQnVzRmFzdGVyIEx0ZC5cbi8vIFJlbGVhc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSwgc2VlIExJQ0VOU0UuXG5cbmltcG9ydCB7U3RhdGV9IGZyb20gJy4uL1N0YXRlJztcbmltcG9ydCAqIGFzIHR5cGVzIGZyb20gJy4uL3R5cGVzJztcblxuLyoqIDx4c2Q6YW55QXR0cmlidXRlPiAqL1xuXG5leHBvcnQgY2xhc3MgQW55QXR0cmlidXRlIGV4dGVuZHMgdHlwZXMuQXR0cmlidXRlIHtcblx0aW5pdChzdGF0ZTogU3RhdGUpIHtcblx0XHR0aGlzLm5hbWUgPSAnKic7XG5cdFx0c3VwZXIuaW5pdChzdGF0ZSk7XG5cdH1cblxuXHRyZXNvbHZlKHN0YXRlOiBTdGF0ZSkge1xuXHRcdHRoaXMudHlwZVJlZiA9IHRoaXMucmVzb2x2ZVR5cGUoJ2FueXR5cGUnLCBzdGF0ZSk7XG5cdH1cblxuXHRuYW1lc3BhY2U6IHN0cmluZyA9IG51bGw7XG5cdHByb2Nlc3NDb250ZW50czogJ2xheCcgfCAnc2tpcCcgfCAnc3RyaWN0JyA9ICdzdHJpY3QnO1xufVxuIl19