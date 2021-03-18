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
    State.prototype.getScope = function () { return (this.scope); };
    State.prototype.setScope = function (scope) { this.scope = scope; };
    /** Begin capturing text content between tags, sent to the handler of the innermost tag. */
    State.prototype.startText = function (xsdElement) {
        this.stateStatic.textHandlerList[this.stateStatic.textDepth++] = xsdElement;
    };
    /** Finish capturing text content. */
    State.prototype.endText = function () { --this.stateStatic.textDepth; };
    return State;
}());
exports.State = State;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3RhdGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wYXJzZXJfc2NhZmZvbGRfZ2VuZXJhdG9yL3NyYy94c2QvU3RhdGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLG9FQUFvRTtBQUNwRSwrQ0FBK0M7OztBQVEvQyxpQ0FBOEI7QUFHOUIscURBQXFEO0FBRXJEO0lBQ0MsZUFBWSxNQUFhLEVBQUUsSUFBVSxFQUFFLE1BQWU7UUFDckQsSUFBRyxNQUFNLEVBQUU7WUFDVixJQUFJLENBQUMsV0FBVyxHQUFHLE1BQU0sQ0FBQyxXQUFXLENBQUM7WUFDdEMsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7WUFDckIsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDO1lBQzVCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxhQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ3JDO2FBQU07WUFDTixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztZQUNyQixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksYUFBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQzdCO1FBRUQsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7SUFDbEIsQ0FBQztJQUVELHdCQUFRLEdBQVIsY0FBYSxPQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNsQyx3QkFBUSxHQUFSLFVBQVMsS0FBWSxJQUFJLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQztJQUU5QywyRkFBMkY7SUFDM0YseUJBQVMsR0FBVCxVQUFVLFVBQXNCO1FBQy9CLElBQUksQ0FBQyxXQUFXLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxFQUFFLENBQUMsR0FBRyxVQUFVLENBQUM7SUFDN0UsQ0FBQztJQUVELHFDQUFxQztJQUNyQyx1QkFBTyxHQUFQLGNBQVksRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7SUFvQjVDLFlBQUM7QUFBRCxDQUFDLEFBNUNELElBNENDO0FBNUNZLHNCQUFLIiwic291cmNlc0NvbnRlbnQiOlsiLy8gVGhpcyBmaWxlIGlzIHBhcnQgb2YgY3hzZCwgY29weXJpZ2h0IChjKSAyMDE1LTIwMTYgQnVzRmFzdGVyIEx0ZC5cbi8vIFJlbGVhc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSwgc2VlIExJQ0VOU0UuXG5cbmltcG9ydCAqIGFzIHR5cGVzIGZyb20gJy4vdHlwZXMnO1xuXG5pbXBvcnQge1J1bGV9IGZyb20gJy4vUnVsZSc7XG5pbXBvcnQge0NvbnRleHR9IGZyb20gJy4vQ29udGV4dCc7XG5pbXBvcnQge05hbWVzcGFjZX0gZnJvbSAnLi9OYW1lc3BhY2UnO1xuaW1wb3J0IHtTb3VyY2V9IGZyb20gJy4vU291cmNlJztcbmltcG9ydCB7U2NvcGV9IGZyb20gJy4vU2NvcGUnO1xuaW1wb3J0IHtRTmFtZX0gZnJvbSAnLi9RTmFtZSc7XG5cbi8qKiBQYXJzZXIgc3RhdGUsIHBhc3NlZCBhcm91bmQgYmV0d2VlbiBmdW5jdGlvbnMuICovXG5cbmV4cG9ydCBjbGFzcyBTdGF0ZSB7XG5cdGNvbnN0cnVjdG9yKHBhcmVudDogU3RhdGUsIHJ1bGU6IFJ1bGUsIHNvdXJjZT86IFNvdXJjZSkge1xuXHRcdGlmKHBhcmVudCkge1xuXHRcdFx0dGhpcy5zdGF0ZVN0YXRpYyA9IHBhcmVudC5zdGF0ZVN0YXRpYztcblx0XHRcdHRoaXMucGFyZW50ID0gcGFyZW50O1xuXHRcdFx0dGhpcy5zb3VyY2UgPSBwYXJlbnQuc291cmNlO1xuXHRcdFx0dGhpcy5zY29wZSA9IG5ldyBTY29wZShwYXJlbnQuc2NvcGUpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aGlzLnNvdXJjZSA9IHNvdXJjZTtcblx0XHRcdHRoaXMuc2NvcGUgPSBuZXcgU2NvcGUobnVsbCk7XG5cdFx0fVxuXG5cdFx0dGhpcy5ydWxlID0gcnVsZTtcblx0fVxuXG5cdGdldFNjb3BlKCkgeyByZXR1cm4odGhpcy5zY29wZSk7IH1cblx0c2V0U2NvcGUoc2NvcGU6IFNjb3BlKSB7IHRoaXMuc2NvcGUgPSBzY29wZTsgfVxuXG5cdC8qKiBCZWdpbiBjYXB0dXJpbmcgdGV4dCBjb250ZW50IGJldHdlZW4gdGFncywgc2VudCB0byB0aGUgaGFuZGxlciBvZiB0aGUgaW5uZXJtb3N0IHRhZy4gKi9cblx0c3RhcnRUZXh0KHhzZEVsZW1lbnQ6IHR5cGVzLkJhc2UpIHtcblx0XHR0aGlzLnN0YXRlU3RhdGljLnRleHRIYW5kbGVyTGlzdFt0aGlzLnN0YXRlU3RhdGljLnRleHREZXB0aCsrXSA9IHhzZEVsZW1lbnQ7XG5cdH1cblxuXHQvKiogRmluaXNoIGNhcHR1cmluZyB0ZXh0IGNvbnRlbnQuICovXG5cdGVuZFRleHQoKSB7IC0tdGhpcy5zdGF0ZVN0YXRpYy50ZXh0RGVwdGg7IH1cblxuXHRwYXJlbnQ6IFN0YXRlO1xuXHRydWxlOiBSdWxlO1xuXHRzb3VyY2U6IFNvdXJjZTtcblx0cHJpdmF0ZSBzY29wZTogU2NvcGU7XG5cblx0YXR0cmlidXRlVGJsOiB7W25hbWU6IHN0cmluZ106IHN0cmluZ307XG5cdHhzZEVsZW1lbnQ6IHR5cGVzLkJhc2U7XG5cdGRlcHRoOiBudW1iZXI7XG5cdGluZGV4OiBudW1iZXI7XG5cblx0c3RhdGVTdGF0aWM6IHtcblx0XHRjb250ZXh0OiBDb250ZXh0O1xuXHRcdGFkZEltcG9ydDogKG5hbWVzcGFjZVRhcmdldDogTmFtZXNwYWNlLCB1cmxSZW1vdGU6IHN0cmluZykgPT4gdm9pZDtcblx0XHRnZXRMaW5lTnVtYmVyOiAoKSA9PiBudW1iZXI7XG5cdFx0Z2V0Qnl0ZVBvczogKCkgPT4gbnVtYmVyO1xuXHRcdHRleHRIYW5kbGVyTGlzdDogdHlwZXMuQmFzZVtdO1xuXHRcdHRleHREZXB0aDogbnVtYmVyO1xuXHR9O1xufVxuIl19