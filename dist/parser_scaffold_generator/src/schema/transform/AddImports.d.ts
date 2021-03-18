import { Namespace, ImportContent } from '../Namespace';
import { Type } from '../Type';
import { Member } from '../Member';
import { Transform } from './Transform';
export declare type Output = {
    [namespaceId: string]: ImportContent;
};
export declare class AddImports extends Transform<AddImports, Output, void> {
    prepare(): Output;
    /** Replace imported type and member IDs with sanitized names. */
    finish(result: Output[]): void;
    addRef(namespace: Namespace, member?: Member, type?: Type): void;
    visitMember(member: Member): void;
    visitType(type: Type): void;
    construct: typeof AddImports;
    output: Output;
}
//# sourceMappingURL=AddImports.d.ts.map