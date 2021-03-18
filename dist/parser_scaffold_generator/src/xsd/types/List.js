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
exports.List = void 0;
var types = require("../types");
var TypedBase_1 = require("./TypedBase");
/** <xsd:list> */
var List = /** @class */ (function (_super) {
    __extends(List, _super);
    function List() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.itemType = null;
        return _this;
    }
    List.prototype.resolve = function (state) {
        var type = this.resolveType(this.itemType, state);
        this.scope.addContentToParent('list', type, 0, Infinity);
    };
    List.mayContain = function () { return [
        types.SimpleType
    ]; };
    return List;
}(TypedBase_1.TypedBase));
exports.List = List;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTGlzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3BhcnNlcl9zY2FmZm9sZF9nZW5lcmF0b3Ivc3JjL3hzZC90eXBlcy9MaXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxvRUFBb0U7QUFDcEUsK0NBQStDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFJL0MsZ0NBQWtDO0FBQ2xDLHlDQUFzQztBQUV0QyxpQkFBaUI7QUFFakI7SUFBMEIsd0JBQVM7SUFBbkM7UUFBQSxxRUFXQztRQURBLGNBQVEsR0FBVyxJQUFJLENBQUM7O0lBQ3pCLENBQUM7SUFOQSxzQkFBTyxHQUFQLFVBQVEsS0FBWTtRQUNuQixJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDbEQsSUFBSSxDQUFDLEtBQUssQ0FBQyxrQkFBa0IsQ0FBQyxNQUFNLEVBQUUsSUFBc0IsRUFBRSxDQUFDLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDNUUsQ0FBQztJQVBNLGVBQVUsR0FBNEIsY0FBTSxPQUFBO1FBQ2xELEtBQUssQ0FBQyxVQUFVO0tBQ2hCLEVBRmtELENBRWxELENBQUE7SUFRRixXQUFDO0NBQUEsQUFYRCxDQUEwQixxQkFBUyxHQVdsQztBQVhZLG9CQUFJIiwic291cmNlc0NvbnRlbnQiOlsiLy8gVGhpcyBmaWxlIGlzIHBhcnQgb2YgY3hzZCwgY29weXJpZ2h0IChjKSAyMDE1LTIwMTYgQnVzRmFzdGVyIEx0ZC5cbi8vIFJlbGVhc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSwgc2VlIExJQ0VOU0UuXG5cbmltcG9ydCB7U3RhdGV9IGZyb20gJy4uL1N0YXRlJztcbmltcG9ydCB7UU5hbWV9IGZyb20gJy4uL1FOYW1lJztcbmltcG9ydCAqIGFzIHR5cGVzIGZyb20gJy4uL3R5cGVzJztcbmltcG9ydCB7VHlwZWRCYXNlfSBmcm9tICcuL1R5cGVkQmFzZSc7XG5cbi8qKiA8eHNkOmxpc3Q+ICovXG5cbmV4cG9ydCBjbGFzcyBMaXN0IGV4dGVuZHMgVHlwZWRCYXNlIHtcblx0c3RhdGljIG1heUNvbnRhaW46ICgpID0+IHR5cGVzLkJhc2VDbGFzc1tdID0gKCkgPT4gW1xuXHRcdHR5cGVzLlNpbXBsZVR5cGVcblx0XVxuXG5cdHJlc29sdmUoc3RhdGU6IFN0YXRlKSB7XG5cdFx0dmFyIHR5cGUgPSB0aGlzLnJlc29sdmVUeXBlKHRoaXMuaXRlbVR5cGUsIHN0YXRlKTtcblx0XHR0aGlzLnNjb3BlLmFkZENvbnRlbnRUb1BhcmVudCgnbGlzdCcsIHR5cGUgYXMgdHlwZXMuVHlwZUJhc2UsIDAsIEluZmluaXR5KTtcblx0fVxuXG5cdGl0ZW1UeXBlOiBzdHJpbmcgPSBudWxsO1xufVxuIl19