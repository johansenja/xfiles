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
exports.Enumeration = void 0;
var types = require("../types");
/** <xsd:enumeration> */
var Enumeration = /** @class */ (function (_super) {
    __extends(Enumeration, _super);
    function Enumeration() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.value = null;
        return _this;
    }
    Enumeration.prototype.init = function (state) {
        var parent = state.parent.xsdElement;
        if (parent instanceof types.Restriction)
            parent.addEnumeration(this.value);
    };
    Enumeration.mayContain = function () { return [
        types.Annotation
    ]; };
    return Enumeration;
}(types.Base));
exports.Enumeration = Enumeration;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRW51bWVyYXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wYXJzZXJfc2NhZmZvbGRfZ2VuZXJhdG9yL3NyYy94c2QvdHlwZXMvRW51bWVyYXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLG9FQUFvRTtBQUNwRSwrQ0FBK0M7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUcvQyxnQ0FBa0M7QUFFbEMsd0JBQXdCO0FBRXhCO0lBQWlDLCtCQUFVO0lBQTNDO1FBQUEscUVBWUM7UUFEQSxXQUFLLEdBQVcsSUFBSSxDQUFDOztJQUN0QixDQUFDO0lBUEEsMEJBQUksR0FBSixVQUFLLEtBQVk7UUFDaEIsSUFBSSxNQUFNLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUM7UUFFckMsSUFBRyxNQUFNLFlBQVksS0FBSyxDQUFDLFdBQVc7WUFBRSxNQUFNLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMzRSxDQUFDO0lBUk0sc0JBQVUsR0FBNEIsY0FBTSxPQUFBO1FBQ2xELEtBQUssQ0FBQyxVQUFVO0tBQ2hCLEVBRmtELENBRWxELENBQUM7SUFTSCxrQkFBQztDQUFBLEFBWkQsQ0FBaUMsS0FBSyxDQUFDLElBQUksR0FZMUM7QUFaWSxrQ0FBVyIsInNvdXJjZXNDb250ZW50IjpbIi8vIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIGN4c2QsIGNvcHlyaWdodCAoYykgMjAxNS0yMDE2IEJ1c0Zhc3RlciBMdGQuXG4vLyBSZWxlYXNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UsIHNlZSBMSUNFTlNFLlxuXG5pbXBvcnQge1N0YXRlfSBmcm9tICcuLi9TdGF0ZSc7XG5pbXBvcnQgKiBhcyB0eXBlcyBmcm9tICcuLi90eXBlcyc7XG5cbi8qKiA8eHNkOmVudW1lcmF0aW9uPiAqL1xuXG5leHBvcnQgY2xhc3MgRW51bWVyYXRpb24gZXh0ZW5kcyB0eXBlcy5CYXNlIHtcblx0c3RhdGljIG1heUNvbnRhaW46ICgpID0+IHR5cGVzLkJhc2VDbGFzc1tdID0gKCkgPT4gW1xuXHRcdHR5cGVzLkFubm90YXRpb25cblx0XTtcblxuXHRpbml0KHN0YXRlOiBTdGF0ZSkge1xuXHRcdHZhciBwYXJlbnQgPSBzdGF0ZS5wYXJlbnQueHNkRWxlbWVudDtcblxuXHRcdGlmKHBhcmVudCBpbnN0YW5jZW9mIHR5cGVzLlJlc3RyaWN0aW9uKSBwYXJlbnQuYWRkRW51bWVyYXRpb24odGhpcy52YWx1ZSk7XG5cdH1cblxuXHR2YWx1ZTogc3RyaW5nID0gbnVsbDtcbn1cbiJdfQ==