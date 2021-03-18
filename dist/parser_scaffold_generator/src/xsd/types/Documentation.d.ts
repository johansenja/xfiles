import { State } from '../State';
import * as types from '../types';
/** <xsd:documentation>
  * Works like a comment usable in almost any part of the schema. */
export declare class Documentation extends types.Base {
    init(state: State): void;
    addText(state: State, text: string): void;
    loaded(state: State): void;
    resolve(state: State): void;
    commentList: string[];
}
//# sourceMappingURL=Documentation.d.ts.map