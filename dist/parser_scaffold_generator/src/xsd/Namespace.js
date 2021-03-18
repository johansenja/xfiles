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
exports.Namespace = void 0;
var cxml = require("../../../runtime_parser");
var Scope_1 = require("./Scope");
/** XML namespace, binding it to syntax definitions. */
var Namespace = /** @class */ (function (_super) {
    __extends(Namespace, _super);
    function Namespace(name, id, context) {
        var _this = _super.call(this, name, id, context) || this;
        /** List of all source files potentially contributing to this namespace. */
        _this.sourceList = [];
        /** Source files potentially contributing to this namespace. */
        _this.sourceTbl = {};
        _this.scope = new Scope_1.Scope(context.getPrimitiveScope(), _this);
        return _this;
    }
    /** Initialize names and addresses. Can be called multiple times. */
    Namespace.prototype.init = function (url, short) {
        if (url) {
            if (!this.schemaUrl)
                this.schemaUrl = url;
        }
        if (short) {
            if (!this.short)
                this.short = short;
        }
        return this;
    };
    Namespace.prototype.addSource = function (source) {
        if (!this.sourceTbl[source.id]) {
            this.sourceTbl[source.id] = source;
            this.sourceList.push(source);
        }
    };
    /** Update final address of schema file if HTTP request was redirected. */
    Namespace.prototype.updateUrl = function (urlOld, urlNew) {
        if (!this.schemaUrl || this.schemaUrl == urlOld)
            this.schemaUrl = urlNew;
    };
    /** Fetch the root scope with published attributes, groups, elements... */
    Namespace.prototype.getScope = function () {
        return this.scope;
    };
    /** @return List of all source files potentially contributing to this namespace. */
    Namespace.prototype.getSourceList = function () {
        return this.sourceList;
    };
    return Namespace;
}(cxml.NamespaceBase));
exports.Namespace = Namespace;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTmFtZXNwYWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcGFyc2VyX3NjYWZmb2xkX2dlbmVyYXRvci9zcmMveHNkL05hbWVzcGFjZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsb0VBQW9FO0FBQ3BFLCtDQUErQzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRS9DLDhDQUFnRDtBQUtoRCxpQ0FBZ0M7QUFFaEMsdURBQXVEO0FBRXZEO0lBQStCLDZCQUFzQztJQUNuRSxtQkFBWSxJQUFZLEVBQUUsRUFBVSxFQUFFLE9BQWdCO1FBQXRELFlBQ0Usa0JBQU0sSUFBSSxFQUFFLEVBQUUsRUFBRSxPQUFPLENBQUMsU0FHekI7UUFxQ0QsMkVBQTJFO1FBQ25FLGdCQUFVLEdBQWEsRUFBRSxDQUFDO1FBRWxDLCtEQUErRDtRQUN2RCxlQUFTLEdBQTZCLEVBQUUsQ0FBQztRQTFDL0MsS0FBSSxDQUFDLEtBQUssR0FBRyxJQUFJLGFBQUssQ0FBQyxPQUFPLENBQUMsaUJBQWlCLEVBQUUsRUFBRSxLQUFJLENBQUMsQ0FBQzs7SUFDNUQsQ0FBQztJQUVELG9FQUFvRTtJQUNwRSx3QkFBSSxHQUFKLFVBQUssR0FBWSxFQUFFLEtBQWM7UUFDL0IsSUFBSSxHQUFHLEVBQUU7WUFDUCxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVM7Z0JBQUUsSUFBSSxDQUFDLFNBQVMsR0FBRyxHQUFHLENBQUM7U0FDM0M7UUFFRCxJQUFJLEtBQUssRUFBRTtZQUNULElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSztnQkFBRSxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztTQUNyQztRQUVELE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUVELDZCQUFTLEdBQVQsVUFBVSxNQUFjO1FBQ3RCLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsRUFBRTtZQUM5QixJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsR0FBRyxNQUFNLENBQUM7WUFDbkMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDOUI7SUFDSCxDQUFDO0lBRUQsMEVBQTBFO0lBQzFFLDZCQUFTLEdBQVQsVUFBVSxNQUFjLEVBQUUsTUFBYztRQUN0QyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsU0FBUyxJQUFJLE1BQU07WUFBRSxJQUFJLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQztJQUMzRSxDQUFDO0lBRUQsMEVBQTBFO0lBQzFFLDRCQUFRLEdBQVI7UUFDRSxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUM7SUFDcEIsQ0FBQztJQUVELG1GQUFtRjtJQUNuRixpQ0FBYSxHQUFiO1FBQ0UsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDO0lBQ3pCLENBQUM7SUFVSCxnQkFBQztBQUFELENBQUMsQUFsREQsQ0FBK0IsSUFBSSxDQUFDLGFBQWEsR0FrRGhEO0FBbERZLDhCQUFTIiwic291cmNlc0NvbnRlbnQiOlsiLy8gVGhpcyBmaWxlIGlzIHBhcnQgb2YgY3hzZCwgY29weXJpZ2h0IChjKSAyMDE1LTIwMTYgQnVzRmFzdGVyIEx0ZC5cbi8vIFJlbGVhc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSwgc2VlIExJQ0VOU0UuXG5cbmltcG9ydCAqIGFzIGN4bWwgZnJvbSBcIi4uLy4uLy4uL3J1bnRpbWVfcGFyc2VyXCI7XG5cbmltcG9ydCB7IENvbnRleHQgfSBmcm9tIFwiLi9Db250ZXh0XCI7XG5pbXBvcnQgeyBMb2FkZXIgfSBmcm9tIFwiLi9Mb2FkZXJcIjtcbmltcG9ydCB7IFNvdXJjZSB9IGZyb20gXCIuL1NvdXJjZVwiO1xuaW1wb3J0IHsgU2NvcGUgfSBmcm9tIFwiLi9TY29wZVwiO1xuXG4vKiogWE1MIG5hbWVzcGFjZSwgYmluZGluZyBpdCB0byBzeW50YXggZGVmaW5pdGlvbnMuICovXG5cbmV4cG9ydCBjbGFzcyBOYW1lc3BhY2UgZXh0ZW5kcyBjeG1sLk5hbWVzcGFjZUJhc2U8Q29udGV4dCwgTmFtZXNwYWNlPiB7XG4gIGNvbnN0cnVjdG9yKG5hbWU6IHN0cmluZywgaWQ6IG51bWJlciwgY29udGV4dDogQ29udGV4dCkge1xuICAgIHN1cGVyKG5hbWUsIGlkLCBjb250ZXh0KTtcblxuICAgIHRoaXMuc2NvcGUgPSBuZXcgU2NvcGUoY29udGV4dC5nZXRQcmltaXRpdmVTY29wZSgpLCB0aGlzKTtcbiAgfVxuXG4gIC8qKiBJbml0aWFsaXplIG5hbWVzIGFuZCBhZGRyZXNzZXMuIENhbiBiZSBjYWxsZWQgbXVsdGlwbGUgdGltZXMuICovXG4gIGluaXQodXJsPzogc3RyaW5nLCBzaG9ydD86IHN0cmluZykge1xuICAgIGlmICh1cmwpIHtcbiAgICAgIGlmICghdGhpcy5zY2hlbWFVcmwpIHRoaXMuc2NoZW1hVXJsID0gdXJsO1xuICAgIH1cblxuICAgIGlmIChzaG9ydCkge1xuICAgICAgaWYgKCF0aGlzLnNob3J0KSB0aGlzLnNob3J0ID0gc2hvcnQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBhZGRTb3VyY2Uoc291cmNlOiBTb3VyY2UpIHtcbiAgICBpZiAoIXRoaXMuc291cmNlVGJsW3NvdXJjZS5pZF0pIHtcbiAgICAgIHRoaXMuc291cmNlVGJsW3NvdXJjZS5pZF0gPSBzb3VyY2U7XG4gICAgICB0aGlzLnNvdXJjZUxpc3QucHVzaChzb3VyY2UpO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBVcGRhdGUgZmluYWwgYWRkcmVzcyBvZiBzY2hlbWEgZmlsZSBpZiBIVFRQIHJlcXVlc3Qgd2FzIHJlZGlyZWN0ZWQuICovXG4gIHVwZGF0ZVVybCh1cmxPbGQ6IHN0cmluZywgdXJsTmV3OiBzdHJpbmcpIHtcbiAgICBpZiAoIXRoaXMuc2NoZW1hVXJsIHx8IHRoaXMuc2NoZW1hVXJsID09IHVybE9sZCkgdGhpcy5zY2hlbWFVcmwgPSB1cmxOZXc7XG4gIH1cblxuICAvKiogRmV0Y2ggdGhlIHJvb3Qgc2NvcGUgd2l0aCBwdWJsaXNoZWQgYXR0cmlidXRlcywgZ3JvdXBzLCBlbGVtZW50cy4uLiAqL1xuICBnZXRTY29wZSgpIHtcbiAgICByZXR1cm4gdGhpcy5zY29wZTtcbiAgfVxuXG4gIC8qKiBAcmV0dXJuIExpc3Qgb2YgYWxsIHNvdXJjZSBmaWxlcyBwb3RlbnRpYWxseSBjb250cmlidXRpbmcgdG8gdGhpcyBuYW1lc3BhY2UuICovXG4gIGdldFNvdXJjZUxpc3QoKSB7XG4gICAgcmV0dXJuIHRoaXMuc291cmNlTGlzdDtcbiAgfVxuXG4gIC8qKiBMaXN0IG9mIGFsbCBzb3VyY2UgZmlsZXMgcG90ZW50aWFsbHkgY29udHJpYnV0aW5nIHRvIHRoaXMgbmFtZXNwYWNlLiAqL1xuICBwcml2YXRlIHNvdXJjZUxpc3Q6IFNvdXJjZVtdID0gW107XG5cbiAgLyoqIFNvdXJjZSBmaWxlcyBwb3RlbnRpYWxseSBjb250cmlidXRpbmcgdG8gdGhpcyBuYW1lc3BhY2UuICovXG4gIHByaXZhdGUgc291cmNlVGJsOiB7IFtpZDogbnVtYmVyXTogU291cmNlIH0gPSB7fTtcblxuICAvKiogR2xvYmFsIHNjb3BlIHdoZXJlIGV4cG9ydGVkIG1lbWJlcnMgd2lsbCBiZSBwdWJsaXNoZWQuICovXG4gIHByaXZhdGUgc2NvcGU6IFNjb3BlO1xufVxuIl19