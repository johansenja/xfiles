import * as cxml from "../../../runtime_parser";
import { Namespace } from './Namespace';
import { Type } from './Type';
import { MemberRef } from './MemberRef';
export declare class Member extends cxml.MemberBase<Member, Namespace, cxml.ItemBase<Member>> {
    constructor(name: string);
    getRef(): MemberRef;
    getProxy(): Type;
    typeList: Type[];
    substitutes: Member;
    /** Proxy type containing other substitution group members. */
    proxy: Type;
    comment: string;
    isExported: boolean;
    surrogateKey: number;
    private static nextKey;
}
//# sourceMappingURL=Member.d.ts.map