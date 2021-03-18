import { State } from '../State';
import * as types from '../types';
/** <xsd:anyAttribute> */
export declare class AnyAttribute extends types.Attribute {
    init(state: State): void;
    resolve(state: State): void;
    namespace: string;
    processContents: 'lax' | 'skip' | 'strict';
}
//# sourceMappingURL=AnyAttribute.d.ts.map