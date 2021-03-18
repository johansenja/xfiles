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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWVtYmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcnVudGltZV9wYXJzZXIvc3JjL3htbC9NZW1iZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLG9FQUFvRTtBQUNwRSwrQ0FBK0M7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUkvQyx1Q0FBaUQ7QUFDakQsMkNBQTBDO0FBRTFDLCtCQUFrQztBQUtsQywrQ0FBK0M7QUFFL0M7SUFBZ0MsOEJBSS9CO0lBQ0Msb0JBQVksSUFBbUIsRUFBRSxTQUFvQjtRQUFyRCxpQkE0QkM7UUEzQkMsSUFBSSxLQUFLLEdBQUcsb0JBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUUvQixRQUFBLGtCQUFNLGVBQWUsRUFBRSxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQUM7UUFDbkMsS0FBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUMsUUFBUSxDQUFDO1FBRS9CLEtBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO1FBQzNCLEtBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM5QixJQUFJLFdBQVcsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDMUIsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRXBCLEtBQUksQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLFVBQVUsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUN0RCxLQUFJLENBQUMsYUFBYSxHQUFHLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxVQUFVLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDNUQsS0FBSSxDQUFDLGFBQWEsR0FBRyxLQUFJLENBQUMsYUFBYSxJQUFJLEtBQUksQ0FBQyxVQUFVLENBQUM7UUFFM0QsSUFBSSxLQUFJLENBQUMsYUFBYSxFQUFFO1lBQ3RCLEtBQUksQ0FBQyxrQkFBa0IsR0FBRyxFQUFFLENBQUM7U0FDOUI7UUFFRCxJQUFJLFdBQVcsQ0FBQyxNQUFNLElBQUksQ0FBQyxFQUFFO1lBQzNCLEtBQUksQ0FBQyxPQUFPLEdBQUcsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQy9CO2FBQU07WUFDTCxpREFBaUQ7WUFDakQsK0RBQStEO1lBQy9ELGdFQUFnRTtZQUVoRSxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ25COztJQUNILENBQUM7SUFFRCwyQkFBTSxHQUFOO1FBQ0Usb0NBQW9DO1FBQ3BDLDRDQUE0QztRQUU1QyxJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDaEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDdkQsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRSxDQUFDO1NBQ3JDO1FBRUQsSUFBSSxJQUFJLENBQUMsYUFBYSxFQUFFO1lBQ3RCLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxtQkFBUSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLFNBQVMsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUNsRSxJQUFJLENBQUMsU0FBUyxDQUFDLGNBQWMsR0FBRyxFQUFFLENBQUM7WUFDbkMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVO2dCQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztTQUNoRTtRQUVELElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDcEIsMERBQTBEO1lBQzFELElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUM7U0FDbEU7SUFDSCxDQUFDO0lBaUJILGlCQUFDO0FBQUQsQ0FBQyxBQXZFRCxDQUFnQyx1QkFBVSxHQXVFekM7QUF2RVksZ0NBQVUiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBUaGlzIGZpbGUgaXMgcGFydCBvZiBjeG1sLCBjb3B5cmlnaHQgKGMpIDIwMTUtMjAxNiBCdXNGYXN0ZXIgTHRkLlxuLy8gUmVsZWFzZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlLCBzZWUgTElDRU5TRS5cblxuaW1wb3J0IHsgTmFtZXNwYWNlIH0gZnJvbSBcIi4vTmFtZXNwYWNlXCI7XG5pbXBvcnQgeyBUeXBlIH0gZnJvbSBcIi4vVHlwZVwiO1xuaW1wb3J0IHsgVHlwZVNwZWMsIHBhcnNlTmFtZSB9IGZyb20gXCIuL1R5cGVTcGVjXCI7XG5pbXBvcnQgeyBNZW1iZXJCYXNlIH0gZnJvbSBcIi4vTWVtYmVyQmFzZVwiO1xuaW1wb3J0IHsgTWVtYmVyUmVmIH0gZnJvbSBcIi4vTWVtYmVyUmVmXCI7XG5pbXBvcnQgeyBJdGVtQmFzZSB9IGZyb20gXCIuL0l0ZW1cIjtcblxuLyoqIFR1cGxlOiBuYW1lLCB0eXBlIElEIGxpc3QsIGZsYWdzLCBzdWJzdGl0dXRlZCBtZW1iZXIgSUQgKi9cbmV4cG9ydCB0eXBlIFJhd01lbWJlclNwZWMgPSBbc3RyaW5nLCBudW1iZXJbXSwgbnVtYmVyLCBudW1iZXJdO1xuXG4vKiogUmVwcmVzZW50cyBhIGNoaWxkIGVsZW1lbnQgb3IgYXR0cmlidXRlLiAqL1xuXG5leHBvcnQgY2xhc3MgTWVtYmVyU3BlYyBleHRlbmRzIE1lbWJlckJhc2U8XG4gIE1lbWJlclNwZWMsXG4gIE5hbWVzcGFjZSxcbiAgSXRlbUJhc2U8TWVtYmVyU3BlYz5cbj4ge1xuICBjb25zdHJ1Y3RvcihzcGVjOiBSYXdNZW1iZXJTcGVjLCBuYW1lc3BhY2U6IE5hbWVzcGFjZSkge1xuICAgIHZhciBwYXJ0cyA9IHBhcnNlTmFtZShzcGVjWzBdKTtcblxuICAgIHN1cGVyKEl0ZW1CYXNlIGFzIGFueSwgcGFydHMubmFtZSk7XG4gICAgdGhpcy5zYWZlTmFtZSA9IHBhcnRzLnNhZmVOYW1lO1xuXG4gICAgdGhpcy5uYW1lc3BhY2UgPSBuYW1lc3BhY2U7XG4gICAgdGhpcy5pdGVtLnBhcmVudE51bSA9IHNwZWNbM107XG4gICAgdmFyIHR5cGVOdW1MaXN0ID0gc3BlY1sxXTtcbiAgICB2YXIgZmxhZ3MgPSBzcGVjWzJdO1xuXG4gICAgdGhpcy5pc0Fic3RyYWN0ID0gISEoZmxhZ3MgJiBNZW1iZXJTcGVjLmFic3RyYWN0RmxhZyk7XG4gICAgdGhpcy5pc1N1YnN0aXR1dGVkID0gISEoZmxhZ3MgJiBNZW1iZXJTcGVjLnN1YnN0aXR1dGVkRmxhZyk7XG4gICAgdGhpcy5pc1N1YnN0aXR1dGVkID0gdGhpcy5pc1N1YnN0aXR1dGVkIHx8IHRoaXMuaXNBYnN0cmFjdDtcblxuICAgIGlmICh0aGlzLmlzU3Vic3RpdHV0ZWQpIHtcbiAgICAgIHRoaXMuY29udGFpbmluZ1R5cGVMaXN0ID0gW107XG4gICAgfVxuXG4gICAgaWYgKHR5cGVOdW1MaXN0Lmxlbmd0aCA9PSAxKSB7XG4gICAgICB0aGlzLnR5cGVOdW0gPSB0eXBlTnVtTGlzdFswXTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gVE9ETzogV2hhdCBub3c/IE1ha2Ugc3VyZSB0aGlzIGlzIG5vdCByZWFjaGVkLlxuICAgICAgLy8gRGlmZmVyZW50IHR5cGVzIHNob3VsZG4ndCBiZSBqb2luZWQgd2l0aCB8IGluIC5kLnRzLCBpbnN0ZWFkXG4gICAgICAvLyB0aGV5IHNob3VsZCBiZSBjb252ZXJ0ZWQgdG8geyBUeXBlQTogVHlwZUEsIFR5cGVCOiBUeXBlQi4uLiB9XG5cbiAgICAgIGNvbnNvbGUubG9nKHNwZWMpO1xuICAgIH1cbiAgfVxuXG4gIGRlZmluZSgpIHtcbiAgICAvLyBMb29rIHVwIG1lbWJlciB0eXBlIGlmIGF2YWlsYWJsZS5cbiAgICAvLyBTb21ldGltZXMgYWJzdHJhY3QgZWxlbWVudHMgaGF2ZSBubyB0eXBlLlxuXG4gICAgaWYgKHRoaXMudHlwZU51bSkge1xuICAgICAgdGhpcy50eXBlU3BlYyA9IHRoaXMubmFtZXNwYWNlLnR5cGVCeU51bSh0aGlzLnR5cGVOdW0pO1xuICAgICAgdGhpcy50eXBlID0gdGhpcy50eXBlU3BlYy5nZXRUeXBlKCk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuaXNTdWJzdGl0dXRlZCkge1xuICAgICAgdGhpcy5wcm94eVNwZWMgPSBuZXcgVHlwZVNwZWMoWzAsIDAsIFtdLCBbXV0sIHRoaXMubmFtZXNwYWNlLCBcIlwiKTtcbiAgICAgIHRoaXMucHJveHlTcGVjLnN1YnN0aXR1dGVMaXN0ID0gW107XG4gICAgICBpZiAoIXRoaXMuaXNBYnN0cmFjdCkgdGhpcy5wcm94eVNwZWMuYWRkU3Vic3RpdHV0ZSh0aGlzLCB0aGlzKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5pdGVtLnBhcmVudCkge1xuICAgICAgLy8gUGFyZW50IGlzIGFjdHVhbGx5IHRoZSBzdWJzdGl0dXRpb24gZ3JvdXAgYmFzZSBlbGVtZW50LlxuICAgICAgdGhpcy5pdGVtLnBhcmVudC5wcm94eVNwZWMuYWRkU3Vic3RpdHV0ZSh0aGlzLml0ZW0ucGFyZW50LCB0aGlzKTtcbiAgICB9XG4gIH1cblxuICB0eXBlTnVtOiBudW1iZXI7XG4gIHR5cGVTcGVjOiBUeXBlU3BlYztcbiAgdHlwZTogVHlwZTtcblxuICAvKiogU3Vic3RpdHV0aW9uIGdyb3VwIHZpcnR1YWwgdHlwZSxcbiAgICogY29udGFpbmluZyBhbGwgcG9zc2libGUgc3Vic3RpdHV0ZXMgYXMgY2hpbGRyZW4uICovXG4gIHByb3h5U3BlYzogVHlwZVNwZWM7XG5cbiAgLyoqIEFsbCB0eXBlcyBjb250YWluaW5nIHRoaXMgbWVtYmVyLCB0byBiZSBtb2RpZmllZCBpZiBtb3JlIHN1YnN0aXR1dGlvbnNcbiAgICogZm9yIHRoaXMgbWVtYmVyIGFyZSBkZWNsYXJlZCBsYXRlci4gKi9cbiAgY29udGFpbmluZ1R5cGVMaXN0OiB7XG4gICAgdHlwZTogVHlwZVNwZWM7XG4gICAgaGVhZDogTWVtYmVyUmVmO1xuICAgIHByb3h5OiBNZW1iZXJSZWY7XG4gIH1bXTtcbn1cbiJdfQ==