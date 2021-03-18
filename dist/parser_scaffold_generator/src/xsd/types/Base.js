"use strict";
// This file is part of cxsd, copyright (c) 2015-2016 BusFaster Ltd.
// Released under the MIT license, see LICENSE.
Object.defineProperty(exports, "__esModule", { value: true });
exports.Base = void 0;
var QName_1 = require("../QName");
/** Common handler base class for all schema tags. */
var Base = /** @class */ (function () {
    function Base(state) {
        if (!state)
            return;
        this.scope = state.getScope();
        this.lineNumber = state.stateStatic.getLineNumber();
        this.bytePos = state.stateStatic.getBytePos();
    }
    /** Hook, runs after opening tag. */
    Base.prototype.init = function (state) { };
    /** Hook, runs for text content. */
    Base.prototype.addText = function (state, text) { };
    /** Hook, runs after closing tag. */
    Base.prototype.loaded = function (state) { };
    /** Hook, runs after all dependencies have been loaded. */
    Base.prototype.resolve = function (state) { };
    /** Add this named tag to scope, listed under given type.
     * Optionally set number of allowed occurrences, for optional elements, sequences etc.
     * @return fully qualified name. */
    Base.prototype.define = function (state, type, min, max, scope) {
        if (min === void 0) { min = 1; }
        if (max === void 0) { max = 1; }
        var name = this.name;
        var qName = null;
        if (name) {
            qName = new QName_1.QName(name, state.source);
            name = qName.nameFull;
        }
        (scope || this.scope).addToParent(name, type, this, min, max);
        return qName;
    };
    Base.prototype.getScope = function () {
        return this.scope;
    };
    /** Returns other classes allowed as children. */
    Base.mayContain = function () { return []; };
    return Base;
}());
exports.Base = Base;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQmFzZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3BhcnNlcl9zY2FmZm9sZF9nZW5lcmF0b3Ivc3JjL3hzZC90eXBlcy9CYXNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxvRUFBb0U7QUFDcEUsK0NBQStDOzs7QUFNL0Msa0NBQWlDO0FBWWpDLHFEQUFxRDtBQUVyRDtJQUlFLGNBQVksS0FBYTtRQUN2QixJQUFJLENBQUMsS0FBSztZQUFFLE9BQU87UUFFbkIsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDOUIsSUFBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUMsV0FBVyxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQ3BELElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDLFdBQVcsQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUNoRCxDQUFDO0lBRUQsb0NBQW9DO0lBQ3BDLG1CQUFJLEdBQUosVUFBSyxLQUFZLElBQUcsQ0FBQztJQUVyQixtQ0FBbUM7SUFDbkMsc0JBQU8sR0FBUCxVQUFRLEtBQVksRUFBRSxJQUFZLElBQUcsQ0FBQztJQUV0QyxvQ0FBb0M7SUFDcEMscUJBQU0sR0FBTixVQUFPLEtBQVksSUFBRyxDQUFDO0lBRXZCLDBEQUEwRDtJQUMxRCxzQkFBTyxHQUFQLFVBQVEsS0FBWSxJQUFHLENBQUM7SUFFeEI7O3VDQUVtQztJQUNuQyxxQkFBTSxHQUFOLFVBQU8sS0FBWSxFQUFFLElBQVksRUFBRSxHQUFPLEVBQUUsR0FBTyxFQUFFLEtBQWE7UUFBL0Isb0JBQUEsRUFBQSxPQUFPO1FBQUUsb0JBQUEsRUFBQSxPQUFPO1FBQ2pELElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDckIsSUFBSSxLQUFLLEdBQVUsSUFBSSxDQUFDO1FBRXhCLElBQUksSUFBSSxFQUFFO1lBQ1IsS0FBSyxHQUFHLElBQUksYUFBSyxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDdEMsSUFBSSxHQUFHLEtBQUssQ0FBQyxRQUFRLENBQUM7U0FDdkI7UUFFRCxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUU5RCxPQUFPLEtBQUssQ0FBQztJQUNmLENBQUM7SUFFRCx1QkFBUSxHQUFSO1FBQ0UsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDO0lBQ3BCLENBQUM7SUExQ0QsaURBQWlEO0lBQzFDLGVBQVUsR0FBRyxjQUFNLE9BQUEsRUFBaUIsRUFBakIsQ0FBaUIsQ0FBQztJQWtEOUMsV0FBQztDQUFBLEFBcERELElBb0RDO0FBcERZLG9CQUFJIiwic291cmNlc0NvbnRlbnQiOlsiLy8gVGhpcyBmaWxlIGlzIHBhcnQgb2YgY3hzZCwgY29weXJpZ2h0IChjKSAyMDE1LTIwMTYgQnVzRmFzdGVyIEx0ZC5cbi8vIFJlbGVhc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSwgc2VlIExJQ0VOU0UuXG5cbmltcG9ydCB7IFJ1bGUgfSBmcm9tIFwiLi4vUnVsZVwiO1xuaW1wb3J0IHsgU3RhdGUgfSBmcm9tIFwiLi4vU3RhdGVcIjtcbmltcG9ydCB7IE5hbWVzcGFjZSB9IGZyb20gXCIuLi9OYW1lc3BhY2VcIjtcbmltcG9ydCB7IFNjb3BlIH0gZnJvbSBcIi4uL1Njb3BlXCI7XG5pbXBvcnQgeyBRTmFtZSB9IGZyb20gXCIuLi9RTmFtZVwiO1xuXG5leHBvcnQgaW50ZXJmYWNlIEJhc2VDbGFzcyB7XG4gIG5ldyAoc3RhdGU/OiBTdGF0ZSk6IEJhc2U7XG5cbiAgLyoqIFJldHVybnMgb3RoZXIgY2xhc3NlcyBhbGxvd2VkIGFzIGNoaWxkcmVuLiAqL1xuICBtYXlDb250YWluKCk6IEJhc2VDbGFzc1tdO1xuXG4gIG5hbWU6IHN0cmluZztcbiAgcnVsZTogUnVsZTtcbn1cblxuLyoqIENvbW1vbiBoYW5kbGVyIGJhc2UgY2xhc3MgZm9yIGFsbCBzY2hlbWEgdGFncy4gKi9cblxuZXhwb3J0IGNsYXNzIEJhc2Uge1xuICAvKiogUmV0dXJucyBvdGhlciBjbGFzc2VzIGFsbG93ZWQgYXMgY2hpbGRyZW4uICovXG4gIHN0YXRpYyBtYXlDb250YWluID0gKCkgPT4gW10gYXMgQmFzZUNsYXNzW107XG5cbiAgY29uc3RydWN0b3Ioc3RhdGU/OiBTdGF0ZSkge1xuICAgIGlmICghc3RhdGUpIHJldHVybjtcblxuICAgIHRoaXMuc2NvcGUgPSBzdGF0ZS5nZXRTY29wZSgpO1xuICAgIHRoaXMubGluZU51bWJlciA9IHN0YXRlLnN0YXRlU3RhdGljLmdldExpbmVOdW1iZXIoKTtcbiAgICB0aGlzLmJ5dGVQb3MgPSBzdGF0ZS5zdGF0ZVN0YXRpYy5nZXRCeXRlUG9zKCk7XG4gIH1cblxuICAvKiogSG9vaywgcnVucyBhZnRlciBvcGVuaW5nIHRhZy4gKi9cbiAgaW5pdChzdGF0ZTogU3RhdGUpIHt9XG5cbiAgLyoqIEhvb2ssIHJ1bnMgZm9yIHRleHQgY29udGVudC4gKi9cbiAgYWRkVGV4dChzdGF0ZTogU3RhdGUsIHRleHQ6IHN0cmluZykge31cblxuICAvKiogSG9vaywgcnVucyBhZnRlciBjbG9zaW5nIHRhZy4gKi9cbiAgbG9hZGVkKHN0YXRlOiBTdGF0ZSkge31cblxuICAvKiogSG9vaywgcnVucyBhZnRlciBhbGwgZGVwZW5kZW5jaWVzIGhhdmUgYmVlbiBsb2FkZWQuICovXG4gIHJlc29sdmUoc3RhdGU6IFN0YXRlKSB7fVxuXG4gIC8qKiBBZGQgdGhpcyBuYW1lZCB0YWcgdG8gc2NvcGUsIGxpc3RlZCB1bmRlciBnaXZlbiB0eXBlLlxuICAgKiBPcHRpb25hbGx5IHNldCBudW1iZXIgb2YgYWxsb3dlZCBvY2N1cnJlbmNlcywgZm9yIG9wdGlvbmFsIGVsZW1lbnRzLCBzZXF1ZW5jZXMgZXRjLlxuICAgKiBAcmV0dXJuIGZ1bGx5IHF1YWxpZmllZCBuYW1lLiAqL1xuICBkZWZpbmUoc3RhdGU6IFN0YXRlLCB0eXBlOiBzdHJpbmcsIG1pbiA9IDEsIG1heCA9IDEsIHNjb3BlPzogU2NvcGUpIHtcbiAgICB2YXIgbmFtZSA9IHRoaXMubmFtZTtcbiAgICB2YXIgcU5hbWU6IFFOYW1lID0gbnVsbDtcblxuICAgIGlmIChuYW1lKSB7XG4gICAgICBxTmFtZSA9IG5ldyBRTmFtZShuYW1lLCBzdGF0ZS5zb3VyY2UpO1xuICAgICAgbmFtZSA9IHFOYW1lLm5hbWVGdWxsO1xuICAgIH1cblxuICAgIChzY29wZSB8fCB0aGlzLnNjb3BlKS5hZGRUb1BhcmVudChuYW1lLCB0eXBlLCB0aGlzLCBtaW4sIG1heCk7XG5cbiAgICByZXR1cm4gcU5hbWU7XG4gIH1cblxuICBnZXRTY29wZSgpIHtcbiAgICByZXR1cm4gdGhpcy5zY29wZTtcbiAgfVxuXG4gIHByb3RlY3RlZCBzY29wZTogU2NvcGU7XG4gIGxpbmVOdW1iZXI6IG51bWJlcjtcbiAgYnl0ZVBvczogbnVtYmVyO1xuICBuYW1lOiBzdHJpbmc7XG5cbiAgc3RhdGljIG5hYW1lOiBzdHJpbmc7XG4gIHN0YXRpYyBydWxlOiBSdWxlO1xufVxuIl19