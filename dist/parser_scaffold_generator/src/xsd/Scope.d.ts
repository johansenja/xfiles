import * as types from './types';
import { Namespace } from './Namespace';
import { QName } from './QName';
export interface TypeMember {
    min: number;
    max: number;
    item: types.Base;
}
export interface NamedTypeMember extends TypeMember {
    name: string;
}
/** Scope handles looking up references by type and name, and binding member
  * types and elements to types or namespaces. */
export declare class Scope {
    constructor(parent: Scope, namespace?: Namespace);
    add(name: string, kind: string, target: types.Base, min: number, max: number): void;
    addToParent(name: string, kind: string, target: types.Base, min: number, max: number): void;
    addContentToParent(kind: string, target: types.Base, min: number, max: number): void;
    addAllToParent(kind: string, min?: number, max?: number, target?: Scope): void;
    addComments(commentList: string[]): void;
    addCommentsToGrandParent(commentList: string[]): void;
    getComments(): string;
    lookup(name: QName, kind: string): types.Base;
    setType(type: types.TypeBase): void;
    setParentType(type: types.TypeBase): void;
    getParentType(namespace: Namespace): types.TypeBase;
    getType(): types.TypeBase;
    dumpTypes(kind: string): NamedTypeMember[];
    dumpMembers(kind: string, groupKind: string): {
        [name: string]: TypeMember;
    };
    private parent;
    namespace: Namespace;
    private visible;
    private expose;
    private type;
    private commentList;
    private static primitiveScope;
}
//# sourceMappingURL=Scope.d.ts.map