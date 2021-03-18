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
exports.Documentation = void 0;
var types = require("../types");
/** <xsd:documentation>
  * Works like a comment usable in almost any part of the schema. */
var Documentation = /** @class */ (function (_super) {
    __extends(Documentation, _super);
    function Documentation() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.commentList = [];
        return _this;
    }
    Documentation.prototype.init = function (state) {
        state.startText(this);
    };
    Documentation.prototype.addText = function (state, text) {
        this.commentList.push(text);
    };
    Documentation.prototype.loaded = function (state) {
        state.endText();
    };
    Documentation.prototype.resolve = function (state) {
        this.scope.addCommentsToGrandParent(this.commentList);
    };
    return Documentation;
}(types.Base));
exports.Documentation = Documentation;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRG9jdW1lbnRhdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3BhcnNlcl9zY2FmZm9sZF9nZW5lcmF0b3Ivc3JjL3hzZC90eXBlcy9Eb2N1bWVudGF0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxvRUFBb0U7QUFDcEUsK0NBQStDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFHL0MsZ0NBQWtDO0FBRWxDO29FQUNvRTtBQUVwRTtJQUFtQyxpQ0FBVTtJQUE3QztRQUFBLHFFQWtCQztRQURBLGlCQUFXLEdBQWEsRUFBRSxDQUFDOztJQUM1QixDQUFDO0lBakJBLDRCQUFJLEdBQUosVUFBSyxLQUFZO1FBQ2hCLEtBQUssQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDdkIsQ0FBQztJQUVELCtCQUFPLEdBQVAsVUFBUSxLQUFZLEVBQUUsSUFBWTtRQUNqQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM3QixDQUFDO0lBRUQsOEJBQU0sR0FBTixVQUFPLEtBQVk7UUFDbEIsS0FBSyxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ2pCLENBQUM7SUFFRCwrQkFBTyxHQUFQLFVBQVEsS0FBWTtRQUNuQixJQUFJLENBQUMsS0FBSyxDQUFDLHdCQUF3QixDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUN2RCxDQUFDO0lBR0Ysb0JBQUM7QUFBRCxDQUFDLEFBbEJELENBQW1DLEtBQUssQ0FBQyxJQUFJLEdBa0I1QztBQWxCWSxzQ0FBYSIsInNvdXJjZXNDb250ZW50IjpbIi8vIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIGN4c2QsIGNvcHlyaWdodCAoYykgMjAxNS0yMDE2IEJ1c0Zhc3RlciBMdGQuXG4vLyBSZWxlYXNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UsIHNlZSBMSUNFTlNFLlxuXG5pbXBvcnQge1N0YXRlfSBmcm9tICcuLi9TdGF0ZSc7XG5pbXBvcnQgKiBhcyB0eXBlcyBmcm9tICcuLi90eXBlcyc7XG5cbi8qKiA8eHNkOmRvY3VtZW50YXRpb24+XG4gICogV29ya3MgbGlrZSBhIGNvbW1lbnQgdXNhYmxlIGluIGFsbW9zdCBhbnkgcGFydCBvZiB0aGUgc2NoZW1hLiAqL1xuXG5leHBvcnQgY2xhc3MgRG9jdW1lbnRhdGlvbiBleHRlbmRzIHR5cGVzLkJhc2Uge1xuXHRpbml0KHN0YXRlOiBTdGF0ZSkge1xuXHRcdHN0YXRlLnN0YXJ0VGV4dCh0aGlzKTtcblx0fVxuXG5cdGFkZFRleHQoc3RhdGU6IFN0YXRlLCB0ZXh0OiBzdHJpbmcpIHtcblx0XHR0aGlzLmNvbW1lbnRMaXN0LnB1c2godGV4dCk7XG5cdH1cblxuXHRsb2FkZWQoc3RhdGU6IFN0YXRlKSB7XG5cdFx0c3RhdGUuZW5kVGV4dCgpO1xuXHR9XG5cblx0cmVzb2x2ZShzdGF0ZTogU3RhdGUpIHtcblx0XHR0aGlzLnNjb3BlLmFkZENvbW1lbnRzVG9HcmFuZFBhcmVudCh0aGlzLmNvbW1lbnRMaXN0KTtcblx0fVxuXG5cdGNvbW1lbnRMaXN0OiBzdHJpbmdbXSA9IFtdO1xufVxuIl19