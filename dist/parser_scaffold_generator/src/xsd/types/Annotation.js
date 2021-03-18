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
exports.Annotation = void 0;
var types = require("../types");
/** <xsd:annotation> */
var Annotation = /** @class */ (function (_super) {
    __extends(Annotation, _super);
    function Annotation() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Annotation.mayContain = function () { return [
        types.Documentation
    ]; };
    return Annotation;
}(types.Base));
exports.Annotation = Annotation;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQW5ub3RhdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3BhcnNlcl9zY2FmZm9sZF9nZW5lcmF0b3Ivc3JjL3hzZC90eXBlcy9Bbm5vdGF0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxvRUFBb0U7QUFDcEUsK0NBQStDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFL0MsZ0NBQWtDO0FBRWxDLHVCQUF1QjtBQUV2QjtJQUFnQyw4QkFBVTtJQUExQzs7SUFJQSxDQUFDO0lBSE8scUJBQVUsR0FBNEIsY0FBTSxPQUFBO1FBQ2xELEtBQUssQ0FBQyxhQUFhO0tBQ25CLEVBRmtELENBRWxELENBQUM7SUFDSCxpQkFBQztDQUFBLEFBSkQsQ0FBZ0MsS0FBSyxDQUFDLElBQUksR0FJekM7QUFKWSxnQ0FBVSIsInNvdXJjZXNDb250ZW50IjpbIi8vIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIGN4c2QsIGNvcHlyaWdodCAoYykgMjAxNS0yMDE2IEJ1c0Zhc3RlciBMdGQuXG4vLyBSZWxlYXNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UsIHNlZSBMSUNFTlNFLlxuXG5pbXBvcnQgKiBhcyB0eXBlcyBmcm9tICcuLi90eXBlcyc7XG5cbi8qKiA8eHNkOmFubm90YXRpb24+ICovXG5cbmV4cG9ydCBjbGFzcyBBbm5vdGF0aW9uIGV4dGVuZHMgdHlwZXMuQmFzZSB7XG5cdHN0YXRpYyBtYXlDb250YWluOiAoKSA9PiB0eXBlcy5CYXNlQ2xhc3NbXSA9ICgpID0+IFtcblx0XHR0eXBlcy5Eb2N1bWVudGF0aW9uXG5cdF07XG59XG4iXX0=