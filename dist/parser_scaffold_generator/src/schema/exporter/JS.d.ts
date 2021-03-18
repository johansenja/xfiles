import { Exporter } from './Exporter';
import { Namespace } from '../Namespace';
import { Member } from '../Member';
import { MemberRef } from '../MemberRef';
import { Type } from '../Type';
export declare type NumTbl = {
    [id: string]: number;
};
export declare class JS extends Exporter {
    writeImport(shortName: string, relativePath: string, absolutePath: string): string;
    writeMember(member: Member, typeNumTbl: NumTbl, memberNumTbl: NumTbl): string;
    writeMemberRef(ref: MemberRef, memberNumTbl: NumTbl): string;
    writeType(type: Type, typeNumTbl: NumTbl, memberNumTbl: NumTbl): string;
    buildTypeList(namespace: Namespace): {
        all: Type[];
        exported: Type[];
    };
    buildMemberList(namespace: Namespace): {
        all: Member[];
        exported: Member[];
    };
    /** Output namespace contents to the given cache key. */
    writeContents(): string;
    getOutName(name: string): string;
    construct: typeof JS;
}
//# sourceMappingURL=JS.d.ts.map