import { State } from '../State';
import { QName } from '../QName';
import * as types from '../types';
import { TypedBase } from './TypedBase';
import * as schema from '../../schema';
export declare class MemberBase extends TypedBase {
    resolveMember(state: State, kind: string): types.MemberBase;
    getOutMember(schemaContext: schema.Context): schema.Member;
    getTypes(): types.TypeBase[];
    isAbstract(): boolean;
    id: string;
    name: string;
    ref: string;
    type: string;
    min: number;
    max: number;
    typeRef: QName | types.TypeBase;
    outMember: schema.Member;
}
//# sourceMappingURL=MemberBase.d.ts.map