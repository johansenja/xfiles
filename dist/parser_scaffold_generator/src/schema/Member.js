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
exports.Member = void 0;
var cxml = require("../../../runtime_parser");
var Type_1 = require("./Type");
var MemberRef_1 = require("./MemberRef");
var Member = /** @class */ (function (_super) {
    __extends(Member, _super);
    function Member(name) {
        var _this = _super.call(this, null, name) || this;
        _this.surrogateKey = Member.nextKey++;
        return _this;
    }
    Member.prototype.getRef = function () {
        return (new MemberRef_1.MemberRef(this, 0, 1));
    };
    Member.prototype.getProxy = function () {
        var proxy = this.proxy;
        if (!proxy) {
            var proxy = new Type_1.Type(null);
            proxy.namespace = this.namespace;
            proxy.isProxy = true;
            proxy.containingRef = this.getRef();
            this.proxy = proxy;
            this.namespace.addType(proxy);
            if (!this.isAbstract) {
                proxy.addChildSpec(this);
            }
        }
        return (proxy);
    };
    Member.nextKey = 0;
    return Member;
}(cxml.MemberBase));
exports.Member = Member;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWVtYmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcGFyc2VyX3NjYWZmb2xkX2dlbmVyYXRvci9zcmMvc2NoZW1hL01lbWJlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsK0RBQStEO0FBQy9ELCtDQUErQzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRS9DLDhDQUFnRDtBQUdoRCwrQkFBNEI7QUFDNUIseUNBQXNDO0FBRXRDO0lBQTRCLDBCQUF5RDtJQUNwRixnQkFBWSxJQUFZO1FBQXhCLFlBQ0Msa0JBQU0sSUFBSSxFQUFFLElBQUksQ0FBQyxTQUVqQjtRQURBLEtBQUksQ0FBQyxZQUFZLEdBQUcsTUFBTSxDQUFDLE9BQU8sRUFBRSxDQUFDOztJQUN0QyxDQUFDO0lBRUQsdUJBQU0sR0FBTjtRQUNDLE9BQU0sQ0FBQyxJQUFJLHFCQUFTLENBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ25DLENBQUM7SUFFRCx5QkFBUSxHQUFSO1FBQ0MsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztRQUN2QixJQUFHLENBQUMsS0FBSyxFQUFFO1lBQ1YsSUFBSSxLQUFLLEdBQUcsSUFBSSxXQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDM0IsS0FBSyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO1lBQ2pDLEtBQUssQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1lBQ3JCLEtBQUssQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBRXBDLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1lBQ25CLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBRTlCLElBQUcsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFO2dCQUNwQixLQUFLLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQ3pCO1NBQ0Q7UUFFRCxPQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDZixDQUFDO0lBYWMsY0FBTyxHQUFHLENBQUMsQ0FBQztJQUM1QixhQUFDO0NBQUEsQUF6Q0QsQ0FBNEIsSUFBSSxDQUFDLFVBQVUsR0F5QzFDO0FBekNZLHdCQUFNIiwic291cmNlc0NvbnRlbnQiOlsiLy8gVGhpcyBmaWxlIGlzIHBhcnQgb2YgY3hzZCwgY29weXJpZ2h0IChjKSAyMDE2IEJ1c0Zhc3RlciBMdGQuXG4vLyBSZWxlYXNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UsIHNlZSBMSUNFTlNFLlxuXG5pbXBvcnQgKiBhcyBjeG1sIGZyb20gXCIuLi8uLi8uLi9ydW50aW1lX3BhcnNlclwiO1xuXG5pbXBvcnQge05hbWVzcGFjZX0gZnJvbSAnLi9OYW1lc3BhY2UnO1xuaW1wb3J0IHtUeXBlfSBmcm9tICcuL1R5cGUnO1xuaW1wb3J0IHtNZW1iZXJSZWZ9IGZyb20gJy4vTWVtYmVyUmVmJztcblxuZXhwb3J0IGNsYXNzIE1lbWJlciBleHRlbmRzIGN4bWwuTWVtYmVyQmFzZTxNZW1iZXIsIE5hbWVzcGFjZSwgY3htbC5JdGVtQmFzZTxNZW1iZXI+PiB7XG5cdGNvbnN0cnVjdG9yKG5hbWU6IHN0cmluZykge1xuXHRcdHN1cGVyKG51bGwsIG5hbWUpO1xuXHRcdHRoaXMuc3Vycm9nYXRlS2V5ID0gTWVtYmVyLm5leHRLZXkrKztcblx0fVxuXG5cdGdldFJlZigpIHtcblx0XHRyZXR1cm4obmV3IE1lbWJlclJlZih0aGlzLCAwLCAxKSk7XG5cdH1cblxuXHRnZXRQcm94eSgpIHtcblx0XHR2YXIgcHJveHkgPSB0aGlzLnByb3h5O1xuXHRcdGlmKCFwcm94eSkge1xuXHRcdFx0dmFyIHByb3h5ID0gbmV3IFR5cGUobnVsbCk7XG5cdFx0XHRwcm94eS5uYW1lc3BhY2UgPSB0aGlzLm5hbWVzcGFjZTtcblx0XHRcdHByb3h5LmlzUHJveHkgPSB0cnVlO1xuXHRcdFx0cHJveHkuY29udGFpbmluZ1JlZiA9IHRoaXMuZ2V0UmVmKCk7XG5cblx0XHRcdHRoaXMucHJveHkgPSBwcm94eTtcblx0XHRcdHRoaXMubmFtZXNwYWNlLmFkZFR5cGUocHJveHkpO1xuXG5cdFx0XHRpZighdGhpcy5pc0Fic3RyYWN0KSB7XG5cdFx0XHRcdHByb3h5LmFkZENoaWxkU3BlYyh0aGlzKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4ocHJveHkpO1xuXHR9XG5cblx0dHlwZUxpc3Q6IFR5cGVbXTtcblx0c3Vic3RpdHV0ZXM6IE1lbWJlcjtcblxuXHQvKiogUHJveHkgdHlwZSBjb250YWluaW5nIG90aGVyIHN1YnN0aXR1dGlvbiBncm91cCBtZW1iZXJzLiAqL1xuXHRwcm94eTogVHlwZTtcblxuXHRjb21tZW50OiBzdHJpbmc7XG5cblx0aXNFeHBvcnRlZDogYm9vbGVhbjtcblxuXHRzdXJyb2dhdGVLZXk6IG51bWJlcjtcblx0cHJpdmF0ZSBzdGF0aWMgbmV4dEtleSA9IDA7XG59XG4iXX0=