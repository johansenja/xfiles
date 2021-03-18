import { Type } from '../Type';
import { Member } from '../Member';
import { Transform } from './Transform';
export interface AnonType {
    type: Type;
    memberTypeList: Type[];
}
export interface State {
    pendingAnonTbl: {
        [typeId: string]: AnonType;
    };
    pendingAnonList: Type[];
    typeListList: Type[][];
}
export declare class Sanitize extends Transform<Sanitize, void, State> {
    prepare(): void;
    renameDuplicates(typeList: Type[]): void;
    finish(): void;
    visitType(type: Type): void;
    addNameToType(type: Type): void;
    addNameToMemberTypes(type: Type, member: Member): void;
    protected state: State;
    construct: typeof Sanitize;
}
//# sourceMappingURL=Sanitize.d.ts.map