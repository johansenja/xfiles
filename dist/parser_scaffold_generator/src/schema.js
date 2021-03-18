"use strict";
// This file is part of cxsd, copyright (c) 2015-2016 BusFaster Ltd.
// Released under the MIT license, see LICENSE.
Object.defineProperty(exports, "__esModule", { value: true });
exports.exporter = exports.MemberRef = exports.Member = exports.Type = exports.Namespace = exports.Context = void 0;
var Context_1 = require("./schema/Context");
Object.defineProperty(exports, "Context", { enumerable: true, get: function () { return Context_1.Context; } });
var Namespace_1 = require("./schema/Namespace");
Object.defineProperty(exports, "Namespace", { enumerable: true, get: function () { return Namespace_1.Namespace; } });
var Type_1 = require("./schema/Type");
Object.defineProperty(exports, "Type", { enumerable: true, get: function () { return Type_1.Type; } });
var Member_1 = require("./schema/Member");
Object.defineProperty(exports, "Member", { enumerable: true, get: function () { return Member_1.Member; } });
var MemberRef_1 = require("./schema/MemberRef");
Object.defineProperty(exports, "MemberRef", { enumerable: true, get: function () { return MemberRef_1.MemberRef; } });
var exporter = require("./schema/exporter");
exports.exporter = exporter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NoZW1hLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vcGFyc2VyX3NjYWZmb2xkX2dlbmVyYXRvci9zcmMvc2NoZW1hLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxvRUFBb0U7QUFDcEUsK0NBQStDOzs7QUFFL0MsNENBQXlDO0FBQWpDLGtHQUFBLE9BQU8sT0FBQTtBQUNmLGdEQUE2QztBQUFyQyxzR0FBQSxTQUFTLE9BQUE7QUFDakIsc0NBQW1DO0FBQTNCLDRGQUFBLElBQUksT0FBQTtBQUNaLDBDQUF1QztBQUEvQixnR0FBQSxNQUFNLE9BQUE7QUFDZCxnREFBNkM7QUFBckMsc0dBQUEsU0FBUyxPQUFBO0FBQ2pCLDRDQUE4QztBQUN0Qyw0QkFBUSIsInNvdXJjZXNDb250ZW50IjpbIi8vIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIGN4c2QsIGNvcHlyaWdodCAoYykgMjAxNS0yMDE2IEJ1c0Zhc3RlciBMdGQuXG4vLyBSZWxlYXNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UsIHNlZSBMSUNFTlNFLlxuXG5leHBvcnQge0NvbnRleHR9IGZyb20gJy4vc2NoZW1hL0NvbnRleHQnO1xuZXhwb3J0IHtOYW1lc3BhY2V9IGZyb20gJy4vc2NoZW1hL05hbWVzcGFjZSc7XG5leHBvcnQge1R5cGV9IGZyb20gJy4vc2NoZW1hL1R5cGUnO1xuZXhwb3J0IHtNZW1iZXJ9IGZyb20gJy4vc2NoZW1hL01lbWJlcic7XG5leHBvcnQge01lbWJlclJlZn0gZnJvbSAnLi9zY2hlbWEvTWVtYmVyUmVmJztcbmltcG9ydCAqIGFzIGV4cG9ydGVyIGZyb20gJy4vc2NoZW1hL2V4cG9ydGVyJztcbmV4cG9ydCB7ZXhwb3J0ZXJ9XG4iXX0=