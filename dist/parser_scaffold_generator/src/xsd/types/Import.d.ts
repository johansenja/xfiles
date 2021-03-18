import { State } from '../State';
import * as types from '../types';
/** <xsd:include> */
export declare class Include extends types.Base {
    static mayContain: () => types.BaseClass[];
    init(state: State): void;
    id: string;
    schemaLocation: string;
}
/** <xsd:import> */
export declare class Import extends Include {
    init(state: State): void;
    namespace: string;
}
//# sourceMappingURL=Import.d.ts.map