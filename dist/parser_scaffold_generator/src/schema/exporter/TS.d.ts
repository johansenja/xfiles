import { Exporter } from './Exporter';
import { MemberRef } from '../MemberRef';
import { Type } from '../Type';
/** Export parsed schema to a TypeScript d.ts definition file. */
export declare class TS extends Exporter {
    /** Format an XSD annotation as JSDoc. */
    static formatComment(indent: string, comment: string): string;
    writeImport(shortName: string, relativePath: string, absolutePath: string): string;
    /** Output list of original schema file locations. */
    exportSourceList(sourceList: string[]): string[];
    writeTypeRef(type: Type, namePrefix: string): string;
    writeParents(parentDef: string, mixinList: Type[]): string;
    writeTypeList(ref: MemberRef): string;
    writeMember(ref: MemberRef, isGlobal: boolean): string;
    writeTypeContent(type: Type): string;
    writeType(type: Type): string;
    writeSubstitutions(type: Type, refList: MemberRef[], output: string[]): void;
    writeAugmentations(output: string[]): void;
    writeContents(): string;
    getOutName(name: string): string;
    construct: typeof TS;
}
//# sourceMappingURL=TS.d.ts.map