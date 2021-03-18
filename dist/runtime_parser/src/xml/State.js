"use strict";
// This file is part of cxml, copyright (c) 2016 BusFaster Ltd.
// Released under the MIT license, see LICENSE.
Object.defineProperty(exports, "__esModule", { value: true });
exports.State = void 0;
/** Parser state created for each input tag. */
var State = /** @class */ (function () {
    function State(parent, memberRef, type, item) {
        this.parent = parent;
        this.memberRef = memberRef;
        this.type = type;
        this.item = item;
        if (parent) {
            this.namespaceTbl = parent.namespaceTbl;
        }
        else {
            this.namespaceTbl = {};
        }
    }
    /** Add a new xmlns prefix recognized inside current tag and its children. */
    State.prototype.addNamespace = function (short, namespace) {
        var key;
        var namespaceTbl = this.namespaceTbl;
        if (this.parent && namespaceTbl == this.parent.namespaceTbl) {
            namespaceTbl = {};
            for (var _i = 0, _a = Object.keys(this.parent.namespaceTbl); _i < _a.length; _i++) {
                key = _a[_i];
                namespaceTbl[key] = this.parent.namespaceTbl[key];
            }
            this.namespaceTbl = namespaceTbl;
        }
        namespaceTbl[short] = [namespace, namespace.getPrefix()];
    };
    return State;
}());
exports.State = State;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3RhdGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9ydW50aW1lX3BhcnNlci9zcmMveG1sL1N0YXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSwrREFBK0Q7QUFDL0QsK0NBQStDOzs7QUFNL0MsK0NBQStDO0FBRS9DO0lBQ0MsZUFBWSxNQUFhLEVBQUUsU0FBb0IsRUFBRSxJQUFVLEVBQUUsSUFBcUI7UUFDakYsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFDckIsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7UUFDM0IsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDakIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFFakIsSUFBRyxNQUFNLEVBQUU7WUFDVixJQUFJLENBQUMsWUFBWSxHQUFHLE1BQU0sQ0FBQyxZQUFZLENBQUM7U0FDeEM7YUFBTTtZQUNOLElBQUksQ0FBQyxZQUFZLEdBQUcsRUFBRSxDQUFDO1NBQ3ZCO0lBQ0YsQ0FBQztJQUVELDZFQUE2RTtJQUU3RSw0QkFBWSxHQUFaLFVBQWEsS0FBYSxFQUFFLFNBQW9CO1FBQy9DLElBQUksR0FBVyxDQUFDO1FBQ2hCLElBQUksWUFBWSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUM7UUFFckMsSUFBRyxJQUFJLENBQUMsTUFBTSxJQUFJLFlBQVksSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksRUFBRTtZQUMzRCxZQUFZLEdBQUcsRUFBRSxDQUFDO1lBRWxCLEtBQVcsVUFBcUMsRUFBckMsS0FBQSxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLEVBQXJDLGNBQXFDLEVBQXJDLElBQXFDLEVBQUU7Z0JBQTlDLEdBQUcsU0FBQTtnQkFDTixZQUFZLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDbEQ7WUFFRCxJQUFJLENBQUMsWUFBWSxHQUFHLFlBQVksQ0FBQztTQUNqQztRQUVELFlBQVksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFFLFNBQVMsRUFBRSxTQUFTLENBQUMsU0FBUyxFQUFFLENBQUUsQ0FBQztJQUM1RCxDQUFDO0lBY0YsWUFBQztBQUFELENBQUMsQUE3Q0QsSUE2Q0M7QUE3Q1ksc0JBQUsiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBUaGlzIGZpbGUgaXMgcGFydCBvZiBjeG1sLCBjb3B5cmlnaHQgKGMpIDIwMTYgQnVzRmFzdGVyIEx0ZC5cbi8vIFJlbGVhc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSwgc2VlIExJQ0VOU0UuXG5cbmltcG9ydCB7TmFtZXNwYWNlfSBmcm9tICcuL05hbWVzcGFjZSc7XG5pbXBvcnQge1R5cGUsIEhhbmRsZXJJbnN0YW5jZX0gZnJvbSAnLi9UeXBlJztcbmltcG9ydCB7TWVtYmVyUmVmfSBmcm9tICcuL01lbWJlclJlZic7XG5cbi8qKiBQYXJzZXIgc3RhdGUgY3JlYXRlZCBmb3IgZWFjaCBpbnB1dCB0YWcuICovXG5cbmV4cG9ydCBjbGFzcyBTdGF0ZSB7XG5cdGNvbnN0cnVjdG9yKHBhcmVudDogU3RhdGUsIG1lbWJlclJlZjogTWVtYmVyUmVmLCB0eXBlOiBUeXBlLCBpdGVtOiBIYW5kbGVySW5zdGFuY2UpIHtcblx0XHR0aGlzLnBhcmVudCA9IHBhcmVudDtcblx0XHR0aGlzLm1lbWJlclJlZiA9IG1lbWJlclJlZjtcblx0XHR0aGlzLnR5cGUgPSB0eXBlO1xuXHRcdHRoaXMuaXRlbSA9IGl0ZW07XG5cblx0XHRpZihwYXJlbnQpIHtcblx0XHRcdHRoaXMubmFtZXNwYWNlVGJsID0gcGFyZW50Lm5hbWVzcGFjZVRibDtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhpcy5uYW1lc3BhY2VUYmwgPSB7fTtcblx0XHR9XG5cdH1cblxuXHQvKiogQWRkIGEgbmV3IHhtbG5zIHByZWZpeCByZWNvZ25pemVkIGluc2lkZSBjdXJyZW50IHRhZyBhbmQgaXRzIGNoaWxkcmVuLiAqL1xuXG5cdGFkZE5hbWVzcGFjZShzaG9ydDogc3RyaW5nLCBuYW1lc3BhY2U6IE5hbWVzcGFjZSkge1xuXHRcdHZhciBrZXk6IHN0cmluZztcblx0XHR2YXIgbmFtZXNwYWNlVGJsID0gdGhpcy5uYW1lc3BhY2VUYmw7XG5cblx0XHRpZih0aGlzLnBhcmVudCAmJiBuYW1lc3BhY2VUYmwgPT0gdGhpcy5wYXJlbnQubmFtZXNwYWNlVGJsKSB7XG5cdFx0XHRuYW1lc3BhY2VUYmwgPSB7fTtcblxuXHRcdFx0Zm9yKGtleSBvZiBPYmplY3Qua2V5cyh0aGlzLnBhcmVudC5uYW1lc3BhY2VUYmwpKSB7XG5cdFx0XHRcdG5hbWVzcGFjZVRibFtrZXldID0gdGhpcy5wYXJlbnQubmFtZXNwYWNlVGJsW2tleV07XG5cdFx0XHR9XG5cblx0XHRcdHRoaXMubmFtZXNwYWNlVGJsID0gbmFtZXNwYWNlVGJsO1xuXHRcdH1cblxuXHRcdG5hbWVzcGFjZVRibFtzaG9ydF0gPSBbIG5hbWVzcGFjZSwgbmFtZXNwYWNlLmdldFByZWZpeCgpIF07XG5cdH1cblxuXHRwYXJlbnQ6IFN0YXRlO1xuXHQvKiogVGFnIG1ldGFkYXRhIGluIHNjaGVtYSwgZGVmaW5pbmcgbmFtZSBhbmQgb2NjdXJyZW5jZSBjb3VudC4gKi9cblx0bWVtYmVyUmVmOiBNZW1iZXJSZWY7XG5cdC8qKiBUYWcgdHlwZSBpbiBzY2hlbWEsIGRlZmluaW5nIGF0dHJpYnV0ZXMgYW5kIGNoaWxkcmVuLiAqL1xuXHR0eXBlOiBUeXBlO1xuXHQvKiogT3V0cHV0IG9iamVjdCBmb3IgY29udGVudHMgb2YgdGhpcyB0YWcuICovXG5cdGl0ZW06IEhhbmRsZXJJbnN0YW5jZTtcblx0LyoqIFRleHQgY29udGVudCBmb3VuZCBpbnNpZGUgdGhlIHRhZy4gKi9cblx0dGV4dExpc3Q6IHN0cmluZ1tdO1xuXG5cdC8qKiBSZWNvZ25pemVkIHhtbG5zIHByZWZpeGVzLiAqL1xuXHRuYW1lc3BhY2VUYmw6IHsgW3Nob3J0OiBzdHJpbmddOiBbIE5hbWVzcGFjZSwgc3RyaW5nIF0gfTtcbn1cbiJdfQ==