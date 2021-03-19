"use strict";
// This file is part of cxsd, copyright (c) 2015-2016 BusFaster Ltd.
// Released under the MIT license, see LICENSE.
Object.defineProperty(exports, "__esModule", { value: true });
exports.MissingReferenceError = exports.Include = exports.Import = exports.Enumeration = exports.Restriction = exports.Extension = exports.Union = exports.List = exports.ComplexContent = exports.SimpleContent = exports.ComplexType = exports.SimpleType = exports.Primitive = exports.TypeBase = exports.AnyAttribute = exports.AttributeGroup = exports.Attribute = exports.Any = exports.All = exports.Choice = exports.Sequence = exports.Group = exports.Element = exports.MemberBase = exports.Root = exports.Schema = exports.Documentation = exports.Annotation = exports.Base = void 0;
var Base_1 = require("./types/Base");
Object.defineProperty(exports, "Base", { enumerable: true, get: function () { return Base_1.Base; } });
var Annotation_1 = require("./types/Annotation");
Object.defineProperty(exports, "Annotation", { enumerable: true, get: function () { return Annotation_1.Annotation; } });
var Documentation_1 = require("./types/Documentation");
Object.defineProperty(exports, "Documentation", { enumerable: true, get: function () { return Documentation_1.Documentation; } });
var Schema_1 = require("./types/Schema");
Object.defineProperty(exports, "Schema", { enumerable: true, get: function () { return Schema_1.Schema; } });
Object.defineProperty(exports, "Root", { enumerable: true, get: function () { return Schema_1.Root; } });
var MemberBase_1 = require("./types/MemberBase");
Object.defineProperty(exports, "MemberBase", { enumerable: true, get: function () { return MemberBase_1.MemberBase; } });
var Element_1 = require("./types/Element");
Object.defineProperty(exports, "Element", { enumerable: true, get: function () { return Element_1.Element; } });
var Group_1 = require("./types/Group");
Object.defineProperty(exports, "Group", { enumerable: true, get: function () { return Group_1.Group; } });
Object.defineProperty(exports, "Sequence", { enumerable: true, get: function () { return Group_1.Sequence; } });
Object.defineProperty(exports, "Choice", { enumerable: true, get: function () { return Group_1.Choice; } });
Object.defineProperty(exports, "All", { enumerable: true, get: function () { return Group_1.All; } });
var Any_1 = require("./types/Any");
Object.defineProperty(exports, "Any", { enumerable: true, get: function () { return Any_1.Any; } });
var Attribute_1 = require("./types/Attribute");
Object.defineProperty(exports, "Attribute", { enumerable: true, get: function () { return Attribute_1.Attribute; } });
var AttributeGroup_1 = require("./types/AttributeGroup");
Object.defineProperty(exports, "AttributeGroup", { enumerable: true, get: function () { return AttributeGroup_1.AttributeGroup; } });
var AnyAttribute_1 = require("./types/AnyAttribute");
Object.defineProperty(exports, "AnyAttribute", { enumerable: true, get: function () { return AnyAttribute_1.AnyAttribute; } });
var TypeBase_1 = require("./types/TypeBase");
Object.defineProperty(exports, "TypeBase", { enumerable: true, get: function () { return TypeBase_1.TypeBase; } });
var Primitive_1 = require("./types/Primitive");
Object.defineProperty(exports, "Primitive", { enumerable: true, get: function () { return Primitive_1.Primitive; } });
var SimpleType_1 = require("./types/SimpleType");
Object.defineProperty(exports, "SimpleType", { enumerable: true, get: function () { return SimpleType_1.SimpleType; } });
var ComplexType_1 = require("./types/ComplexType");
Object.defineProperty(exports, "ComplexType", { enumerable: true, get: function () { return ComplexType_1.ComplexType; } });
Object.defineProperty(exports, "SimpleContent", { enumerable: true, get: function () { return ComplexType_1.SimpleContent; } });
Object.defineProperty(exports, "ComplexContent", { enumerable: true, get: function () { return ComplexType_1.ComplexContent; } });
var List_1 = require("./types/List");
Object.defineProperty(exports, "List", { enumerable: true, get: function () { return List_1.List; } });
var Union_1 = require("./types/Union");
Object.defineProperty(exports, "Union", { enumerable: true, get: function () { return Union_1.Union; } });
var Extension_1 = require("./types/Extension");
Object.defineProperty(exports, "Extension", { enumerable: true, get: function () { return Extension_1.Extension; } });
var Restriction_1 = require("./types/Restriction");
Object.defineProperty(exports, "Restriction", { enumerable: true, get: function () { return Restriction_1.Restriction; } });
var Enumeration_1 = require("./types/Enumeration");
Object.defineProperty(exports, "Enumeration", { enumerable: true, get: function () { return Enumeration_1.Enumeration; } });
var Import_1 = require("./types/Import");
Object.defineProperty(exports, "Import", { enumerable: true, get: function () { return Import_1.Import; } });
Object.defineProperty(exports, "Include", { enumerable: true, get: function () { return Import_1.Include; } });
var MissingReferenceError_1 = require("./types/MissingReferenceError");
Object.defineProperty(exports, "MissingReferenceError", { enumerable: true, get: function () { return MissingReferenceError_1.MissingReferenceError; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHlwZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wYXJzZXJfc2NhZmZvbGRfZ2VuZXJhdG9yL3NyYy94c2QvdHlwZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLG9FQUFvRTtBQUNwRSwrQ0FBK0M7OztBQUUvQyxxQ0FBNkM7QUFBckMsNEZBQUEsSUFBSSxPQUFBO0FBQ1osaURBQThDO0FBQXRDLHdHQUFBLFVBQVUsT0FBQTtBQUNsQix1REFBb0Q7QUFBNUMsOEdBQUEsYUFBYSxPQUFBO0FBQ3JCLHlDQUE0QztBQUFwQyxnR0FBQSxNQUFNLE9BQUE7QUFBRSw4RkFBQSxJQUFJLE9BQUE7QUFDcEIsaURBQThDO0FBQXRDLHdHQUFBLFVBQVUsT0FBQTtBQUNsQiwyQ0FBd0M7QUFBaEMsa0dBQUEsT0FBTyxPQUFBO0FBQ2YsdUNBQTJEO0FBQW5ELDhGQUFBLEtBQUssT0FBQTtBQUFFLGlHQUFBLFFBQVEsT0FBQTtBQUFFLCtGQUFBLE1BQU0sT0FBQTtBQUFFLDRGQUFBLEdBQUcsT0FBQTtBQUNwQyxtQ0FBZ0M7QUFBeEIsMEZBQUEsR0FBRyxPQUFBO0FBQ1gsK0NBQTRDO0FBQXBDLHNHQUFBLFNBQVMsT0FBQTtBQUNqQix5REFBc0Q7QUFBOUMsZ0hBQUEsY0FBYyxPQUFBO0FBQ3RCLHFEQUFrRDtBQUExQyw0R0FBQSxZQUFZLE9BQUE7QUFDcEIsNkNBQTBDO0FBQWxDLG9HQUFBLFFBQVEsT0FBQTtBQUNoQiwrQ0FBNEM7QUFBcEMsc0dBQUEsU0FBUyxPQUFBO0FBQ2pCLGlEQUE4QztBQUF0Qyx3R0FBQSxVQUFVLE9BQUE7QUFDbEIsbURBQStFO0FBQXZFLDBHQUFBLFdBQVcsT0FBQTtBQUFFLDRHQUFBLGFBQWEsT0FBQTtBQUFFLDZHQUFBLGNBQWMsT0FBQTtBQUNsRCxxQ0FBa0M7QUFBMUIsNEZBQUEsSUFBSSxPQUFBO0FBQ1osdUNBQW9DO0FBQTVCLDhGQUFBLEtBQUssT0FBQTtBQUNiLCtDQUE0QztBQUFwQyxzR0FBQSxTQUFTLE9BQUE7QUFDakIsbURBQWdEO0FBQXhDLDBHQUFBLFdBQVcsT0FBQTtBQUNuQixtREFBZ0Q7QUFBeEMsMEdBQUEsV0FBVyxPQUFBO0FBQ25CLHlDQUErQztBQUF2QyxnR0FBQSxNQUFNLE9BQUE7QUFBRSxpR0FBQSxPQUFPLE9BQUE7QUFDdkIsdUVBQW9FO0FBQTVELDhIQUFBLHFCQUFxQixPQUFBIiwic291cmNlc0NvbnRlbnQiOlsiLy8gVGhpcyBmaWxlIGlzIHBhcnQgb2YgY3hzZCwgY29weXJpZ2h0IChjKSAyMDE1LTIwMTYgQnVzRmFzdGVyIEx0ZC5cbi8vIFJlbGVhc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSwgc2VlIExJQ0VOU0UuXG5cbmV4cG9ydCB7QmFzZSwgQmFzZUNsYXNzfSBmcm9tICcuL3R5cGVzL0Jhc2UnO1xuZXhwb3J0IHtBbm5vdGF0aW9ufSBmcm9tICcuL3R5cGVzL0Fubm90YXRpb24nO1xuZXhwb3J0IHtEb2N1bWVudGF0aW9ufSBmcm9tICcuL3R5cGVzL0RvY3VtZW50YXRpb24nO1xuZXhwb3J0IHtTY2hlbWEsIFJvb3R9IGZyb20gJy4vdHlwZXMvU2NoZW1hJztcbmV4cG9ydCB7TWVtYmVyQmFzZX0gZnJvbSAnLi90eXBlcy9NZW1iZXJCYXNlJztcbmV4cG9ydCB7RWxlbWVudH0gZnJvbSAnLi90eXBlcy9FbGVtZW50JztcbmV4cG9ydCB7R3JvdXAsIFNlcXVlbmNlLCBDaG9pY2UsIEFsbH0gZnJvbSAnLi90eXBlcy9Hcm91cCc7XG5leHBvcnQge0FueX0gZnJvbSAnLi90eXBlcy9BbnknO1xuZXhwb3J0IHtBdHRyaWJ1dGV9IGZyb20gJy4vdHlwZXMvQXR0cmlidXRlJztcbmV4cG9ydCB7QXR0cmlidXRlR3JvdXB9IGZyb20gJy4vdHlwZXMvQXR0cmlidXRlR3JvdXAnO1xuZXhwb3J0IHtBbnlBdHRyaWJ1dGV9IGZyb20gJy4vdHlwZXMvQW55QXR0cmlidXRlJztcbmV4cG9ydCB7VHlwZUJhc2V9IGZyb20gJy4vdHlwZXMvVHlwZUJhc2UnO1xuZXhwb3J0IHtQcmltaXRpdmV9IGZyb20gJy4vdHlwZXMvUHJpbWl0aXZlJztcbmV4cG9ydCB7U2ltcGxlVHlwZX0gZnJvbSAnLi90eXBlcy9TaW1wbGVUeXBlJztcbmV4cG9ydCB7Q29tcGxleFR5cGUsIFNpbXBsZUNvbnRlbnQsIENvbXBsZXhDb250ZW50fSBmcm9tICcuL3R5cGVzL0NvbXBsZXhUeXBlJztcbmV4cG9ydCB7TGlzdH0gZnJvbSAnLi90eXBlcy9MaXN0JztcbmV4cG9ydCB7VW5pb259IGZyb20gJy4vdHlwZXMvVW5pb24nO1xuZXhwb3J0IHtFeHRlbnNpb259IGZyb20gJy4vdHlwZXMvRXh0ZW5zaW9uJztcbmV4cG9ydCB7UmVzdHJpY3Rpb259IGZyb20gJy4vdHlwZXMvUmVzdHJpY3Rpb24nO1xuZXhwb3J0IHtFbnVtZXJhdGlvbn0gZnJvbSAnLi90eXBlcy9FbnVtZXJhdGlvbic7XG5leHBvcnQge0ltcG9ydCwgSW5jbHVkZX0gZnJvbSAnLi90eXBlcy9JbXBvcnQnO1xuZXhwb3J0IHtNaXNzaW5nUmVmZXJlbmNlRXJyb3J9IGZyb20gJy4vdHlwZXMvTWlzc2luZ1JlZmVyZW5jZUVycm9yJztcbiJdfQ==