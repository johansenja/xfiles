"use strict";
// This file is part of cxml, copyright (c) 2015-2016 BusFaster Ltd.
// Released under the MIT license, see LICENSE.
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemBase = void 0;
/** Type and member dependency helper. Implements Kahn's topological sort.
  * Member instead of parent class of both, due to TypeScript limitations
  * (cannot extend a class given as a generic parameter). */
var ItemBase = /** @class */ (function () {
    /** @param type Type or member instance containing this helper. */
    function ItemBase(type) {
        /** Track dependents for Kahn's topological sort algorithm. */
        this.dependentList = [];
        this.type = type;
    }
    /** Set parent type or substituted member. */
    ItemBase.prototype.setParent = function (parent) {
        this.parent = parent;
        if (parent.item.defined) {
            // Entire namespace for substituted member is already fully defined,
            // so the substituted member's dependentList won't get processed any more
            // and we should process this member immediately.
            this.define();
        }
        else if (parent != this.type)
            parent.item.dependentList.push(this.type);
    };
    /** Topological sort visitor. */
    ItemBase.prototype.define = function () {
        if (!this.defined) {
            this.defined = true;
            this.type.define();
        }
        for (var _i = 0, _a = this.dependentList; _i < _a.length; _i++) {
            var dependent = _a[_i];
            dependent.item.define();
        }
        this.dependentList = [];
    };
    return ItemBase;
}());
exports.ItemBase = ItemBase;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSXRlbS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkl0ZW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLG9FQUFvRTtBQUNwRSwrQ0FBK0M7OztBQVMvQzs7NERBRTREO0FBRTVEO0lBQ0Msa0VBQWtFO0lBRWxFLGtCQUFZLElBQVU7UUF5Q3RCLDhEQUE4RDtRQUN0RCxrQkFBYSxHQUFXLEVBQUUsQ0FBQztRQXpDbEMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7SUFDbEIsQ0FBQztJQUVELDZDQUE2QztJQUU3Qyw0QkFBUyxHQUFULFVBQVUsTUFBWTtRQUNyQixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUVyQixJQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ3ZCLG9FQUFvRTtZQUNwRSx5RUFBeUU7WUFDekUsaURBQWlEO1lBRWpELElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztTQUNkO2FBQU0sSUFBRyxNQUFNLElBQUksSUFBSSxDQUFDLElBQUk7WUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzFFLENBQUM7SUFFRCxnQ0FBZ0M7SUFFaEMseUJBQU0sR0FBTjtRQUNDLElBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ2pCLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1lBRXBCLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7U0FDbkI7UUFFRCxLQUFxQixVQUFrQixFQUFsQixLQUFBLElBQUksQ0FBQyxhQUFhLEVBQWxCLGNBQWtCLEVBQWxCLElBQWtCLEVBQUU7WUFBckMsSUFBSSxTQUFTLFNBQUE7WUFDaEIsU0FBUyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztTQUN4QjtRQUVELElBQUksQ0FBQyxhQUFhLEdBQUcsRUFBRSxDQUFDO0lBQ3pCLENBQUM7SUFjRixlQUFDO0FBQUQsQ0FBQyxBQWpERCxJQWlEQztBQWpEWSw0QkFBUSIsInNvdXJjZXNDb250ZW50IjpbIi8vIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIGN4bWwsIGNvcHlyaWdodCAoYykgMjAxNS0yMDE2IEJ1c0Zhc3RlciBMdGQuXG4vLyBSZWxlYXNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UsIHNlZSBMSUNFTlNFLlxuXG4vKiogVHlwZSBvciBtZW1iZXIuICovXG5cbmV4cG9ydCBpbnRlcmZhY2UgSXRlbTxJdGVtQ29udGVudD4ge1xuXHRkZWZpbmUoKTogdm9pZDtcblx0aXRlbTogSXRlbUNvbnRlbnQ7XG59XG5cbi8qKiBUeXBlIGFuZCBtZW1iZXIgZGVwZW5kZW5jeSBoZWxwZXIuIEltcGxlbWVudHMgS2FobidzIHRvcG9sb2dpY2FsIHNvcnQuXG4gICogTWVtYmVyIGluc3RlYWQgb2YgcGFyZW50IGNsYXNzIG9mIGJvdGgsIGR1ZSB0byBUeXBlU2NyaXB0IGxpbWl0YXRpb25zXG4gICogKGNhbm5vdCBleHRlbmQgYSBjbGFzcyBnaXZlbiBhcyBhIGdlbmVyaWMgcGFyYW1ldGVyKS4gKi9cblxuZXhwb3J0IGNsYXNzIEl0ZW1CYXNlPFR5cGUgZXh0ZW5kcyBJdGVtPEl0ZW1CYXNlPFR5cGU+Pj4ge1xuXHQvKiogQHBhcmFtIHR5cGUgVHlwZSBvciBtZW1iZXIgaW5zdGFuY2UgY29udGFpbmluZyB0aGlzIGhlbHBlci4gKi9cblxuXHRjb25zdHJ1Y3Rvcih0eXBlOiBUeXBlKSB7XG5cdFx0dGhpcy50eXBlID0gdHlwZTtcblx0fVxuXG5cdC8qKiBTZXQgcGFyZW50IHR5cGUgb3Igc3Vic3RpdHV0ZWQgbWVtYmVyLiAqL1xuXG5cdHNldFBhcmVudChwYXJlbnQ6IFR5cGUpIHtcblx0XHR0aGlzLnBhcmVudCA9IHBhcmVudDtcblxuXHRcdGlmKHBhcmVudC5pdGVtLmRlZmluZWQpIHtcblx0XHRcdC8vIEVudGlyZSBuYW1lc3BhY2UgZm9yIHN1YnN0aXR1dGVkIG1lbWJlciBpcyBhbHJlYWR5IGZ1bGx5IGRlZmluZWQsXG5cdFx0XHQvLyBzbyB0aGUgc3Vic3RpdHV0ZWQgbWVtYmVyJ3MgZGVwZW5kZW50TGlzdCB3b24ndCBnZXQgcHJvY2Vzc2VkIGFueSBtb3JlXG5cdFx0XHQvLyBhbmQgd2Ugc2hvdWxkIHByb2Nlc3MgdGhpcyBtZW1iZXIgaW1tZWRpYXRlbHkuXG5cblx0XHRcdHRoaXMuZGVmaW5lKCk7XG5cdFx0fSBlbHNlIGlmKHBhcmVudCAhPSB0aGlzLnR5cGUpIHBhcmVudC5pdGVtLmRlcGVuZGVudExpc3QucHVzaCh0aGlzLnR5cGUpO1xuXHR9XG5cblx0LyoqIFRvcG9sb2dpY2FsIHNvcnQgdmlzaXRvci4gKi9cblxuXHRkZWZpbmUoKSB7XG5cdFx0aWYoIXRoaXMuZGVmaW5lZCkge1xuXHRcdFx0dGhpcy5kZWZpbmVkID0gdHJ1ZTtcblxuXHRcdFx0dGhpcy50eXBlLmRlZmluZSgpO1xuXHRcdH1cblxuXHRcdGZvcih2YXIgZGVwZW5kZW50IG9mIHRoaXMuZGVwZW5kZW50TGlzdCkge1xuXHRcdFx0ZGVwZW5kZW50Lml0ZW0uZGVmaW5lKCk7XG5cdFx0fVxuXG5cdFx0dGhpcy5kZXBlbmRlbnRMaXN0ID0gW107XG5cdH1cblxuXHQvKiogVHlwZSBvciBtZW1iZXIuICovXG5cdHR5cGU6IFR5cGU7XG5cdC8qKiBOdW1iZXIgb2YgcGFyZW50IHR5cGUgb3Igc3Vic3RpdHV0ZWQgbWVtYmVyLiAqL1xuXHRwYXJlbnROdW06IG51bWJlcjtcblx0LyoqIFBhcmVudCB0eXBlIG9yIHN1YnN0aXR1dGVkIG1lbWJlci4gKi9cblx0cGFyZW50OiBUeXBlO1xuXG5cdC8qKiBUcmFjayBkZXBlbmRlbnRzIGZvciBLYWhuJ3MgdG9wb2xvZ2ljYWwgc29ydCBhbGdvcml0aG0uICovXG5cdHByaXZhdGUgZGVwZW5kZW50TGlzdDogVHlwZVtdID0gW107XG5cblx0LyoqIFZpc2l0ZWQgZmxhZyBmb3IgdG9wb2xvZ2ljYWwgc29ydC4gKi9cblx0ZGVmaW5lZDogYm9vbGVhbjtcbn1cbiJdfQ==