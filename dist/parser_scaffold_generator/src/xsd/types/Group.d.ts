import { State } from '../State';
import { ElementLike } from './Element';
import * as types from '../types';
export declare class GroupBase extends types.Base implements ElementLike {
    init(state: State): void;
    id: string;
    minOccurs: string;
    maxOccurs: string;
    min: number;
    max: number;
}
export declare class GenericChildList extends GroupBase {
    static mayContain: () => types.BaseClass[];
    resolve(state: State): void;
}
export declare class Sequence extends GenericChildList {
}
export declare class Choice extends GenericChildList {
}
export declare class All extends GenericChildList {
}
export declare class Group extends GroupBase {
    static mayContain: () => types.BaseClass[];
    init(state: State): void;
    resolve(state: State): void;
    name: string;
    ref: string;
}
//# sourceMappingURL=Group.d.ts.map