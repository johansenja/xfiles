"use strict";
// This file is part of cxsd, copyright (c) 2015 BusFaster Ltd.
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
exports.Schema = exports.Root = void 0;
var types = require("../types");
/** Schema root element */
var Root = /** @class */ (function (_super) {
    __extends(Root, _super);
    function Root() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Root.mayContain = function () { return [
        Schema
    ]; };
    return Root;
}(types.Base));
exports.Root = Root;
/** <xsd:schema> */
var Schema = /** @class */ (function (_super) {
    __extends(Schema, _super);
    function Schema() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Schema.prototype.init = function (state) {
        // Ultimately the schema exports elements and types in the global scope
        // (meaning they are children of this, the root element).
        state.source.parse(state.attributeTbl);
        var scope = state.source.targetNamespace.getScope();
        state.setScope(scope);
        this.scope = scope;
    };
    Schema.mayContain = function () { return [
        types.Annotation,
        types.Import,
        types.Include,
        types.AttributeGroup,
        types.SimpleType,
        types.ComplexType,
        types.Group,
        types.Attribute,
        types.Element
    ]; };
    return Schema;
}(types.Base));
exports.Schema = Schema;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2NoZW1hLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcGFyc2VyX3NjYWZmb2xkX2dlbmVyYXRvci9zcmMveHNkL3R5cGVzL1NjaGVtYS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsK0RBQStEO0FBQy9ELCtDQUErQzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRy9DLGdDQUFrQztBQUVsQywwQkFBMEI7QUFFMUI7SUFBMEIsd0JBQVU7SUFBcEM7O0lBSUEsQ0FBQztJQUhPLGVBQVUsR0FBNEIsY0FBTSxPQUFBO1FBQ2xELE1BQU07S0FDTixFQUZrRCxDQUVsRCxDQUFDO0lBQ0gsV0FBQztDQUFBLEFBSkQsQ0FBMEIsS0FBSyxDQUFDLElBQUksR0FJbkM7QUFKWSxvQkFBSTtBQU1qQixtQkFBbUI7QUFFbkI7SUFBNEIsMEJBQVU7SUFBdEM7O0lBdUJBLENBQUM7SUFWQSxxQkFBSSxHQUFKLFVBQUssS0FBWTtRQUNoQix1RUFBdUU7UUFDdkUseURBQXlEO1FBRXpELEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUN2QyxJQUFJLEtBQUssR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUVwRCxLQUFLLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3RCLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO0lBQ3BCLENBQUM7SUFyQk0saUJBQVUsR0FBNEIsY0FBTSxPQUFBO1FBQ2xELEtBQUssQ0FBQyxVQUFVO1FBQ2hCLEtBQUssQ0FBQyxNQUFNO1FBQ1osS0FBSyxDQUFDLE9BQU87UUFDYixLQUFLLENBQUMsY0FBYztRQUNwQixLQUFLLENBQUMsVUFBVTtRQUNoQixLQUFLLENBQUMsV0FBVztRQUNqQixLQUFLLENBQUMsS0FBSztRQUNYLEtBQUssQ0FBQyxTQUFTO1FBQ2YsS0FBSyxDQUFDLE9BQU87S0FDYixFQVZrRCxDQVVsRCxDQUFDO0lBWUgsYUFBQztDQUFBLEFBdkJELENBQTRCLEtBQUssQ0FBQyxJQUFJLEdBdUJyQztBQXZCWSx3QkFBTSIsInNvdXJjZXNDb250ZW50IjpbIi8vIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIGN4c2QsIGNvcHlyaWdodCAoYykgMjAxNSBCdXNGYXN0ZXIgTHRkLlxuLy8gUmVsZWFzZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlLCBzZWUgTElDRU5TRS5cblxuaW1wb3J0IHtTdGF0ZX0gZnJvbSAnLi4vU3RhdGUnO1xuaW1wb3J0ICogYXMgdHlwZXMgZnJvbSAnLi4vdHlwZXMnO1xuXG4vKiogU2NoZW1hIHJvb3QgZWxlbWVudCAqL1xuXG5leHBvcnQgY2xhc3MgUm9vdCBleHRlbmRzIHR5cGVzLkJhc2Uge1xuXHRzdGF0aWMgbWF5Q29udGFpbjogKCkgPT4gdHlwZXMuQmFzZUNsYXNzW10gPSAoKSA9PiBbXG5cdFx0U2NoZW1hXG5cdF07XG59XG5cbi8qKiA8eHNkOnNjaGVtYT4gKi9cblxuZXhwb3J0IGNsYXNzIFNjaGVtYSBleHRlbmRzIHR5cGVzLkJhc2Uge1xuXHRzdGF0aWMgbWF5Q29udGFpbjogKCkgPT4gdHlwZXMuQmFzZUNsYXNzW10gPSAoKSA9PiBbXG5cdFx0dHlwZXMuQW5ub3RhdGlvbixcblx0XHR0eXBlcy5JbXBvcnQsXG5cdFx0dHlwZXMuSW5jbHVkZSxcblx0XHR0eXBlcy5BdHRyaWJ1dGVHcm91cCxcblx0XHR0eXBlcy5TaW1wbGVUeXBlLFxuXHRcdHR5cGVzLkNvbXBsZXhUeXBlLFxuXHRcdHR5cGVzLkdyb3VwLFxuXHRcdHR5cGVzLkF0dHJpYnV0ZSxcblx0XHR0eXBlcy5FbGVtZW50XG5cdF07XG5cblx0aW5pdChzdGF0ZTogU3RhdGUpIHtcblx0XHQvLyBVbHRpbWF0ZWx5IHRoZSBzY2hlbWEgZXhwb3J0cyBlbGVtZW50cyBhbmQgdHlwZXMgaW4gdGhlIGdsb2JhbCBzY29wZVxuXHRcdC8vIChtZWFuaW5nIHRoZXkgYXJlIGNoaWxkcmVuIG9mIHRoaXMsIHRoZSByb290IGVsZW1lbnQpLlxuXG5cdFx0c3RhdGUuc291cmNlLnBhcnNlKHN0YXRlLmF0dHJpYnV0ZVRibCk7XG5cdFx0dmFyIHNjb3BlID0gc3RhdGUuc291cmNlLnRhcmdldE5hbWVzcGFjZS5nZXRTY29wZSgpO1xuXG5cdFx0c3RhdGUuc2V0U2NvcGUoc2NvcGUpO1xuXHRcdHRoaXMuc2NvcGUgPSBzY29wZTtcblx0fVxufVxuIl19