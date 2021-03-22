"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Loader = void 0;
// This file is part of cxsd, copyright (c) 2015-2016 BusFaster Ltd.
// Released under the MIT license, see LICENSE.
var fs = require("fs");
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
    Loader.prototype.import = function (filePath) {
        this.source = this.importFile(filePath);
        return this.source.targetNamespace;
    };
    Loader.prototype.importFile = function (path, namespace) {
        var options = this.options;
        var source = Loader.sourceTbl[path];
        if (!source) {
            source = new Source_1.Source(path, this.context, namespace);
            var xml = fs.readFileSync(path).toString();
            var dependencyList = this.parser.init(xml, source, this);
            // TODO: The source could be parsed already if all dependencies
            // (and recursively their dependencies) have been preprocessed.
            if (--this.pendingCount == 0)
                this.finish();
            Loader.sourceTbl[path] = source;
            ++this.pendingCount;
        }
        return source;
    };
    Loader.prototype.finish = function () {
        this.parser.resolve();
    };
    Loader.prototype.getOptions = function () {
        return this.options;
    };
    Loader.cache = new cget_1.Cache("cache/xsd", "_index.xsd");
    Loader.sourceTbl = {};
    return Loader;
}());
exports.Loader = Loader;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTG9hZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcGFyc2VyX3NjYWZmb2xkX2dlbmVyYXRvci9zcmMveHNkL0xvYWRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxvRUFBb0U7QUFDcEUsK0NBQStDO0FBQy9DLHVCQUF5QjtBQUN6Qiw2QkFBdUU7QUFJdkUsbUNBQWtDO0FBQ2xDLG1DQUFrQztBQUVsQywyRUFBMkU7QUFFM0U7SUFDRSxnQkFBWSxPQUFnQixFQUFFLE9BQXNCO1FBa0Q1QyxpQkFBWSxHQUFHLENBQUMsQ0FBQztRQWpEdkIsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFDdkIsSUFBSSxDQUFDLE9BQU8sR0FBRyxXQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ25DLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxlQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDcEMsQ0FBQztJQUVELHVCQUFNLEdBQU4sVUFBTyxRQUFnQjtRQUNyQixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDeEMsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQztJQUNyQyxDQUFDO0lBRUQsMkJBQVUsR0FBVixVQUFXLElBQVksRUFBRSxTQUFxQjtRQUM1QyxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBRTNCLElBQUksTUFBTSxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFcEMsSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNYLE1BQU0sR0FBRyxJQUFJLGVBQU0sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBRSxTQUFTLENBQUMsQ0FBQztZQUVuRCxJQUFNLEdBQUcsR0FBRyxFQUFFLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQzdDLElBQU0sY0FBYyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFFM0QsK0RBQStEO1lBQy9ELCtEQUErRDtZQUUvRCxJQUFJLEVBQUUsSUFBSSxDQUFDLFlBQVksSUFBSSxDQUFDO2dCQUFFLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUU1QyxNQUFNLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxHQUFHLE1BQU0sQ0FBQztZQUNoQyxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUM7U0FDckI7UUFFRCxPQUFPLE1BQU0sQ0FBQztJQUNoQixDQUFDO0lBRU8sdUJBQU0sR0FBZDtRQUNFLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDeEIsQ0FBQztJQUVELDJCQUFVLEdBQVY7UUFDRSxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUM7SUFDdEIsQ0FBQztJQUVjLFlBQUssR0FBRyxJQUFJLFlBQUssQ0FBQyxXQUFXLEVBQUUsWUFBWSxDQUFDLENBQUM7SUFDN0MsZ0JBQVMsR0FBK0IsRUFBRSxDQUFDO0lBVzVELGFBQUM7Q0FBQSxBQXZERCxJQXVEQztBQXZEWSx3QkFBTSIsInNvdXJjZXNDb250ZW50IjpbIi8vIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIGN4c2QsIGNvcHlyaWdodCAoYykgMjAxNS0yMDE2IEJ1c0Zhc3RlciBMdGQuXG4vLyBSZWxlYXNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UsIHNlZSBMSUNFTlNFLlxuaW1wb3J0ICogYXMgZnMgZnJvbSBcImZzXCI7XG5pbXBvcnQgeyBBZGRyZXNzLCBGZXRjaE9wdGlvbnMsIENhY2hlLCBDYWNoZVJlc3VsdCwgdXRpbCB9IGZyb20gXCJjZ2V0XCI7XG5cbmltcG9ydCB7IENvbnRleHQgfSBmcm9tIFwiLi9Db250ZXh0XCI7XG5pbXBvcnQgeyBOYW1lc3BhY2UgfSBmcm9tIFwiLi9OYW1lc3BhY2VcIjtcbmltcG9ydCB7IFNvdXJjZSB9IGZyb20gXCIuL1NvdXJjZVwiO1xuaW1wb3J0IHsgUGFyc2VyIH0gZnJvbSBcIi4vUGFyc2VyXCI7XG5cbi8qKiBMb2FkZXIgaGFuZGxlcyBjYWNoaW5nIHNjaGVtYSBkZWZpbml0aW9ucyBhbmQgY2FsbGluZyBwYXJzZXIgc3RhZ2VzLiAqL1xuXG5leHBvcnQgY2xhc3MgTG9hZGVyIHtcbiAgY29uc3RydWN0b3IoY29udGV4dDogQ29udGV4dCwgb3B0aW9ucz86IEZldGNoT3B0aW9ucykge1xuICAgIHRoaXMuY29udGV4dCA9IGNvbnRleHQ7XG4gICAgdGhpcy5vcHRpb25zID0gdXRpbC5jbG9uZShvcHRpb25zKTtcbiAgICB0aGlzLnBhcnNlciA9IG5ldyBQYXJzZXIoY29udGV4dCk7XG4gIH1cblxuICBpbXBvcnQoZmlsZVBhdGg6IHN0cmluZykge1xuICAgIHRoaXMuc291cmNlID0gdGhpcy5pbXBvcnRGaWxlKGZpbGVQYXRoKTtcbiAgICByZXR1cm4gdGhpcy5zb3VyY2UudGFyZ2V0TmFtZXNwYWNlO1xuICB9XG5cbiAgaW1wb3J0RmlsZShwYXRoOiBzdHJpbmcsIG5hbWVzcGFjZT86IE5hbWVzcGFjZSkge1xuICAgIHZhciBvcHRpb25zID0gdGhpcy5vcHRpb25zO1xuXG4gICAgdmFyIHNvdXJjZSA9IExvYWRlci5zb3VyY2VUYmxbcGF0aF07XG5cbiAgICBpZiAoIXNvdXJjZSkge1xuICAgICAgc291cmNlID0gbmV3IFNvdXJjZShwYXRoLCB0aGlzLmNvbnRleHQsIG5hbWVzcGFjZSk7XG5cbiAgICAgIGNvbnN0IHhtbCA9IGZzLnJlYWRGaWxlU3luYyhwYXRoKS50b1N0cmluZygpO1xuICAgICAgY29uc3QgZGVwZW5kZW5jeUxpc3QgPSB0aGlzLnBhcnNlci5pbml0KHhtbCwgc291cmNlLCB0aGlzKTtcblxuICAgICAgLy8gVE9ETzogVGhlIHNvdXJjZSBjb3VsZCBiZSBwYXJzZWQgYWxyZWFkeSBpZiBhbGwgZGVwZW5kZW5jaWVzXG4gICAgICAvLyAoYW5kIHJlY3Vyc2l2ZWx5IHRoZWlyIGRlcGVuZGVuY2llcykgaGF2ZSBiZWVuIHByZXByb2Nlc3NlZC5cblxuICAgICAgaWYgKC0tdGhpcy5wZW5kaW5nQ291bnQgPT0gMCkgdGhpcy5maW5pc2goKTtcblxuICAgICAgTG9hZGVyLnNvdXJjZVRibFtwYXRoXSA9IHNvdXJjZTtcbiAgICAgICsrdGhpcy5wZW5kaW5nQ291bnQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIHNvdXJjZTtcbiAgfVxuXG4gIHByaXZhdGUgZmluaXNoKCkge1xuICAgIHRoaXMucGFyc2VyLnJlc29sdmUoKTtcbiAgfVxuXG4gIGdldE9wdGlvbnMoKSB7XG4gICAgcmV0dXJuIHRoaXMub3B0aW9ucztcbiAgfVxuXG4gIHByaXZhdGUgc3RhdGljIGNhY2hlID0gbmV3IENhY2hlKFwiY2FjaGUveHNkXCIsIFwiX2luZGV4LnhzZFwiKTtcbiAgcHJpdmF0ZSBzdGF0aWMgc291cmNlVGJsOiB7IFtwYXRoOiBzdHJpbmddOiBTb3VyY2UgfSA9IHt9O1xuXG4gIHByaXZhdGUgY29udGV4dDogQ29udGV4dDtcbiAgcHJpdmF0ZSBvcHRpb25zOiBGZXRjaE9wdGlvbnM7XG4gIHByaXZhdGUgcGFyc2VyOiBQYXJzZXI7XG4gIHByaXZhdGUgc291cmNlOiBTb3VyY2U7XG5cbiAgcHJpdmF0ZSBwZW5kaW5nQ291bnQgPSAwO1xuXG4gIHByaXZhdGUgcmVzb2x2ZTogKHJlc3VsdDogTmFtZXNwYWNlKSA9PiB2b2lkO1xuICBwcml2YXRlIHJlamVjdDogKGVycjogYW55KSA9PiB2b2lkO1xufVxuIl19