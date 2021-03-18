"use strict";
// This file is part of cxml, copyright (c) 2016 BusFaster Ltd.
// Released under the MIT license, see LICENSE.
Object.defineProperty(exports, "__esModule", { value: true });
exports.State = void 0;
/** Parser state created for each input tag. */
var State = /** @class */ (function () {
    function State(parent, memberRef, type, item) {
        this.parent = parent;
        this.memberRef = memberRef;
        this.type = type;
        this.item = item;
        if (parent) {
            this.namespaceTbl = parent.namespaceTbl;
        }
        else {
            this.namespaceTbl = {};
        }
    }
    /** Add a new xmlns prefix recognized inside current tag and its children. */
    State.prototype.addNamespace = function (short, namespace) {
        var key;
        var namespaceTbl = this.namespaceTbl;
        if (this.parent && namespaceTbl == this.parent.namespaceTbl) {
            namespaceTbl = {};
            for (var _i = 0, _a = Object.keys(this.parent.namespaceTbl); _i < _a.length; _i++) {
                key = _a[_i];
                namespaceTbl[key] = this.parent.namespaceTbl[key];
            }
            this.namespaceTbl = namespaceTbl;
        }
        namespaceTbl[short] = [namespace, namespace.getPrefix()];
    };
    return State;
}());
exports.State = State;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3RhdGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTdGF0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsK0RBQStEO0FBQy9ELCtDQUErQzs7O0FBTS9DLCtDQUErQztBQUUvQztJQUNDLGVBQVksTUFBYSxFQUFFLFNBQW9CLEVBQUUsSUFBVSxFQUFFLElBQXFCO1FBQ2pGLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO1FBQzNCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBRWpCLElBQUcsTUFBTSxFQUFFO1lBQ1YsSUFBSSxDQUFDLFlBQVksR0FBRyxNQUFNLENBQUMsWUFBWSxDQUFDO1NBQ3hDO2FBQU07WUFDTixJQUFJLENBQUMsWUFBWSxHQUFHLEVBQUUsQ0FBQztTQUN2QjtJQUNGLENBQUM7SUFFRCw2RUFBNkU7SUFFN0UsNEJBQVksR0FBWixVQUFhLEtBQWEsRUFBRSxTQUFvQjtRQUMvQyxJQUFJLEdBQVcsQ0FBQztRQUNoQixJQUFJLFlBQVksR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDO1FBRXJDLElBQUcsSUFBSSxDQUFDLE1BQU0sSUFBSSxZQUFZLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLEVBQUU7WUFDM0QsWUFBWSxHQUFHLEVBQUUsQ0FBQztZQUVsQixLQUFXLFVBQXFDLEVBQXJDLEtBQUEsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxFQUFyQyxjQUFxQyxFQUFyQyxJQUFxQyxFQUFFO2dCQUE5QyxHQUFHLFNBQUE7Z0JBQ04sWUFBWSxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2FBQ2xEO1lBRUQsSUFBSSxDQUFDLFlBQVksR0FBRyxZQUFZLENBQUM7U0FDakM7UUFFRCxZQUFZLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBRSxTQUFTLEVBQUUsU0FBUyxDQUFDLFNBQVMsRUFBRSxDQUFFLENBQUM7SUFDNUQsQ0FBQztJQWNGLFlBQUM7QUFBRCxDQUFDLEFBN0NELElBNkNDO0FBN0NZLHNCQUFLIiwic291cmNlc0NvbnRlbnQiOlsiLy8gVGhpcyBmaWxlIGlzIHBhcnQgb2YgY3htbCwgY29weXJpZ2h0IChjKSAyMDE2IEJ1c0Zhc3RlciBMdGQuXG4vLyBSZWxlYXNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UsIHNlZSBMSUNFTlNFLlxuXG5pbXBvcnQge05hbWVzcGFjZX0gZnJvbSAnLi9OYW1lc3BhY2UnO1xuaW1wb3J0IHtUeXBlLCBIYW5kbGVySW5zdGFuY2V9IGZyb20gJy4vVHlwZSc7XG5pbXBvcnQge01lbWJlclJlZn0gZnJvbSAnLi9NZW1iZXJSZWYnO1xuXG4vKiogUGFyc2VyIHN0YXRlIGNyZWF0ZWQgZm9yIGVhY2ggaW5wdXQgdGFnLiAqL1xuXG5leHBvcnQgY2xhc3MgU3RhdGUge1xuXHRjb25zdHJ1Y3RvcihwYXJlbnQ6IFN0YXRlLCBtZW1iZXJSZWY6IE1lbWJlclJlZiwgdHlwZTogVHlwZSwgaXRlbTogSGFuZGxlckluc3RhbmNlKSB7XG5cdFx0dGhpcy5wYXJlbnQgPSBwYXJlbnQ7XG5cdFx0dGhpcy5tZW1iZXJSZWYgPSBtZW1iZXJSZWY7XG5cdFx0dGhpcy50eXBlID0gdHlwZTtcblx0XHR0aGlzLml0ZW0gPSBpdGVtO1xuXG5cdFx0aWYocGFyZW50KSB7XG5cdFx0XHR0aGlzLm5hbWVzcGFjZVRibCA9IHBhcmVudC5uYW1lc3BhY2VUYmw7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRoaXMubmFtZXNwYWNlVGJsID0ge307XG5cdFx0fVxuXHR9XG5cblx0LyoqIEFkZCBhIG5ldyB4bWxucyBwcmVmaXggcmVjb2duaXplZCBpbnNpZGUgY3VycmVudCB0YWcgYW5kIGl0cyBjaGlsZHJlbi4gKi9cblxuXHRhZGROYW1lc3BhY2Uoc2hvcnQ6IHN0cmluZywgbmFtZXNwYWNlOiBOYW1lc3BhY2UpIHtcblx0XHR2YXIga2V5OiBzdHJpbmc7XG5cdFx0dmFyIG5hbWVzcGFjZVRibCA9IHRoaXMubmFtZXNwYWNlVGJsO1xuXG5cdFx0aWYodGhpcy5wYXJlbnQgJiYgbmFtZXNwYWNlVGJsID09IHRoaXMucGFyZW50Lm5hbWVzcGFjZVRibCkge1xuXHRcdFx0bmFtZXNwYWNlVGJsID0ge307XG5cblx0XHRcdGZvcihrZXkgb2YgT2JqZWN0LmtleXModGhpcy5wYXJlbnQubmFtZXNwYWNlVGJsKSkge1xuXHRcdFx0XHRuYW1lc3BhY2VUYmxba2V5XSA9IHRoaXMucGFyZW50Lm5hbWVzcGFjZVRibFtrZXldO1xuXHRcdFx0fVxuXG5cdFx0XHR0aGlzLm5hbWVzcGFjZVRibCA9IG5hbWVzcGFjZVRibDtcblx0XHR9XG5cblx0XHRuYW1lc3BhY2VUYmxbc2hvcnRdID0gWyBuYW1lc3BhY2UsIG5hbWVzcGFjZS5nZXRQcmVmaXgoKSBdO1xuXHR9XG5cblx0cGFyZW50OiBTdGF0ZTtcblx0LyoqIFRhZyBtZXRhZGF0YSBpbiBzY2hlbWEsIGRlZmluaW5nIG5hbWUgYW5kIG9jY3VycmVuY2UgY291bnQuICovXG5cdG1lbWJlclJlZjogTWVtYmVyUmVmO1xuXHQvKiogVGFnIHR5cGUgaW4gc2NoZW1hLCBkZWZpbmluZyBhdHRyaWJ1dGVzIGFuZCBjaGlsZHJlbi4gKi9cblx0dHlwZTogVHlwZTtcblx0LyoqIE91dHB1dCBvYmplY3QgZm9yIGNvbnRlbnRzIG9mIHRoaXMgdGFnLiAqL1xuXHRpdGVtOiBIYW5kbGVySW5zdGFuY2U7XG5cdC8qKiBUZXh0IGNvbnRlbnQgZm91bmQgaW5zaWRlIHRoZSB0YWcuICovXG5cdHRleHRMaXN0OiBzdHJpbmdbXTtcblxuXHQvKiogUmVjb2duaXplZCB4bWxucyBwcmVmaXhlcy4gKi9cblx0bmFtZXNwYWNlVGJsOiB7IFtzaG9ydDogc3RyaW5nXTogWyBOYW1lc3BhY2UsIHN0cmluZyBdIH07XG59XG4iXX0=