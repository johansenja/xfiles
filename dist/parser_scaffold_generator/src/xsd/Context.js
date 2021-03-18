"use strict";
// This file is part of cxsd, copyright (c) 2016 BusFaster Ltd.
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
exports.Context = void 0;
var cxml = require("../../../runtime_parser");
var Namespace_1 = require("./Namespace");
var Source_1 = require("./Source");
var State_1 = require("./State");
var QName_1 = require("./QName");
var Primitive_1 = require("./types/Primitive");
/** XML parser context, holding definitions of all imported namespaces. */
var Context = /** @class */ (function (_super) {
    __extends(Context, _super);
    function Context(schemaContext) {
        var _this = _super.call(this, Namespace_1.Namespace) || this;
        /** Scope containing XML primitive types.
         * Parent of global scopes of all other namespaces. */
        _this.primitiveScope = null;
        _this.primitiveSpace = _this.registerNamespace("xml-primitives");
        _this.primitiveSpace.init(null, "Primitive");
        _this.primitiveScope = _this.populatePrimitives(_this.primitiveSpace, schemaContext);
        _this.xmlSpace = _this.registerNamespace("http://www.w3.org/XML/1998/namespace");
        _this.xmlSpace.init("http://www.w3.org/2001/xml.xsd", "xml");
        _this.xsdSpace = _this.registerNamespace("http://www.w3.org/2001/XMLSchema");
        _this.xsdSpace.init("http://www.w3.org/2009/XMLSchema/XMLSchema.xsd", "xsd");
        return _this;
    }
    Context.prototype.registerNamespace = function (name, url) {
        var namespace = _super.prototype.registerNamespace.call(this, name);
        if (url)
            namespace.updateUrl(null, url);
        return namespace;
    };
    Context.prototype.getPrimitiveScope = function () {
        // While primitiveSpace is still being initialized, this must return null.
        return this.primitiveScope;
    };
    /** Initialize special namespace containing primitive types. */
    Context.prototype.populatePrimitives = function (primitiveSpace, schemaContext) {
        var scope = primitiveSpace.getScope();
        var spec = [
            ["boolean", "boolean"],
            ["date dateTime", "Date"],
            [
                "byte decimal double float int integer long short " +
                    "unsignedLong unsignedInt unsignedShort unsignedByte " +
                    "negativeInteger nonNegativeInteger nonPositiveInteger positiveInteger ",
                "number",
            ],
            [
                "Name NCName QName anyURI language normalizedString string token " +
                    "ENTITY ENTITIES ID IDREF IDREFS NMTOKEN NMTOKENS " +
                    "gDay gMonth gMonthDay gYear gYearMonth " +
                    "hexBinary base64Binary " +
                    "duration time",
                "string",
            ],
            ["anytype", "any"],
        ];
        // TODO: these lines are ugly!
        var source = new Source_1.Source("", this, primitiveSpace);
        var state = new State_1.State(null, null, source);
        state.setScope(scope);
        schemaContext.copyNamespace(primitiveSpace).isPrimitiveSpace = true;
        for (var _i = 0, spec_1 = spec; _i < spec_1.length; _i++) {
            var typeSpec = spec_1[_i];
            var type = new Primitive_1.Primitive(null);
            type.name = typeSpec[1];
            type.init(new State_1.State(state, null));
            var outType = type.getOutType(schemaContext);
            outType.primitiveType = outType;
            outType.safeName = type.name;
            for (var _a = 0, _b = typeSpec[0].split(" "); _a < _b.length; _a++) {
                var name = _b[_a];
                scope.add(new QName_1.QName().parsePrimitive(name, primitiveSpace).nameFull, "type", type, 1, 1);
            }
        }
        return scope;
    };
    return Context;
}(cxml.ContextBase));
exports.Context = Context;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29udGV4dC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3BhcnNlcl9zY2FmZm9sZF9nZW5lcmF0b3Ivc3JjL3hzZC9Db250ZXh0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSwrREFBK0Q7QUFDL0QsK0NBQStDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFL0MsOENBQWdEO0FBRWhELHlDQUF3QztBQUd4QyxtQ0FBa0M7QUFDbEMsaUNBQWdDO0FBQ2hDLGlDQUFnQztBQUNoQywrQ0FBOEM7QUFHOUMsMEVBQTBFO0FBRTFFO0lBQTZCLDJCQUFvQztJQUMvRCxpQkFBWSxhQUE2QjtRQUF6QyxZQUNFLGtCQUFNLHFCQUFTLENBQUMsU0FnQmpCO1FBMEVEOzhEQUNzRDtRQUM5QyxvQkFBYyxHQUFVLElBQUksQ0FBQztRQTFGbkMsS0FBSSxDQUFDLGNBQWMsR0FBRyxLQUFJLENBQUMsaUJBQWlCLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUMvRCxLQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsV0FBVyxDQUFDLENBQUM7UUFDNUMsS0FBSSxDQUFDLGNBQWMsR0FBRyxLQUFJLENBQUMsa0JBQWtCLENBQzNDLEtBQUksQ0FBQyxjQUFjLEVBQ25CLGFBQWEsQ0FDZCxDQUFDO1FBRUYsS0FBSSxDQUFDLFFBQVEsR0FBRyxLQUFJLENBQUMsaUJBQWlCLENBQ3BDLHNDQUFzQyxDQUN2QyxDQUFDO1FBQ0YsS0FBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsZ0NBQWdDLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFFNUQsS0FBSSxDQUFDLFFBQVEsR0FBRyxLQUFJLENBQUMsaUJBQWlCLENBQUMsa0NBQWtDLENBQUMsQ0FBQztRQUMzRSxLQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxnREFBZ0QsRUFBRSxLQUFLLENBQUMsQ0FBQzs7SUFDOUUsQ0FBQztJQUVELG1DQUFpQixHQUFqQixVQUFrQixJQUFZLEVBQUUsR0FBWTtRQUMxQyxJQUFJLFNBQVMsR0FBRyxpQkFBTSxpQkFBaUIsWUFBQyxJQUFJLENBQUMsQ0FBQztRQUU5QyxJQUFJLEdBQUc7WUFBRSxTQUFTLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQztRQUV4QyxPQUFPLFNBQVMsQ0FBQztJQUNuQixDQUFDO0lBRUQsbUNBQWlCLEdBQWpCO1FBQ0UsMEVBQTBFO1FBQzFFLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQztJQUM3QixDQUFDO0lBRUQsK0RBQStEO0lBRXZELG9DQUFrQixHQUExQixVQUNFLGNBQXlCLEVBQ3pCLGFBQTZCO1FBRTdCLElBQUksS0FBSyxHQUFHLGNBQWMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUV0QyxJQUFJLElBQUksR0FBRztZQUNULENBQUMsU0FBUyxFQUFFLFNBQVMsQ0FBQztZQUN0QixDQUFDLGVBQWUsRUFBRSxNQUFNLENBQUM7WUFDekI7Z0JBQ0UsbURBQW1EO29CQUNqRCxzREFBc0Q7b0JBQ3RELHdFQUF3RTtnQkFDMUUsUUFBUTthQUNUO1lBQ0Q7Z0JBQ0Usa0VBQWtFO29CQUNoRSxtREFBbUQ7b0JBQ25ELHlDQUF5QztvQkFDekMseUJBQXlCO29CQUN6QixlQUFlO2dCQUNqQixRQUFRO2FBQ1Q7WUFDRCxDQUFDLFNBQVMsRUFBRSxLQUFLLENBQUM7U0FDbkIsQ0FBQztRQUVGLDhCQUE4QjtRQUM5QixJQUFJLE1BQU0sR0FBRyxJQUFJLGVBQU0sQ0FBQyxFQUFFLEVBQUUsSUFBSSxFQUFFLGNBQWMsQ0FBQyxDQUFDO1FBQ2xELElBQUksS0FBSyxHQUFHLElBQUksYUFBSyxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFFMUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN0QixhQUFhLENBQUMsYUFBYSxDQUFDLGNBQWMsQ0FBQyxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQztRQUVwRSxLQUFxQixVQUFJLEVBQUosYUFBSSxFQUFKLGtCQUFJLEVBQUosSUFBSSxFQUFFO1lBQXRCLElBQUksUUFBUSxhQUFBO1lBQ2YsSUFBSSxJQUFJLEdBQUcsSUFBSSxxQkFBUyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQy9CLElBQUksQ0FBQyxJQUFJLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3hCLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxhQUFLLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7WUFFbEMsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsQ0FBQztZQUU3QyxPQUFPLENBQUMsYUFBYSxHQUFHLE9BQU8sQ0FBQztZQUNoQyxPQUFPLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7WUFFN0IsS0FBaUIsVUFBc0IsRUFBdEIsS0FBQSxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUF0QixjQUFzQixFQUF0QixJQUFzQixFQUFFO2dCQUFwQyxJQUFJLElBQUksU0FBQTtnQkFDWCxLQUFLLENBQUMsR0FBRyxDQUNQLElBQUksYUFBSyxFQUFFLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxjQUFjLENBQUMsQ0FBQyxRQUFRLEVBQ3pELE1BQU0sRUFDTixJQUFJLEVBQ0osQ0FBQyxFQUNELENBQUMsQ0FDRixDQUFDO2FBQ0g7U0FDRjtRQUVELE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQztJQVlILGNBQUM7QUFBRCxDQUFDLEFBdEdELENBQTZCLElBQUksQ0FBQyxXQUFXLEdBc0c1QztBQXRHWSwwQkFBTyIsInNvdXJjZXNDb250ZW50IjpbIi8vIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIGN4c2QsIGNvcHlyaWdodCAoYykgMjAxNiBCdXNGYXN0ZXIgTHRkLlxuLy8gUmVsZWFzZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlLCBzZWUgTElDRU5TRS5cblxuaW1wb3J0ICogYXMgY3htbCBmcm9tIFwiLi4vLi4vLi4vcnVudGltZV9wYXJzZXJcIjtcblxuaW1wb3J0IHsgTmFtZXNwYWNlIH0gZnJvbSBcIi4vTmFtZXNwYWNlXCI7XG5pbXBvcnQgeyBTY29wZSB9IGZyb20gXCIuL1Njb3BlXCI7XG5cbmltcG9ydCB7IFNvdXJjZSB9IGZyb20gXCIuL1NvdXJjZVwiO1xuaW1wb3J0IHsgU3RhdGUgfSBmcm9tIFwiLi9TdGF0ZVwiO1xuaW1wb3J0IHsgUU5hbWUgfSBmcm9tIFwiLi9RTmFtZVwiO1xuaW1wb3J0IHsgUHJpbWl0aXZlIH0gZnJvbSBcIi4vdHlwZXMvUHJpbWl0aXZlXCI7XG5pbXBvcnQgKiBhcyBzY2hlbWEgZnJvbSBcIi4uL3NjaGVtYVwiO1xuXG4vKiogWE1MIHBhcnNlciBjb250ZXh0LCBob2xkaW5nIGRlZmluaXRpb25zIG9mIGFsbCBpbXBvcnRlZCBuYW1lc3BhY2VzLiAqL1xuXG5leHBvcnQgY2xhc3MgQ29udGV4dCBleHRlbmRzIGN4bWwuQ29udGV4dEJhc2U8Q29udGV4dCwgTmFtZXNwYWNlPiB7XG4gIGNvbnN0cnVjdG9yKHNjaGVtYUNvbnRleHQ6IHNjaGVtYS5Db250ZXh0KSB7XG4gICAgc3VwZXIoTmFtZXNwYWNlKTtcblxuICAgIHRoaXMucHJpbWl0aXZlU3BhY2UgPSB0aGlzLnJlZ2lzdGVyTmFtZXNwYWNlKFwieG1sLXByaW1pdGl2ZXNcIik7XG4gICAgdGhpcy5wcmltaXRpdmVTcGFjZS5pbml0KG51bGwsIFwiUHJpbWl0aXZlXCIpO1xuICAgIHRoaXMucHJpbWl0aXZlU2NvcGUgPSB0aGlzLnBvcHVsYXRlUHJpbWl0aXZlcyhcbiAgICAgIHRoaXMucHJpbWl0aXZlU3BhY2UsXG4gICAgICBzY2hlbWFDb250ZXh0XG4gICAgKTtcblxuICAgIHRoaXMueG1sU3BhY2UgPSB0aGlzLnJlZ2lzdGVyTmFtZXNwYWNlKFxuICAgICAgXCJodHRwOi8vd3d3LnczLm9yZy9YTUwvMTk5OC9uYW1lc3BhY2VcIlxuICAgICk7XG4gICAgdGhpcy54bWxTcGFjZS5pbml0KFwiaHR0cDovL3d3dy53My5vcmcvMjAwMS94bWwueHNkXCIsIFwieG1sXCIpO1xuXG4gICAgdGhpcy54c2RTcGFjZSA9IHRoaXMucmVnaXN0ZXJOYW1lc3BhY2UoXCJodHRwOi8vd3d3LnczLm9yZy8yMDAxL1hNTFNjaGVtYVwiKTtcbiAgICB0aGlzLnhzZFNwYWNlLmluaXQoXCJodHRwOi8vd3d3LnczLm9yZy8yMDA5L1hNTFNjaGVtYS9YTUxTY2hlbWEueHNkXCIsIFwieHNkXCIpO1xuICB9XG5cbiAgcmVnaXN0ZXJOYW1lc3BhY2UobmFtZTogc3RyaW5nLCB1cmw/OiBzdHJpbmcpIHtcbiAgICB2YXIgbmFtZXNwYWNlID0gc3VwZXIucmVnaXN0ZXJOYW1lc3BhY2UobmFtZSk7XG5cbiAgICBpZiAodXJsKSBuYW1lc3BhY2UudXBkYXRlVXJsKG51bGwsIHVybCk7XG5cbiAgICByZXR1cm4gbmFtZXNwYWNlO1xuICB9XG5cbiAgZ2V0UHJpbWl0aXZlU2NvcGUoKSB7XG4gICAgLy8gV2hpbGUgcHJpbWl0aXZlU3BhY2UgaXMgc3RpbGwgYmVpbmcgaW5pdGlhbGl6ZWQsIHRoaXMgbXVzdCByZXR1cm4gbnVsbC5cbiAgICByZXR1cm4gdGhpcy5wcmltaXRpdmVTY29wZTtcbiAgfVxuXG4gIC8qKiBJbml0aWFsaXplIHNwZWNpYWwgbmFtZXNwYWNlIGNvbnRhaW5pbmcgcHJpbWl0aXZlIHR5cGVzLiAqL1xuXG4gIHByaXZhdGUgcG9wdWxhdGVQcmltaXRpdmVzKFxuICAgIHByaW1pdGl2ZVNwYWNlOiBOYW1lc3BhY2UsXG4gICAgc2NoZW1hQ29udGV4dDogc2NoZW1hLkNvbnRleHRcbiAgKSB7XG4gICAgdmFyIHNjb3BlID0gcHJpbWl0aXZlU3BhY2UuZ2V0U2NvcGUoKTtcblxuICAgIHZhciBzcGVjID0gW1xuICAgICAgW1wiYm9vbGVhblwiLCBcImJvb2xlYW5cIl0sXG4gICAgICBbXCJkYXRlIGRhdGVUaW1lXCIsIFwiRGF0ZVwiXSxcbiAgICAgIFtcbiAgICAgICAgXCJieXRlIGRlY2ltYWwgZG91YmxlIGZsb2F0IGludCBpbnRlZ2VyIGxvbmcgc2hvcnQgXCIgK1xuICAgICAgICAgIFwidW5zaWduZWRMb25nIHVuc2lnbmVkSW50IHVuc2lnbmVkU2hvcnQgdW5zaWduZWRCeXRlIFwiICtcbiAgICAgICAgICBcIm5lZ2F0aXZlSW50ZWdlciBub25OZWdhdGl2ZUludGVnZXIgbm9uUG9zaXRpdmVJbnRlZ2VyIHBvc2l0aXZlSW50ZWdlciBcIixcbiAgICAgICAgXCJudW1iZXJcIixcbiAgICAgIF0sXG4gICAgICBbXG4gICAgICAgIFwiTmFtZSBOQ05hbWUgUU5hbWUgYW55VVJJIGxhbmd1YWdlIG5vcm1hbGl6ZWRTdHJpbmcgc3RyaW5nIHRva2VuIFwiICtcbiAgICAgICAgICBcIkVOVElUWSBFTlRJVElFUyBJRCBJRFJFRiBJRFJFRlMgTk1UT0tFTiBOTVRPS0VOUyBcIiArXG4gICAgICAgICAgXCJnRGF5IGdNb250aCBnTW9udGhEYXkgZ1llYXIgZ1llYXJNb250aCBcIiArXG4gICAgICAgICAgXCJoZXhCaW5hcnkgYmFzZTY0QmluYXJ5IFwiICtcbiAgICAgICAgICBcImR1cmF0aW9uIHRpbWVcIixcbiAgICAgICAgXCJzdHJpbmdcIixcbiAgICAgIF0sXG4gICAgICBbXCJhbnl0eXBlXCIsIFwiYW55XCJdLFxuICAgIF07XG5cbiAgICAvLyBUT0RPOiB0aGVzZSBsaW5lcyBhcmUgdWdseSFcbiAgICB2YXIgc291cmNlID0gbmV3IFNvdXJjZShcIlwiLCB0aGlzLCBwcmltaXRpdmVTcGFjZSk7XG4gICAgdmFyIHN0YXRlID0gbmV3IFN0YXRlKG51bGwsIG51bGwsIHNvdXJjZSk7XG5cbiAgICBzdGF0ZS5zZXRTY29wZShzY29wZSk7XG4gICAgc2NoZW1hQ29udGV4dC5jb3B5TmFtZXNwYWNlKHByaW1pdGl2ZVNwYWNlKS5pc1ByaW1pdGl2ZVNwYWNlID0gdHJ1ZTtcblxuICAgIGZvciAodmFyIHR5cGVTcGVjIG9mIHNwZWMpIHtcbiAgICAgIHZhciB0eXBlID0gbmV3IFByaW1pdGl2ZShudWxsKTtcbiAgICAgIHR5cGUubmFtZSA9IHR5cGVTcGVjWzFdO1xuICAgICAgdHlwZS5pbml0KG5ldyBTdGF0ZShzdGF0ZSwgbnVsbCkpO1xuXG4gICAgICB2YXIgb3V0VHlwZSA9IHR5cGUuZ2V0T3V0VHlwZShzY2hlbWFDb250ZXh0KTtcblxuICAgICAgb3V0VHlwZS5wcmltaXRpdmVUeXBlID0gb3V0VHlwZTtcbiAgICAgIG91dFR5cGUuc2FmZU5hbWUgPSB0eXBlLm5hbWU7XG5cbiAgICAgIGZvciAodmFyIG5hbWUgb2YgdHlwZVNwZWNbMF0uc3BsaXQoXCIgXCIpKSB7XG4gICAgICAgIHNjb3BlLmFkZChcbiAgICAgICAgICBuZXcgUU5hbWUoKS5wYXJzZVByaW1pdGl2ZShuYW1lLCBwcmltaXRpdmVTcGFjZSkubmFtZUZ1bGwsXG4gICAgICAgICAgXCJ0eXBlXCIsXG4gICAgICAgICAgdHlwZSxcbiAgICAgICAgICAxLFxuICAgICAgICAgIDFcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gc2NvcGU7XG4gIH1cblxuICAvKiogU2NvcGUgY29udGFpbmluZyBYTUwgcHJpbWl0aXZlIHR5cGVzLlxuICAgKiBQYXJlbnQgb2YgZ2xvYmFsIHNjb3BlcyBvZiBhbGwgb3RoZXIgbmFtZXNwYWNlcy4gKi9cbiAgcHJpdmF0ZSBwcmltaXRpdmVTY29wZTogU2NvcGUgPSBudWxsO1xuXG4gIC8qKiBOYW1lc3BhY2UgY29udGFpbmluZyBYTUwgcHJpbWl0aXZlIHR5cGVzLiAqL1xuICBwcmltaXRpdmVTcGFjZTogTmFtZXNwYWNlO1xuICAvKiogVGhlIG9mZmljaWFsIFwieG1sXCIgbmFtZXNwYWNlIGRlZmluaW5nIGNvbW1vbmx5IHVzZWQgdHlwZXMuICAqL1xuICB4bWxTcGFjZTogTmFtZXNwYWNlO1xuICAvKiogVGhlIG9mZmljaWFsIFwieHNkXCIgbmFtZXNwYWNlIHVzZWQgZm9yIHNjaGVtYSBwYXJzaW5nLiAgKi9cbiAgeHNkU3BhY2U6IE5hbWVzcGFjZTtcbn1cbiJdfQ==