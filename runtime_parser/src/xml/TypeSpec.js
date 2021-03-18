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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVHlwZVNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJUeXBlU3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsK0RBQStEO0FBQy9ELCtDQUErQzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBSS9DLHlDQUFrRDtBQUNsRCwrQkFBcUQ7QUFDckQsK0JBQXNDO0FBTXRDOztnRkFFZ0Y7QUFFaEYsU0FBZ0IsU0FBUyxDQUFDLElBQVk7SUFDckMsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNqQyxJQUFJLFFBQWdCLENBQUE7SUFFcEIsSUFBRyxRQUFRLElBQUksQ0FBQyxFQUFFO1FBQ2pCLFFBQVEsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxRQUFRLENBQUMsQ0FBQztRQUNwQyxJQUFJLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDLENBQUM7S0FDakM7O1FBQU0sUUFBUSxHQUFHLElBQUksQ0FBQztJQUV2QixPQUFNLENBQUM7UUFDTixJQUFJLEVBQUUsSUFBSTtRQUNWLFFBQVEsRUFBRSxRQUFRO0tBQ2xCLENBQUMsQ0FBQztBQUNKLENBQUM7QUFiRCw4QkFhQztBQUVELHVFQUF1RTtBQUV2RSxTQUFTLE9BQU8sQ0FBTyxZQUFrQjtJQUN4QyxTQUFTLEtBQUssS0FBSSxDQUFDO0lBQ25CLEtBQUssQ0FBQyxTQUFTLEdBQUcsWUFBWSxDQUFDO0lBQy9CLE9BQU0sQ0FBQyxJQUFLLEtBQWdDLEVBQUUsQ0FBQyxDQUFDO0FBQ2pELENBQUM7QUFTRCxTQUFTLGdCQUFnQixDQUFDLFVBQXNCLEVBQUUsS0FBZ0I7SUFDakUsSUFBSSxHQUFHLEdBQUcsSUFBSSxxQkFBUyxDQUFDLENBQUMsVUFBVSxFQUFFLENBQUMsRUFBRSxVQUFVLENBQUMsUUFBUSxDQUFDLEVBQUUsVUFBVSxDQUFDLFNBQVMsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUUzRixP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LElBQWlDLEVBQUU7WUFBckQsSUFBSSxVQUFVLFNBQUE7WUFDakIsUUFBUSxDQUFDLG9CQUFvQixDQUFDLFVBQVUsRUFBRSxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7U0FDeEQ7SUFDRixDQUFDO0lBc0JELG9FQUFvRTtJQUM3RCxzQkFBYSxHQUFHLENBQUMsQ0FBQztJQUN6QixtRkFBbUY7SUFDNUUsMkJBQWtCLEdBQUcsQ0FBQyxDQUFDO0lBQzlCLG9FQUFvRTtJQUM3RCxpQkFBUSxHQUFHLENBQUMsQ0FBQztJQUNyQixlQUFDO0NBQUEsQUF6TkQsSUF5TkM7QUF6TlksNEJBQVEiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBUaGlzIGZpbGUgaXMgcGFydCBvZiBjeG1sLCBjb3B5cmlnaHQgKGMpIDIwMTYgQnVzRmFzdGVyIEx0ZC5cbi8vIFJlbGVhc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSwgc2VlIExJQ0VOU0UuXG5cbmltcG9ydCB7TmFtZXNwYWNlfSBmcm9tICcuL05hbWVzcGFjZSc7XG5pbXBvcnQge01lbWJlclNwZWN9IGZyb20gJy4vTWVtYmVyJztcbmltcG9ydCB7TWVtYmVyUmVmLCBSYXdSZWZTcGVjfSBmcm9tICcuL01lbWJlclJlZic7XG5pbXBvcnQge1R5cGUsIFR5cGVDbGFzcywgVHlwZUluc3RhbmNlfSBmcm9tICcuL1R5cGUnO1xuaW1wb3J0IHtJdGVtLCBJdGVtQmFzZX0gZnJvbSAnLi9JdGVtJztcblxuLyoqIFR1cGxlOiBmbGFncywgcGFyZW50IHR5cGUgSUQsIGNoaWxkIGVsZW1lbnQgbGlzdCwgYXR0cmlidXRlIGxpc3QuXG4gICogU2VyaWFsaXplZCBKU09OIGZvcm1hdC4gKi9cbmV4cG9ydCB0eXBlIFJhd1R5cGVTcGVjID0gWyBudW1iZXIsIG51bWJlciwgUmF3UmVmU3BlY1tdLCBSYXdSZWZTcGVjW10gXTtcblxuLyoqIFBhcnNlIG5hbWUgZnJvbSBzY2hlbWEgaW4gc2VyaWFsaXplZCBKU09OIGZvcm1hdC5cbiAgKiBJZiBuYW1lIHVzZWQgaW4gWE1MIGlzIG5vdCBhIHZhbGlkIEphdmFTY3JpcHQgaWRlbnRpZmllciwgdGhlIHNjaGVtYVxuICAqIGRlZmluaXRpb24gd2lsbCBiZSBpbiBmb3JtYXQgPGNsZWFuZWQgdXAgbmFtZSBmb3IgSmF2YVNjcmlwdD46PFhNTCBuYW1lPi4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlTmFtZShuYW1lOiBzdHJpbmcpIHtcblx0dmFyIHNwbGl0UG9zID0gbmFtZS5pbmRleE9mKCc6Jyk7XG5cdHZhciBzYWZlTmFtZTogc3RyaW5nXG5cblx0aWYoc3BsaXRQb3MgPj0gMCkge1xuXHRcdHNhZmVOYW1lID0gbmFtZS5zdWJzdHIoMCwgc3BsaXRQb3MpO1xuXHRcdG5hbWUgPSBuYW1lLnN1YnN0cihzcGxpdFBvcyArIDEpO1xuXHR9IGVsc2Ugc2FmZU5hbWUgPSBuYW1lO1xuXG5cdHJldHVybih7XG5cdFx0bmFtZTogbmFtZSxcblx0XHRzYWZlTmFtZTogc2FmZU5hbWVcblx0fSk7XG59XG5cbi8qKiBDcmVhdGUgYSBuZXcgZGF0YSBvYmplY3QgaW5oZXJpdGluZyBkZWZhdWx0IHZhbHVlcyBmcm9tIGFub3RoZXIuICovXG5cbmZ1bmN0aW9uIGluaGVyaXQ8VHlwZT4ocGFyZW50T2JqZWN0OiBUeXBlKSB7XG5cdGZ1bmN0aW9uIFByb3h5KCkge31cblx0UHJveHkucHJvdG90eXBlID0gcGFyZW50T2JqZWN0O1xuXHRyZXR1cm4obmV3IChQcm94eSBhcyBhbnkgYXMgeyBuZXcoKTogVHlwZSB9KSgpKTtcbn1cblxuLyoqIFJlcHJlc2VudHMgdGhlIHByb3RvdHlwZSBvZiBUeXBlQ2xhc3MuXG4gICogQ29udGFpbnMgcGxhY2Vob2xkZXJzIGZvciBhbnkgbWlzc2luZyBtZW1iZXJzLiAqL1xuXG5leHBvcnQgaW50ZXJmYWNlIFR5cGVDbGFzc01lbWJlcnMge1xuXHRbbmFtZTogc3RyaW5nXTogVHlwZUluc3RhbmNlIHwgVHlwZUluc3RhbmNlW107XG59XG5cbmZ1bmN0aW9uIGRlZmluZVN1YnN0aXR1dGUoc3Vic3RpdHV0ZTogTWVtYmVyU3BlYywgcHJveHk6IE1lbWJlclJlZikge1xuXHR2YXIgcmVmID0gbmV3IE1lbWJlclJlZihbc3Vic3RpdHV0ZSwgMCwgc3Vic3RpdHV0ZS5zYWZlTmFtZV0sIHN1YnN0aXR1dGUubmFtZXNwYWNlLCBwcm94eSk7XG5cblx0cmV0dXJuKHJlZik7XG59XG5cbi8qKiBUeXBlIHNwZWNpZmljYXRpb24gZGVmaW5pbmcgYXR0cmlidXRlcyBhbmQgY2hpbGRyZW4uICovXG5cbmV4cG9ydCBjbGFzcyBUeXBlU3BlYyBpbXBsZW1lbnRzIEl0ZW08SXRlbUJhc2U8VHlwZVNwZWM+PiB7XG5cdGNvbnN0cnVjdG9yKHNwZWM6IFJhd1R5cGVTcGVjLCBuYW1lc3BhY2U6IE5hbWVzcGFjZSwgbmFtZTogc3RyaW5nKSB7XG5cdFx0Ly8gSW5pdGlhbGl6ZSBoZWxwZXIgY29udGFpbmluZyBkYXRhIGFuZCBtZXRob2RzIGFsc28gYXBwbGljYWJsZSB0byBtZW1iZXJzLlxuXG5cdFx0dGhpcy5pdGVtID0gbmV3IEl0ZW1CYXNlKHRoaXMgYXMgVHlwZVNwZWMpO1xuXG5cdFx0aWYobmFtZSkge1xuXHRcdFx0dmFyIHBhcnRzID0gcGFyc2VOYW1lKG5hbWUpO1xuXHRcdFx0dGhpcy5uYW1lID0gcGFydHMubmFtZTtcblx0XHRcdHRoaXMuc2FmZU5hbWUgPSBwYXJ0cy5zYWZlTmFtZTtcblx0XHR9XG5cblx0XHR0aGlzLm5hbWVzcGFjZSA9IG5hbWVzcGFjZTtcblx0XHR0aGlzLmZsYWdzID0gc3BlY1swXTtcblx0XHR0aGlzLml0ZW0ucGFyZW50TnVtID0gc3BlY1sxXTtcblx0XHR0aGlzLmNoaWxkU3BlY0xpc3QgPSBzcGVjWzJdO1xuXHRcdHRoaXMuYXR0cmlidXRlU3BlY0xpc3QgPSBzcGVjWzNdO1xuXHR9XG5cblx0Z2V0UHJvdG8oKSB7IHJldHVybih0aGlzLnByb3RvKTsgfVxuXG5cdGdldFR5cGUoKSB7IHJldHVybih0aGlzLnR5cGUpOyB9XG5cblx0ZGVmaW5lKCkge1xuXHRcdC8vIFRoaXMgZnVuY3Rpb24gaGFzbid0IGJlZW4gY2FsbGVkIGZvciB0aGlzIHR5cGUgeWV0IGJ5IHNldFBhcmVudCxcblx0XHQvLyBidXQgc29tZXRoaW5nIG11c3QgYnkgbm93IGhhdmUgY2FsbGVkIGl0IGZvciB0aGUgcGFyZW50IHR5cGUuXG5cblx0XHR2YXIgcGFyZW50ID0gKHRoaXMuaXRlbS5wYXJlbnQgJiYgdGhpcy5pdGVtLnBhcmVudCAhPSB0aGlzKSA/IHRoaXMuaXRlbS5wYXJlbnQucHJvdG8gOiBUeXBlSW5zdGFuY2U7XG5cblx0XHR0aGlzLnByb3RvID0gY2xhc3MgWG1sVHlwZSBleHRlbmRzIHBhcmVudCB7fTtcblxuXHRcdHZhciBpbnN0YW5jZVByb3RvID0gdGhpcy5wcm90by5wcm90b3R5cGUgYXMgVHlwZUluc3RhbmNlO1xuXHRcdGluc3RhbmNlUHJvdG8uX2V4aXN0cyA9IHRydWU7XG5cdFx0aW5zdGFuY2VQcm90by5fbmFtZXNwYWNlID0gdGhpcy5uYW1lc3BhY2UubmFtZTtcblxuXHRcdHRoaXMucGxhY2VIb2xkZXIgPSBuZXcgdGhpcy5wcm90bygpO1xuXHRcdHRoaXMucGxhY2VIb2xkZXIuX2V4aXN0cyA9IGZhbHNlO1xuXHRcdHRoaXMudHlwZSA9IG5ldyBUeXBlKHRoaXMucHJvdG8pO1xuXHRcdHRoaXMucHJvdG8udHlwZSA9IHRoaXMudHlwZTtcblx0XHR0aGlzLnR5cGUubmFtZXNwYWNlID0gdGhpcy5uYW1lc3BhY2U7XG5cblx0XHRpZih0aGlzLml0ZW0ucGFyZW50KSB7XG5cdFx0XHR0aGlzLnR5cGUuY2hpbGRUYmwgPSBpbmhlcml0KHRoaXMuaXRlbS5wYXJlbnQudHlwZS5jaGlsZFRibCk7XG5cdFx0XHR0aGlzLnR5cGUuYXR0cmlidXRlVGJsID0gaW5oZXJpdCh0aGlzLml0ZW0ucGFyZW50LnR5cGUuYXR0cmlidXRlVGJsKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhpcy50eXBlLmF0dHJpYnV0ZVRibCA9IHt9O1xuXHRcdFx0dGhpcy50eXBlLmNoaWxkVGJsID0ge307XG5cdFx0fVxuXG5cdFx0dGhpcy50eXBlLmlzUHJpbWl0aXZlID0gISEodGhpcy5mbGFncyAmIFR5cGVTcGVjLnByaW1pdGl2ZUZsYWcpO1xuXHRcdHRoaXMudHlwZS5pc1BsYWluUHJpbWl0aXZlID0gISEodGhpcy5mbGFncyAmIFR5cGVTcGVjLnBsYWluUHJpbWl0aXZlRmxhZyk7XG5cdFx0dGhpcy50eXBlLmlzTGlzdCA9ICEhKHRoaXMuZmxhZ3MgJiBUeXBlU3BlYy5saXN0RmxhZyk7XG5cblx0XHRpZih0aGlzLnR5cGUuaXNQcmltaXRpdmUpIHtcblx0XHRcdHZhciBwcmltaXRpdmVUeXBlOiBUeXBlU3BlYyA9IHRoaXM7XG5cdFx0XHR2YXIgbmV4dDogVHlwZVNwZWM7XG5cblx0XHRcdHdoaWxlKChuZXh0ID0gcHJpbWl0aXZlVHlwZS5pdGVtLnBhcmVudCkgJiYgbmV4dCAhPSBwcmltaXRpdmVUeXBlKSBwcmltaXRpdmVUeXBlID0gbmV4dDtcblxuXHRcdFx0dGhpcy50eXBlLnByaW1pdGl2ZVR5cGUgPSBwcmltaXRpdmVUeXBlLnNhZmVOYW1lO1xuXHRcdH1cblxuXHRcdHJldHVybih0aGlzLnR5cGUpO1xuXHR9XG5cblx0cHJpdmF0ZSBkZWZpbmVNZW1iZXIocmVmOiBNZW1iZXJSZWYpIHtcblx0XHR2YXIgdHlwZVNwZWMgPSByZWYubWVtYmVyLnR5cGVTcGVjO1xuXHRcdHZhciBwcm94eVNwZWMgPSByZWYubWVtYmVyLnByb3h5U3BlYztcblxuXHRcdGlmKHByb3h5U3BlYykge1xuXHRcdFx0aWYocmVmLm1heCA+IDEpIHtcblx0XHRcdFx0dHlwZVNwZWMgPSBwcm94eVNwZWM7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRwcm94eVNwZWMgPSB0aGlzO1xuXHRcdFx0XHR0eXBlU3BlYyA9IG51bGw7XG5cdFx0XHR9XG5cblx0XHRcdFR5cGVTcGVjLmFkZFN1YnN0aXR1dGVzVG9Qcm94eShyZWYubWVtYmVyLCBwcm94eVNwZWMucHJvdG8ucHJvdG90eXBlKTtcblx0XHR9XG5cblx0XHRpZih0eXBlU3BlYykge1xuXHRcdFx0dmFyIG1lbWJlclR5cGUgPSB0eXBlU3BlYy5wbGFjZUhvbGRlcjtcblx0XHRcdHZhciB0eXBlID0gKHRoaXMucHJvdG8ucHJvdG90eXBlKSBhcyBUeXBlQ2xhc3NNZW1iZXJzO1xuXG5cdFx0XHR0eXBlW3JlZi5zYWZlTmFtZV0gPSAocmVmLm1heCA+IDEpID8gW21lbWJlclR5cGVdIDogbWVtYmVyVHlwZTtcblxuXHRcdFx0aWYocmVmLm1pbiA8IDEpIHRoaXMub3B0aW9uYWxMaXN0LnB1c2gocmVmLnNhZmVOYW1lKTtcblx0XHRcdGVsc2UgdGhpcy5yZXF1aXJlZExpc3QucHVzaChyZWYuc2FmZU5hbWUpO1xuXHRcdH1cblxuXHRcdHJldHVybihyZWYpO1xuXHR9XG5cblx0Z2V0U3Vic3RpdHV0ZXMoKSB7XG5cdFx0cmV0dXJuKHRoaXMuc3Vic3RpdHV0ZUxpc3QpO1xuXHR9XG5cblx0ZGVmaW5lTWVtYmVycygpIHtcblx0XHR2YXIgc3BlYzogUmF3UmVmU3BlYztcblxuXHRcdGZvcihzcGVjIG9mIHRoaXMuY2hpbGRTcGVjTGlzdCkge1xuXHRcdFx0dmFyIG1lbWJlclJlZiA9IG5ldyBNZW1iZXJSZWYoc3BlYywgdGhpcy5uYW1lc3BhY2UpO1xuXHRcdFx0dGhpcy5hZGRDaGlsZChtZW1iZXJSZWYpO1xuXHRcdFx0dGhpcy5kZWZpbmVNZW1iZXIobWVtYmVyUmVmKTtcblx0XHR9XG5cblx0XHRmb3Ioc3BlYyBvZiB0aGlzLmF0dHJpYnV0ZVNwZWNMaXN0KSB7XG5cdFx0XHR2YXIgYXR0cmlidXRlUmVmID0gbmV3IE1lbWJlclJlZihzcGVjLCB0aGlzLm5hbWVzcGFjZSk7XG5cdFx0XHRpZihhdHRyaWJ1dGVSZWYubWVtYmVyLnR5cGVTcGVjKSB0aGlzLnR5cGUuYWRkQXR0cmlidXRlKGF0dHJpYnV0ZVJlZik7XG5cdFx0XHR0aGlzLmRlZmluZU1lbWJlcihhdHRyaWJ1dGVSZWYpO1xuXHRcdH1cblx0fVxuXG5cdGFkZFN1YnN0aXR1dGVzKGhlYWRSZWY6IE1lbWJlclJlZiwgcHJveHk6IE1lbWJlclJlZikge1xuXHRcdGhlYWRSZWYubWVtYmVyLmNvbnRhaW5pbmdUeXBlTGlzdC5wdXNoKHtcblx0XHRcdHR5cGU6IHRoaXMsXG5cdFx0XHRoZWFkOiBoZWFkUmVmLFxuXHRcdFx0cHJveHk6IHByb3h5XG5cdFx0fSk7XG5cdFx0aGVhZFJlZi5tZW1iZXIucHJveHlTcGVjLml0ZW0uZGVmaW5lKCk7XG5cblx0XHRmb3IodmFyIHN1YnN0aXR1dGUgb2YgaGVhZFJlZi5tZW1iZXIucHJveHlTcGVjLmdldFN1YnN0aXR1dGVzKCkpIHtcblx0XHRcdGlmKHN1YnN0aXR1dGUgPT0gaGVhZFJlZi5tZW1iZXIpIHtcblx0XHRcdFx0dGhpcy50eXBlLmFkZENoaWxkKGhlYWRSZWYpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0dmFyIHN1YnN0aXR1dGVSZWYgPSBkZWZpbmVTdWJzdGl0dXRlKHN1YnN0aXR1dGUsIHByb3h5KTtcblx0XHRcdFx0dGhpcy5hZGRDaGlsZChzdWJzdGl0dXRlUmVmLCBwcm94eSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0YWRkQ2hpbGQobWVtYmVyUmVmOiBNZW1iZXJSZWYsIHByb3h5PzogTWVtYmVyUmVmKSB7XG5cdFx0aWYobWVtYmVyUmVmLm1lbWJlci5wcm94eVNwZWMpIHRoaXMuYWRkU3Vic3RpdHV0ZXMobWVtYmVyUmVmLCBwcm94eSB8fCBtZW1iZXJSZWYpO1xuXHRcdGVsc2UgaWYoIW1lbWJlclJlZi5tZW1iZXIuaXNBYnN0cmFjdCkgdGhpcy50eXBlLmFkZENoaWxkKG1lbWJlclJlZik7XG5cdH1cblxuXHRhZGRTdWJzdGl0dXRlKGhlYWQ6IE1lbWJlclNwZWMsIHN1YnN0aXR1dGU6IE1lbWJlclNwZWMpIHtcblx0XHRpZih0aGlzLml0ZW0uZGVmaW5lZCAmJiBoZWFkLmNvbnRhaW5pbmdUeXBlTGlzdC5sZW5ndGgpIHtcblx0XHRcdC8vIFRoZSBlbGVtZW50J3MgcHJveHkgdHlwZSBoYXMgYWxyZWFkeSBiZWVuIGRlZmluZWRcblx0XHRcdC8vIHNvIHdlIG5lZWQgdG8gcGF0Y2ggb3RoZXIgdHlwZXMgY29udGFpbmluZyB0aGUgZWxlbWVudC5cblxuXHRcdFx0Zm9yKHZhciBzcGVjIG9mIGhlYWQuY29udGFpbmluZ1R5cGVMaXN0KSB7XG5cdFx0XHRcdHZhciByZWYgPSBkZWZpbmVTdWJzdGl0dXRlKHN1YnN0aXR1dGUsIHNwZWMucHJveHkpO1xuXHRcdFx0XHRzcGVjLnR5cGUuYWRkQ2hpbGQocmVmLCBzcGVjLnByb3h5KTtcblxuXHRcdFx0XHRpZihzcGVjLmhlYWQubWF4IDw9IDEpIHtcblx0XHRcdFx0XHRUeXBlU3BlYy5hZGRTdWJzdGl0dXRlVG9Qcm94eShzdWJzdGl0dXRlLCBzcGVjLnR5cGUucHJvdG8ucHJvdG90eXBlKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHQvLyBBZGQgdGhlIHN1YnN0aXR1dGlvbiB0byBwcm94eSB0eXBlIG9mIHRoZSBncm91cCBoZWFkLFxuXHRcdFx0Ly8gYW5kIGxvb3AgaWYgdGhlIGhlYWQgZnVydGhlciBzdWJzdGl0dXRlcyBzb21ldGhpbmcgZWxzZS5cblxuXHRcdFx0d2hpbGUoaGVhZCkge1xuXHRcdFx0XHRUeXBlU3BlYy5hZGRTdWJzdGl0dXRlVG9Qcm94eShzdWJzdGl0dXRlLCBoZWFkLnByb3h5U3BlYy5wcm90by5wcm90b3R5cGUpO1xuXHRcdFx0XHRoZWFkID0gaGVhZC5pdGVtLnBhcmVudDtcblx0XHRcdH1cblx0XHR9XG5cblx0XHR0aGlzLnN1YnN0aXR1dGVMaXN0LnB1c2goc3Vic3RpdHV0ZSk7XG5cdH1cblxuXHQvKiogUmVtb3ZlIHBsYWNlaG9sZGVycyBmcm9tIGluc3RhbmNlIHByb3RvdHlwZS4gVGhleSBhbGxvdyBkZXJlZmVyZW5jaW5nXG5cdCAgKiBjb250ZW50cyBvZiBtaXNzaW5nIG9wdGlvbmFsIGNoaWxkIGVsZW1lbnRzIHdpdGhvdXQgdGhyb3dpbmcgZXJyb3JzLlxuXHQgICogQHBhcmFtIHN0cmljdCBBbHNvIHJlbW92ZSBwbGFjZWhvbGRlcnMgZm9yIG1hbmRhdG9yeSBjaGlsZCBlbGVtZW50cy4gKi9cblxuXHRjbGVhblBsYWNlaG9sZGVycyhzdHJpY3Q/OiBib29sZWFuKSB7XG5cdFx0dmFyIHR5cGUgPSAodGhpcy5wcm90by5wcm90b3R5cGUpIGFzIFR5cGVDbGFzc01lbWJlcnM7XG5cdFx0dmFyIG5hbWVMaXN0ID0gdGhpcy5vcHRpb25hbExpc3Q7XG5cblx0XHRpZihzdHJpY3QpIG5hbWVMaXN0ID0gbmFtZUxpc3QuY29uY2F0KHRoaXMucmVxdWlyZWRMaXN0KTtcblxuXHRcdGZvcih2YXIgbmFtZSBvZiBuYW1lTGlzdCkge1xuXHRcdFx0ZGVsZXRlKHR5cGVbbmFtZV0pO1xuXHRcdH1cblx0fVxuXG5cdHByaXZhdGUgc3RhdGljIGFkZFN1YnN0aXR1dGVUb1Byb3h5KHN1YnN0aXR1dGU6IE1lbWJlclNwZWMsIHR5cGU6IFR5cGVDbGFzc01lbWJlcnMsIGhlYWQ/OiBNZW1iZXJTcGVjKSB7XG5cdFx0aWYoc3Vic3RpdHV0ZSA9PSBoZWFkIHx8ICFzdWJzdGl0dXRlLnByb3h5U3BlYykge1xuXHRcdFx0aWYoIXN1YnN0aXR1dGUuaXNBYnN0cmFjdCkgdHlwZVtzdWJzdGl0dXRlLnNhZmVOYW1lXSA9IHN1YnN0aXR1dGUudHlwZVNwZWMucGxhY2VIb2xkZXI7XG5cdFx0fSBlbHNlIHtcblx0XHRcdFR5cGVTcGVjLmFkZFN1YnN0aXR1dGVzVG9Qcm94eShzdWJzdGl0dXRlLCB0eXBlKTtcblx0XHR9XG5cdH1cblxuXHRwcml2YXRlIHN0YXRpYyBhZGRTdWJzdGl0dXRlc1RvUHJveHkobWVtYmVyOiBNZW1iZXJTcGVjLCB0eXBlOiBUeXBlQ2xhc3NNZW1iZXJzKSB7XG5cdFx0Zm9yKHZhciBzdWJzdGl0dXRlIG9mIG1lbWJlci5wcm94eVNwZWMuZ2V0U3Vic3RpdHV0ZXMoKSkge1xuXHRcdFx0VHlwZVNwZWMuYWRkU3Vic3RpdHV0ZVRvUHJveHkoc3Vic3RpdHV0ZSwgdHlwZSwgbWVtYmVyKTtcblx0XHR9XG5cdH1cblxuXHRpdGVtOiBJdGVtQmFzZTxUeXBlU3BlYz47XG5cblx0bmFtZXNwYWNlOiBOYW1lc3BhY2U7XG5cdC8vIFRPRE86IElzIGEgc2VwYXJhdGUgbmFtZSBhbmQgc2FmZU5hbWUgbmVlZGVkIGZvciBhbnl0aGluZyBoZXJlP1xuXHQvLyBNYXliZSBmb3IgZnV0dXJlIHVzZSB3aGVuIGN4c2QgY2FuIGltcG9ydCBwYXJzZWQgbmFtZXNwYWNlcz9cblx0bmFtZTogc3RyaW5nO1xuXHRzYWZlTmFtZTogc3RyaW5nO1xuXHRmbGFnczogbnVtYmVyO1xuXG5cdGNoaWxkU3BlY0xpc3Q6IFJhd1JlZlNwZWNbXTtcblx0YXR0cmlidXRlU3BlY0xpc3Q6IFJhd1JlZlNwZWNbXTtcblx0c3Vic3RpdHV0ZUxpc3Q6IE1lbWJlclNwZWNbXTtcblxuXHRvcHRpb25hbExpc3Q6IHN0cmluZ1tdID0gW107XG5cdHJlcXVpcmVkTGlzdDogc3RyaW5nW10gPSBbXTtcblxuXHRwcml2YXRlIHR5cGU6IFR5cGU7XG5cdHByaXZhdGUgcHJvdG86IFR5cGVDbGFzcztcblx0cHJpdmF0ZSBwbGFjZUhvbGRlcjogVHlwZUluc3RhbmNlO1xuXG5cdC8qKiBUeXBlIGNvbnRhaW5zIHRleHQgdGhhdCBnZXRzIHBhcnNlZCB0byBKYXZhU2NyaXB0IHByaW1pdGl2ZXMuICovXG5cdHN0YXRpYyBwcmltaXRpdmVGbGFnID0gMTtcblx0LyoqIFR5cGUgb25seSBjb250YWlucyB0ZXh0LCBubyB3cmFwcGVyIG9iamVjdCBpcyBuZWVkZWQgdG8gaG9sZCBpdHMgYXR0cmlidXRlcy4gKi9cblx0c3RhdGljIHBsYWluUHJpbWl0aXZlRmxhZyA9IDI7XG5cdC8qKiBUeXBlIGNvbnRhaW5zIHRleHQgd2l0aCBhIGxpc3Qgb2Ygd2hpdGVzcGFjZS1zZXBhcmF0ZWQgaXRlbXMuICovXG5cdHN0YXRpYyBsaXN0RmxhZyA9IDQ7XG59XG4iXX0=