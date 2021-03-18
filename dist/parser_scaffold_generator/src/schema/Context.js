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
exports.Context = void 0;
var cxml = require("../../../runtime_parser");
var Namespace_1 = require("./Namespace");
var Context = /** @class */ (function (_super) {
    __extends(Context, _super);
    function Context() {
        return _super.call(this, Namespace_1.Namespace) || this;
    }
    return Context;
}(cxml.ContextBase));
exports.Context = Context;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29udGV4dC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3BhcnNlcl9zY2FmZm9sZF9nZW5lcmF0b3Ivc3JjL3NjaGVtYS9Db250ZXh0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSwrREFBK0Q7QUFDL0QsK0NBQStDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFL0MsOENBQWdEO0FBRWhELHlDQUF3QztBQUV4QztJQUE2QiwyQkFBb0M7SUFDL0Q7ZUFDRSxrQkFBTSxxQkFBUyxDQUFDO0lBQ2xCLENBQUM7SUFDSCxjQUFDO0FBQUQsQ0FBQyxBQUpELENBQTZCLElBQUksQ0FBQyxXQUFXLEdBSTVDO0FBSlksMEJBQU8iLCJzb3VyY2VzQ29udGVudCI6WyIvLyBUaGlzIGZpbGUgaXMgcGFydCBvZiBjeHNkLCBjb3B5cmlnaHQgKGMpIDIwMTYgQnVzRmFzdGVyIEx0ZC5cbi8vIFJlbGVhc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSwgc2VlIExJQ0VOU0UuXG5cbmltcG9ydCAqIGFzIGN4bWwgZnJvbSBcIi4uLy4uLy4uL3J1bnRpbWVfcGFyc2VyXCI7XG5cbmltcG9ydCB7IE5hbWVzcGFjZSB9IGZyb20gXCIuL05hbWVzcGFjZVwiO1xuXG5leHBvcnQgY2xhc3MgQ29udGV4dCBleHRlbmRzIGN4bWwuQ29udGV4dEJhc2U8Q29udGV4dCwgTmFtZXNwYWNlPiB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKE5hbWVzcGFjZSk7XG4gIH1cbn1cbiJdfQ==