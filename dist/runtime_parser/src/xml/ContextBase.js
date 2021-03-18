"use strict";
// This file is part of cxml, copyright (c) 2016 BusFaster Ltd.
// Released under the MIT license, see LICENSE.
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContextBase = void 0;
var NamespaceBase_1 = require("./NamespaceBase");
/** XML parser context, holding definitions of all imported namespaces. */
var ContextBase = /** @class */ (function () {
    function ContextBase(NamespaceType) {
        /** Next available numeric surrogate key for new namespaces. */
        this.namespaceKeyNext = 0;
        /** List of namespaces indexed by a numeric surrogate key. */
        this.namespaceList = [];
        /** Table of namespaces by name in URI format (URL or URN).  */
        this.namespaceNameTbl = {};
        this.NamespaceType = NamespaceType;
    }
    ContextBase.prototype.getNamespace = function (name) {
        return (this.namespaceNameTbl[name]);
    };
    /** Create or look up a namespace by name in URI (URL or URN) format. */
    ContextBase.prototype.registerNamespace = function (name) {
        name = NamespaceBase_1.NamespaceBase.sanitize(name);
        var namespace = this.namespaceNameTbl[name];
        if (!namespace) {
            // Create a new namespace.
            var id = this.namespaceKeyNext++;
            namespace = new this.NamespaceType(name, id, this);
            this.namespaceNameTbl[name] = namespace;
            this.namespaceList[id] = namespace;
        }
        return (namespace);
    };
    ContextBase.prototype.copyNamespace = function (other) {
        var namespace = this.namespaceList[other.id];
        if (namespace) {
            if (namespace.name != other.name)
                throw (new Error('Duplicate namespace ID'));
            return (namespace);
        }
        if (this.namespaceNameTbl[other.name])
            throw (new Error('Duplicate namespace name'));
        namespace = new this.NamespaceType(other.name, other.id, this);
        namespace.initFrom(other);
        this.namespaceNameTbl[other.name] = namespace;
        this.namespaceList[other.id] = namespace;
        if (this.namespaceKeyNext <= other.id)
            this.namespaceKeyNext = other.id + 1;
        return (namespace);
    };
    /** Look up namespace by internal numeric surrogate key. */
    ContextBase.prototype.namespaceById = function (id) {
        return (this.namespaceList[id]);
    };
    return ContextBase;
}());
exports.ContextBase = ContextBase;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29udGV4dEJhc2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9ydW50aW1lX3BhcnNlci9zcmMveG1sL0NvbnRleHRCYXNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSwrREFBK0Q7QUFDL0QsK0NBQStDOzs7QUFFL0MsaURBQThDO0FBRTlDLDBFQUEwRTtBQUUxRTtJQUNDLHFCQUFZLGFBQTZFO1FBd0R6RiwrREFBK0Q7UUFDdkQscUJBQWdCLEdBQUcsQ0FBQyxDQUFDO1FBQzdCLDZEQUE2RDtRQUNuRCxrQkFBYSxHQUFnQixFQUFFLENBQUM7UUFDMUMsK0RBQStEO1FBQ3ZELHFCQUFnQixHQUFrQyxFQUFFLENBQUM7UUE1RDVELElBQUksQ0FBQyxhQUFhLEdBQUcsYUFBYSxDQUFDO0lBQ3BDLENBQUM7SUFFRCxrQ0FBWSxHQUFaLFVBQWEsSUFBWTtRQUN4QixPQUFNLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDckMsQ0FBQztJQUVELHdFQUF3RTtJQUV4RSx1Q0FBaUIsR0FBakIsVUFBa0IsSUFBWTtRQUM3QixJQUFJLEdBQUcsNkJBQWEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDcEMsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDO1FBRTVDLElBQUcsQ0FBQyxTQUFTLEVBQUU7WUFDZCwwQkFBMEI7WUFFMUIsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7WUFDakMsU0FBUyxHQUFHLElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLEVBQUUsRUFBRSxFQUFFLElBQXNCLENBQUMsQ0FBQztZQUVyRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLEdBQUcsU0FBUyxDQUFDO1lBQ3hDLElBQUksQ0FBQyxhQUFhLENBQUMsRUFBRSxDQUFDLEdBQUcsU0FBUyxDQUFDO1NBQ25DO1FBRUQsT0FBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ25CLENBQUM7SUFFRCxtQ0FBYSxHQUFiLFVBQWMsS0FBOEI7UUFDM0MsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUM7UUFFN0MsSUFBRyxTQUFTLEVBQUU7WUFDYixJQUFHLFNBQVMsQ0FBQyxJQUFJLElBQUksS0FBSyxDQUFDLElBQUk7Z0JBQUUsTUFBSyxDQUFDLElBQUksS0FBSyxDQUFDLHdCQUF3QixDQUFDLENBQUMsQ0FBQztZQUM1RSxPQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7U0FDbEI7UUFFRCxJQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDO1lBQUUsTUFBSyxDQUFDLElBQUksS0FBSyxDQUFDLDBCQUEwQixDQUFDLENBQUMsQ0FBQztRQUVuRixTQUFTLEdBQUcsSUFBSSxJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxJQUFzQixDQUFDLENBQUM7UUFDakYsU0FBUyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUUxQixJQUFJLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLFNBQVMsQ0FBQztRQUM5QyxJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsR0FBRyxTQUFTLENBQUM7UUFFekMsSUFBRyxJQUFJLENBQUMsZ0JBQWdCLElBQUksS0FBSyxDQUFDLEVBQUU7WUFBRSxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsS0FBSyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFFM0UsT0FBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ25CLENBQUM7SUFFRCwyREFBMkQ7SUFFM0QsbUNBQWEsR0FBYixVQUFjLEVBQVU7UUFDdkIsT0FBTSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUNoQyxDQUFDO0lBVUYsa0JBQUM7QUFBRCxDQUFDLEFBL0RELElBK0RDO0FBL0RZLGtDQUFXIiwic291cmNlc0NvbnRlbnQiOlsiLy8gVGhpcyBmaWxlIGlzIHBhcnQgb2YgY3htbCwgY29weXJpZ2h0IChjKSAyMDE2IEJ1c0Zhc3RlciBMdGQuXG4vLyBSZWxlYXNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UsIHNlZSBMSUNFTlNFLlxuXG5pbXBvcnQge05hbWVzcGFjZUJhc2V9IGZyb20gJy4vTmFtZXNwYWNlQmFzZSc7XG5cbi8qKiBYTUwgcGFyc2VyIGNvbnRleHQsIGhvbGRpbmcgZGVmaW5pdGlvbnMgb2YgYWxsIGltcG9ydGVkIG5hbWVzcGFjZXMuICovXG5cbmV4cG9ydCBjbGFzcyBDb250ZXh0QmFzZTxDb250ZXh0IGV4dGVuZHMgQ29udGV4dEJhc2U8Q29udGV4dCwgTmFtZXNwYWNlPiwgTmFtZXNwYWNlIGV4dGVuZHMgTmFtZXNwYWNlQmFzZTxDb250ZXh0LCBOYW1lc3BhY2U+PiB7XG5cdGNvbnN0cnVjdG9yKE5hbWVzcGFjZVR5cGU6IHsgbmV3KG5hbWU6IHN0cmluZywgaWQ6IG51bWJlciwgY29udGV4dDogQ29udGV4dCk6IE5hbWVzcGFjZSB9KSB7XG5cdFx0dGhpcy5OYW1lc3BhY2VUeXBlID0gTmFtZXNwYWNlVHlwZTtcblx0fVxuXG5cdGdldE5hbWVzcGFjZShuYW1lOiBzdHJpbmcpIHtcblx0XHRyZXR1cm4odGhpcy5uYW1lc3BhY2VOYW1lVGJsW25hbWVdKTtcblx0fVxuXG5cdC8qKiBDcmVhdGUgb3IgbG9vayB1cCBhIG5hbWVzcGFjZSBieSBuYW1lIGluIFVSSSAoVVJMIG9yIFVSTikgZm9ybWF0LiAqL1xuXG5cdHJlZ2lzdGVyTmFtZXNwYWNlKG5hbWU6IHN0cmluZykge1xuXHRcdG5hbWUgPSBOYW1lc3BhY2VCYXNlLnNhbml0aXplKG5hbWUpO1xuXHRcdHZhciBuYW1lc3BhY2UgPSB0aGlzLm5hbWVzcGFjZU5hbWVUYmxbbmFtZV07XG5cblx0XHRpZighbmFtZXNwYWNlKSB7XG5cdFx0XHQvLyBDcmVhdGUgYSBuZXcgbmFtZXNwYWNlLlxuXG5cdFx0XHR2YXIgaWQgPSB0aGlzLm5hbWVzcGFjZUtleU5leHQrKztcblx0XHRcdG5hbWVzcGFjZSA9IG5ldyB0aGlzLk5hbWVzcGFjZVR5cGUobmFtZSwgaWQsIHRoaXMgYXMgYW55IGFzIENvbnRleHQpO1xuXG5cdFx0XHR0aGlzLm5hbWVzcGFjZU5hbWVUYmxbbmFtZV0gPSBuYW1lc3BhY2U7XG5cdFx0XHR0aGlzLm5hbWVzcGFjZUxpc3RbaWRdID0gbmFtZXNwYWNlO1xuXHRcdH1cblxuXHRcdHJldHVybihuYW1lc3BhY2UpO1xuXHR9XG5cblx0Y29weU5hbWVzcGFjZShvdGhlcjogTmFtZXNwYWNlQmFzZTxhbnksIGFueT4pIHtcblx0XHR2YXIgbmFtZXNwYWNlID0gdGhpcy5uYW1lc3BhY2VMaXN0W290aGVyLmlkXTtcblxuXHRcdGlmKG5hbWVzcGFjZSkge1xuXHRcdFx0aWYobmFtZXNwYWNlLm5hbWUgIT0gb3RoZXIubmFtZSkgdGhyb3cobmV3IEVycm9yKCdEdXBsaWNhdGUgbmFtZXNwYWNlIElEJykpO1xuXHRcdFx0cmV0dXJuKG5hbWVzcGFjZSk7XG5cdFx0fVxuXG5cdFx0aWYodGhpcy5uYW1lc3BhY2VOYW1lVGJsW290aGVyLm5hbWVdKSB0aHJvdyhuZXcgRXJyb3IoJ0R1cGxpY2F0ZSBuYW1lc3BhY2UgbmFtZScpKTtcblxuXHRcdG5hbWVzcGFjZSA9IG5ldyB0aGlzLk5hbWVzcGFjZVR5cGUob3RoZXIubmFtZSwgb3RoZXIuaWQsIHRoaXMgYXMgYW55IGFzIENvbnRleHQpO1xuXHRcdG5hbWVzcGFjZS5pbml0RnJvbShvdGhlcik7XG5cblx0XHR0aGlzLm5hbWVzcGFjZU5hbWVUYmxbb3RoZXIubmFtZV0gPSBuYW1lc3BhY2U7XG5cdFx0dGhpcy5uYW1lc3BhY2VMaXN0W290aGVyLmlkXSA9IG5hbWVzcGFjZTtcblxuXHRcdGlmKHRoaXMubmFtZXNwYWNlS2V5TmV4dCA8PSBvdGhlci5pZCkgdGhpcy5uYW1lc3BhY2VLZXlOZXh0ID0gb3RoZXIuaWQgKyAxO1xuXG5cdFx0cmV0dXJuKG5hbWVzcGFjZSk7XG5cdH1cblxuXHQvKiogTG9vayB1cCBuYW1lc3BhY2UgYnkgaW50ZXJuYWwgbnVtZXJpYyBzdXJyb2dhdGUga2V5LiAqL1xuXG5cdG5hbWVzcGFjZUJ5SWQoaWQ6IG51bWJlcikge1xuXHRcdHJldHVybih0aGlzLm5hbWVzcGFjZUxpc3RbaWRdKTtcblx0fVxuXG5cdC8qKiBDb25zdHJ1Y3RvciBmb3IgbmFtZXNwYWNlcyBpbiB0aGlzIGNvbnRleHQuICovXG5cdHByaXZhdGUgTmFtZXNwYWNlVHlwZTogeyBuZXcobmFtZTogc3RyaW5nLCBpZDogbnVtYmVyLCBjb250ZXh0OiBDb250ZXh0KTogTmFtZXNwYWNlIH07XG5cdC8qKiBOZXh0IGF2YWlsYWJsZSBudW1lcmljIHN1cnJvZ2F0ZSBrZXkgZm9yIG5ldyBuYW1lc3BhY2VzLiAqL1xuXHRwcml2YXRlIG5hbWVzcGFjZUtleU5leHQgPSAwO1xuXHQvKiogTGlzdCBvZiBuYW1lc3BhY2VzIGluZGV4ZWQgYnkgYSBudW1lcmljIHN1cnJvZ2F0ZSBrZXkuICovXG5cdHByb3RlY3RlZCBuYW1lc3BhY2VMaXN0OiBOYW1lc3BhY2VbXSA9IFtdO1xuXHQvKiogVGFibGUgb2YgbmFtZXNwYWNlcyBieSBuYW1lIGluIFVSSSBmb3JtYXQgKFVSTCBvciBVUk4pLiAgKi9cblx0cHJpdmF0ZSBuYW1lc3BhY2VOYW1lVGJsOiB7IFtuYW1lOiBzdHJpbmddOiBOYW1lc3BhY2UgfSA9IHt9O1xufVxuIl19