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
exports.TypeBase = void 0;
var Base_1 = require("./Base");
var schema = require("../../schema");
var TypeBase = /** @class */ (function (_super) {
    __extends(TypeBase, _super);
    function TypeBase() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.id = null;
        _this.name = null;
        return _this;
    }
    TypeBase.prototype.init = function (state) {
        if (!this.scope)
            this.scope = state.getScope();
        this.qName = this.define(state, "type");
        // Set type of parent element, in case it has none.
        this.scope.setParentType(this);
        // Add reference from current scope to allow naming nested anonymous types.
        this.scope.setType(this);
        this.surrogateKey = TypeBase.nextKey++;
    };
    TypeBase.prototype.getOutType = function (schemaContext) {
        var outType = this.outType;
        if (!outType) {
            outType = new schema.Type(this.name);
            if (this.scope) {
                schemaContext.copyNamespace(this.scope.namespace).addType(outType);
            }
            this.outType = outType;
        }
        return outType;
    };
    /** Find parent type inheriting from a base type. */
    TypeBase.prototype.getParent = function (base, breakAtContent) {
        var next = this;
        var typ;
        /** Maximum iterations in case type inheritance forms a loop. */
        var iter = 100;
        while (--iter) {
            typ = next;
            if (!(typ instanceof TypeBase)) {
                break;
            }
            else if (typ instanceof base) {
                return typ;
            }
            else if (breakAtContent &&
                typ.scope &&
                (typ.scope.dumpTypes("attribute") ||
                    typ.scope.dumpTypes("attributeGroup"))) {
                break;
            }
            else {
                next = typ.parent;
            }
        }
        return null;
    };
    TypeBase.prototype.getListType = function () {
        var next = this;
        var type;
        /** Maximum iterations in case type inheritance forms a loop. */
        var iter = 100;
        while (--iter) {
            type = next;
            if (!(type instanceof TypeBase))
                break;
            else {
                var listType = type.scope && type.scope.dumpTypes("list");
                if (listType)
                    return listType;
                else
                    next = type.parent;
            }
        }
        return null;
    };
    TypeBase.nextKey = 0;
    return TypeBase;
}(Base_1.Base));
exports.TypeBase = TypeBase;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVHlwZUJhc2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wYXJzZXJfc2NhZmZvbGRfZ2VuZXJhdG9yL3NyYy94c2QvdHlwZXMvVHlwZUJhc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLG9FQUFvRTtBQUNwRSwrQ0FBK0M7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUUvQywrQkFBeUM7QUFJekMscUNBQXVDO0FBRXZDO0lBQThCLDRCQUFJO0lBQWxDO1FBQUEscUVBNEZDO1FBYkMsUUFBRSxHQUFXLElBQUksQ0FBQztRQUNsQixVQUFJLEdBQVcsSUFBSSxDQUFDOztJQVl0QixDQUFDO0lBM0ZDLHVCQUFJLEdBQUosVUFBSyxLQUFZO1FBQ2YsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLO1lBQUUsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUM7UUFFL0MsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQztRQUN4QyxtREFBbUQ7UUFDbkQsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDL0IsMkVBQTJFO1FBQzNFLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3pCLElBQUksQ0FBQyxZQUFZLEdBQUcsUUFBUSxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ3pDLENBQUM7SUFFRCw2QkFBVSxHQUFWLFVBQVcsYUFBNkI7UUFDdEMsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUUzQixJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ1osT0FBTyxHQUFHLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFFckMsSUFBSSxJQUFJLENBQUMsS0FBSyxFQUFFO2dCQUNkLGFBQWEsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7YUFDcEU7WUFFRCxJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztTQUN4QjtRQUVELE9BQU8sT0FBTyxDQUFDO0lBQ2pCLENBQUM7SUFFRCxvREFBb0Q7SUFFcEQsNEJBQVMsR0FBVCxVQUFVLElBQWUsRUFBRSxjQUF1QjtRQUNoRCxJQUFJLElBQUksR0FBcUIsSUFBSSxDQUFDO1FBQ2xDLElBQUksR0FBcUIsQ0FBQztRQUMxQixnRUFBZ0U7UUFDaEUsSUFBSSxJQUFJLEdBQUcsR0FBRyxDQUFDO1FBRWYsT0FBTyxFQUFFLElBQUksRUFBRTtZQUNiLEdBQUcsR0FBRyxJQUFJLENBQUM7WUFFWCxJQUFJLENBQUMsQ0FBQyxHQUFHLFlBQVksUUFBUSxDQUFDLEVBQUU7Z0JBQzlCLE1BQU07YUFDUDtpQkFBTSxJQUFJLEdBQUcsWUFBWSxJQUFJLEVBQUU7Z0JBQzlCLE9BQU8sR0FBRyxDQUFDO2FBQ1o7aUJBQU0sSUFDTCxjQUFjO2dCQUNaLEdBQXVCLENBQUMsS0FBSztnQkFDL0IsQ0FBRyxHQUF1QixDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDO29CQUNuRCxHQUF1QixDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxFQUM5RDtnQkFDQSxNQUFNO2FBQ1A7aUJBQU07Z0JBQ0wsSUFBSSxHQUFLLEdBQXVCLENBQUMsTUFBTSxDQUFDO2FBQ3pDO1NBQ0Y7UUFFRCxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFFRCw4QkFBVyxHQUFYO1FBQ0UsSUFBSSxJQUFJLEdBQXFCLElBQUksQ0FBQztRQUNsQyxJQUFJLElBQXNCLENBQUM7UUFDM0IsZ0VBQWdFO1FBQ2hFLElBQUksSUFBSSxHQUFHLEdBQUcsQ0FBQztRQUVmLE9BQU8sRUFBRSxJQUFJLEVBQUU7WUFDYixJQUFJLEdBQUcsSUFBSSxDQUFDO1lBRVosSUFBSSxDQUFDLENBQUMsSUFBSSxZQUFZLFFBQVEsQ0FBQztnQkFBRSxNQUFNO2lCQUNsQztnQkFDSCxJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUUxRCxJQUFJLFFBQVE7b0JBQUUsT0FBTyxRQUFRLENBQUM7O29CQUN6QixJQUFJLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQzthQUN6QjtTQUNGO1FBRUQsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBU2MsZ0JBQU8sR0FBRyxDQUFDLENBQUM7SUFNN0IsZUFBQztDQUFBLEFBNUZELENBQThCLFdBQUksR0E0RmpDO0FBNUZZLDRCQUFRIiwic291cmNlc0NvbnRlbnQiOlsiLy8gVGhpcyBmaWxlIGlzIHBhcnQgb2YgY3hzZCwgY29weXJpZ2h0IChjKSAyMDE1LTIwMTYgQnVzRmFzdGVyIEx0ZC5cbi8vIFJlbGVhc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSwgc2VlIExJQ0VOU0UuXG5cbmltcG9ydCB7IEJhc2UsIEJhc2VDbGFzcyB9IGZyb20gXCIuL0Jhc2VcIjtcbmltcG9ydCB7IFN0YXRlIH0gZnJvbSBcIi4uL1N0YXRlXCI7XG5pbXBvcnQgeyBRTmFtZSB9IGZyb20gXCIuLi9RTmFtZVwiO1xuaW1wb3J0IHsgTmFtZWRUeXBlTWVtYmVyIH0gZnJvbSBcIi4uL1Njb3BlXCI7XG5pbXBvcnQgKiBhcyBzY2hlbWEgZnJvbSBcIi4uLy4uL3NjaGVtYVwiO1xuXG5leHBvcnQgY2xhc3MgVHlwZUJhc2UgZXh0ZW5kcyBCYXNlIHtcbiAgaW5pdChzdGF0ZTogU3RhdGUpIHtcbiAgICBpZiAoIXRoaXMuc2NvcGUpIHRoaXMuc2NvcGUgPSBzdGF0ZS5nZXRTY29wZSgpO1xuXG4gICAgdGhpcy5xTmFtZSA9IHRoaXMuZGVmaW5lKHN0YXRlLCBcInR5cGVcIik7XG4gICAgLy8gU2V0IHR5cGUgb2YgcGFyZW50IGVsZW1lbnQsIGluIGNhc2UgaXQgaGFzIG5vbmUuXG4gICAgdGhpcy5zY29wZS5zZXRQYXJlbnRUeXBlKHRoaXMpO1xuICAgIC8vIEFkZCByZWZlcmVuY2UgZnJvbSBjdXJyZW50IHNjb3BlIHRvIGFsbG93IG5hbWluZyBuZXN0ZWQgYW5vbnltb3VzIHR5cGVzLlxuICAgIHRoaXMuc2NvcGUuc2V0VHlwZSh0aGlzKTtcbiAgICB0aGlzLnN1cnJvZ2F0ZUtleSA9IFR5cGVCYXNlLm5leHRLZXkrKztcbiAgfVxuXG4gIGdldE91dFR5cGUoc2NoZW1hQ29udGV4dDogc2NoZW1hLkNvbnRleHQpOiBzY2hlbWEuVHlwZSB7XG4gICAgdmFyIG91dFR5cGUgPSB0aGlzLm91dFR5cGU7XG5cbiAgICBpZiAoIW91dFR5cGUpIHtcbiAgICAgIG91dFR5cGUgPSBuZXcgc2NoZW1hLlR5cGUodGhpcy5uYW1lKTtcblxuICAgICAgaWYgKHRoaXMuc2NvcGUpIHtcbiAgICAgICAgc2NoZW1hQ29udGV4dC5jb3B5TmFtZXNwYWNlKHRoaXMuc2NvcGUubmFtZXNwYWNlKS5hZGRUeXBlKG91dFR5cGUpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLm91dFR5cGUgPSBvdXRUeXBlO1xuICAgIH1cblxuICAgIHJldHVybiBvdXRUeXBlO1xuICB9XG5cbiAgLyoqIEZpbmQgcGFyZW50IHR5cGUgaW5oZXJpdGluZyBmcm9tIGEgYmFzZSB0eXBlLiAqL1xuXG4gIGdldFBhcmVudChiYXNlOiBCYXNlQ2xhc3MsIGJyZWFrQXRDb250ZW50OiBib29sZWFuKSB7XG4gICAgdmFyIG5leHQ6IFR5cGVCYXNlIHwgUU5hbWUgPSB0aGlzO1xuICAgIHZhciB0eXA6IFR5cGVCYXNlIHwgUU5hbWU7XG4gICAgLyoqIE1heGltdW0gaXRlcmF0aW9ucyBpbiBjYXNlIHR5cGUgaW5oZXJpdGFuY2UgZm9ybXMgYSBsb29wLiAqL1xuICAgIHZhciBpdGVyID0gMTAwO1xuXG4gICAgd2hpbGUgKC0taXRlcikge1xuICAgICAgdHlwID0gbmV4dDtcblxuICAgICAgaWYgKCEodHlwIGluc3RhbmNlb2YgVHlwZUJhc2UpKSB7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfSBlbHNlIGlmICh0eXAgaW5zdGFuY2VvZiBiYXNlKSB7XG4gICAgICAgIHJldHVybiB0eXA7XG4gICAgICB9IGVsc2UgaWYgKFxuICAgICAgICBicmVha0F0Q29udGVudCAmJlxuICAgICAgICAoKHR5cCBhcyB1bmtub3duKSBhcyBhbnkpLnNjb3BlICYmXG4gICAgICAgICgoKHR5cCBhcyB1bmtub3duKSBhcyBhbnkpLnNjb3BlLmR1bXBUeXBlcyhcImF0dHJpYnV0ZVwiKSB8fFxuICAgICAgICAgICgodHlwIGFzIHVua25vd24pIGFzIGFueSkuc2NvcGUuZHVtcFR5cGVzKFwiYXR0cmlidXRlR3JvdXBcIikpXG4gICAgICApIHtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBuZXh0ID0gKCh0eXAgYXMgdW5rbm93bikgYXMgYW55KS5wYXJlbnQ7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBnZXRMaXN0VHlwZSgpIHtcbiAgICB2YXIgbmV4dDogVHlwZUJhc2UgfCBRTmFtZSA9IHRoaXM7XG4gICAgdmFyIHR5cGU6IFR5cGVCYXNlIHwgUU5hbWU7XG4gICAgLyoqIE1heGltdW0gaXRlcmF0aW9ucyBpbiBjYXNlIHR5cGUgaW5oZXJpdGFuY2UgZm9ybXMgYSBsb29wLiAqL1xuICAgIHZhciBpdGVyID0gMTAwO1xuXG4gICAgd2hpbGUgKC0taXRlcikge1xuICAgICAgdHlwZSA9IG5leHQ7XG5cbiAgICAgIGlmICghKHR5cGUgaW5zdGFuY2VvZiBUeXBlQmFzZSkpIGJyZWFrO1xuICAgICAgZWxzZSB7XG4gICAgICAgIHZhciBsaXN0VHlwZSA9IHR5cGUuc2NvcGUgJiYgdHlwZS5zY29wZS5kdW1wVHlwZXMoXCJsaXN0XCIpO1xuXG4gICAgICAgIGlmIChsaXN0VHlwZSkgcmV0dXJuIGxpc3RUeXBlO1xuICAgICAgICBlbHNlIG5leHQgPSB0eXBlLnBhcmVudDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIGlkOiBzdHJpbmcgPSBudWxsO1xuICBuYW1lOiBzdHJpbmcgPSBudWxsO1xuXG4gIC8vIEludGVybmFsbHkgdXNlZCBtZW1iZXJzXG4gIHBhcmVudDogVHlwZUJhc2UgfCBRTmFtZTtcbiAgcU5hbWU6IFFOYW1lO1xuICBzdXJyb2dhdGVLZXk6IG51bWJlcjtcbiAgcHJpdmF0ZSBzdGF0aWMgbmV4dEtleSA9IDA7XG5cbiAgb3V0VHlwZTogc2NoZW1hLlR5cGU7XG5cbiAgLy8gVE9ETzogcmVtb3ZlIHRoaXMgYW5kIGRldGVjdCBjaXJjdWxhciB0eXBlcyAoYW5vbnltb3VzIHR5cGVzIGluc2lkZSBlbGVtZW50cyByZWZlcmVuY2luZyB0aGUgc2FtZSBlbGVtZW50KSBiZWZvcmUgZXhwb3J0aW5nLlxuICBleHBvcnRlZDogYm9vbGVhbjtcbn1cbiJdfQ==