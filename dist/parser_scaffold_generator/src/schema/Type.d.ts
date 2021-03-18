import { Namespace } from './Namespace';
import { Member } from './Member';
import { MemberRef } from './MemberRef';
export declare class Type {
    constructor(name: string);
    addAttribute(ref: MemberRef): void;
    addChild(ref: MemberRef): void;
    addChildSpec(spec: Member): void;
    addMixin(type: Type): void;
    name: string;
    namespace: Namespace;
    safeName: string;
    bytePos: number;
    /** Primitive type of child text node if defined
      * (representable as a JavaScript value). */
    primitiveType: Type;
    /** List of allowed literal values, if such a restriction is defined. */
    literalList: string[];
    /** Type only contains a child text node and no other data. */
    isPlainPrimitive: boolean;
    isList: boolean;
    isProxy: boolean;
    isExported: boolean;
    attributeTbl: {
        [name: string]: MemberRef;
    };
    childTbl: {
        [name: string]: MemberRef;
    };
    /** XML attributes in an element of this type. */
    attributeList: MemberRef[];
    /** Allowed child elements for an element of this type. */
    childList: MemberRef[];
    /** Other types added as mixins. */
    mixinList: Type[];
    /** Parent type this is derived from. */
    parent: Type;
    /** For an anonymous type, the member (of another type) that it defines.
      * Used for giving the type a descriptive name. */
    containingType: Type;
    containingRef: MemberRef;
    comment: string;
    surrogateKey: number;
    private static nextKey;
    static primitiveFlag: number;
    static plainPrimitiveFlag: number;
    static listFlag: number;
}
//# sourceMappingURL=Type.d.ts.map