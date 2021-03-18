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
exports.Exporter = void 0;
var path = require("path");
var cget_1 = require("cget");
var Transform_1 = require("../transform/Transform");
var Exporter = /** @class */ (function (_super) {
    __extends(Exporter, _super);
    function Exporter(doc, cache) {
        var _this = _super.call(this, doc) || this;
        _this.state = { cache: cache };
        return _this;
    }
    Exporter.prototype.writeHeader = function () {
        var output = [];
        var importTbl = this.namespace.getUsedImportTbl();
        for (var _i = 0, _a = Object.keys(importTbl).sort(); _i < _a.length; _i++) {
            var shortName = _a[_i];
            var namespace = importTbl[shortName];
            var relativePath = this.getPathTo(namespace.name);
            output.push(this.writeImport(shortName, relativePath, namespace.name));
        }
        return (output);
    };
    /** Output namespace contents to cache, if not already exported. */
    Exporter.prototype.prepare = function () {
        var _this = this;
        var doc = this.doc;
        if (!doc)
            return (null);
        this.cacheDir = path.dirname(this.state.cache.getCachePathSync(new cget_1.Address(doc.namespace.name)));
        var outName = this.getOutName(doc.namespace.name);
        return (this.state.cache.ifCached(outName).then(function (isCached) {
            if (isCached)
                return (null);
            return (_this.state.cache.store(outName, _this.writeContents()));
        }));
    };
    /** Get relative path to another namespace within the cache. */
    Exporter.prototype.getPathTo = function (name) {
        // Append and then strip a file extension so references to a parent
        // directory will target the directory by name instead of .. or similar.
        var targetPath = this.state.cache.getCachePathSync(new cget_1.Address(name)) + '.js';
        // Always output forward slashes.
        // If path.sep is a backslash as on Windows, we need to escape it (as a double-backslash) for it to be a valid Regex.
        // We are using a Regex because the alternative string.replace(string, string) overload only replaces the first occurance.
        var separatorRegex = new RegExp(path.sep.replace("\\", "\\\\"), 'g');
        var relPath = path.relative(this.cacheDir, targetPath).replace(separatorRegex, '/').replace(/\.js$/, '');
        if (!relPath.match(/^[./]/))
            relPath = './' + relPath;
        return (relPath);
    };
    return Exporter;
}(Transform_1.Transform));
exports.Exporter = Exporter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRXhwb3J0ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wYXJzZXJfc2NhZmZvbGRfZ2VuZXJhdG9yL3NyYy9zY2hlbWEvZXhwb3J0ZXIvRXhwb3J0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLG9FQUFvRTtBQUNwRSwrQ0FBK0M7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUcvQywyQkFBNkI7QUFFN0IsNkJBQW1DO0FBRW5DLG9EQUFpRDtBQU9qRDtJQUF1Qyw0QkFBbUM7SUFDekUsa0JBQVksR0FBUyxFQUFFLEtBQVk7UUFBbkMsWUFDQyxrQkFBTSxHQUFHLENBQUMsU0FFVjtRQURBLEtBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLENBQUM7O0lBQy9CLENBQUM7SUFFRCw4QkFBVyxHQUFYO1FBQ0MsSUFBSSxNQUFNLEdBQWEsRUFBRSxDQUFDO1FBQzFCLElBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztRQUVsRCxLQUFxQixVQUE2QixFQUE3QixLQUFBLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQTdCLGNBQTZCLEVBQTdCLElBQTZCLEVBQUU7WUFBaEQsSUFBSSxTQUFTLFNBQUE7WUFDaEIsSUFBSSxTQUFTLEdBQUcsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQ3JDLElBQUksWUFBWSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2xELE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLEVBQUUsWUFBWSxFQUFFLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1NBQ3ZFO1FBRUQsT0FBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ2hCLENBQUM7SUFJRCxtRUFBbUU7SUFFbkUsMEJBQU8sR0FBUDtRQUFBLGlCQWtCQztRQWpCQSxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDO1FBQ25CLElBQUcsQ0FBQyxHQUFHO1lBQUUsT0FBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRXRCLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FDM0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxjQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUNsRSxDQUFDO1FBRUYsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRWxELE9BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUMsUUFBaUI7WUFDaEUsSUFBRyxRQUFRO2dCQUFFLE9BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQTtZQUV6QixPQUFNLENBQUMsS0FBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUM1QixPQUFPLEVBQ1AsS0FBSSxDQUFDLGFBQWEsRUFBRSxDQUNwQixDQUFDLENBQUM7UUFDSixDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUlELCtEQUErRDtJQUUvRCw0QkFBUyxHQUFULFVBQVUsSUFBWTtRQUNyQixtRUFBbUU7UUFDbkUsd0VBQXdFO1FBRXhFLElBQUksVUFBVSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDLElBQUksY0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDO1FBRTlFLGlDQUFpQztRQUNqQyxxSEFBcUg7UUFDckgsMEhBQTBIO1FBQzFILElBQUksY0FBYyxHQUFHLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUVyRSxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUMxQixJQUFJLENBQUMsUUFBUSxFQUNiLFVBQVUsQ0FDVixDQUFDLE9BQU8sQ0FBQyxjQUFjLEVBQUUsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUMsQ0FBQztRQUVwRCxJQUFHLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUM7WUFBRSxPQUFPLEdBQUcsSUFBSSxHQUFHLE9BQU8sQ0FBQztRQUVyRCxPQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDakIsQ0FBQztJQVFGLGVBQUM7QUFBRCxDQUFDLEFBMUVELENBQXVDLHFCQUFTLEdBMEUvQztBQTFFcUIsNEJBQVEiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBUaGlzIGZpbGUgaXMgcGFydCBvZiBjeHNkLCBjb3B5cmlnaHQgKGMpIDIwMTUtMjAxNiBCdXNGYXN0ZXIgTHRkLlxuLy8gUmVsZWFzZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlLCBzZWUgTElDRU5TRS5cblxuaW1wb3J0ICogYXMgUHJvbWlzZSBmcm9tICdibHVlYmlyZCc7XG5pbXBvcnQgKiBhcyBwYXRoIGZyb20gJ3BhdGgnO1xuXG5pbXBvcnQge0FkZHJlc3MsIENhY2hlfSBmcm9tICdjZ2V0J1xuXG5pbXBvcnQge1RyYW5zZm9ybX0gZnJvbSAnLi4vdHJhbnNmb3JtL1RyYW5zZm9ybSc7XG5pbXBvcnQge1R5cGV9IGZyb20gJy4uL1R5cGUnO1xuXG5leHBvcnQgaW50ZXJmYWNlIFN0YXRlIHtcblx0Y2FjaGU6IENhY2hlO1xufVxuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgRXhwb3J0ZXIgZXh0ZW5kcyBUcmFuc2Zvcm08RXhwb3J0ZXIsIGJvb2xlYW4sIFN0YXRlPiB7XG5cdGNvbnN0cnVjdG9yKGRvYzogVHlwZSwgY2FjaGU6IENhY2hlKSB7XG5cdFx0c3VwZXIoZG9jKTtcblx0XHR0aGlzLnN0YXRlID0geyBjYWNoZTogY2FjaGUgfTtcblx0fVxuXG5cdHdyaXRlSGVhZGVyKCkge1xuXHRcdHZhciBvdXRwdXQ6IHN0cmluZ1tdID0gW107XG5cdFx0dmFyIGltcG9ydFRibCA9IHRoaXMubmFtZXNwYWNlLmdldFVzZWRJbXBvcnRUYmwoKTtcblxuXHRcdGZvcih2YXIgc2hvcnROYW1lIG9mIE9iamVjdC5rZXlzKGltcG9ydFRibCkuc29ydCgpKSB7XG5cdFx0XHR2YXIgbmFtZXNwYWNlID0gaW1wb3J0VGJsW3Nob3J0TmFtZV07XG5cdFx0XHR2YXIgcmVsYXRpdmVQYXRoID0gdGhpcy5nZXRQYXRoVG8obmFtZXNwYWNlLm5hbWUpO1xuXHRcdFx0b3V0cHV0LnB1c2godGhpcy53cml0ZUltcG9ydChzaG9ydE5hbWUsIHJlbGF0aXZlUGF0aCwgbmFtZXNwYWNlLm5hbWUpKTtcblx0XHR9XG5cblx0XHRyZXR1cm4ob3V0cHV0KTtcblx0fVxuXG5cdGFic3RyYWN0IHdyaXRlSW1wb3J0KHNob3J0TmFtZTogc3RyaW5nLCByZWxhdGl2ZVBhdGg6IHN0cmluZywgYWJzb2x1dGVQYXRoOiBzdHJpbmcpOiBzdHJpbmc7XG5cblx0LyoqIE91dHB1dCBuYW1lc3BhY2UgY29udGVudHMgdG8gY2FjaGUsIGlmIG5vdCBhbHJlYWR5IGV4cG9ydGVkLiAqL1xuXG5cdHByZXBhcmUoKSB7XG5cdFx0dmFyIGRvYyA9IHRoaXMuZG9jO1xuXHRcdGlmKCFkb2MpIHJldHVybihudWxsKTtcblxuXHRcdHRoaXMuY2FjaGVEaXIgPSBwYXRoLmRpcm5hbWUoXG5cdFx0XHR0aGlzLnN0YXRlLmNhY2hlLmdldENhY2hlUGF0aFN5bmMobmV3IEFkZHJlc3MoZG9jLm5hbWVzcGFjZS5uYW1lKSlcblx0XHQpO1xuXG5cdFx0dmFyIG91dE5hbWUgPSB0aGlzLmdldE91dE5hbWUoZG9jLm5hbWVzcGFjZS5uYW1lKTtcblxuXHRcdHJldHVybih0aGlzLnN0YXRlLmNhY2hlLmlmQ2FjaGVkKG91dE5hbWUpLnRoZW4oKGlzQ2FjaGVkOiBib29sZWFuKSA9PiB7XG5cdFx0XHRpZihpc0NhY2hlZCkgcmV0dXJuKG51bGwpXG5cblx0XHRcdHJldHVybih0aGlzLnN0YXRlLmNhY2hlLnN0b3JlKFxuXHRcdFx0XHRvdXROYW1lLFxuXHRcdFx0XHR0aGlzLndyaXRlQ29udGVudHMoKVxuXHRcdFx0KSk7XG5cdFx0fSkpO1xuXHR9XG5cblx0YWJzdHJhY3Qgd3JpdGVDb250ZW50cygpOiBzdHJpbmc7XG5cblx0LyoqIEdldCByZWxhdGl2ZSBwYXRoIHRvIGFub3RoZXIgbmFtZXNwYWNlIHdpdGhpbiB0aGUgY2FjaGUuICovXG5cblx0Z2V0UGF0aFRvKG5hbWU6IHN0cmluZykge1xuXHRcdC8vIEFwcGVuZCBhbmQgdGhlbiBzdHJpcCBhIGZpbGUgZXh0ZW5zaW9uIHNvIHJlZmVyZW5jZXMgdG8gYSBwYXJlbnRcblx0XHQvLyBkaXJlY3Rvcnkgd2lsbCB0YXJnZXQgdGhlIGRpcmVjdG9yeSBieSBuYW1lIGluc3RlYWQgb2YgLi4gb3Igc2ltaWxhci5cblxuXHRcdHZhciB0YXJnZXRQYXRoID0gdGhpcy5zdGF0ZS5jYWNoZS5nZXRDYWNoZVBhdGhTeW5jKG5ldyBBZGRyZXNzKG5hbWUpKSArICcuanMnO1xuXG5cdFx0Ly8gQWx3YXlzIG91dHB1dCBmb3J3YXJkIHNsYXNoZXMuXG5cdFx0Ly8gSWYgcGF0aC5zZXAgaXMgYSBiYWNrc2xhc2ggYXMgb24gV2luZG93cywgd2UgbmVlZCB0byBlc2NhcGUgaXQgKGFzIGEgZG91YmxlLWJhY2tzbGFzaCkgZm9yIGl0IHRvIGJlIGEgdmFsaWQgUmVnZXguXG5cdFx0Ly8gV2UgYXJlIHVzaW5nIGEgUmVnZXggYmVjYXVzZSB0aGUgYWx0ZXJuYXRpdmUgc3RyaW5nLnJlcGxhY2Uoc3RyaW5nLCBzdHJpbmcpIG92ZXJsb2FkIG9ubHkgcmVwbGFjZXMgdGhlIGZpcnN0IG9jY3VyYW5jZS5cblx0XHR2YXIgc2VwYXJhdG9yUmVnZXggPSBuZXcgUmVnRXhwKHBhdGguc2VwLnJlcGxhY2UoXCJcXFxcXCIsIFwiXFxcXFxcXFxcIiksICdnJyk7XG5cdFx0XG5cdFx0dmFyIHJlbFBhdGggPSBwYXRoLnJlbGF0aXZlKFxuXHRcdFx0dGhpcy5jYWNoZURpcixcblx0XHRcdHRhcmdldFBhdGhcblx0XHQpLnJlcGxhY2Uoc2VwYXJhdG9yUmVnZXgsICcvJykucmVwbGFjZSgvXFwuanMkLywgJycpO1xuXG5cdFx0aWYoIXJlbFBhdGgubWF0Y2goL15bLi9dLykpIHJlbFBhdGggPSAnLi8nICsgcmVsUGF0aDtcblxuXHRcdHJldHVybihyZWxQYXRoKTtcblx0fVxuXG5cdHByb3RlY3RlZCBhYnN0cmFjdCBnZXRPdXROYW1lKG5hbWU6IHN0cmluZyk6IHN0cmluZztcblxuXHRwcm90ZWN0ZWQgc3RhdGU6IFN0YXRlO1xuXG5cdC8qKiBGdWxsIHBhdGggb2YgZGlyZWN0b3J5IGNvbnRhaW5pbmcgZXhwb3J0ZWQgb3V0cHV0IGZvciB0aGUgY3VycmVudCBuYW1lc3BhY2UuICovXG5cdHByb3RlY3RlZCBjYWNoZURpcjogc3RyaW5nO1xufVxuIl19