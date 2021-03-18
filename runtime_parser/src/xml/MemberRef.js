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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWVtYmVyUmVmLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiTWVtYmVyUmVmLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSwrREFBK0Q7QUFDL0QsK0NBQStDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFJL0MsaURBQThDO0FBSzlDO0lBQStCLDZCQUF5QjtJQUN2RCxtQkFBWSxJQUFnQixFQUFFLFNBQW9CLEVBQUUsS0FBaUI7UUFBckUsaUJBaUJDO1FBaEJBLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNwQixJQUFJLE1BQWtCLENBQUM7UUFFdkIsSUFBRyxPQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksUUFBUTtZQUFFLE1BQU0sR0FBRyxTQUFTLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQVcsQ0FBQyxDQUFDOztZQUM3RSxNQUFNLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBZSxDQUFDO1FBRXBDLFFBQUEsa0JBQ0MsTUFBTSxFQUNOLENBQUMsS0FBSyxHQUFHLFNBQVMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQ3hDLENBQUMsS0FBSyxHQUFHLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQzVDLFNBQUM7UUFFRixLQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxLQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQztRQUVoRCxJQUFHLE1BQU0sQ0FBQyxhQUFhO1lBQUUsS0FBSyxHQUFHLEtBQUksQ0FBQztRQUN0QyxJQUFHLEtBQUssSUFBSSxLQUFJLENBQUMsR0FBRyxHQUFHLENBQUM7WUFBRSxLQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQzs7SUFDOUMsQ0FBQztJQUdGLGdCQUFDO0FBQUQsQ0FBQyxBQXJCRCxDQUErQiw2QkFBYSxHQXFCM0M7QUFyQlksOEJBQVMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBUaGlzIGZpbGUgaXMgcGFydCBvZiBjeG1sLCBjb3B5cmlnaHQgKGMpIDIwMTYgQnVzRmFzdGVyIEx0ZC5cbi8vIFJlbGVhc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSwgc2VlIExJQ0VOU0UuXG5cbmltcG9ydCB7TmFtZXNwYWNlfSBmcm9tICcuL05hbWVzcGFjZSc7XG5pbXBvcnQge01lbWJlclNwZWN9IGZyb20gJy4vTWVtYmVyJztcbmltcG9ydCB7TWVtYmVyUmVmQmFzZX0gZnJvbSAnLi9NZW1iZXJSZWZCYXNlJztcblxuLyoqIFR1cGxlOiBtZW1iZXIgSUQsIGZsYWdzLCBuYW1lICovXG5leHBvcnQgdHlwZSBSYXdSZWZTcGVjID0gWyBudW1iZXIgfCBNZW1iZXJTcGVjLCBudW1iZXIsIHN0cmluZyBdO1xuXG5leHBvcnQgY2xhc3MgTWVtYmVyUmVmIGV4dGVuZHMgTWVtYmVyUmVmQmFzZTxNZW1iZXJTcGVjPiB7XG5cdGNvbnN0cnVjdG9yKHNwZWM6IFJhd1JlZlNwZWMsIG5hbWVzcGFjZTogTmFtZXNwYWNlLCBwcm94eT86IE1lbWJlclJlZikge1xuXHRcdHZhciBmbGFncyA9IHNwZWNbMV07XG5cdFx0dmFyIG1lbWJlcjogTWVtYmVyU3BlYztcblxuXHRcdGlmKHR5cGVvZihzcGVjWzBdKSA9PSAnbnVtYmVyJykgbWVtYmVyID0gbmFtZXNwYWNlLm1lbWJlckJ5TnVtKHNwZWNbMF0gYXMgbnVtYmVyKTtcblx0XHRlbHNlIG1lbWJlciA9IHNwZWNbMF0gYXMgTWVtYmVyU3BlYztcblxuXHRcdHN1cGVyKFxuXHRcdFx0bWVtYmVyLFxuXHRcdFx0KGZsYWdzICYgTWVtYmVyUmVmLm9wdGlvbmFsRmxhZykgPyAwIDogMSxcblx0XHRcdChmbGFncyAmIE1lbWJlclJlZi5hcnJheUZsYWcpID8gSW5maW5pdHkgOiAxXG5cdFx0KTtcblxuXHRcdHRoaXMuc2FmZU5hbWUgPSBzcGVjWzJdIHx8IHRoaXMubWVtYmVyLnNhZmVOYW1lO1xuXG5cdFx0aWYobWVtYmVyLmlzU3Vic3RpdHV0ZWQpIHByb3h5ID0gdGhpcztcblx0XHRpZihwcm94eSAmJiB0aGlzLm1heCA+IDEpIHRoaXMucHJveHkgPSBwcm94eTtcblx0fVxuXG5cdHByb3h5OiBNZW1iZXJSZWY7XG59XG4iXX0=