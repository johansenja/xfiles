import { State } from '../State';
import * as types from '../types';
export declare class Any extends types.Element {
    init(state: State): void;
    resolve(state: State): void;
    namespace: string;
    processContents: 'lax' | 'skip' | 'strict';
}
//# sourceMappingURL=Any.d.ts.map