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
exports.Any = void 0;
var types = require("../types");
// <xsd:any>
var Any = /** @class */ (function (_super) {
    __extends(Any, _super);
    function Any() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.namespace = null;
        _this.processContents = 'strict';
        return _this;
    }
    Any.prototype.init = function (state) {
        this.name = '*';
        _super.prototype.init.call(this, state);
    };
    Any.prototype.resolve = function (state) {
        this.typeRef = this.resolveType('anytype', state);
    };
    return Any;
}(types.Element));
exports.Any = Any;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQW55LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcGFyc2VyX3NjYWZmb2xkX2dlbmVyYXRvci9zcmMveHNkL3R5cGVzL0FueS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsb0VBQW9FO0FBQ3BFLCtDQUErQzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRy9DLGdDQUFrQztBQUVsQyxZQUFZO0FBRVo7SUFBeUIsdUJBQWE7SUFBdEM7UUFBQSxxRUFZQztRQUZBLGVBQVMsR0FBVyxJQUFJLENBQUM7UUFDekIscUJBQWUsR0FBOEIsUUFBUSxDQUFDOztJQUN2RCxDQUFDO0lBWEEsa0JBQUksR0FBSixVQUFLLEtBQVk7UUFDaEIsSUFBSSxDQUFDLElBQUksR0FBRyxHQUFHLENBQUM7UUFDaEIsaUJBQU0sSUFBSSxZQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ25CLENBQUM7SUFFRCxxQkFBTyxHQUFQLFVBQVEsS0FBWTtRQUNuQixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ25ELENBQUM7SUFJRixVQUFDO0FBQUQsQ0FBQyxBQVpELENBQXlCLEtBQUssQ0FBQyxPQUFPLEdBWXJDO0FBWlksa0JBQUciLCJzb3VyY2VzQ29udGVudCI6WyIvLyBUaGlzIGZpbGUgaXMgcGFydCBvZiBjeHNkLCBjb3B5cmlnaHQgKGMpIDIwMTUtMjAxNiBCdXNGYXN0ZXIgTHRkLlxuLy8gUmVsZWFzZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlLCBzZWUgTElDRU5TRS5cblxuaW1wb3J0IHtTdGF0ZX0gZnJvbSAnLi4vU3RhdGUnO1xuaW1wb3J0ICogYXMgdHlwZXMgZnJvbSAnLi4vdHlwZXMnO1xuXG4vLyA8eHNkOmFueT5cblxuZXhwb3J0IGNsYXNzIEFueSBleHRlbmRzIHR5cGVzLkVsZW1lbnQge1xuXHRpbml0KHN0YXRlOiBTdGF0ZSkge1xuXHRcdHRoaXMubmFtZSA9ICcqJztcblx0XHRzdXBlci5pbml0KHN0YXRlKTtcblx0fVxuXG5cdHJlc29sdmUoc3RhdGU6IFN0YXRlKSB7XG5cdFx0dGhpcy50eXBlUmVmID0gdGhpcy5yZXNvbHZlVHlwZSgnYW55dHlwZScsIHN0YXRlKTtcblx0fVxuXG5cdG5hbWVzcGFjZTogc3RyaW5nID0gbnVsbDtcblx0cHJvY2Vzc0NvbnRlbnRzOiAnbGF4JyB8ICdza2lwJyB8ICdzdHJpY3QnID0gJ3N0cmljdCc7XG59XG4iXX0=