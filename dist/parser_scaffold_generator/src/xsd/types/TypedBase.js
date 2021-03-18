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
exports.TypedBase = void 0;
var QName_1 = require("../QName");
var types = require("../types");
var TypedBase = /** @class */ (function (_super) {
    __extends(TypedBase, _super);
    function TypedBase() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TypedBase.prototype.resolveType = function (typeName, state) {
        // If the element has a type set through an attribute, look it up in scope.
        if (typeName) {
            var type = new QName_1.QName(typeName, state.source);
            return (this.scope.lookup(type, 'type') || type);
        }
        else {
            // If there's a single type as a child, use it as the element's type.
            return (this.scope.getType());
        }
    };
    return TypedBase;
}(types.Base));
exports.TypedBase = TypedBase;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVHlwZWRCYXNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcGFyc2VyX3NjYWZmb2xkX2dlbmVyYXRvci9zcmMveHNkL3R5cGVzL1R5cGVkQmFzZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsb0VBQW9FO0FBQ3BFLCtDQUErQzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRy9DLGtDQUErQjtBQUMvQixnQ0FBa0M7QUFFbEM7SUFBK0IsNkJBQVU7SUFBekM7O0lBWUEsQ0FBQztJQVhBLCtCQUFXLEdBQVgsVUFBWSxRQUFnQixFQUFFLEtBQVk7UUFDekMsMkVBQTJFO1FBRTNFLElBQUcsUUFBUSxFQUFFO1lBQ1osSUFBSSxJQUFJLEdBQUcsSUFBSSxhQUFLLENBQUMsUUFBUSxFQUFFLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUM3QyxPQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBbUIsSUFBSSxJQUFJLENBQUMsQ0FBQztTQUNsRTthQUFNO1lBQ04scUVBQXFFO1lBQ3JFLE9BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7U0FDN0I7SUFDRixDQUFDO0lBQ0YsZ0JBQUM7QUFBRCxDQUFDLEFBWkQsQ0FBK0IsS0FBSyxDQUFDLElBQUksR0FZeEM7QUFaWSw4QkFBUyIsInNvdXJjZXNDb250ZW50IjpbIi8vIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIGN4c2QsIGNvcHlyaWdodCAoYykgMjAxNS0yMDE2IEJ1c0Zhc3RlciBMdGQuXG4vLyBSZWxlYXNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UsIHNlZSBMSUNFTlNFLlxuXG5pbXBvcnQge1N0YXRlfSBmcm9tICcuLi9TdGF0ZSc7XG5pbXBvcnQge1FOYW1lfSBmcm9tICcuLi9RTmFtZSc7XG5pbXBvcnQgKiBhcyB0eXBlcyBmcm9tICcuLi90eXBlcyc7XG5cbmV4cG9ydCBjbGFzcyBUeXBlZEJhc2UgZXh0ZW5kcyB0eXBlcy5CYXNlIHtcblx0cmVzb2x2ZVR5cGUodHlwZU5hbWU6IHN0cmluZywgc3RhdGU6IFN0YXRlKTogUU5hbWUgfCB0eXBlcy5UeXBlQmFzZSB7XG5cdFx0Ly8gSWYgdGhlIGVsZW1lbnQgaGFzIGEgdHlwZSBzZXQgdGhyb3VnaCBhbiBhdHRyaWJ1dGUsIGxvb2sgaXQgdXAgaW4gc2NvcGUuXG5cblx0XHRpZih0eXBlTmFtZSkge1xuXHRcdFx0dmFyIHR5cGUgPSBuZXcgUU5hbWUodHlwZU5hbWUsIHN0YXRlLnNvdXJjZSk7XG5cdFx0XHRyZXR1cm4odGhpcy5zY29wZS5sb29rdXAodHlwZSwgJ3R5cGUnKSBhcyB0eXBlcy5UeXBlQmFzZSB8fCB0eXBlKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0Ly8gSWYgdGhlcmUncyBhIHNpbmdsZSB0eXBlIGFzIGEgY2hpbGQsIHVzZSBpdCBhcyB0aGUgZWxlbWVudCdzIHR5cGUuXG5cdFx0XHRyZXR1cm4odGhpcy5zY29wZS5nZXRUeXBlKCkpO1xuXHRcdH1cblx0fVxufVxuIl19