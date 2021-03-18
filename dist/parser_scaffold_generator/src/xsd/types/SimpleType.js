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
exports.SimpleType = void 0;
var types = require("../types");
/** <xsd:simpletype> */
var SimpleType = /** @class */ (function (_super) {
    __extends(SimpleType, _super);
    function SimpleType() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SimpleType.prototype.setEnumerationList = function (enumerationList) {
        this.enumerationList = enumerationList;
    };
    SimpleType.prototype.getEnumerationList = function () {
        return (this.enumerationList);
    };
    SimpleType.mayContain = function () { return [
        types.Annotation,
        types.Restriction,
        types.List,
        types.Union
    ]; };
    return SimpleType;
}(types.TypeBase));
exports.SimpleType = SimpleType;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2ltcGxlVHlwZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3BhcnNlcl9zY2FmZm9sZF9nZW5lcmF0b3Ivc3JjL3hzZC90eXBlcy9TaW1wbGVUeXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxvRUFBb0U7QUFDcEUsK0NBQStDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFJL0MsZ0NBQWtDO0FBRWxDLHVCQUF1QjtBQUV2QjtJQUFnQyw4QkFBYztJQUE5Qzs7SUFpQkEsQ0FBQztJQVRBLHVDQUFrQixHQUFsQixVQUFtQixlQUF5QjtRQUMzQyxJQUFJLENBQUMsZUFBZSxHQUFHLGVBQWUsQ0FBQztJQUN4QyxDQUFDO0lBRUQsdUNBQWtCLEdBQWxCO1FBQ0MsT0FBTSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztJQUM5QixDQUFDO0lBYk0scUJBQVUsR0FBNEIsY0FBTSxPQUFBO1FBQ2xELEtBQUssQ0FBQyxVQUFVO1FBQ2hCLEtBQUssQ0FBQyxXQUFXO1FBQ2pCLEtBQUssQ0FBQyxJQUFJO1FBQ1YsS0FBSyxDQUFDLEtBQUs7S0FDWCxFQUxrRCxDQUtsRCxDQUFDO0lBV0gsaUJBQUM7Q0FBQSxBQWpCRCxDQUFnQyxLQUFLLENBQUMsUUFBUSxHQWlCN0M7QUFqQlksZ0NBQVUiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBUaGlzIGZpbGUgaXMgcGFydCBvZiBjeHNkLCBjb3B5cmlnaHQgKGMpIDIwMTUtMjAxNiBCdXNGYXN0ZXIgTHRkLlxuLy8gUmVsZWFzZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlLCBzZWUgTElDRU5TRS5cblxuaW1wb3J0IHtTdGF0ZX0gZnJvbSAnLi4vU3RhdGUnO1xuaW1wb3J0IHtRTmFtZX0gZnJvbSAnLi4vUU5hbWUnO1xuaW1wb3J0ICogYXMgdHlwZXMgZnJvbSAnLi4vdHlwZXMnO1xuXG4vKiogPHhzZDpzaW1wbGV0eXBlPiAqL1xuXG5leHBvcnQgY2xhc3MgU2ltcGxlVHlwZSBleHRlbmRzIHR5cGVzLlR5cGVCYXNlIHtcblx0c3RhdGljIG1heUNvbnRhaW46ICgpID0+IHR5cGVzLkJhc2VDbGFzc1tdID0gKCkgPT4gW1xuXHRcdHR5cGVzLkFubm90YXRpb24sXG5cdFx0dHlwZXMuUmVzdHJpY3Rpb24sXG5cdFx0dHlwZXMuTGlzdCxcblx0XHR0eXBlcy5VbmlvblxuXHRdO1xuXG5cdHNldEVudW1lcmF0aW9uTGlzdChlbnVtZXJhdGlvbkxpc3Q6IHN0cmluZ1tdKSB7XG5cdFx0dGhpcy5lbnVtZXJhdGlvbkxpc3QgPSBlbnVtZXJhdGlvbkxpc3Q7XG5cdH1cblxuXHRnZXRFbnVtZXJhdGlvbkxpc3QoKSB7XG5cdFx0cmV0dXJuKHRoaXMuZW51bWVyYXRpb25MaXN0KTtcblx0fVxuXG5cdHByaXZhdGUgZW51bWVyYXRpb25MaXN0OiBzdHJpbmdbXTtcbn1cbiJdfQ==