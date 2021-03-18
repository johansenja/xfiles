import * as Promise from 'bluebird';
import { Namespace } from '../Namespace';
import { Type } from '../Type';
import { MemberRef } from '../MemberRef';
/** TransformType is a class derived from Transform, used like CRTP in C++. */
export declare abstract class Transform<TransformType extends Transform<TransformType, Output, State>, Output, State> {
    constructor(doc: Type);
    getTypeMembers(type: Type): MemberRef[];
    prepare(): Output | Promise<Output>;
    exec(visitedNamespaceTbl?: {
        [key: string]: Namespace;
    }, state?: any): Promise<Output[]>;
    construct: {
        new (...args: any[]): Transform<TransformType, Output, State>;
    };
    output: Output;
    protected doc: Type;
    protected namespace: Namespace;
    protected state: State;
}
//# sourceMappingURL=Transform.d.ts.map