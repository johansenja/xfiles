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
exports.Context = void 0;
var ContextBase_1 = require("./ContextBase");
var Namespace_1 = require("./Namespace");
var TypeSpec_1 = require("./TypeSpec");
var Member_1 = require("./Member");
/** Create types and members based on JSON specifications. */
function defineSpecs(pendingList) {
    for (var _i = 0, pendingList_1 = pendingList; _i < pendingList_1.length; _i++) {
        var spec = pendingList_1[_i];
        // If the spec has a parent, it handles defining the child.
        if (!spec.item.parent || spec.item.parent == spec) {
            spec.item.define();
        }
    }
}
/** XML parser context, holding definitions of all imported namespaces. */
var Context = /** @class */ (function (_super) {
    __extends(Context, _super);
    function Context() {
        var _this = _super.call(this, Namespace_1.Namespace) || this;
        /** List of pending namespaces (not yet registered or waiting for processing). */
        _this.pendingNamespaceList = [];
        /** Grows with pendingNamespaceList and shrinks when namespaces are registered.
          * When zero, all pending namespaces have been registered and can be processed. */
        _this.pendingNamespaceCount = 0;
        _this.pendingTypeList = [];
        _this.pendingMemberList = [];
        _this.typeList = [];
        return _this;
    }
    /** Mark a namespace as seen and add it to list of pending namespaces. */
    Context.prototype.markNamespace = function (exportObj) {
        this.pendingNamespaceList.push(exportObj);
        ++this.pendingNamespaceCount;
    };
    /** Parse types from schema in serialized JSON format. */
    Context.prototype.registerTypes = function (namespace, exportTypeNameList, rawTypeSpecList) {
        var exportTypeCount = exportTypeNameList.length;
        var typeCount = rawTypeSpecList.length;
        var typeName;
        for (var typeNum = 0; typeNum < typeCount; ++typeNum) {
            var rawSpec = rawTypeSpecList[typeNum];
            if (typeNum > 0 && typeNum <= exportTypeCount) {
                typeName = exportTypeNameList[typeNum - 1];
            }
            else
                typeName = null;
            var typeSpec = new TypeSpec_1.TypeSpec(rawSpec, namespace, typeName);
            namespace.addType(typeSpec);
            this.pendingTypeList.push(typeSpec);
            this.typeList.push(typeSpec);
        }
    };
    /** Parse members from schema in serialized JSON format. */
    Context.prototype.registerMembers = function (namespace, rawMemberSpecList) {
        for (var _i = 0, rawMemberSpecList_1 = rawMemberSpecList; _i < rawMemberSpecList_1.length; _i++) {
            var rawSpec = rawMemberSpecList_1[_i];
            var memberSpec = new Member_1.MemberSpec(rawSpec, namespace);
            namespace.addMember(memberSpec);
            this.pendingMemberList.push(memberSpec);
        }
    };
    /** Process namespaces seen so far. */
    Context.prototype.process = function () {
        // Start only when process has been called for all namespaces.
        if (--this.pendingNamespaceCount > 0)
            return;
        // Link types to their parents.
        for (var _i = 0, _a = this.pendingNamespaceList; _i < _a.length; _i++) {
            var exportObj = _a[_i];
            var namespace = exportObj._cxml[0];
            namespace.link();
        }
        // Create classes for all types.
        // This is effectively Kahn's algorithm for topological sort
        // (the rest is in the TypeSpec class).
        defineSpecs(this.pendingTypeList);
        defineSpecs(this.pendingMemberList);
        for (var _b = 0, _c = this.pendingTypeList; _b < _c.length; _b++) {
            var typeSpec = _c[_b];
            typeSpec.defineMembers();
        }
        this.pendingTypeList = [];
        this.pendingMemberList = [];
        for (var _d = 0, _e = this.pendingNamespaceList; _d < _e.length; _d++) {
            var exportObject = _e[_d];
            var namespace = exportObject._cxml[0];
            namespace.exportTypes(exportObject);
            namespace.exportDocument(exportObject);
        }
        this.pendingNamespaceList = [];
    };
    /** Remove temporary structures needed to define new handlers. */
    Context.prototype.cleanPlaceholders = function (strict) {
        for (var _i = 0, _a = this.namespaceList; _i < _a.length; _i++) {
            var namespace = _a[_i];
            namespace.importSpecList = null;
            namespace.exportTypeNameList = null;
            namespace.typeSpecList = null;
            namespace.memberSpecList = null;
            namespace.exportTypeTbl = null;
            namespace.exportMemberTbl = null;
        }
        for (var _b = 0, _c = this.typeList; _b < _c.length; _b++) {
            var typeSpec = _c[_b];
            typeSpec.cleanPlaceholders(strict);
        }
        this.typeList = null;
    };
    return Context;
}(ContextBase_1.ContextBase));
exports.Context = Context;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29udGV4dC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkNvbnRleHQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLCtEQUErRDtBQUMvRCwrQ0FBK0M7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUUvQyw2Q0FBMEM7QUFDMUMseUNBQXFEO0FBQ3JELHVDQUFpRDtBQUNqRCxtQ0FBbUQ7QUFHbkQsNkRBQTZEO0FBRTdELFNBQVMsV0FBVyxDQUFtQyxXQUFtQjtJQUN6RSxLQUFnQixVQUFXLEVBQVgsMkJBQVcsRUFBWCx5QkFBVyxFQUFYLElBQVcsRUFBRTtRQUF6QixJQUFJLElBQUksb0JBQUE7UUFDWCwyREFBMkQ7UUFDM0QsSUFBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksRUFBRTtZQUNqRCxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1NBQ25CO0tBQ0Q7QUFDRixDQUFDO0FBRUQsMEVBQTBFO0FBRTFFO0lBQTZCLDJCQUErQjtJQUMzRDtRQUFBLFlBQ0Msa0JBQU0scUJBQVMsQ0FBQyxTQUNoQjtRQTBHRCxpRkFBaUY7UUFDekUsMEJBQW9CLEdBQW9CLEVBQUUsQ0FBQztRQUNuRDsyRkFDbUY7UUFDM0UsMkJBQXFCLEdBQUcsQ0FBQyxDQUFDO1FBRTFCLHFCQUFlLEdBQWUsRUFBRSxDQUFDO1FBQ2pDLHVCQUFpQixHQUFpQixFQUFFLENBQUM7UUFFckMsY0FBUSxHQUFlLEVBQUUsQ0FBQzs7SUFuSGxDLENBQUM7SUFFRCx5RUFBeUU7SUFFekUsK0JBQWEsR0FBYixVQUFjLFNBQXdCO1FBQ3JDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDMUMsRUFBRSxJQUFJLENBQUMscUJBQXFCLENBQUM7SUFDOUIsQ0FBQztJQUVELHlEQUF5RDtJQUV6RCwrQkFBYSxHQUFiLFVBQ0MsU0FBb0IsRUFDcEIs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LEdBQUcsRUFBRSxDQUFDO0lBQ2hDLENBQUM7SUFFRCxpRUFBaUU7SUFFakUsbUNBQWlCLEdBQWpCLFVBQWtCLE1BQWdCO1FBQ2pDLEtBQXFCLFVBQWtCLEVBQWxCLEtBQUEsSUFBSSxDQUFDLGFBQWEsRUFBbEIsY0FBa0IsRUFBbEIsSUFBa0IsRUFBRTtZQUFyQyxJQUFJLFNBQVMsU0FBQTtZQUNoQixTQUFTLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQztZQUNoQyxTQUFTLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxDQUFDO1lBQ3BDLFNBQVMsQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO1lBQzlCLFNBQVMsQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDO1lBQ2hDLFNBQVMsQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDO1lBQy9CLFNBQVMsQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDO1NBQ2pDO1FBRUQsS0FBb0IsVUFBYSxFQUFiLEtBQUEsSUFBSSxDQUFDLFFBQVEsRUFBYixjQUFhLEVBQWIsSUFBYSxFQUFFO1lBQS9CLElBQUksUUFBUSxTQUFBO1lBQ2YsUUFBUSxDQUFDLGlCQUFpQixDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQ25DO1FBRUQsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7SUFDdEIsQ0FBQztJQVlGLGNBQUM7QUFBRCxDQUFDLEFBdkhELENBQTZCLHlCQUFXLEdBdUh2QztBQXZIWSwwQkFBTyIsInNvdXJjZXNDb250ZW50IjpbIi8vIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIGN4bWwsIGNvcHlyaWdodCAoYykgMjAxNiBCdXNGYXN0ZXIgTHRkLlxuLy8gUmVsZWFzZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlLCBzZWUgTElDRU5TRS5cblxuaW1wb3J0IHtDb250ZXh0QmFzZX0gZnJvbSAnLi9Db250ZXh0QmFzZSc7XG5pbXBvcnQge05hbWVzcGFjZSwgTW9kdWxlRXhwb3J0c30gZnJvbSAnLi9OYW1lc3BhY2UnO1xuaW1wb3J0IHtUeXBlU3BlYywgUmF3VHlwZVNwZWN9IGZyb20gJy4vVHlwZVNwZWMnO1xuaW1wb3J0IHtNZW1iZXJTcGVjLCBSYXdNZW1iZXJTcGVjfSBmcm9tICcuL01lbWJlcic7XG5pbXBvcnQge0l0ZW0sIEl0ZW1CYXNlfSBmcm9tICcuLi94bWwvSXRlbSc7XG5cbi8qKiBDcmVhdGUgdHlwZXMgYW5kIG1lbWJlcnMgYmFzZWQgb24gSlNPTiBzcGVjaWZpY2F0aW9ucy4gKi9cblxuZnVuY3Rpb24gZGVmaW5lU3BlY3M8U3BlYyBleHRlbmRzIEl0ZW08SXRlbUJhc2U8YW55Pj4+KHBlbmRpbmdMaXN0OiBTcGVjW10pIHtcblx0Zm9yKHZhciBzcGVjIG9mIHBlbmRpbmdMaXN0KSB7XG5cdFx0Ly8gSWYgdGhlIHNwZWMgaGFzIGEgcGFyZW50LCBpdCBoYW5kbGVzIGRlZmluaW5nIHRoZSBjaGlsZC5cblx0XHRpZighc3BlYy5pdGVtLnBhcmVudCB8fCBzcGVjLml0ZW0ucGFyZW50ID09IHNwZWMpIHtcblx0XHRcdHNwZWMuaXRlbS5kZWZpbmUoKTtcblx0XHR9XG5cdH1cbn1cblxuLyoqIFhNTCBwYXJzZXIgY29udGV4dCwgaG9sZGluZyBkZWZpbml0aW9ucyBvZiBhbGwgaW1wb3J0ZWQgbmFtZXNwYWNlcy4gKi9cblxuZXhwb3J0IGNsYXNzIENvbnRleHQgZXh0ZW5kcyBDb250ZXh0QmFzZTxDb250ZXh0LCBOYW1lc3BhY2U+IHtcblx0Y29uc3RydWN0b3IoKSB7XG5cdFx0c3VwZXIoTmFtZXNwYWNlKTtcblx0fVxuXG5cdC8qKiBNYXJrIGEgbmFtZXNwYWNlIGFzIHNlZW4gYW5kIGFkZCBpdCB0byBsaXN0IG9mIHBlbmRpbmcgbmFtZXNwYWNlcy4gKi9cblxuXHRtYXJrTmFtZXNwYWNlKGV4cG9ydE9iajogTW9kdWxlRXhwb3J0cykge1xuXHRcdHRoaXMucGVuZGluZ05hbWVzcGFjZUxpc3QucHVzaChleHBvcnRPYmopO1xuXHRcdCsrdGhpcy5wZW5kaW5nTmFtZXNwYWNlQ291bnQ7XG5cdH1cblxuXHQvKiogUGFyc2UgdHlwZXMgZnJvbSBzY2hlbWEgaW4gc2VyaWFsaXplZCBKU09OIGZvcm1hdC4gKi9cblxuXHRyZWdpc3RlclR5cGVzKFxuXHRcdG5hbWVzcGFjZTogTmFtZXNwYWNlLFxuXHRcdGV4cG9ydFR5cGVOYW1lTGlzdDogc3RyaW5nW10sXG5cdFx0cmF3VHlwZVNwZWNMaXN0OiBSYXdUeXBlU3BlY1tdXG5cdCkge1xuXHRcdHZhciBleHBvcnRUeXBlQ291bnQgPSBleHBvcnRUeXBlTmFtZUxpc3QubGVuZ3RoO1xuXHRcdHZhciB0eXBlQ291bnQgPSByYXdUeXBlU3BlY0xpc3QubGVuZ3RoO1xuXHRcdHZhciB0eXBlTmFtZTogc3RyaW5nO1xuXG5cdFx0Zm9yKHZhciB0eXBlTnVtID0gMDsgdHlwZU51bSA8IHR5cGVDb3VudDsgKyt0eXBlTnVtKSB7XG5cdFx0XHR2YXIgcmF3U3BlYyA9IHJhd1R5cGVTcGVjTGlzdFt0eXBlTnVtXTtcblxuXHRcdFx0aWYodHlwZU51bSA+IDAgJiYgdHlwZU51bSA8PSBleHBvcnRUeXBlQ291bnQpIHtcblx0XHRcdFx0dHlwZU5hbWUgPSBleHBvcnRUeXBlTmFtZUxpc3RbdHlwZU51bSAtIDFdO1xuXHRcdFx0fSBlbHNlIHR5cGVOYW1lID0gbnVsbDtcblxuXHRcdFx0dmFyIHR5cGVTcGVjID0gbmV3IFR5cGVTcGVjKHJhd1NwZWMsIG5hbWVzcGFjZSwgdHlwZU5hbWUpO1xuXG5cdFx0XHRuYW1lc3BhY2UuYWRkVHlwZSh0eXBlU3BlYyk7XG5cdFx0XHR0aGlzLnBlbmRpbmdUeXBlTGlzdC5wdXNoKHR5cGVTcGVjKTtcblx0XHRcdHRoaXMudHlwZUxpc3QucHVzaCh0eXBlU3BlYyk7XG5cdFx0fVxuXHR9XG5cblx0LyoqIFBhcnNlIG1lbWJlcnMgZnJvbSBzY2hlbWEgaW4gc2VyaWFsaXplZCBKU09OIGZvcm1hdC4gKi9cblxuXHRyZWdpc3Rlck1lbWJlcnMoXG5cdFx0bmFtZXNwYWNlOiBOYW1lc3BhY2UsXG5cdFx0cmF3TWVtYmVyU3BlY0xpc3Q6IFJhd01lbWJlclNwZWNbXVxuXHQpIHtcblx0XHRmb3IodmFyIHJhd1NwZWMgb2YgcmF3TWVtYmVyU3BlY0xpc3QpIHtcblx0XHRcdHZhciBtZW1iZXJTcGVjID0gbmV3IE1lbWJlclNwZWMocmF3U3BlYywgbmFtZXNwYWNlKTtcblxuXHRcdFx0bmFtZXNwYWNlLmFkZE1lbWJlcihtZW1iZXJTcGVjKTtcblx0XHRcdHRoaXMucGVuZGluZ01lbWJlckxpc3QucHVzaChtZW1iZXJTcGVjKTtcblx0XHR9XG5cdH1cblxuXHQvKiogUHJvY2VzcyBuYW1lc3BhY2VzIHNlZW4gc28gZmFyLiAqL1xuXG5cdHByb2Nlc3MoKSB7XG5cdFx0Ly8gU3RhcnQgb25seSB3aGVuIHByb2Nlc3MgaGFzIGJlZW4gY2FsbGVkIGZvciBhbGwgbmFtZXNwYWNlcy5cblxuXHRcdGlmKC0tdGhpcy5wZW5kaW5nTmFtZXNwYWNlQ291bnQgPiAwKSByZXR1cm47XG5cblx0XHQvLyBMaW5rIHR5cGVzIHRvIHRoZWlyIHBhcmVudHMuXG5cblx0XHRmb3IodmFyIGV4cG9ydE9iaiBvZiB0aGlzLnBlbmRpbmdOYW1lc3BhY2VMaXN0KSB7XG5cdFx0XHR2YXIgbmFtZXNwYWNlID0gZXhwb3J0T2JqLl9jeG1sWzBdO1xuXHRcdFx0bmFtZXNwYWNlLmxpbmsoKTtcblx0XHR9XG5cblx0XHQvLyBDcmVhdGUgY2xhc3NlcyBmb3IgYWxsIHR5cGVzLlxuXHRcdC8vIFRoaXMgaXMgZWZmZWN0aXZlbHkgS2FobidzIGFsZ29yaXRobSBmb3IgdG9wb2xvZ2ljYWwgc29ydFxuXHRcdC8vICh0aGUgcmVzdCBpcyBpbiB0aGUgVHlwZVNwZWMgY2xhc3MpLlxuXG5cdFx0ZGVmaW5lU3BlY3ModGhpcy5wZW5kaW5nVHlwZUxpc3QpO1xuXHRcdGRlZmluZVNwZWNzKHRoaXMucGVuZGluZ01lbWJlckxpc3QpO1xuXG5cdFx0Zm9yKHZhciB0eXBlU3BlYyBvZiB0aGlzLnBlbmRpbmdUeXBlTGlzdCkge1xuXHRcdFx0dHlwZVNwZWMuZGVmaW5lTWVtYmVycygpO1xuXHRcdH1cblxuXHRcdHRoaXMucGVuZGluZ1R5cGVMaXN0ID0gW107XG5cdFx0dGhpcy5wZW5kaW5nTWVtYmVyTGlzdCA9IFtdO1xuXG5cdFx0Zm9yKHZhciBleHBvcnRPYmplY3Qgb2YgdGhpcy5wZW5kaW5nTmFtZXNwYWNlTGlzdCkge1xuXHRcdFx0dmFyIG5hbWVzcGFjZSA9IGV4cG9ydE9iamVjdC5fY3htbFswXTtcblxuXHRcdFx0bmFtZXNwYWNlLmV4cG9ydFR5cGVzKGV4cG9ydE9iamVjdCk7XG5cdFx0XHRuYW1lc3BhY2UuZXhwb3J0RG9jdW1lbnQoZXhwb3J0T2JqZWN0KTtcblx0XHR9XG5cblx0XHR0aGlzLnBlbmRpbmdOYW1lc3BhY2VMaXN0ID0gW107XG5cdH1cblxuXHQvKiogUmVtb3ZlIHRlbXBvcmFyeSBzdHJ1Y3R1cmVzIG5lZWRlZCB0byBkZWZpbmUgbmV3IGhhbmRsZXJzLiAqL1xuXG5cdGNsZWFuUGxhY2Vob2xkZXJzKHN0cmljdD86IGJvb2xlYW4pIHtcblx0XHRmb3IodmFyIG5hbWVzcGFjZSBvZiB0aGlzLm5hbWVzcGFjZUxpc3QpIHtcblx0XHRcdG5hbWVzcGFjZS5pbXBvcnRTcGVjTGlzdCA9IG51bGw7XG5cdFx0XHRuYW1lc3BhY2UuZXhwb3J0VHlwZU5hbWVMaXN0ID0gbnVsbDtcblx0XHRcdG5hbWVzcGFjZS50eXBlU3BlY0xpc3QgPSBudWxsO1xuXHRcdFx0bmFtZXNwYWNlLm1lbWJlclNwZWNMaXN0ID0gbnVsbDtcblx0XHRcdG5hbWVzcGFjZS5leHBvcnRUeXBlVGJsID0gbnVsbDtcblx0XHRcdG5hbWVzcGFjZS5leHBvcnRNZW1iZXJUYmwgPSBudWxsO1xuXHRcdH1cblxuXHRcdGZvcih2YXIgdHlwZVNwZWMgb2YgdGhpcy50eXBlTGlzdCkge1xuXHRcdFx0dHlwZVNwZWMuY2xlYW5QbGFjZWhvbGRlcnMoc3RyaWN0KTtcblx0XHR9XG5cblx0XHR0aGlzLnR5cGVMaXN0ID0gbnVsbDtcblx0fVxuXG5cdC8qKiBMaXN0IG9mIHBlbmRpbmcgbmFtZXNwYWNlcyAobm90IHlldCByZWdpc3RlcmVkIG9yIHdhaXRpbmcgZm9yIHByb2Nlc3NpbmcpLiAqL1xuXHRwcml2YXRlIHBlbmRpbmdOYW1lc3BhY2VMaXN0OiBNb2R1bGVFeHBvcnRzW10gPSBbXTtcblx0LyoqIEdyb3dzIHdpdGggcGVuZGluZ05hbWVzcGFjZUxpc3QgYW5kIHNocmlua3Mgd2hlbiBuYW1lc3BhY2VzIGFyZSByZWdpc3RlcmVkLlxuXHQgICogV2hlbiB6ZXJvLCBhbGwgcGVuZGluZyBuYW1lc3BhY2VzIGhhdmUgYmVlbiByZWdpc3RlcmVkIGFuZCBjYW4gYmUgcHJvY2Vzc2VkLiAqL1xuXHRwcml2YXRlIHBlbmRpbmdOYW1lc3BhY2VDb3VudCA9IDA7XG5cblx0cHJpdmF0ZSBwZW5kaW5nVHlwZUxpc3Q6IFR5cGVTcGVjW10gPSBbXTtcblx0cHJpdmF0ZSBwZW5kaW5nTWVtYmVyTGlzdDogTWVtYmVyU3BlY1tdID0gW107XG5cblx0cHJpdmF0ZSB0eXBlTGlzdDogVHlwZVNwZWNbXSA9IFtdO1xufVxuIl19