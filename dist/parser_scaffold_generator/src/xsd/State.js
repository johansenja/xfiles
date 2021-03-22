"use strict";
// This file is part of cxsd, copyright (c) 2015-2016 BusFaster Ltd.
// Released under the MIT license, see LICENSE.
Object.defineProperty(exports, "__esModule", { value: true });
exports.State = void 0;
var Scope_1 = require("./Scope");
/** Parser state, passed around between functions. */
var State = /** @class */ (function () {
    function State(parent, rule, source) {
        if (parent) {
            this.stateStatic = parent.stateStatic;
            this.parent = parent;
            this.source = parent.source;
            this.scope = new Scope_1.Scope(parent.scope);
        }
        else {
            this.source = source;
            this.scope = new Scope_1.Scope(null);
        }
        this.rule = rule;
    }
    State.prototype.getScope = function () {
        return this.scope;
    };
    State.prototype.setScope = function (scope) {
        this.scope = scope;
    };
    /** Begin capturing text content between tags, sent to the handler of the innermost tag. */
    State.prototype.startText = function (xsdElement) {
        this.stateStatic.textHandlerList[this.stateStatic.textDepth++] = xsdElement;
    };
    /** Finish capturing text content. */
    State.prototype.endText = function () {
        --this.stateStatic.textDepth;
    };
    return State;
}());
exports.State = State;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3RhdGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wYXJzZXJfc2NhZmZvbGRfZ2VuZXJhdG9yL3NyYy94c2QvU3RhdGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLG9FQUFvRTtBQUNwRSwrQ0FBK0M7OztBQVMvQyxpQ0FBZ0M7QUFHaEMscURBQXFEO0FBRXJEO0lBQ0UsZUFBWSxNQUFhLEVBQUUsSUFBVSxFQUFFLE1BQWU7UUFDcEQsSUFBSSxNQUFNLEVBQUU7WUFDVixJQUFJLENBQUMsV0FBVyxHQUFHLE1BQU0sQ0FBQyxXQUFXLENBQUM7WUFDdEMsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7WUFDckIsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDO1lBQzVCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxhQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ3RDO2FBQU07WUFDTCxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztZQUNyQixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksYUFBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQzlCO1FBRUQsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7SUFDbkIsQ0FBQztJQUVELHdCQUFRLEdBQVI7UUFDRSxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUM7SUFDcEIsQ0FBQztJQUNELHdCQUFRLEdBQVIsVUFBUyxLQUFZO1FBQ25CLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO0lBQ3JCLENBQUM7SUFFRCwyRkFBMkY7SUFDM0YseUJBQVMsR0FBVCxVQUFVLFVBQXNCO1FBQzlCLElBQUksQ0FBQyxXQUFXLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxFQUFFLENBQUMsR0FBRyxVQUFVLENBQUM7SUFDOUUsQ0FBQztJQUVELHFDQUFxQztJQUNyQyx1QkFBTyxHQUFQO1FBQ0UsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQztJQUMvQixDQUFDO0lBb0JILFlBQUM7QUFBRCxDQUFDLEFBbERELElBa0RDO0FBbERZLHNCQUFLIiwic291cmNlc0NvbnRlbnQiOlsiLy8gVGhpcyBmaWxlIGlzIHBhcnQgb2YgY3hzZCwgY29weXJpZ2h0IChjKSAyMDE1LTIwMTYgQnVzRmFzdGVyIEx0ZC5cbi8vIFJlbGVhc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSwgc2VlIExJQ0VOU0UuXG5cbmltcG9ydCAqIGFzIHR5cGVzIGZyb20gXCIuL3R5cGVzXCI7XG5pbXBvcnQgKiBhcyBzYXggZnJvbSBcInNheFwiO1xuXG5pbXBvcnQgeyBSdWxlIH0gZnJvbSBcIi4vUnVsZVwiO1xuaW1wb3J0IHsgQ29udGV4dCB9IGZyb20gXCIuL0NvbnRleHRcIjtcbmltcG9ydCB7IE5hbWVzcGFjZSB9IGZyb20gXCIuL05hbWVzcGFjZVwiO1xuaW1wb3J0IHsgU291cmNlIH0gZnJvbSBcIi4vU291cmNlXCI7XG5pbXBvcnQgeyBTY29wZSB9IGZyb20gXCIuL1Njb3BlXCI7XG5pbXBvcnQgeyBRTmFtZSB9IGZyb20gXCIuL1FOYW1lXCI7XG5cbi8qKiBQYXJzZXIgc3RhdGUsIHBhc3NlZCBhcm91bmQgYmV0d2VlbiBmdW5jdGlvbnMuICovXG5cbmV4cG9ydCBjbGFzcyBTdGF0ZSB7XG4gIGNvbnN0cnVjdG9yKHBhcmVudDogU3RhdGUsIHJ1bGU6IFJ1bGUsIHNvdXJjZT86IFNvdXJjZSkge1xuICAgIGlmIChwYXJlbnQpIHtcbiAgICAgIHRoaXMuc3RhdGVTdGF0aWMgPSBwYXJlbnQuc3RhdGVTdGF0aWM7XG4gICAgICB0aGlzLnBhcmVudCA9IHBhcmVudDtcbiAgICAgIHRoaXMuc291cmNlID0gcGFyZW50LnNvdXJjZTtcbiAgICAgIHRoaXMuc2NvcGUgPSBuZXcgU2NvcGUocGFyZW50LnNjb3BlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zb3VyY2UgPSBzb3VyY2U7XG4gICAgICB0aGlzLnNjb3BlID0gbmV3IFNjb3BlKG51bGwpO1xuICAgIH1cblxuICAgIHRoaXMucnVsZSA9IHJ1bGU7XG4gIH1cblxuICBnZXRTY29wZSgpIHtcbiAgICByZXR1cm4gdGhpcy5zY29wZTtcbiAgfVxuICBzZXRTY29wZShzY29wZTogU2NvcGUpIHtcbiAgICB0aGlzLnNjb3BlID0gc2NvcGU7XG4gIH1cblxuICAvKiogQmVnaW4gY2FwdHVyaW5nIHRleHQgY29udGVudCBiZXR3ZWVuIHRhZ3MsIHNlbnQgdG8gdGhlIGhhbmRsZXIgb2YgdGhlIGlubmVybW9zdCB0YWcuICovXG4gIHN0YXJ0VGV4dCh4c2RFbGVtZW50OiB0eXBlcy5CYXNlKSB7XG4gICAgdGhpcy5zdGF0ZVN0YXRpYy50ZXh0SGFuZGxlckxpc3RbdGhpcy5zdGF0ZVN0YXRpYy50ZXh0RGVwdGgrK10gPSB4c2RFbGVtZW50O1xuICB9XG5cbiAgLyoqIEZpbmlzaCBjYXB0dXJpbmcgdGV4dCBjb250ZW50LiAqL1xuICBlbmRUZXh0KCkge1xuICAgIC0tdGhpcy5zdGF0ZVN0YXRpYy50ZXh0RGVwdGg7XG4gIH1cblxuICBwYXJlbnQ6IFN0YXRlO1xuICBydWxlOiBSdWxlO1xuICBzb3VyY2U6IFNvdXJjZTtcbiAgcHJpdmF0ZSBzY29wZTogU2NvcGU7XG5cbiAgYXR0cmlidXRlVGJsOiBzYXguVGFnW1wiYXR0cmlidXRlc1wiXSB8IHNheC5RdWFsaWZpZWRUYWdbXCJhdHRyaWJ1dGVzXCJdO1xuICB4c2RFbGVtZW50OiB0eXBlcy5CYXNlO1xuICBkZXB0aDogbnVtYmVyO1xuICBpbmRleDogbnVtYmVyO1xuXG4gIHN0YXRlU3RhdGljOiB7XG4gICAgY29udGV4dDogQ29udGV4dDtcbiAgICBhZGRJbXBvcnQ6IChuYW1lc3BhY2VUYXJnZXQ6IE5hbWVzcGFjZSwgdXJsUmVtb3RlOiBzdHJpbmcpID0+IHZvaWQ7XG4gICAgZ2V0TGluZU51bWJlcjogKCkgPT4gbnVtYmVyO1xuICAgIGdldEJ5dGVQb3M6ICgpID0+IG51bWJlcjtcbiAgICB0ZXh0SGFuZGxlckxpc3Q6IHR5cGVzLkJhc2VbXTtcbiAgICB0ZXh0RGVwdGg6IG51bWJlcjtcbiAgfTtcbn1cbiJdfQ==