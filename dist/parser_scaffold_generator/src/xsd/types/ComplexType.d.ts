import { State } from '../State';
import { QName } from '../QName';
import * as types from '../types';
/** <xsd:complextype> */
export declare class ComplexType extends types.TypeBase {
    static mayContain: () => types.BaseClass[];
}
export declare class ContentBase extends types.Base {
    static mayContain: () => types.BaseClass[];
    resolve(state: State): void;
    parent: types.TypeBase | QName;
}
/** <xsd:simplecontent> */
export declare class SimpleContent extends ContentBase {
}
/** <xsd:complexcontent> */
export declare class ComplexContent extends ContentBase {
}
//# sourceMappingURL=ComplexType.d.ts.map