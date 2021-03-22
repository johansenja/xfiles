"use strict";
// This file is part of cxsd, copyright (c) 2015-2016 BusFaster Ltd.
// Released under the MIT license, see LICENSE.
Object.defineProperty(exports, "__esModule", { value: true });
exports.Source = void 0;
var url = require("url");
/** Details of a single XSD source file. */
var Source = /** @class */ (function () {
    function Source(urlRemote, context, targetNamespace) {
        /** Table of namespace shorthand references (xmlns:...) used in this file. */
        this.namespaceRefTbl = {};
        var id = Source.list.length;
        this.context = context;
        this.id = id;
        this.url = urlRemote;
        this.urlOriginal = urlRemote;
        if (targetNamespace) {
            this.targetNamespace = targetNamespace;
            this.targetNamespace.addSource(this);
        }
        Source.list[id] = this;
    }
    /** Called by the parser, converts XSD attributes describing the schema into references to internal objects. */
    Source.prototype.parse = function (attrTbl) {
        // Unqualified tags are assumed to be in the default namespace.
        // For the schema file itself, it should be http://www.w3.org/2001/XMLSchema
        if (attrTbl["xmlns"]) {
            this.defaultNamespace = this.context.registerNamespace(attrTbl["xmlns"].toString());
        }
        // Everything defined in the current file belongs to the target namespace by default.
        if (attrTbl["targetnamespace"]) {
            if (!this.targetNamespace) {
                this.targetNamespace = this.context.registerNamespace(attrTbl["targetnamespace"].toString(), this.urlOriginal);
                this.targetNamespace.addSource(this);
            }
        }
        // Read the current file's preferred shorthand codes for other XML namespaces.
        for (var _i = 0, _a = Object.keys(attrTbl); _i < _a.length; _i++) {
            var attr = _a[_i];
            if (attr.match(/^xmlns:/i)) {
                var short = attr.substr(attr.indexOf(":") + 1);
                this.namespaceRefTbl[short] = this.context
                    .registerNamespace(attrTbl[attr].toString())
                    .init(null, short);
            }
        }
        // xml prefix may be used without defining xmlns:xml.
        this.namespaceRefTbl["xml"] = this.context.registerNamespace("http://www.w3.org/XML/1998/namespace");
    };
    /** Find a namespace according to its full name or the short name as used in this source file. */
    Source.prototype.lookupNamespace = function (ref) {
        return this.namespaceRefTbl[ref] || this.context.getNamespace(ref);
    };
    /** Resolve a possible relative URL in the context of this source file. */
    Source.prototype.urlResolve = function (urlRemote) {
        return url.resolve(this.targetNamespace.schemaUrl, urlRemote);
    };
    /** Update current remote address, in case the previous address got redirected. */
    Source.prototype.updateUrl = function (urlOld, urlNew) {
        this.url = urlNew;
        if (this.targetNamespace)
            this.targetNamespace.updateUrl(urlOld, urlNew);
    };
    Source.prototype.getNamespaceRefs = function () {
        return this.namespaceRefTbl;
    };
    /** Internal list of source files indexed by a surrogate key. */
    Source.list = [];
    return Source;
}());
exports.Source = Source;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU291cmNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcGFyc2VyX3NjYWZmb2xkX2dlbmVyYXRvci9zcmMveHNkL1NvdXJjZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsb0VBQW9FO0FBQ3BFLCtDQUErQzs7O0FBRy9DLHlCQUEyQjtBQU8zQiwyQ0FBMkM7QUFFM0M7SUFDRSxnQkFDRSxTQUFpQixFQUNqQixPQUFnQixFQUNoQixlQUEyQjtRQXlHN0IsNkVBQTZFO1FBQ3JFLG9CQUFlLEdBQWtDLEVBQUUsQ0FBQztRQXhHMUQsSUFBSSxFQUFFLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7UUFFNUIsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFDdkIsSUFBSSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUM7UUFDYixJQUFJLENBQUMsR0FBRyxHQUFHLFNBQVMsQ0FBQztRQUNyQixJQUFJLENBQUMsV0FBVyxHQUFHLFNBQVMsQ0FBQztRQUM3QixJQUFJLGVBQWUsRUFBRTtZQUNuQixJQUFJLENBQUMsZUFBZSxHQUFHLGVBQWUsQ0FBQztZQUN2QyxJQUFJLENBQUMsZUFBZSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUN0QztRQUVELE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDO0lBQ3pCLENBQUM7SUFFRCwrR0FBK0c7SUFFL0csc0JBQUssR0FBTCxVQUFNLE9BQStEO1FBQ25FLCtEQUErRDtRQUMvRCw0RUFBNEU7UUFFNUUsSUFBSSxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUU7WUFDcEIsSUFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsaUJBQWlCLENBQ3BELE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FDNUIsQ0FBQztTQUNIO1FBRUQscUZBQXFGO1FBRXJGLElBQUksT0FBTyxDQUFDLGlCQUFpQixDQUFDLEVBQUU7WUFDOUIsSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLEVBQUU7Z0JBQ3pCLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsQ0FDbkQsT0FBTyxDQUFDLGlCQUFpQixDQUFDLENBQUMsUUFBUSxFQUFFLEVBQ3JDLElBQUksQ0FBQyxXQUFXLENBQ2pCLENBQUM7Z0JBQ0YsSUFBSSxDQUFDLGVBQWUsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDdEM7U0FDRjtRQUVELDhFQUE4RTtRQUU5RSxLQUFpQixVQUFvQixFQUFwQixLQUFBLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQXBCLGNBQW9CLEVBQXBCLElBQW9CLEVBQUU7WUFBbEMsSUFBSSxJQUFJLFNBQUE7WUFDWCxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLEVBQUU7Z0JBQzFCLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFFL0MsSUFBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTztxQkFDdkMsaUJBQWlCLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDO3FCQUMzQyxJQUFJLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO2FBQ3RCO1NBQ0Y7UUFFRCxxREFBcUQ7UUFFckQsSUFBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLGlCQUFpQixDQUMxRCxzQ0FBc0MsQ0FDdkMsQ0FBQztJQUNKLENBQUM7SUFFRCxpR0FBaUc7SUFFakcsZ0NBQWUsR0FBZixVQUFnQixHQUFXO1FBQ3pCLE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNyRSxDQUFDO0lBRUQsMEVBQTBFO0lBRTFFLDJCQUFVLEdBQVYsVUFBVyxTQUFpQjtRQUMxQixPQUFPLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxTQUFTLEVBQUUsU0FBUyxDQUFDLENBQUM7SUFDaEUsQ0FBQztJQUVELGtGQUFrRjtJQUVsRiwwQkFBUyxHQUFULFVBQVUsTUFBYyxFQUFFLE1BQWM7UUFDdEMsSUFBSSxDQUFDLEdBQUcsR0FBRyxNQUFNLENBQUM7UUFDbEIsSUFBSSxJQUFJLENBQUMsZUFBZTtZQUFFLElBQUksQ0FBQyxlQUFlLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQztJQUMzRSxDQUFDO0lBRUQsaUNBQWdCLEdBQWhCO1FBQ0UsT0FBTyxJQUFJLENBQUMsZUFBZSxDQUFDO0lBQzlCLENBQUM7SUFFRCxnRUFBZ0U7SUFDakQsV0FBSSxHQUFhLEVBQUUsQ0FBQztJQTJCckMsYUFBQztDQUFBLEFBbEhELElBa0hDO0FBbEhZLHdCQUFNIiwic291cmNlc0NvbnRlbnQiOlsiLy8gVGhpcyBmaWxlIGlzIHBhcnQgb2YgY3hzZCwgY29weXJpZ2h0IChjKSAyMDE1LTIwMTYgQnVzRmFzdGVyIEx0ZC5cbi8vIFJlbGVhc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSwgc2VlIExJQ0VOU0UuXG5cbmltcG9ydCAqIGFzIFByb21pc2UgZnJvbSBcImJsdWViaXJkXCI7XG5pbXBvcnQgKiBhcyB1cmwgZnJvbSBcInVybFwiO1xuaW1wb3J0ICogYXMgc2F4IGZyb20gXCJzYXhcIjtcblxuaW1wb3J0IHsgQ29udGV4dCB9IGZyb20gXCIuL0NvbnRleHRcIjtcbmltcG9ydCB7IE5hbWVzcGFjZSB9IGZyb20gXCIuL05hbWVzcGFjZVwiO1xuaW1wb3J0IHsgTG9hZGVyIH0gZnJvbSBcIi4vTG9hZGVyXCI7XG5cbi8qKiBEZXRhaWxzIG9mIGEgc2luZ2xlIFhTRCBzb3VyY2UgZmlsZS4gKi9cblxuZXhwb3J0IGNsYXNzIFNvdXJjZSB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHVybFJlbW90ZTogc3RyaW5nLFxuICAgIGNvbnRleHQ6IENvbnRleHQsXG4gICAgdGFyZ2V0TmFtZXNwYWNlPzogTmFtZXNwYWNlXG4gICkge1xuICAgIHZhciBpZCA9IFNvdXJjZS5saXN0Lmxlbmd0aDtcblxuICAgIHRoaXMuY29udGV4dCA9IGNvbnRleHQ7XG4gICAgdGhpcy5pZCA9IGlkO1xuICAgIHRoaXMudXJsID0gdXJsUmVtb3RlO1xuICAgIHRoaXMudXJsT3JpZ2luYWwgPSB1cmxSZW1vdGU7XG4gICAgaWYgKHRhcmdldE5hbWVzcGFjZSkge1xuICAgICAgdGhpcy50YXJnZXROYW1lc3BhY2UgPSB0YXJnZXROYW1lc3BhY2U7XG4gICAgICB0aGlzLnRhcmdldE5hbWVzcGFjZS5hZGRTb3VyY2UodGhpcyk7XG4gICAgfVxuXG4gICAgU291cmNlLmxpc3RbaWRdID0gdGhpcztcbiAgfVxuXG4gIC8qKiBDYWxsZWQgYnkgdGhlIHBhcnNlciwgY29udmVydHMgWFNEIGF0dHJpYnV0ZXMgZGVzY3JpYmluZyB0aGUgc2NoZW1hIGludG8gcmVmZXJlbmNlcyB0byBpbnRlcm5hbCBvYmplY3RzLiAqL1xuXG4gIHBhcnNlKGF0dHJUYmw6IHNheC5UYWdbXCJhdHRyaWJ1dGVzXCJdIHwgc2F4LlF1YWxpZmllZFRhZ1tcImF0dHJpYnV0ZXNcIl0pIHtcbiAgICAvLyBVbnF1YWxpZmllZCB0YWdzIGFyZSBhc3N1bWVkIHRvIGJlIGluIHRoZSBkZWZhdWx0IG5hbWVzcGFjZS5cbiAgICAvLyBGb3IgdGhlIHNjaGVtYSBmaWxlIGl0c2VsZiwgaXQgc2hvdWxkIGJlIGh0dHA6Ly93d3cudzMub3JnLzIwMDEvWE1MU2NoZW1hXG5cbiAgICBpZiAoYXR0clRibFtcInhtbG5zXCJdKSB7XG4gICAgICB0aGlzLmRlZmF1bHROYW1lc3BhY2UgPSB0aGlzLmNvbnRleHQucmVnaXN0ZXJOYW1lc3BhY2UoXG4gICAgICAgIGF0dHJUYmxbXCJ4bWxuc1wiXS50b1N0cmluZygpXG4gICAgICApO1xuICAgIH1cblxuICAgIC8vIEV2ZXJ5dGhpbmcgZGVmaW5lZCBpbiB0aGUgY3VycmVudCBmaWxlIGJlbG9uZ3MgdG8gdGhlIHRhcmdldCBuYW1lc3BhY2UgYnkgZGVmYXVsdC5cblxuICAgIGlmIChhdHRyVGJsW1widGFyZ2V0bmFtZXNwYWNlXCJdKSB7XG4gICAgICBpZiAoIXRoaXMudGFyZ2V0TmFtZXNwYWNlKSB7XG4gICAgICAgIHRoaXMudGFyZ2V0TmFtZXNwYWNlID0gdGhpcy5jb250ZXh0LnJlZ2lzdGVyTmFtZXNwYWNlKFxuICAgICAgICAgIGF0dHJUYmxbXCJ0YXJnZXRuYW1lc3BhY2VcIl0udG9TdHJpbmcoKSxcbiAgICAgICAgICB0aGlzLnVybE9yaWdpbmFsXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMudGFyZ2V0TmFtZXNwYWNlLmFkZFNvdXJjZSh0aGlzKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBSZWFkIHRoZSBjdXJyZW50IGZpbGUncyBwcmVmZXJyZWQgc2hvcnRoYW5kIGNvZGVzIGZvciBvdGhlciBYTUwgbmFtZXNwYWNlcy5cblxuICAgIGZvciAodmFyIGF0dHIgb2YgT2JqZWN0LmtleXMoYXR0clRibCkpIHtcbiAgICAgIGlmIChhdHRyLm1hdGNoKC9eeG1sbnM6L2kpKSB7XG4gICAgICAgIHZhciBzaG9ydCA9IGF0dHIuc3Vic3RyKGF0dHIuaW5kZXhPZihcIjpcIikgKyAxKTtcblxuICAgICAgICB0aGlzLm5hbWVzcGFjZVJlZlRibFtzaG9ydF0gPSB0aGlzLmNvbnRleHRcbiAgICAgICAgICAucmVnaXN0ZXJOYW1lc3BhY2UoYXR0clRibFthdHRyXS50b1N0cmluZygpKVxuICAgICAgICAgIC5pbml0KG51bGwsIHNob3J0KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyB4bWwgcHJlZml4IG1heSBiZSB1c2VkIHdpdGhvdXQgZGVmaW5pbmcgeG1sbnM6eG1sLlxuXG4gICAgdGhpcy5uYW1lc3BhY2VSZWZUYmxbXCJ4bWxcIl0gPSB0aGlzLmNvbnRleHQucmVnaXN0ZXJOYW1lc3BhY2UoXG4gICAgICBcImh0dHA6Ly93d3cudzMub3JnL1hNTC8xOTk4L25hbWVzcGFjZVwiXG4gICAgKTtcbiAgfVxuXG4gIC8qKiBGaW5kIGEgbmFtZXNwYWNlIGFjY29yZGluZyB0byBpdHMgZnVsbCBuYW1lIG9yIHRoZSBzaG9ydCBuYW1lIGFzIHVzZWQgaW4gdGhpcyBzb3VyY2UgZmlsZS4gKi9cblxuICBsb29rdXBOYW1lc3BhY2UocmVmOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5uYW1lc3BhY2VSZWZUYmxbcmVmXSB8fCB0aGlzLmNvbnRleHQuZ2V0TmFtZXNwYWNlKHJlZik7XG4gIH1cblxuICAvKiogUmVzb2x2ZSBhIHBvc3NpYmxlIHJlbGF0aXZlIFVSTCBpbiB0aGUgY29udGV4dCBvZiB0aGlzIHNvdXJjZSBmaWxlLiAqL1xuXG4gIHVybFJlc29sdmUodXJsUmVtb3RlOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdXJsLnJlc29sdmUodGhpcy50YXJnZXROYW1lc3BhY2Uuc2NoZW1hVXJsLCB1cmxSZW1vdGUpO1xuICB9XG5cbiAgLyoqIFVwZGF0ZSBjdXJyZW50IHJlbW90ZSBhZGRyZXNzLCBpbiBjYXNlIHRoZSBwcmV2aW91cyBhZGRyZXNzIGdvdCByZWRpcmVjdGVkLiAqL1xuXG4gIHVwZGF0ZVVybCh1cmxPbGQ6IHN0cmluZywgdXJsTmV3OiBzdHJpbmcpIHtcbiAgICB0aGlzLnVybCA9IHVybE5ldztcbiAgICBpZiAodGhpcy50YXJnZXROYW1lc3BhY2UpIHRoaXMudGFyZ2V0TmFtZXNwYWNlLnVwZGF0ZVVybCh1cmxPbGQsIHVybE5ldyk7XG4gIH1cblxuICBnZXROYW1lc3BhY2VSZWZzKCkge1xuICAgIHJldHVybiB0aGlzLm5hbWVzcGFjZVJlZlRibDtcbiAgfVxuXG4gIC8qKiBJbnRlcm5hbCBsaXN0IG9mIHNvdXJjZSBmaWxlcyBpbmRleGVkIGJ5IGEgc3Vycm9nYXRlIGtleS4gKi9cbiAgcHJpdmF0ZSBzdGF0aWMgbGlzdDogU291cmNlW10gPSBbXTtcblxuICBwcml2YXRlIGNvbnRleHQ6IENvbnRleHQ7XG5cbiAgLyoqIFN1cnJvZ2F0ZSBrZXksIHVzZWQgaW50ZXJuYWxseSBhcyBhIHVuaXF1ZSBzb3VyY2UgZmlsZSBJRC4gKi9cbiAgaWQ6IG51bWJlcjtcblxuICAvKiogUmVtb3RlIGFkZHJlc3Mgb2YgdGhlIGZpbGUsIGFmdGVyIHBvc3NpYmxlIHJlZGlyZWN0aW9ucy4gKi9cbiAgdXJsOiBzdHJpbmc7XG5cbiAgLyoqIE9yaWdpbmFsIHJlbW90ZSBhZGRyZXNzIG9mIHRoZSBmaWxlLCBiZWZvcmUgYW55IHJlZGlyZWN0aW9ucy4gKi9cbiAgdXJsT3JpZ2luYWw6IHN0cmluZztcblxuICAvKiogTmV3IGRlZmluaXRpb25zIGFyZSBleHBvcnRlZCBpbnRvIHRoZSB0YXJnZXQgbmFtZXNwYWNlLiAqL1xuICB0YXJnZXROYW1lc3BhY2U6IE5hbWVzcGFjZTtcblxuICAvKiogVW5xdWFsaWZpZWQgbmFtZXMgYXJlIGFzc3VtZWQgdG8gYmVsb25nIHRvIHRoZSBkZWZhdWx0IG5hbWVzcGFjZS4gKi9cbiAgZGVmYXVsdE5hbWVzcGFjZTogTmFtZXNwYWNlO1xuXG4gIC8qKiBMb2FkZXIgdXNlZCBmb3IgcmV0cmlldmluZyB0aGlzIGZpbGUuICovXG4gIHByaXZhdGUgbG9hZGVyOiBMb2FkZXI7XG5cbiAgLyoqIFRhYmxlIG9mIG5hbWVzcGFjZSBzaG9ydGhhbmQgcmVmZXJlbmNlcyAoeG1sbnM6Li4uKSB1c2VkIGluIHRoaXMgZmlsZS4gKi9cbiAgcHJpdmF0ZSBuYW1lc3BhY2VSZWZUYmw6IHsgW25hbWU6IHN0cmluZ106IE5hbWVzcGFjZSB9ID0ge307XG5cbiAgLyoqIFByb21pc2UsIHJlc29sdmVzIHdoZW4gdGhlIGZpbGUgYW5kIGl0cyBkZXBlbmRlbmNpZXMgaGF2ZSBiZWVuIGNvbXBsZXRlbHkgcGFyc2VkLiAqL1xuICBwYXJzZWQ6IFByb21pc2U8YW55Pjtcbn1cbiJdfQ==