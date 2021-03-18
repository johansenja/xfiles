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
exports.Import = exports.Include = void 0;
var types = require("../types");
/** <xsd:include> */
var Include = /** @class */ (function (_super) {
    __extends(Include, _super);
    function Include() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.id = null;
        _this.schemaLocation = null;
        return _this;
    }
    Include.prototype.init = function (state) {
        if (this.schemaLocation) {
            var urlRemote = state.source.urlResolve(this.schemaLocation);
            state.stateStatic.addImport(state.source.targetNamespace, urlRemote);
        }
    };
    Include.mayContain = function () { return [
        types.Annotation
    ]; };
    return Include;
}(types.Base));
exports.Include = Include;
/** <xsd:import> */
var Import = /** @class */ (function (_super) {
    __extends(Import, _super);
    function Import() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.namespace = null;
        return _this;
    }
    Import.prototype.init = function (state) {
        if (this.schemaLocation) {
            // TODO: handle importing namespaces like http://www.w3.org/XML/1998/namespace
            // without a schemaLocation.
            var urlRemote = state.source.urlResolve(this.schemaLocation);
            state.stateStatic.addImport(state.stateStatic.context.registerNamespace(this.namespace), urlRemote);
        }
    };
    return Import;
}(Include));
exports.Import = Import;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSW1wb3J0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcGFyc2VyX3NjYWZmb2xkX2dlbmVyYXRvci9zcmMveHNkL3R5cGVzL0ltcG9ydC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsK0RBQStEO0FBQy9ELCtDQUErQzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBSS9DLGdDQUFrQztBQUVsQyxvQkFBb0I7QUFFcEI7SUFBNkIsMkJBQVU7SUFBdkM7UUFBQSxxRUFjQztRQUZBLFFBQUUsR0FBVyxJQUFJLENBQUM7UUFDbEIsb0JBQWMsR0FBVyxJQUFJLENBQUM7O0lBQy9CLENBQUM7SUFUQSxzQkFBSSxHQUFKLFVBQUssS0FBWTtRQUNoQixJQUFHLElBQUksQ0FBQyxjQUFjLEVBQUU7WUFDdkIsSUFBSSxTQUFTLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1lBQzdELEtBQUssQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsZUFBZSxFQUFFLFNBQVMsQ0FBQyxDQUFDO1NBQ3JFO0lBQ0YsQ0FBQztJQVRNLGtCQUFVLEdBQTRCLGNBQU0sT0FBQTtRQUNsRCxLQUFLLENBQUMsVUFBVTtLQUNoQixFQUZrRCxDQUVsRCxDQUFDO0lBV0gsY0FBQztDQUFBLEFBZEQsQ0FBNkIsS0FBSyxDQUFDLElBQUksR0FjdEM7QUFkWSwwQkFBTztBQWdCcEIsbUJBQW1CO0FBRW5CO0lBQTRCLDBCQUFPO0lBQW5DO1FBQUEscUVBWUM7UUFEQSxlQUFTLEdBQVcsSUFBSSxDQUFDOztJQUMxQixDQUFDO0lBWEEscUJBQUksR0FBSixVQUFLLEtBQVk7UUFDaEIsSUFBRyxJQUFJLENBQUMsY0FBYyxFQUFFO1lBQ3ZCLDhFQUE4RTtZQUM5RSw0QkFBNEI7WUFFNUIsSUFBSSxTQUFTLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1lBQzdELEtBQUssQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxTQUFTLENBQUMsQ0FBQztTQUNwRztJQUNGLENBQUM7SUFHRixhQUFDO0FBQUQsQ0FBQyxBQVpELENBQTRCLE9BQU8sR0FZbEM7QUFaWSx3QkFBTSIsInNvdXJjZXNDb250ZW50IjpbIi8vIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIGN4c2QsIGNvcHlyaWdodCAoYykgMjAxNSBCdXNGYXN0ZXIgTHRkLlxuLy8gUmVsZWFzZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlLCBzZWUgTElDRU5TRS5cblxuaW1wb3J0IHtTdGF0ZX0gZnJvbSAnLi4vU3RhdGUnO1xuaW1wb3J0IHtOYW1lc3BhY2V9IGZyb20gJy4uL05hbWVzcGFjZSc7XG5pbXBvcnQgKiBhcyB0eXBlcyBmcm9tICcuLi90eXBlcyc7XG5cbi8qKiA8eHNkOmluY2x1ZGU+ICovXG5cbmV4cG9ydCBjbGFzcyBJbmNsdWRlIGV4dGVuZHMgdHlwZXMuQmFzZSB7XG5cdHN0YXRpYyBtYXlDb250YWluOiAoKSA9PiB0eXBlcy5CYXNlQ2xhc3NbXSA9ICgpID0+IFtcblx0XHR0eXBlcy5Bbm5vdGF0aW9uXG5cdF07XG5cblx0aW5pdChzdGF0ZTogU3RhdGUpIHtcblx0XHRpZih0aGlzLnNjaGVtYUxvY2F0aW9uKSB7XG5cdFx0XHR2YXIgdXJsUmVtb3RlID0gc3RhdGUuc291cmNlLnVybFJlc29sdmUodGhpcy5zY2hlbWFMb2NhdGlvbik7XG5cdFx0XHRzdGF0ZS5zdGF0ZVN0YXRpYy5hZGRJbXBvcnQoc3RhdGUuc291cmNlLnRhcmdldE5hbWVzcGFjZSwgdXJsUmVtb3RlKTtcblx0XHR9XG5cdH1cblxuXHRpZDogc3RyaW5nID0gbnVsbDtcblx0c2NoZW1hTG9jYXRpb246IHN0cmluZyA9IG51bGw7XG59XG5cbi8qKiA8eHNkOmltcG9ydD4gKi9cblxuZXhwb3J0IGNsYXNzIEltcG9ydCBleHRlbmRzIEluY2x1ZGUge1xuXHRpbml0KHN0YXRlOiBTdGF0ZSkge1xuXHRcdGlmKHRoaXMuc2NoZW1hTG9jYXRpb24pIHtcblx0XHRcdC8vIFRPRE86IGhhbmRsZSBpbXBvcnRpbmcgbmFtZXNwYWNlcyBsaWtlIGh0dHA6Ly93d3cudzMub3JnL1hNTC8xOTk4L25hbWVzcGFjZVxuXHRcdFx0Ly8gd2l0aG91dCBhIHNjaGVtYUxvY2F0aW9uLlxuXG5cdFx0XHR2YXIgdXJsUmVtb3RlID0gc3RhdGUuc291cmNlLnVybFJlc29sdmUodGhpcy5zY2hlbWFMb2NhdGlvbik7XG5cdFx0XHRzdGF0ZS5zdGF0ZVN0YXRpYy5hZGRJbXBvcnQoc3RhdGUuc3RhdGVTdGF0aWMuY29udGV4dC5yZWdpc3Rlck5hbWVzcGFjZSh0aGlzLm5hbWVzcGFjZSksIHVybFJlbW90ZSk7XG5cdFx0fVxuXHR9XG5cblx0bmFtZXNwYWNlOiBzdHJpbmcgPSBudWxsO1xufVxuIl19