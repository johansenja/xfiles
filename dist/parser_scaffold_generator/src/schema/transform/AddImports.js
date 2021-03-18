"use strict";
// This file is part of cxsd, copyright (c) 2016 BusFaster Ltd.
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
exports.AddImports = void 0;
var Transform_1 = require("./Transform");
var AddImports = /** @class */ (function (_super) {
    __extends(AddImports, _super);
    function AddImports() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.construct = AddImports;
        _this.output = {};
        return _this;
    }
    AddImports.prototype.prepare = function () {
        this.visitType(this.doc);
        for (var _i = 0, _a = this.namespace.typeList; _i < _a.length; _i++) {
            var type = _a[_i];
            if (type)
                this.visitType(type);
        }
        this.namespace.importContentTbl = this.output;
        return (this.output);
    };
    /** Replace imported type and member IDs with sanitized names. */
    AddImports.prototype.finish = function (result) {
        for (var _i = 0, result_1 = result; _i < result_1.length; _i++) {
            var namespaceTbl = result_1[_i];
            for (var _a = 0, _b = Object.keys(namespaceTbl); _a < _b.length; _a++) {
                var namespaceId = _b[_a];
                var output = {
                    typeTbl: {},
                    memberTbl: {}
                };
                var typeTbl = namespaceTbl[namespaceId].typeTbl;
                for (var _c = 0, _d = Object.keys(typeTbl); _c < _d.length; _c++) {
                    var key = _d[_c];
                    var type = typeTbl[key];
                    output.typeTbl[type.safeName] = type;
                }
                var memberTbl = namespaceTbl[namespaceId].memberTbl;
                for (var _e = 0, _f = Object.keys(memberTbl); _e < _f.length; _e++) {
                    var key = _f[_e];
                    var member = memberTbl[key];
                    // Use name instead of safeName, because the latter may
                    // randomly differ between different containing types due to
                    // naming collisions (for example between attribute and element).
                    output.memberTbl[member.name] = member;
                }
                namespaceTbl[namespaceId] = output;
            }
        }
    };
    AddImports.prototype.addRef = function (namespace, member, type) {
        if (namespace && namespace != this.namespace) {
            // Type and/or member from another, imported namespace.
            // Make sure it gets exported.
            if (type)
                type.isExported = true;
            if (member)
                member.isExported = true;
            var id = namespace.id;
            var short = this.namespace.getShortRef(id);
            if (!short) {
                short = (member && member.namespace.getShortRef(id)) || namespace.short;
                if (short)
                    this.namespace.addRef(short, namespace);
            }
            if (short) {
                if (!this.output[id]) {
                    this.output[id] = {
                        typeTbl: {},
                        memberTbl: {}
                    };
                }
                if (type && type.namespace == namespace) {
                    this.output[id].typeTbl[type.surrogateKey] = type;
                }
                if (member && member.namespace == namespace) {
                    this.output[id].memberTbl[member.surrogateKey] = member;
                }
            }
        }
    };
    AddImports.prototype.visitMember = function (member) {
        this.addRef(member.namespace, member);
        if (member.substitutes)
            this.addRef(member.substitutes.namespace, member.substitutes);
        for (var _i = 0, _a = member.typeList; _i < _a.length; _i++) {
            var type = _a[_i];
            this.addRef(type.namespace, member, type);
        }
    };
    AddImports.prototype.visitType = function (type) {
        // Types holding primitives should inherit from them.
        // NOTE: This makes base primitive types inherit themselves.
        if (type.primitiveType && !type.parent)
            type.parent = type.primitiveType;
        if (type.parent)
            this.addRef(type.parent.namespace, null, type.parent);
        for (var _i = 0, _a = this.getTypeMembers(type); _i < _a.length; _i++) {
            var member = _a[_i];
            this.visitMember(member.member);
        }
    };
    return AddImports;
}(Transform_1.Transform));
exports.AddImports = AddImports;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQWRkSW1wb3J0cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3BhcnNlcl9zY2FmZm9sZF9nZW5lcmF0b3Ivc3JjL3NjaGVtYS90cmFuc2Zvcm0vQWRkSW1wb3J0cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsK0RBQStEO0FBQy9ELCtDQUErQzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBTS9DLHlDQUFzQztBQUl0QztJQUFnQyw4QkFBbUM7SUFBbkU7UUFBQSxxRUFvR0M7UUFGQSxlQUFTLEdBQUcsVUFBVSxDQUFDO1FBQ3ZCLFlBQU0sR0FBVyxFQUFFLENBQUM7O0lBQ3JCLENBQUM7SUFuR0EsNEJBQU8sR0FBUDtRQUNDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRXpCLEtBQWdCLFVBQXVCLEVBQXZCLEtBQUEsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQXZCLGNBQXVCLEVBQXZCLElBQXVCLEVBQUU7WUFBckMsSUFBSSxJQUFJLFNBQUE7WUFDWCxJQUFHLElBQUk7Z0JBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUM5QjtRQUVELElBQUksQ0FBQyxTQUFTLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUU5QyxPQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3JCLENBQUM7SUFFRCxpRUFBaUU7SUFDakUsMkJBQU0sR0FBTixVQUFPLE1BQWdCO1FBQ3RCLEtBQXdCLFVBQU0sRUFBTixpQkFBTSxFQUFOLG9CQUFNLEVBQU4sSUFBTSxFQUFFO1lBQTVCLElBQUksWUFBWSxlQUFBO1lBQ25CLEtBQXVCLFVBQXlCLEVBQXpCLEtBQUEsTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBekIsY0FBeUIsRUFBekIsSUFBeUIsRUFBRTtnQkFBOUMsSUFBSSxXQUFXLFNBQUE7Z0JBQ2xCLElBQUksTUFBTSxHQUFrQjtvQkFDM0IsT0FBTyxFQUFFLEVBQUU7b0JBQ1gsU0FBUyxFQUFFLEVBQUU7aUJBQ2IsQ0FBQztnQkFFRixJQUFJLE9BQU8sR0FBRyxZQUFZLENBQUMsV0FBVyxDQUFDLENBQUMsT0FBTyxDQUFDO2dCQUVoRCxLQUFlLFVBQW9CLEVBQXBCLEtBQUEsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBcEIsY0FBb0IsRUFBcEIsSUFBb0IsRUFBRTtvQkFBakMsSUFBSSxHQUFHLFNBQUE7b0JBQ1YsSUFBSSxJQUFJLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUN4QixNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxJQUFJLENBQUM7aUJBQ3JDO2dCQUVELElBQUksU0FBUyxHQUFHLFlBQVksQ0FBQyxXQUFXLENBQUMsQ0FBQyxTQUFTLENBQUM7Z0JBRXBELEtBQWUsVUFBc0IsRUFBdEIsS0FBQSxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUF0QixjQUFzQixFQUF0QixJQUFzQixFQUFFO29CQUFuQyxJQUFJLEdBQUcsU0FBQTtvQkFDVixJQUFJLE1BQU0sR0FBRyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBQzVCLHVEQUF1RDtvQkFDdkQsNERBQTREO29CQUM1RCxpRUFBaUU7b0JBQ2pFLE1BQU0sQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLE1BQU0sQ0FBQztpQkFDdkM7Z0JBRUQsWUFBWSxDQUFDLFdBQVcsQ0FBQyxHQUFHLE1BQU0sQ0FBQzthQUNuQztTQUNEO0lBQ0YsQ0FBQztJQUVELDJCQUFNLEdBQU4sVUFBTyxTQUFvQixFQUFFLE1BQWUsRUFBRSxJQUFXO1FBQ3hELElBQUcsU0FBUyxJQUFJLFNBQVMsSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFO1lBQzVDLHVEQUF1RDtZQUV2RCw4QkFBOEI7WUFDOUIsSUFBRyxJQUFJO2dCQUFFLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO1lBQ2hDLElBQUcsTUFBTTtnQkFBRSxNQUFNLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztZQUVwQyxJQUFJLEVBQUUsR0FBRyxTQUFTLENBQUMsRUFBRSxDQUFDO1lBQ3RCLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBRTNDLElBQUcsQ0FBQyxLQUFLLEVBQUU7Z0JBQ1YsS0FBSyxHQUFHLENBQUMsTUFBTSxJQUFJLE1BQU0sQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksU0FBUyxDQUFDLEtBQUssQ0FBQztnQkFFeEUsSUFBRyxLQUFLO29CQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxTQUFTLENBQUMsQ0FBQzthQUNsRDtZQUVELElBQUcsS0FBSyxFQUFFO2dCQUNULElBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxFQUFFO29CQUNwQixJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxHQUFHO3dCQUNqQixPQUFPLEVBQUUsRUFBRTt3QkFDWCxTQUFTLEVBQUUsRUFBRTtxQkFDYixDQUFDO2lCQUNGO2dCQUVELElBQUcsSUFBSSxJQUFJLElBQUksQ0FBQyxTQUFTLElBQUksU0FBUyxFQUFFO29CQUN2QyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsSUFBSSxDQUFDO2lCQUNsRDtnQkFFRCxJQUFHLE1BQU0sSUFBSSxNQUFNLENBQUMsU0FBUyxJQUFJLFNBQVMsRUFBRTtvQkFDM0MsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxHQUFHLE1BQU0sQ0FBQztpQkFDeEQ7YUFDRDtTQUNEO0lBQ0YsQ0FBQztJQUVELGdDQUFXLEdBQVgsVUFBWSxNQUFjO1FBQ3pCLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUV0QyxJQUFHLE1BQU0sQ0FBQyxXQUFXO1lBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLFNBQVMsRUFBRSxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUM7UUFFckYsS0FBZ0IsVUFBZSxFQUFmLEtBQUEsTUFBTSxDQUFDLFFBQVEsRUFBZixjQUFlLEVBQWYsSUFBZTtZQUEzQixJQUFJLElBQUksU0FBQTtZQUFxQixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO1NBQUE7SUFDNUUsQ0FBQztJQUVELDhCQUFTLEdBQVQsVUFBVSxJQUFVO1FBQ25CLHFEQUFxRDtRQUNyRCw0REFBNEQ7UUFDNUQsSUFBRyxJQUFJLENBQUMsYUFBYSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU07WUFBRSxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUM7UUFFeEUsSUFBRyxJQUFJLENBQUMsTUFBTTtZQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUV0RSxLQUFrQixVQUF5QixFQUF6QixLQUFBLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEVBQXpCLGNBQXlCLEVBQXpCLElBQXlCO1lBQXZDLElBQUksTUFBTSxTQUFBO1lBQStCLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQUE7SUFDOUUsQ0FBQztJQUlGLGlCQUFDO0FBQUQsQ0FBQyxBQXBHRCxDQUFnQyxxQkFBUyxHQW9HeEM7QUFwR1ksZ0NBQVUiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBUaGlzIGZpbGUgaXMgcGFydCBvZiBjeHNkLCBjb3B5cmlnaHQgKGMpIDIwMTYgQnVzRmFzdGVyIEx0ZC5cbi8vIFJlbGVhc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSwgc2VlIExJQ0VOU0UuXG5cbmltcG9ydCB7TmFtZXNwYWNlLCBJbXBvcnRDb250ZW50fSBmcm9tICcuLi9OYW1lc3BhY2UnO1xuaW1wb3J0IHtUeXBlfSBmcm9tICcuLi9UeXBlJztcbmltcG9ydCB7TWVtYmVyfSBmcm9tICcuLi9NZW1iZXInO1xuaW1wb3J0IHtNZW1iZXJSZWZ9IGZyb20gJy4uL01lbWJlclJlZic7XG5pbXBvcnQge1RyYW5zZm9ybX0gZnJvbSAnLi9UcmFuc2Zvcm0nO1xuXG5leHBvcnQgdHlwZSBPdXRwdXQgPSB7IFtuYW1lc3BhY2VJZDogc3RyaW5nXTogSW1wb3J0Q29udGVudCB9O1xuXG5leHBvcnQgY2xhc3MgQWRkSW1wb3J0cyBleHRlbmRzIFRyYW5zZm9ybTxBZGRJbXBvcnRzLCBPdXRwdXQsIHZvaWQ+IHtcblx0cHJlcGFyZSgpIHtcblx0XHR0aGlzLnZpc2l0VHlwZSh0aGlzLmRvYyk7XG5cblx0XHRmb3IodmFyIHR5cGUgb2YgdGhpcy5uYW1lc3BhY2UudHlwZUxpc3QpIHtcblx0XHRcdGlmKHR5cGUpIHRoaXMudmlzaXRUeXBlKHR5cGUpO1xuXHRcdH1cblxuXHRcdHRoaXMubmFtZXNwYWNlLmltcG9ydENvbnRlbnRUYmwgPSB0aGlzLm91dHB1dDtcblxuXHRcdHJldHVybih0aGlzLm91dHB1dCk7XG5cdH1cblxuXHQvKiogUmVwbGFjZSBpbXBvcnRlZCB0eXBlIGFuZCBtZW1iZXIgSURzIHdpdGggc2FuaXRpemVkIG5hbWVzLiAqL1xuXHRmaW5pc2gocmVzdWx0OiBPdXRwdXRbXSkge1xuXHRcdGZvcih2YXIgbmFtZXNwYWNlVGJsIG9mIHJlc3VsdCkge1xuXHRcdFx0Zm9yKHZhciBuYW1lc3BhY2VJZCBvZiBPYmplY3Qua2V5cyhuYW1lc3BhY2VUYmwpKSB7XG5cdFx0XHRcdHZhciBvdXRwdXQ6IEltcG9ydENvbnRlbnQgPSB7XG5cdFx0XHRcdFx0dHlwZVRibDoge30sXG5cdFx0XHRcdFx0bWVtYmVyVGJsOiB7fVxuXHRcdFx0XHR9O1xuXG5cdFx0XHRcdHZhciB0eXBlVGJsID0gbmFtZXNwYWNlVGJsW25hbWVzcGFjZUlkXS50eXBlVGJsO1xuXG5cdFx0XHRcdGZvcih2YXIga2V5IG9mIE9iamVjdC5rZXlzKHR5cGVUYmwpKSB7XG5cdFx0XHRcdFx0dmFyIHR5cGUgPSB0eXBlVGJsW2tleV07XG5cdFx0XHRcdFx0b3V0cHV0LnR5cGVUYmxbdHlwZS5zYWZlTmFtZV0gPSB0eXBlO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0dmFyIG1lbWJlclRibCA9IG5hbWVzcGFjZVRibFtuYW1lc3BhY2VJZF0ubWVtYmVyVGJsO1xuXG5cdFx0XHRcdGZvcih2YXIga2V5IG9mIE9iamVjdC5rZXlzKG1lbWJlclRibCkpIHtcblx0XHRcdFx0XHR2YXIgbWVtYmVyID0gbWVtYmVyVGJsW2tleV07XG5cdFx0XHRcdFx0Ly8gVXNlIG5hbWUgaW5zdGVhZCBvZiBzYWZlTmFtZSwgYmVjYXVzZSB0aGUgbGF0dGVyIG1heVxuXHRcdFx0XHRcdC8vIHJhbmRvbWx5IGRpZmZlciBiZXR3ZWVuIGRpZmZlcmVudCBjb250YWluaW5nIHR5cGVzIGR1ZSB0b1xuXHRcdFx0XHRcdC8vIG5hbWluZyBjb2xsaXNpb25zIChmb3IgZXhhbXBsZSBiZXR3ZWVuIGF0dHJpYnV0ZSBhbmQgZWxlbWVudCkuXG5cdFx0XHRcdFx0b3V0cHV0Lm1lbWJlclRibFttZW1iZXIubmFtZV0gPSBtZW1iZXI7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRuYW1lc3BhY2VUYmxbbmFtZXNwYWNlSWRdID0gb3V0cHV0O1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdGFkZFJlZihuYW1lc3BhY2U6IE5hbWVzcGFjZSwgbWVtYmVyPzogTWVtYmVyLCB0eXBlPzogVHlwZSkge1xuXHRcdGlmKG5hbWVzcGFjZSAmJiBuYW1lc3BhY2UgIT0gdGhpcy5uYW1lc3BhY2UpIHtcblx0XHRcdC8vIFR5cGUgYW5kL29yIG1lbWJlciBmcm9tIGFub3RoZXIsIGltcG9ydGVkIG5hbWVzcGFjZS5cblxuXHRcdFx0Ly8gTWFrZSBzdXJlIGl0IGdldHMgZXhwb3J0ZWQuXG5cdFx0XHRpZih0eXBlKSB0eXBlLmlzRXhwb3J0ZWQgPSB0cnVlO1xuXHRcdFx0aWYobWVtYmVyKSBtZW1iZXIuaXNFeHBvcnRlZCA9IHRydWU7XG5cblx0XHRcdHZhciBpZCA9IG5hbWVzcGFjZS5pZDtcblx0XHRcdHZhciBzaG9ydCA9IHRoaXMubmFtZXNwYWNlLmdldFNob3J0UmVmKGlkKTtcblxuXHRcdFx0aWYoIXNob3J0KSB7XG5cdFx0XHRcdHNob3J0ID0gKG1lbWJlciAmJiBtZW1iZXIubmFtZXNwYWNlLmdldFNob3J0UmVmKGlkKSkgfHwgbmFtZXNwYWNlLnNob3J0O1xuXG5cdFx0XHRcdGlmKHNob3J0KSB0aGlzLm5hbWVzcGFjZS5hZGRSZWYoc2hvcnQsIG5hbWVzcGFjZSk7XG5cdFx0XHR9XG5cblx0XHRcdGlmKHNob3J0KSB7XG5cdFx0XHRcdGlmKCF0aGlzLm91dHB1dFtpZF0pIHtcblx0XHRcdFx0XHR0aGlzLm91dHB1dFtpZF0gPSB7XG5cdFx0XHRcdFx0XHR0eXBlVGJsOiB7fSxcblx0XHRcdFx0XHRcdG1lbWJlclRibDoge31cblx0XHRcdFx0XHR9O1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYodHlwZSAmJiB0eXBlLm5hbWVzcGFjZSA9PSBuYW1lc3BhY2UpIHtcblx0XHRcdFx0XHR0aGlzLm91dHB1dFtpZF0udHlwZVRibFt0eXBlLnN1cnJvZ2F0ZUtleV0gPSB0eXBlO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYobWVtYmVyICYmIG1lbWJlci5uYW1lc3BhY2UgPT0gbmFtZXNwYWNlKSB7XG5cdFx0XHRcdFx0dGhpcy5vdXRwdXRbaWRdLm1lbWJlclRibFttZW1iZXIuc3Vycm9nYXRlS2V5XSA9IG1lbWJlcjtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdHZpc2l0TWVtYmVyKG1lbWJlcjogTWVtYmVyKSB7XG5cdFx0dGhpcy5hZGRSZWYobWVtYmVyLm5hbWVzcGFjZSwgbWVtYmVyKTtcblxuXHRcdGlmKG1lbWJlci5zdWJzdGl0dXRlcykgdGhpcy5hZGRSZWYobWVtYmVyLnN1YnN0aXR1dGVzLm5hbWVzcGFjZSwgbWVtYmVyLnN1YnN0aXR1dGVzKTtcblxuXHRcdGZvcih2YXIgdHlwZSBvZiBtZW1iZXIudHlwZUxpc3QpIHRoaXMuYWRkUmVmKHR5cGUubmFtZXNwYWNlLCBtZW1iZXIsIHR5cGUpO1xuXHR9XG5cblx0dmlzaXRUeXBlKHR5cGU6IFR5cGUpIHtcblx0XHQvLyBUeXBlcyBob2xkaW5nIHByaW1pdGl2ZXMgc2hvdWxkIGluaGVyaXQgZnJvbSB0aGVtLlxuXHRcdC8vIE5PVEU6IFRoaXMgbWFrZXMgYmFzZSBwcmltaXRpdmUgdHlwZXMgaW5oZXJpdCB0aGVtc2VsdmVzLlxuXHRcdGlmKHR5cGUucHJpbWl0aXZlVHlwZSAmJiAhdHlwZS5wYXJlbnQpIHR5cGUucGFyZW50ID0gdHlwZS5wcmltaXRpdmVUeXBlO1xuXG5cdFx0aWYodHlwZS5wYXJlbnQpIHRoaXMuYWRkUmVmKHR5cGUucGFyZW50Lm5hbWVzcGFjZSwgbnVsbCwgdHlwZS5wYXJlbnQpO1xuXG5cdFx0Zm9yKHZhciBtZW1iZXIgb2YgdGhpcy5nZXRUeXBlTWVtYmVycyh0eXBlKSkgdGhpcy52aXNpdE1lbWJlcihtZW1iZXIubWVtYmVyKTtcblx0fVxuXG5cdGNvbnN0cnVjdCA9IEFkZEltcG9ydHM7XG5cdG91dHB1dDogT3V0cHV0ID0ge307XG59XG4iXX0=