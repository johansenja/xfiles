import { State } from '../State';
import * as types from '../types';
/** <xsd:attributeGroup>
  * Defines several attributes that can be included together in type definitions. */
export declare class AttributeGroup extends types.Base {
    static mayContain: () => types.BaseClass[];
    init(state: State): void;
    resolve(state: State): void;
    id: string;
    name: string;
    ref: string;
}
//# sourceMappingURL=AttributeGroup.d.ts.map