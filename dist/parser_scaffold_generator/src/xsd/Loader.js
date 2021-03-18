"use strict";
// This file is part of cxsd, copyright (c) 2015-2016 BusFaster Ltd.
// Released under the MIT license, see LICENSE.
Object.defineProperty(exports, "__esModule", { value: true });
exports.Loader = void 0;
var Promise = require("bluebird");
var cget_1 = require("cget");
var Source_1 = require("./Source");
var Parser_1 = require("./Parser");
/** Loader handles caching schema definitions and calling parser stages. */
var Loader = /** @class */ (function () {
    function Loader(context, options) {
        this.pendingCount = 0;
        this.context = context;
        this.options = cget_1.util.clone(options);
        this.parser = new Parser_1.Parser(context);
    }
    Loader.prototype.import = function (urlRemote) {
        var _this = this;
        var promise = new Promise(function (resolve, reject) {
            _this.resolve = resolve;
            _this.reject = reject;
            _this.source = _this.importFile(urlRemote);
        });
        return (promise);
    };
    Loader.prototype.importFile = function (urlRemote, namespace) {
        var _this = this;
        var options = this.options;
        options.address = new cget_1.Address(urlRemote);
        var source = Loader.sourceTbl[urlRemote];
        if (!source) {
            source = new Source_1.Source(urlRemote, this.context, namespace);
            Loader.cache.fetch(options).then(function (cached) {
                source.updateUrl(urlRemote, cached.address.url);
                return (_this.parser.init(cached, source, _this));
            }).then(function (dependencyList) {
                // TODO: The source could be parsed already if all dependencies
                // (and recursively their dependencies) have been preprocessed.
                if (--_this.pendingCount == 0)
                    _this.finish();
            });
            Loader.sourceTbl[urlRemote] = source;
            ++this.pendingCount;
        }
        return (source);
    };
    Loader.prototype.finish = function () {
        this.parser.resolve();
        this.resolve(this.source.targetNamespace);
    };
    Loader.prototype.getOptions = function () { return (this.options); };
    Loader.cache = new cget_1.Cache('cache/xsd', '_index.xsd');
    Loader.sourceTbl = {};
    return Loader;
}());
exports.Loader = Loader;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTG9hZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcGFyc2VyX3NjYWZmb2xkX2dlbmVyYXRvci9zcmMveHNkL0xvYWRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsb0VBQW9FO0FBQ3BFLCtDQUErQzs7O0FBRS9DLGtDQUFvQztBQUVwQyw2QkFBcUU7QUFJckUsbUNBQWdDO0FBQ2hDLG1DQUFnQztBQUVoQywyRUFBMkU7QUFFM0U7SUFDQyxnQkFBWSxPQUFnQixFQUFFLE9BQXNCO1FBMkQ1QyxpQkFBWSxHQUFHLENBQUMsQ0FBQztRQTFEeEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFDdkIsSUFBSSxDQUFDLE9BQU8sR0FBRyxXQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ25DLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxlQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDbkMsQ0FBQztJQUVELHVCQUFNLEdBQU4sVUFBTyxTQUFpQjtRQUF4QixpQkFTQztRQVJBLElBQUksT0FBTyxHQUFHLElBQUksT0FBTyxDQUFZLFVBQUMsT0FBTyxFQUFFLE1BQU07WUFDcEQsS0FBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7WUFDdkIsS0FBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7WUFFckIsS0FBSSxDQUFDLE1BQU0sR0FBRyxLQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQzFDLENBQUMsQ0FBQyxDQUFDO1FBRUgsT0FBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ2pCLENBQUM7SUFFRCwyQkFBVSxHQUFWLFVBQVcsU0FBaUIsRUFBRSxTQUFxQjtRQUFuRCxpQkF5QkM7UUF4QkEsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUMzQixPQUFPLENBQUMsT0FBTyxHQUFHLElBQUksY0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBRXpDLElBQUksTUFBTSxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUM7UUFFekMsSUFBRyxDQUFDLE1BQU0sRUFBRTtZQUNYLE1BQU0sR0FBRyxJQUFJLGVBQU0sQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBRSxTQUFTLENBQUMsQ0FBQztZQUV4RCxNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQyxNQUFtQjtnQkFDcEQsTUFBTSxDQUFDLFNBQVMsQ0FBQyxTQUFTLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFFaEQsT0FBTSxDQUFDLEtBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsS0FBSSxDQUFDLENBQUMsQ0FBQztZQUNoRCxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQyxjQUF3QjtnQkFDaEMsK0RBQStEO2dCQUMvRCwrREFBK0Q7Z0JBRS9ELElBQUcsRUFBRSxLQUFJLENBQUMsWUFBWSxJQUFJLENBQUM7b0JBQUUsS0FBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQzVDLENBQUMsQ0FBQyxDQUFDO1lBRUgsTUFBTSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsR0FBRyxNQUFNLENBQUM7WUFDckMsRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDO1NBQ3BCO1FBRUQsT0FBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ2hCLENBQUM7SUFFTyx1QkFBTSxHQUFkO1FBQ0MsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUN0QixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLENBQUM7SUFDM0MsQ0FBQztJQUVELDJCQUFVLEdBQVYsY0FBZSxPQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUV2QixZQUFLLEdBQUcsSUFBSSxZQUFLLENBQUMsV0FBVyxFQUFFLFlBQVksQ0FBQyxDQUFDO0lBQzdDLGdCQUFTLEdBQTRCLEVBQUUsQ0FBQztJQVd4RCxhQUFDO0NBQUEsQUFoRUQsSUFnRUM7QUFoRVksd0JBQU0iLCJzb3VyY2VzQ29udGVudCI6WyIvLyBUaGlzIGZpbGUgaXMgcGFydCBvZiBjeHNkLCBjb3B5cmlnaHQgKGMpIDIwMTUtMjAxNiBCdXNGYXN0ZXIgTHRkLlxuLy8gUmVsZWFzZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlLCBzZWUgTElDRU5TRS5cblxuaW1wb3J0ICogYXMgUHJvbWlzZSBmcm9tICdibHVlYmlyZCc7XG5cbmltcG9ydCB7QWRkcmVzcywgRmV0Y2hPcHRpb25zLCBDYWNoZSwgQ2FjaGVSZXN1bHQsIHV0aWx9IGZyb20gJ2NnZXQnO1xuXG5pbXBvcnQge0NvbnRleHR9IGZyb20gJy4vQ29udGV4dCc7XG5pbXBvcnQge05hbWVzcGFjZX0gZnJvbSAnLi9OYW1lc3BhY2UnO1xuaW1wb3J0IHtTb3VyY2V9IGZyb20gJy4vU291cmNlJztcbmltcG9ydCB7UGFyc2VyfSBmcm9tICcuL1BhcnNlcic7XG5cbi8qKiBMb2FkZXIgaGFuZGxlcyBjYWNoaW5nIHNjaGVtYSBkZWZpbml0aW9ucyBhbmQgY2FsbGluZyBwYXJzZXIgc3RhZ2VzLiAqL1xuXG5leHBvcnQgY2xhc3MgTG9hZGVyIHtcblx0Y29uc3RydWN0b3IoY29udGV4dDogQ29udGV4dCwgb3B0aW9ucz86IEZldGNoT3B0aW9ucykge1xuXHRcdHRoaXMuY29udGV4dCA9IGNvbnRleHQ7XG5cdFx0dGhpcy5vcHRpb25zID0gdXRpbC5jbG9uZShvcHRpb25zKTtcblx0XHR0aGlzLnBhcnNlciA9IG5ldyBQYXJzZXIoY29udGV4dCk7XG5cdH1cblxuXHRpbXBvcnQodXJsUmVtb3RlOiBzdHJpbmcpIHtcblx0XHR2YXIgcHJvbWlzZSA9IG5ldyBQcm9taXNlPE5hbWVzcGFjZT4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdFx0dGhpcy5yZXNvbHZlID0gcmVzb2x2ZTtcblx0XHRcdHRoaXMucmVqZWN0ID0gcmVqZWN0O1xuXG5cdFx0XHR0aGlzLnNvdXJjZSA9IHRoaXMuaW1wb3J0RmlsZSh1cmxSZW1vdGUpO1xuXHRcdH0pO1xuXG5cdFx0cmV0dXJuKHByb21pc2UpO1xuXHR9XG5cblx0aW1wb3J0RmlsZSh1cmxSZW1vdGU6IHN0cmluZywgbmFtZXNwYWNlPzogTmFtZXNwYWNlKSB7XG5cdFx0dmFyIG9wdGlvbnMgPSB0aGlzLm9wdGlvbnM7XG5cdFx0b3B0aW9ucy5hZGRyZXNzID0gbmV3IEFkZHJlc3ModXJsUmVtb3RlKTtcblxuXHRcdHZhciBzb3VyY2UgPSBMb2FkZXIuc291cmNlVGJsW3VybFJlbW90ZV07XG5cblx0XHRpZighc291cmNlKSB7XG5cdFx0XHRzb3VyY2UgPSBuZXcgU291cmNlKHVybFJlbW90ZSwgdGhpcy5jb250ZXh0LCBuYW1lc3BhY2UpO1xuXG5cdFx0XHRMb2FkZXIuY2FjaGUuZmV0Y2gob3B0aW9ucykudGhlbigoY2FjaGVkOiBDYWNoZVJlc3VsdCkgPT4ge1xuXHRcdFx0XHRzb3VyY2UudXBkYXRlVXJsKHVybFJlbW90ZSwgY2FjaGVkLmFkZHJlc3MudXJsKTtcblxuXHRcdFx0XHRyZXR1cm4odGhpcy5wYXJzZXIuaW5pdChjYWNoZWQsIHNvdXJjZSwgdGhpcykpO1xuXHRcdFx0fSkudGhlbigoZGVwZW5kZW5jeUxpc3Q6IFNvdXJjZVtdKSA9PiB7XG5cdFx0XHRcdC8vIFRPRE86IFRoZSBzb3VyY2UgY291bGQgYmUgcGFyc2VkIGFscmVhZHkgaWYgYWxsIGRlcGVuZGVuY2llc1xuXHRcdFx0XHQvLyAoYW5kIHJlY3Vyc2l2ZWx5IHRoZWlyIGRlcGVuZGVuY2llcykgaGF2ZSBiZWVuIHByZXByb2Nlc3NlZC5cblxuXHRcdFx0XHRpZigtLXRoaXMucGVuZGluZ0NvdW50ID09IDApIHRoaXMuZmluaXNoKCk7XG5cdFx0XHR9KTtcblxuXHRcdFx0TG9hZGVyLnNvdXJjZVRibFt1cmxSZW1vdGVdID0gc291cmNlO1xuXHRcdFx0Kyt0aGlzLnBlbmRpbmdDb3VudDtcblx0XHR9XG5cblx0XHRyZXR1cm4oc291cmNlKTtcblx0fVxuXG5cdHByaXZhdGUgZmluaXNoKCkge1xuXHRcdHRoaXMucGFyc2VyLnJlc29sdmUoKTtcblx0XHR0aGlzLnJlc29sdmUodGhpcy5zb3VyY2UudGFyZ2V0TmFtZXNwYWNlKTtcblx0fVxuXG5cdGdldE9wdGlvbnMoKSB7IHJldHVybih0aGlzLm9wdGlvbnMpOyB9XG5cblx0cHJpdmF0ZSBzdGF0aWMgY2FjaGUgPSBuZXcgQ2FjaGUoJ2NhY2hlL3hzZCcsICdfaW5kZXgueHNkJyk7XG5cdHByaXZhdGUgc3RhdGljIHNvdXJjZVRibDoge1t1cmw6IHN0cmluZ106IFNvdXJjZX0gPSB7fTtcblxuXHRwcml2YXRlIGNvbnRleHQ6IENvbnRleHQ7XG5cdHByaXZhdGUgb3B0aW9uczogRmV0Y2hPcHRpb25zO1xuXHRwcml2YXRlIHBhcnNlcjogUGFyc2VyO1xuXHRwcml2YXRlIHNvdXJjZTogU291cmNlO1xuXG5cdHByaXZhdGUgcGVuZGluZ0NvdW50ID0gMDtcblxuXHRwcml2YXRlIHJlc29sdmU6IChyZXN1bHQ6IE5hbWVzcGFjZSkgPT4gdm9pZDtcblx0cHJpdmF0ZSByZWplY3Q6IChlcnI6IGFueSkgPT4gdm9pZDtcbn1cbiJdfQ==