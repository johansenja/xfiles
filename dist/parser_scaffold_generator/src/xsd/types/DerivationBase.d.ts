import { State } from '../State';
import * as types from '../types';
/** Derived type support, allows types to inherit others. */
export declare class DerivationBase extends types.Base {
    static mayContain: () => types.BaseClass[];
    resolve(state: State): void;
    id: string;
    base: string;
}
//# sourceMappingURL=DerivationBase.d.ts.map