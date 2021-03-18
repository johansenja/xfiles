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
exports.Attribute = void 0;
var MemberBase_1 = require("./MemberBase");
var types = require("../types");
/** <xsd:attribute> */
var Attribute = /** @class */ (function (_super) {
    __extends(Attribute, _super);
    function Attribute() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.use = null;
        _this.default = null;
        return _this;
    }
    Attribute.prototype.init = function (state) {
        // Attributes appear exactly once unless they're optional.
        if (this.use == 'optional')
            this.min = 0;
        else
            this.min = 1; // assume 'required'
        this.max = 1;
        this.define(state, 'attribute', this.min, this.max);
    };
    Attribute.prototype.resolve = function (state) {
        var attribute = this.resolveMember(state, 'attribute');
    };
    Attribute.mayContain = function () { return [
        types.Annotation,
        types.SimpleType
    ]; };
    return Attribute;
}(MemberBase_1.MemberBase));
exports.Attribute = Attribute;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXR0cmlidXRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcGFyc2VyX3NjYWZmb2xkX2dlbmVyYXRvci9zcmMveHNkL3R5cGVzL0F0dHJpYnV0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsb0VBQW9FO0FBQ3BFLCtDQUErQzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRy9DLDJDQUF3QztBQUN4QyxnQ0FBa0M7QUFJbEMsc0JBQXNCO0FBRXRCO0lBQStCLDZCQUFVO0lBQXpDO1FBQUEscUVBcUJDO1FBRkEsU0FBRyxHQUFXLElBQUksQ0FBQztRQUNuQixhQUFPLEdBQWlCLElBQUksQ0FBQzs7SUFDOUIsQ0FBQztJQWZBLHdCQUFJLEdBQUosVUFBSyxLQUFZO1FBQ2hCLDBEQUEwRDtRQUMxRCxJQUFHLElBQUksQ0FBQyxHQUFHLElBQUksVUFBVTtZQUFFLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDOztZQUNuQyxJQUFJLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLG9CQUFvQjtRQUN2QyxJQUFJLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztRQUViLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLFdBQVcsRUFBRSxJQUFJLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNyRCxDQUFDO0lBRUQsMkJBQU8sR0FBUCxVQUFRLEtBQVk7UUFDbkIsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLEVBQUUsV0FBVyxDQUFjLENBQUM7SUFDckUsQ0FBQztJQWhCTSxvQkFBVSxHQUE0QixjQUFNLE9BQUE7UUFDbEQsS0FBSyxDQUFDLFVBQVU7UUFDaEIsS0FBSyxDQUFDLFVBQVU7S0FDaEIsRUFIa0QsQ0FHbEQsQ0FBQztJQWlCSCxnQkFBQztDQUFBLEFBckJELENBQStCLHVCQUFVLEdBcUJ4QztBQXJCWSw4QkFBUyIsInNvdXJjZXNDb250ZW50IjpbIi8vIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIGN4c2QsIGNvcHlyaWdodCAoYykgMjAxNS0yMDE2IEJ1c0Zhc3RlciBMdGQuXG4vLyBSZWxlYXNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UsIHNlZSBMSUNFTlNFLlxuXG5pbXBvcnQge1N0YXRlfSBmcm9tICcuLi9TdGF0ZSc7XG5pbXBvcnQge01lbWJlckJhc2V9IGZyb20gJy4vTWVtYmVyQmFzZSc7XG5pbXBvcnQgKiBhcyB0eXBlcyBmcm9tICcuLi90eXBlcyc7XG5cbmV4cG9ydCB0eXBlIFhtbEF0dHJpYnV0ZSA9IHN0cmluZyB8IG51bWJlcjtcblxuLyoqIDx4c2Q6YXR0cmlidXRlPiAqL1xuXG5leHBvcnQgY2xhc3MgQXR0cmlidXRlIGV4dGVuZHMgTWVtYmVyQmFzZSB7XG5cdHN0YXRpYyBtYXlDb250YWluOiAoKSA9PiB0eXBlcy5CYXNlQ2xhc3NbXSA9ICgpID0+IFtcblx0XHR0eXBlcy5Bbm5vdGF0aW9uLFxuXHRcdHR5cGVzLlNpbXBsZVR5cGVcblx0XTtcblxuXHRpbml0KHN0YXRlOiBTdGF0ZSkge1xuXHRcdC8vIEF0dHJpYnV0ZXMgYXBwZWFyIGV4YWN0bHkgb25jZSB1bmxlc3MgdGhleSdyZSBvcHRpb25hbC5cblx0XHRpZih0aGlzLnVzZSA9PSAnb3B0aW9uYWwnKSB0aGlzLm1pbiA9IDA7XG5cdFx0ZWxzZSB0aGlzLm1pbiA9IDE7IC8vIGFzc3VtZSAncmVxdWlyZWQnXG5cdFx0dGhpcy5tYXggPSAxO1xuXG5cdFx0dGhpcy5kZWZpbmUoc3RhdGUsICdhdHRyaWJ1dGUnLCB0aGlzLm1pbiwgdGhpcy5tYXgpO1xuXHR9XG5cblx0cmVzb2x2ZShzdGF0ZTogU3RhdGUpIHtcblx0XHR2YXIgYXR0cmlidXRlID0gdGhpcy5yZXNvbHZlTWVtYmVyKHN0YXRlLCAnYXR0cmlidXRlJykgYXMgQXR0cmlidXRlO1xuXHR9XG5cblx0dXNlOiBzdHJpbmcgPSBudWxsO1xuXHRkZWZhdWx0OiBYbWxBdHRyaWJ1dGUgPSBudWxsO1xufVxuIl19