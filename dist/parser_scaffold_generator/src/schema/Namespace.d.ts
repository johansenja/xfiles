import * as cxml from "../../../runtime_parser";
import { Context } from "./Context";
import { Type } from "./Type";
import { Member } from "./Member";
import { MemberRef } from "./MemberRef";
export interface ImportContent {
    typeTbl: {
        [key: string]: Type;
    };
    memberTbl: {
        [key: string]: Member;
    };
}
export declare class Namespace extends cxml.NamespaceBase<Context, Namespace> {
    addRef(shortName: string, namespace: Namespace): void;
    getShortRef(id: number): string;
    getUsedImportTbl(): {
        [short: string]: Namespace;
    };
    getUsedImportList(): Namespace[];
    addType(type: Type): void;
    addMember(member: Member): void;
    /** Augment type in another namespace with member from this namespace. */
    addAugmentation(type: Type, member: Member): void;
    /** Invisible document element defining the types of XML file root elements. */
    doc: Type;
    /** All types used in the document. */
    typeList: Type[];
    /** All members used in the document. */
    memberList: Member[];
    /** Types from other namespaces augmented with members from this namespace. */
    augmentTbl: {
        [namespaceId: string]: {
            [typeId: string]: {
                type: Type;
                refList: MemberRef[];
            };
        };
    };
    pendingSubstituteList: Member[];
    /** List of URL addresses of files with definitions for this namespace. */
    sourceList: string[];
    /** Short names used to reference other namespaces in schemas defining this namespace. */
    shortNameTbl: {
        [namespaceId: string]: string[];
    };
    /** Table of namespaces actually imported, by short name. */
    private importTbl;
    /** List of referenced type names from each imported namespace. */
    importContentTbl: {
        [namespaceId: string]: ImportContent;
    };
    /** True only for the special namespace containing primitives. */
    isPrimitiveSpace: boolean;
}
//# sourceMappingURL=Namespace.d.ts.map