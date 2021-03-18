"use strict";
// This file is part of cxsd, copyright (c) 2016 BusFaster Ltd.
// Released under the MIT license, see LICENSE.
Object.defineProperty(exports, "__esModule", { value: true });
exports.Transform = void 0;
var Promise = require("bluebird");
/** TransformType is a class derived from Transform, used like CRTP in C++. */
var Transform = /** @class */ (function () {
    function Transform(doc) {
        this.doc = doc;
        this.namespace = doc.namespace;
    }
    Transform.prototype.getTypeMembers = function (type) {
        var memberList = [];
        var ref;
        if (type.attributeList) {
            for (var _i = 0, _a = type.attributeList; _i < _a.length; _i++) {
                ref = _a[_i];
                memberList.push(ref);
            }
        }
        if (type.childList) {
            for (var _b = 0, _c = type.childList; _b < _c.length; _b++) {
                ref = _c[_b];
                memberList.push(ref);
            }
        }
        return (memberList);
    };
    Transform.prototype.prepare = function () { return (this.output); };
    Transform.prototype.exec = function (visitedNamespaceTbl, state) {
        var _this = this;
        var doc = this.doc;
        var namespace = doc.namespace;
        if (state)
            this.state = state;
        if (!visitedNamespaceTbl)
            visitedNamespaceTbl = {};
        visitedNamespaceTbl[namespace.id] = namespace;
        return (Promise.resolve(this.prepare()).then(function (output) { return Promise.map(namespace.getUsedImportList(), function (namespace) {
            if (!visitedNamespaceTbl[namespace.id]) {
                if (namespace.doc) {
                    var transform = new _this.construct(namespace.doc);
                    return (transform.exec(visitedNamespaceTbl, _this.state));
                }
            }
            return ([]);
        }).then(function (outputList) { return Array.prototype.concat.apply([output], outputList); }); }));
    };
    return Transform;
}());
exports.Transform = Transform;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVHJhbnNmb3JtLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcGFyc2VyX3NjYWZmb2xkX2dlbmVyYXRvci9zcmMvc2NoZW1hL3RyYW5zZm9ybS9UcmFuc2Zvcm0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLCtEQUErRDtBQUMvRCwrQ0FBK0M7OztBQUUvQyxrQ0FBb0M7QUFNcEMsOEVBQThFO0FBRTlFO0lBQ0MsbUJBQVksR0FBUztRQUNwQixJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUNmLElBQUksQ0FBQyxTQUFTLEdBQUcsR0FBRyxDQUFDLFNBQVMsQ0FBQztJQUNoQyxDQUFDO0lBRUQsa0NBQWMsR0FBZCxVQUFlLElBQVU7UUFDeEIsSUFBSSxVQUFVLEdBQWdCLEVBQUUsQ0FBQztRQUNqQyxJQUFJLEdBQWMsQ0FBQztRQUVuQixJQUFHLElBQUksQ0FBQyxhQUFhLEVBQUU7WUFDdEIsS0FBVyxVQUFrQixFQUFsQixLQUFBLElBQUksQ0FBQyxhQUFhLEVBQWxCLGNBQWtCLEVBQWxCLElBQWtCO2dCQUF6QixHQUFHLFNBQUE7Z0JBQXdCLFVBQVUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7YUFBQTtTQUNwRDtRQUVELElBQUcsSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUNsQixLQUFXLFVBQWMsRUFBZCxLQUFBLElBQUksQ0FBQyxTQUFTLEVBQWQsY0FBYyxFQUFkLElBQWM7Z0JBQXJCLEdBQUcsU0FBQTtnQkFBb0IsVUFBVSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUFBO1NBQ2hEO1FBRUQsT0FBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ3BCLENBQUM7SUFFRCwyQkFBTyxHQUFQLGNBQXNDLE9BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRTVELHdCQUFJLEdBQUosVUFDQyxtQkFBa0QsRUFDbEQsS0FBVztRQUZaLGlCQTBCQztRQXRCQSxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDO1FBQ25CLElBQUksU0FBUyxHQUFHLEdBQUcsQ0FBQyxTQUFTLENBQUM7UUFFOUIsSUFBRyxLQUFLO1lBQUUsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFFN0IsSUFBRyxDQUFDLG1CQUFtQjtZQUFFLG1CQUFtQixHQUFHLEVBQUUsQ0FBQztRQUNsRCxtQkFBbUIsQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLEdBQUcsU0FBUyxDQUFDO1FBRTlDLE9BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFDLE1BQWMsSUFBSyxPQUFBLE9BQU8sQ0FBQyxHQUFHLENBQzFFLFNBQVMsQ0FBQyxpQkFBaUIsRUFBRSxFQUM3QixVQUFDLFNBQW9CO1lBQ3BCLElBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLEVBQUU7Z0JBQ3RDLElBQUcsU0FBUyxDQUFDLEdBQUcsRUFBRTtvQkFDakIsSUFBSSxTQUFTLEdBQUcsSUFBSSxLQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQztvQkFFbEQsT0FBTSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLEVBQUUsS0FBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7aUJBQ3hEO2FBQ0Q7WUFFRCxPQUFNLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDWixDQUFDLENBQ0QsQ0FBQyxJQUFJLENBQUMsVUFBQyxVQUFzQixJQUFLLE9BQUEsS0FBSyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUUsVUFBVSxDQUFDLEVBQWxELENBQWtELENBQUMsRUFidEIsQ0Fhc0IsQ0FBQyxDQUFDLENBQUM7SUFDMUYsQ0FBQztJQVFGLGdCQUFDO0FBQUQsQ0FBQyxBQXpERCxJQXlEQztBQXpEcUIsOEJBQVMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBUaGlzIGZpbGUgaXMgcGFydCBvZiBjeHNkLCBjb3B5cmlnaHQgKGMpIDIwMTYgQnVzRmFzdGVyIEx0ZC5cbi8vIFJlbGVhc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSwgc2VlIExJQ0VOU0UuXG5cbmltcG9ydCAqIGFzIFByb21pc2UgZnJvbSAnYmx1ZWJpcmQnO1xuXG5pbXBvcnQge05hbWVzcGFjZX0gZnJvbSAnLi4vTmFtZXNwYWNlJztcbmltcG9ydCB7VHlwZX0gZnJvbSAnLi4vVHlwZSc7XG5pbXBvcnQge01lbWJlclJlZn0gZnJvbSAnLi4vTWVtYmVyUmVmJztcblxuLyoqIFRyYW5zZm9ybVR5cGUgaXMgYSBjbGFzcyBkZXJpdmVkIGZyb20gVHJhbnNmb3JtLCB1c2VkIGxpa2UgQ1JUUCBpbiBDKysuICovXG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBUcmFuc2Zvcm08VHJhbnNmb3JtVHlwZSBleHRlbmRzIFRyYW5zZm9ybTxUcmFuc2Zvcm1UeXBlLCBPdXRwdXQsIFN0YXRlPiwgT3V0cHV0LCBTdGF0ZT4ge1xuXHRjb25zdHJ1Y3Rvcihkb2M6IFR5cGUpIHtcblx0XHR0aGlzLmRvYyA9IGRvYztcblx0XHR0aGlzLm5hbWVzcGFjZSA9IGRvYy5uYW1lc3BhY2U7XG5cdH1cblxuXHRnZXRUeXBlTWVtYmVycyh0eXBlOiBUeXBlKSB7XG5cdFx0dmFyIG1lbWJlckxpc3Q6IE1lbWJlclJlZltdID0gW107XG5cdFx0dmFyIHJlZjogTWVtYmVyUmVmO1xuXG5cdFx0aWYodHlwZS5hdHRyaWJ1dGVMaXN0KSB7XG5cdFx0XHRmb3IocmVmIG9mIHR5cGUuYXR0cmlidXRlTGlzdCkgbWVtYmVyTGlzdC5wdXNoKHJlZik7XG5cdFx0fVxuXG5cdFx0aWYodHlwZS5jaGlsZExpc3QpIHtcblx0XHRcdGZvcihyZWYgb2YgdHlwZS5jaGlsZExpc3QpIG1lbWJlckxpc3QucHVzaChyZWYpO1xuXHRcdH1cblxuXHRcdHJldHVybihtZW1iZXJMaXN0KTtcblx0fVxuXG5cdHByZXBhcmUoKTogT3V0cHV0IHwgUHJvbWlzZTxPdXRwdXQ+IHsgcmV0dXJuKHRoaXMub3V0cHV0KTsgfVxuXG5cdGV4ZWMoXG5cdFx0dmlzaXRlZE5hbWVzcGFjZVRibD86IHsgW2tleTogc3RyaW5nXTogTmFtZXNwYWNlIH0sXG5cdFx0c3RhdGU/OiBhbnlcblx0KTogUHJvbWlzZTxPdXRwdXRbXT4ge1xuXHRcdHZhciBkb2MgPSB0aGlzLmRvYztcblx0XHR2YXIgbmFtZXNwYWNlID0gZG9jLm5hbWVzcGFjZTtcblxuXHRcdGlmKHN0YXRlKSB0aGlzLnN0YXRlID0gc3RhdGU7XG5cblx0XHRpZighdmlzaXRlZE5hbWVzcGFjZVRibCkgdmlzaXRlZE5hbWVzcGFjZVRibCA9IHt9O1xuXHRcdHZpc2l0ZWROYW1lc3BhY2VUYmxbbmFtZXNwYWNlLmlkXSA9IG5hbWVzcGFjZTtcblxuXHRcdHJldHVybihQcm9taXNlLnJlc29sdmUodGhpcy5wcmVwYXJlKCkpLnRoZW4oKG91dHB1dDogT3V0cHV0KSA9PiBQcm9taXNlLm1hcChcblx0XHRcdG5hbWVzcGFjZS5nZXRVc2VkSW1wb3J0TGlzdCgpLFxuXHRcdFx0KG5hbWVzcGFjZTogTmFtZXNwYWNlKSA9PiB7XG5cdFx0XHRcdGlmKCF2aXNpdGVkTmFtZXNwYWNlVGJsW25hbWVzcGFjZS5pZF0pIHtcblx0XHRcdFx0XHRpZihuYW1lc3BhY2UuZG9jKSB7XG5cdFx0XHRcdFx0XHR2YXIgdHJhbnNmb3JtID0gbmV3IHRoaXMuY29uc3RydWN0KG5hbWVzcGFjZS5kb2MpO1xuXG5cdFx0XHRcdFx0XHRyZXR1cm4odHJhbnNmb3JtLmV4ZWModmlzaXRlZE5hbWVzcGFjZVRibCwgdGhpcy5zdGF0ZSkpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJldHVybihbXSk7XG5cdFx0XHR9XG5cdFx0KS50aGVuKChvdXRwdXRMaXN0OiBPdXRwdXRbXVtdKSA9PiBBcnJheS5wcm90b3R5cGUuY29uY2F0LmFwcGx5KFtvdXRwdXRdLCBvdXRwdXRMaXN0KSkpKTtcblx0fVxuXG5cdGNvbnN0cnVjdDogeyBuZXcoLi4uYXJnczogYW55W10pOiBUcmFuc2Zvcm08VHJhbnNmb3JtVHlwZSwgT3V0cHV0LCBTdGF0ZT47IH07XG5cdG91dHB1dDogT3V0cHV0O1xuXG5cdHByb3RlY3RlZCBkb2M6IFR5cGU7XG5cdHByb3RlY3RlZCBuYW1lc3BhY2U6IE5hbWVzcGFjZTtcblx0cHJvdGVjdGVkIHN0YXRlOiBTdGF0ZTtcbn1cbiJdfQ==