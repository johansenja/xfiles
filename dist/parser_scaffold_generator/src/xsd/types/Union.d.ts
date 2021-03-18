import { State } from '../State';
import * as types from '../types';
import { TypedBase } from './TypedBase';
/** <xsd:union> */
export declare class Union extends TypedBase {
    static mayContain: () => types.BaseClass[];
    resolve(state: State): void;
    memberType: string;
}
//# sourceMappingURL=Union.d.ts.map