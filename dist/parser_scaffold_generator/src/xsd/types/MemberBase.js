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
exports.MemberBase = void 0;
var QName_1 = require("../QName");
var types = require("../types");
var TypedBase_1 = require("./TypedBase");
var schema = require("../../schema");
var MemberBase = /** @class */ (function (_super) {
    __extends(MemberBase, _super);
    function MemberBase() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.id = null;
        _this.name = null;
        _this.ref = null;
        _this.type = null;
        return _this;
    }
    MemberBase.prototype.resolveMember = function (state, kind) {
        var member = this;
        if (this.ref) {
            // Replace this with another, referenced element.
            var ref = new QName_1.QName(this.ref, state.source);
            member = this.scope.lookup(ref, kind);
            if (member)
                member.define(state, kind, this.min, this.max, this.scope);
            else
                throw new types.MissingReferenceError(kind, ref);
        }
        this.typeRef = this.resolveType(this.type, state);
        return (member);
    };
    MemberBase.prototype.getOutMember = function (schemaContext) {
        var outMember = this.outMember;
        if (!outMember) {
            outMember = new schema.Member(this.name);
            if (this.scope) {
                schemaContext.copyNamespace(this.scope.namespace).addMember(outMember);
            }
            this.outMember = outMember;
        }
        return (outMember);
    };
    MemberBase.prototype.getTypes = function () {
        var typeList;
        // Filter out types of unresolved elements.
        if (this.typeRef &&
            this.typeRef instanceof types.TypeBase) {
            typeList = [this.typeRef];
        }
        else
            typeList = [];
        return (typeList);
    };
    MemberBase.prototype.isAbstract = function () {
        return (false);
    };
    return MemberBase;
}(TypedBase_1.TypedBase));
exports.MemberBase = MemberBase;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWVtYmVyQmFzZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3BhcnNlcl9zY2FmZm9sZF9nZW5lcmF0b3Ivc3JjL3hzZC90eXBlcy9NZW1iZXJCYXNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxvRUFBb0U7QUFDcEUsK0NBQStDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFHL0Msa0NBQStCO0FBQy9CLGdDQUFrQztBQUNsQyx5Q0FBc0M7QUFDdEMscUNBQXVDO0FBRXZDO0lBQWdDLDhCQUFTO0lBQXpDO1FBQUEscUVBZ0VDO1FBWEEsUUFBRSxHQUFXLElBQUksQ0FBQztRQUNsQixVQUFJLEdBQVcsSUFBSSxDQUFDO1FBQ3BCLFNBQUcsR0FBVyxJQUFJLENBQUM7UUFDbkIsVUFBSSxHQUFXLElBQUksQ0FBQzs7SUFRckIsQ0FBQztJQS9EQSxrQ0FBYSxHQUFiLFVBQWMsS0FBWSxFQUFFLElBQVk7UUFDdkMsSUFBSSxNQUFNLEdBQUcsSUFBa0IsQ0FBQztRQUVoQyxJQUFHLElBQUksQ0FBQyxHQUFHLEVBQUU7WUFDWixpREFBaUQ7WUFFakQsSUFBSSxHQUFHLEdBQUcsSUFBSSxhQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDNUMsTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQWUsQ0FBQztZQUVwRCxJQUFHLE1BQU07Z0JBQUUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7O2dCQUNqRSxNQUFNLElBQUksS0FBSyxDQUFDLHFCQUFxQixDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQztTQUN0RDtRQUVELElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBRWxELE9BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNoQixDQUFDO0lBRUQsaUNBQVksR0FBWixVQUFhLGFBQTZCO1FBQ3pDLElBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7UUFFL0IsSUFBRyxDQUFDLFNBQVMsRUFBRTtZQUNkLFNBQVMsR0FBRyxJQUFJLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBRXpDLElBQUcsSUFBSSxDQUFDLEtBQUssRUFBRTtnQkFDZCxhQUFhLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDO2FBQ3ZFO1lBRUQsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7U0FDM0I7UUFFRCxPQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDbkIsQ0FBQztJQUVELDZCQUFRLEdBQVI7UUFDQyxJQUFJLFFBQTBCLENBQUM7UUFFL0IsMkNBQTJDO1FBQzNDLElBQ0MsSUFBSSxDQUFDLE9BQU87WUFDWixJQUFJLENBQUMsT0FBTyxZQUFZLEtBQUssQ0FBQyxRQUFRLEVBQ3JDO1lBQ0QsUUFBUSxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQXlCLENBQUMsQ0FBQztTQUM1Qzs7WUFBTSxRQUFRLEdBQUcsRUFBRSxDQUFDO1FBRXJCLE9BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNsQixDQUFDO0lBRUQsK0JBQVUsR0FBVjtRQUNDLE9BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNmLENBQUM7SUFhRixpQkFBQztBQUFELENBQUMsQUFoRUQsQ0FBZ0MscUJBQVMsR0FnRXhDO0FBaEVZLGdDQUFVIiwic291cmNlc0NvbnRlbnQiOlsiLy8gVGhpcyBmaWxlIGlzIHBhcnQgb2YgY3hzZCwgY29weXJpZ2h0IChjKSAyMDE1LTIwMTYgQnVzRmFzdGVyIEx0ZC5cbi8vIFJlbGVhc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSwgc2VlIExJQ0VOU0UuXG5cbmltcG9ydCB7U3RhdGV9IGZyb20gJy4uL1N0YXRlJztcbmltcG9ydCB7UU5hbWV9IGZyb20gJy4uL1FOYW1lJztcbmltcG9ydCAqIGFzIHR5cGVzIGZyb20gJy4uL3R5cGVzJztcbmltcG9ydCB7VHlwZWRCYXNlfSBmcm9tICcuL1R5cGVkQmFzZSc7XG5pbXBvcnQgKiBhcyBzY2hlbWEgZnJvbSAnLi4vLi4vc2NoZW1hJztcblxuZXhwb3J0IGNsYXNzIE1lbWJlckJhc2UgZXh0ZW5kcyBUeXBlZEJhc2Uge1xuXHRyZXNvbHZlTWVtYmVyKHN0YXRlOiBTdGF0ZSwga2luZDogc3RyaW5nKSB7XG5cdFx0dmFyIG1lbWJlciA9IHRoaXMgYXMgTWVtYmVyQmFzZTtcblxuXHRcdGlmKHRoaXMucmVmKSB7XG5cdFx0XHQvLyBSZXBsYWNlIHRoaXMgd2l0aCBhbm90aGVyLCByZWZlcmVuY2VkIGVsZW1lbnQuXG5cblx0XHRcdHZhciByZWYgPSBuZXcgUU5hbWUodGhpcy5yZWYsIHN0YXRlLnNvdXJjZSk7XG5cdFx0XHRtZW1iZXIgPSB0aGlzLnNjb3BlLmxvb2t1cChyZWYsIGtpbmQpIGFzIE1lbWJlckJhc2U7XG5cblx0XHRcdGlmKG1lbWJlcikgbWVtYmVyLmRlZmluZShzdGF0ZSwga2luZCwgdGhpcy5taW4sIHRoaXMubWF4LCB0aGlzLnNjb3BlKTtcblx0XHRcdGVsc2UgdGhyb3cgbmV3IHR5cGVzLk1pc3NpbmdSZWZlcmVuY2VFcnJvcihraW5kLCByZWYpO1xuXHRcdH1cblxuXHRcdHRoaXMudHlwZVJlZiA9IHRoaXMucmVzb2x2ZVR5cGUodGhpcy50eXBlLCBzdGF0ZSk7XG5cblx0XHRyZXR1cm4obWVtYmVyKTtcblx0fVxuXG5cdGdldE91dE1lbWJlcihzY2hlbWFDb250ZXh0OiBzY2hlbWEuQ29udGV4dCk6IHNjaGVtYS5NZW1iZXIge1xuXHRcdHZhciBvdXRNZW1iZXIgPSB0aGlzLm91dE1lbWJlcjtcblxuXHRcdGlmKCFvdXRNZW1iZXIpIHtcblx0XHRcdG91dE1lbWJlciA9IG5ldyBzY2hlbWEuTWVtYmVyKHRoaXMubmFtZSk7XG5cblx0XHRcdGlmKHRoaXMuc2NvcGUpIHtcblx0XHRcdFx0c2NoZW1hQ29udGV4dC5jb3B5TmFtZXNwYWNlKHRoaXMuc2NvcGUubmFtZXNwYWNlKS5hZGRNZW1iZXIob3V0TWVtYmVyKTtcblx0XHRcdH1cblxuXHRcdFx0dGhpcy5vdXRNZW1iZXIgPSBvdXRNZW1iZXI7XG5cdFx0fVxuXG5cdFx0cmV0dXJuKG91dE1lbWJlcik7XG5cdH1cblxuXHRnZXRUeXBlcygpOiB0eXBlcy5UeXBlQmFzZVtdIHtcblx0XHR2YXIgdHlwZUxpc3Q6IHR5cGVzLlR5cGVCYXNlW107XG5cblx0XHQvLyBGaWx0ZXIgb3V0IHR5cGVzIG9mIHVucmVzb2x2ZWQgZWxlbWVudHMuXG5cdFx0aWYoXG5cdFx0XHR0aGlzLnR5cGVSZWYgJiZcblx0XHRcdHRoaXMudHlwZVJlZiBpbnN0YW5jZW9mIHR5cGVzLlR5cGVCYXNlXG5cdFx0KSB7XG5cdFx0XHR0eXBlTGlzdCA9IFt0aGlzLnR5cGVSZWYgYXMgdHlwZXMuVHlwZUJhc2VdO1xuXHRcdH0gZWxzZSB0eXBlTGlzdCA9IFtdO1xuXG5cdFx0cmV0dXJuKHR5cGVMaXN0KTtcblx0fVxuXG5cdGlzQWJzdHJhY3QoKSB7XG5cdFx0cmV0dXJuKGZhbHNlKTtcblx0fVxuXG5cdGlkOiBzdHJpbmcgPSBudWxsO1xuXHRuYW1lOiBzdHJpbmcgPSBudWxsO1xuXHRyZWY6IHN0cmluZyA9IG51bGw7XG5cdHR5cGU6IHN0cmluZyA9IG51bGw7XG5cblx0bWluOiBudW1iZXI7XG5cdG1heDogbnVtYmVyO1xuXG5cdHR5cGVSZWY6IFFOYW1lIHwgdHlwZXMuVHlwZUJhc2U7XG5cblx0b3V0TWVtYmVyOiBzY2hlbWEuTWVtYmVyO1xufVxuIl19