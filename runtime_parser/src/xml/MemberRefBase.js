"use strict";
// This file is part of cxml, copyright (c) 2016 BusFaster Ltd.
// Released under the MIT license, see LICENSE.
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemberRefBase = void 0;
var MemberRefBase = /** @class */ (function () {
    function MemberRefBase(member, min, max) {
        this.member = member;
        this.min = min;
        this.max = max;
    }
    MemberRefBase.optionalFlag = 1;
    MemberRefBase.arrayFlag = 2;
    return MemberRefBase;
}());
exports.MemberRefBase = MemberRefBase;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWVtYmVyUmVmQmFzZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIk1lbWJlclJlZkJhc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLCtEQUErRDtBQUMvRCwrQ0FBK0M7OztBQUUvQztJQUNDLHVCQUFZLE1BQWMsRUFBRSxHQUFXLEVBQUUsR0FBVztRQUNuRCxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUNyQixJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUNmLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO0lBQ2hCLENBQUM7SUFRTSwwQkFBWSxHQUFHLENBQUMsQ0FBQztJQUNqQix1QkFBUyxHQUFHLENBQUMsQ0FBQztJQUN0QixvQkFBQztDQUFBLEFBZkQsSUFlQztBQWZZLHNDQUFhIiwic291cmNlc0NvbnRlbnQiOlsiLy8gVGhpcyBmaWxlIGlzIHBhcnQgb2YgY3htbCwgY29weXJpZ2h0IChjKSAyMDE2IEJ1c0Zhc3RlciBMdGQuXG4vLyBSZWxlYXNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UsIHNlZSBMSUNFTlNFLlxuXG5leHBvcnQgY2xhc3MgTWVtYmVyUmVmQmFzZTxNZW1iZXI+IHtcblx0Y29uc3RydWN0b3IobWVtYmVyOiBNZW1iZXIsIG1pbjogbnVtYmVyLCBtYXg6IG51bWJlcikge1xuXHRcdHRoaXMubWVtYmVyID0gbWVtYmVyO1xuXHRcdHRoaXMubWluID0gbWluO1xuXHRcdHRoaXMubWF4ID0gbWF4O1xuXHR9XG5cblx0bWVtYmVyOiBNZW1iZXI7XG5cdG1pbjogbnVtYmVyO1xuXHRtYXg6IG51bWJlcjtcblxuXHRzYWZlTmFtZTogc3RyaW5nO1xuXG5cdHN0YXRpYyBvcHRpb25hbEZsYWcgPSAxO1xuXHRzdGF0aWMgYXJyYXlGbGFnID0gMjtcbn1cbiJdfQ==