import { State } from '../State';
import { DerivationBase } from './DerivationBase';
import * as types from '../types';
/** <xsd:restriction>
  * The schema allows a restriction to contain anything, but we parse only some useful restrictions. */
export declare class Restriction extends DerivationBase {
    static mayContain: () => types.BaseClass[];
    init(state: State): void;
    addEnumeration(content: string): void;
    private parent;
    private enumerationList;
}
//# sourceMappingURL=Restriction.d.ts.map