"use strict";
// This file is part of cxsd, copyright (c) 2015-2016 BusFaster Ltd.
// Released under the MIT license, see LICENSE.
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rule = void 0;
/** Parser rule, defines a handler class, valid attributes and children
  * for an XSD tag. */
var Rule = /** @class */ (function () {
    function Rule(proto) {
        /** List of allowed attributes. */
        this.attributeList = [];
        /** Table mapping the names of allowed child tags, to their parsing rules. */
        this.followerTbl = {};
        this.proto = proto;
    }
    return Rule;
}());
exports.Rule = Rule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUnVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3BhcnNlcl9zY2FmZm9sZF9nZW5lcmF0b3Ivc3JjL3hzZC9SdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxvRUFBb0U7QUFDcEUsK0NBQStDOzs7QUFJL0M7c0JBQ3NCO0FBRXRCO0lBQ0MsY0FBWSxLQUFnQjtRQU81QixrQ0FBa0M7UUFDbEMsa0JBQWEsR0FBYSxFQUFFLENBQUM7UUFFN0IsNkVBQTZFO1FBQzdFLGdCQUFXLEdBQXlCLEVBQUUsQ0FBQztRQVZ0QyxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztJQUNwQixDQUFDO0lBVUYsV0FBQztBQUFELENBQUMsQUFiRCxJQWFDO0FBYlksb0JBQUkiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBUaGlzIGZpbGUgaXMgcGFydCBvZiBjeHNkLCBjb3B5cmlnaHQgKGMpIDIwMTUtMjAxNiBCdXNGYXN0ZXIgTHRkLlxuLy8gUmVsZWFzZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlLCBzZWUgTElDRU5TRS5cblxuaW1wb3J0IHtCYXNlQ2xhc3N9IGZyb20gJy4vdHlwZXMvQmFzZSc7XG5cbi8qKiBQYXJzZXIgcnVsZSwgZGVmaW5lcyBhIGhhbmRsZXIgY2xhc3MsIHZhbGlkIGF0dHJpYnV0ZXMgYW5kIGNoaWxkcmVuXG4gICogZm9yIGFuIFhTRCB0YWcuICovXG5cbmV4cG9ydCBjbGFzcyBSdWxlIHtcblx0Y29uc3RydWN0b3IocHJvdG86IEJhc2VDbGFzcykge1xuXHRcdHRoaXMucHJvdG8gPSBwcm90bztcblx0fVxuXG5cdC8qKiBDb25zdHJ1Y3RvciBmdW5jdGlvbiBmb3IgY3JlYXRpbmcgb2JqZWN0cyBoYW5kbGluZyBhbmQgcmVwcmVzZW50aW5nIHRoZSByZXN1bHRzIG9mIHRoaXMgcGFyc2luZyBydWxlLiAqL1xuXHRwcm90bzogQmFzZUNsYXNzO1xuXG5cdC8qKiBMaXN0IG9mIGFsbG93ZWQgYXR0cmlidXRlcy4gKi9cblx0YXR0cmlidXRlTGlzdDogc3RyaW5nW10gPSBbXTtcblxuXHQvKiogVGFibGUgbWFwcGluZyB0aGUgbmFtZXMgb2YgYWxsb3dlZCBjaGlsZCB0YWdzLCB0byB0aGVpciBwYXJzaW5nIHJ1bGVzLiAqL1xuXHRmb2xsb3dlclRibDoge1tpZDogc3RyaW5nXTogUnVsZX0gPSB7fTtcbn1cbiJdfQ==