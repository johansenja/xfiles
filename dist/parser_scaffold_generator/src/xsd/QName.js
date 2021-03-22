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
        var splitter = name.indexOf(":");
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
        this.nameFull = namespace ? namespace.id + ":" + name : name;
        return this;
    };
    /** Parse a class name internally used by the XSD parser. */
    QName.prototype.parseClass = function (name, namespace) {
        // TODO: remove following line.
        name = name.toLowerCase();
        this.namespace = namespace;
        this.name = name;
        this.nameFull = namespace.id + ":" + name;
        return this;
    };
    QName.prototype.parsePrimitive = function (name, namespace) {
        // TODO: remove following line.
        name = name.toLowerCase();
        this.namespace = namespace;
        this.name = name;
        this.nameFull = "*:" + name;
        return this;
    };
    /** Format name for printing (for debugging), together with namespace name. */
    QName.prototype.format = function () {
        if (this.namespace)
            return this.namespace.name + ":" + this.name;
        else
            return this.name;
    };
    return QName;
}());
exports.QName = QName;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUU5hbWUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wYXJzZXJfc2NhZmZvbGRfZ2VuZXJhdG9yL3NyYy94c2QvUU5hbWUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLG9FQUFvRTtBQUNwRSwrQ0FBK0M7OztBQUsvQywwREFBMEQ7QUFFMUQ7SUFDRSxlQUFZLElBQWEsRUFBRSxNQUFlO1FBQ3hDLElBQUksSUFBSTtZQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQ3JDLENBQUM7SUFFRCxxREFBcUQ7SUFFckQscUJBQUssR0FBTCxVQUFNLElBQVksRUFBRSxNQUFjLEVBQUUsU0FBcUI7UUFDdkQsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUVqQyxJQUFJLEdBQUcsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBRTFCLElBQUksUUFBUSxJQUFJLENBQUMsRUFBRTtZQUNqQixTQUFTLEdBQUcsTUFBTSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQzdELElBQUksR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUMsQ0FBQztTQUNsQzthQUFNLElBQUksQ0FBQyxTQUFTLEVBQUU7WUFDckIsU0FBUyxHQUFHLE1BQU0sQ0FBQyxlQUFlLENBQUM7U0FDcEM7UUFFRCxJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztRQUMzQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNqQixJQUFJLENBQUMsUUFBUSxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLEVBQUUsR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7UUFFN0QsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBRUQsNERBQTREO0lBRTVELDBCQUFVLEdBQVYsVUFBVyxJQUFZLEVBQUUsU0FBb0I7UUFDM0MsK0JBQStCO1FBQy9CLElBQUksR0FBRyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFFMUIsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7UUFDM0IsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDakIsSUFBSSxDQUFDLFFBQVEsR0FBRyxTQUFTLENBQUMsRUFBRSxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUM7UUFFMUMsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBRUQsOEJBQWMsR0FBZCxVQUFlLElBQVksRUFBRSxTQUFvQjtRQUMvQywrQkFBK0I7UUFDL0IsSUFBSSxHQUFHLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUUxQixJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztRQUMzQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNqQixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksR0FBRyxJQUFJLENBQUM7UUFFNUIsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBRUQsOEVBQThFO0lBRTlFLHNCQUFNLEdBQU47UUFDRSxJQUFJLElBQUksQ0FBQyxTQUFTO1lBQUUsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQzs7WUFDNUQsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDO0lBQ3hCLENBQUM7SUFLSCxZQUFDO0FBQUQsQ0FBQyxBQTVERCxJQTREQztBQTVEWSxzQkFBSyIsInNvdXJjZXNDb250ZW50IjpbIi8vIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIGN4c2QsIGNvcHlyaWdodCAoYykgMjAxNS0yMDE2IEJ1c0Zhc3RlciBMdGQuXG4vLyBSZWxlYXNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UsIHNlZSBMSUNFTlNFLlxuXG5pbXBvcnQgeyBOYW1lc3BhY2UgfSBmcm9tIFwiLi9OYW1lc3BhY2VcIjtcbmltcG9ydCB7IFNvdXJjZSB9IGZyb20gXCIuL1NvdXJjZVwiO1xuXG4vKiogUXVhbGlmaWVkIG5hbWUsIGluY2x1ZGluZyByZWZlcmVuY2UgdG8gYSBuYW1lc3BhY2UuICovXG5cbmV4cG9ydCBjbGFzcyBRTmFtZSB7XG4gIGNvbnN0cnVjdG9yKG5hbWU/OiBzdHJpbmcsIHNvdXJjZT86IFNvdXJjZSkge1xuICAgIGlmIChuYW1lKSB0aGlzLnBhcnNlKG5hbWUsIHNvdXJjZSk7XG4gIH1cblxuICAvKiogUGFyc2UgYSBuYW1lIHdpdGggYSBwb3NzaWJsZSBuYW1lc3BhY2UgcHJlZml4LiAqL1xuXG4gIHBhcnNlKG5hbWU6IHN0cmluZywgc291cmNlOiBTb3VyY2UsIG5hbWVzcGFjZT86IE5hbWVzcGFjZSkge1xuICAgIHZhciBzcGxpdHRlciA9IG5hbWUuaW5kZXhPZihcIjpcIik7XG5cbiAgICBuYW1lID0gbmFtZS50b0xvd2VyQ2FzZSgpO1xuXG4gICAgaWYgKHNwbGl0dGVyID49IDApIHtcbiAgICAgIG5hbWVzcGFjZSA9IHNvdXJjZS5sb29rdXBOYW1lc3BhY2UobmFtZS5zdWJzdHIoMCwgc3BsaXR0ZXIpKTtcbiAgICAgIG5hbWUgPSBuYW1lLnN1YnN0cihzcGxpdHRlciArIDEpO1xuICAgIH0gZWxzZSBpZiAoIW5hbWVzcGFjZSkge1xuICAgICAgbmFtZXNwYWNlID0gc291cmNlLnRhcmdldE5hbWVzcGFjZTtcbiAgICB9XG5cbiAgICB0aGlzLm5hbWVzcGFjZSA9IG5hbWVzcGFjZTtcbiAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgIHRoaXMubmFtZUZ1bGwgPSBuYW1lc3BhY2UgPyBuYW1lc3BhY2UuaWQgKyBcIjpcIiArIG5hbWUgOiBuYW1lO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKiogUGFyc2UgYSBjbGFzcyBuYW1lIGludGVybmFsbHkgdXNlZCBieSB0aGUgWFNEIHBhcnNlci4gKi9cblxuICBwYXJzZUNsYXNzKG5hbWU6IHN0cmluZywgbmFtZXNwYWNlOiBOYW1lc3BhY2UpIHtcbiAgICAvLyBUT0RPOiByZW1vdmUgZm9sbG93aW5nIGxpbmUuXG4gICAgbmFtZSA9IG5hbWUudG9Mb3dlckNhc2UoKTtcblxuICAgIHRoaXMubmFtZXNwYWNlID0gbmFtZXNwYWNlO1xuICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgdGhpcy5uYW1lRnVsbCA9IG5hbWVzcGFjZS5pZCArIFwiOlwiICsgbmFtZTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgcGFyc2VQcmltaXRpdmUobmFtZTogc3RyaW5nLCBuYW1lc3BhY2U6IE5hbWVzcGFjZSkge1xuICAgIC8vIFRPRE86IHJlbW92ZSBmb2xsb3dpbmcgbGluZS5cbiAgICBuYW1lID0gbmFtZS50b0xvd2VyQ2FzZSgpO1xuXG4gICAgdGhpcy5uYW1lc3BhY2UgPSBuYW1lc3BhY2U7XG4gICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICB0aGlzLm5hbWVGdWxsID0gXCIqOlwiICsgbmFtZTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqIEZvcm1hdCBuYW1lIGZvciBwcmludGluZyAoZm9yIGRlYnVnZ2luZyksIHRvZ2V0aGVyIHdpdGggbmFtZXNwYWNlIG5hbWUuICovXG5cbiAgZm9ybWF0KCkge1xuICAgIGlmICh0aGlzLm5hbWVzcGFjZSkgcmV0dXJuIHRoaXMubmFtZXNwYWNlLm5hbWUgKyBcIjpcIiArIHRoaXMubmFtZTtcbiAgICBlbHNlIHJldHVybiB0aGlzLm5hbWU7XG4gIH1cblxuICBuYW1lc3BhY2U6IE5hbWVzcGFjZTtcbiAgbmFtZTogc3RyaW5nO1xuICBuYW1lRnVsbDogc3RyaW5nO1xufVxuIl19