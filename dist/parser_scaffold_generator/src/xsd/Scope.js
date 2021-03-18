"use strict";
// This file is part of cxsd, copyright (c) 2015-2016 BusFaster Ltd.
// Released under the MIT license, see LICENSE.
Object.defineProperty(exports, "__esModule", { value: true });
exports.Scope = void 0;
function addMemberToTable(tbl, name, specNew, min, max) {
    if (min === void 0) { min = 1; }
    if (max === void 0) { max = 1; }
    var spec = tbl[name];
    if (spec) {
        spec.min += specNew.min * min;
        spec.max += specNew.max * max;
    }
    else {
        spec = {
            min: specNew.min * min,
            max: specNew.max * max,
            item: specNew.item
        };
        tbl[name] = spec;
    }
}
/** Scope handles looking up references by type and name, and binding member
  * types and elements to types or namespaces. */
var Scope = /** @class */ (function () {
    function Scope(parent, namespace) {
        this.visible = {};
        this.expose = {};
        if (!namespace && parent)
            namespace = parent.namespace;
        this.parent = parent;
        this.namespace = namespace;
    }
    Scope.prototype.add = function (name, kind, target, min, max) {
        if (name) {
            var visibleTbl = this.visible[kind];
            if (!visibleTbl) {
                visibleTbl = {};
                this.visible[kind] = visibleTbl;
            }
            visibleTbl[name] = target;
        }
        if (max) {
            var exposeList = this.expose[kind];
            if (!exposeList) {
                exposeList = [];
                this.expose[kind] = exposeList;
            }
            exposeList.push({
                name: name,
                min: min,
                max: max,
                item: target
            });
        }
    };
    Scope.prototype.addToParent = function (name, kind, target, min, max) {
        this.parent.add(name, kind, target, min, max);
    };
    Scope.prototype.addContentToParent = function (kind, target, min, max) {
        this.parent.add(null, kind, target, min, max);
    };
    Scope.prototype.addAllToParent = function (kind, min, max, target) {
        if (min === void 0) { min = 1; }
        if (max === void 0) { max = 1; }
        // Check if there's anything to add.
        if (!this.expose[kind])
            return;
        if (!target)
            target = this;
        target = target.parent;
        for (var _i = 0, _a = this.expose[kind]; _i < _a.length; _i++) {
            var spec = _a[_i];
            // TODO: If target is a choice, it must take the overall min and max.
            target.add(spec.name, kind, spec.item, spec.min * min, spec.max * max);
        }
    };
    Scope.prototype.addComments = function (commentList) {
        this.commentList = (this.commentList || []).concat(commentList);
    };
    Scope.prototype.addCommentsToGrandParent = function (commentList) {
        this.parent.parent.addComments(commentList);
    };
    Scope.prototype.getComments = function () {
        if (!this.commentList)
            return (null);
        // Convert line breaks.
        return (this.commentList.join('').replace(/\r\n?|\n/g, '\n'));
    };
    Scope.prototype.lookup = function (name, kind) {
        var scope = this;
        var nameFull = name.nameFull;
        var nameWild = '*:' + name.name;
        if (name.namespace && name.namespace != this.namespace) {
            scope = name.namespace.getScope();
        }
        var iter = 100;
        while (scope && --iter) {
            if (scope.visible[kind]) {
                var result = scope.visible[kind][nameFull] || scope.visible[kind][nameWild];
                if (result)
                    return (result);
            }
            scope = scope.parent;
        }
        try {
            throw (new Error('Missing ' + kind + ': ' + name.name));
        }
        catch (err) {
            console.log(err.stack);
        }
    };
    // Types
    Scope.prototype.setType = function (type) {
        // TODO: set to some invalid value if called more than once.
        if (!this.type && this.namespace.getScope() != this)
            this.type = type;
    };
    Scope.prototype.setParentType = function (type) {
        this.parent.setType(type);
    };
    Scope.prototype.getParentType = function (namespace) {
        for (var parent = this.parent; parent && parent.namespace == namespace; parent = parent.parent) {
            if (parent.type)
                return (parent.type);
        }
        return (null);
    };
    Scope.prototype.getType = function () { return (this.type); };
    Scope.prototype.dumpTypes = function (kind) {
        return (this.expose[kind]);
    };
    Scope.prototype.dumpMembers = function (kind, groupKind) {
        var itemList = this.expose[kind] || [];
        var groupList = this.expose[groupKind] || [];
        var output = {};
        for (var _i = 0, itemList_1 = itemList; _i < itemList_1.length; _i++) {
            var spec = itemList_1[_i];
            if (spec.name)
                addMemberToTable(output, spec.name, spec);
        }
        for (var _a = 0, groupList_1 = groupList; _a < groupList_1.length; _a++) {
            var group = groupList_1[_a];
            var min = group.min;
            var max = group.max;
            var attributeTbl = group.item.getScope().dumpMembers(kind, groupKind);
            for (var _b = 0, _c = Object.keys(attributeTbl); _b < _c.length; _b++) {
                var key = _c[_b];
                addMemberToTable(output, key, attributeTbl[key], min, max);
            }
        }
        return (output);
    };
    return Scope;
}());
exports.Scope = Scope;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2NvcGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wYXJzZXJfc2NhZmZvbGRfZ2VuZXJhdG9yL3NyYy94c2QvU2NvcGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLG9FQUFvRTtBQUNwRSwrQ0FBK0M7OztBQWdCL0MsU0FBUyxnQkFBZ0IsQ0FBQyxHQUFtQyxFQUFFLElBQVksRUFBRSxPQUFtQixFQUFFLEdBQU8sRUFBRSxHQUFPO0lBQWhCLG9CQUFBLEVBQUEsT0FBTztJQUFFLG9CQUFBLEVBQUEsT0FBTztJQUNqSCxJQUFJLElBQUksR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7SUFFckIsSUFBRyxJQUFJLEVBQUU7UUFDUixJQUFJLENBQUMsR0FBRyxJQUFJLE9BQU8sQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBQzlCLElBQUksQ0FBQyxHQUFHLElBQUksT0FBTyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7S0FDOUI7U0FBTTtRQUNOLElBQUksR0FBRztZQUNOLEdBQUcsRUFBRSxPQUFPLENBQUMsR0FBRyxHQUFHLEdBQUc7WUFDdEIsR0FBRyxFQUFFLE9BQU8sQ0FBQyxHQUFHLEdBQUcsR0FBRztZQUN0QixJQUFJLEVBQUUsT0FBTyxDQUFDLElBQUk7U0FDbEIsQ0FBQTtRQUVELEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUM7S0FDakI7QUFDRixDQUFDO0FBRUQ7aURBQ2lEO0FBRWpEO0lBQ0MsZUFBWSxNQUFhLEVBQUUsU0FBcUI7UUFzSnhDLFlBQU8sR0FBRyxFQUVqQixDQUFDO1FBRU0sV0FBTSxHQUVWLEVBQUUsQ0FBQztRQTNKTixJQUFHLENBQUMsU0FBUyxJQUFJLE1BQU07WUFBRSxTQUFTLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQztRQUV0RCxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUNyQixJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztJ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RUFBRSxDQUFDO1FBRWhELEtBQWdCLFVBQVEsRUFBUixxQkFBUSxFQUFSLHNCQUFRLEVBQVIsSUFBUSxFQUFFO1lBQXRCLElBQUksSUFBSSxpQkFBQTtZQUNYLElBQUcsSUFBSSxDQUFDLElBQUk7Z0JBQUUsZ0JBQWdCLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7U0FDeEQ7UUFFRCxLQUFpQixVQUFTLEVBQVQsdUJBQVMsRUFBVCx1QkFBUyxFQUFULElBQVMsRUFBRTtZQUF4QixJQUFJLEtBQUssa0JBQUE7WUFDWixJQUFJLEdBQUcsR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDO1lBQ3BCLElBQUksR0FBRyxHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUM7WUFFcEIsSUFBSSxZQUFZLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQyxDQUFDO1lBRXRFLEtBQWUsVUFBeUIsRUFBekIsS0FBQSxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUF6QixjQUF5QixFQUF6QixJQUF5QixFQUFFO2dCQUF0QyxJQUFJLEdBQUcsU0FBQTtnQkFDVixnQkFBZ0IsQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLFlBQVksQ0FBQyxHQUFHLENBQUMsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7YUFDM0Q7U0FDRDtRQUVELE9BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNoQixDQUFDO0lBa0JGLFlBQUM7QUFBRCxDQUFDLEFBcEtELElBb0tDO0FBcEtZLHNCQUFLIiwic291cmNlc0NvbnRlbnQiOlsiLy8gVGhpcyBmaWxlIGlzIHBhcnQgb2YgY3hzZCwgY29weXJpZ2h0IChjKSAyMDE1LTIwMTYgQnVzRmFzdGVyIEx0ZC5cbi8vIFJlbGVhc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSwgc2VlIExJQ0VOU0UuXG5cbmltcG9ydCAqIGFzIHR5cGVzIGZyb20gJy4vdHlwZXMnO1xuaW1wb3J0IHtOYW1lc3BhY2V9IGZyb20gJy4vTmFtZXNwYWNlJ1xuaW1wb3J0IHtRTmFtZX0gZnJvbSAnLi9RTmFtZSdcblxuZXhwb3J0IGludGVyZmFjZSBUeXBlTWVtYmVyIHtcblx0bWluOiBudW1iZXI7XG5cdG1heDogbnVtYmVyO1xuXHRpdGVtOiB0eXBlcy5CYXNlO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIE5hbWVkVHlwZU1lbWJlciBleHRlbmRzIFR5cGVNZW1iZXIge1xuXHRuYW1lOiBzdHJpbmc7XG59XG5cbmZ1bmN0aW9uIGFkZE1lbWJlclRvVGFibGUodGJsOiB7IFtuYW1lOiBzdHJpbmddOiBUeXBlTWVtYmVyIH0sIG5hbWU6IHN0cmluZywgc3BlY05ldzogVHlwZU1lbWJlciwgbWluID0gMSwgbWF4ID0gMSkge1xuXHR2YXIgc3BlYyA9IHRibFtuYW1lXTtcblxuXHRpZihzcGVjKSB7XG5cdFx0c3BlYy5taW4gKz0gc3BlY05ldy5taW4gKiBtaW47XG5cdFx0c3BlYy5tYXggKz0gc3BlY05ldy5tYXggKiBtYXg7XG5cdH0gZWxzZSB7XG5cdFx0c3BlYyA9IHtcblx0XHRcdG1pbjogc3BlY05ldy5taW4gKiBtaW4sXG5cdFx0XHRtYXg6IHNwZWNOZXcubWF4ICogbWF4LFxuXHRcdFx0aXRlbTogc3BlY05ldy5pdGVtXG5cdFx0fVxuXG5cdFx0dGJsW25hbWVdID0gc3BlYztcblx0fVxufVxuXG4vKiogU2NvcGUgaGFuZGxlcyBsb29raW5nIHVwIHJlZmVyZW5jZXMgYnkgdHlwZSBhbmQgbmFtZSwgYW5kIGJpbmRpbmcgbWVtYmVyXG4gICogdHlwZXMgYW5kIGVsZW1lbnRzIHRvIHR5cGVzIG9yIG5hbWVzcGFjZXMuICovXG5cbmV4cG9ydCBjbGFzcyBTY29wZSB7XG5cdGNvbnN0cnVjdG9yKHBhcmVudDogU2NvcGUsIG5hbWVzcGFjZT86IE5hbWVzcGFjZSkge1xuXHRcdGlmKCFuYW1lc3BhY2UgJiYgcGFyZW50KSBuYW1lc3BhY2UgPSBwYXJlbnQubmFtZXNwYWNlO1xuXG5cdFx0dGhpcy5wYXJlbnQgPSBwYXJlbnQ7XG5cdFx0dGhpcy5uYW1lc3BhY2UgPSBuYW1lc3BhY2U7XG5cdH1cblxuXHRhZGQobmFtZTogc3RyaW5nLCBraW5kOiBzdHJpbmcsIHRhcmdldDogdHlwZXMuQmFzZSwgbWluOiBudW1iZXIsIG1heDogbnVtYmVyKSB7XG5cdFx0aWYobmFtZSkge1xuXHRcdFx0dmFyIHZpc2libGVUYmwgPSB0aGlzLnZpc2libGVba2luZF07XG5cblx0XHRcdGlmKCF2aXNpYmxlVGJsKSB7XG5cdFx0XHRcdHZpc2libGVUYmwgPSB7fTtcblx0XHRcdFx0dGhpcy52aXNpYmxlW2tpbmRdID0gdmlzaWJsZVRibDtcblx0XHRcdH1cblxuXHRcdFx0dmlzaWJsZVRibFtuYW1lXSA9IHRhcmdldDtcblx0XHR9XG5cblx0XHRpZihtYXgpIHtcblx0XHRcdHZhciBleHBvc2VMaXN0ID0gdGhpcy5leHBvc2Vba2luZF07XG5cblx0XHRcdGlmKCFleHBvc2VMaXN0KSB7XG5cdFx0XHRcdGV4cG9zZUxpc3QgPSBbXTtcblx0XHRcdFx0dGhpcy5leHBvc2Vba2luZF0gPSBleHBvc2VMaXN0O1xuXHRcdFx0fVxuXG5cdFx0XHRleHBvc2VMaXN0LnB1c2goe1xuXHRcdFx0XHRuYW1lOiBuYW1lLFxuXHRcdFx0XHRtaW46IG1pbixcblx0XHRcdFx0bWF4OiBtYXgsXG5cdFx0XHRcdGl0ZW06IHRhcmdldFxuXHRcdFx0fSk7XG5cdFx0fVxuXHR9XG5cblx0YWRkVG9QYXJlbnQobmFtZTogc3RyaW5nLCBraW5kOiBzdHJpbmcsIHRhcmdldDogdHlwZXMuQmFzZSwgbWluOiBudW1iZXIsIG1heDogbnVtYmVyKSB7XG5cdFx0dGhpcy5wYXJlbnQuYWRkKG5hbWUsIGtpbmQsIHRhcmdldCwgbWluLCBtYXgpO1xuXHR9XG5cblx0YWRkQ29udGVudFRvUGFyZW50KGtpbmQ6IHN0cmluZywgdGFyZ2V0OiB0eXBlcy5CYXNlLCBtaW46IG51bWJlciwgbWF4OiBudW1iZXIpIHtcblx0XHR0aGlzLnBhcmVudC5hZGQobnVsbCwga2luZCwgdGFyZ2V0LCBtaW4sIG1heCk7XG5cdH1cblxuXHRhZGRBbGxUb1BhcmVudChraW5kOiBzdHJpbmcsIG1pbiA9IDEsIG1heCA9IDEsIHRhcmdldD86IFNjb3BlKSB7XG5cdFx0Ly8gQ2hlY2sgaWYgdGhlcmUncyBhbnl0aGluZyB0byBhZGQuXG5cdFx0aWYoIXRoaXMuZXhwb3NlW2tpbmRdKSByZXR1cm47XG5cdFx0aWYoIXRhcmdldCkgdGFyZ2V0ID0gdGhpcztcblx0XHR0YXJnZXQgPSB0YXJnZXQucGFyZW50O1xuXG5cdFx0Zm9yKHZhciBzcGVjIG9mIHRoaXMuZXhwb3NlW2tpbmRdKSB7XG5cdFx0XHQvLyBUT0RPOiBJZiB0YXJnZXQgaXMgYSBjaG9pY2UsIGl0IG11c3QgdGFrZSB0aGUgb3ZlcmFsbCBtaW4gYW5kIG1heC5cblx0XHRcdHRhcmdldC5hZGQoc3BlYy5uYW1lLCBraW5kLCBzcGVjLml0ZW0sIHNwZWMubWluICogbWluLCBzcGVjLm1heCAqIG1heCk7XG5cdFx0fVxuXHR9XG5cblx0YWRkQ29tbWVudHMoY29tbWVudExpc3Q6IHN0cmluZ1tdKSB7XG5cdFx0dGhpcy5jb21tZW50TGlzdCA9ICh0aGlzLmNvbW1lbnRMaXN0IHx8IFtdKS5jb25jYXQoY29tbWVudExpc3QpO1xuXHR9XG5cblx0YWRkQ29tbWVudHNUb0dyYW5kUGFyZW50KGNvbW1lbnRMaXN0OiBzdHJpbmdbXSkge1xuXHRcdHRoaXMucGFyZW50LnBhcmVudC5hZGRDb21tZW50cyhjb21tZW50TGlzdCk7XG5cdH1cblxuXHRnZXRDb21tZW50cygpIHtcblx0XHRpZighdGhpcy5jb21tZW50TGlzdCkgcmV0dXJuKG51bGwpO1xuXG5cdFx0Ly8gQ29udmVydCBsaW5lIGJyZWFrcy5cblx0XHRyZXR1cm4odGhpcy5jb21tZW50TGlzdC5qb2luKCcnKS5yZXBsYWNlKC9cXHJcXG4/fFxcbi9nLCAnXFxuJykpO1xuXHR9XG5cblx0bG9va3VwKG5hbWU6IFFOYW1lLCBraW5kOiBzdHJpbmcpOiB0eXBlcy5CYXNlIHtcblx0XHR2YXIgc2NvcGU6IFNjb3BlID0gdGhpcztcblx0XHR2YXIgbmFtZUZ1bGwgPSBuYW1lLm5hbWVGdWxsO1xuXHRcdHZhciBuYW1lV2lsZCA9ICcqOicgKyBuYW1lLm5hbWU7XG5cblx0XHRpZihuYW1lLm5hbWVzcGFjZSAmJiBuYW1lLm5hbWVzcGFjZSAhPSB0aGlzLm5hbWVzcGFjZSkge1xuXHRcdFx0c2NvcGUgPSBuYW1lLm5hbWVzcGFjZS5nZXRTY29wZSgpO1xuXHRcdH1cblxuXHRcdHZhciBpdGVyID0gMTAwO1xuXG5cdFx0d2hpbGUoc2NvcGUgJiYgLS1pdGVyKSB7XG5cdFx0XHRpZihzY29wZS52aXNpYmxlW2tpbmRdKSB7XG5cdFx0XHRcdHZhciByZXN1bHQgPSBzY29wZS52aXNpYmxlW2tpbmRdW25hbWVGdWxsXSB8fCBzY29wZS52aXNpYmxlW2tpbmRdW25hbWVXaWxkXTtcblxuXHRcdFx0XHRpZihyZXN1bHQpIHJldHVybihyZXN1bHQpO1xuXHRcdFx0fVxuXG5cdFx0XHRzY29wZSA9IHNjb3BlLnBhcmVudDtcblx0XHR9XG5cbnRyeSB7XG5cdFx0dGhyb3cobmV3IEVycm9yKCdNaXNzaW5nICcgKyBraW5kICsgJzogJyArIG5hbWUubmFtZSkpO1xufSBjYXRjaChlcnIpIHtcbmNvbnNvbGUubG9nKGVyci5zdGFjayk7XG59XG5cdH1cblxuXHQvLyBUeXBlc1xuXG5cdHNldFR5cGUodHlwZTogdHlwZXMuVHlwZUJhc2UpIHtcblx0XHQvLyBUT0RPOiBzZXQgdG8gc29tZSBpbnZhbGlkIHZhbHVlIGlmIGNhbGxlZCBtb3JlIHRoYW4gb25jZS5cblx0XHRpZighdGhpcy50eXBlICYmIHRoaXMubmFtZXNwYWNlLmdldFNjb3BlKCkgIT0gdGhpcykgdGhpcy50eXBlID0gdHlwZTtcblx0fVxuXG5cdHNldFBhcmVudFR5cGUodHlwZTogdHlwZXMuVHlwZUJhc2UpIHtcblx0XHR0aGlzLnBhcmVudC5zZXRUeXBlKHR5cGUpO1xuXHR9XG5cblx0Z2V0UGFyZW50VHlwZShuYW1lc3BhY2U6IE5hbWVzcGFjZSk6IHR5cGVzLlR5cGVCYXNlIHtcblx0XHRmb3IodmFyIHBhcmVudCA9IHRoaXMucGFyZW50OyBwYXJlbnQgJiYgcGFyZW50Lm5hbWVzcGFjZSA9PSBuYW1lc3BhY2U7IHBhcmVudCA9IHBhcmVudC5wYXJlbnQpIHtcblx0XHRcdGlmKHBhcmVudC50eXBlKSByZXR1cm4ocGFyZW50LnR5cGUpO1xuXHRcdH1cblxuXHRcdHJldHVybihudWxsKTtcblx0fVxuXG5cdGdldFR5cGUoKTogdHlwZXMuVHlwZUJhc2UgeyByZXR1cm4odGhpcy50eXBlKTsgfVxuXG5cdGR1bXBUeXBlcyhraW5kOiBzdHJpbmcpIHtcblx0XHRyZXR1cm4odGhpcy5leHBvc2Vba2luZF0pO1xuXHR9XG5cblx0ZHVtcE1lbWJlcnMoa2luZDogc3RyaW5nLCBncm91cEtpbmQ6IHN0cmluZykge1xuXHRcdHZhciBpdGVtTGlzdCA9IHRoaXMuZXhwb3NlW2tpbmRdIHx8IFtdO1xuXHRcdHZhciBncm91cExpc3QgPSB0aGlzLmV4cG9zZVtncm91cEtpbmRdIHx8IFtdO1xuXHRcdHZhciBvdXRwdXQ6IHsgW25hbWU6IHN0cmluZ106IFR5cGVNZW1iZXIgfSA9IHt9O1xuXG5cdFx0Zm9yKHZhciBzcGVjIG9mIGl0ZW1MaXN0KSB7XG5cdFx0XHRpZihzcGVjLm5hbWUpIGFkZE1lbWJlclRvVGFibGUob3V0cHV0LCBzcGVjLm5hbWUsIHNwZWMpO1xuXHRcdH1cblxuXHRcdGZvcih2YXIgZ3JvdXAgb2YgZ3JvdXBMaXN0KSB7XG5cdFx0XHR2YXIgbWluID0gZ3JvdXAubWluO1xuXHRcdFx0dmFyIG1heCA9IGdyb3VwLm1heDtcblxuXHRcdFx0dmFyIGF0dHJpYnV0ZVRibCA9IGdyb3VwLml0ZW0uZ2V0U2NvcGUoKS5kdW1wTWVtYmVycyhraW5kLCBncm91cEtpbmQpO1xuXG5cdFx0XHRmb3IodmFyIGtleSBvZiBPYmplY3Qua2V5cyhhdHRyaWJ1dGVUYmwpKSB7XG5cdFx0XHRcdGFkZE1lbWJlclRvVGFibGUob3V0cHV0LCBrZXksIGF0dHJpYnV0ZVRibFtrZXldLCBtaW4sIG1heCk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuKG91dHB1dCk7XG5cdH1cblxuXHRwcml2YXRlIHBhcmVudDogU2NvcGU7XG5cdG5hbWVzcGFjZTogTmFtZXNwYWNlO1xuXG5cdHByaXZhdGUgdmlzaWJsZSA9IHt9IGFzIHtcblx0XHRba2luZDogc3RyaW5nXTogeyBbbmFtZTogc3RyaW5nXTogdHlwZXMuQmFzZSB9XG5cdH07XG5cblx0cHJpdmF0ZSBleHBvc2U6IHtcblx0XHRba2luZDogc3RyaW5nXTogTmFtZWRUeXBlTWVtYmVyW107XG5cdH0gPSB7fTtcblxuXHRwcml2YXRlIHR5cGU6IHR5cGVzLlR5cGVCYXNlO1xuXG5cdHByaXZhdGUgY29tbWVudExpc3Q6IHN0cmluZ1tdO1xuXG5cdHByaXZhdGUgc3RhdGljIHByaW1pdGl2ZVNjb3BlOiBTY29wZTtcbn1cbiJdfQ==