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
exports.Group = exports.All = exports.Choice = exports.Sequence = exports.GenericChildList = exports.GroupBase = void 0;
var QName_1 = require("../QName");
var types = require("../types");
var GroupBase = /** @class */ (function (_super) {
    __extends(GroupBase, _super);
    function GroupBase() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.id = null;
        _this.minOccurs = '1';
        _this.maxOccurs = '1';
        return _this;
    }
    GroupBase.prototype.init = function (state) {
        this.min = +this.minOccurs;
        if (this.maxOccurs == 'unbounded')
            this.max = Infinity;
        else
            this.max = +this.maxOccurs;
    };
    return GroupBase;
}(types.Base));
exports.GroupBase = GroupBase;
var GenericChildList = /** @class */ (function (_super) {
    __extends(GenericChildList, _super);
    function GenericChildList() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GenericChildList.prototype.resolve = function (state) {
        this.scope.addAllToParent('element', this.min, this.max);
        this.scope.addAllToParent('group', this.min, this.max);
    };
    GenericChildList.mayContain = function () { return [
        types.Annotation,
        types.Element,
        Group,
        Sequence,
        Choice,
        types.Any
    ]; };
    return GenericChildList;
}(GroupBase));
exports.GenericChildList = GenericChildList;
// <xsd:sequence>
var Sequence = /** @class */ (function (_super) {
    __extends(Sequence, _super);
    function Sequence() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Sequence;
}(GenericChildList));
exports.Sequence = Sequence;
// <xsd:choice>
var Choice = /** @class */ (function (_super) {
    __extends(Choice, _super);
    function Choice() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Choice;
}(GenericChildList));
exports.Choice = Choice;
// <xsd:all>
var All = /** @class */ (function (_super) {
    __extends(All, _super);
    function All() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return All;
}(GenericChildList));
exports.All = All;
// <xsd:group>
var Group = /** @class */ (function (_super) {
    __extends(Group, _super);
    function Group() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.name = null;
        _this.ref = null;
        return _this;
    }
    Group.prototype.init = function (state) {
        _super.prototype.init.call(this, state);
        this.define(state, 'group', 0, 0);
    };
    Group.prototype.resolve = function (state) {
        var group = this;
        if (this.ref) {
            var ref = new QName_1.QName(this.ref, state.source);
            group = this.scope.lookup(ref, 'group');
        }
        // Named groups are only models for referencing elsewhere.
        if (!this.name) {
            if (group) {
                // if(group != this && !group.resolved) console.log('OH NOES! Group ' + group.name);
                // group.scope.addAllToParent('element', this.min, this.max, this.scope);
                group.define(state, 'group', this.min, this.max, this.scope);
            }
            else
                throw new types.MissingReferenceError('group', ref);
        }
    };
    Group.mayContain = function () { return [
        types.Annotation,
        Sequence,
        Choice
    ]; };
    return Group;
}(GroupBase));
exports.Group = Group;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR3JvdXAuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wYXJzZXJfc2NhZmZvbGRfZ2VuZXJhdG9yL3NyYy94c2QvdHlwZXMvR3JvdXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLG9FQUFvRTtBQUNwRSwrQ0FBK0M7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUcvQyxrQ0FBK0I7QUFFL0IsZ0NBQWtDO0FBRWxDO0lBQStCLDZCQUFVO0lBQXpDO1FBQUEscUVBYUM7UUFOQSxRQUFFLEdBQVcsSUFBSSxDQUFDO1FBQ2xCLGVBQVMsR0FBVyxHQUFHLENBQUM7UUFDeEIsZUFBUyxHQUFXLEdBQUcsQ0FBQzs7SUFJekIsQ0FBQztJQVpBLHdCQUFJLEdBQUosVUFBSyxLQUFZO1FBQ2hCLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDO1FBQzNCLElBQUcsSUFBSSxDQUFDLFNBQVMsSUFBSSxXQUFXO1lBQUUsSUFBSSxDQUFDLEdBQUcsR0FBRyxRQUFRLENBQUM7O1lBQ2pELElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQ2pDLENBQUM7SUFRRixnQkFBQztBQUFELENBQUMsQUFiRCxDQUErQixLQUFLLENBQUMsSUFBSSxHQWF4QztBQWJZLDhCQUFTO0FBZXRCO0lBQXNDLG9DQUFTO0lBQS9DOztJQWNBLENBQUM7SUFKQSxrQ0FBTyxHQUFQLFVBQVEsS0FBWTtRQUNuQixJQUFJLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDekQsSUFBSSxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3hELENBQUM7SUFaTSwyQkFBVSxHQUE0QixjQUFNLE9BQUE7UUFDbEQsS0FBSyxDQUFDLFVBQVU7UUFDaEIsS0FBSyxDQUFDLE9BQU87UUFDYixLQUFLO1FBQ0wsUUFBUTtRQUNSLE1BQU07UUFDTixLQUFLLENBQUMsR0FBRztLQUNULEVBUGtELENBT2xELENBQUM7SUFNSCx1QkFBQztDQUFBLEFBZEQsQ0FBc0MsU0FBUyxHQWM5QztBQWRZLDRDQUFnQjtBQWdCN0IsaUJBQWlCO0FBRWpCO0lBQThCLDRCQUFnQjtJQUE5Qzs7SUFDQSxDQUFDO0lBQUQsZUFBQztBQUFELENBQUMsQUFERCxDQUE4QixnQkFBZ0IsR0FDN0M7QUFEWSw0QkFBUTtBQUdyQixlQUFlO0FBRWY7SUFBNEIsMEJBQWdCO0lBQTVDOztJQUNBLENBQUM7SUFBRCxhQUFDO0FBQUQsQ0FBQyxBQURELENBQTRCLGdCQUFnQixHQUMzQztBQURZLHdCQUFNO0FBR25CLFlBQVk7QUFFWjtJQUF5Qix1QkFBZ0I7SUFBekM7O0lBQ0EsQ0FBQztJQUFELFVBQUM7QUFBRCxDQUFDLEFBREQsQ0FBeUIsZ0JBQWdCLEdBQ3hDO0FBRFksa0JBQUc7QUFHaEIsY0FBYztBQUVkO0lBQTJCLHlCQUFTO0lBQXBDO1FBQUEscUVBa0NDO1FBRkEsVUFBSSxHQUFXLElBQUksQ0FBQztRQUNwQixTQUFHLEdBQVcsSUFBSSxDQUFDOztJQUNwQixDQUFDO0lBM0JBLG9CQUFJLEdBQUosVUFBSyxLQUFZO1FBQ2hCLGlCQUFNLElBQUksWUFBQyxLQUFLLENBQUMsQ0FBQztRQUVsQixJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ25DLENBQUM7SUFFRCx1QkFBTyxHQUFQLFVBQVEsS0FBWTtRQUNuQixJQUFJLEtBQUssR0FBVSxJQUFJLENBQUM7UUFFeEIsSUFBRyxJQUFJLENBQUMsR0FBRyxFQUFFO1lBQ1osSUFBSSxHQUFHLEdBQUcsSUFBSSxhQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDNUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxPQUFPLENBQVUsQ0FBQztTQUNqRDtRQUVELDBEQUEwRDtRQUUxRCxJQUFHLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRTtZQUNkLElBQUcsS0FBSyxFQUFFO2dCQUNULG9GQUFvRjtnQkFDcEYseUVBQXlFO2dCQUN6RSxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUM3RDs7Z0JBQU0sTUFBTSxJQUFJLEtBQUssQ0FBQyxxQkFBcUIsQ0FBQyxPQUFPLEVBQUUsR0FBRyxDQUFDLENBQUM7U0FDM0Q7SUFDRixDQUFDO0lBN0JNLGdCQUFVLEdBQTRCLGNBQU0sT0FBQTtRQUNsRCxLQUFLLENBQUMsVUFBVTtRQUNoQixRQUFRO1FBQ1IsTUFBTTtLQUNOLEVBSmtELENBSWxELENBQUM7SUE2QkgsWUFBQztDQUFBLEFBbENELENBQTJCLFNBQVMsR0FrQ25DO0FBbENZLHNCQUFLIiwic291cmNlc0NvbnRlbnQiOlsiLy8gVGhpcyBmaWxlIGlzIHBhcnQgb2YgY3hzZCwgY29weXJpZ2h0IChjKSAyMDE1LTIwMTYgQnVzRmFzdGVyIEx0ZC5cbi8vIFJlbGVhc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSwgc2VlIExJQ0VOU0UuXG5cbmltcG9ydCB7U3RhdGV9IGZyb20gJy4uL1N0YXRlJztcbmltcG9ydCB7UU5hbWV9IGZyb20gJy4uL1FOYW1lJztcbmltcG9ydCB7RWxlbWVudExpa2V9IGZyb20gJy4vRWxlbWVudCc7XG5pbXBvcnQgKiBhcyB0eXBlcyBmcm9tICcuLi90eXBlcyc7XG5cbmV4cG9ydCBjbGFzcyBHcm91cEJhc2UgZXh0ZW5kcyB0eXBlcy5CYXNlIGltcGxlbWVudHMgRWxlbWVudExpa2Uge1xuXHRpbml0KHN0YXRlOiBTdGF0ZSkge1xuXHRcdHRoaXMubWluID0gK3RoaXMubWluT2NjdXJzO1xuXHRcdGlmKHRoaXMubWF4T2NjdXJzID09ICd1bmJvdW5kZWQnKSB0aGlzLm1heCA9IEluZmluaXR5O1xuXHRcdGVsc2UgdGhpcy5tYXggPSArdGhpcy5tYXhPY2N1cnM7XG5cdH1cblxuXHRpZDogc3RyaW5nID0gbnVsbDtcblx0bWluT2NjdXJzOiBzdHJpbmcgPSAnMSc7XG5cdG1heE9jY3Vyczogc3RyaW5nID0gJzEnO1xuXG5cdG1pbjogbnVtYmVyO1xuXHRtYXg6IG51bWJlcjtcbn1cblxuZXhwb3J0IGNsYXNzIEdlbmVyaWNDaGlsZExpc3QgZXh0ZW5kcyBHcm91cEJhc2Uge1xuXHRzdGF0aWMgbWF5Q29udGFpbjogKCkgPT4gdHlwZXMuQmFzZUNsYXNzW10gPSAoKSA9PiBbXG5cdFx0dHlwZXMuQW5ub3RhdGlvbixcblx0XHR0eXBlcy5FbGVtZW50LFxuXHRcdEdyb3VwLFxuXHRcdFNlcXVlbmNlLFxuXHRcdENob2ljZSxcblx0XHR0eXBlcy5Bbnlcblx0XTtcblxuXHRyZXNvbHZlKHN0YXRlOiBTdGF0ZSkge1xuXHRcdHRoaXMuc2NvcGUuYWRkQWxsVG9QYXJlbnQoJ2VsZW1lbnQnLCB0aGlzLm1pbiwgdGhpcy5tYXgpO1xuXHRcdHRoaXMuc2NvcGUuYWRkQWxsVG9QYXJlbnQoJ2dyb3VwJywgdGhpcy5taW4sIHRoaXMubWF4KTtcblx0fVxufVxuXG4vLyA8eHNkOnNlcXVlbmNlPlxuXG5leHBvcnQgY2xhc3MgU2VxdWVuY2UgZXh0ZW5kcyBHZW5lcmljQ2hpbGRMaXN0IHtcbn1cblxuLy8gPHhzZDpjaG9pY2U+XG5cbmV4cG9ydCBjbGFzcyBDaG9pY2UgZXh0ZW5kcyBHZW5lcmljQ2hpbGRMaXN0IHtcbn1cblxuLy8gPHhzZDphbGw+XG5cbmV4cG9ydCBjbGFzcyBBbGwgZXh0ZW5kcyBHZW5lcmljQ2hpbGRMaXN0IHtcbn1cblxuLy8gPHhzZDpncm91cD5cblxuZXhwb3J0IGNsYXNzIEdyb3VwIGV4dGVuZHMgR3JvdXBCYXNlIHtcblx0c3RhdGljIG1heUNvbnRhaW46ICgpID0+IHR5cGVzLkJhc2VDbGFzc1tdID0gKCkgPT4gW1xuXHRcdHR5cGVzLkFubm90YXRpb24sXG5cdFx0U2VxdWVuY2UsXG5cdFx0Q2hvaWNlXG5cdF07XG5cblx0aW5pdChzdGF0ZTogU3RhdGUpIHtcblx0XHRzdXBlci5pbml0KHN0YXRlKTtcblxuXHRcdHRoaXMuZGVmaW5lKHN0YXRlLCAnZ3JvdXAnLCAwLCAwKTtcblx0fVxuXG5cdHJlc29sdmUoc3RhdGU6IFN0YXRlKSB7XG5cdFx0dmFyIGdyb3VwOiBHcm91cCA9IHRoaXM7XG5cblx0XHRpZih0aGlzLnJlZikge1xuXHRcdFx0dmFyIHJlZiA9IG5ldyBRTmFtZSh0aGlzLnJlZiwgc3RhdGUuc291cmNlKTtcblx0XHRcdGdyb3VwID0gdGhpcy5zY29wZS5sb29rdXAocmVmLCAnZ3JvdXAnKSBhcyBHcm91cDtcblx0XHR9XG5cblx0XHQvLyBOYW1lZCBncm91cHMgYXJlIG9ubHkgbW9kZWxzIGZvciByZWZlcmVuY2luZyBlbHNld2hlcmUuXG5cblx0XHRpZighdGhpcy5uYW1lKSB7XG5cdFx0XHRpZihncm91cCkge1xuXHRcdFx0XHQvLyBpZihncm91cCAhPSB0aGlzICYmICFncm91cC5yZXNvbHZlZCkgY29uc29sZS5sb2coJ09IIE5PRVMhIEdyb3VwICcgKyBncm91cC5uYW1lKTtcblx0XHRcdFx0Ly8gZ3JvdXAuc2NvcGUuYWRkQWxsVG9QYXJlbnQoJ2VsZW1lbnQnLCB0aGlzLm1pbiwgdGhpcy5tYXgsIHRoaXMuc2NvcGUpO1xuXHRcdFx0XHRncm91cC5kZWZpbmUoc3RhdGUsICdncm91cCcsIHRoaXMubWluLCB0aGlzLm1heCwgdGhpcy5zY29wZSk7XG5cdFx0XHR9IGVsc2UgdGhyb3cgbmV3IHR5cGVzLk1pc3NpbmdSZWZlcmVuY2VFcnJvcignZ3JvdXAnLCByZWYpO1xuXHRcdH1cblx0fVxuXG5cdG5hbWU6IHN0cmluZyA9IG51bGw7XG5cdHJlZjogc3RyaW5nID0gbnVsbDtcbn1cbiJdfQ==