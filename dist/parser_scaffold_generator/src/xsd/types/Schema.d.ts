import { State } from '../State';
import * as types from '../types';
/** Schema root element */
export declare class Root extends types.Base {
    static mayContain: () => types.BaseClass[];
}
/** <xsd:schema> */
export declare class Schema extends types.Base {
    static mayContain: () => types.BaseClass[];
    init(state: State): void;
}
//# sourceMappingURL=Schema.d.ts.map