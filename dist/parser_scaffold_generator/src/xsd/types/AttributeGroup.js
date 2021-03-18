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
exports.AttributeGroup = void 0;
var QName_1 = require("../QName");
var types = require("../types");
/** <xsd:attributeGroup>
  * Defines several attributes that can be included together in type definitions. */
var AttributeGroup = /** @class */ (function (_super) {
    __extends(AttributeGroup, _super);
    function AttributeGroup() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.id = null;
        _this.name = null;
        _this.ref = null;
        return _this;
    }
    AttributeGroup.prototype.init = function (state) {
        this.define(state, 'attributeGroup', 0, 0);
    };
    AttributeGroup.prototype.resolve = function (state) {
        var attributeGroup = this;
        if (this.ref) {
            var ref = new QName_1.QName(this.ref, state.source);
            attributeGroup = this.scope.lookup(ref, 'attributeGroup');
        }
        // Named attribute groups are only models for referencing elsewhere.
        if (!this.name) {
            if (attributeGroup) {
                // if(attributeGroup != this && !attributeGroup.resolved) console.log('OH NOES! AttributeGroup ' + attributeGroup.name);
                // attributeGroup.scope.addAllToParent('attribute', 1, 1, this.scope);
                attributeGroup.define(state, 'attributeGroup', 1, 1, this.scope);
            }
            else
                throw new types.MissingReferenceError('attributeGroup', ref);
        }
    };
    AttributeGroup.mayContain = function () { return [
        types.Annotation,
        types.Attribute,
        AttributeGroup
    ]; };
    return AttributeGroup;
}(types.Base));
exports.AttributeGroup = AttributeGroup;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXR0cmlidXRlR3JvdXAuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wYXJzZXJfc2NhZmZvbGRfZ2VuZXJhdG9yL3NyYy94c2QvdHlwZXMvQXR0cmlidXRlR3JvdXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLG9FQUFvRTtBQUNwRSwrQ0FBK0M7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUcvQyxrQ0FBK0I7QUFDL0IsZ0NBQWtDO0FBRWxDO29GQUNvRjtBQUVwRjtJQUFvQyxrQ0FBVTtJQUE5QztRQUFBLHFFQWlDQztRQUhBLFFBQUUsR0FBVyxJQUFJLENBQUM7UUFDbEIsVUFBSSxHQUFXLElBQUksQ0FBQztRQUNwQixTQUFHLEdBQVcsSUFBSSxDQUFDOztJQUNwQixDQUFDO0lBMUJBLDZCQUFJLEdBQUosVUFBSyxLQUFZO1FBQ2hCLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLGdCQUFnQixFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUM1QyxDQUFDO0lBRUQsZ0NBQU8sR0FBUCxVQUFRLEtBQVk7UUFDbkIsSUFBSSxjQUFjLEdBQW1CLElBQUksQ0FBQztRQUUxQyxJQUFHLElBQUksQ0FBQyxHQUFHLEVBQUU7WUFDWixJQUFJLEdBQUcsR0FBRyxJQUFJLGFBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUM1QyxjQUFjLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLGdCQUFnQixDQUFtQixDQUFDO1NBQzVFO1FBRUQsb0VBQW9FO1FBRXBFLElBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFO1lBQ2QsSUFBRyxjQUFjLEVBQUU7Z0JBQ2xCLHdIQUF3SDtnQkFDeEgsc0VBQXNFO2dCQUN0RSxjQUFjLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxnQkFBZ0IsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUNqRTs7Z0JBQU0sTUFBTSxJQUFJLEtBQUssQ0FBQyxxQkFBcUIsQ0FBQyxnQkFBZ0IsRUFBRSxHQUFHLENBQUMsQ0FBQztTQUNwRTtJQUNGLENBQUM7SUEzQk0seUJBQVUsR0FBNEIsY0FBTSxPQUFBO1FBQ2xELEtBQUssQ0FBQyxVQUFVO1FBQ2hCLEtBQUssQ0FBQyxTQUFTO1FBQ2YsY0FBYztLQUNkLEVBSmtELENBSWxELENBQUM7SUE0QkgscUJBQUM7Q0FBQSxBQWpDRCxDQUFvQyxLQUFLLENBQUMsSUFBSSxHQWlDN0M7QUFqQ1ksd0NBQWMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBUaGlzIGZpbGUgaXMgcGFydCBvZiBjeHNkLCBjb3B5cmlnaHQgKGMpIDIwMTUtMjAxNiBCdXNGYXN0ZXIgTHRkLlxuLy8gUmVsZWFzZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlLCBzZWUgTElDRU5TRS5cblxuaW1wb3J0IHtTdGF0ZX0gZnJvbSAnLi4vU3RhdGUnO1xuaW1wb3J0IHtRTmFtZX0gZnJvbSAnLi4vUU5hbWUnO1xuaW1wb3J0ICogYXMgdHlwZXMgZnJvbSAnLi4vdHlwZXMnO1xuXG4vKiogPHhzZDphdHRyaWJ1dGVHcm91cD5cbiAgKiBEZWZpbmVzIHNldmVyYWwgYXR0cmlidXRlcyB0aGF0IGNhbiBiZSBpbmNsdWRlZCB0b2dldGhlciBpbiB0eXBlIGRlZmluaXRpb25zLiAqL1xuXG5leHBvcnQgY2xhc3MgQXR0cmlidXRlR3JvdXAgZXh0ZW5kcyB0eXBlcy5CYXNlIHtcblx0c3RhdGljIG1heUNvbnRhaW46ICgpID0+IHR5cGVzLkJhc2VDbGFzc1tdID0gKCkgPT4gW1xuXHRcdHR5cGVzLkFubm90YXRpb24sXG5cdFx0dHlwZXMuQXR0cmlidXRlLFxuXHRcdEF0dHJpYnV0ZUdyb3VwXG5cdF07XG5cblx0aW5pdChzdGF0ZTogU3RhdGUpIHtcblx0XHR0aGlzLmRlZmluZShzdGF0ZSwgJ2F0dHJpYnV0ZUdyb3VwJywgMCwgMCk7XG5cdH1cblxuXHRyZXNvbHZlKHN0YXRlOiBTdGF0ZSkge1xuXHRcdHZhciBhdHRyaWJ1dGVHcm91cDogQXR0cmlidXRlR3JvdXAgPSB0aGlzO1xuXG5cdFx0aWYodGhpcy5yZWYpIHtcblx0XHRcdHZhciByZWYgPSBuZXcgUU5hbWUodGhpcy5yZWYsIHN0YXRlLnNvdXJjZSk7XG5cdFx0XHRhdHRyaWJ1dGVHcm91cCA9IHRoaXMuc2NvcGUubG9va3VwKHJlZiwgJ2F0dHJpYnV0ZUdyb3VwJykgYXMgQXR0cmlidXRlR3JvdXA7XG5cdFx0fVxuXG5cdFx0Ly8gTmFtZWQgYXR0cmlidXRlIGdyb3VwcyBhcmUgb25seSBtb2RlbHMgZm9yIHJlZmVyZW5jaW5nIGVsc2V3aGVyZS5cblxuXHRcdGlmKCF0aGlzLm5hbWUpIHtcblx0XHRcdGlmKGF0dHJpYnV0ZUdyb3VwKSB7XG5cdFx0XHRcdC8vIGlmKGF0dHJpYnV0ZUdyb3VwICE9IHRoaXMgJiYgIWF0dHJpYnV0ZUdyb3VwLnJlc29sdmVkKSBjb25zb2xlLmxvZygnT0ggTk9FUyEgQXR0cmlidXRlR3JvdXAgJyArIGF0dHJpYnV0ZUdyb3VwLm5hbWUpO1xuXHRcdFx0XHQvLyBhdHRyaWJ1dGVHcm91cC5zY29wZS5hZGRBbGxUb1BhcmVudCgnYXR0cmlidXRlJywgMSwgMSwgdGhpcy5zY29wZSk7XG5cdFx0XHRcdGF0dHJpYnV0ZUdyb3VwLmRlZmluZShzdGF0ZSwgJ2F0dHJpYnV0ZUdyb3VwJywgMSwgMSwgdGhpcy5zY29wZSk7XG5cdFx0XHR9IGVsc2UgdGhyb3cgbmV3IHR5cGVzLk1pc3NpbmdSZWZlcmVuY2VFcnJvcignYXR0cmlidXRlR3JvdXAnLCByZWYpO1xuXHRcdH1cblx0fVxuXG5cdGlkOiBzdHJpbmcgPSBudWxsO1xuXHRuYW1lOiBzdHJpbmcgPSBudWxsO1xuXHRyZWY6IHN0cmluZyA9IG51bGw7XG59XG4iXX0=