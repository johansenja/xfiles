import { State } from '../State';
import { MemberBase } from './MemberBase';
import * as types from '../types';
export declare type XmlAttribute = string | number;
/** <xsd:attribute> */
export declare class Attribute extends MemberBase {
    static mayContain: () => types.BaseClass[];
    init(state: State): void;
    resolve(state: State): void;
    use: string;
    default: XmlAttribute;
}
//# sourceMappingURL=Attribute.d.ts.map