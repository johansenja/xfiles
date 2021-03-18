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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29udGV4dC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3J1bnRpbWVfcGFyc2VyL3NyYy94bWwvQ29udGV4dC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsK0RBQStEO0FBQy9ELCtDQUErQzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRS9DLDZDQUEwQztBQUMxQyx5Q0FBcUQ7QUFDckQsdUNBQWlEO0FBQ2pELG1DQUFtRDtBQUduRCw2REFBNkQ7QUFFN0QsU0FBUyxXQUFXLENBQW1DLFdBQW1CO0lBQ3pFLEtBQWdCLFVBQVcsRUFBWCwyQkFBVyxFQUFYLHlCQUFXLEVBQVgsSUFBVyxFQUFFO1FBQXpCLElBQUksSUFBSSxvQkFBQTtRQUNYLDJEQUEyRDtRQUMzRCxJQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLElBQUksSUFBSSxFQUFFO1lBQ2pELElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7U0FDbkI7S0FDRDtBQUNGLENBQUM7QUFFRCwwRUFBMEU7QUFFMUU7SUFBNkIsMkJBQStCO0lBQzNEO1FBQUEsWUFDQyxrQkFBTSxxQkFBUyxDQUFDLFNBQ2hCO1FBMEdELGlGQUFpRjtRQUN6RSwwQkFBb0IsR0FBb0IsRUFBRSxDQUFDO1FBQ25EOzJGQUNtRjtRQUMzRSwyQkFBcUIsR0FBRyxDQUFDLENBQUM7UUFFMUIscUJBQWUsR0FBZSxFQUFFLENBQUM7UUFDakMsdUJBQWlCLEdBQWlCLEVBQUUsQ0FBQztRQUVyQyxjQUFRLEdBQWUsRUFBRSxDQUFDOztJQW5IbEMsQ0FBQztJQUVELHlFQUF5RTtJQUV6RSwrQkFBYSxHQUFiLFVBQWMsU0FBd0I7UUFDckMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUMxQyxFQUFFLElBQUksQ0FBQyxxQkFBcUIsQ0FBQztJQUM5QixDQUFDO0lBRUQseURBQXlE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QUMsQ0FBQztTQUN2QztRQUVELElBQUksQ0FBQyxvQkFBb0IsR0FBRyxFQUFFLENBQUM7SUFDaEMsQ0FBQztJQUVELGlFQUFpRTtJQUVqRSxtQ0FBaUIsR0FBakIsVUFBa0IsTUFBZ0I7UUFDakMsS0FBcUIsVUFBa0IsRUFBbEIsS0FBQSxJQUFJLENBQUMsYUFBYSxFQUFsQixjQUFrQixFQUFsQixJQUFrQixFQUFFO1lBQXJDLElBQUksU0FBUyxTQUFBO1lBQ2hCLFNBQVMsQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDO1lBQ2hDLFNBQVMsQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLENBQUM7WUFDcEMsU0FBUyxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7WUFDOUIsU0FBUyxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUM7WUFDaEMsU0FBUyxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUM7WUFDL0IsU0FBUyxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUM7U0FDakM7UUFFRCxLQUFvQixVQUFhLEVBQWIsS0FBQSxJQUFJLENBQUMsUUFBUSxFQUFiLGNBQWEsRUFBYixJQUFhLEVBQUU7WUFBL0IsSUFBSSxRQUFRLFNBQUE7WUFDZixRQUFRLENBQUMsaUJBQWlCLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDbkM7UUFFRCxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztJQUN0QixDQUFDO0lBWUYsY0FBQztBQUFELENBQUMsQUF2SEQsQ0FBNkIseUJBQVcsR0F1SHZDO0FBdkhZLDBCQUFPIiwic291cmNlc0NvbnRlbnQiOlsiLy8gVGhpcyBmaWxlIGlzIHBhcnQgb2YgY3htbCwgY29weXJpZ2h0IChjKSAyMDE2IEJ1c0Zhc3RlciBMdGQuXG4vLyBSZWxlYXNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UsIHNlZSBMSUNFTlNFLlxuXG5pbXBvcnQge0NvbnRleHRCYXNlfSBmcm9tICcuL0NvbnRleHRCYXNlJztcbmltcG9ydCB7TmFtZXNwYWNlLCBNb2R1bGVFeHBvcnRzfSBmcm9tICcuL05hbWVzcGFjZSc7XG5pbXBvcnQge1R5cGVTcGVjLCBSYXdUeXBlU3BlY30gZnJvbSAnLi9UeXBlU3BlYyc7XG5pbXBvcnQge01lbWJlclNwZWMsIFJhd01lbWJlclNwZWN9IGZyb20gJy4vTWVtYmVyJztcbmltcG9ydCB7SXRlbSwgSXRlbUJhc2V9IGZyb20gJy4uL3htbC9JdGVtJztcblxuLyoqIENyZWF0ZSB0eXBlcyBhbmQgbWVtYmVycyBiYXNlZCBvbiBKU09OIHNwZWNpZmljYXRpb25zLiAqL1xuXG5mdW5jdGlvbiBkZWZpbmVTcGVjczxTcGVjIGV4dGVuZHMgSXRlbTxJdGVtQmFzZTxhbnk+Pj4ocGVuZGluZ0xpc3Q6IFNwZWNbXSkge1xuXHRmb3IodmFyIHNwZWMgb2YgcGVuZGluZ0xpc3QpIHtcblx0XHQvLyBJZiB0aGUgc3BlYyBoYXMgYSBwYXJlbnQsIGl0IGhhbmRsZXMgZGVmaW5pbmcgdGhlIGNoaWxkLlxuXHRcdGlmKCFzcGVjLml0ZW0ucGFyZW50IHx8IHNwZWMuaXRlbS5wYXJlbnQgPT0gc3BlYykge1xuXHRcdFx0c3BlYy5pdGVtLmRlZmluZSgpO1xuXHRcdH1cblx0fVxufVxuXG4vKiogWE1MIHBhcnNlciBjb250ZXh0LCBob2xkaW5nIGRlZmluaXRpb25zIG9mIGFsbCBpbXBvcnRlZCBuYW1lc3BhY2VzLiAqL1xuXG5leHBvcnQgY2xhc3MgQ29udGV4dCBleHRlbmRzIENvbnRleHRCYXNlPENvbnRleHQsIE5hbWVzcGFjZT4ge1xuXHRjb25zdHJ1Y3RvcigpIHtcblx0XHRzdXBlcihOYW1lc3BhY2UpO1xuXHR9XG5cblx0LyoqIE1hcmsgYSBuYW1lc3BhY2UgYXMgc2VlbiBhbmQgYWRkIGl0IHRvIGxpc3Qgb2YgcGVuZGluZyBuYW1lc3BhY2VzLiAqL1xuXG5cdG1hcmtOYW1lc3BhY2UoZXhwb3J0T2JqOiBNb2R1bGVFeHBvcnRzKSB7XG5cdFx0dGhpcy5wZW5kaW5nTmFtZXNwYWNlTGlzdC5wdXNoKGV4cG9ydE9iaik7XG5cdFx0Kyt0aGlzLnBlbmRpbmdOYW1lc3BhY2VDb3VudDtcblx0fVxuXG5cdC8qKiBQYXJzZSB0eXBlcyBmcm9tIHNjaGVtYSBpbiBzZXJpYWxpemVkIEpTT04gZm9ybWF0LiAqL1xuXG5cdHJlZ2lzdGVyVHlwZXMoXG5cdFx0bmFtZXNwYWNlOiBOYW1lc3BhY2UsXG5cdFx0ZXhwb3J0VHlwZU5hbWVMaXN0OiBzdHJpbmdbXSxcblx0XHRyYXdUeXBlU3BlY0xpc3Q6IFJhd1R5cGVTcGVjW11cblx0KSB7XG5cdFx0dmFyIGV4cG9ydFR5cGVDb3VudCA9IGV4cG9ydFR5cGVOYW1lTGlzdC5sZW5ndGg7XG5cdFx0dmFyIHR5cGVDb3VudCA9IHJhd1R5cGVTcGVjTGlzdC5sZW5ndGg7XG5cdFx0dmFyIHR5cGVOYW1lOiBzdHJpbmc7XG5cblx0XHRmb3IodmFyIHR5cGVOdW0gPSAwOyB0eXBlTnVtIDwgdHlwZUNvdW50OyArK3R5cGVOdW0pIHtcblx0XHRcdHZhciByYXdTcGVjID0gcmF3VHlwZVNwZWNMaXN0W3R5cGVOdW1dO1xuXG5cdFx0XHRpZih0eXBlTnVtID4gMCAmJiB0eXBlTnVtIDw9IGV4cG9ydFR5cGVDb3VudCkge1xuXHRcdFx0XHR0eXBlTmFtZSA9IGV4cG9ydFR5cGVOYW1lTGlzdFt0eXBlTnVtIC0gMV07XG5cdFx0XHR9IGVsc2UgdHlwZU5hbWUgPSBudWxsO1xuXG5cdFx0XHR2YXIgdHlwZVNwZWMgPSBuZXcgVHlwZVNwZWMocmF3U3BlYywgbmFtZXNwYWNlLCB0eXBlTmFtZSk7XG5cblx0XHRcdG5hbWVzcGFjZS5hZGRUeXBlKHR5cGVTcGVjKTtcblx0XHRcdHRoaXMucGVuZGluZ1R5cGVMaXN0LnB1c2godHlwZVNwZWMpO1xuXHRcdFx0dGhpcy50eXBlTGlzdC5wdXNoKHR5cGVTcGVjKTtcblx0XHR9XG5cdH1cblxuXHQvKiogUGFyc2UgbWVtYmVycyBmcm9tIHNjaGVtYSBpbiBzZXJpYWxpemVkIEpTT04gZm9ybWF0LiAqL1xuXG5cdHJlZ2lzdGVyTWVtYmVycyhcblx0XHRuYW1lc3BhY2U6IE5hbWVzcGFjZSxcblx0XHRyYXdNZW1iZXJTcGVjTGlzdDogUmF3TWVtYmVyU3BlY1tdXG5cdCkge1xuXHRcdGZvcih2YXIgcmF3U3BlYyBvZiByYXdNZW1iZXJTcGVjTGlzdCkge1xuXHRcdFx0dmFyIG1lbWJlclNwZWMgPSBuZXcgTWVtYmVyU3BlYyhyYXdTcGVjLCBuYW1lc3BhY2UpO1xuXG5cdFx0XHRuYW1lc3BhY2UuYWRkTWVtYmVyKG1lbWJlclNwZWMpO1xuXHRcdFx0dGhpcy5wZW5kaW5nTWVtYmVyTGlzdC5wdXNoKG1lbWJlclNwZWMpO1xuXHRcdH1cblx0fVxuXG5cdC8qKiBQcm9jZXNzIG5hbWVzcGFjZXMgc2VlbiBzbyBmYXIuICovXG5cblx0cHJvY2VzcygpIHtcblx0XHQvLyBTdGFydCBvbmx5IHdoZW4gcHJvY2VzcyBoYXMgYmVlbiBjYWxsZWQgZm9yIGFsbCBuYW1lc3BhY2VzLlxuXG5cdFx0aWYoLS10aGlzLnBlbmRpbmdOYW1lc3BhY2VDb3VudCA+IDApIHJldHVybjtcblxuXHRcdC8vIExpbmsgdHlwZXMgdG8gdGhlaXIgcGFyZW50cy5cblxuXHRcdGZvcih2YXIgZXhwb3J0T2JqIG9mIHRoaXMucGVuZGluZ05hbWVzcGFjZUxpc3QpIHtcblx0XHRcdHZhciBuYW1lc3BhY2UgPSBleHBvcnRPYmouX2N4bWxbMF07XG5cdFx0XHRuYW1lc3BhY2UubGluaygpO1xuXHRcdH1cblxuXHRcdC8vIENyZWF0ZSBjbGFzc2VzIGZvciBhbGwgdHlwZXMuXG5cdFx0Ly8gVGhpcyBpcyBlZmZlY3RpdmVseSBLYWhuJ3MgYWxnb3JpdGhtIGZvciB0b3BvbG9naWNhbCBzb3J0XG5cdFx0Ly8gKHRoZSByZXN0IGlzIGluIHRoZSBUeXBlU3BlYyBjbGFzcykuXG5cblx0XHRkZWZpbmVTcGVjcyh0aGlzLnBlbmRpbmdUeXBlTGlzdCk7XG5cdFx0ZGVmaW5lU3BlY3ModGhpcy5wZW5kaW5nTWVtYmVyTGlzdCk7XG5cblx0XHRmb3IodmFyIHR5cGVTcGVjIG9mIHRoaXMucGVuZGluZ1R5cGVMaXN0KSB7XG5cdFx0XHR0eXBlU3BlYy5kZWZpbmVNZW1iZXJzKCk7XG5cdFx0fVxuXG5cdFx0dGhpcy5wZW5kaW5nVHlwZUxpc3QgPSBbXTtcblx0XHR0aGlzLnBlbmRpbmdNZW1iZXJMaXN0ID0gW107XG5cblx0XHRmb3IodmFyIGV4cG9ydE9iamVjdCBvZiB0aGlzLnBlbmRpbmdOYW1lc3BhY2VMaXN0KSB7XG5cdFx0XHR2YXIgbmFtZXNwYWNlID0gZXhwb3J0T2JqZWN0Ll9jeG1sWzBdO1xuXG5cdFx0XHRuYW1lc3BhY2UuZXhwb3J0VHlwZXMoZXhwb3J0T2JqZWN0KTtcblx0XHRcdG5hbWVzcGFjZS5leHBvcnREb2N1bWVudChleHBvcnRPYmplY3QpO1xuXHRcdH1cblxuXHRcdHRoaXMucGVuZGluZ05hbWVzcGFjZUxpc3QgPSBbXTtcblx0fVxuXG5cdC8qKiBSZW1vdmUgdGVtcG9yYXJ5IHN0cnVjdHVyZXMgbmVlZGVkIHRvIGRlZmluZSBuZXcgaGFuZGxlcnMuICovXG5cblx0Y2xlYW5QbGFjZWhvbGRlcnMoc3RyaWN0PzogYm9vbGVhbikge1xuXHRcdGZvcih2YXIgbmFtZXNwYWNlIG9mIHRoaXMubmFtZXNwYWNlTGlzdCkge1xuXHRcdFx0bmFtZXNwYWNlLmltcG9ydFNwZWNMaXN0ID0gbnVsbDtcblx0XHRcdG5hbWVzcGFjZS5leHBvcnRUeXBlTmFtZUxpc3QgPSBudWxsO1xuXHRcdFx0bmFtZXNwYWNlLnR5cGVTcGVjTGlzdCA9IG51bGw7XG5cdFx0XHRuYW1lc3BhY2UubWVtYmVyU3BlY0xpc3QgPSBudWxsO1xuXHRcdFx0bmFtZXNwYWNlLmV4cG9ydFR5cGVUYmwgPSBudWxsO1xuXHRcdFx0bmFtZXNwYWNlLmV4cG9ydE1lbWJlclRibCA9IG51bGw7XG5cdFx0fVxuXG5cdFx0Zm9yKHZhciB0eXBlU3BlYyBvZiB0aGlzLnR5cGVMaXN0KSB7XG5cdFx0XHR0eXBlU3BlYy5jbGVhblBsYWNlaG9sZGVycyhzdHJpY3QpO1xuXHRcdH1cblxuXHRcdHRoaXMudHlwZUxpc3QgPSBudWxsO1xuXHR9XG5cblx0LyoqIExpc3Qgb2YgcGVuZGluZyBuYW1lc3BhY2VzIChub3QgeWV0IHJlZ2lzdGVyZWQgb3Igd2FpdGluZyBmb3IgcHJvY2Vzc2luZykuICovXG5cdHByaXZhdGUgcGVuZGluZ05hbWVzcGFjZUxpc3Q6IE1vZHVsZUV4cG9ydHNbXSA9IFtdO1xuXHQvKiogR3Jvd3Mgd2l0aCBwZW5kaW5nTmFtZXNwYWNlTGlzdCBhbmQgc2hyaW5rcyB3aGVuIG5hbWVzcGFjZXMgYXJlIHJlZ2lzdGVyZWQuXG5cdCAgKiBXaGVuIHplcm8sIGFsbCBwZW5kaW5nIG5hbWVzcGFjZXMgaGF2ZSBiZWVuIHJlZ2lzdGVyZWQgYW5kIGNhbiBiZSBwcm9jZXNzZWQuICovXG5cdHByaXZhdGUgcGVuZGluZ05hbWVzcGFjZUNvdW50ID0gMDtcblxuXHRwcml2YXRlIHBlbmRpbmdUeXBlTGlzdDogVHlwZVNwZWNbXSA9IFtdO1xuXHRwcml2YXRlIHBlbmRpbmdNZW1iZXJMaXN0OiBNZW1iZXJTcGVjW10gPSBbXTtcblxuXHRwcml2YXRlIHR5cGVMaXN0OiBUeXBlU3BlY1tdID0gW107XG59XG4iXX0=