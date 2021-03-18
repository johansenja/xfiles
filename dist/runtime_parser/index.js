"use strict";
// This file is part of cxml, copyright (c) 2016 BusFaster Ltd.
// Released under the MIT license, see LICENSE.
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultContext = exports.register = exports.init = exports.Parser = exports.Context = exports.MemberRefBase = exports.MemberBase = exports.ItemBase = exports.ContextBase = exports.NamespaceBase = void 0;
var NamespaceBase_1 = require("./src/xml/NamespaceBase");
Object.defineProperty(exports, "NamespaceBase", { enumerable: true, get: function () { return NamespaceBase_1.NamespaceBase; } });
var ContextBase_1 = require("./src/xml/ContextBase");
Object.defineProperty(exports, "ContextBase", { enumerable: true, get: function () { return ContextBase_1.ContextBase; } });
var Item_1 = require("./src/xml/Item");
Object.defineProperty(exports, "ItemBase", { enumerable: true, get: function () { return Item_1.ItemBase; } });
var MemberBase_1 = require("./src/xml/MemberBase");
Object.defineProperty(exports, "MemberBase", { enumerable: true, get: function () { return MemberBase_1.MemberBase; } });
var MemberRefBase_1 = require("./src/xml/MemberRefBase");
Object.defineProperty(exports, "MemberRefBase", { enumerable: true, get: function () { return MemberRefBase_1.MemberRefBase; } });
var Context_1 = require("./src/xml/Context");
Object.defineProperty(exports, "Context", { enumerable: true, get: function () { return Context_1.Context; } });
var Parser_1 = require("./src/xml/Parser");
Object.defineProperty(exports, "Parser", { enumerable: true, get: function () { return Parser_1.Parser; } });
var JS_1 = require("./src/importer/JS");
Object.defineProperty(exports, "init", { enumerable: true, get: function () { return JS_1.init; } });
Object.defineProperty(exports, "register", { enumerable: true, get: function () { return JS_1.register; } });
Object.defineProperty(exports, "defaultContext", { enumerable: true, get: function () { return JS_1.defaultContext; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9ydW50aW1lX3BhcnNlci9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsK0RBQStEO0FBQy9ELCtDQUErQzs7O0FBRS9DLHlEQUFzRDtBQUE5Qyw4R0FBQSxhQUFhLE9BQUE7QUFDckIscURBQWtEO0FBQTFDLDBHQUFBLFdBQVcsT0FBQTtBQUNuQix1Q0FBd0M7QUFBaEMsZ0dBQUEsUUFBUSxPQUFBO0FBQ2hCLG1EQUFnRDtBQUF4Qyx3R0FBQSxVQUFVLE9BQUE7QUFDbEIseURBQXNEO0FBQTlDLDhHQUFBLGFBQWEsT0FBQTtBQUVyQiw2Q0FBMEM7QUFBbEMsa0dBQUEsT0FBTyxPQUFBO0FBQ2YsMkNBQXdDO0FBQWhDLGdHQUFBLE1BQU0sT0FBQTtBQUVkLHdDQUFpRTtBQUF6RCwwRkFBQSxJQUFJLE9BQUE7QUFBRSw4RkFBQSxRQUFRLE9BQUE7QUFBRSxvR0FBQSxjQUFjLE9BQUEiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBUaGlzIGZpbGUgaXMgcGFydCBvZiBjeG1sLCBjb3B5cmlnaHQgKGMpIDIwMTYgQnVzRmFzdGVyIEx0ZC5cbi8vIFJlbGVhc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSwgc2VlIExJQ0VOU0UuXG5cbmV4cG9ydCB7TmFtZXNwYWNlQmFzZX0gZnJvbSAnLi9zcmMveG1sL05hbWVzcGFjZUJhc2UnO1xuZXhwb3J0IHtDb250ZXh0QmFzZX0gZnJvbSAnLi9zcmMveG1sL0NvbnRleHRCYXNlJztcbmV4cG9ydCB7SXRlbUJhc2V9IGZyb20gJy4vc3JjL3htbC9JdGVtJztcbmV4cG9ydCB7TWVtYmVyQmFzZX0gZnJvbSAnLi9zcmMveG1sL01lbWJlckJhc2UnO1xuZXhwb3J0IHtNZW1iZXJSZWZCYXNlfSBmcm9tICcuL3NyYy94bWwvTWVtYmVyUmVmQmFzZSc7XG5cbmV4cG9ydCB7Q29udGV4dH0gZnJvbSAnLi9zcmMveG1sL0NvbnRleHQnO1xuZXhwb3J0IHtQYXJzZXJ9IGZyb20gJy4vc3JjL3htbC9QYXJzZXInO1xuXG5leHBvcnQge2luaXQsIHJlZ2lzdGVyLCBkZWZhdWx0Q29udGV4dH0gZnJvbSAnLi9zcmMvaW1wb3J0ZXIvSlMnO1xuIl19