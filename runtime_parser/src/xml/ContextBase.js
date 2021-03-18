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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29udGV4dEJhc2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJDb250ZXh0QmFzZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsK0RBQStEO0FBQy9ELCtDQUErQzs7O0FBRS9DLGlEQUE4QztBQUU5QywwRUFBMEU7QUFFMUU7SUFDQyxxQkFBWSxhQUE2RTtRQXdEekYsK0RBQStEO1FBQ3ZELHFCQUFnQixHQUFHLENBQUMsQ0FBQztRQUM3Qiw2REFBNkQ7UUFDbkQsa0JBQWEsR0FBZ0IsRUFBRSxDQUFDO1FBQzFDLCtEQUErRDtRQUN2RCxxQkFBZ0IsR0FBa0MsRUFBRSxDQUFDO1FBNUQ1RCxJQUFJLENBQUMsYUFBYSxHQUFHLGFBQWEsQ0FBQztJQUNwQyxDQUFDO0lBRUQsa0NBQVksR0FBWixVQUFhLElBQVk7UUFDeEIsT0FBTSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQ3JDLENBQUM7SUFFRCx3RUFBd0U7SUFFeEUsdUNBQWlCLEdBQWpCLFVBQWtCLElBQVk7UUFDN0IsSUFBSSxHQUFHLDZCQUFhLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3BDLElBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUU1QyxJQUFHLENBQUMsU0FBUyxFQUFFO1lBQ2QsMEJBQTBCO1lBRTFCLElBQUksRUFBRSxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1lBQ2pDLFNBQVMsR0FBRyxJQUFJLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxFQUFFLEVBQUUsRUFBRSxJQUFzQixDQUFDLENBQUM7WUFFckUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxHQUFHLFNBQVMsQ0FBQztZQUN4QyxJQUFJLENBQUMsYUFBYSxDQUFDLEVBQUUsQ0FBQyxHQUFHLFNBQVMsQ0FBQztTQUNuQztRQUVELE9BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUNuQixDQUFDO0lBRUQsbUNBQWEsR0FBYixVQUFjLEtBQThCO1FBQzNDLElBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBRTdDLElBQUcsU0FBUyxFQUFFO1lBQ2IsSUFBRyxTQUFTLENBQUMsSUFBSSxJQUFJLEtBQUssQ0FBQyxJQUFJO2dCQUFFLE1BQUssQ0FBQyxJQUFJLEtBQUssQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDLENBQUM7WUFDNUUsT0FBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1NBQ2xCO1FBRUQsSUFBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQztZQUFFLE1BQUssQ0FBQyxJQUFJLEtBQUssQ0FBQywwQkFBMEIsQ0FBQyxDQUFDLENBQUM7UUFFbkYsU0FBUyxHQUFHLElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsSUFBc0IsQ0FBQyxDQUFDO1FBQ2pGLFNBQVMsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFMUIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxTQUFTLENBQUM7UUFDOUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLEdBQUcsU0FBUyxDQUFDO1FBRXpDLElBQUcsSUFBSSxDQUFDLGdCQUFnQixJQUFJLEtBQUssQ0FBQyxFQUFFO1lBQUUsSUFBSSxDQUFDLGdCQUFnQixHQUFHLEtBQUssQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBRTNFLE9BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUNuQixDQUFDO0lBRUQsMkRBQTJEO0lBRTNELG1DQUFhLEdBQWIsVUFBYyxFQUFVO1FBQ3ZCLE9BQU0sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDaEMsQ0FBQztJQVVGLGtCQUFDO0FBQUQsQ0FBQyxBQS9ERCxJQStEQztBQS9EWSxrQ0FBVyIsInNvdXJjZXNDb250ZW50IjpbIi8vIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIGN4bWwsIGNvcHlyaWdodCAoYykgMjAxNiBCdXNGYXN0ZXIgTHRkLlxuLy8gUmVsZWFzZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlLCBzZWUgTElDRU5TRS5cblxuaW1wb3J0IHtOYW1lc3BhY2VCYXNlfSBmcm9tICcuL05hbWVzcGFjZUJhc2UnO1xuXG4vKiogWE1MIHBhcnNlciBjb250ZXh0LCBob2xkaW5nIGRlZmluaXRpb25zIG9mIGFsbCBpbXBvcnRlZCBuYW1lc3BhY2VzLiAqL1xuXG5leHBvcnQgY2xhc3MgQ29udGV4dEJhc2U8Q29udGV4dCBleHRlbmRzIENvbnRleHRCYXNlPENvbnRleHQsIE5hbWVzcGFjZT4sIE5hbWVzcGFjZSBleHRlbmRzIE5hbWVzcGFjZUJhc2U8Q29udGV4dCwgTmFtZXNwYWNlPj4ge1xuXHRjb25zdHJ1Y3RvcihOYW1lc3BhY2VUeXBlOiB7IG5ldyhuYW1lOiBzdHJpbmcsIGlkOiBudW1iZXIsIGNvbnRleHQ6IENvbnRleHQpOiBOYW1lc3BhY2UgfSkge1xuXHRcdHRoaXMuTmFtZXNwYWNlVHlwZSA9IE5hbWVzcGFjZVR5cGU7XG5cdH1cblxuXHRnZXROYW1lc3BhY2UobmFtZTogc3RyaW5nKSB7XG5cdFx0cmV0dXJuKHRoaXMubmFtZXNwYWNlTmFtZVRibFtuYW1lXSk7XG5cdH1cblxuXHQvKiogQ3JlYXRlIG9yIGxvb2sgdXAgYSBuYW1lc3BhY2UgYnkgbmFtZSBpbiBVUkkgKFVSTCBvciBVUk4pIGZvcm1hdC4gKi9cblxuXHRyZWdpc3Rlck5hbWVzcGFjZShuYW1lOiBzdHJpbmcpIHtcblx0XHRuYW1lID0gTmFtZXNwYWNlQmFzZS5zYW5pdGl6ZShuYW1lKTtcblx0XHR2YXIgbmFtZXNwYWNlID0gdGhpcy5uYW1lc3BhY2VOYW1lVGJsW25hbWVdO1xuXG5cdFx0aWYoIW5hbWVzcGFjZSkge1xuXHRcdFx0Ly8gQ3JlYXRlIGEgbmV3IG5hbWVzcGFjZS5cblxuXHRcdFx0dmFyIGlkID0gdGhpcy5uYW1lc3BhY2VLZXlOZXh0Kys7XG5cdFx0XHRuYW1lc3BhY2UgPSBuZXcgdGhpcy5OYW1lc3BhY2VUeXBlKG5hbWUsIGlkLCB0aGlzIGFzIGFueSBhcyBDb250ZXh0KTtcblxuXHRcdFx0dGhpcy5uYW1lc3BhY2VOYW1lVGJsW25hbWVdID0gbmFtZXNwYWNlO1xuXHRcdFx0dGhpcy5uYW1lc3BhY2VMaXN0W2lkXSA9IG5hbWVzcGFjZTtcblx0XHR9XG5cblx0XHRyZXR1cm4obmFtZXNwYWNlKTtcblx0fVxuXG5cdGNvcHlOYW1lc3BhY2Uob3RoZXI6IE5hbWVzcGFjZUJhc2U8YW55LCBhbnk+KSB7XG5cdFx0dmFyIG5hbWVzcGFjZSA9IHRoaXMubmFtZXNwYWNlTGlzdFtvdGhlci5pZF07XG5cblx0XHRpZihuYW1lc3BhY2UpIHtcblx0XHRcdGlmKG5hbWVzcGFjZS5uYW1lICE9IG90aGVyLm5hbWUpIHRocm93KG5ldyBFcnJvcignRHVwbGljYXRlIG5hbWVzcGFjZSBJRCcpKTtcblx0XHRcdHJldHVybihuYW1lc3BhY2UpO1xuXHRcdH1cblxuXHRcdGlmKHRoaXMubmFtZXNwYWNlTmFtZVRibFtvdGhlci5uYW1lXSkgdGhyb3cobmV3IEVycm9yKCdEdXBsaWNhdGUgbmFtZXNwYWNlIG5hbWUnKSk7XG5cblx0XHRuYW1lc3BhY2UgPSBuZXcgdGhpcy5OYW1lc3BhY2VUeXBlKG90aGVyLm5hbWUsIG90aGVyLmlkLCB0aGlzIGFzIGFueSBhcyBDb250ZXh0KTtcblx0XHRuYW1lc3BhY2UuaW5pdEZyb20ob3RoZXIpO1xuXG5cdFx0dGhpcy5uYW1lc3BhY2VOYW1lVGJsW290aGVyLm5hbWVdID0gbmFtZXNwYWNlO1xuXHRcdHRoaXMubmFtZXNwYWNlTGlzdFtvdGhlci5pZF0gPSBuYW1lc3BhY2U7XG5cblx0XHRpZih0aGlzLm5hbWVzcGFjZUtleU5leHQgPD0gb3RoZXIuaWQpIHRoaXMubmFtZXNwYWNlS2V5TmV4dCA9IG90aGVyLmlkICsgMTtcblxuXHRcdHJldHVybihuYW1lc3BhY2UpO1xuXHR9XG5cblx0LyoqIExvb2sgdXAgbmFtZXNwYWNlIGJ5IGludGVybmFsIG51bWVyaWMgc3Vycm9nYXRlIGtleS4gKi9cblxuXHRuYW1lc3BhY2VCeUlkKGlkOiBudW1iZXIpIHtcblx0XHRyZXR1cm4odGhpcy5uYW1lc3BhY2VMaXN0W2lkXSk7XG5cdH1cblxuXHQvKiogQ29uc3RydWN0b3IgZm9yIG5hbWVzcGFjZXMgaW4gdGhpcyBjb250ZXh0LiAqL1xuXHRwcml2YXRlIE5hbWVzcGFjZVR5cGU6IHsgbmV3KG5hbWU6IHN0cmluZywgaWQ6IG51bWJlciwgY29udGV4dDogQ29udGV4dCk6IE5hbWVzcGFjZSB9O1xuXHQvKiogTmV4dCBhdmFpbGFibGUgbnVtZXJpYyBzdXJyb2dhdGUga2V5IGZvciBuZXcgbmFtZXNwYWNlcy4gKi9cblx0cHJpdmF0ZSBuYW1lc3BhY2VLZXlOZXh0ID0gMDtcblx0LyoqIExpc3Qgb2YgbmFtZXNwYWNlcyBpbmRleGVkIGJ5IGEgbnVtZXJpYyBzdXJyb2dhdGUga2V5LiAqL1xuXHRwcm90ZWN0ZWQgbmFtZXNwYWNlTGlzdDogTmFtZXNwYWNlW10gPSBbXTtcblx0LyoqIFRhYmxlIG9mIG5hbWVzcGFjZXMgYnkgbmFtZSBpbiBVUkkgZm9ybWF0IChVUkwgb3IgVVJOKS4gICovXG5cdHByaXZhdGUgbmFtZXNwYWNlTmFtZVRibDogeyBbbmFtZTogc3RyaW5nXTogTmFtZXNwYWNlIH0gPSB7fTtcbn1cbiJdfQ==