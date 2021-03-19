"use strict";
// This file is part of cxml, copyright (c) 2016 BusFaster Ltd.
// Released under the MIT license, see LICENSE.
Object.defineProperty(exports, "__esModule", { value: true });
exports.init = exports.register = exports.defaultContext = void 0;
var Context_1 = require("../xml/Context");
/** Context for namespaces defined by calling register(). */
exports.defaultContext = new Context_1.Context();
/** Mark a namespace as seen. */
function mark(exportObj, namespace) {
    if (!exportObj._cxml) {
        exportObj._cxml = [null];
        exports.defaultContext.markNamespace(exportObj);
    }
    if (namespace)
        exportObj._cxml[0] = namespace;
}
/** Register a namespace.
  * This is called from JavaScript autogenerated by the cxsd compiler. */
function register(name, exportObject, importSpecList, exportTypeNameList, rawTypeSpecList, rawMemberSpecList) {
    var namespace = exports.defaultContext.registerNamespace(name).init(importSpecList);
    exports.defaultContext.registerTypes(namespace, exportTypeNameList, rawTypeSpecList);
    exports.defaultContext.registerMembers(namespace, rawMemberSpecList);
    mark(exportObject, namespace);
    for (var _i = 0, importSpecList_1 = importSpecList; _i < importSpecList_1.length; _i++) {
        var spec = importSpecList_1[_i];
        mark(spec[0]);
    }
    exports.defaultContext.process();
}
exports.register = register;
/** Remove temporary structures needed to define new handlers and initialize the parser. */
function init(strict) {
    exports.defaultContext.cleanPlaceholders(strict);
}
exports.init = init;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSlMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJKUy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsK0RBQStEO0FBQy9ELCtDQUErQzs7O0FBSy9DLDBDQUF1QztBQUV2Qyw0REFBNEQ7QUFDakQsUUFBQSxjQUFjLEdBQUcsSUFBSSxpQkFBTyxFQUFFLENBQUM7QUFFMUMsZ0NBQWdDO0FBRWhDLFNBQVMsSUFBSSxDQUFDLFNBQXdCLEVBQUUsU0FBcUI7SUFDNUQsSUFBRyxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUU7UUFDcEIsU0FBUyxDQUFDLEtBQUssR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3pCLHNCQUFjLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0tBQ3hDO0lBRUQsSUFBRyxTQUFTO1FBQUUsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxTQUFTLENBQUM7QUFDOUMsQ0FBQztBQUVEO3lFQUN5RTtBQUV6RSxTQUFnQixRQUFRLENBQ3ZCLElBQVksRUFDWixZQUEyQixFQUMzQixjQUE0QixFQUM1QixrQkFBNEIsRUFDNUIsZUFBOEIsRUFDOUIsaUJBQWtDO0lBRWxDLElBQUksU0FBUyxHQUFHLHNCQUFjLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO0lBRTVFLHNCQUFjLENBQUMsYUFBYSxDQUFDLFNBQVMsRUFBRSxrQkFBa0IsRUFBRSxlQUFlLENBQUMsQ0FBQztJQUM3RSxzQkFBYyxDQUFDLGVBQWUsQ0FBQyxTQUFTLEVBQUUsaUJBQWlCLENBQUMsQ0FBQztJQUU3RCxJQUFJLENBQUMsWUFBWSxFQUFFLFNBQVMsQ0FBQyxDQUFDO0lBRTlCLEtBQWdCLFVBQWMsRUFBZCxpQ0FBYyxFQUFkLDRCQUFjLEVBQWQsSUFBYztRQUExQixJQUFJLElBQUksdUJBQUE7UUFBb0IsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQUE7SUFFOUMsc0JBQWMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztBQUMxQixDQUFDO0FBbEJELDRCQWtCQztBQUVELDJGQUEyRjtBQUUzRixTQUFnQixJQUFJLENBQUMsTUFBZ0I7SUFDcEMsc0JBQWMsQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUMxQyxDQUFDO0FBRkQsb0JBRUMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBUaGlzIGZpbGUgaXMgcGFydCBvZiBjeG1sLCBjb3B5cmlnaHQgKGMpIDIwMTYgQnVzRmFzdGVyIEx0ZC5cbi8vIFJlbGVhc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSwgc2VlIExJQ0VOU0UuXG5cbmltcG9ydCB7TmFtZXNwYWNlLCBNb2R1bGVFeHBvcnRzLCBJbXBvcnRTcGVjfSBmcm9tICcuLi94bWwvTmFtZXNwYWNlJztcbmltcG9ydCB7UmF3TWVtYmVyU3BlY30gZnJvbSAnLi4veG1sL01lbWJlcic7XG5pbXBvcnQge1Jhd1R5cGVTcGVjfSBmcm9tICcuLi94bWwvVHlwZVNwZWMnO1xuaW1wb3J0IHtDb250ZXh0fSBmcm9tICcuLi94bWwvQ29udGV4dCc7XG5cbi8qKiBDb250ZXh0IGZvciBuYW1lc3BhY2VzIGRlZmluZWQgYnkgY2FsbGluZyByZWdpc3RlcigpLiAqL1xuZXhwb3J0IHZhciBkZWZhdWx0Q29udGV4dCA9IG5ldyBDb250ZXh0KCk7XG5cbi8qKiBNYXJrIGEgbmFtZXNwYWNlIGFzIHNlZW4uICovXG5cbmZ1bmN0aW9uIG1hcmsoZXhwb3J0T2JqOiBNb2R1bGVFeHBvcnRzLCBuYW1lc3BhY2U/OiBOYW1lc3BhY2UpIHtcblx0aWYoIWV4cG9ydE9iai5fY3htbCkge1xuXHRcdGV4cG9ydE9iai5fY3htbCA9IFtudWxsXTtcblx0XHRkZWZhdWx0Q29udGV4dC5tYXJrTmFtZXNwYWNlKGV4cG9ydE9iaik7XG5cdH1cblxuXHRpZihuYW1lc3BhY2UpIGV4cG9ydE9iai5fY3htbFswXSA9IG5hbWVzcGFjZTtcbn1cblxuLyoqIFJlZ2lzdGVyIGEgbmFtZXNwYWNlLlxuICAqIFRoaXMgaXMgY2FsbGVkIGZyb20gSmF2YVNjcmlwdCBhdXRvZ2VuZXJhdGVkIGJ5IHRoZSBjeHNkIGNvbXBpbGVyLiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gcmVnaXN0ZXIoXG5cdG5hbWU6IHN0cmluZyxcblx0ZXhwb3J0T2JqZWN0OiBNb2R1bGVFeHBvcnRzLFxuXHRpbXBvcnRTcGVjTGlzdDogSW1wb3J0U3BlY1tdLFxuXHRleHBvcnRUeXBlTmFtZUxpc3Q6IHN0cmluZ1tdLFxuXHRyYXdUeXBlU3BlY0xpc3Q6IFJhd1R5cGVTcGVjW10sXG5cdHJhd01lbWJlclNwZWNMaXN0OiBSYXdNZW1iZXJTcGVjW11cbikge1xuXHR2YXIgbmFtZXNwYWNlID0gZGVmYXVsdENvbnRleHQucmVnaXN0ZXJOYW1lc3BhY2UobmFtZSkuaW5pdChpbXBvcnRTcGVjTGlzdCk7XG5cblx0ZGVmYXVsdENvbnRleHQucmVnaXN0ZXJUeXBlcyhuYW1lc3BhY2UsIGV4cG9ydFR5cGVOYW1lTGlzdCwgcmF3VHlwZVNwZWNMaXN0KTtcblx0ZGVmYXVsdENvbnRleHQucmVnaXN0ZXJNZW1iZXJzKG5hbWVzcGFjZSwgcmF3TWVtYmVyU3BlY0xpc3QpO1xuXG5cdG1hcmsoZXhwb3J0T2JqZWN0LCBuYW1lc3BhY2UpO1xuXG5cdGZvcih2YXIgc3BlYyBvZiBpbXBvcnRTcGVjTGlzdCkgbWFyayhzcGVjWzBdKTtcblxuXHRkZWZhdWx0Q29udGV4dC5wcm9jZXNzKCk7XG59XG5cbi8qKiBSZW1vdmUgdGVtcG9yYXJ5IHN0cnVjdHVyZXMgbmVlZGVkIHRvIGRlZmluZSBuZXcgaGFuZGxlcnMgYW5kIGluaXRpYWxpemUgdGhlIHBhcnNlci4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGluaXQoc3RyaWN0PzogYm9vbGVhbikge1xuXHRkZWZhdWx0Q29udGV4dC5jbGVhblBsYWNlaG9sZGVycyhzdHJpY3QpO1xufVxuIl19