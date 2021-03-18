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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSXRlbS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3J1bnRpbWVfcGFyc2VyL3NyYy94bWwvSXRlbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsb0VBQW9FO0FBQ3BFLCtDQUErQzs7O0FBUy9DOzs0REFFNEQ7QUFFNUQ7SUFDQyxrRUFBa0U7SUFFbEUsa0JBQVksSUFBVTtRQXlDdEIsOERBQThEO1FBQ3RELGtCQUFhLEdBQVcsRUFBRSxDQUFDO1FBekNsQyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztJQUNsQixDQUFDO0lBRUQsNkNBQTZDO0lBRTdDLDRCQUFTLEdBQVQsVUFBVSxNQUFZO1FBQ3JCLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBRXJCLElBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDdkIsb0VBQW9FO1lBQ3BFLHlFQUF5RTtZQUN6RSxpREFBaUQ7WUFFakQsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1NBQ2Q7YUFBTSxJQUFHLE1BQU0sSUFBSSxJQUFJLENBQUMsSUFBSTtZQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDMUUsQ0FBQztJQUVELGdDQUFnQztJQUVoQyx5QkFBTSxHQUFOO1FBQ0MsSUFBRyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDakIsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7WUFFcEIsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztTQUNuQjtRQUVELEtBQXFCLFVBQWtCLEVBQWxCLEtBQUEsSUFBSSxDQUFDLGFBQWEsRUFBbEIsY0FBa0IsRUFBbEIsSUFBa0IsRUFBRTtZQUFyQyxJQUFJLFNBQVMsU0FBQTtZQUNoQixTQUFTLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1NBQ3hCO1FBRUQsSUFBSSxDQUFDLGFBQWEsR0FBRyxFQUFFLENBQUM7SUFDekIsQ0FBQztJQWNGLGVBQUM7QUFBRCxDQUFDLEFBakRELElBaURDO0FBakRZLDRCQUFRIiwic291cmNlc0NvbnRlbnQiOlsiLy8gVGhpcyBmaWxlIGlzIHBhcnQgb2YgY3htbCwgY29weXJpZ2h0IChjKSAyMDE1LTIwMTYgQnVzRmFzdGVyIEx0ZC5cbi8vIFJlbGVhc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSwgc2VlIExJQ0VOU0UuXG5cbi8qKiBUeXBlIG9yIG1lbWJlci4gKi9cblxuZXhwb3J0IGludGVyZmFjZSBJdGVtPEl0ZW1Db250ZW50PiB7XG5cdGRlZmluZSgpOiB2b2lkO1xuXHRpdGVtOiBJdGVtQ29udGVudDtcbn1cblxuLyoqIFR5cGUgYW5kIG1lbWJlciBkZXBlbmRlbmN5IGhlbHBlci4gSW1wbGVtZW50cyBLYWhuJ3MgdG9wb2xvZ2ljYWwgc29ydC5cbiAgKiBNZW1iZXIgaW5zdGVhZCBvZiBwYXJlbnQgY2xhc3Mgb2YgYm90aCwgZHVlIHRvIFR5cGVTY3JpcHQgbGltaXRhdGlvbnNcbiAgKiAoY2Fubm90IGV4dGVuZCBhIGNsYXNzIGdpdmVuIGFzIGEgZ2VuZXJpYyBwYXJhbWV0ZXIpLiAqL1xuXG5leHBvcnQgY2xhc3MgSXRlbUJhc2U8VHlwZSBleHRlbmRzIEl0ZW08SXRlbUJhc2U8VHlwZT4+PiB7XG5cdC8qKiBAcGFyYW0gdHlwZSBUeXBlIG9yIG1lbWJlciBpbnN0YW5jZSBjb250YWluaW5nIHRoaXMgaGVscGVyLiAqL1xuXG5cdGNvbnN0cnVjdG9yKHR5cGU6IFR5cGUpIHtcblx0XHR0aGlzLnR5cGUgPSB0eXBlO1xuXHR9XG5cblx0LyoqIFNldCBwYXJlbnQgdHlwZSBvciBzdWJzdGl0dXRlZCBtZW1iZXIuICovXG5cblx0c2V0UGFyZW50KHBhcmVudDogVHlwZSkge1xuXHRcdHRoaXMucGFyZW50ID0gcGFyZW50O1xuXG5cdFx0aWYocGFyZW50Lml0ZW0uZGVmaW5lZCkge1xuXHRcdFx0Ly8gRW50aXJlIG5hbWVzcGFjZSBmb3Igc3Vic3RpdHV0ZWQgbWVtYmVyIGlzIGFscmVhZHkgZnVsbHkgZGVmaW5lZCxcblx0XHRcdC8vIHNvIHRoZSBzdWJzdGl0dXRlZCBtZW1iZXIncyBkZXBlbmRlbnRMaXN0IHdvbid0IGdldCBwcm9jZXNzZWQgYW55IG1vcmVcblx0XHRcdC8vIGFuZCB3ZSBzaG91bGQgcHJvY2VzcyB0aGlzIG1lbWJlciBpbW1lZGlhdGVseS5cblxuXHRcdFx0dGhpcy5kZWZpbmUoKTtcblx0XHR9IGVsc2UgaWYocGFyZW50ICE9IHRoaXMudHlwZSkgcGFyZW50Lml0ZW0uZGVwZW5kZW50TGlzdC5wdXNoKHRoaXMudHlwZSk7XG5cdH1cblxuXHQvKiogVG9wb2xvZ2ljYWwgc29ydCB2aXNpdG9yLiAqL1xuXG5cdGRlZmluZSgpIHtcblx0XHRpZighdGhpcy5kZWZpbmVkKSB7XG5cdFx0XHR0aGlzLmRlZmluZWQgPSB0cnVlO1xuXG5cdFx0XHR0aGlzLnR5cGUuZGVmaW5lKCk7XG5cdFx0fVxuXG5cdFx0Zm9yKHZhciBkZXBlbmRlbnQgb2YgdGhpcy5kZXBlbmRlbnRMaXN0KSB7XG5cdFx0XHRkZXBlbmRlbnQuaXRlbS5kZWZpbmUoKTtcblx0XHR9XG5cblx0XHR0aGlzLmRlcGVuZGVudExpc3QgPSBbXTtcblx0fVxuXG5cdC8qKiBUeXBlIG9yIG1lbWJlci4gKi9cblx0dHlwZTogVHlwZTtcblx0LyoqIE51bWJlciBvZiBwYXJlbnQgdHlwZSBvciBzdWJzdGl0dXRlZCBtZW1iZXIuICovXG5cdHBhcmVudE51bTogbnVtYmVyO1xuXHQvKiogUGFyZW50IHR5cGUgb3Igc3Vic3RpdHV0ZWQgbWVtYmVyLiAqL1xuXHRwYXJlbnQ6IFR5cGU7XG5cblx0LyoqIFRyYWNrIGRlcGVuZGVudHMgZm9yIEthaG4ncyB0b3BvbG9naWNhbCBzb3J0IGFsZ29yaXRobS4gKi9cblx0cHJpdmF0ZSBkZXBlbmRlbnRMaXN0OiBUeXBlW10gPSBbXTtcblxuXHQvKiogVmlzaXRlZCBmbGFnIGZvciB0b3BvbG9naWNhbCBzb3J0LiAqL1xuXHRkZWZpbmVkOiBib29sZWFuO1xufVxuIl19