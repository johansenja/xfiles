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
exports.Sanitize = void 0;
var Transform_1 = require("./Transform");
function capitalize(match, initial) {
    return (initial.toUpperCase());
}
function sanitizeName(name) {
    var reserved = {
        'constructor': true
    };
    name = name
        .replace(/-([a-z])/, capitalize)
        .replace(/[^_0-9A-Za-z]/g, '')
        .replace(/^[^A-Za-z]+/, '');
    if (reserved.hasOwnProperty(name))
        name = '_' + name;
    return (name);
}
var Sanitize = /** @class */ (function (_super) {
    __extends(Sanitize, _super);
    function Sanitize() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            pendingAnonTbl: {},
            pendingAnonList: [],
            typeListList: []
        };
        _this.construct = Sanitize;
        return _this;
    }
    Sanitize.prototype.prepare = function () {
        var memberList = this.namespace.memberList.filter(function (member) { return !!member; });
        for (var _i = 0, memberList_1 = memberList; _i < memberList_1.length; _i++) {
            var member = memberList_1[_i];
            if ((member.isSubstituted || member.isAbstract)) {
                member.getProxy().containingRef.safeName = sanitizeName(member.name);
            }
            if (member.substitutes) {
                member.safeName = sanitizeName(member.name);
            }
        }
        var typeList = this.namespace.typeList.filter(function (type) { return !!type; });
        this.visitType(this.doc);
        for (var _a = 0, typeList_1 = typeList; _a < typeList_1.length; _a++) {
            var type = typeList_1[_a];
            this.visitType(type);
        }
        this.state.typeListList.push(typeList);
    };
    Sanitize.prototype.renameDuplicates = function (typeList) {
        // TODO: handle collisions between names of types and members of doc.
        // Sort types by sanitized name and duplicates by original name
        // (missing original names sorted after existing original names).
        // TODO: merge types with identical contents.
        typeList = typeList.sort(function (a, b) {
            return a.safeName.localeCompare(b.safeName) ||
                +!!b.name - +!!a.name ||
                (a.name && a.name.localeCompare(b.name));
        });
        // Add numeric suffix to duplicate names.
        var name = '';
        var suffix = 2;
        for (var _i = 0, typeList_2 = typeList; _i < typeList_2.length; _i++) {
            var type = typeList_2[_i];
            if (type.safeName == name) {
                type.safeName += '_' + (suffix++);
            }
            else {
                name = type.safeName;
                suffix = 2;
            }
        }
    };
    Sanitize.prototype.finish = function () {
        for (var _i = 0, _a = Object.keys(this.state.pendingAnonTbl); _i < _a.length; _i++) {
            var key = _a[_i];
            var spec = this.state.pendingAnonTbl[key];
            if (spec) {
                for (var _b = 0, _c = spec.memberTypeList; _b < _c.length; _b++) {
                    var memberType = _c[_b];
                    if (memberType.containingType.safeName)
                        this.addNameToType(memberType);
                }
            }
        }
        for (var _d = 0, _e = this.state.pendingAnonList; _d < _e.length; _d++) {
            var type = _e[_d];
            if (!type.safeName)
                type.safeName = 'Type';
        }
        for (var _f = 0, _g = this.state.typeListList; _f < _g.length; _f++) {
            var typeList = _g[_f];
            this.renameDuplicates(typeList);
        }
    };
    Sanitize.prototype.visitType = function (type) {
        var refList = [];
        var ref;
        var member;
        var other;
        var otherMember;
        var iter;
        if (type.name)
            type.safeName = sanitizeName(type.name);
        else
            this.state.pendingAnonList.push(type);
        for (var _i = 0, _a = type.attributeList; _i < _a.length; _i++) {
            ref = _a[_i];
            // Add a $ prefix to attributes of this type
            // conflicting with children of this or parent types.
            other = type;
            iter = 100;
            while (other && --iter) {
                otherMember = other.childTbl[ref.member.name];
                if (otherMember) {
                    ref.prefix = '$';
                    break;
                }
                other = other.parent;
            }
            refList.push(ref);
        }
        for (var _b = 0, _c = type.childList; _b < _c.length; _b++) {
            ref = _c[_b];
            // Add a $ prefix to attributes of parent types
            // conflicting with children of this type.
            other = type;
            iter = 100;
            member = ref.member;
            while ((other = other.parent) && --iter) {
                otherMember = other.attributeTbl[member.name];
                if (otherMember && !otherMember.prefix) {
                    otherMember.prefix = '$';
                    if (otherMember.safeName)
                        otherMember.safeName = otherMember.prefix + otherMember.safeName;
                }
            }
            // Ensure maximum allowed occurrence count is no less than in parent types,
            // because overriding a parent class member with a different type
            // (array vs non-array) doesn't compile.
            if (ref.max < 2) {
                other = type;
                iter = 100;
                // TODO: Topologically sort dependencies to start processing from root types,
                // to avoid continuing search after one parent with a matching member is found.
                while ((other = other.parent) && --iter) {
                    otherMember = other.childTbl[member.name];
                    if (otherMember && otherMember.max > ref.max) {
                        ref.max = otherMember.max;
                        if (ref.max > 1)
                            break;
                    }
                }
            }
            if (ref.max <= 1 && !type.isProxy && (member.isSubstituted || member.isAbstract)) {
                var proxy = member.getProxy();
                type.addMixin(proxy);
                // TODO: Remove following line!
                ref.isHidden = true;
            }
            refList.push(ref);
        }
        // Add names to any unnamed types of members, based on the member name.
        for (var _d = 0, refList_1 = refList; _d < refList_1.length; _d++) {
            var ref = refList_1[_d];
            // TODO: Detect duplicate names from other namespaces and prefix them.
            var safeName = ref.member.safeName;
            if (!safeName) {
                if (ref.member.name == '*')
                    safeName = '*';
                else
                    safeName = sanitizeName(ref.member.name);
                ref.member.safeName = safeName;
            }
            if (safeName == '*')
                ref.safeName = safeName;
            else
                ref.safeName = (ref.prefix || '') + safeName;
            this.addNameToMemberTypes(type, ref.member);
            var proxy = ref.member.proxy;
            if (proxy && !proxy.sanitized) {
                proxy.sanitized = true;
                this.visitType(proxy);
            }
        }
    };
    Sanitize.prototype.addNameToType = function (type) {
        var containingType = type.containingType;
        var containingRef = type.containingRef;
        var spec;
        if (containingType && !containingType.safeName) {
            // Type is inside another which is not named (yet) so try again later.
            spec = this.state.pendingAnonTbl[memberType.containingType.surrogateKey];
            if (!spec) {
                spec = { type: memberType.containingType, memberTypeList: [] };
                this.state.pendingAnonTbl[memberType.containingType.surrogateKey] = spec;
            }
            spec.memberTypeList.push(memberType);
        }
        else if (containingType || (containingRef && containingRef.safeName)) {
            // Type is inside a named type or referenced by a named member.
            // Give it a name based on those.
            if (containingRef) {
                type.namespace = containingRef.member.namespace;
                type.safeName = [
                    containingType ? containingType.safeName : '',
                    (containingRef.safeName || '').replace(/^([a-z])/, capitalize),
                    type.isProxy ? 'Proxy' : '',
                    'Type'
                ].join('');
            }
            spec = this.state.pendingAnonTbl[type.surrogateKey];
            if (spec) {
                for (var _i = 0, _a = spec.memberTypeList; _i < _a.length; _i++) {
                    var memberType = _a[_i];
                    this.addNameToType(memberType);
                }
                this.state.pendingAnonTbl[type.surrogateKey] = null;
            }
        }
    };
    Sanitize.prototype.addNameToMemberTypes = function (type, member) {
        if (member.proxy && !member.proxy.safeName && member.namespace == this.namespace) {
            this.addNameToType(member.proxy);
        }
        for (var _i = 0, _a = member.typeList; _i < _a.length; _i++) {
            var memberType = _a[_i];
            if (!memberType.safeName && memberType.namespace == this.namespace) {
                this.addNameToType(memberType);
            }
        }
    };
    return Sanitize;
}(Transform_1.Transform));
exports.Sanitize = Sanitize;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2FuaXRpemUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wYXJzZXJfc2NhZmZvbGRfZ2VuZXJhdG9yL3NyYy9zY2hlbWEvdHJhbnNmb3JtL1Nhbml0aXplLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSwrREFBK0Q7QUFDL0QsK0NBQStDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFLL0MseUNBQXNDO0FBYXRDLFNBQVMsVUFBVSxDQUFDLEtBQWEsRUFBRSxPQUFlO0lBQ2pELE9BQU0sQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQztBQUMvQixDQUFDO0FBRUQsU0FBUyxZQUFZLENBQUMsSUFBWTtJQUNqQyxJQUFJLFFBQVEsR0FBRztRQUNkLGFBQWEsRUFBRSxJQUFJO0tBQ25CLENBQUM7SUFFRixJQUFJLEdBQUcsSUFBSTtTQUNULE9BQU8sQ0FBQyxVQUFVLEVBQUUsVUFBVSxDQUFDO1NBQy9CLE9BQU8sQ0FBQyxnQkFBZ0IsRUFBRSxFQUFFLENBQUM7U0FDN0IsT0FBTyxDQUFDLGFBQWEsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUU3QixJQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDO1FBQUUsSUFBSSxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUM7SUFFcEQsT0FBTSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ2QsQ0FBQztBQUVEO0lBQThCLDRCQUFnQztJQUE5RDtRQUFBLHFFQWtQQztRQVBVLFdBQUssR0FBVTtZQUN4QixjQUFjLEVBQUUsRUFBRTtZQUNsQixlQUFlLEVBQUUsRUFBRTtZQUNuQixZQUFZLEVBQUUsRUFBRTtTQUNoQixDQUFDO1FBRUYsZUFBUyxHQUFHLFFBQVEsQ0FBQzs7SUFDdEIsQ0FBQztJQWpQQSwwQkFBTyxHQUFQO1FBQ0MsSUFBSSxVQUFVLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLFVBQUMsTUFBYyxJQUFLLE9BQUEsQ0FB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QixJQUFVLEVBQUUsTUFBYztRQUM5QyxJQUFHLE1BQU0sQ0FBQyxLQUFLLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLFFBQVEsSUFBSSxNQUFNLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUU7WUFDaEYsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDakM7UUFDRCxLQUFzQixVQUFlLEVBQWYsS0FBQSxNQUFNLENBQUMsUUFBUSxFQUFmLGNBQWUsRUFBZixJQUFlLEVBQUU7WUFBbkMsSUFBSSxVQUFVLFNBQUE7WUFDakIsSUFBRyxDQUFDLFVBQVUsQ0FBQyxRQUFRLElBQUksVUFBVSxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFO2dCQUNsRSxJQUFJLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxDQUFDO2FBQy9CO1NBQ0Q7SUFDRixDQUFDO0lBU0YsZUFBQztBQUFELENBQUMsQUFsUEQsQ0FBOEIscUJBQVMsR0FrUHRDO0FBbFBZLDRCQUFRIiwic291cmNlc0NvbnRlbnQiOlsiLy8gVGhpcyBmaWxlIGlzIHBhcnQgb2YgY3hzZCwgY29weXJpZ2h0IChjKSAyMDE2IEJ1c0Zhc3RlciBMdGQuXG4vLyBSZWxlYXNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UsIHNlZSBMSUNFTlNFLlxuXG5pbXBvcnQge1R5cGV9IGZyb20gJy4uL1R5cGUnO1xuaW1wb3J0IHtNZW1iZXJ9IGZyb20gJy4uL01lbWJlcic7XG5pbXBvcnQge01lbWJlclJlZn0gZnJvbSAnLi4vTWVtYmVyUmVmJztcbmltcG9ydCB7VHJhbnNmb3JtfSBmcm9tICcuL1RyYW5zZm9ybSc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQW5vblR5cGUge1xuXHR0eXBlOiBUeXBlO1xuXHRtZW1iZXJUeXBlTGlzdDogVHlwZVtdO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFN0YXRlIHtcblx0cGVuZGluZ0Fub25UYmw6IHsgW3R5cGVJZDogc3RyaW5nXTogQW5vblR5cGUgfTtcblx0cGVuZGluZ0Fub25MaXN0OiBUeXBlW107XG5cdHR5cGVMaXN0TGlzdDogVHlwZVtdW107XG59XG5cbmZ1bmN0aW9uIGNhcGl0YWxpemUobWF0Y2g6IHN0cmluZywgaW5pdGlhbDogc3RyaW5nKSB7XG5cdHJldHVybihpbml0aWFsLnRvVXBwZXJDYXNlKCkpO1xufVxuXG5mdW5jdGlvbiBzYW5pdGl6ZU5hbWUobmFtZTogc3RyaW5nKSB7XG5cdHZhciByZXNlcnZlZCA9IHtcblx0XHQnY29uc3RydWN0b3InOiB0cnVlXG5cdH07XG5cblx0bmFtZSA9IG5hbWVcblx0XHQucmVwbGFjZSgvLShbYS16XSkvLCBjYXBpdGFsaXplKVxuXHRcdC5yZXBsYWNlKC9bXl8wLTlBLVphLXpdL2csICcnKVxuXHRcdC5yZXBsYWNlKC9eW15BLVphLXpdKy8sICcnKTtcblxuXHRpZihyZXNlcnZlZC5oYXNPd25Qcm9wZXJ0eShuYW1lKSkgbmFtZSA9ICdfJyArIG5hbWU7XG5cblx0cmV0dXJuKG5hbWUpO1xufVxuXG5leHBvcnQgY2xhc3MgU2FuaXRpemUgZXh0ZW5kcyBUcmFuc2Zvcm08U2FuaXRpemUsIHZvaWQsIFN0YXRlPiB7XG5cdHByZXBhcmUoKSB7XG5cdFx0dmFyIG1lbWJlckxpc3QgPSB0aGlzLm5hbWVzcGFjZS5tZW1iZXJMaXN0LmZpbHRlcigobWVtYmVyOiBNZW1iZXIpID0+ICEhbWVtYmVyKTtcblxuXHRcdGZvcih2YXIgbWVtYmVyIG9mIG1lbWJlckxpc3QpIHtcblx0XHRcdGlmKChtZW1iZXIuaXNTdWJzdGl0dXRlZCB8fCBtZW1iZXIuaXNBYnN0cmFjdCkpIHtcblx0XHRcdFx0bWVtYmVyLmdldFByb3h5KCkuY29udGFpbmluZ1JlZi5zYWZlTmFtZSA9IHNhbml0aXplTmFtZShtZW1iZXIubmFtZSk7XG5cdFx0XHR9XG5cblx0XHRcdGlmKG1lbWJlci5zdWJzdGl0dXRlcykge1xuXHRcdFx0XHRtZW1iZXIuc2FmZU5hbWUgPSBzYW5pdGl6ZU5hbWUobWVtYmVyLm5hbWUpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHZhciB0eXBlTGlzdCA9IHRoaXMubmFtZXNwYWNlLnR5cGVMaXN0LmZpbHRlcigodHlwZTogVHlwZSkgPT4gISF0eXBlKTtcblxuXHRcdHRoaXMudmlzaXRUeXBlKHRoaXMuZG9jKTtcblxuXHRcdGZvcih2YXIgdHlwZSBvZiB0eXBlTGlzdCkge1xuXHRcdFx0dGhpcy52aXNpdFR5cGUodHlwZSk7XG5cdFx0fVxuXG5cdFx0dGhpcy5zdGF0ZS50eXBlTGlzdExpc3QucHVzaCh0eXBlTGlzdCk7XG5cdH1cblxuXHRyZW5hbWVEdXBsaWNhdGVzKHR5cGVMaXN0OiBUeXBlW10pIHtcblx0XHQvLyBUT0RPOiBoYW5kbGUgY29sbGlzaW9ucyBiZXR3ZWVuIG5hbWVzIG9mIHR5cGVzIGFuZCBtZW1iZXJzIG9mIGRvYy5cblxuXHRcdC8vIFNvcnQgdHlwZXMgYnkgc2FuaXRpemVkIG5hbWUgYW5kIGR1cGxpY2F0ZXMgYnkgb3JpZ2luYWwgbmFtZVxuXHRcdC8vIChtaXNzaW5nIG9yaWdpbmFsIG5hbWVzIHNvcnRlZCBhZnRlciBleGlzdGluZyBvcmlnaW5hbCBuYW1lcykuXG5cblx0XHQvLyBUT0RPOiBtZXJnZSB0eXBlcyB3aXRoIGlkZW50aWNhbCBjb250ZW50cy5cblxuXHRcdHR5cGVMaXN0ID0gdHlwZUxpc3Quc29ydCgoYTogVHlwZSwgYjogVHlwZSkgPT5cblx0XHRcdGEuc2FmZU5hbWUubG9jYWxlQ29tcGFyZShiLnNhZmVOYW1lKSB8fFxuXHRcdFx0KyEhYi5uYW1lIC0gKyEhYS5uYW1lIHx8XG5cdFx0XHQoYS5uYW1lICYmIGEubmFtZS5sb2NhbGVDb21wYXJlKGIubmFtZSkpXG5cdFx0KTtcblxuXHRcdC8vIEFkZCBudW1lcmljIHN1ZmZpeCB0byBkdXBsaWNhdGUgbmFtZXMuXG5cblx0XHR2YXIgbmFtZSA9ICcnO1xuXHRcdHZhciBzdWZmaXggPSAyO1xuXG5cdFx0Zm9yKHZhciB0eXBlIG9mIHR5cGVMaXN0KSB7XG5cdFx0XHRpZih0eXBlLnNhZmVOYW1lID09IG5hbWUpIHtcblx0XHRcdFx0dHlwZS5zYWZlTmFtZSArPSAnXycgKyAoc3VmZml4KyspO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0bmFtZSA9IHR5cGUuc2FmZU5hbWU7XG5cdFx0XHRcdHN1ZmZpeCA9IDI7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0ZmluaXNoKCkge1xuXHRcdGZvcih2YXIga2V5IG9mIE9iamVjdC5rZXlzKHRoaXMuc3RhdGUucGVuZGluZ0Fub25UYmwpKSB7XG5cdFx0XHR2YXIgc3BlYyA9IHRoaXMuc3RhdGUucGVuZGluZ0Fub25UYmxba2V5XTtcblxuXHRcdFx0aWYoc3BlYykge1xuXHRcdFx0XHRmb3IodmFyIG1lbWJlclR5cGUgb2Ygc3BlYy5tZW1iZXJUeXBlTGlzdCkge1xuXHRcdFx0XHRcdGlmKG1lbWJlclR5cGUuY29udGFpbmluZ1R5cGUuc2FmZU5hbWUpIHRoaXMuYWRkTmFtZVRvVHlwZShtZW1iZXJUeXBlKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGZvcih2YXIgdHlwZSBvZiB0aGlzLnN0YXRlLnBlbmRpbmdBbm9uTGlzdCkge1xuXHRcdFx0aWYoIXR5cGUuc2FmZU5hbWUpIHR5cGUuc2FmZU5hbWUgPSAnVHlwZSc7XG5cdFx0fVxuXG5cdFx0Zm9yKHZhciB0eXBlTGlzdCBvZiB0aGlzLnN0YXRlLnR5cGVMaXN0TGlzdCkge1xuXHRcdFx0dGhpcy5yZW5hbWVEdXBsaWNhdGVzKHR5cGVMaXN0KTtcblx0XHR9XG5cdH1cblxuXHR2aXNpdFR5cGUodHlwZTogVHlwZSkge1xuXHRcdHZhciByZWZMaXN0OiBNZW1iZXJSZWZbXSA9IFtdO1xuXHRcdHZhciByZWY6IE1lbWJlclJlZjtcblx0XHR2YXIgbWVtYmVyOiBNZW1iZXI7XG5cdFx0dmFyIG90aGVyOiBUeXBlO1xuXHRcdHZhciBvdGhlck1lbWJlcjogTWVtYmVyUmVmO1xuXHRcdHZhciBpdGVyOiBudW1iZXI7XG5cblx0XHRpZih0eXBlLm5hbWUpIHR5cGUuc2FmZU5hbWUgPSBzYW5pdGl6ZU5hbWUodHlwZS5uYW1lKTtcblx0XHRlbHNlIHRoaXMuc3RhdGUucGVuZGluZ0Fub25MaXN0LnB1c2godHlwZSk7XG5cblx0XHRmb3IocmVmIG9mIHR5cGUuYXR0cmlidXRlTGlzdCkge1xuXHRcdFx0Ly8gQWRkIGEgJCBwcmVmaXggdG8gYXR0cmlidXRlcyBvZiB0aGlzIHR5cGVcblx0XHRcdC8vIGNvbmZsaWN0aW5nIHdpdGggY2hpbGRyZW4gb2YgdGhpcyBvciBwYXJlbnQgdHlwZXMuXG5cblx0XHRcdG90aGVyID0gdHlwZTtcblx0XHRcdGl0ZXIgPSAxMDA7XG5cblx0XHRcdHdoaWxlKG90aGVyICYmIC0taXRlcikge1xuXHRcdFx0XHRvdGhlck1lbWJlciA9IG90aGVyLmNoaWxkVGJsW3JlZi5tZW1iZXIubmFtZV07XG5cdFx0XHRcdGlmKG90aGVyTWVtYmVyKSB7XG5cdFx0XHRcdFx0cmVmLnByZWZpeCA9ICckJztcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0fVxuXG5cdFx0XHRcdG90aGVyID0gb3RoZXIucGFyZW50O1xuXHRcdFx0fVxuXG5cdFx0XHRyZWZMaXN0LnB1c2gocmVmKTtcblx0XHR9XG5cblx0XHRmb3IocmVmIG9mIHR5cGUuY2hpbGRMaXN0KSB7XG5cdFx0XHQvLyBBZGQgYSAkIHByZWZpeCB0byBhdHRyaWJ1dGVzIG9mIHBhcmVudCB0eXBlc1xuXHRcdFx0Ly8gY29uZmxpY3Rpbmcgd2l0aCBjaGlsZHJlbiBvZiB0aGlzIHR5cGUuXG5cblx0XHRcdG90aGVyID0gdHlwZTtcblx0XHRcdGl0ZXIgPSAxMDA7XG5cdFx0XHRtZW1iZXIgPSByZWYubWVtYmVyO1xuXG5cdFx0XHR3aGlsZSgob3RoZXIgPSBvdGhlci5wYXJlbnQpICYmIC0taXRlcikge1xuXHRcdFx0XHRvdGhlck1lbWJlciA9IG90aGVyLmF0dHJpYnV0ZVRibFttZW1iZXIubmFtZV07XG5cdFx0XHRcdGlmKG90aGVyTWVtYmVyICYmICFvdGhlck1lbWJlci5wcmVmaXgpIHtcblx0XHRcdFx0XHRvdGhlck1lbWJlci5wcmVmaXggPSAnJCc7XG5cdFx0XHRcdFx0aWYob3RoZXJNZW1iZXIuc2FmZU5hbWUpIG90aGVyTWVtYmVyLnNhZmVOYW1lID0gb3RoZXJNZW1iZXIucHJlZml4ICsgb3RoZXJNZW1iZXIuc2FmZU5hbWU7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0Ly8gRW5zdXJlIG1heGltdW0gYWxsb3dlZCBvY2N1cnJlbmNlIGNvdW50IGlzIG5vIGxlc3MgdGhhbiBpbiBwYXJlbnQgdHlwZXMsXG5cdFx0XHQvLyBiZWNhdXNlIG92ZXJyaWRpbmcgYSBwYXJlbnQgY2xhc3MgbWVtYmVyIHdpdGggYSBkaWZmZXJlbnQgdHlwZVxuXHRcdFx0Ly8gKGFycmF5IHZzIG5vbi1hcnJheSkgZG9lc24ndCBjb21waWxlLlxuXG5cdFx0XHRpZihyZWYubWF4IDwgMikge1xuXHRcdFx0XHRvdGhlciA9IHR5cGU7XG5cdFx0XHRcdGl0ZXIgPSAxMDA7XG5cblx0XHRcdFx0Ly8gVE9ETzogVG9wb2xvZ2ljYWxseSBzb3J0IGRlcGVuZGVuY2llcyB0byBzdGFydCBwcm9jZXNzaW5nIGZyb20gcm9vdCB0eXBlcyxcblx0XHRcdFx0Ly8gdG8gYXZvaWQgY29udGludWluZyBzZWFyY2ggYWZ0ZXIgb25lIHBhcmVudCB3aXRoIGEgbWF0Y2hpbmcgbWVtYmVyIGlzIGZvdW5kLlxuXG5cdFx0XHRcdHdoaWxlKChvdGhlciA9IG90aGVyLnBhcmVudCkgJiYgLS1pdGVyKSB7XG5cdFx0XHRcdFx0b3RoZXJNZW1iZXIgPSBvdGhlci5jaGlsZFRibFttZW1iZXIubmFtZV07XG5cdFx0XHRcdFx0aWYob3RoZXJNZW1iZXIgJiYgb3RoZXJNZW1iZXIubWF4ID4gcmVmLm1heCkge1xuXHRcdFx0XHRcdFx0cmVmLm1heCA9IG90aGVyTWVtYmVyLm1heDtcblx0XHRcdFx0XHRcdGlmKHJlZi5tYXggPiAxKSBicmVhaztcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0aWYocmVmLm1heCA8PSAxICYmICF0eXBlLmlzUHJveHkgJiYgKG1lbWJlci5pc1N1YnN0aXR1dGVkIHx8IG1lbWJlci5pc0Fic3RyYWN0KSkge1xuXHRcdFx0XHR2YXIgcHJveHkgPSBtZW1iZXIuZ2V0UHJveHkoKTtcblxuXHRcdFx0XHR0eXBlLmFkZE1peGluKHByb3h5KTtcblxuXHRcdFx0XHQvLyBUT0RPOiBSZW1vdmUgZm9sbG93aW5nIGxpbmUhXG5cdFx0XHRcdChyZWYgYXMgYW55KS5pc0hpZGRlbiA9IHRydWU7XG5cdFx0XHR9XG5cblx0XHRcdHJlZkxpc3QucHVzaChyZWYpO1xuXHRcdH1cblxuXHRcdC8vIEFkZCBuYW1lcyB0byBhbnkgdW5uYW1lZCB0eXBlcyBvZiBtZW1iZXJzLCBiYXNlZCBvbiB0aGUgbWVtYmVyIG5hbWUuXG5cblx0XHRmb3IodmFyIHJlZiBvZiByZWZMaXN0KSB7XG5cdFx0XHQvLyBUT0RPOiBEZXRlY3QgZHVwbGljYXRlIG5hbWVzIGZyb20gb3RoZXIgbmFtZXNwYWNlcyBhbmQgcHJlZml4IHRoZW0uXG5cblx0XHRcdHZhciBzYWZlTmFtZSA9IHJlZi5tZW1iZXIuc2FmZU5hbWU7XG5cblx0XHRcdGlmKCFzYWZlTmFtZSkge1xuXHRcdFx0XHRpZihyZWYubWVtYmVyLm5hbWUgPT0gJyonKSBzYWZlTmFtZSA9ICcqJztcblx0XHRcdFx0ZWxzZSBzYWZlTmFtZSA9IHNhbml0aXplTmFtZShyZWYubWVtYmVyLm5hbWUpO1xuXG5cdFx0XHRcdHJlZi5tZW1iZXIuc2FmZU5hbWUgPSBzYWZlTmFtZTtcblx0XHRcdH1cblxuXHRcdFx0aWYoc2FmZU5hbWUgPT0gJyonKSByZWYuc2FmZU5hbWUgPSBzYWZlTmFtZTtcblx0XHRcdGVsc2UgcmVmLnNhZmVOYW1lID0gKHJlZi5wcmVmaXggfHwgJycpICsgc2FmZU5hbWU7XG5cblx0XHRcdHRoaXMuYWRkTmFtZVRvTWVtYmVyVHlwZXModHlwZSwgcmVmLm1lbWJlcik7XG5cblx0XHRcdHZhciBwcm94eSA9IHJlZi5tZW1iZXIucHJveHk7XG5cblx0XHRcdGlmKHByb3h5ICYmICEocHJveHkgYXMgYW55KS5zYW5pdGl6ZWQpIHtcblx0XHRcdFx0KHByb3h5IGFzIGFueSkuc2FuaXRpemVkID0gdHJ1ZTtcblx0XHRcdFx0dGhpcy52aXNpdFR5cGUocHJveHkpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdGFkZE5hbWVUb1R5cGUodHlwZTogVHlwZSkge1xuXHRcdHZhciBjb250YWluaW5nVHlwZSA9IHR5cGUuY29udGFpbmluZ1R5cGU7XG5cdFx0dmFyIGNvbnRhaW5pbmdSZWYgPSB0eXBlLmNvbnRhaW5pbmdSZWY7XG5cdFx0dmFyIHNwZWM6IEFub25UeXBlO1xuXG5cdFx0aWYoY29udGFpbmluZ1R5cGUgJiYgIWNvbnRhaW5pbmdUeXBlLnNhZmVOYW1lKSB7XG5cdFx0XHQvLyBUeXBlIGlzIGluc2lkZSBhbm90aGVyIHdoaWNoIGlzIG5vdCBuYW1lZCAoeWV0KSBzbyB0cnkgYWdhaW4gbGF0ZXIuXG5cblx0XHRcdHNwZWMgPSB0aGlzLnN0YXRlLnBlbmRpbmdBbm9uVGJsW21lbWJlclR5cGUuY29udGFpbmluZ1R5cGUuc3Vycm9nYXRlS2V5XTtcblxuXHRcdFx0aWYoIXNwZWMpIHtcblx0XHRcdFx0c3BlYyA9IHsgdHlwZTogbWVtYmVyVHlwZS5jb250YWluaW5nVHlwZSwgbWVtYmVyVHlwZUxpc3Q6IFtdIH07XG5cdFx0XHRcdHRoaXMuc3RhdGUucGVuZGluZ0Fub25UYmxbbWVtYmVyVHlwZS5jb250YWluaW5nVHlwZS5zdXJyb2dhdGVLZXldID0gc3BlYztcblx0XHRcdH1cblxuXHRcdFx0c3BlYy5tZW1iZXJUeXBlTGlzdC5wdXNoKG1lbWJlclR5cGUpO1xuXHRcdH0gZWxzZSBpZihjb250YWluaW5nVHlwZSB8fCAoY29udGFpbmluZ1JlZiAmJiBjb250YWluaW5nUmVmLnNhZmVOYW1lKSkge1xuXHRcdFx0Ly8gVHlwZSBpcyBpbnNpZGUgYSBuYW1lZCB0eXBlIG9yIHJlZmVyZW5jZWQgYnkgYSBuYW1lZCBtZW1iZXIuXG5cdFx0XHQvLyBHaXZlIGl0IGEgbmFtZSBiYXNlZCBvbiB0aG9zZS5cblxuXHRcdFx0aWYoY29udGFpbmluZ1JlZikge1xuXHRcdFx0XHR0eXBlLm5hbWVzcGFjZSA9IGNvbnRhaW5pbmdSZWYubWVtYmVyLm5hbWVzcGFjZTtcblxuXHRcdFx0XHR0eXBlLnNhZmVOYW1lID0gW1xuXHRcdFx0XHRcdGNvbnRhaW5pbmdUeXBlID8gY29udGFpbmluZ1R5cGUuc2FmZU5hbWUgOiAnJyxcblx0XHRcdFx0XHQoY29udGFpbmluZ1JlZi5zYWZlTmFtZSB8fCAnJykucmVwbGFjZSgvXihbYS16XSkvLCBjYXBpdGFsaXplKSxcblx0XHRcdFx0XHR0eXBlLmlzUHJveHkgPyAnUHJveHknIDogJycsXG5cdFx0XHRcdFx0J1R5cGUnXG5cdFx0XHRcdF0uam9pbignJyk7XG5cdFx0XHR9XG5cblx0XHRcdHNwZWMgPSB0aGlzLnN0YXRlLnBlbmRpbmdBbm9uVGJsW3R5cGUuc3Vycm9nYXRlS2V5XTtcblxuXHRcdFx0aWYoc3BlYykge1xuXHRcdFx0XHRmb3IodmFyIG1lbWJlclR5cGUgb2Ygc3BlYy5tZW1iZXJUeXBlTGlzdCkge1xuXHRcdFx0XHRcdHRoaXMuYWRkTmFtZVRvVHlwZShtZW1iZXJUeXBlKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHRoaXMuc3RhdGUucGVuZGluZ0Fub25UYmxbdHlwZS5zdXJyb2dhdGVLZXldID0gbnVsbDtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRhZGROYW1lVG9NZW1iZXJUeXBlcyh0eXBlOiBUeXBlLCBtZW1iZXI6IE1lbWJlcikge1xuXHRcdGlmKG1lbWJlci5wcm94eSAmJiAhbWVtYmVyLnByb3h5LnNhZmVOYW1lICYmIG1lbWJlci5uYW1lc3BhY2UgPT0gdGhpcy5uYW1lc3BhY2UpIHtcblx0XHRcdHRoaXMuYWRkTmFtZVRvVHlwZShtZW1iZXIucHJveHkpO1xuXHRcdH1cblx0XHRmb3IodmFyIG1lbWJlclR5cGUgb2YgbWVtYmVyLnR5cGVMaXN0KSB7XG5cdFx0XHRpZighbWVtYmVyVHlwZS5zYWZlTmFtZSAmJiBtZW1iZXJUeXBlLm5hbWVzcGFjZSA9PSB0aGlzLm5hbWVzcGFjZSkge1xuXHRcdFx0XHR0aGlzLmFkZE5hbWVUb1R5cGUobWVtYmVyVHlwZSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0cHJvdGVjdGVkIHN0YXRlOiBTdGF0ZSA9IHtcblx0XHRwZW5kaW5nQW5vblRibDoge30sXG5cdFx0cGVuZGluZ0Fub25MaXN0OiBbXSxcblx0XHR0eXBlTGlzdExpc3Q6IFtdXG5cdH07XG5cblx0Y29uc3RydWN0ID0gU2FuaXRpemU7XG59XG4iXX0=