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
exports.TS = void 0;
var Exporter_1 = require("./Exporter");
var docName = 'document';
var baseName = 'BaseType';
/** Export parsed schema to a TypeScript d.ts definition file. */
var TS = /** @class */ (function (_super) {
    __extends(TS, _super);
    function TS() {
        /** Format an XSD annotation as JSDoc. */
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.construct = TS;
        return _this;
    }
    TS.formatComment = function (indent, comment) {
        var lineList = comment.split('\n');
        var lineCount = lineList.length;
        var blankCount = 0;
        var contentCount = 0;
        var output = [];
        var prefix = '/\**';
        for (var _i = 0, lineList_1 = lineList; _i < lineList_1.length; _i++) {
            var line = lineList_1[_i];
            // Remove leading and trailing whitespace.
            line = line.trim();
            if (!line)
                ++blankCount;
            else {
                if (blankCount && contentCount)
                    output.push(indent + prefix);
                output.push(indent + prefix + ' ' + line);
                prefix = '  *';
                ++contentCount;
                blankCount = 0;
            }
        }
        if (output.length)
            output[output.length - 1] += ' *\/';
        return (output.join('\n'));
    };
    TS.prototype.writeImport = function (shortName, relativePath, absolutePath) {
        return ('import * as ' +
            shortName +
            ' from ' +
            "'" + relativePath + "'" +
            ';');
    };
    /** Output list of original schema file locations. */
    TS.prototype.exportSourceList = function (sourceList) {
        var output = [];
        output.push('// Source files:');
        for (var _i = 0, sourceList_1 = sourceList; _i < sourceList_1.length; _i++) {
            var urlRemote = sourceList_1[_i];
            output.push('// ' + urlRemote);
        }
        output.push('');
        return (output);
    };
    TS.prototype.writeTypeRef = function (type, namePrefix) {
        var output = [];
        var namespace = type.namespace;
        var name = namePrefix + type.safeName;
        if (!namespace || namespace == this.namespace) {
            output.push(name);
        }
        else {
            // Type from another, imported namespace.
            var short = this.namespace.getShortRef(namespace.id);
            if (short) {
                output.push(short + '.' + name);
            }
            else {
                console.error('MISSING IMPORT ' + namespace.name + ' for type ' + type.name);
                output.push('any');
            }
        }
        return (output.join(''));
    };
    TS.prototype.writeParents = function (parentDef, mixinList) {
        var parentList = [];
        if (parentDef)
            parentList.push(parentDef);
        for (var _i = 0, _a = mixinList || []; _i < _a.length; _i++) {
            var type = _a[_i];
            parentList.push(this.writeTypeRef(type, '_'));
        }
        if (!parentList.length)
            parentList.push(baseName);
        return (' extends ' + parentList.join(', '));
    };
    TS.prototype.writeTypeList = function (ref) {
        var _this = this;
        var typeList = ref.member.typeList;
        if (ref.max > 1 && ref.member.proxy)
            typeList = [ref.member.proxy];
        var outTypeList = typeList.map(function (type) {
            if (type.isPlainPrimitive && (!type.literalList || !type.literalList.length)) {
                return (type.primitiveType.name);
            }
            else
                return (_this.writeTypeRef(type, ''));
        });
        if (outTypeList.length == 0)
            return (null);
        var outTypes = outTypeList.sort().join(' | ');
        if (ref.max > 1) {
            if (outTypeList.length > 1)
                return ('(' + outTypes + ')[]');
            else
                return (outTypes + '[]');
        }
        else
            return (outTypes);
    };
    TS.prototype.writeMember = function (ref, isGlobal) {
        var output = [];
        var member = ref.member;
        var comment = member.comment;
        var indent = '\t';
        if (ref.isHidden)
            return ('');
        if (isGlobal && member.isAbstract)
            return ('');
        if (member.name == '*')
            return ('');
        if (comment) {
            output.push(TS.formatComment(indent, comment));
            output.push('\n');
        }
        output.push(indent + ref.safeName);
        if (ref.min == 0)
            output.push('?');
        output.push(': ');
        var outTypes = this.writeTypeList(ref);
        if (!outTypes)
            return ('');
        output.push(outTypes);
        output.push(';');
        return (output.join(''));
    };
    TS.prototype.writeTypeContent = function (type) {
        var output = [];
        if (type.isPlainPrimitive) {
            var literalList = type.literalList;
            if (literalList && literalList.length > 0) {
                if (literalList.length > 1) {
                    output.push('(' + literalList.join(' | ') + ')');
                }
                else
                    output.push(literalList[0]);
            }
            else
                output.push(type.primitiveType.name);
        }
        else if (type.isList) {
            output.push(this.writeTypeList(type.childList[0]));
        }
        else {
            var outMemberList = [];
            var output = [];
            var parentType = type.parent;
            for (var _i = 0, _a = type.attributeList; _i < _a.length; _i++) {
                var attribute = _a[_i];
                var outAttribute = this.writeMember(attribute, false);
                if (outAttribute)
                    outMemberList.push(outAttribute);
            }
            for (var _b = 0, _c = type.childList; _b < _c.length; _b++) {
                var child = _c[_b];
                var outChild = this.writeMember(child, false);
                if (outChild)
                    outMemberList.push(outChild);
            }
            output.push('{');
            if (outMemberList.length) {
                output.push('\n');
                output.push(outMemberList.join('\n'));
                output.push('\n');
            }
            output.push('}');
        }
        return (output.join(''));
    };
    TS.prototype.writeType = function (type) {
        var namespace = this.namespace;
        var output = [];
        var comment = type.comment;
        var parentDef;
        var exportPrefix = type.isExported ? 'export ' : '';
        var name = type.safeName;
        if (comment) {
            output.push(TS.formatComment('', comment));
            output.push('\n');
        }
        var content = this.writeTypeContent(type);
        if (namespace.isPrimitiveSpace) {
            output.push(exportPrefix + 'interface _' + name + this.writeParents(null, type.mixinList) + ' { ' + 'content' + ': ' + type.primitiveType.name + '; }' + '\n');
        }
        else if (type.isList) {
            output.push(exportPrefix + 'type ' + name + ' = ' + content + ';' + '\n');
        }
        else if (type.isPlainPrimitive) {
            parentDef = this.writeTypeRef(type.parent, '_');
            output.push(exportPrefix + 'type ' + name + ' = ' + content + ';' + '\n');
            if (type.literalList && type.literalList.length) {
                output.push('interface _' + name + this.writeParents(parentDef, type.mixinList) + ' { ' + 'content' + ': ' + name + '; }' + '\n');
            }
            else {
                // NOTE: Substitution groups are ignored here!
                output.push('type _' + name + ' = ' + parentDef + ';' + '\n');
            }
        }
        else {
            if (type.parent)
                parentDef = this.writeTypeRef(type.parent, '_');
            output.push('interface _' + name + this.writeParents(parentDef, type.mixinList) + ' ' + content + '\n');
            output.push(exportPrefix + 'interface ' + name + ' extends _' + name + ' { constructor: { new(): ' + name + ' }; }' + '\n');
            if (type.isExported)
                output.push(exportPrefix + 'var ' + name + ': { new(): ' + name + ' };' + '\n');
        }
        return (output.join(''));
    };
    TS.prototype.writeSubstitutions = function (type, refList, output) {
        for (var _i = 0, refList_1 = refList; _i < refList_1.length; _i++) {
            var ref = refList_1[_i];
            var proxy = ref.member.proxy;
            if (!ref.member.isAbstract)
                output.push(this.writeMember(ref, false));
            if (proxy && proxy != type)
                this.writeSubstitutions(proxy, proxy.childList, output);
        }
        for (var _a = 0, _b = type.mixinList; _a < _b.length; _a++) {
            var mixin = _b[_a];
            if (mixin != type)
                this.writeSubstitutions(mixin, mixin.childList, output);
        }
    };
    TS.prototype.writeAugmentations = function (output) {
        var namespace = this.namespace;
        for (var _i = 0, _a = Object.keys(namespace.augmentTbl); _i < _a.length; _i++) {
            var namespaceId = _a[_i];
            var augmentTbl = namespace.augmentTbl[namespaceId];
            var typeIdList = Object.keys(augmentTbl);
            var type = augmentTbl[typeIdList[0]].type;
            var other = type.namespace;
            output.push('declare module ' + "'" + this.getPathTo(other.name) + "'" + ' {');
            for (var _b = 0, typeIdList_1 = typeIdList; _b < typeIdList_1.length; _b++) {
                var typeId = typeIdList_1[_b];
                type = augmentTbl[typeId].type;
                output.push('export interface _' + type.safeName + ' {');
                for (var _c = 0, _d = augmentTbl[typeId].refList; _c < _d.length; _c++) {
                    var ref = _d[_c];
                    ref.safeName = ref.member.safeName;
                }
                this.writeSubstitutions(type, augmentTbl[typeId].refList, output);
                output.push('}');
            }
            output.push('}');
        }
    };
    TS.prototype.writeContents = function () {
        var output = this.writeHeader();
        var doc = this.doc;
        var namespace = this.namespace;
        var prefix;
        output.push('');
        output = output.concat(this.exportSourceList(namespace.sourceList));
        output.push('');
        this.writeAugmentations(output);
        output.push('interface ' + baseName + ' {');
        output.push('\t_exists: boolean;');
        output.push('\t_namespace: string;');
        output.push('}');
        for (var _i = 0, _a = namespace.typeList.slice(0).sort(function (a, b) { return a.safeName.localeCompare(b.safeName); }); _i < _a.length; _i++) {
            var type = _a[_i];
            if (!type)
                continue;
            output.push(this.writeType(type));
        }
        output.push('export interface ' + docName + ' extends ' + baseName + ' {');
        for (var _b = 0, _c = doc.childList; _b < _c.length; _b++) {
            var child = _c[_b];
            var outElement = this.writeMember(child, true);
            if (outElement) {
                output.push(outElement);
            }
        }
        output.push('}');
        output.push('export var ' + docName + ': ' + docName + ';\n');
        return (output.join('\n'));
    };
    TS.prototype.getOutName = function (name) {
        return (name + '.d.ts');
    };
    return TS;
}(Exporter_1.Exporter));
exports.TS = TS;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVFMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wYXJzZXJfc2NhZmZvbGRfZ2VuZXJhdG9yL3NyYy9zY2hlbWEvZXhwb3J0ZXIvVFMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLG9FQUFvRTtBQUNwRSwrQ0FBK0M7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUcvQyx1Q0FBb0M7QUFNcEMsSUFBSSxPQUFPLEdBQUcsVUFBVSxDQUFDO0FBQ3pCLElBQUksUUFBUSxHQUFHLFVBQVUsQ0FBQztBQUUxQixpRUFBaUU7QUFFakU7SUFBd0Isc0JBQVE7SUFBaEM7UUFFQyx5Q0FBeUM7UUFGMUMscUVBNlRDO1FBREEsZUFBUyxHQUFHLEVBQUUsQ0FBQzs7SUFDaEIsQ0FBQztJQXpUTyxnQkFBYSxHQUFwQixVQUFxQixNQUFjLEVBQUUsT0FBZTtRQUNuRCxJQUFJLFFBQVEsR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ25DLElBQUksU0FBUyxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUM7UUFDaEMsSUFBSSxVQUFVLEdBQUcsQ0FBQyxDQUFDO1FBQ25CLElBQUksWUFBWSxHQUFHLENBQUMsQ0FBQztRQUNyQixJQUFJLE1BQU0sR0FBYSxFQUFFLENBQUM7UUFDMUIsSUFBSSxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBRXBCLEtBQWdCLFVBQVEsRUFBUixxQkFBUSxFQUFSLHNCQUFRLEVBQVIsSUFBUSxFQUFFO1lBQXRCLElBQUksSUFBSSxpQkFBQTtZQUNYLDBDQUEwQztZQUMxQyxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1lBRW5CLElBQUcsQ0FBQyxJQUFJO2dCQUFFLEVBQUUsVUFBVSxDQUFDO2lCQUNsQjtnQkFDSixJQUFHLFVBQVUsSUFBSSxZQUFZO29CQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxDQUFDO2dCQUU1RCxNQUFNLENBQUMsSUFB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U0FBQTtZQUNaLElBQUksVUFBVSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQy9DLElBQUcsVUFBVSxFQUFFO2dCQUNkLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7YUFDeEI7U0FDRDtRQUVELE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDakIsTUFBTSxDQUFDLElBQUksQ0FBQyxhQUFhLEdBQUcsT0FBTyxHQUFHLElBQUksR0FBRyxPQUFPLEdBQUcsS0FBSyxDQUFDLENBQUM7UUFFOUQsT0FBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUMzQixDQUFDO0lBRUQsdUJBQVUsR0FBVixVQUFXLElBQVk7UUFDdEIsT0FBTSxDQUFDLElBQUksR0FBRyxPQUFPLENBQUMsQ0FBQztJQUN4QixDQUFDO0lBR0YsU0FBQztBQUFELENBQUMsQUE3VEQsQ0FBd0IsbUJBQVEsR0E2VC9CO0FBN1RZLGdCQUFFIiwic291cmNlc0NvbnRlbnQiOlsiLy8gVGhpcyBmaWxlIGlzIHBhcnQgb2YgY3hzZCwgY29weXJpZ2h0IChjKSAyMDE1LTIwMTYgQnVzRmFzdGVyIEx0ZC5cbi8vIFJlbGVhc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSwgc2VlIExJQ0VOU0UuXG5cbmltcG9ydCB7Q2FjaGV9IGZyb20gJ2NnZXQnXG5pbXBvcnQge0V4cG9ydGVyfSBmcm9tICcuL0V4cG9ydGVyJztcbmltcG9ydCB7TmFtZXNwYWNlfSBmcm9tICcuLi9OYW1lc3BhY2UnO1xuaW1wb3J0IHtNZW1iZXJ9IGZyb20gJy4uL01lbWJlcic7XG5pbXBvcnQge01lbWJlclJlZn0gZnJvbSAnLi4vTWVtYmVyUmVmJztcbmltcG9ydCB7VHlwZX0gZnJvbSAnLi4vVHlwZSc7XG5cbnZhciBkb2NOYW1lID0gJ2RvY3VtZW50JztcbnZhciBiYXNlTmFtZSA9ICdCYXNlVHlwZSc7XG5cbi8qKiBFeHBvcnQgcGFyc2VkIHNjaGVtYSB0byBhIFR5cGVTY3JpcHQgZC50cyBkZWZpbml0aW9uIGZpbGUuICovXG5cbmV4cG9ydCBjbGFzcyBUUyBleHRlbmRzIEV4cG9ydGVyIHtcblxuXHQvKiogRm9ybWF0IGFuIFhTRCBhbm5vdGF0aW9uIGFzIEpTRG9jLiAqL1xuXG5cdHN0YXRpYyBmb3JtYXRDb21tZW50KGluZGVudDogc3RyaW5nLCBjb21tZW50OiBzdHJpbmcpIHtcblx0XHR2YXIgbGluZUxpc3QgPSBjb21tZW50LnNwbGl0KCdcXG4nKTtcblx0XHR2YXIgbGluZUNvdW50ID0gbGluZUxpc3QubGVuZ3RoO1xuXHRcdHZhciBibGFua0NvdW50ID0gMDtcblx0XHR2YXIgY29udGVudENvdW50ID0gMDtcblx0XHR2YXIgb3V0cHV0OiBzdHJpbmdbXSA9IFtdO1xuXHRcdHZhciBwcmVmaXggPSAnL1xcKionO1xuXG5cdFx0Zm9yKHZhciBsaW5lIG9mIGxpbmVMaXN0KSB7XG5cdFx0XHQvLyBSZW1vdmUgbGVhZGluZyBhbmQgdHJhaWxpbmcgd2hpdGVzcGFjZS5cblx0XHRcdGxpbmUgPSBsaW5lLnRyaW0oKTtcblxuXHRcdFx0aWYoIWxpbmUpICsrYmxhbmtDb3VudDtcblx0XHRcdGVsc2Uge1xuXHRcdFx0XHRpZihibGFua0NvdW50ICYmIGNvbnRlbnRDb3VudCkgb3V0cHV0LnB1c2goaW5kZW50ICsgcHJlZml4KTtcblxuXHRcdFx0XHRvdXRwdXQucHVzaChpbmRlbnQgKyBwcmVmaXggKyAnICcgKyBsaW5lKTtcblx0XHRcdFx0cHJlZml4ID0gJyAgKic7XG5cblx0XHRcdFx0Kytjb250ZW50Q291bnQ7XG5cdFx0XHRcdGJsYW5rQ291bnQgPSAwO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGlmKG91dHB1dC5sZW5ndGgpIG91dHB1dFtvdXRwdXQubGVuZ3RoIC0gMV0gKz0gJyAqXFwvJztcblxuXHRcdHJldHVybihvdXRwdXQuam9pbignXFxuJykpO1xuXHR9XG5cblx0d3JpdGVJbXBvcnQoc2hvcnROYW1lOiBzdHJpbmcsIHJlbGF0aXZlUGF0aDogc3RyaW5nLCBhYnNvbHV0ZVBhdGg6IHN0cmluZykge1xuXHRcdHJldHVybihcblx0XHRcdCdpbXBvcnQgKiBhcyAnICtcblx0XHRcdHNob3J0TmFtZSArXG5cdFx0XHQnIGZyb20gJyArXG5cdFx0XHRcIidcIiArIHJlbGF0aXZlUGF0aCArIFwiJ1wiICtcblx0XHRcdCc7J1xuXHRcdCk7XG5cdH1cblxuXHQvKiogT3V0cHV0IGxpc3Qgb2Ygb3JpZ2luYWwgc2NoZW1hIGZpbGUgbG9jYXRpb25zLiAqL1xuXG5cdGV4cG9ydFNvdXJjZUxpc3Qoc291cmNlTGlzdDogc3RyaW5nW10pIHtcblx0XHR2YXIgb3V0cHV0OiBzdHJpbmdbXSA9IFtdO1xuXG5cdFx0b3V0cHV0LnB1c2goJy8vIFNvdXJjZSBmaWxlczonKTtcblxuXHRcdGZvcih2YXIgdXJsUmVtb3RlIG9mIHNvdXJjZUxpc3QpIHtcblx0XHRcdG91dHB1dC5wdXNoKCcvLyAnICsgdXJsUmVtb3RlKTtcblx0XHR9XG5cblx0XHRvdXRwdXQucHVzaCgnJyk7XG5cdFx0cmV0dXJuKG91dHB1dCk7XG5cdH1cblxuXHR3cml0ZVR5cGVSZWYodHlwZTogVHlwZSwgbmFtZVByZWZpeDogc3RyaW5nKSB7XG5cdFx0dmFyIG91dHB1dDogc3RyaW5nW10gPSBbXTtcblxuXHRcdHZhciBuYW1lc3BhY2UgPSB0eXBlLm5hbWVzcGFjZTtcblx0XHR2YXIgbmFtZSA9IG5hbWVQcmVmaXggKyB0eXBlLnNhZmVOYW1lO1xuXG5cdFx0aWYoIW5hbWVzcGFjZSB8fCBuYW1lc3BhY2UgPT0gdGhpcy5uYW1lc3BhY2UpIHtcblx0XHRcdG91dHB1dC5wdXNoKG5hbWUpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHQvLyBUeXBlIGZyb20gYW5vdGhlciwgaW1wb3J0ZWQgbmFtZXNwYWNlLlxuXG5cdFx0XHR2YXIgc2hvcnQgPSB0aGlzLm5hbWVzcGFjZS5nZXRTaG9ydFJlZihuYW1lc3BhY2UuaWQpO1xuXG5cdFx0XHRpZihzaG9ydCkge1xuXHRcdFx0XHRvdXRwdXQucHVzaChzaG9ydCArICcuJyArIG5hbWUpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0Y29uc29sZS5lcnJvcignTUlTU0lORyBJTVBPUlQgJyArIG5hbWVzcGFjZS5uYW1lICsgJyBmb3IgdHlwZSAnICsgdHlwZS5uYW1lKTtcblx0XHRcdFx0b3V0cHV0LnB1c2goJ2FueScpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybihvdXRwdXQuam9pbignJykpO1xuXHR9XG5cblx0d3JpdGVQYXJlbnRzKHBhcmVudERlZjogc3RyaW5nLCBtaXhpbkxpc3Q6IFR5cGVbXSkge1xuXHRcdHZhciBwYXJlbnRMaXN0OiBzdHJpbmdbXSA9IFtdO1xuXG5cdFx0aWYocGFyZW50RGVmKSBwYXJlbnRMaXN0LnB1c2gocGFyZW50RGVmKTtcblxuXHRcdGZvcih2YXIgdHlwZSBvZiBtaXhpbkxpc3QgfHwgW10pIHtcblx0XHRcdHBhcmVudExpc3QucHVzaCh0aGlzLndyaXRlVHlwZVJlZih0eXBlLCAnXycpKTtcblx0XHR9XG5cblx0XHRpZighcGFyZW50TGlzdC5sZW5ndGgpIHBhcmVudExpc3QucHVzaChiYXNlTmFtZSk7XG5cblx0XHRyZXR1cm4oJyBleHRlbmRzICcgKyBwYXJlbnRMaXN0LmpvaW4oJywgJykpO1xuXHR9XG5cblx0d3JpdGVUeXBlTGlzdChyZWY6IE1lbWJlclJlZikge1xuXHRcdHZhciB0eXBlTGlzdCA9IHJlZi5tZW1iZXIudHlwZUxpc3Q7XG5cblx0XHRpZihyZWYubWF4ID4gMSAmJiByZWYubWVtYmVyLnByb3h5KSB0eXBlTGlzdCA9IFtyZWYubWVtYmVyLnByb3h5XTtcblxuXHRcdHZhciBvdXRUeXBlTGlzdCA9IHR5cGVMaXN0Lm1hcChcblx0XHRcdCh0eXBlOiBUeXBlKSA9PiB7XG5cdFx0XHRcdGlmKHR5cGUuaXNQbGFpblByaW1pdGl2ZSAmJiAoIXR5cGUubGl0ZXJhbExpc3QgfHwgIXR5cGUubGl0ZXJhbExpc3QubGVuZ3RoKSkge1xuXHRcdFx0XHRcdHJldHVybih0eXBlLnByaW1pdGl2ZVR5cGUubmFtZSk7XG5cdFx0XHRcdH0gZWxzZSByZXR1cm4odGhpcy53cml0ZVR5cGVSZWYodHlwZSwgJycpKTtcblx0XHRcdH1cblx0XHQpO1xuXG5cdFx0aWYob3V0VHlwZUxpc3QubGVuZ3RoID09IDApIHJldHVybihudWxsKTtcblxuXHRcdHZhciBvdXRUeXBlcyA9IG91dFR5cGVMaXN0LnNvcnQoKS5qb2luKCcgfCAnKTtcblxuXHRcdGlmKHJlZi5tYXggPiAxKSB7XG5cdFx0XHRpZihvdXRUeXBlTGlzdC5sZW5ndGggPiAxKSByZXR1cm4oJygnICsgb3V0VHlwZXMgKyAnKVtdJyk7XG5cdFx0XHRlbHNlIHJldHVybihvdXRUeXBlcyArICdbXScpO1xuXHRcdH0gZWxzZSByZXR1cm4ob3V0VHlwZXMpO1xuXHR9XG5cblx0d3JpdGVNZW1iZXIocmVmOiBNZW1iZXJSZWYsIGlzR2xvYmFsOiBib29sZWFuKSB7XG5cdFx0dmFyIG91dHB1dDogc3RyaW5nW10gPSBbXTtcblx0XHR2YXIgbWVtYmVyID0gcmVmLm1lbWJlcjtcblx0XHR2YXIgY29tbWVudCA9IG1lbWJlci5jb21tZW50O1xuXHRcdHZhciBpbmRlbnQgPSAnXFx0JztcblxuXHRcdGlmKChyZWYgYXMgYW55KS5pc0hpZGRlbikgcmV0dXJuKCcnKTtcblx0XHRpZihpc0dsb2JhbCAmJiBtZW1iZXIuaXNBYnN0cmFjdCkgcmV0dXJuKCcnKTtcblx0XHRpZihtZW1iZXIubmFtZSA9PSAnKicpIHJldHVybignJyk7XG5cblx0XHRpZihjb21tZW50KSB7XG5cdFx0XHRvdXRwdXQucHVzaChUUy5mb3JtYXRDb21tZW50KGluZGVudCwgY29tbWVudCkpO1xuXHRcdFx0b3V0cHV0LnB1c2goJ1xcbicpO1xuXHRcdH1cblxuXHRcdG91dHB1dC5wdXNoKGluZGVudCArIHJlZi5zYWZlTmFtZSk7XG5cdFx0aWYocmVmLm1pbiA9PSAwKSBvdXRwdXQucHVzaCgnPycpO1xuXHRcdG91dHB1dC5wdXNoKCc6ICcpO1xuXG5cdFx0dmFyIG91dFR5cGVzID0gdGhpcy53cml0ZVR5cGVMaXN0KHJlZik7XG5cdFx0aWYoIW91dFR5cGVzKSByZXR1cm4oJycpO1xuXG5cdFx0b3V0cHV0LnB1c2gob3V0VHlwZXMpO1xuXHRcdG91dHB1dC5wdXNoKCc7Jyk7XG5cblx0XHRyZXR1cm4ob3V0cHV0LmpvaW4oJycpKTtcblx0fVxuXG5cdHdyaXRlVHlwZUNvbnRlbnQodHlwZTogVHlwZSkge1xuXHRcdHZhciBvdXRwdXQ6IHN0cmluZ1tdID0gW107XG5cblx0XHRpZih0eXBlLmlzUGxhaW5QcmltaXRpdmUpIHtcblx0XHRcdHZhciBsaXRlcmFsTGlzdCA9IHR5cGUubGl0ZXJhbExpc3Q7XG5cblx0XHRcdGlmKGxpdGVyYWxMaXN0ICYmIGxpdGVyYWxMaXN0Lmxlbmd0aCA+IDApIHtcblx0XHRcdFx0aWYobGl0ZXJhbExpc3QubGVuZ3RoID4gMSkge1xuXHRcdFx0XHRcdG91dHB1dC5wdXNoKCcoJyArIGxpdGVyYWxMaXN0LmpvaW4oJyB8ICcpICsgJyknKTtcblx0XHRcdFx0fSBlbHNlIG91dHB1dC5wdXNoKGxpdGVyYWxMaXN0WzBdKTtcblx0XHRcdH0gZWxzZSBvdXRwdXQucHVzaCh0eXBlLnByaW1pdGl2ZVR5cGUubmFtZSk7XG5cdFx0fSBlbHNlIGlmKHR5cGUuaXNMaXN0KSB7XG5cdFx0XHRvdXRwdXQucHVzaCh0aGlzLndyaXRlVHlwZUxpc3QodHlwZS5jaGlsZExpc3RbMF0pKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dmFyIG91dE1lbWJlckxpc3Q6IHN0cmluZ1tdID0gW107XG5cblx0XHRcdHZhciBvdXRwdXQ6IHN0cmluZ1tdID0gW107XG5cdFx0XHR2YXIgcGFyZW50VHlwZSA9IHR5cGUucGFyZW50O1xuXG5cdFx0XHRmb3IodmFyIGF0dHJpYnV0ZSBvZiB0eXBlLmF0dHJpYnV0ZUxpc3QpIHtcblx0XHRcdFx0dmFyIG91dEF0dHJpYnV0ZSA9IHRoaXMud3JpdGVNZW1iZXIoYXR0cmlidXRlLCBmYWxzZSk7XG5cdFx0XHRcdGlmKG91dEF0dHJpYnV0ZSkgb3V0TWVtYmVyTGlzdC5wdXNoKG91dEF0dHJpYnV0ZSk7XG5cdFx0XHR9XG5cblx0XHRcdGZvcih2YXIgY2hpbGQgb2YgdHlwZS5jaGlsZExpc3QpIHtcblx0XHRcdFx0dmFyIG91dENoaWxkID0gdGhpcy53cml0ZU1lbWJlcihjaGlsZCwgZmFsc2UpO1xuXHRcdFx0XHRpZihvdXRDaGlsZCkgb3V0TWVtYmVyTGlzdC5wdXNoKG91dENoaWxkKTtcblx0XHRcdH1cblxuXHRcdFx0b3V0cHV0LnB1c2goJ3snKTtcblxuXHRcdFx0aWYob3V0TWVtYmVyTGlzdC5sZW5ndGgpIHtcblx0XHRcdFx0b3V0cHV0LnB1c2goJ1xcbicpO1xuXHRcdFx0XHRvdXRwdXQucHVzaChvdXRNZW1iZXJMaXN0LmpvaW4oJ1xcbicpKTtcblx0XHRcdFx0b3V0cHV0LnB1c2goJ1xcbicpO1xuXHRcdFx0fVxuXG5cdFx0XHRvdXRwdXQucHVzaCgnfScpO1xuXHRcdH1cblxuXHRcdHJldHVybihvdXRwdXQuam9pbignJykpO1xuXHR9XG5cblx0d3JpdGVUeXBlKHR5cGU6IFR5cGUpIHtcblx0XHR2YXIgbmFtZXNwYWNlID0gdGhpcy5uYW1lc3BhY2U7XG5cdFx0dmFyIG91dHB1dDogc3RyaW5nW10gPSBbXTtcblx0XHR2YXIgY29tbWVudCA9IHR5cGUuY29tbWVudDtcblx0XHR2YXIgcGFyZW50RGVmOiBzdHJpbmc7XG5cdFx0dmFyIGV4cG9ydFByZWZpeCA9IHR5cGUuaXNFeHBvcnRlZCA/ICdleHBvcnQgJyA6ICcnO1xuXG5cdFx0dmFyIG5hbWUgPSB0eXBlLnNhZmVOYW1lO1xuXG5cdFx0aWYoY29tbWVudCkge1xuXHRcdFx0b3V0cHV0LnB1c2goVFMuZm9ybWF0Q29tbWVudCgnJywgY29tbWVudCkpO1xuXHRcdFx0b3V0cHV0LnB1c2goJ1xcbicpO1xuXHRcdH1cblxuXHRcdHZhciBjb250ZW50ID0gdGhpcy53cml0ZVR5cGVDb250ZW50KHR5cGUpO1xuXG5cdFx0aWYobmFtZXNwYWNlLmlzUHJpbWl0aXZlU3BhY2UpIHtcblx0XHRcdG91dHB1dC5wdXNoKGV4cG9ydFByZWZpeCArICdpbnRlcmZhY2UgXycgKyBuYW1lICsgdGhpcy53cml0ZVBhcmVudHMobnVsbCwgdHlwZS5taXhpbkxpc3QpICsgJyB7ICcgKyAnY29udGVudCcgKyAnOiAnICsgdHlwZS5wcmltaXRpdmVUeXBlLm5hbWUgKyAnOyB9JyArICdcXG4nKTtcblx0XHR9IGVsc2UgaWYodHlwZS5pc0xpc3QpIHtcblx0XHRcdG91dHB1dC5wdXNoKGV4cG9ydFByZWZpeCArICd0eXBlICcgKyBuYW1lICsgJyA9ICcgKyBjb250ZW50ICsgJzsnICsgJ1xcbicpO1xuXHRcdH0gZWxzZSBpZih0eXBlLmlzUGxhaW5QcmltaXRpdmUpIHtcblx0XHRcdHBhcmVudERlZiA9IHRoaXMud3JpdGVUeXBlUmVmKHR5cGUucGFyZW50LCAnXycpO1xuXG5cdFx0XHRvdXRwdXQucHVzaChleHBvcnRQcmVmaXggKyAndHlwZSAnICsgbmFtZSArICcgPSAnICsgY29udGVudCArICc7JyArICdcXG4nKTtcblx0XHRcdGlmKHR5cGUubGl0ZXJhbExpc3QgJiYgdHlwZS5saXRlcmFsTGlzdC5sZW5ndGgpIHtcblx0XHRcdFx0b3V0cHV0LnB1c2goJ2ludGVyZmFjZSBfJyArIG5hbWUgKyB0aGlzLndyaXRlUGFyZW50cyhwYXJlbnREZWYsIHR5cGUubWl4aW5MaXN0KSArICcgeyAnICsgJ2NvbnRlbnQnICsgJzogJyArIG5hbWUgKyAnOyB9JyArICdcXG4nKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdC8vIE5PVEU6IFN1YnN0aXR1dGlvbiBncm91cHMgYXJlIGlnbm9yZWQgaGVyZSFcblx0XHRcdFx0b3V0cHV0LnB1c2goJ3R5cGUgXycgKyBuYW1lICsgJyA9ICcgKyBwYXJlbnREZWYgKyAnOycgKyAnXFxuJyk7XG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdGlmKHR5cGUucGFyZW50KSBwYXJlbnREZWYgPSB0aGlzLndyaXRlVHlwZVJlZih0eXBlLnBhcmVudCwgJ18nKTtcblxuXHRcdFx0b3V0cHV0LnB1c2goJ2ludGVyZmFjZSBfJyArIG5hbWUgKyB0aGlzLndyaXRlUGFyZW50cyhwYXJlbnREZWYsIHR5cGUubWl4aW5MaXN0KSArICcgJyArIGNvbnRlbnQgKyAnXFxuJyk7XG5cdFx0XHRvdXRwdXQucHVzaChleHBvcnRQcmVmaXggKyAnaW50ZXJmYWNlICcgKyBuYW1lICsgJyBleHRlbmRzIF8nICsgbmFtZSArICcgeyBjb25zdHJ1Y3RvcjogeyBuZXcoKTogJyArIG5hbWUgKyAnIH07IH0nICsgJ1xcbicpO1xuXHRcdFx0aWYodHlwZS5pc0V4cG9ydGVkKSBvdXRwdXQucHVzaChleHBvcnRQcmVmaXggKyAndmFyICcgKyBuYW1lICsgJzogeyBuZXcoKTogJyArIG5hbWUgKyAnIH07JyArICdcXG4nKTtcblx0XHR9XG5cblx0XHRyZXR1cm4ob3V0cHV0LmpvaW4oJycpKTtcblx0fVxuXG5cdHdyaXRlU3Vic3RpdHV0aW9ucyh0eXBlOiBUeXBlLCByZWZMaXN0OiBNZW1iZXJSZWZbXSwgb3V0cHV0OiBzdHJpbmdbXSkge1xuXHRcdGZvcih2YXIgcmVmIG9mIHJlZkxpc3QpIHtcblx0XHRcdHZhciBwcm94eSA9IHJlZi5tZW1iZXIucHJveHk7XG5cblx0XHRcdGlmKCFyZWYubWVtYmVyLmlzQWJzdHJhY3QpIG91dHB1dC5wdXNoKHRoaXMud3JpdGVNZW1iZXIocmVmLCBmYWxzZSkpO1xuXG5cdFx0XHRpZihwcm94eSAmJiBwcm94eSAhPSB0eXBlKSB0aGlzLndyaXRlU3Vic3RpdHV0aW9ucyhwcm94eSwgcHJveHkuY2hpbGRMaXN0LCBvdXRwdXQpO1xuXHRcdH1cblxuXHRcdGZvcih2YXIgbWl4aW4gb2YgdHlwZS5taXhpbkxpc3QpIHtcblx0XHRcdGlmKG1peGluICE9IHR5cGUpIHRoaXMud3JpdGVTdWJzdGl0dXRpb25zKG1peGluLCBtaXhpbi5jaGlsZExpc3QsIG91dHB1dCk7XG5cdFx0fVxuXHR9XG5cblx0d3JpdGVBdWdtZW50YXRpb25zKG91dHB1dDogc3RyaW5nW10pIHtcblx0XHR2YXIgbmFtZXNwYWNlID0gdGhpcy5uYW1lc3BhY2U7XG5cblx0XHRmb3IodmFyIG5hbWVzcGFjZUlkIG9mIE9iamVjdC5rZXlzKG5hbWVzcGFjZS5hdWdtZW50VGJsKSkge1xuXHRcdFx0dmFyIGF1Z21lbnRUYmwgPSBuYW1lc3BhY2UuYXVnbWVudFRibFtuYW1lc3BhY2VJZF07XG5cdFx0XHR2YXIgdHlwZUlkTGlzdCA9IE9iamVjdC5rZXlzKGF1Z21lbnRUYmwpO1xuXHRcdFx0dmFyIHR5cGUgPSBhdWdtZW50VGJsW3R5cGVJZExpc3RbMF1dLnR5cGU7XG5cdFx0XHR2YXIgb3RoZXIgPSB0eXBlLm5hbWVzcGFjZTtcblxuXHRcdFx0b3V0cHV0LnB1c2goJ2RlY2xhcmUgbW9kdWxlICcgKyBcIidcIiArIHRoaXMuZ2V0UGF0aFRvKG90aGVyLm5hbWUpICsgXCInXCIgKyAnIHsnKTtcblxuXHRcdFx0Zm9yKHZhciB0eXBlSWQgb2YgdHlwZUlkTGlzdCkge1xuXHRcdFx0XHR0eXBlID0gYXVnbWVudFRibFt0eXBlSWRdLnR5cGU7XG5cblx0XHRcdFx0b3V0cHV0LnB1c2goJ2V4cG9ydCBpbnRlcmZhY2UgXycgKyB0eXBlLnNhZmVOYW1lICsgJyB7Jyk7XG5cblx0XHRcdFx0Zm9yKHZhciByZWYgb2YgYXVnbWVudFRibFt0eXBlSWRdLnJlZkxpc3QpIHtcblx0XHRcdFx0XHRyZWYuc2FmZU5hbWUgPSByZWYubWVtYmVyLnNhZmVOYW1lO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0dGhpcy53cml0ZVN1YnN0aXR1dGlvbnModHlwZSwgYXVnbWVudFRibFt0eXBlSWRdLnJlZkxpc3QsIG91dHB1dCk7XG5cblx0XHRcdFx0b3V0cHV0LnB1c2goJ30nKTtcblx0XHRcdH1cblxuXHRcdFx0b3V0cHV0LnB1c2goJ30nKTtcblx0XHR9XG5cdH1cblxuXHR3cml0ZUNvbnRlbnRzKCk6IHN0cmluZyB7XG5cdFx0dmFyIG91dHB1dCA9IHRoaXMud3JpdGVIZWFkZXIoKTtcblx0XHR2YXIgZG9jID0gdGhpcy5kb2M7XG5cdFx0dmFyIG5hbWVzcGFjZSA9IHRoaXMubmFtZXNwYWNlO1xuXHRcdHZhciBwcmVmaXg6IHN0cmluZztcblxuXHRcdG91dHB1dC5wdXNoKCcnKTtcblx0XHRvdXRwdXQgPSBvdXRwdXQuY29uY2F0KHRoaXMuZXhwb3J0U291cmNlTGlzdChuYW1lc3BhY2Uuc291cmNlTGlzdCkpO1xuXG5cdFx0b3V0cHV0LnB1c2goJycpO1xuXHRcdHRoaXMud3JpdGVBdWdtZW50YXRpb25zKG91dHB1dCk7XG5cblx0XHRvdXRwdXQucHVzaCgnaW50ZXJmYWNlICcgKyBiYXNlTmFtZSArICcgeycpO1xuXHRcdG91dHB1dC5wdXNoKCdcXHRfZXhpc3RzOiBib29sZWFuOycpO1xuXHRcdG91dHB1dC5wdXNoKCdcXHRfbmFtZXNwYWNlOiBzdHJpbmc7Jyk7XG5cdFx0b3V0cHV0LnB1c2goJ30nKTtcblxuXHRcdGZvcih2YXIgdHlwZSBvZiBuYW1lc3BhY2UudHlwZUxpc3Quc2xpY2UoMCkuc29ydCgoYTogVHlwZSwgYjogVHlwZSkgPT4gYS5zYWZlTmFtZS5sb2NhbGVDb21wYXJlKGIuc2FmZU5hbWUpKSkge1xuXHRcdFx0aWYoIXR5cGUpIGNvbnRpbnVlO1xuXG5cdFx0XHRvdXRwdXQucHVzaCh0aGlzLndyaXRlVHlwZSh0eXBlKSk7XG5cdFx0fVxuXG5cdFx0b3V0cHV0LnB1c2goJ2V4cG9ydCBpbnRlcmZhY2UgJyArIGRvY05hbWUgKyAnIGV4dGVuZHMgJyArIGJhc2VOYW1lICsgJyB7Jyk7XG5cblx0XHRmb3IodmFyIGNoaWxkIG9mIGRvYy5jaGlsZExpc3QpIHtcblx0XHRcdHZhciBvdXRFbGVtZW50ID0gdGhpcy53cml0ZU1lbWJlcihjaGlsZCwgdHJ1ZSk7XG5cdFx0XHRpZihvdXRFbGVtZW50KSB7XG5cdFx0XHRcdG91dHB1dC5wdXNoKG91dEVsZW1lbnQpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdG91dHB1dC5wdXNoKCd9Jyk7XG5cdFx0b3V0cHV0LnB1c2goJ2V4cG9ydCB2YXIgJyArIGRvY05hbWUgKyAnOiAnICsgZG9jTmFtZSArICc7XFxuJyk7XG5cblx0XHRyZXR1cm4ob3V0cHV0LmpvaW4oJ1xcbicpKTtcblx0fVxuXG5cdGdldE91dE5hbWUobmFtZTogc3RyaW5nKSB7XG5cdFx0cmV0dXJuKG5hbWUgKyAnLmQudHMnKTtcblx0fVxuXG5cdGNvbnN0cnVjdCA9IFRTO1xufVxuIl19