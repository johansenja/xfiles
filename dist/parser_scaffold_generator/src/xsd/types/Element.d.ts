import { State } from '../State';
import { MemberBase } from './MemberBase';
import * as types from '../types';
export interface ElementLike {
    id: string;
    minOccurs: string;
    maxOccurs: string;
    min: number;
    max: number;
}
/** <xsd:element> */
export declare class Element extends MemberBase implements ElementLike {
    static mayContain: () => types.BaseClass[];
    init(state: State): void;
    resolve(state: State): void;
    isAbstract(): boolean;
    minOccurs: string;
    maxOccurs: string;
    default: string;
    /** Abstract elements are disallowed in the XML document,
      * and another member of the same substitution group should be used. */
    abstract: string;
    substitutionGroup: string;
    substitutes: Element;
    isSubstituted: boolean;
}
//# sourceMappingURL=Element.d.ts.map