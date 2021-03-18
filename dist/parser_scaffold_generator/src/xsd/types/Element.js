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
exports.Element = void 0;
var QName_1 = require("../QName");
var MemberBase_1 = require("./MemberBase");
var types = require("../types");
/** <xsd:element> */
var Element = /** @class */ (function (_super) {
    __extends(Element, _super);
    function Element() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.minOccurs = "1";
        _this.maxOccurs = "1";
        _this.default = null;
        /** Abstract elements are disallowed in the XML document,
          * and another member of the same substitution group should be used. */
        _this.abstract = null; // boolean
        _this.substitutionGroup = null;
        return _this;
    }
    Element.prototype.init = function (state) {
        this.min = +this.minOccurs;
        if (this.maxOccurs == 'unbounded')
            this.max = Infinity;
        else
            this.max = +this.maxOccurs;
        this.define(state, 'element', this.min, this.max);
    };
    Element.prototype.resolve = function (state) {
        var element = this.resolveMember(state, 'element');
        if (this.substitutionGroup) {
            // Add this as an alternative to the substitution group base element.
            var ref = new QName_1.QName(this.substitutionGroup, state.source);
            var groupBase = this.scope.lookup(ref, 'element');
            if (!groupBase)
                throw new types.MissingReferenceError('element', ref);
            this.substitutes = groupBase;
            groupBase.isSubstituted = true;
        }
    };
    Element.prototype.isAbstract = function () {
        return (this.abstract == 'true' || this.abstract == '1');
    };
    Element.mayContain = function () { return [
        types.Annotation,
        types.SimpleType,
        types.ComplexType
    ]; };
    return Element;
}(MemberBase_1.MemberBase));
exports.Element = Element;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRWxlbWVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3BhcnNlcl9zY2FmZm9sZF9nZW5lcmF0b3Ivc3JjL3hzZC90eXBlcy9FbGVtZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxvRUFBb0U7QUFDcEUsK0NBQStDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFHL0Msa0NBQStCO0FBQy9CLDJDQUF3QztBQUV4QyxnQ0FBa0M7QUFXbEMsb0JBQW9CO0FBRXBCO0lBQTZCLDJCQUFVO0lBQXZDO1FBQUEscUVBOENDO1FBWkEsZUFBUyxHQUFXLEdBQUcsQ0FBQztRQUN4QixlQUFTLEdBQVcsR0FBRyxDQUFDO1FBRXhCLGFBQU8sR0FBVyxJQUFJLENBQUM7UUFFdkI7Z0ZBQ3dFO1FBQ3hFLGNBQVEsR0FBVyxJQUFJLENBQUMsQ0FBQyxVQUFVO1FBQ25DLHVCQUFpQixHQUFXLElBQUksQ0FBQzs7SUFJbEMsQ0FBQztJQXZDQSxzQkFBSSxHQUFKLFVBQUssS0FBWTtRQUNoQixJQUFJLENBQUMsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQztRQUMzQixJQUFHLElBQUksQ0FBQyxTQUFTLElBQUksV0FBVztZQUFFLElBQUksQ0FBQyxHQUFHLEdBQUcsUUFBUSxDQUFDOztZQUNqRCxJQUFJLENBQUMsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQztRQUVoQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxTQUFTLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDbkQsQ0FBQztJQUVELHlCQUFPLEdBQVAsVUFBUSxLQUFZO1FBQ25CLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLFNBQVMsQ0FBWSxDQUFDO1FBRTlELElBQUcsSUFBSSxDQUFDLGlCQUFpQixFQUFFO1lBQzFCLHFFQUFxRTtZQUNyRSxJQUFJLEdBQUcsR0FBRyxJQUFJLGFBQUssQ0FBQyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQzFELElBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxTQUFTLENBQVksQ0FBQztZQUU3RCxJQUFHLENBQUMsU0FBUztnQkFBRSxNQUFNLElBQUksS0FBSyxDQUFDLHFCQUFxQixDQUFDLFNBQVMsRUFBRSxHQUFHLENBQUMsQ0FBQztZQUVyRSxJQUFJLENBQUMsV0FBVyxHQUFHLFNBQVMsQ0FBQztZQUM3QixTQUFTLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQztTQUMvQjtJQUNGLENBQUM7SUFFRCw0QkFBVSxHQUFWO1FBQ0MsT0FBTSxDQUFDLElBQUksQ0FBQyxRQUFRLElBQUksTUFBTSxJQUFJLElBQUksQ0FBQyxRQUFRLElBQUksR0FBRyxDQUFDLENBQUM7SUFDekQsQ0FBQztJQS9CTSxrQkFBVSxHQUE0QixjQUFNLE9BQUE7UUFDbEQsS0FBSyxDQUFDLFVBQVU7UUFDaEIsS0FBSyxDQUFDLFVBQVU7UUFDaEIsS0FBSyxDQUFDLFdBQVc7S0FDakIsRUFKa0QsQ0FJbEQsQ0FBQztJQXlDSCxjQUFDO0NBQUEsQUE5Q0QsQ0FBNkIsdUJBQVUsR0E4Q3RDO0FBOUNZLDBCQUFPIiwic291cmNlc0NvbnRlbnQiOlsiLy8gVGhpcyBmaWxlIGlzIHBhcnQgb2YgY3hzZCwgY29weXJpZ2h0IChjKSAyMDE1LTIwMTYgQnVzRmFzdGVyIEx0ZC5cbi8vIFJlbGVhc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSwgc2VlIExJQ0VOU0UuXG5cbmltcG9ydCB7U3RhdGV9IGZyb20gJy4uL1N0YXRlJztcbmltcG9ydCB7UU5hbWV9IGZyb20gJy4uL1FOYW1lJztcbmltcG9ydCB7TWVtYmVyQmFzZX0gZnJvbSAnLi9NZW1iZXJCYXNlJztcbmltcG9ydCB7VHlwZUJhc2V9IGZyb20gJy4vVHlwZUJhc2UnO1xuaW1wb3J0ICogYXMgdHlwZXMgZnJvbSAnLi4vdHlwZXMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIEVsZW1lbnRMaWtlIHtcblx0aWQ6IHN0cmluZztcblx0bWluT2NjdXJzOiBzdHJpbmc7XG5cdG1heE9jY3Vyczogc3RyaW5nO1xuXG5cdG1pbjogbnVtYmVyO1xuXHRtYXg6IG51bWJlcjtcbn1cblxuLyoqIDx4c2Q6ZWxlbWVudD4gKi9cblxuZXhwb3J0IGNsYXNzIEVsZW1lbnQgZXh0ZW5kcyBNZW1iZXJCYXNlIGltcGxlbWVudHMgRWxlbWVudExpa2Uge1xuXHRzdGF0aWMgbWF5Q29udGFpbjogKCkgPT4gdHlwZXMuQmFzZUNsYXNzW10gPSAoKSA9PiBbXG5cdFx0dHlwZXMuQW5ub3RhdGlvbixcblx0XHR0eXBlcy5TaW1wbGVUeXBlLFxuXHRcdHR5cGVzLkNvbXBsZXhUeXBlXG5cdF07XG5cblx0aW5pdChzdGF0ZTogU3RhdGUpIHtcblx0XHR0aGlzLm1pbiA9ICt0aGlzLm1pbk9jY3Vycztcblx0XHRpZih0aGlzLm1heE9jY3VycyA9PSAndW5ib3VuZGVkJykgdGhpcy5tYXggPSBJbmZpbml0eTtcblx0XHRlbHNlIHRoaXMubWF4ID0gK3RoaXMubWF4T2NjdXJzO1xuXG5cdFx0dGhpcy5kZWZpbmUoc3RhdGUsICdlbGVtZW50JywgdGhpcy5taW4sIHRoaXMubWF4KTtcblx0fVxuXG5cdHJlc29sdmUoc3RhdGU6IFN0YXRlKSB7XG5cdFx0dmFyIGVsZW1lbnQgPSB0aGlzLnJlc29sdmVNZW1iZXIoc3RhdGUsICdlbGVtZW50JykgYXMgRWxlbWVudDtcblxuXHRcdGlmKHRoaXMuc3Vic3RpdHV0aW9uR3JvdXApIHtcblx0XHRcdC8vIEFkZCB0aGlzIGFzIGFuIGFsdGVybmF0aXZlIHRvIHRoZSBzdWJzdGl0dXRpb24gZ3JvdXAgYmFzZSBlbGVtZW50LlxuXHRcdFx0dmFyIHJlZiA9IG5ldyBRTmFtZSh0aGlzLnN1YnN0aXR1dGlvbkdyb3VwLCBzdGF0ZS5zb3VyY2UpO1xuXHRcdFx0dmFyIGdyb3VwQmFzZSA9IHRoaXMuc2NvcGUubG9va3VwKHJlZiwgJ2VsZW1lbnQnKSBhcyBFbGVtZW50O1xuXG5cdFx0XHRpZighZ3JvdXBCYXNlKSB0aHJvdyBuZXcgdHlwZXMuTWlzc2luZ1JlZmVyZW5jZUVycm9yKCdlbGVtZW50JywgcmVmKTtcblxuXHRcdFx0dGhpcy5zdWJzdGl0dXRlcyA9IGdyb3VwQmFzZTtcblx0XHRcdGdyb3VwQmFzZS5pc1N1YnN0aXR1dGVkID0gdHJ1ZTtcblx0XHR9XG5cdH1cblxuXHRpc0Fic3RyYWN0KCkge1xuXHRcdHJldHVybih0aGlzLmFic3RyYWN0ID09ICd0cnVlJyB8fCB0aGlzLmFic3RyYWN0ID09ICcxJyk7XG5cdH1cblxuXHRtaW5PY2N1cnM6IHN0cmluZyA9IFwiMVwiO1xuXHRtYXhPY2N1cnM6IHN0cmluZyA9IFwiMVwiO1xuXG5cdGRlZmF1bHQ6IHN0cmluZyA9IG51bGw7XG5cblx0LyoqIEFic3RyYWN0IGVsZW1lbnRzIGFyZSBkaXNhbGxvd2VkIGluIHRoZSBYTUwgZG9jdW1lbnQsXG5cdCAgKiBhbmQgYW5vdGhlciBtZW1iZXIgb2YgdGhlIHNhbWUgc3Vic3RpdHV0aW9uIGdyb3VwIHNob3VsZCBiZSB1c2VkLiAqL1xuXHRhYnN0cmFjdDogc3RyaW5nID0gbnVsbDsgLy8gYm9vbGVhblxuXHRzdWJzdGl0dXRpb25Hcm91cDogc3RyaW5nID0gbnVsbDtcblxuXHRzdWJzdGl0dXRlczogRWxlbWVudDtcblx0aXNTdWJzdGl0dXRlZDogYm9vbGVhbjtcbn1cbiJdfQ==