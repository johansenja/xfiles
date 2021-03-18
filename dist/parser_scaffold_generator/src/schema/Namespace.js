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
exports.Namespace = void 0;
var cxml = require("../../../runtime_parser");
var Namespace = /** @class */ (function (_super) {
    __extends(Namespace, _super);
    function Namespace() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /** All types used in the document. */
        _this.typeList = [];
        /** All members used in the document. */
        _this.memberList = [];
        /** Types from other namespaces augmented with members from this namespace. */
        _this.augmentTbl = {};
        _this.pendingSubstituteList = [];
        /** Short names used to reference other namespaces in schemas defining this namespace. */
        _this.shortNameTbl = {};
        return _this;
    }
    Namespace.prototype.addRef = function (shortName, namespace) {
        var id = namespace.id;
        if (!this.shortNameTbl[id])
            this.shortNameTbl[id] = [];
        this.shortNameTbl[id].push(shortName);
    };
    Namespace.prototype.getShortRef = function (id) {
        var nameList = this.shortNameTbl[id];
        if (nameList && nameList.length)
            return nameList[0];
        else
            return null;
    };
    Namespace.prototype.getUsedImportTbl = function () {
        var importTbl = this.importTbl;
        if (!importTbl) {
            importTbl = {};
            if (this.importContentTbl) {
                for (var _i = 0, _a = Object.keys(this.importContentTbl); _i < _a.length; _i++) {
                    var key = _a[_i];
                    var id = +key;
                    var short = this.getShortRef(id);
                    importTbl[this.getShortRef(id)] = this.context.namespaceById(id);
                }
                this.importTbl = importTbl;
            }
        }
        return importTbl;
    };
    Namespace.prototype.getUsedImportList = function () {
        var _this = this;
        if (this.importContentTbl) {
            var importTbl = this.getUsedImportTbl();
            return Object.keys(importTbl).map(function (shortName) { return importTbl[shortName]; });
        }
        else {
            return Object.keys(this.shortNameTbl).map(function (id) {
                return _this.context.namespaceById(+id);
            });
        }
    };
    Namespace.prototype.addType = function (type) {
        var id = type.surrogateKey;
        this.typeList[id] = type;
        type.namespace = this;
    };
    Namespace.prototype.addMember = function (member) {
        var id = member.surrogateKey;
        this.memberList[id] = member;
        member.namespace = this;
    };
    /** Augment type in another namespace with member from this namespace. */
    Namespace.prototype.addAugmentation = function (type, member) {
        // TODO: Adding a member with an identical name but different namespace should be handled somehow!
        if (type.childTbl[member.name])
            return;
        var augmentTbl = this.augmentTbl[type.namespace.id];
        if (!augmentTbl) {
            augmentTbl = {};
            this.augmentTbl[type.namespace.id] = augmentTbl;
        }
        var augmentSpec = augmentTbl[type.surrogateKey];
        if (!augmentSpec) {
            augmentSpec = { type: type, refList: [] };
            augmentTbl[type.surrogateKey] = augmentSpec;
        }
        augmentSpec.refList.push(member.getRef());
    };
    return Namespace;
}(cxml.NamespaceBase));
exports.Namespace = Namespace;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTmFtZXNwYWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcGFyc2VyX3NjYWZmb2xkX2dlbmVyYXRvci9zcmMvc2NoZW1hL05hbWVzcGFjZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsK0RBQStEO0FBQy9ELCtDQUErQzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRS9DLDhDQUFnRDtBQWFoRDtJQUErQiw2QkFBc0M7SUFBckU7UUFBQSxxRUFvSEM7UUEzQkMsc0NBQXNDO1FBQ3RDLGNBQVEsR0FBVyxFQUFFLENBQUM7UUFDdEIsd0NBQXdDO1FBQ3hDLGdCQUFVLEdBQWEsRUFBRSxDQUFDO1FBQzFCLDhFQUE4RTtRQUM5RSxnQkFBVSxHQUlOLEVBQUUsQ0FBQztRQUVQLDJCQUFxQixHQUFhLEVBQUUsQ0FBQztRQUtyQyx5RkFBeUY7UUFDekYsa0JBQVksR0FBd0MsRUFBRSxDQUFDOztJQVV6RCxDQUFDO0lBbkhDLDBCQUFNLEdBQU4sVUFBTyxTQUFpQixFQUFFLFNBQW9CO1FBQzVDLElBQUksRUFBRSxHQUFHLFNBQVMsQ0FBQyxFQUFFLENBQUM7UUFFdEIsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDO1lBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDdkQsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDeEMsQ0FBQztJQUVELCtCQUFXLEdBQVgsVUFBWSxFQUFVO1FBQ3BCLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLENBQUM7UUFFckMsSUFBSSxRQUFRLElBQUksUUFBUSxDQUFDLE1BQU07WUFBRSxPQUFPLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7WUFDL0MsT0FBTyxJQUFJLENBQUM7SUFDbkIsQ0FBQztJQUVELG9DQUFnQixHQUFoQjtR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LFdBQVcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO0lBQzVDLENBQUM7SUFnQ0gsZ0JBQUM7QUFBRCxDQUFDLEFBcEhELENBQStCLElBQUksQ0FBQyxhQUFhLEdBb0hoRDtBQXBIWSw4QkFBUyIsInNvdXJjZXNDb250ZW50IjpbIi8vIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIGN4c2QsIGNvcHlyaWdodCAoYykgMjAxNiBCdXNGYXN0ZXIgTHRkLlxuLy8gUmVsZWFzZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlLCBzZWUgTElDRU5TRS5cblxuaW1wb3J0ICogYXMgY3htbCBmcm9tIFwiLi4vLi4vLi4vcnVudGltZV9wYXJzZXJcIjtcblxuaW1wb3J0IHsgQ29udGV4dCB9IGZyb20gXCIuL0NvbnRleHRcIjtcbmltcG9ydCB7IE5hbWVzcGFjZVJlZiB9IGZyb20gXCIuL05hbWVzcGFjZVJlZlwiO1xuaW1wb3J0IHsgVHlwZSB9IGZyb20gXCIuL1R5cGVcIjtcbmltcG9ydCB7IE1lbWJlciB9IGZyb20gXCIuL01lbWJlclwiO1xuaW1wb3J0IHsgTWVtYmVyUmVmIH0gZnJvbSBcIi4vTWVtYmVyUmVmXCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSW1wb3J0Q29udGVudCB7XG4gIHR5cGVUYmw6IHsgW2tleTogc3RyaW5nXTogVHlwZSB9O1xuICBtZW1iZXJUYmw6IHsgW2tleTogc3RyaW5nXTogTWVtYmVyIH07XG59XG5cbmV4cG9ydCBjbGFzcyBOYW1lc3BhY2UgZXh0ZW5kcyBjeG1sLk5hbWVzcGFjZUJhc2U8Q29udGV4dCwgTmFtZXNwYWNlPiB7XG4gIGFkZFJlZihzaG9ydE5hbWU6IHN0cmluZywgbmFtZXNwYWNlOiBOYW1lc3BhY2UpIHtcbiAgICB2YXIgaWQgPSBuYW1lc3BhY2UuaWQ7XG5cbiAgICBpZiAoIXRoaXMuc2hvcnROYW1lVGJsW2lkXSkgdGhpcy5zaG9ydE5hbWVUYmxbaWRdID0gW107XG4gICAgdGhpcy5zaG9ydE5hbWVUYmxbaWRdLnB1c2goc2hvcnROYW1lKTtcbiAgfVxuXG4gIGdldFNob3J0UmVmKGlkOiBudW1iZXIpIHtcbiAgICB2YXIgbmFtZUxpc3QgPSB0aGlzLnNob3J0TmFtZVRibFtpZF07XG5cbiAgICBpZiAobmFtZUxpc3QgJiYgbmFtZUxpc3QubGVuZ3RoKSByZXR1cm4gbmFtZUxpc3RbMF07XG4gICAgZWxzZSByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIGdldFVzZWRJbXBvcnRUYmwoKSB7XG4gICAgdmFyIGltcG9ydFRibCA9IHRoaXMuaW1wb3J0VGJsO1xuXG4gICAgaWYgKCFpbXBvcnRUYmwpIHtcbiAgICAgIGltcG9ydFRibCA9IHt9O1xuXG4gICAgICBpZiAodGhpcy5pbXBvcnRDb250ZW50VGJsKSB7XG4gICAgICAgIGZvciAodmFyIGtleSBvZiBPYmplY3Qua2V5cyh0aGlzLmltcG9ydENvbnRlbnRUYmwpKSB7XG4gICAgICAgICAgdmFyIGlkID0gK2tleTtcbiAgICAgICAgICB2YXIgc2hvcnQgPSB0aGlzLmdldFNob3J0UmVmKGlkKTtcbiAgICAgICAgICBpbXBvcnRUYmxbdGhpcy5nZXRTaG9ydFJlZihpZCldID0gdGhpcy5jb250ZXh0Lm5hbWVzcGFjZUJ5SWQoaWQpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5pbXBvcnRUYmwgPSBpbXBvcnRUYmw7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGltcG9ydFRibDtcbiAgfVxuXG4gIGdldFVzZWRJbXBvcnRMaXN0KCkge1xuICAgIGlmICh0aGlzLmltcG9ydENvbnRlbnRUYmwpIHtcbiAgICAgIHZhciBpbXBvcnRUYmwgPSB0aGlzLmdldFVzZWRJbXBvcnRUYmwoKTtcblxuICAgICAgcmV0dXJuIE9iamVjdC5rZXlzKGltcG9ydFRibCkubWFwKFxuICAgICAgICAoc2hvcnROYW1lOiBzdHJpbmcpID0+IGltcG9ydFRibFtzaG9ydE5hbWVdXG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gT2JqZWN0LmtleXModGhpcy5zaG9ydE5hbWVUYmwpLm1hcCgoaWQ6IHN0cmluZykgPT5cbiAgICAgICAgdGhpcy5jb250ZXh0Lm5hbWVzcGFjZUJ5SWQoK2lkKVxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICBhZGRUeXBlKHR5cGU6IFR5cGUpIHtcbiAgICB2YXIgaWQgPSB0eXBlLnN1cnJvZ2F0ZUtleTtcbiAgICB0aGlzLnR5cGVMaXN0W2lkXSA9IHR5cGU7XG5cbiAgICB0eXBlLm5hbWVzcGFjZSA9IHRoaXM7XG4gIH1cblxuICBhZGRNZW1iZXIobWVtYmVyOiBNZW1iZXIpIHtcbiAgICB2YXIgaWQgPSBtZW1iZXIuc3Vycm9nYXRlS2V5O1xuICAgIHRoaXMubWVtYmVyTGlzdFtpZF0gPSBtZW1iZXI7XG5cbiAgICBtZW1iZXIubmFtZXNwYWNlID0gdGhpcztcbiAgfVxuXG4gIC8qKiBBdWdtZW50IHR5cGUgaW4gYW5vdGhlciBuYW1lc3BhY2Ugd2l0aCBtZW1iZXIgZnJvbSB0aGlzIG5hbWVzcGFjZS4gKi9cblxuICBhZGRBdWdtZW50YXRpb24odHlwZTogVHlwZSwgbWVtYmVyOiBNZW1iZXIpIHtcbiAgICAvLyBUT0RPOiBBZGRpbmcgYSBtZW1iZXIgd2l0aCBhbiBpZGVudGljYWwgbmFtZSBidXQgZGlmZmVyZW50IG5hbWVzcGFjZSBzaG91bGQgYmUgaGFuZGxlZCBzb21laG93IVxuICAgIGlmICh0eXBlLmNoaWxkVGJsW21lbWJlci5uYW1lXSkgcmV0dXJuO1xuXG4gICAgdmFyIGF1Z21lbnRUYmwgPSB0aGlzLmF1Z21lbnRUYmxbdHlwZS5uYW1lc3BhY2UuaWRdO1xuXG4gICAgaWYgKCFhdWdtZW50VGJsKSB7XG4gICAgICBhdWdtZW50VGJsID0ge307XG4gICAgICB0aGlzLmF1Z21lbnRUYmxbdHlwZS5uYW1lc3BhY2UuaWRdID0gYXVnbWVudFRibDtcbiAgICB9XG5cbiAgICB2YXIgYXVnbWVudFNwZWMgPSBhdWdtZW50VGJsW3R5cGUuc3Vycm9nYXRlS2V5XTtcblxuICAgIGlmICghYXVnbWVudFNwZWMpIHtcbiAgICAgIGF1Z21lbnRTcGVjID0geyB0eXBlOiB0eXBlLCByZWZMaXN0OiBbXSB9O1xuICAgICAgYXVnbWVudFRibFt0eXBlLnN1cnJvZ2F0ZUtleV0gPSBhdWdtZW50U3BlYztcbiAgICB9XG5cbiAgICBhdWdtZW50U3BlYy5yZWZMaXN0LnB1c2gobWVtYmVyLmdldFJlZigpKTtcbiAgfVxuXG4gIC8qKiBJbnZpc2libGUgZG9jdW1lbnQgZWxlbWVudCBkZWZpbmluZyB0aGUgdHlwZXMgb2YgWE1MIGZpbGUgcm9vdCBlbGVtZW50cy4gKi9cbiAgZG9jOiBUeXBlO1xuXG4gIC8qKiBBbGwgdHlwZXMgdXNlZCBpbiB0aGUgZG9jdW1lbnQuICovXG4gIHR5cGVMaXN0OiBUeXBlW10gPSBbXTtcbiAgLyoqIEFsbCBtZW1iZXJzIHVzZWQgaW4gdGhlIGRvY3VtZW50LiAqL1xuICBtZW1iZXJMaXN0OiBNZW1iZXJbXSA9IFtdO1xuICAvKiogVHlwZXMgZnJvbSBvdGhlciBuYW1lc3BhY2VzIGF1Z21lbnRlZCB3aXRoIG1lbWJlcnMgZnJvbSB0aGlzIG5hbWVzcGFjZS4gKi9cbiAgYXVnbWVudFRibDoge1xuICAgIFtuYW1lc3BhY2VJZDogc3RyaW5nXToge1xuICAgICAgW3R5cGVJZDogc3RyaW5nXTogeyB0eXBlOiBUeXBlOyByZWZMaXN0OiBNZW1iZXJSZWZbXSB9O1xuICAgIH07XG4gIH0gPSB7fTtcblxuICBwZW5kaW5nU3Vic3RpdHV0ZUxpc3Q6IE1lbWJlcltdID0gW107XG5cbiAgLyoqIExpc3Qgb2YgVVJMIGFkZHJlc3NlcyBvZiBmaWxlcyB3aXRoIGRlZmluaXRpb25zIGZvciB0aGlzIG5hbWVzcGFjZS4gKi9cbiAgc291cmNlTGlzdDogc3RyaW5nW107XG5cbiAgLyoqIFNob3J0IG5hbWVzIHVzZWQgdG8gcmVmZXJlbmNlIG90aGVyIG5hbWVzcGFjZXMgaW4gc2NoZW1hcyBkZWZpbmluZyB0aGlzIG5hbWVzcGFjZS4gKi9cbiAgc2hvcnROYW1lVGJsOiB7IFtuYW1lc3BhY2VJZDogc3RyaW5nXTogc3RyaW5nW10gfSA9IHt9O1xuXG4gIC8qKiBUYWJsZSBvZiBuYW1lc3BhY2VzIGFjdHVhbGx5IGltcG9ydGVkLCBieSBzaG9ydCBuYW1lLiAqL1xuICBwcml2YXRlIGltcG9ydFRibDogeyBbc2hvcnQ6IHN0cmluZ106IE5hbWVzcGFjZSB9O1xuXG4gIC8qKiBMaXN0IG9mIHJlZmVyZW5jZWQgdHlwZSBuYW1lcyBmcm9tIGVhY2ggaW1wb3J0ZWQgbmFtZXNwYWNlLiAqL1xuICBpbXBvcnRDb250ZW50VGJsOiB7IFtuYW1lc3BhY2VJZDogc3RyaW5nXTogSW1wb3J0Q29udGVudCB9O1xuXG4gIC8qKiBUcnVlIG9ubHkgZm9yIHRoZSBzcGVjaWFsIG5hbWVzcGFjZSBjb250YWluaW5nIHByaW1pdGl2ZXMuICovXG4gIGlzUHJpbWl0aXZlU3BhY2U6IGJvb2xlYW47XG59XG4iXX0=