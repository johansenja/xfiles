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
        if (attrTbl['xmlns']) {
            this.defaultNamespace = this.context.registerNamespace(attrTbl['xmlns']);
        }
        // Everything defined in the current file belongs to the target namespace by default.
        if (attrTbl['targetnamespace']) {
            if (!this.targetNamespace) {
                this.targetNamespace = this.context.registerNamespace(attrTbl['targetnamespace'], this.urlOriginal);
                this.targetNamespace.addSource(this);
            }
        }
        // Read the current file's preferred shorthand codes for other XML namespaces.
        for (var _i = 0, _a = Object.keys(attrTbl); _i < _a.length; _i++) {
            var attr = _a[_i];
            if (attr.match(/^xmlns:/i)) {
                var short = attr.substr(attr.indexOf(':') + 1);
                this.namespaceRefTbl[short] = this.context.registerNamespace(attrTbl[attr]).init(null, short);
            }
        }
        // xml prefix may be used without defining xmlns:xml.
        this.namespaceRefTbl['xml'] = this.context.registerNamespace('http://www.w3.org/XML/1998/namespace');
    };
    /** Find a namespace according to its full name or the short name as used in this source file. */
    Source.prototype.lookupNamespace = function (ref) {
        return (this.namespaceRefTbl[ref] || this.context.getNamespace(ref));
    };
    /** Resolve a possible relative URL in the context of this source file. */
    Source.prototype.urlResolve = function (urlRemote) {
        return (url.resolve(this.targetNamespace.schemaUrl, urlRemote));
    };
    /** Update current remote address, in case the previous address got redirected. */
    Source.prototype.updateUrl = function (urlOld, urlNew) {
        this.url = urlNew;
        if (this.targetNamespace)
            this.targetNamespace.updateUrl(urlOld, urlNew);
    };
    Source.prototype.getNamespaceRefs = function () {
        return (this.namespaceRefTbl);
    };
    /** Internal list of source files indexed by a surrogate key. */
    Source.list = [];
    return Source;
}());
exports.Source = Source;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU291cmNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcGFyc2VyX3NjYWZmb2xkX2dlbmVyYXRvci9zcmMveHNkL1NvdXJjZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsb0VBQW9FO0FBQ3BFLCtDQUErQzs7O0FBRy9DLHlCQUEyQjtBQU0zQiwyQ0FBMkM7QUFFM0M7SUFDQyxnQkFBWSxTQUFpQixFQUFFLE9BQWdCLEVBQUUsZUFBMkI7UUErRjVFLDZFQUE2RTtRQUNyRSxvQkFBZSxHQUFnQyxFQUFFLENBQUM7UUEvRnpELElBQUksRUFBRSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBRTVCLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDO1FBQ2IsSUFBSSxDQUFDLEdBQUcsR0FBRyxTQUFTLENBQUM7UUFDckIsSUFBSSxDQUFDLFdBQVcsR0FBRyxTQUFTLENBQUM7UUFDN0IsSUFBRyxlQUFlLEVBQUU7WUFDbkIsSUFBSSxDQUFDLGVBQWUsR0FBRyxlQUFlLENBQUM7WUFDdkMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDckM7UUFFRCxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQztJQUN4QixDQUFDO0lBRUQsK0dBQStHO0lBRS9HLHNCQUFLLEdBQUwsVUFBTSxPQUFpQztRQUN0QywrREFBK0Q7UUFDL0QsNEVBQTRFO1FBRTVFLElBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ3BCLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1NBQ3pFO1FBRUQscUZBQXFGO1FBRXJGLElBQUcsT0FBTyxDQUFDLGlCQUFpQixDQUFDLEVBQUU7WUFDOUIsSUFBRyxDQUFDLElBQUksQ0FBQyxlQUFlLEVBQUU7Z0JBQ3pCLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsaUJBQWlCLENBQUMsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7Z0JBQ3BHLElBQUksQ0FBQyxlQUFlLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQ3JDO1NBQ0Q7UUFFRCw4RUFBOEU7UUFFOUUsS0FBZ0IsVUFBb0IsRUFBcEIsS0FBQSxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFwQixjQUFvQixFQUFwQixJQUFvQixFQUFFO1lBQWxDLElBQUksSUFBSSxTQUFBO1lBQ1gsSUFBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxFQUFFO2dCQUMxQixJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBRS9DLElBQUksQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO2FBQzlGO1NBQ0Q7UUFFRCxxREFBcUQ7UUFFckQsSUFBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLGlCQUFpQixDQUFDLHNDQUFzQyxDQUFDLENBQUM7SUFDdEcsQ0FBQztJQUVELGlHQUFpRztJQUVqRyxnQ0FBZSxHQUFmLFVBQWdCLEdBQVc7UUFDMUIsT0FBTSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUNyRSxDQUFDO0lBRUQsMEVBQTBFO0lBRTFFLDJCQUFVLEdBQVYsVUFBVyxTQUFpQjtRQUMzQixPQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLFNBQVMsRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDO0lBQ2hFLENBQUM7SUFFRCxrRkFBa0Y7SUFFbEYsMEJBQVMsR0FBVCxVQUFVLE1BQWMsRUFBRSxNQUFjO1FBQ3ZDLElBQUksQ0FBQyxHQUFHLEdBQUcsTUFBTSxDQUFDO1FBQ2xCLElBQUcsSUFBSSxDQUFDLGVBQWU7WUFBRSxJQUFJLENBQUMsZUFBZSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDekUsQ0FBQztJQUVELGlDQUFnQixHQUFoQjtRQUNDLE9BQU0sQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7SUFDOUIsQ0FBQztJQUVELGdFQUFnRTtJQUNqRCxXQUFJLEdBQWEsRUFBRSxDQUFDO0lBMkJwQyxhQUFDO0NBQUEsQUFyR0QsSUFxR0M7QUFyR1ksd0JBQU0iLCJzb3VyY2VzQ29udGVudCI6WyIvLyBUaGlzIGZpbGUgaXMgcGFydCBvZiBjeHNkLCBjb3B5cmlnaHQgKGMpIDIwMTUtMjAxNiBCdXNGYXN0ZXIgTHRkLlxuLy8gUmVsZWFzZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlLCBzZWUgTElDRU5TRS5cblxuaW1wb3J0ICogYXMgUHJvbWlzZSBmcm9tICdibHVlYmlyZCc7XG5pbXBvcnQgKiBhcyB1cmwgZnJvbSAndXJsJztcblxuaW1wb3J0IHtDb250ZXh0fSBmcm9tICcuL0NvbnRleHQnXG5pbXBvcnQge05hbWVzcGFjZX0gZnJvbSAnLi9OYW1lc3BhY2UnXG5pbXBvcnQge0xvYWRlcn0gZnJvbSAnLi9Mb2FkZXInXG5cbi8qKiBEZXRhaWxzIG9mIGEgc2luZ2xlIFhTRCBzb3VyY2UgZmlsZS4gKi9cblxuZXhwb3J0IGNsYXNzIFNvdXJjZSB7XG5cdGNvbnN0cnVjdG9yKHVybFJlbW90ZTogc3RyaW5nLCBjb250ZXh0OiBDb250ZXh0LCB0YXJnZXROYW1lc3BhY2U/OiBOYW1lc3BhY2UpIHtcblx0XHR2YXIgaWQgPSBTb3VyY2UubGlzdC5sZW5ndGg7XG5cblx0XHR0aGlzLmNvbnRleHQgPSBjb250ZXh0O1xuXHRcdHRoaXMuaWQgPSBpZDtcblx0XHR0aGlzLnVybCA9IHVybFJlbW90ZTtcblx0XHR0aGlzLnVybE9yaWdpbmFsID0gdXJsUmVtb3RlO1xuXHRcdGlmKHRhcmdldE5hbWVzcGFjZSkge1xuXHRcdFx0dGhpcy50YXJnZXROYW1lc3BhY2UgPSB0YXJnZXROYW1lc3BhY2U7XG5cdFx0XHR0aGlzLnRhcmdldE5hbWVzcGFjZS5hZGRTb3VyY2UodGhpcyk7XG5cdFx0fVxuXG5cdFx0U291cmNlLmxpc3RbaWRdID0gdGhpcztcblx0fVxuXG5cdC8qKiBDYWxsZWQgYnkgdGhlIHBhcnNlciwgY29udmVydHMgWFNEIGF0dHJpYnV0ZXMgZGVzY3JpYmluZyB0aGUgc2NoZW1hIGludG8gcmVmZXJlbmNlcyB0byBpbnRlcm5hbCBvYmplY3RzLiAqL1xuXG5cdHBhcnNlKGF0dHJUYmw6IHtbbmFtZTogc3RyaW5nXTogc3RyaW5nfSkge1xuXHRcdC8vIFVucXVhbGlmaWVkIHRhZ3MgYXJlIGFzc3VtZWQgdG8gYmUgaW4gdGhlIGRlZmF1bHQgbmFtZXNwYWNlLlxuXHRcdC8vIEZvciB0aGUgc2NoZW1hIGZpbGUgaXRzZWxmLCBpdCBzaG91bGQgYmUgaHR0cDovL3d3dy53My5vcmcvMjAwMS9YTUxTY2hlbWFcblxuXHRcdGlmKGF0dHJUYmxbJ3htbG5zJ10pIHtcblx0XHRcdHRoaXMuZGVmYXVsdE5hbWVzcGFjZSA9IHRoaXMuY29udGV4dC5yZWdpc3Rlck5hbWVzcGFjZShhdHRyVGJsWyd4bWxucyddKTtcblx0XHR9XG5cblx0XHQvLyBFdmVyeXRoaW5nIGRlZmluZWQgaW4gdGhlIGN1cnJlbnQgZmlsZSBiZWxvbmdzIHRvIHRoZSB0YXJnZXQgbmFtZXNwYWNlIGJ5IGRlZmF1bHQuXG5cblx0XHRpZihhdHRyVGJsWyd0YXJnZXRuYW1lc3BhY2UnXSkge1xuXHRcdFx0aWYoIXRoaXMudGFyZ2V0TmFtZXNwYWNlKSB7XG5cdFx0XHRcdHRoaXMudGFyZ2V0TmFtZXNwYWNlID0gdGhpcy5jb250ZXh0LnJlZ2lzdGVyTmFtZXNwYWNlKGF0dHJUYmxbJ3RhcmdldG5hbWVzcGFjZSddLCB0aGlzLnVybE9yaWdpbmFsKTtcblx0XHRcdFx0dGhpcy50YXJnZXROYW1lc3BhY2UuYWRkU291cmNlKHRoaXMpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8vIFJlYWQgdGhlIGN1cnJlbnQgZmlsZSdzIHByZWZlcnJlZCBzaG9ydGhhbmQgY29kZXMgZm9yIG90aGVyIFhNTCBuYW1lc3BhY2VzLlxuXG5cdFx0Zm9yKHZhciBhdHRyIG9mIE9iamVjdC5rZXlzKGF0dHJUYmwpKSB7XG5cdFx0XHRpZihhdHRyLm1hdGNoKC9eeG1sbnM6L2kpKSB7XG5cdFx0XHRcdHZhciBzaG9ydCA9IGF0dHIuc3Vic3RyKGF0dHIuaW5kZXhPZignOicpICsgMSk7XG5cblx0XHRcdFx0dGhpcy5uYW1lc3BhY2VSZWZUYmxbc2hvcnRdID0gdGhpcy5jb250ZXh0LnJlZ2lzdGVyTmFtZXNwYWNlKGF0dHJUYmxbYXR0cl0pLmluaXQobnVsbCwgc2hvcnQpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8vIHhtbCBwcmVmaXggbWF5IGJlIHVzZWQgd2l0aG91dCBkZWZpbmluZyB4bWxuczp4bWwuXG5cblx0XHR0aGlzLm5hbWVzcGFjZVJlZlRibFsneG1sJ10gPSB0aGlzLmNvbnRleHQucmVnaXN0ZXJOYW1lc3BhY2UoJ2h0dHA6Ly93d3cudzMub3JnL1hNTC8xOTk4L25hbWVzcGFjZScpO1xuXHR9XG5cblx0LyoqIEZpbmQgYSBuYW1lc3BhY2UgYWNjb3JkaW5nIHRvIGl0cyBmdWxsIG5hbWUgb3IgdGhlIHNob3J0IG5hbWUgYXMgdXNlZCBpbiB0aGlzIHNvdXJjZSBmaWxlLiAqL1xuXG5cdGxvb2t1cE5hbWVzcGFjZShyZWY6IHN0cmluZykge1xuXHRcdHJldHVybih0aGlzLm5hbWVzcGFjZVJlZlRibFtyZWZdIHx8IHRoaXMuY29udGV4dC5nZXROYW1lc3BhY2UocmVmKSk7XG5cdH1cblxuXHQvKiogUmVzb2x2ZSBhIHBvc3NpYmxlIHJlbGF0aXZlIFVSTCBpbiB0aGUgY29udGV4dCBvZiB0aGlzIHNvdXJjZSBmaWxlLiAqL1xuXG5cdHVybFJlc29sdmUodXJsUmVtb3RlOiBzdHJpbmcpIHtcblx0XHRyZXR1cm4odXJsLnJlc29sdmUodGhpcy50YXJnZXROYW1lc3BhY2Uuc2NoZW1hVXJsLCB1cmxSZW1vdGUpKTtcblx0fVxuXG5cdC8qKiBVcGRhdGUgY3VycmVudCByZW1vdGUgYWRkcmVzcywgaW4gY2FzZSB0aGUgcHJldmlvdXMgYWRkcmVzcyBnb3QgcmVkaXJlY3RlZC4gKi9cblxuXHR1cGRhdGVVcmwodXJsT2xkOiBzdHJpbmcsIHVybE5ldzogc3RyaW5nKSB7XG5cdFx0dGhpcy51cmwgPSB1cmxOZXc7XG5cdFx0aWYodGhpcy50YXJnZXROYW1lc3BhY2UpIHRoaXMudGFyZ2V0TmFtZXNwYWNlLnVwZGF0ZVVybCh1cmxPbGQsIHVybE5ldyk7XG5cdH1cblxuXHRnZXROYW1lc3BhY2VSZWZzKCkge1xuXHRcdHJldHVybih0aGlzLm5hbWVzcGFjZVJlZlRibCk7XG5cdH1cblxuXHQvKiogSW50ZXJuYWwgbGlzdCBvZiBzb3VyY2UgZmlsZXMgaW5kZXhlZCBieSBhIHN1cnJvZ2F0ZSBrZXkuICovXG5cdHByaXZhdGUgc3RhdGljIGxpc3Q6IFNvdXJjZVtdID0gW107XG5cblx0cHJpdmF0ZSBjb250ZXh0OiBDb250ZXh0O1xuXG5cdC8qKiBTdXJyb2dhdGUga2V5LCB1c2VkIGludGVybmFsbHkgYXMgYSB1bmlxdWUgc291cmNlIGZpbGUgSUQuICovXG5cdGlkOiBudW1iZXI7XG5cblx0LyoqIFJlbW90ZSBhZGRyZXNzIG9mIHRoZSBmaWxlLCBhZnRlciBwb3NzaWJsZSByZWRpcmVjdGlvbnMuICovXG5cdHVybDogc3RyaW5nO1xuXG5cdC8qKiBPcmlnaW5hbCByZW1vdGUgYWRkcmVzcyBvZiB0aGUgZmlsZSwgYmVmb3JlIGFueSByZWRpcmVjdGlvbnMuICovXG5cdHVybE9yaWdpbmFsOiBzdHJpbmc7XG5cblx0LyoqIE5ldyBkZWZpbml0aW9ucyBhcmUgZXhwb3J0ZWQgaW50byB0aGUgdGFyZ2V0IG5hbWVzcGFjZS4gKi9cblx0dGFyZ2V0TmFtZXNwYWNlOiBOYW1lc3BhY2U7XG5cblx0LyoqIFVucXVhbGlmaWVkIG5hbWVzIGFyZSBhc3N1bWVkIHRvIGJlbG9uZyB0byB0aGUgZGVmYXVsdCBuYW1lc3BhY2UuICovXG5cdGRlZmF1bHROYW1lc3BhY2U6IE5hbWVzcGFjZTtcblxuXHQvKiogTG9hZGVyIHVzZWQgZm9yIHJldHJpZXZpbmcgdGhpcyBmaWxlLiAqL1xuXHRwcml2YXRlIGxvYWRlcjogTG9hZGVyO1xuXG5cdC8qKiBUYWJsZSBvZiBuYW1lc3BhY2Ugc2hvcnRoYW5kIHJlZmVyZW5jZXMgKHhtbG5zOi4uLikgdXNlZCBpbiB0aGlzIGZpbGUuICovXG5cdHByaXZhdGUgbmFtZXNwYWNlUmVmVGJsOiB7W25hbWU6IHN0cmluZ106IE5hbWVzcGFjZX0gPSB7fTtcblxuXHQvKiogUHJvbWlzZSwgcmVzb2x2ZXMgd2hlbiB0aGUgZmlsZSBhbmQgaXRzIGRlcGVuZGVuY2llcyBoYXZlIGJlZW4gY29tcGxldGVseSBwYXJzZWQuICovXG5cdHBhcnNlZDogUHJvbWlzZTxhbnk+O1xufVxuIl19