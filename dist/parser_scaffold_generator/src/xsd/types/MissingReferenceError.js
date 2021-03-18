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
exports.MissingReferenceError = void 0;
var MissingReferenceError = /** @class */ (function (_super) {
    __extends(MissingReferenceError, _super);
    function MissingReferenceError(type, ref) {
        var _this = _super.call(this) || this;
        _this.name = 'MissingReferenceError';
        _this.message = 'Missing ' + type + ': ' + ref.format();
        _this = _super.call(this, _this.message) || this;
        return _this;
    }
    return MissingReferenceError;
}(Error));
exports.MissingReferenceError = MissingReferenceError;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWlzc2luZ1JlZmVyZW5jZUVycm9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcGFyc2VyX3NjYWZmb2xkX2dlbmVyYXRvci9zcmMveHNkL3R5cGVzL01pc3NpbmdSZWZlcmVuY2VFcnJvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsb0VBQW9FO0FBQ3BFLCtDQUErQzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBTS9DO0lBQTJDLHlDQUFLO0lBQy9DLCtCQUFZLElBQVksRUFBRSxHQUFVO1FBQXBDLFlBQ0MsaUJBQU8sU0FNUDtRQUpBLEtBQUksQ0FBQyxJQUFJLEdBQUcsdUJBQXVCLENBQUM7UUFDcEMsS0FBSSxDQUFDLE9BQU8sR0FBRyxVQUFVLEdBQUcsSUFBSSxHQUFHLElBQUksR0FBRyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUM7UUFFdkQsUUFBQSxrQkFBTSxLQUFJLENBQUMsT0FBTyxDQUFDLFNBQUM7O0lBQ3JCLENBQUM7SUFDRiw0QkFBQztBQUFELENBQUMsQUFURCxDQUEyQyxLQUFLLEdBUy9DO0FBVFksc0RBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiLy8gVGhpcyBmaWxlIGlzIHBhcnQgb2YgY3hzZCwgY29weXJpZ2h0IChjKSAyMDE1LTIwMTYgQnVzRmFzdGVyIEx0ZC5cbi8vIFJlbGVhc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSwgc2VlIExJQ0VOU0UuXG5cbmltcG9ydCB7U3RhdGV9IGZyb20gJy4uL1N0YXRlJztcbmltcG9ydCB7UU5hbWV9IGZyb20gJy4uL1FOYW1lJztcbmltcG9ydCB7QmFzZX0gZnJvbSAnLi9CYXNlJztcblxuZXhwb3J0IGNsYXNzIE1pc3NpbmdSZWZlcmVuY2VFcnJvciBleHRlbmRzIEVycm9yIHtcblx0Y29uc3RydWN0b3IodHlwZTogc3RyaW5nLCByZWY6IFFOYW1lKSB7XG5cdFx0c3VwZXIoKTtcblxuXHRcdHRoaXMubmFtZSA9ICdNaXNzaW5nUmVmZXJlbmNlRXJyb3InO1xuXHRcdHRoaXMubWVzc2FnZSA9ICdNaXNzaW5nICcgKyB0eXBlICsgJzogJyArIHJlZi5mb3JtYXQoKTtcblxuXHRcdHN1cGVyKHRoaXMubWVzc2FnZSk7XG5cdH1cbn1cbiJdfQ==