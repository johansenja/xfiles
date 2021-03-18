"use strict";
// This file is part of cxsd, copyright (c) 2015-2016 BusFaster Ltd.
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
exports.Restriction = void 0;
var DerivationBase_1 = require("./DerivationBase");
var types = require("../types");
/** <xsd:restriction>
  * The schema allows a restriction to contain anything, but we parse only some useful restrictions. */
var Restriction = /** @class */ (function (_super) {
    __extends(Restriction, _super);
    function Restriction() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // TODO: Remove this.
    Restriction.prototype.init = function (state) {
        this.parent = state.parent;
    };
    /*
        TODO: uncomment this when resolve function dependencies are handled.
        resolve(state: State) {
            var parent = state.parent.xsdElement;
    
            if(parent instanceof types.SimpleType) {
                parent.setEnumerationList(this.enumerationList);
            }
    
    //		super.resolve(state);
        }
    */
    Restriction.prototype.addEnumeration = function (content) {
        if (!this.enumerationList) {
            this.enumerationList = [];
            // TODO: Remove this and uncomment the resolve function.
            var parent = this.parent.xsdElement;
            if (parent instanceof types.SimpleType) {
                parent.setEnumerationList(this.enumerationList);
            }
        }
        this.enumerationList.push(content);
    };
    Restriction.mayContain = function () { return DerivationBase_1.DerivationBase.mayContain().concat([
        types.Enumeration
    ]); };
    return Restriction;
}(DerivationBase_1.DerivationBase));
exports.Restriction = Restriction;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmVzdHJpY3Rpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wYXJzZXJfc2NhZmZvbGRfZ2VuZXJhdG9yL3NyYy94c2QvdHlwZXMvUmVzdHJpY3Rpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLG9FQUFvRTtBQUNwRSwrQ0FBK0M7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUcvQyxtREFBZ0Q7QUFDaEQsZ0NBQWtDO0FBRWxDO3VHQUN1RztBQUV2RztJQUFpQywrQkFBYztJQUEvQzs7SUF1Q0EsQ0FBQztJQWxDQSxxQkFBcUI7SUFDckIsMEJBQUksR0FBSixVQUFLLEtBQVk7UUFDaEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDO0lBQzVCLENBQUM7SUFFRjs7Ozs7Ozs7Ozs7TUFXRTtJQUVELG9DQUFjLEdBQWQsVUFBZSxPQUFlO1FBQzdCLElBQUcsQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFO1lBQ3pCLElBQUksQ0FBQyxlQUFlLEdBQUcsRUFBRSxDQUFDO1lBRTFCLHdEQUF3RDtZQUN4RCxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQztZQUVwQyxJQUFHLE1BQU0sWUFBWSxLQUFLLENBQUMsVUFBVSxFQUFFO2dCQUN0QyxNQUFNLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO2FBQ2hEO1NBQ0Q7UUFDRCxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNwQyxDQUFDO0lBbENNLHNCQUFVLEdBQTRCLGNBQU0sT0FBQSwrQkFBYyxDQUFDLFVBQVUsRUFBRSxDQUFDLE1BQU0sQ0FBQztRQUNyRixLQUFLLENBQUMsV0FBVztLQUNqQixDQUFDLEVBRmlELENBRWpELENBQUM7SUFvQ0osa0JBQUM7Q0FBQSxBQXZDRCxDQUFpQywrQkFBYyxHQXVDOUM7QUF2Q1ksa0NBQVciLCJzb3VyY2VzQ29udGVudCI6WyIvLyBUaGlzIGZpbGUgaXMgcGFydCBvZiBjeHNkLCBjb3B5cmlnaHQgKGMpIDIwMTUtMjAxNiBCdXNGYXN0ZXIgTHRkLlxuLy8gUmVsZWFzZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlLCBzZWUgTElDRU5TRS5cblxuaW1wb3J0IHtTdGF0ZX0gZnJvbSAnLi4vU3RhdGUnO1xuaW1wb3J0IHtEZXJpdmF0aW9uQmFzZX0gZnJvbSAnLi9EZXJpdmF0aW9uQmFzZSc7XG5pbXBvcnQgKiBhcyB0eXBlcyBmcm9tICcuLi90eXBlcyc7XG5cbi8qKiA8eHNkOnJlc3RyaWN0aW9uPlxuICAqIFRoZSBzY2hlbWEgYWxsb3dzIGEgcmVzdHJpY3Rpb24gdG8gY29udGFpbiBhbnl0aGluZywgYnV0IHdlIHBhcnNlIG9ubHkgc29tZSB1c2VmdWwgcmVzdHJpY3Rpb25zLiAqL1xuXG5leHBvcnQgY2xhc3MgUmVzdHJpY3Rpb24gZXh0ZW5kcyBEZXJpdmF0aW9uQmFzZSB7XG5cdHN0YXRpYyBtYXlDb250YWluOiAoKSA9PiB0eXBlcy5CYXNlQ2xhc3NbXSA9ICgpID0+IERlcml2YXRpb25CYXNlLm1heUNvbnRhaW4oKS5jb25jYXQoW1xuXHRcdHR5cGVzLkVudW1lcmF0aW9uXG5cdF0pO1xuXG5cdC8vIFRPRE86IFJlbW92ZSB0aGlzLlxuXHRpbml0KHN0YXRlOiBTdGF0ZSkge1xuXHRcdHRoaXMucGFyZW50ID0gc3RhdGUucGFyZW50O1xuXHR9XG5cbi8qXG5cdFRPRE86IHVuY29tbWVudCB0aGlzIHdoZW4gcmVzb2x2ZSBmdW5jdGlvbiBkZXBlbmRlbmNpZXMgYXJlIGhhbmRsZWQuXG5cdHJlc29sdmUoc3RhdGU6IFN0YXRlKSB7XG5cdFx0dmFyIHBhcmVudCA9IHN0YXRlLnBhcmVudC54c2RFbGVtZW50O1xuXG5cdFx0aWYocGFyZW50IGluc3RhbmNlb2YgdHlwZXMuU2ltcGxlVHlwZSkge1xuXHRcdFx0cGFyZW50LnNldEVudW1lcmF0aW9uTGlzdCh0aGlzLmVudW1lcmF0aW9uTGlzdCk7XG5cdFx0fVxuXG4vL1x0XHRzdXBlci5yZXNvbHZlKHN0YXRlKTtcblx0fVxuKi9cblxuXHRhZGRFbnVtZXJhdGlvbihjb250ZW50OiBzdHJpbmcpIHtcblx0XHRpZighdGhpcy5lbnVtZXJhdGlvbkxpc3QpIHtcblx0XHRcdHRoaXMuZW51bWVyYXRpb25MaXN0ID0gW107XG5cblx0XHRcdC8vIFRPRE86IFJlbW92ZSB0aGlzIGFuZCB1bmNvbW1lbnQgdGhlIHJlc29sdmUgZnVuY3Rpb24uXG5cdFx0XHR2YXIgcGFyZW50ID0gdGhpcy5wYXJlbnQueHNkRWxlbWVudDtcblxuXHRcdFx0aWYocGFyZW50IGluc3RhbmNlb2YgdHlwZXMuU2ltcGxlVHlwZSkge1xuXHRcdFx0XHRwYXJlbnQuc2V0RW51bWVyYXRpb25MaXN0KHRoaXMuZW51bWVyYXRpb25MaXN0KTtcblx0XHRcdH1cblx0XHR9XG5cdFx0dGhpcy5lbnVtZXJhdGlvbkxpc3QucHVzaChjb250ZW50KTtcblx0fVxuXG5cdHByaXZhdGUgcGFyZW50OiBTdGF0ZTsgLy8gVE9ETzogUmVtb3ZlIHRoaXMuXG5cdHByaXZhdGUgZW51bWVyYXRpb25MaXN0OiBzdHJpbmdbXTtcbn1cbiJdfQ==