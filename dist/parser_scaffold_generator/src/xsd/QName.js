"use strict";
// This file is part of cxsd, copyright (c) 2015-2016 BusFaster Ltd.
// Released under the MIT license, see LICENSE.
Object.defineProperty(exports, "__esModule", { value: true });
exports.QName = void 0;
/** Qualified name, including reference to a namespace. */
var QName = /** @class */ (function () {
    function QName(name, source) {
        if (name)
            this.parse(name, source);
    }
    /** Parse a name with a possible namespace prefix. */
    QName.prototype.parse = function (name, source, namespace) {
        var splitter = name.indexOf(':');
        name = name.toLowerCase();
        if (splitter >= 0) {
            namespace = source.lookupNamespace(name.substr(0, splitter));
            name = name.substr(splitter + 1);
        }
        else if (!namespace) {
            namespace = source.targetNamespace;
        }
        this.namespace = namespace;
        this.name = name;
        this.nameFull = namespace ? (namespace.id + ':' + name) : name;
        return (this);
    };
    /** Parse a class name internally used by the XSD parser. */
    QName.prototype.parseClass = function (name, namespace) {
        // TODO: remove following line.
        name = name.toLowerCase();
        this.namespace = namespace;
        this.name = name;
        this.nameFull = namespace.id + ':' + name;
        return (this);
    };
    QName.prototype.parsePrimitive = function (name, namespace) {
        // TODO: remove following line.
        name = name.toLowerCase();
        this.namespace = namespace;
        this.name = name;
        this.nameFull = '*:' + name;
        return (this);
    };
    /** Format name for printing (for debugging), together with namespace name. */
    QName.prototype.format = function () {
        if (this.namespace)
            return (this.namespace.name + ':' + this.name);
        else
            return (this.name);
    };
    return QName;
}());
exports.QName = QName;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUU5hbWUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wYXJzZXJfc2NhZmZvbGRfZ2VuZXJhdG9yL3NyYy94c2QvUU5hbWUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLG9FQUFvRTtBQUNwRSwrQ0FBK0M7OztBQUsvQywwREFBMEQ7QUFFMUQ7SUFDQyxlQUFZLElBQWEsRUFBRSxNQUFlO1FBQ3pDLElBQUcsSUFBSTtZQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQ25DLENBQUM7SUFFRCxxREFBcUQ7SUFFckQscUJBQUssR0FBTCxVQUFNLElBQVksRUFBRSxNQUFjLEVBQUUsU0FBcUI7UUFDeEQsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUVqQyxJQUFJLEdBQUcsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBRTFCLElBQUcsUUFBUSxJQUFJLENBQUMsRUFBRTtZQUNqQixTQUFTLEdBQUcsTUFBTSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQzdELElBQUksR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUMsQ0FBQztTQUNqQzthQUFNLElBQUcsQ0FBQyxTQUFTLEVBQUU7WUFDckIsU0FBUyxHQUFHLE1BQU0sQ0FBQyxlQUFlLENBQUM7U0FDbkM7UUFFRCxJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztRQUMzQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNqQixJQUFJLENBQUMsUUFBUSxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsRUFBRSxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO1FBRS9ELE9BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNkLENBQUM7SUFFRCw0REFBNEQ7SUFFNUQsMEJBQVUsR0FBVixVQUFXLElBQVksRUFBRSxTQUFvQjtRQUM1QywrQkFBK0I7UUFDL0IsSUFBSSxHQUFHLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUUxQixJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztRQUMzQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNqQixJQUFJLENBQUMsUUFBUSxHQUFHLFNBQVMsQ0FBQyxFQUFFLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQztRQUUxQyxPQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDZCxDQUFDO0lBRUQsOEJBQWMsR0FBZCxVQUFlLElBQVksRUFBRSxTQUFvQjtRQUNoRCwrQkFBK0I7UUFDL0IsSUFBSSxHQUFHLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUUxQixJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztRQUMzQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNqQixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksR0FBRyxJQUFJLENBQUM7UUFFNUIsT0FBTSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2QsQ0FBQztJQUVELDhFQUE4RTtJQUU5RSxzQkFBTSxHQUFOO1FBQ0MsSUFBRyxJQUFJLENBQUMsU0FBUztZQUFFLE9BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDOztZQUM1RCxPQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3hCLENBQUM7SUFLRixZQUFDO0FBQUQsQ0FBQyxBQTVERCxJQTREQztBQTVEWSxzQkFBSyIsInNvdXJjZXNDb250ZW50IjpbIi8vIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIGN4c2QsIGNvcHlyaWdodCAoYykgMjAxNS0yMDE2IEJ1c0Zhc3RlciBMdGQuXG4vLyBSZWxlYXNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UsIHNlZSBMSUNFTlNFLlxuXG5pbXBvcnQge05hbWVzcGFjZX0gZnJvbSAnLi9OYW1lc3BhY2UnXG5pbXBvcnQge1NvdXJjZX0gZnJvbSAnLi9Tb3VyY2UnXG5cbi8qKiBRdWFsaWZpZWQgbmFtZSwgaW5jbHVkaW5nIHJlZmVyZW5jZSB0byBhIG5hbWVzcGFjZS4gKi9cblxuZXhwb3J0IGNsYXNzIFFOYW1lIHtcblx0Y29uc3RydWN0b3IobmFtZT86IHN0cmluZywgc291cmNlPzogU291cmNlKSB7XG5cdFx0aWYobmFtZSkgdGhpcy5wYXJzZShuYW1lLCBzb3VyY2UpO1xuXHR9XG5cblx0LyoqIFBhcnNlIGEgbmFtZSB3aXRoIGEgcG9zc2libGUgbmFtZXNwYWNlIHByZWZpeC4gKi9cblxuXHRwYXJzZShuYW1lOiBzdHJpbmcsIHNvdXJjZTogU291cmNlLCBuYW1lc3BhY2U/OiBOYW1lc3BhY2UpIHtcblx0XHR2YXIgc3BsaXR0ZXIgPSBuYW1lLmluZGV4T2YoJzonKTtcblxuXHRcdG5hbWUgPSBuYW1lLnRvTG93ZXJDYXNlKCk7XG5cblx0XHRpZihzcGxpdHRlciA+PSAwKSB7XG5cdFx0XHRuYW1lc3BhY2UgPSBzb3VyY2UubG9va3VwTmFtZXNwYWNlKG5hbWUuc3Vic3RyKDAsIHNwbGl0dGVyKSk7XG5cdFx0XHRuYW1lID0gbmFtZS5zdWJzdHIoc3BsaXR0ZXIgKyAxKTtcblx0XHR9IGVsc2UgaWYoIW5hbWVzcGFjZSkge1xuXHRcdFx0bmFtZXNwYWNlID0gc291cmNlLnRhcmdldE5hbWVzcGFjZTtcblx0XHR9XG5cblx0XHR0aGlzLm5hbWVzcGFjZSA9IG5hbWVzcGFjZTtcblx0XHR0aGlzLm5hbWUgPSBuYW1lO1xuXHRcdHRoaXMubmFtZUZ1bGwgPSBuYW1lc3BhY2UgPyAobmFtZXNwYWNlLmlkICsgJzonICsgbmFtZSkgOiBuYW1lO1xuXG5cdFx0cmV0dXJuKHRoaXMpO1xuXHR9XG5cblx0LyoqIFBhcnNlIGEgY2xhc3MgbmFtZSBpbnRlcm5hbGx5IHVzZWQgYnkgdGhlIFhTRCBwYXJzZXIuICovXG5cblx0cGFyc2VDbGFzcyhuYW1lOiBzdHJpbmcsIG5hbWVzcGFjZTogTmFtZXNwYWNlKSB7XG5cdFx0Ly8gVE9ETzogcmVtb3ZlIGZvbGxvd2luZyBsaW5lLlxuXHRcdG5hbWUgPSBuYW1lLnRvTG93ZXJDYXNlKCk7XG5cblx0XHR0aGlzLm5hbWVzcGFjZSA9IG5hbWVzcGFjZTtcblx0XHR0aGlzLm5hbWUgPSBuYW1lO1xuXHRcdHRoaXMubmFtZUZ1bGwgPSBuYW1lc3BhY2UuaWQgKyAnOicgKyBuYW1lO1xuXG5cdFx0cmV0dXJuKHRoaXMpO1xuXHR9XG5cblx0cGFyc2VQcmltaXRpdmUobmFtZTogc3RyaW5nLCBuYW1lc3BhY2U6IE5hbWVzcGFjZSkge1xuXHRcdC8vIFRPRE86IHJlbW92ZSBmb2xsb3dpbmcgbGluZS5cblx0XHRuYW1lID0gbmFtZS50b0xvd2VyQ2FzZSgpO1xuXG5cdFx0dGhpcy5uYW1lc3BhY2UgPSBuYW1lc3BhY2U7XG5cdFx0dGhpcy5uYW1lID0gbmFtZTtcblx0XHR0aGlzLm5hbWVGdWxsID0gJyo6JyArIG5hbWU7XG5cblx0XHRyZXR1cm4odGhpcyk7XG5cdH1cblxuXHQvKiogRm9ybWF0IG5hbWUgZm9yIHByaW50aW5nIChmb3IgZGVidWdnaW5nKSwgdG9nZXRoZXIgd2l0aCBuYW1lc3BhY2UgbmFtZS4gKi9cblxuXHRmb3JtYXQoKSB7XG5cdFx0aWYodGhpcy5uYW1lc3BhY2UpIHJldHVybih0aGlzLm5hbWVzcGFjZS5uYW1lICsgJzonICsgdGhpcy5uYW1lKTtcblx0XHRlbHNlIHJldHVybih0aGlzLm5hbWUpO1xuXHR9XG5cblx0bmFtZXNwYWNlOiBOYW1lc3BhY2U7XG5cdG5hbWU6IHN0cmluZztcblx0bmFtZUZ1bGw6IHN0cmluZztcbn1cbiJdfQ==