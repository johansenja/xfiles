"use strict";
// This file is part of cxml, copyright (c) 2015-2016 BusFaster Ltd.
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
exports.MemberSpec = void 0;
var TypeSpec_1 = require("./TypeSpec");
var MemberBase_1 = require("./MemberBase");
var Item_1 = require("./Item");
/** Represents a child element or attribute. */
var MemberSpec = /** @class */ (function (_super) {
    __extends(MemberSpec, _super);
    function MemberSpec(spec, namespace) {
        var _this = this;
        var parts = TypeSpec_1.parseName(spec[0]);
        _this = _super.call(this, Item_1.ItemBase, parts.name) || this;
        _this.safeName = parts.safeName;
        _this.namespace = namespace;
        _this.item.parentNum = spec[3];
        var typeNumList = spec[1];
        var flags = spec[2];
        _this.isAbstract = !!(flags & MemberSpec.abstractFlag);
        _this.isSubstituted = !!(flags & MemberSpec.substitutedFlag);
        _this.isSubstituted = _this.isSubstituted || _this.isAbstract;
        if (_this.isSubstituted) {
            _this.containingTypeList = [];
        }
        if (typeNumList.length == 1) {
            _this.typeNum = typeNumList[0];
        }
        else {
            // TODO: What now? Make sure this is not reached.
            // Different types shouldn't be joined with | in .d.ts, instead
            // they should be converted to { TypeA: TypeA, TypeB: TypeB... }
            console.log(spec);
        }
        return _this;
    }
    MemberSpec.prototype.define = function () {
        // Look up member type if available.
        // Sometimes abstract elements have no type.
        if (this.typeNum) {
            this.typeSpec = this.namespace.typeByNum(this.typeNum);
            this.type = this.typeSpec.getType();
        }
        if (this.isSubstituted) {
            this.proxySpec = new TypeSpec_1.TypeSpec([0, 0, [], []], this.namespace, "");
            this.proxySpec.substituteList = [];
            if (!this.isAbstract)
                this.proxySpec.addSubstitute(this, this);
        }
        if (this.item.parent) {
            // Parent is actually the substitution group base element.
            this.item.parent.proxySpec.addSubstitute(this.item.parent, this);
        }
    };
    return MemberSpec;
}(MemberBase_1.MemberBase));
exports.MemberSpec = MemberSpec;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWVtYmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiTWVtYmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxvRUFBb0U7QUFDcEUsK0NBQStDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFJL0MsdUNBQWlEO0FBQ2pELDJDQUEwQztBQUUxQywrQkFBa0M7QUFLbEMsK0NBQStDO0FBRS9DO0lBQWdDLDhCQUkvQjtJQUNDLG9CQUFZLElBQW1CLEVBQUUsU0FBb0I7UUFBckQsaUJBNEJDO1FBM0JDLElBQUksS0FBSyxHQUFHLG9CQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFL0IsUUFBQSxrQkFBTSxlQUFlLEVBQUUsS0FBSyxDQUFDLElBQUksQ0FBQyxTQUFDO1FBQ25DLEtBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDLFFBQVEsQ0FBQztRQUUvQixLQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztRQUMzQixLQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDOUIsSUFBSSxXQUFXLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzFCLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUVwQixLQUFJLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxVQUFVLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDdEQsS0FBSSxDQUFDLGFBQWEsR0FBRyxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsVUFBVSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQzVELEtBQUksQ0FBQyxhQUFhLEdBQUcsS0FBSSxDQUFDLGFBQWEsSUFBSSxLQUFJLENBQUMsVUFBVSxDQUFDO1FBRTNELElBQUksS0FBSSxDQUFDLGFBQWEsRUFBRTtZQUN0QixLQUFJLENBQUMsa0JBQWtCLEdBQUcsRUFBRSxDQUFDO1NBQzlCO1FBRUQsSUFBSSxXQUFXLENBQUMsTUFBTSxJQUFJLENBQUMsRUFBRTtZQUMzQixLQUFJLENBQUMsT0FBTyxHQUFHLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUMvQjthQUFNO1lBQ0wsaURBQWlEO1lBQ2pELCtEQUErRDtZQUMvRCxnRUFBZ0U7WUFFaEUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUNuQjs7SUFDSCxDQUFDO0lBRUQsMkJBQU0sR0FBTjtRQUNFLG9DQUFvQztRQUNwQyw0Q0FBNEM7UUFFNUMsSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ2hCLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ3ZELElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsQ0FBQztTQUNyQztRQUVELElBQUksSUFBSSxDQUFDLGFBQWEsRUFBRTtZQUN0QixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksbUJBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxTQUFTLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDbEUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxjQUFjLEdBQUcsRUFBRSxDQUFDO1lBQ25DLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVTtnQkFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7U0FDaEU7UUFFRCxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ3BCLDBEQUEwRDtZQUMxRCxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO1NBQ2xFO0lBQ0gsQ0FBQztJQWlCSCxpQkFBQztBQUFELENBQUMsQUF2RUQsQ0FBZ0MsdUJBQVUsR0F1RXpDO0FBdkVZLGdDQUFVIiwic291cmNlc0NvbnRlbnQiOlsiLy8gVGhpcyBmaWxlIGlzIHBhcnQgb2YgY3htbCwgY29weXJpZ2h0IChjKSAyMDE1LTIwMTYgQnVzRmFzdGVyIEx0ZC5cbi8vIFJlbGVhc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSwgc2VlIExJQ0VOU0UuXG5cbmltcG9ydCB7IE5hbWVzcGFjZSB9IGZyb20gXCIuL05hbWVzcGFjZVwiO1xuaW1wb3J0IHsgVHlwZSB9IGZyb20gXCIuL1R5cGVcIjtcbmltcG9ydCB7IFR5cGVTcGVjLCBwYXJzZU5hbWUgfSBmcm9tIFwiLi9UeXBlU3BlY1wiO1xuaW1wb3J0IHsgTWVtYmVyQmFzZSB9IGZyb20gXCIuL01lbWJlckJhc2VcIjtcbmltcG9ydCB7IE1lbWJlclJlZiB9IGZyb20gXCIuL01lbWJlclJlZlwiO1xuaW1wb3J0IHsgSXRlbUJhc2UgfSBmcm9tIFwiLi9JdGVtXCI7XG5cbi8qKiBUdXBsZTogbmFtZSwgdHlwZSBJRCBsaXN0LCBmbGFncywgc3Vic3RpdHV0ZWQgbWVtYmVyIElEICovXG5leHBvcnQgdHlwZSBSYXdNZW1iZXJTcGVjID0gW3N0cmluZywgbnVtYmVyW10sIG51bWJlciwgbnVtYmVyXTtcblxuLyoqIFJlcHJlc2VudHMgYSBjaGlsZCBlbGVtZW50IG9yIGF0dHJpYnV0ZS4gKi9cblxuZXhwb3J0IGNsYXNzIE1lbWJlclNwZWMgZXh0ZW5kcyBNZW1iZXJCYXNlPFxuICBNZW1iZXJTcGVjLFxuICBOYW1lc3BhY2UsXG4gIEl0ZW1CYXNlPE1lbWJlclNwZWM+XG4+IHtcbiAgY29uc3RydWN0b3Ioc3BlYzogUmF3TWVtYmVyU3BlYywgbmFtZXNwYWNlOiBOYW1lc3BhY2UpIHtcbiAgICB2YXIgcGFydHMgPSBwYXJzZU5hbWUoc3BlY1swXSk7XG5cbiAgICBzdXBlcihJdGVtQmFzZSBhcyBhbnksIHBhcnRzLm5hbWUpO1xuICAgIHRoaXMuc2FmZU5hbWUgPSBwYXJ0cy5zYWZlTmFtZTtcblxuICAgIHRoaXMubmFtZXNwYWNlID0gbmFtZXNwYWNlO1xuICAgIHRoaXMuaXRlbS5wYXJlbnROdW0gPSBzcGVjWzNdO1xuICAgIHZhciB0eXBlTnVtTGlzdCA9IHNwZWNbMV07XG4gICAgdmFyIGZsYWdzID0gc3BlY1syXTtcblxuICAgIHRoaXMuaXNBYnN0cmFjdCA9ICEhKGZsYWdzICYgTWVtYmVyU3BlYy5hYnN0cmFjdEZsYWcpO1xuICAgIHRoaXMuaXNTdWJzdGl0dXRlZCA9ICEhKGZsYWdzICYgTWVtYmVyU3BlYy5zdWJzdGl0dXRlZEZsYWcpO1xuICAgIHRoaXMuaXNTdWJzdGl0dXRlZCA9IHRoaXMuaXNTdWJzdGl0dXRlZCB8fCB0aGlzLmlzQWJzdHJhY3Q7XG5cbiAgICBpZiAodGhpcy5pc1N1YnN0aXR1dGVkKSB7XG4gICAgICB0aGlzLmNvbnRhaW5pbmdUeXBlTGlzdCA9IFtdO1xuICAgIH1cblxuICAgIGlmICh0eXBlTnVtTGlzdC5sZW5ndGggPT0gMSkge1xuICAgICAgdGhpcy50eXBlTnVtID0gdHlwZU51bUxpc3RbMF07XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIFRPRE86IFdoYXQgbm93PyBNYWtlIHN1cmUgdGhpcyBpcyBub3QgcmVhY2hlZC5cbiAgICAgIC8vIERpZmZlcmVudCB0eXBlcyBzaG91bGRuJ3QgYmUgam9pbmVkIHdpdGggfCBpbiAuZC50cywgaW5zdGVhZFxuICAgICAgLy8gdGhleSBzaG91bGQgYmUgY29udmVydGVkIHRvIHsgVHlwZUE6IFR5cGVBLCBUeXBlQjogVHlwZUIuLi4gfVxuXG4gICAgICBjb25zb2xlLmxvZyhzcGVjKTtcbiAgICB9XG4gIH1cblxuICBkZWZpbmUoKSB7XG4gICAgLy8gTG9vayB1cCBtZW1iZXIgdHlwZSBpZiBhdmFpbGFibGUuXG4gICAgLy8gU29tZXRpbWVzIGFic3RyYWN0IGVsZW1lbnRzIGhhdmUgbm8gdHlwZS5cblxuICAgIGlmICh0aGlzLnR5cGVOdW0pIHtcbiAgICAgIHRoaXMudHlwZVNwZWMgPSB0aGlzLm5hbWVzcGFjZS50eXBlQnlOdW0odGhpcy50eXBlTnVtKTtcbiAgICAgIHRoaXMudHlwZSA9IHRoaXMudHlwZVNwZWMuZ2V0VHlwZSgpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmlzU3Vic3RpdHV0ZWQpIHtcbiAgICAgIHRoaXMucHJveHlTcGVjID0gbmV3IFR5cGVTcGVjKFswLCAwLCBbXSwgW11dLCB0aGlzLm5hbWVzcGFjZSwgXCJcIik7XG4gICAgICB0aGlzLnByb3h5U3BlYy5zdWJzdGl0dXRlTGlzdCA9IFtdO1xuICAgICAgaWYgKCF0aGlzLmlzQWJzdHJhY3QpIHRoaXMucHJveHlTcGVjLmFkZFN1YnN0aXR1dGUodGhpcywgdGhpcyk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuaXRlbS5wYXJlbnQpIHtcbiAgICAgIC8vIFBhcmVudCBpcyBhY3R1YWxseSB0aGUgc3Vic3RpdHV0aW9uIGdyb3VwIGJhc2UgZWxlbWVudC5cbiAgICAgIHRoaXMuaXRlbS5wYXJlbnQucHJveHlTcGVjLmFkZFN1YnN0aXR1dGUodGhpcy5pdGVtLnBhcmVudCwgdGhpcyk7XG4gICAgfVxuICB9XG5cbiAgdHlwZU51bTogbnVtYmVyO1xuICB0eXBlU3BlYzogVHlwZVNwZWM7XG4gIHR5cGU6IFR5cGU7XG5cbiAgLyoqIFN1YnN0aXR1dGlvbiBncm91cCB2aXJ0dWFsIHR5cGUsXG4gICAqIGNvbnRhaW5pbmcgYWxsIHBvc3NpYmxlIHN1YnN0aXR1dGVzIGFzIGNoaWxkcmVuLiAqL1xuICBwcm94eVNwZWM6IFR5cGVTcGVjO1xuXG4gIC8qKiBBbGwgdHlwZXMgY29udGFpbmluZyB0aGlzIG1lbWJlciwgdG8gYmUgbW9kaWZpZWQgaWYgbW9yZSBzdWJzdGl0dXRpb25zXG4gICAqIGZvciB0aGlzIG1lbWJlciBhcmUgZGVjbGFyZWQgbGF0ZXIuICovXG4gIGNvbnRhaW5pbmdUeXBlTGlzdDoge1xuICAgIHR5cGU6IFR5cGVTcGVjO1xuICAgIGhlYWQ6IE1lbWJlclJlZjtcbiAgICBwcm94eTogTWVtYmVyUmVmO1xuICB9W107XG59XG4iXX0=