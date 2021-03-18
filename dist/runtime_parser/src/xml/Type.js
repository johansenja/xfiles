"use strict";
// This file is part of cxml, copyright (c) 2016 BusFaster Ltd.
// Released under the MIT license, see LICENSE.
Object.defineProperty(exports, "__esModule", { value: true });
exports.Type = exports.TypeInstance = void 0;
/** Base class inherited by all schema type classes, not defining custom hooks. */
var TypeInstance = /** @class */ (function () {
    function TypeInstance() {
    }
    return TypeInstance;
}());
exports.TypeInstance = TypeInstance;
/** Parser rule, defines a handler class, valid attributes and children
  * for an XSD tag. */
var Type = /** @class */ (function () {
    function Type(handler) {
        /** Table of allowed attributes. */
        this.attributeTbl = {};
        this.handler = handler;
    }
    Type.prototype.addAttribute = function (ref) {
        this.attributeTbl[ref.member.namespace.getPrefix() + ref.member.name] = ref;
    };
    Type.prototype.addChild = function (ref) {
        this.childTbl[ref.member.namespace.getPrefix() + ref.member.name] = ref;
    };
    return Type;
}());
exports.Type = Type;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVHlwZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3J1bnRpbWVfcGFyc2VyL3NyYy94bWwvVHlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsK0RBQStEO0FBQy9ELCtDQUErQzs7O0FBa0IvQyxrRkFBa0Y7QUFFbEY7SUFBQTtJQU9BLENBQUM7SUFBRCxtQkFBQztBQUFELENBQUMsQUFQRCxJQU9DO0FBUFksb0NBQVk7QUF5QnpCO3NCQUNzQjtBQUV0QjtJQUNDLGNBQVksT0FBa0I7UUFpQjlCLG1DQUFtQztRQUNuQyxpQkFBWSxHQUFpQyxFQUFFLENBQUM7UUFqQi9DLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO0lBQ3hCLENBQUM7SUFFRCwyQkFBWSxHQUFaLFVBQWEsR0FBYztRQUMxQixJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLFNBQVMsRUFBRSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDO0lBQzdFLENBQUM7SUFFRCx1QkFBUSxHQUFSLFVBQVMsR0FBYztRQUN0QixJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLFNBQVMsRUFBRSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDO0lBQ3pFLENBQUM7SUF1QkYsV0FBQztBQUFELENBQUMsQUFsQ0QsSUFrQ0M7QUFsQ1ksb0JBQUkiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBUaGlzIGZpbGUgaXMgcGFydCBvZiBjeG1sLCBjb3B5cmlnaHQgKGMpIDIwMTYgQnVzRmFzdGVyIEx0ZC5cbi8vIFJlbGVhc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSwgc2VlIExJQ0VOU0UuXG5cbmltcG9ydCB7TmFtZXNwYWNlfSBmcm9tICcuL05hbWVzcGFjZSc7XG5pbXBvcnQge01lbWJlclJlZn0gZnJvbSAnLi9NZW1iZXJSZWYnO1xuXG4vKiogSW50ZXJmYWNlIGltcGxlbWVudGVkIGJ5IHNjaGVtYSB0eXBlIGNsYXNzZXMsIGFsbG93aW5nIGN1c3RvbSBob29rcy4gKi9cblxuZXhwb3J0IGludGVyZmFjZSBIYW5kbGVySW5zdGFuY2Uge1xuXHRba2V5OiBzdHJpbmddOiBhbnk7XG5cblx0Y29udGVudD86IGFueTtcblx0X2V4aXN0czogYm9vbGVhbjtcblx0X25hbWVzcGFjZTogc3RyaW5nO1xuXG5cdF9iZWZvcmU/KCk6IHZvaWQ7XG5cdF9hZnRlcj8oKTogdm9pZDtcbn1cblxuLyoqIEJhc2UgY2xhc3MgaW5oZXJpdGVkIGJ5IGFsbCBzY2hlbWEgdHlwZSBjbGFzc2VzLCBub3QgZGVmaW5pbmcgY3VzdG9tIGhvb2tzLiAqL1xuXG5leHBvcnQgY2xhc3MgVHlwZUluc3RhbmNlIGltcGxlbWVudHMgSGFuZGxlckluc3RhbmNlIHtcblx0LyoqIE5hbWUgb2YgdGhlIHR5cGUsIHBvaW50aW5nIHRvIHRoZSBuYW1lIG9mIHRoZSBjb25zdHJ1Y3RvciBmdW5jdGlvbi5cblx0ICAqIE1pZ2h0IGNvbnRhaW4gZ2FyYmFnZS4uLiAqL1xuXHQvLyBzdGF0aWMgbmFtZTogc3RyaW5nO1xuXHQvLyBzdGF0aWMgdHlwZTogVHlwZTtcblx0X2V4aXN0czogYm9vbGVhbjtcblx0X25hbWVzcGFjZTogc3RyaW5nO1xufVxuXG4vKiogQ2xhc3MgdHlwZSBjb21wYXRpYmxlIHdpdGggc2NoZW1hIHR5cGUgY2xhc3Nlcy4gKi9cblxuZXhwb3J0IGludGVyZmFjZSBUeXBlQ2xhc3Mge1xuXHRuZXcoKTogVHlwZUluc3RhbmNlO1xuXG5cdHR5cGU/OiBUeXBlO1xufVxuXG4vKiogQ2xhc3MgdHlwZSBjb21wYXRpYmxlIHdpdGggc2NoZW1hIHR5cGUgY2xhc3NlcywgYWxsb3dpbmcgY3VzdG9tIGhvb2tzLiAqL1xuXG5leHBvcnQgaW50ZXJmYWNlIEhhbmRsZXJDbGFzcyBleHRlbmRzIFR5cGVDbGFzcyB7XG5cdG5ldygpOiBIYW5kbGVySW5zdGFuY2U7XG5cblx0X2N1c3RvbT86IGJvb2xlYW47XG59XG5cbi8qKiBQYXJzZXIgcnVsZSwgZGVmaW5lcyBhIGhhbmRsZXIgY2xhc3MsIHZhbGlkIGF0dHJpYnV0ZXMgYW5kIGNoaWxkcmVuXG4gICogZm9yIGFuIFhTRCB0YWcuICovXG5cbmV4cG9ydCBjbGFzcyBUeXBlIHtcblx0Y29uc3RydWN0b3IoaGFuZGxlcjogVHlwZUNsYXNzKSB7XG5cdFx0dGhpcy5oYW5kbGVyID0gaGFuZGxlcjtcblx0fVxuXG5cdGFkZEF0dHJpYnV0ZShyZWY6IE1lbWJlclJlZikge1xuXHRcdHRoaXMuYXR0cmlidXRlVGJsW3JlZi5tZW1iZXIubmFtZXNwYWNlLmdldFByZWZpeCgpICsgcmVmLm1lbWJlci5uYW1lXSA9IHJlZjtcblx0fVxuXG5cdGFkZENoaWxkKHJlZjogTWVtYmVyUmVmKSB7XG5cdFx0dGhpcy5jaGlsZFRibFtyZWYubWVtYmVyLm5hbWVzcGFjZS5nZXRQcmVmaXgoKSArIHJlZi5tZW1iZXIubmFtZV0gPSByZWY7XG5cdH1cblxuXHRuYW1lc3BhY2U6IE5hbWVzcGFjZTtcblxuXHQvKiogQ29uc3RydWN0b3IgZnVuY3Rpb24gZm9yIGNyZWF0aW5nIG9iamVjdHMgaGFuZGxpbmcgYW5kIHJlcHJlc2VudGluZyB0aGUgcmVzdWx0cyBvZiB0aGlzIHBhcnNpbmcgcnVsZS4gKi9cblx0aGFuZGxlcjogSGFuZGxlckNsYXNzO1xuXG5cdC8qKiBUYWJsZSBvZiBhbGxvd2VkIGF0dHJpYnV0ZXMuICovXG5cdGF0dHJpYnV0ZVRibDogeyBba2V5OiBzdHJpbmddOiBNZW1iZXJSZWYgfSA9IHt9O1xuXG5cdC8qKiBUYWJsZSBtYXBwaW5nIHRoZSBuYW1lcyBvZiBhbGxvd2VkIGNoaWxkIHRhZ3MsIHRvIHRoZWlyIHBhcnNpbmcgcnVsZXMuICovXG5cdGNoaWxkVGJsOiB7IFtrZXk6IHN0cmluZ106IE1lbWJlclJlZiB9O1xuXG5cdC8qKiBUeXBlIGhhcyB0ZXh0IGNvbnRlbnQgcmVwcmVzZW50YWJsZSBhcyBKYXZhU2NyaXB0IHByaW1pdGl2ZXMuICovXG5cdGlzUHJpbWl0aXZlOiBib29sZWFuO1xuXHQvKiogUHJpbWl0aXZlIHR5cGUgaXMgaW5oZXJpdGVkIHdpdGhvdXQgYW55IGFkZGl0aW9uYWwgYXR0cmlidXRlc1xuXHQgICogb3IgY2hpbGRyZW4sIHNvIGlzIGNhbiBiZSByZXByZXNlbnRlZCBhcyBhIEphdmFTY3JpcHQgcHJpbWl0aXZlLiAqL1xuXHRpc1BsYWluUHJpbWl0aXZlOiBib29sZWFuO1xuXHQvKiogVGV4dCBjb250ZW50IGlzIGEgd2hpdGVzcGFjZS1zZXBhcmF0ZWQgbGlzdCBvZiBwcmltaXRpdmUgdHlwZXMuICovXG5cdGlzTGlzdDogYm9vbGVhbjtcblxuXHQvKiogSmF2YVNjcmlwdCBwcmltaXRpdmUgdHlwZSB0aGF0IGNhbiByZXByZXNlbnQgdGhlIHRleHQgY29udGVudC4gKi9cblx0cHJpbWl0aXZlVHlwZTogc3RyaW5nO1xufVxuIl19