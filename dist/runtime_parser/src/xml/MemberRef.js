"use strict";
// This file is part of cxml, copyright (c) 2016 BusFaster Ltd.
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
var MemberRefBase_1 = require("./MemberRefBase");
var MemberRef = /** @class */ (function (_super) {
    __extends(MemberRef, _super);
    function MemberRef(spec, namespace, proxy) {
        var _this = this;
        var flags = spec[1];
        var member;
        if (typeof (spec[0]) == 'number')
            member = namespace.memberByNum(spec[0]);
        else
            member = spec[0];
        _this = _super.call(this, member, (flags & MemberRef.optionalFlag) ? 0 : 1, (flags & MemberRef.arrayFlag) ? Infinity : 1) || this;
        _this.safeName = spec[2] || _this.member.safeName;
        if (member.isSubstituted)
            proxy = _this;
        if (proxy && _this.max > 1)
            _this.proxy = proxy;
        return _this;
    }
    return MemberRef;
}(MemberRefBase_1.MemberRefBase));
exports.MemberRef = MemberRef;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWVtYmVyUmVmLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcnVudGltZV9wYXJzZXIvc3JjL3htbC9NZW1iZXJSZWYudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLCtEQUErRDtBQUMvRCwrQ0FBK0M7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUkvQyxpREFBOEM7QUFLOUM7SUFBK0IsNkJBQXlCO0lBQ3ZELG1CQUFZLElBQWdCLEVBQUUsU0FBb0IsRUFBRSxLQUFpQjtRQUFyRSxpQkFpQkM7UUFoQkEsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3BCLElBQUksTUFBa0IsQ0FBQztRQUV2QixJQUFHLE9BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxRQUFRO1lBQUUsTUFBTSxHQUFHLFNBQVMsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBVyxDQUFDLENBQUM7O1lBQzdFLE1BQU0sR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFlLENBQUM7UUFFcEMsUUFBQSxrQkFDQyxNQUFNLEVBQ04sQ0FBQyxLQUFLLEdBQUcsU0FBUyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFDeEMsQ0FBQyxLQUFLLEdBQUcsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FDNUMsU0FBQztRQUVGLEtBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDO1FBRWhELElBQUcsTUFBTSxDQUFDLGFBQWE7WUFBRSxLQUFLLEdBQUcsS0FBSSxDQUFDO1FBQ3RDLElBQUcsS0FBSyxJQUFJLEtBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQztZQUFFLEtBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDOztJQUM5QyxDQUFDO0lBR0YsZ0JBQUM7QUFBRCxDQUFDLEFBckJELENBQStCLDZCQUFhLEdBcUIzQztBQXJCWSw4QkFBUyIsInNvdXJjZXNDb250ZW50IjpbIi8vIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIGN4bWwsIGNvcHlyaWdodCAoYykgMjAxNiBCdXNGYXN0ZXIgTHRkLlxuLy8gUmVsZWFzZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlLCBzZWUgTElDRU5TRS5cblxuaW1wb3J0IHtOYW1lc3BhY2V9IGZyb20gJy4vTmFtZXNwYWNlJztcbmltcG9ydCB7TWVtYmVyU3BlY30gZnJvbSAnLi9NZW1iZXInO1xuaW1wb3J0IHtNZW1iZXJSZWZCYXNlfSBmcm9tICcuL01lbWJlclJlZkJhc2UnO1xuXG4vKiogVHVwbGU6IG1lbWJlciBJRCwgZmxhZ3MsIG5hbWUgKi9cbmV4cG9ydCB0eXBlIFJhd1JlZlNwZWMgPSBbIG51bWJlciB8IE1lbWJlclNwZWMsIG51bWJlciwgc3RyaW5nIF07XG5cbmV4cG9ydCBjbGFzcyBNZW1iZXJSZWYgZXh0ZW5kcyBNZW1iZXJSZWZCYXNlPE1lbWJlclNwZWM+IHtcblx0Y29uc3RydWN0b3Ioc3BlYzogUmF3UmVmU3BlYywgbmFtZXNwYWNlOiBOYW1lc3BhY2UsIHByb3h5PzogTWVtYmVyUmVmKSB7XG5cdFx0dmFyIGZsYWdzID0gc3BlY1sxXTtcblx0XHR2YXIgbWVtYmVyOiBNZW1iZXJTcGVjO1xuXG5cdFx0aWYodHlwZW9mKHNwZWNbMF0pID09ICdudW1iZXInKSBtZW1iZXIgPSBuYW1lc3BhY2UubWVtYmVyQnlOdW0oc3BlY1swXSBhcyBudW1iZXIpO1xuXHRcdGVsc2UgbWVtYmVyID0gc3BlY1swXSBhcyBNZW1iZXJTcGVjO1xuXG5cdFx0c3VwZXIoXG5cdFx0XHRtZW1iZXIsXG5cdFx0XHQoZmxhZ3MgJiBNZW1iZXJSZWYub3B0aW9uYWxGbGFnKSA/IDAgOiAxLFxuXHRcdFx0KGZsYWdzICYgTWVtYmVyUmVmLmFycmF5RmxhZykgPyBJbmZpbml0eSA6IDFcblx0XHQpO1xuXG5cdFx0dGhpcy5zYWZlTmFtZSA9IHNwZWNbMl0gfHwgdGhpcy5tZW1iZXIuc2FmZU5hbWU7XG5cblx0XHRpZihtZW1iZXIuaXNTdWJzdGl0dXRlZCkgcHJveHkgPSB0aGlzO1xuXHRcdGlmKHByb3h5ICYmIHRoaXMubWF4ID4gMSkgdGhpcy5wcm94eSA9IHByb3h5O1xuXHR9XG5cblx0cHJveHk6IE1lbWJlclJlZjtcbn1cbiJdfQ==