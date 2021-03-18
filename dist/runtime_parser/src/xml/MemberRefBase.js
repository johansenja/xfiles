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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWVtYmVyUmVmQmFzZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3J1bnRpbWVfcGFyc2VyL3NyYy94bWwvTWVtYmVyUmVmQmFzZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsK0RBQStEO0FBQy9ELCtDQUErQzs7O0FBRS9DO0lBQ0MsdUJBQVksTUFBYyxFQUFFLEdBQVcsRUFBRSxHQUFXO1FBQ25ELElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBQ2YsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7SUFDaEIsQ0FBQztJQVFNLDBCQUFZLEdBQUcsQ0FBQyxDQUFDO0lBQ2pCLHVCQUFTLEdBQUcsQ0FBQyxDQUFDO0lBQ3RCLG9CQUFDO0NBQUEsQUFmRCxJQWVDO0FBZlksc0NBQWEiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBUaGlzIGZpbGUgaXMgcGFydCBvZiBjeG1sLCBjb3B5cmlnaHQgKGMpIDIwMTYgQnVzRmFzdGVyIEx0ZC5cbi8vIFJlbGVhc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSwgc2VlIExJQ0VOU0UuXG5cbmV4cG9ydCBjbGFzcyBNZW1iZXJSZWZCYXNlPE1lbWJlcj4ge1xuXHRjb25zdHJ1Y3RvcihtZW1iZXI6IE1lbWJlciwgbWluOiBudW1iZXIsIG1heDogbnVtYmVyKSB7XG5cdFx0dGhpcy5tZW1iZXIgPSBtZW1iZXI7XG5cdFx0dGhpcy5taW4gPSBtaW47XG5cdFx0dGhpcy5tYXggPSBtYXg7XG5cdH1cblxuXHRtZW1iZXI6IE1lbWJlcjtcblx0bWluOiBudW1iZXI7XG5cdG1heDogbnVtYmVyO1xuXG5cdHNhZmVOYW1lOiBzdHJpbmc7XG5cblx0c3RhdGljIG9wdGlvbmFsRmxhZyA9IDE7XG5cdHN0YXRpYyBhcnJheUZsYWcgPSAyO1xufVxuIl19