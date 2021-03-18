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
exports.Primitive = void 0;
var TypeBase_1 = require("./TypeBase");
/** Primitive types map directly to JavaScript equivalents. */
var Primitive = /** @class */ (function (_super) {
    __extends(Primitive, _super);
    function Primitive() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Primitive;
}(TypeBase_1.TypeBase));
exports.Primitive = Primitive;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUHJpbWl0aXZlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcGFyc2VyX3NjYWZmb2xkX2dlbmVyYXRvci9zcmMveHNkL3R5cGVzL1ByaW1pdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsb0VBQW9FO0FBQ3BFLCtDQUErQzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRS9DLHVDQUFvQztBQUVwQyw4REFBOEQ7QUFFOUQ7SUFBK0IsNkJBQVE7SUFBdkM7O0lBQ0EsQ0FBQztJQUFELGdCQUFDO0FBQUQsQ0FBQyxBQURELENBQStCLG1CQUFRLEdBQ3RDO0FBRFksOEJBQVMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBUaGlzIGZpbGUgaXMgcGFydCBvZiBjeHNkLCBjb3B5cmlnaHQgKGMpIDIwMTUtMjAxNiBCdXNGYXN0ZXIgTHRkLlxuLy8gUmVsZWFzZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlLCBzZWUgTElDRU5TRS5cblxuaW1wb3J0IHtUeXBlQmFzZX0gZnJvbSAnLi9UeXBlQmFzZSc7XG5cbi8qKiBQcmltaXRpdmUgdHlwZXMgbWFwIGRpcmVjdGx5IHRvIEphdmFTY3JpcHQgZXF1aXZhbGVudHMuICovXG5cbmV4cG9ydCBjbGFzcyBQcmltaXRpdmUgZXh0ZW5kcyBUeXBlQmFzZSB7XG59XG4iXX0=