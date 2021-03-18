"use strict";
// This file is part of cxsd, copyright (c) 2016 BusFaster Ltd.
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
exports.MemberRef = void 0;
var cxml = require("../../../runtime_parser");
var MemberRef = /** @class */ (function (_super) {
    __extends(MemberRef, _super);
    function MemberRef() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return MemberRef;
}(cxml.MemberRefBase));
exports.MemberRef = MemberRef;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWVtYmVyUmVmLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcGFyc2VyX3NjYWZmb2xkX2dlbmVyYXRvci9zcmMvc2NoZW1hL01lbWJlclJlZi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsK0RBQStEO0FBQy9ELCtDQUErQzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRS9DLDhDQUFnRDtBQUloRDtJQUErQiw2QkFBMEI7SUFBekQ7O0lBRUEsQ0FBQztJQUFELGdCQUFDO0FBQUQsQ0FBQyxBQUZELENBQStCLElBQUksQ0FBQyxhQUFhLEdBRWhEO0FBRlksOEJBQVMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBUaGlzIGZpbGUgaXMgcGFydCBvZiBjeHNkLCBjb3B5cmlnaHQgKGMpIDIwMTYgQnVzRmFzdGVyIEx0ZC5cbi8vIFJlbGVhc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSwgc2VlIExJQ0VOU0UuXG5cbmltcG9ydCAqIGFzIGN4bWwgZnJvbSBcIi4uLy4uLy4uL3J1bnRpbWVfcGFyc2VyXCI7XG5cbmltcG9ydCB7TWVtYmVyfSBmcm9tICcuL01lbWJlcic7XG5cbmV4cG9ydCBjbGFzcyBNZW1iZXJSZWYgZXh0ZW5kcyBjeG1sLk1lbWJlclJlZkJhc2U8TWVtYmVyPiB7XG5cdHByZWZpeDogc3RyaW5nO1xufVxuIl19