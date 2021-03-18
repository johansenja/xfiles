"use strict";
// This file is part of cxml, copyright (c) 2016 BusFaster Ltd.
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
exports.TypeSpec = exports.parseName = void 0;
var MemberRef_1 = require("./MemberRef");
var Type_1 = require("./Type");
var Item_1 = require("./Item");
/** Parse name from schema in serialized JSON format.
  * If name used in XML is not a valid JavaScript identifier, the schema
  * definition will be in format <cleaned up name for JavaScript>:<XML name>. */
function parseName(name) {
    var splitPos = name.indexOf(':');
    var safeName;
    if (splitPos >= 0) {
        safeName = name.substr(0, splitPos);
        name = name.substr(splitPos + 1);
    }
    else
        safeName = name;
    return ({
        name: name,
        safeName: safeName
    });
}
exports.parseName = parseName;
/** Create a new data object inheriting default values from another. */
function inherit(parentObject) {
    function Proxy() { }
    Proxy.prototype = parentObject;
    return (new Proxy());
}
function defineSubstitute(substitute, proxy) {
    var ref = new MemberRef_1.MemberRef([substitute, 0, substitute.safeName], substitute.namespace, proxy);
    return (ref);
}
/** Type specification defining attributes and children. */
var TypeSpec = /** @class */ (function () {
    function TypeSpec(spec, namespace, name) {
        // Initialize helper containing data and methods also applicable to members.
        this.optionalList = [];
        this.requiredList = [];
        this.item = new Item_1.ItemBase(this);
        if (name) {
            var parts = parseName(name);
            this.name = parts.name;
            this.safeName = parts.safeName;
        }
        this.namespace = namespace;
        this.flags = spec[0];
        this.item.parentNum = spec[1];
        this.childSpecList = spec[2];
        this.attributeSpecList = spec[3];
    }
    TypeSpec.prototype.getProto = function () { return (this.proto); };
    TypeSpec.prototype.getType = function () { return (this.type); };
    TypeSpec.prototype.define = function () {
        // This function hasn't been called for this type yet by setParent,
        // but something must by now have called it for the parent type.
        var parent = (this.item.parent && this.item.parent != this) ? this.item.parent.proto : Type_1.TypeInstance;
        this.proto = /** @class */ (function (_super) {
            __extends(XmlType, _super);
            function XmlType() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return XmlType;
        }(parent));
        var instanceProto = this.proto.prototype;
        instanceProto._exists = true;
        instanceProto._namespace = this.namespace.name;
        this.placeHolder = new this.proto();
        this.placeHolder._exists = false;
        this.type = new Type_1.Type(this.proto);
        this.proto.type = this.type;
        this.type.namespace = this.namespace;
        if (this.item.parent) {
            this.type.childTbl = inherit(this.item.parent.type.childTbl);
            this.type.attributeTbl = inherit(this.item.parent.type.attributeTbl);
        }
        else {
            this.type.attributeTbl = {};
            this.type.childTbl = {};
        }
        this.type.isPrimitive = !!(this.flags & TypeSpec.primitiveFlag);
        this.type.isPlainPrimitive = !!(this.flags & TypeSpec.plainPrimitiveFlag);
        this.type.isList = !!(this.flags & TypeSpec.listFlag);
        if (this.type.isPrimitive) {
            var primitiveType = this;
            var next;
            while ((next = primitiveType.item.parent) && next != primitiveType)
                primitiveType = next;
            this.type.primitiveType = primitiveType.safeName;
        }
        return (this.type);
    };
    TypeSpec.prototype.defineMember = function (ref) {
        var typeSpec = ref.member.typeSpec;
        var proxySpec = ref.member.proxySpec;
        if (proxySpec) {
            if (ref.max > 1) {
                typeSpec = proxySpec;
            }
            else {
                proxySpec = this;
                typeSpec = null;
            }
            TypeSpec.addSubstitutesToProxy(ref.member, proxySpec.proto.prototype);
        }
        if (typeSpec) {
            var memberType = typeSpec.placeHolder;
            var type = (this.proto.prototype);
            type[ref.safeName] = (ref.max > 1) ? [memberType] : memberType;
            if (ref.min < 1)
                this.optionalList.push(ref.safeName);
            else
                this.requiredList.push(ref.safeName);
        }
        return (ref);
    };
    TypeSpec.prototype.getSubstitutes = function () {
        return (this.substituteList);
    };
    TypeSpec.prototype.defineMembers = function () {
        var spec;
        for (var _i = 0, _a = this.childSpecList; _i < _a.length; _i++) {
            spec = _a[_i];
            var memberRef = new MemberRef_1.MemberRef(spec, this.namespace);
            this.addChild(memberRef);
            this.defineMember(memberRef);
        }
        for (var _b = 0, _c = this.attributeSpecList; _b < _c.length; _b++) {
            spec = _c[_b];
            var attributeRef = new MemberRef_1.MemberRef(spec, this.namespace);
            if (attributeRef.member.typeSpec)
                this.type.addAttribute(attributeRef);
            this.defineMember(attributeRef);
        }
    };
    TypeSpec.prototype.addSubstitutes = function (headRef, proxy) {
        headRef.member.containingTypeList.push({
            type: this,
            head: headRef,
            proxy: proxy
        });
        headRef.member.proxySpec.item.define();
        for (var _i = 0, _a = headRef.member.proxySpec.getSubstitutes(); _i < _a.length; _i++) {
            var substitute = _a[_i];
            if (substitute == headRef.member) {
                this.type.addChild(headRef);
            }
            else {
                var substituteRef = defineSubstitute(substitute, proxy);
                this.addChild(substituteRef, proxy);
            }
        }
    };
    TypeSpec.prototype.addChild = function (memberRef, proxy) {
        if (memberRef.member.proxySpec)
            this.addSubstitutes(memberRef, proxy || memberRef);
        else if (!memberRef.member.isAbstract)
            this.type.addChild(memberRef);
    };
    TypeSpec.prototype.addSubstitute = function (head, substitute) {
        if (this.item.defined && head.containingTypeList.length) {
            // The element's proxy type has already been defined
            // so we need to patch other types containing the element.
            for (var _i = 0, _a = head.containingTypeList; _i < _a.length; _i++) {
                var spec = _a[_i];
                var ref = defineSubstitute(substitute, spec.proxy);
                spec.type.addChild(ref, spec.proxy);
                if (spec.head.max <= 1) {
                    TypeSpec.addSubstituteToProxy(substitute, spec.type.proto.prototype);
                }
            }
            // Add the substitution to proxy type of the group head,
            // and loop if the head further substitutes something else.
            while (head) {
                TypeSpec.addSubstituteToProxy(substitute, head.proxySpec.proto.prototype);
                head = head.item.parent;
            }
        }
        this.substituteList.push(substitute);
    };
    /** Remove placeholders from instance prototype. They allow dereferencing
      * contents of missing optional child elements without throwing errors.
      * @param strict Also remove placeholders for mandatory child elements. */
    TypeSpec.prototype.cleanPlaceholders = function (strict) {
        var type = (this.proto.prototype);
        var nameList = this.optionalList;
        if (strict)
            nameList = nameList.concat(this.requiredList);
        for (var _i = 0, nameList_1 = nameList; _i < nameList_1.length; _i++) {
            var name = nameList_1[_i];
            delete (type[name]);
        }
    };
    TypeSpec.addSubstituteToProxy = function (substitute, type, head) {
        if (substitute == head || !substitute.proxySpec) {
            if (!substitute.isAbstract)
                type[substitute.safeName] = substitute.typeSpec.placeHolder;
        }
        else {
            TypeSpec.addSubstitutesToProxy(substitute, type);
        }
    };
    TypeSpec.addSubstitutesToProxy = function (member, type) {
        for (var _i = 0, _a = member.proxySpec.getSubstitutes(); _i < _a.length; _i++) {
            var substitute = _a[_i];
            TypeSpec.addSubstituteToProxy(substitute, type, member);
        }
    };
    /** Type contains text that gets parsed to JavaScript primitives. */
    TypeSpec.primitiveFlag = 1;
    /** Type only contains text, no wrapper object is needed to hold its attributes. */
    TypeSpec.plainPrimitiveFlag = 2;
    /** Type contains text with a list of whitespace-separated items. */
    TypeSpec.listFlag = 4;
    return TypeSpec;
}());
exports.TypeSpec = TypeSpec;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVHlwZVNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9ydW50aW1lX3BhcnNlci9zcmMveG1sL1R5cGVTcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSwrREFBK0Q7QUFDL0QsK0NBQStDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFJL0MseUNBQWtEO0FBQ2xELCtCQUFxRDtBQUNyRCwrQkFBc0M7QUFNdEM7O2dGQUVnRjtBQUVoRixTQUFnQixTQUFTLENBQUMsSUFBWTtJQUNyQyxJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ2pDLElBQUksUUFBZ0IsQ0FBQTtJQUVwQixJQUFHLFFBQVEsSUFBSSxDQUFDLEVBQUU7UUFDakIsUUFBUSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQ3BDLElBQUksR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUMsQ0FBQztLQUNqQzs7UUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDO0lBRXZCLE9BQU0sQ0FBQztRQUNOLElBQUksRUFBRSxJQUFJO1FBQ1YsUUFBUSxFQUFFLFFBQVE7S0FDbEIsQ0FBQyxDQUFDO0FBQ0osQ0FBQztBQWJELDhCQWFDO0FBRUQsdUVBQXVFO0FBRXZFLFNBQVMsT0FBTyxDQUFPLFlBQWtCO0lBQ3hDLFNBQVMsS0FBSyxLQUFJLENBQUM7SUFDbkIsS0FBSyxDQUFDLFNBQVMsR0FBRyxZQUFZLENBQUM7SUFDL0IsT0FBTSxDQUFDLElBQUssS0FBZ0MsRUFBRSxDQUFDLENBQUM7QUFDakQsQ0FBQztBQVNELFNBQVMsZ0JBQWdCLENBQUMsVUFBc0IsRUFBRSxLQUFnQjtJQUNqRSxJQUFJLEdBQUcsR0FBRyxJQUFJLHFCQUFTLENBQUMsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxFQUFFLFVBQVUsQ0FBQyxRQUFRLENBQUMsRUFBRSxVQUFVLENBQUMsU0FBUyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBRTNGLE9BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUNiLENBQUM7QUFFRCwyREFBMkQ7QUFFM0Q7SUFDQyxrQkFBWSxJQUFpQixFQUFFLFNBQW9CLEVBQUUsSUFBWTtRQUNoRSw0RUFBNEU7UUEwTTdFLGlCQUFZLEdBQWEsRUFBRSxDQUFDO1FBQzVCLGlCQUFZLEdBQWEsRUFBRSxDQUFDO1FBek0zQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksZUFBUSxDQUFDLElBQWdCLENBQUMsQ0FBQztRQUUzQyxJQUFHLElBQUksRUFBRTtZQUNSLElBQUksS0FBSyxHQUFHLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUM1QixJQUFJLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUM7WUFDdkIsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUMsUUFBUSxDQUFDO1NBQy9CO1FBRUQsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7UUFDM0IsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDckIsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzlCLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzdCLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDbEMsQ0FBQztJQUVELDJCQUFRLEdBQVIsY0FBYSxPQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUVsQywwQkFBTyxHQUFQLGNBQVksT0FBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFaEMseUJBQU0sR0FBTjtRQUNDLG1FQUFtRTtRQUNuRSxnRUFBZ0U7UUFFaEUsSUFBSSxNQUFNLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxtQkFBWSxDQUFDO1FBRXBHLElBQUksQ0FBQyxLQUFLO1lBQXlCLDJCQUFNO1lBQTVCOztZQUE4QixDQUFDO1lBQUQsY0FBQztRQUFELENBQUMsQUFBL0IsQ0FBc0IsTUFBTSxFQUFHLENBQUM7UUFFN0MsSUFBSSxhQUFhLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUF5QixDQUFDO1FBQ3pELGFBQWEsQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1FBQzdCLGFBQWEsQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUM7UUFFL0MsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNwQyxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7UUFDakMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLFdBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDakMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztRQUM1QixJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO1FBRXJDLElBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDcEIsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUM3RCxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1NBQ3JFO2FBQU07WUFDTixJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksR0FBRyxFQUFFLENBQUM7WUFDNUIsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO1NBQ3hCO1FBRUQsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDaEUsSUFBSSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFHLFFBQVEsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1FBQzFFLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBRXRELElBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUU7WUFDekIsSUFBSSxhQUFhLEdBQWEsSUFBSSxDQUFDO1lBQ25DLElBQUksSUFBYyxDQUFDO1lBRW5CLE9BQU0sQ0FBQyxJQUFJLEdBQUcsYUFBYSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxJQUFJLElBQUksYUFBYTtnQkFBRSxhQUFhLEdBQUcsSUFBSSxDQUFDO1lBRXhGLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxHQUFHLGFBQWEsQ0FBQyxRQUFRLENBQUM7U0FDakQ7UUFFRCxPQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ25CLENBQUM7SUFFTywrQkFBWSxHQUFwQixVQUFxQixHQUFjO1FBQ2xDLElBQUksUUFBUSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDO1FBQ25DLElBQUksU0FBUyxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDO1FBRXJDLElBQUcsU0FBUyxFQUFFO1lBQ2IsSUFBRyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsRUFBRTtnQkFDZixRQUFRLEdBQUcsU0FBUyxDQUFDO2FBQ3JCO2lCQUFNO2dCQUNOLFNBQVMsR0FBRyxJQUFJLENBQUM7Z0JBQ2pCLFFBQVEsR0FBRyxJQUFJLENBQUM7YUFDaEI7WUFFRCxRQUFRLENBQUMscUJBQXFCLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxTQUFTLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1NBQ3RFO1FBRUQsSUFBRyxRQUFRLEVBQUU7WUFDWixJQUFJLFVBQVUsR0FBRyxRQUFRLENBQUMsV0FBVyxDQUFDO1lBQ3RDLElBQUksSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQXFCLENBQUM7WUFFdEQsSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQztZQUUvRCxJQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQztnQkFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7O2dCQUNoRCxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDMUM7UUFFRCxPQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDYixDQUFDO0lBRUQsaUNBQWMsR0FBZDtRQUNDLE9BQU0sQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7SUFDN0IsQ0FBQztJQUVELGdDQUFhLEdBQWI7UUFDQyxJQUFJLElBQWdCLENBQUM7UUFFckIsS0FBWSxVQUFrQixFQUFsQixLQUFBLElBQUksQ0FBQyxhQUFhLEVBQWxCLGNBQWtCLEVBQWxCLElBQWtCLEVBQUU7WUFBNUIsSUFBSSxTQUFBO1lBQ1AsSUFBSSxTQUFTLEdBQUcsSUFBSSxxQkFBUyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDcEQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUN6QixJQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1NBQzdCO1FBRUQsS0FBWSxVQUFzQixFQUF0QixLQUFBLElBQUksQ0FBQyxpQkFBaUIsRUFBdEIsY0FBc0IsRUFBdEIsSUFBc0IsRUFBRTtZQUFoQyxJQUFJLFNBQUE7WUFDUCxJQUFJLFlBQVksR0FBRyxJQUFJLHFCQUFTLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUN2RCxJQUFHLFlBQVksQ0FBQyxNQUFNLENBQUMsUUFBUTtnQkFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUN0RSxJQUFJLENBQUMsWUFBWSxDQUFDLFlBQVksQ0FBQyxDQUFDO1NBQ2hDO0lBQ0YsQ0FBQztJQUVELGlDQUFjLEdBQWQsVUFBZSxPQUFrQixFQUFFLEtBQWdCO1FBQ2xELE9BQU8sQ0FBQyxNQUFNLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDO1lBQ3RDLElBQUksRUFBRSxJQUFJO1lBQ1YsSUFBSSxFQUFFLE9BQU87WUFDYixLQUFLLEVBQUUsS0FBSztTQUNaLENBQUMsQ0FBQztRQUNILE9BQU8sQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUV2QyxLQUFzQixVQUF5QyxFQUF6QyxLQUFBLE9BQU8sQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLGNBQWMsRUFBRSxFQUF6QyxjQUF5QyxFQUF6QyxJQUF5QyxFQUFFO1lBQTdELElBQUksVUFBVSxTQUFBO1lBQ2pCLElBQUcsVUFBVSxJQUFJLE9BQU8sQ0FBQyxNQUFNLEVBQUU7Z0JBQ2hDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2FBQzVCO2lCQUFNO2dCQUNOLElBQUksYUFBYSxHQUFHLGdCQUFnQixDQUFDLFVBQVUsRUFBRSxLQUFLLENBQUMsQ0FBQztnQkFDeEQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLEVBQUUsS0FBSyxDQUFDLENBQUM7YUFDcEM7U0FDRDtJQUNGLENBQUM7SUFFRCwyQkFBUSxHQUFSLFVBQVMsU0FBb0IsRUFBRSxLQUFpQjtRQUMvQyxJQUFHLFNBQVMsQ0FBQyxNQUFNLENBQUMsU0FBUztZQUFFLElBQUksQ0FBQyxjQUFjLENBQUMsU0FBUyxFQUFFLEtBQUssSUFBSSxTQUFTLENBQUMsQ0FBQzthQUM3RSxJQUFHLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxVQUFVO1lBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDckUsQ0FBQztJQUVELGdDQUFhLEdBQWIsVUFBYyxJQUFnQixFQUFFLFVBQXNCO1FBQ3JELElBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLGtCQUFrQixDQUFDLE1BQU0sRUFBRTtZQUN2RCxvREFBb0Q7WUFDcEQsMERBQTBEO1lBRTFELEtBQWdCLFVBQXVCLEVBQXZCLEtBQUEsSUFBSSxDQUFDLGtCQUFrQixFQUF2QixjQUF1QixFQUF2QixJQUF1QixFQUFFO2dCQUFyQyxJQUFJLElBQUksU0FBQTtnQkFDWCxJQUFJLEdBQUcsR0FBRyxnQkFBZ0IsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUNuRCxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUVwQyxJQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsRUFBRTtvQkFDdEIsUUFBUSxDQUFDLG9CQUFvQixDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQztpQkFDckU7YUFDRDtZQUVELHdEQUF3RDtZQUN4RCwyREFBMkQ7WUFFM0QsT0FBTSxJQUFJLEVBQUU7Z0JBQ1gsUUFBUSxDQUFDLG9CQUFvQixDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQztnQkFDMUUsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO2FBQ3hCO1NBQ0Q7UUFFRCxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUN0QyxDQUFDO0lBRUQ7OytFQUUyRTtJQUUzRSxvQ0FBaUIsR0FBakIsVUFBa0IsTUFBZ0I7UUFDakMsSUFBSSxJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBcUIsQ0FBQztRQUN0RCxJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDO1FBRWpDLElBQUcsTUFBTTtZQUFFLFFBQVEsR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUV6RCxLQUFnQixVQUFRLEVBQVIscUJBQVEsRUFBUixzQkFBUSxFQUFSLElBQVEsRUFBRTtZQUF0QixJQUFJLElBQUksaUJBQUE7WUFDWCxPQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7U0FDbkI7SUFDRixDQUFDO0lBRWMsNkJBQW9CLEdBQW5DLFVBQW9DLFVBQXNCLEVBQUUsSUFBc0IsRUFBRSxJQUFpQjtRQUNwRyxJQUFHLFVBQVUsSUFBSSxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxFQUFFO1lBQy9DLElBQUcsQ0FBQyxVQUFVLENBQUMsVUFBVTtnQkFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxHQUFHLFVBQVUsQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDO1NBQ3ZGO2FBQU07WUFDTixRQUFRLENBQUMscUJBQXFCLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxDQUFDO1NBQ2pEO0lBQ0YsQ0FBQztJQUVjLDhCQUFxQixHQUFwQyxVQUFxQyxNQUFrQixFQUFFLElBQXNCO1FBQzlFLEtBQXNCLFVBQWlDLEVBQWpDLEtBQUEsTUFBTSxDQUFDLFNBQVMsQ0FBQyxjQUFjLEVBQUUsRUFBakMsY0FBaUMsRUFBakMsSUFBaUMsRUFBRTtZQUFyRCxJQUFJLFVBQVUsU0FBQTtZQUNqQixRQUFRLENBQUMsb0JBQW9CLENBQUMsVUFBVSxFQUFFLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQztTQUN4RDtJQUNGLENBQUM7SUFzQkQsb0VBQW9FO0lBQzdELHNCQUFhLEdBQUcsQ0FBQyxDQUFDO0lBQ3pCLG1GQUFtRjtJQUM1RSwyQkFBa0IsR0FBRyxDQUFDLENBQUM7SUFDOUIsb0VBQW9FO0lBQzdELGlCQUFRLEdBQUcsQ0FBQyxDQUFDO0lBQ3JCLGVBQUM7Q0FBQSxBQXpORCxJQXlOQztBQXpOWSw0QkFBUSIsInNvdXJjZXNDb250ZW50IjpbIi8vIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIGN4bWwsIGNvcHlyaWdodCAoYykgMjAxNiBCdXNGYXN0ZXIgTHRkLlxuLy8gUmVsZWFzZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlLCBzZWUgTElDRU5TRS5cblxuaW1wb3J0IHtOYW1lc3BhY2V9IGZyb20gJy4vTmFtZXNwYWNlJztcbmltcG9ydCB7TWVtYmVyU3BlY30gZnJvbSAnLi9NZW1iZXInO1xuaW1wb3J0IHtNZW1iZXJSZWYsIFJhd1JlZlNwZWN9IGZyb20gJy4vTWVtYmVyUmVmJztcbmltcG9ydCB7VHlwZSwgVHlwZUNsYXNzLCBUeXBlSW5zdGFuY2V9IGZyb20gJy4vVHlwZSc7XG5pbXBvcnQge0l0ZW0sIEl0ZW1CYXNlfSBmcm9tICcuL0l0ZW0nO1xuXG4vKiogVHVwbGU6IGZsYWdzLCBwYXJlbnQgdHlwZSBJRCwgY2hpbGQgZWxlbWVudCBsaXN0LCBhdHRyaWJ1dGUgbGlzdC5cbiAgKiBTZXJpYWxpemVkIEpTT04gZm9ybWF0LiAqL1xuZXhwb3J0IHR5cGUgUmF3VHlwZVNwZWMgPSBbIG51bWJlciwgbnVtYmVyLCBSYXdSZWZTcGVjW10sIFJhd1JlZlNwZWNbXSBdO1xuXG4vKiogUGFyc2UgbmFtZSBmcm9tIHNjaGVtYSBpbiBzZXJpYWxpemVkIEpTT04gZm9ybWF0LlxuICAqIElmIG5hbWUgdXNlZCBpbiBYTUwgaXMgbm90IGEgdmFsaWQgSmF2YVNjcmlwdCBpZGVudGlmaWVyLCB0aGUgc2NoZW1hXG4gICogZGVmaW5pdGlvbiB3aWxsIGJlIGluIGZvcm1hdCA8Y2xlYW5lZCB1cCBuYW1lIGZvciBKYXZhU2NyaXB0Pjo8WE1MIG5hbWU+LiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VOYW1lKG5hbWU6IHN0cmluZykge1xuXHR2YXIgc3BsaXRQb3MgPSBuYW1lLmluZGV4T2YoJzonKTtcblx0dmFyIHNhZmVOYW1lOiBzdHJpbmdcblxuXHRpZihzcGxpdFBvcyA+PSAwKSB7XG5cdFx0c2FmZU5hbWUgPSBuYW1lLnN1YnN0cigwLCBzcGxpdFBvcyk7XG5cdFx0bmFtZSA9IG5hbWUuc3Vic3RyKHNwbGl0UG9zICsgMSk7XG5cdH0gZWxzZSBzYWZlTmFtZSA9IG5hbWU7XG5cblx0cmV0dXJuKHtcblx0XHRuYW1lOiBuYW1lLFxuXHRcdHNhZmVOYW1lOiBzYWZlTmFtZVxuXHR9KTtcbn1cblxuLyoqIENyZWF0ZSBhIG5ldyBkYXRhIG9iamVjdCBpbmhlcml0aW5nIGRlZmF1bHQgdmFsdWVzIGZyb20gYW5vdGhlci4gKi9cblxuZnVuY3Rpb24gaW5oZXJpdDxUeXBlPihwYXJlbnRPYmplY3Q6IFR5cGUpIHtcblx0ZnVuY3Rpb24gUHJveHkoKSB7fVxuXHRQcm94eS5wcm90b3R5cGUgPSBwYXJlbnRPYmplY3Q7XG5cdHJldHVybihuZXcgKFByb3h5IGFzIGFueSBhcyB7IG5ldygpOiBUeXBlIH0pKCkpO1xufVxuXG4vKiogUmVwcmVzZW50cyB0aGUgcHJvdG90eXBlIG9mIFR5cGVDbGFzcy5cbiAgKiBDb250YWlucyBwbGFjZWhvbGRlcnMgZm9yIGFueSBtaXNzaW5nIG1lbWJlcnMuICovXG5cbmV4cG9ydCBpbnRlcmZhY2UgVHlwZUNsYXNzTWVtYmVycyB7XG5cdFtuYW1lOiBzdHJpbmddOiBUeXBlSW5zdGFuY2UgfCBUeXBlSW5zdGFuY2VbXTtcbn1cblxuZnVuY3Rpb24gZGVmaW5lU3Vic3RpdHV0ZShzdWJzdGl0dXRlOiBNZW1iZXJTcGVjLCBwcm94eTogTWVtYmVyUmVmKSB7XG5cdHZhciByZWYgPSBuZXcgTWVtYmVyUmVmKFtzdWJzdGl0dXRlLCAwLCBzdWJzdGl0dXRlLnNhZmVOYW1lXSwgc3Vic3RpdHV0ZS5uYW1lc3BhY2UsIHByb3h5KTtcblxuXHRyZXR1cm4ocmVmKTtcbn1cblxuLyoqIFR5cGUgc3BlY2lmaWNhdGlvbiBkZWZpbmluZyBhdHRyaWJ1dGVzIGFuZCBjaGlsZHJlbi4gKi9cblxuZXhwb3J0IGNsYXNzIFR5cGVTcGVjIGltcGxlbWVudHMgSXRlbTxJdGVtQmFzZTxUeXBlU3BlYz4+IHtcblx0Y29uc3RydWN0b3Ioc3BlYzogUmF3VHlwZVNwZWMsIG5hbWVzcGFjZTogTmFtZXNwYWNlLCBuYW1lOiBzdHJpbmcpIHtcblx0XHQvLyBJbml0aWFsaXplIGhlbHBlciBjb250YWluaW5nIGRhdGEgYW5kIG1ldGhvZHMgYWxzbyBhcHBsaWNhYmxlIHRvIG1lbWJlcnMuXG5cblx0XHR0aGlzLml0ZW0gPSBuZXcgSXRlbUJhc2UodGhpcyBhcyBUeXBlU3BlYyk7XG5cblx0XHRpZihuYW1lKSB7XG5cdFx0XHR2YXIgcGFydHMgPSBwYXJzZU5hbWUobmFtZSk7XG5cdFx0XHR0aGlzLm5hbWUgPSBwYXJ0cy5uYW1lO1xuXHRcdFx0dGhpcy5zYWZlTmFtZSA9IHBhcnRzLnNhZmVOYW1lO1xuXHRcdH1cblxuXHRcdHRoaXMubmFtZXNwYWNlID0gbmFtZXNwYWNlO1xuXHRcdHRoaXMuZmxhZ3MgPSBzcGVjWzBdO1xuXHRcdHRoaXMuaXRlbS5wYXJlbnROdW0gPSBzcGVjWzFdO1xuXHRcdHRoaXMuY2hpbGRTcGVjTGlzdCA9IHNwZWNbMl07XG5cdFx0dGhpcy5hdHRyaWJ1dGVTcGVjTGlzdCA9IHNwZWNbM107XG5cdH1cblxuXHRnZXRQcm90bygpIHsgcmV0dXJuKHRoaXMucHJvdG8pOyB9XG5cblx0Z2V0VHlwZSgpIHsgcmV0dXJuKHRoaXMudHlwZSk7IH1cblxuXHRkZWZpbmUoKSB7XG5cdFx0Ly8gVGhpcyBmdW5jdGlvbiBoYXNuJ3QgYmVlbiBjYWxsZWQgZm9yIHRoaXMgdHlwZSB5ZXQgYnkgc2V0UGFyZW50LFxuXHRcdC8vIGJ1dCBzb21ldGhpbmcgbXVzdCBieSBub3cgaGF2ZSBjYWxsZWQgaXQgZm9yIHRoZSBwYXJlbnQgdHlwZS5cblxuXHRcdHZhciBwYXJlbnQgPSAodGhpcy5pdGVtLnBhcmVudCAmJiB0aGlzLml0ZW0ucGFyZW50ICE9IHRoaXMpID8gdGhpcy5pdGVtLnBhcmVudC5wcm90byA6IFR5cGVJbnN0YW5jZTtcblxuXHRcdHRoaXMucHJvdG8gPSBjbGFzcyBYbWxUeXBlIGV4dGVuZHMgcGFyZW50IHt9O1xuXG5cdFx0dmFyIGluc3RhbmNlUHJvdG8gPSB0aGlzLnByb3RvLnByb3RvdHlwZSBhcyBUeXBlSW5zdGFuY2U7XG5cdFx0aW5zdGFuY2VQcm90by5fZXhpc3RzID0gdHJ1ZTtcblx0XHRpbnN0YW5jZVByb3RvLl9uYW1lc3BhY2UgPSB0aGlzLm5hbWVzcGFjZS5uYW1lO1xuXG5cdFx0dGhpcy5wbGFjZUhvbGRlciA9IG5ldyB0aGlzLnByb3RvKCk7XG5cdFx0dGhpcy5wbGFjZUhvbGRlci5fZXhpc3RzID0gZmFsc2U7XG5cdFx0dGhpcy50eXBlID0gbmV3IFR5cGUodGhpcy5wcm90byk7XG5cdFx0dGhpcy5wcm90by50eXBlID0gdGhpcy50eXBlO1xuXHRcdHRoaXMudHlwZS5uYW1lc3BhY2UgPSB0aGlzLm5hbWVzcGFjZTtcblxuXHRcdGlmKHRoaXMuaXRlbS5wYXJlbnQpIHtcblx0XHRcdHRoaXMudHlwZS5jaGlsZFRibCA9IGluaGVyaXQodGhpcy5pdGVtLnBhcmVudC50eXBlLmNoaWxkVGJsKTtcblx0XHRcdHRoaXMudHlwZS5hdHRyaWJ1dGVUYmwgPSBpbmhlcml0KHRoaXMuaXRlbS5wYXJlbnQudHlwZS5hdHRyaWJ1dGVUYmwpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aGlzLnR5cGUuYXR0cmlidXRlVGJsID0ge307XG5cdFx0XHR0aGlzLnR5cGUuY2hpbGRUYmwgPSB7fTtcblx0XHR9XG5cblx0XHR0aGlzLnR5cGUuaXNQcmltaXRpdmUgPSAhISh0aGlzLmZsYWdzICYgVHlwZVNwZWMucHJpbWl0aXZlRmxhZyk7XG5cdFx0dGhpcy50eXBlLmlzUGxhaW5QcmltaXRpdmUgPSAhISh0aGlzLmZsYWdzICYgVHlwZVNwZWMucGxhaW5QcmltaXRpdmVGbGFnKTtcblx0XHR0aGlzLnR5cGUuaXNMaXN0ID0gISEodGhpcy5mbGFncyAmIFR5cGVTcGVjLmxpc3RGbGFnKTtcblxuXHRcdGlmKHRoaXMudHlwZS5pc1ByaW1pdGl2ZSkge1xuXHRcdFx0dmFyIHByaW1pdGl2ZVR5cGU6IFR5cGVTcGVjID0gdGhpcztcblx0XHRcdHZhciBuZXh0OiBUeXBlU3BlYztcblxuXHRcdFx0d2hpbGUoKG5leHQgPSBwcmltaXRpdmVUeXBlLml0ZW0ucGFyZW50KSAmJiBuZXh0ICE9IHByaW1pdGl2ZVR5cGUpIHByaW1pdGl2ZVR5cGUgPSBuZXh0O1xuXG5cdFx0XHR0aGlzLnR5cGUucHJpbWl0aXZlVHlwZSA9IHByaW1pdGl2ZVR5cGUuc2FmZU5hbWU7XG5cdFx0fVxuXG5cdFx0cmV0dXJuKHRoaXMudHlwZSk7XG5cdH1cblxuXHRwcml2YXRlIGRlZmluZU1lbWJlcihyZWY6IE1lbWJlclJlZikge1xuXHRcdHZhciB0eXBlU3BlYyA9IHJlZi5tZW1iZXIudHlwZVNwZWM7XG5cdFx0dmFyIHByb3h5U3BlYyA9IHJlZi5tZW1iZXIucHJveHlTcGVjO1xuXG5cdFx0aWYocHJveHlTcGVjKSB7XG5cdFx0XHRpZihyZWYubWF4ID4gMSkge1xuXHRcdFx0XHR0eXBlU3BlYyA9IHByb3h5U3BlYztcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHByb3h5U3BlYyA9IHRoaXM7XG5cdFx0XHRcdHR5cGVTcGVjID0gbnVsbDtcblx0XHRcdH1cblxuXHRcdFx0VHlwZVNwZWMuYWRkU3Vic3RpdHV0ZXNUb1Byb3h5KHJlZi5tZW1iZXIsIHByb3h5U3BlYy5wcm90by5wcm90b3R5cGUpO1xuXHRcdH1cblxuXHRcdGlmKHR5cGVTcGVjKSB7XG5cdFx0XHR2YXIgbWVtYmVyVHlwZSA9IHR5cGVTcGVjLnBsYWNlSG9sZGVyO1xuXHRcdFx0dmFyIHR5cGUgPSAodGhpcy5wcm90by5wcm90b3R5cGUpIGFzIFR5cGVDbGFzc01lbWJlcnM7XG5cblx0XHRcdHR5cGVbcmVmLnNhZmVOYW1lXSA9IChyZWYubWF4ID4gMSkgPyBbbWVtYmVyVHlwZV0gOiBtZW1iZXJUeXBlO1xuXG5cdFx0XHRpZihyZWYubWluIDwgMSkgdGhpcy5vcHRpb25hbExpc3QucHVzaChyZWYuc2FmZU5hbWUpO1xuXHRcdFx0ZWxzZSB0aGlzLnJlcXVpcmVkTGlzdC5wdXNoKHJlZi5zYWZlTmFtZSk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuKHJlZik7XG5cdH1cblxuXHRnZXRTdWJzdGl0dXRlcygpIHtcblx0XHRyZXR1cm4odGhpcy5zdWJzdGl0dXRlTGlzdCk7XG5cdH1cblxuXHRkZWZpbmVNZW1iZXJzKCkge1xuXHRcdHZhciBzcGVjOiBSYXdSZWZTcGVjO1xuXG5cdFx0Zm9yKHNwZWMgb2YgdGhpcy5jaGlsZFNwZWNMaXN0KSB7XG5cdFx0XHR2YXIgbWVtYmVyUmVmID0gbmV3IE1lbWJlclJlZihzcGVjLCB0aGlzLm5hbWVzcGFjZSk7XG5cdFx0XHR0aGlzLmFkZENoaWxkKG1lbWJlclJlZik7XG5cdFx0XHR0aGlzLmRlZmluZU1lbWJlcihtZW1iZXJSZWYpO1xuXHRcdH1cblxuXHRcdGZvcihzcGVjIG9mIHRoaXMuYXR0cmlidXRlU3BlY0xpc3QpIHtcblx0XHRcdHZhciBhdHRyaWJ1dGVSZWYgPSBuZXcgTWVtYmVyUmVmKHNwZWMsIHRoaXMubmFtZXNwYWNlKTtcblx0XHRcdGlmKGF0dHJpYnV0ZVJlZi5tZW1iZXIudHlwZVNwZWMpIHRoaXMudHlwZS5hZGRBdHRyaWJ1dGUoYXR0cmlidXRlUmVmKTtcblx0XHRcdHRoaXMuZGVmaW5lTWVtYmVyKGF0dHJpYnV0ZVJlZik7XG5cdFx0fVxuXHR9XG5cblx0YWRkU3Vic3RpdHV0ZXMoaGVhZFJlZjogTWVtYmVyUmVmLCBwcm94eTogTWVtYmVyUmVmKSB7XG5cdFx0aGVhZFJlZi5tZW1iZXIuY29udGFpbmluZ1R5cGVMaXN0LnB1c2goe1xuXHRcdFx0dHlwZTogdGhpcyxcblx0XHRcdGhlYWQ6IGhlYWRSZWYsXG5cdFx0XHRwcm94eTogcHJveHlcblx0XHR9KTtcblx0XHRoZWFkUmVmLm1lbWJlci5wcm94eVNwZWMuaXRlbS5kZWZpbmUoKTtcblxuXHRcdGZvcih2YXIgc3Vic3RpdHV0ZSBvZiBoZWFkUmVmLm1lbWJlci5wcm94eVNwZWMuZ2V0U3Vic3RpdHV0ZXMoKSkge1xuXHRcdFx0aWYoc3Vic3RpdHV0ZSA9PSBoZWFkUmVmLm1lbWJlcikge1xuXHRcdFx0XHR0aGlzLnR5cGUuYWRkQ2hpbGQoaGVhZFJlZik7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR2YXIgc3Vic3RpdHV0ZVJlZiA9IGRlZmluZVN1YnN0aXR1dGUoc3Vic3RpdHV0ZSwgcHJveHkpO1xuXHRcdFx0XHR0aGlzLmFkZENoaWxkKHN1YnN0aXR1dGVSZWYsIHByb3h5KTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRhZGRDaGlsZChtZW1iZXJSZWY6IE1lbWJlclJlZiwgcHJveHk/OiBNZW1iZXJSZWYpIHtcblx0XHRpZihtZW1iZXJSZWYubWVtYmVyLnByb3h5U3BlYykgdGhpcy5hZGRTdWJzdGl0dXRlcyhtZW1iZXJSZWYsIHByb3h5IHx8IG1lbWJlclJlZik7XG5cdFx0ZWxzZSBpZighbWVtYmVyUmVmLm1lbWJlci5pc0Fic3RyYWN0KSB0aGlzLnR5cGUuYWRkQ2hpbGQobWVtYmVyUmVmKTtcblx0fVxuXG5cdGFkZFN1YnN0aXR1dGUoaGVhZDogTWVtYmVyU3BlYywgc3Vic3RpdHV0ZTogTWVtYmVyU3BlYykge1xuXHRcdGlmKHRoaXMuaXRlbS5kZWZpbmVkICYmIGhlYWQuY29udGFpbmluZ1R5cGVMaXN0Lmxlbmd0aCkge1xuXHRcdFx0Ly8gVGhlIGVsZW1lbnQncyBwcm94eSB0eXBlIGhhcyBhbHJlYWR5IGJlZW4gZGVmaW5lZFxuXHRcdFx0Ly8gc28gd2UgbmVlZCB0byBwYXRjaCBvdGhlciB0eXBlcyBjb250YWluaW5nIHRoZSBlbGVtZW50LlxuXG5cdFx0XHRmb3IodmFyIHNwZWMgb2YgaGVhZC5jb250YWluaW5nVHlwZUxpc3QpIHtcblx0XHRcdFx0dmFyIHJlZiA9IGRlZmluZVN1YnN0aXR1dGUoc3Vic3RpdHV0ZSwgc3BlYy5wcm94eSk7XG5cdFx0XHRcdHNwZWMudHlwZS5hZGRDaGlsZChyZWYsIHNwZWMucHJveHkpO1xuXG5cdFx0XHRcdGlmKHNwZWMuaGVhZC5tYXggPD0gMSkge1xuXHRcdFx0XHRcdFR5cGVTcGVjLmFkZFN1YnN0aXR1dGVUb1Byb3h5KHN1YnN0aXR1dGUsIHNwZWMudHlwZS5wcm90by5wcm90b3R5cGUpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdC8vIEFkZCB0aGUgc3Vic3RpdHV0aW9uIHRvIHByb3h5IHR5cGUgb2YgdGhlIGdyb3VwIGhlYWQsXG5cdFx0XHQvLyBhbmQgbG9vcCBpZiB0aGUgaGVhZCBmdXJ0aGVyIHN1YnN0aXR1dGVzIHNvbWV0aGluZyBlbHNlLlxuXG5cdFx0XHR3aGlsZShoZWFkKSB7XG5cdFx0XHRcdFR5cGVTcGVjLmFkZFN1YnN0aXR1dGVUb1Byb3h5KHN1YnN0aXR1dGUsIGhlYWQucHJveHlTcGVjLnByb3RvLnByb3RvdHlwZSk7XG5cdFx0XHRcdGhlYWQgPSBoZWFkLml0ZW0ucGFyZW50O1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHRoaXMuc3Vic3RpdHV0ZUxpc3QucHVzaChzdWJzdGl0dXRlKTtcblx0fVxuXG5cdC8qKiBSZW1vdmUgcGxhY2Vob2xkZXJzIGZyb20gaW5zdGFuY2UgcHJvdG90eXBlLiBUaGV5IGFsbG93IGRlcmVmZXJlbmNpbmdcblx0ICAqIGNvbnRlbnRzIG9mIG1pc3Npbmcgb3B0aW9uYWwgY2hpbGQgZWxlbWVudHMgd2l0aG91dCB0aHJvd2luZyBlcnJvcnMuXG5cdCAgKiBAcGFyYW0gc3RyaWN0IEFsc28gcmVtb3ZlIHBsYWNlaG9sZGVycyBmb3IgbWFuZGF0b3J5IGNoaWxkIGVsZW1lbnRzLiAqL1xuXG5cdGNsZWFuUGxhY2Vob2xkZXJzKHN0cmljdD86IGJvb2xlYW4pIHtcblx0XHR2YXIgdHlwZSA9ICh0aGlzLnByb3RvLnByb3RvdHlwZSkgYXMgVHlwZUNsYXNzTWVtYmVycztcblx0XHR2YXIgbmFtZUxpc3QgPSB0aGlzLm9wdGlvbmFsTGlzdDtcblxuXHRcdGlmKHN0cmljdCkgbmFtZUxpc3QgPSBuYW1lTGlzdC5jb25jYXQodGhpcy5yZXF1aXJlZExpc3QpO1xuXG5cdFx0Zm9yKHZhciBuYW1lIG9mIG5hbWVMaXN0KSB7XG5cdFx0XHRkZWxldGUodHlwZVtuYW1lXSk7XG5cdFx0fVxuXHR9XG5cblx0cHJpdmF0ZSBzdGF0aWMgYWRkU3Vic3RpdHV0ZVRvUHJveHkoc3Vic3RpdHV0ZTogTWVtYmVyU3BlYywgdHlwZTogVHlwZUNsYXNzTWVtYmVycywgaGVhZD86IE1lbWJlclNwZWMpIHtcblx0XHRpZihzdWJzdGl0dXRlID09IGhlYWQgfHwgIXN1YnN0aXR1dGUucHJveHlTcGVjKSB7XG5cdFx0XHRpZighc3Vic3RpdHV0ZS5pc0Fic3RyYWN0KSB0eXBlW3N1YnN0aXR1dGUuc2FmZU5hbWVdID0gc3Vic3RpdHV0ZS50eXBlU3BlYy5wbGFjZUhvbGRlcjtcblx0XHR9IGVsc2Uge1xuXHRcdFx0VHlwZVNwZWMuYWRkU3Vic3RpdHV0ZXNUb1Byb3h5KHN1YnN0aXR1dGUsIHR5cGUpO1xuXHRcdH1cblx0fVxuXG5cdHByaXZhdGUgc3RhdGljIGFkZFN1YnN0aXR1dGVzVG9Qcm94eShtZW1iZXI6IE1lbWJlclNwZWMsIHR5cGU6IFR5cGVDbGFzc01lbWJlcnMpIHtcblx0XHRmb3IodmFyIHN1YnN0aXR1dGUgb2YgbWVtYmVyLnByb3h5U3BlYy5nZXRTdWJzdGl0dXRlcygpKSB7XG5cdFx0XHRUeXBlU3BlYy5hZGRTdWJzdGl0dXRlVG9Qcm94eShzdWJzdGl0dXRlLCB0eXBlLCBtZW1iZXIpO1xuXHRcdH1cblx0fVxuXG5cdGl0ZW06IEl0ZW1CYXNlPFR5cGVTcGVjPjtcblxuXHRuYW1lc3BhY2U6IE5hbWVzcGFjZTtcblx0Ly8gVE9ETzogSXMgYSBzZXBhcmF0ZSBuYW1lIGFuZCBzYWZlTmFtZSBuZWVkZWQgZm9yIGFueXRoaW5nIGhlcmU/XG5cdC8vIE1heWJlIGZvciBmdXR1cmUgdXNlIHdoZW4gY3hzZCBjYW4gaW1wb3J0IHBhcnNlZCBuYW1lc3BhY2VzP1xuXHRuYW1lOiBzdHJpbmc7XG5cdHNhZmVOYW1lOiBzdHJpbmc7XG5cdGZsYWdzOiBudW1iZXI7XG5cblx0Y2hpbGRTcGVjTGlzdDogUmF3UmVmU3BlY1tdO1xuXHRhdHRyaWJ1dGVTcGVjTGlzdDogUmF3UmVmU3BlY1tdO1xuXHRzdWJzdGl0dXRlTGlzdDogTWVtYmVyU3BlY1tdO1xuXG5cdG9wdGlvbmFsTGlzdDogc3RyaW5nW10gPSBbXTtcblx0cmVxdWlyZWRMaXN0OiBzdHJpbmdbXSA9IFtdO1xuXG5cdHByaXZhdGUgdHlwZTogVHlwZTtcblx0cHJpdmF0ZSBwcm90bzogVHlwZUNsYXNzO1xuXHRwcml2YXRlIHBsYWNlSG9sZGVyOiBUeXBlSW5zdGFuY2U7XG5cblx0LyoqIFR5cGUgY29udGFpbnMgdGV4dCB0aGF0IGdldHMgcGFyc2VkIHRvIEphdmFTY3JpcHQgcHJpbWl0aXZlcy4gKi9cblx0c3RhdGljIHByaW1pdGl2ZUZsYWcgPSAxO1xuXHQvKiogVHlwZSBvbmx5IGNvbnRhaW5zIHRleHQsIG5vIHdyYXBwZXIgb2JqZWN0IGlzIG5lZWRlZCB0byBob2xkIGl0cyBhdHRyaWJ1dGVzLiAqL1xuXHRzdGF0aWMgcGxhaW5QcmltaXRpdmVGbGFnID0gMjtcblx0LyoqIFR5cGUgY29udGFpbnMgdGV4dCB3aXRoIGEgbGlzdCBvZiB3aGl0ZXNwYWNlLXNlcGFyYXRlZCBpdGVtcy4gKi9cblx0c3RhdGljIGxpc3RGbGFnID0gNDtcbn1cbiJdfQ==