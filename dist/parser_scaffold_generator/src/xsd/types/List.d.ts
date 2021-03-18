import { State } from '../State';
import * as types from '../types';
import { TypedBase } from './TypedBase';
/** <xsd:list> */
export declare class List extends TypedBase {
    static mayContain: () => types.BaseClass[];
    resolve(state: State): void;
    itemType: string;
}
//# sourceMappingURL=List.d.ts.map