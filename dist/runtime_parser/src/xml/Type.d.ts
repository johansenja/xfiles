import { Namespace } from './Namespace';
import { MemberRef } from './MemberRef';
/** Interface implemented by schema type classes, allowing custom hooks. */
export interface HandlerInstance {
    [key: string]: any;
    content?: any;
    _exists: boolean;
    _namespace: string;
    _before?(): void;
    _after?(): void;
}
/** Base class inherited by all schema type classes, not defining custom hooks. */
export declare class TypeInstance implements HandlerInstance {
    /** Name of the type, pointing to the name of the constructor function.
      * Might contain garbage... */
    _exists: boolean;
    _namespace: string;
}
/** Class type compatible with schema type classes. */
export interface TypeClass {
    new (): TypeInstance;
    type?: Type;
}
/** Class type compatible with schema type classes, allowing custom hooks. */
export interface HandlerClass extends TypeClass {
    new (): HandlerInstance;
    _custom?: boolean;
}
/** Parser rule, defines a handler class, valid attributes and children
  * for an XSD tag. */
export declare class Type {
    constructor(handler: TypeClass);
    addAttribute(ref: MemberRef): void;
    addChild(ref: MemberRef): void;
    namespace: Namespace;
    /** Constructor function for creating objects handling and representing the results of this parsing rule. */
    handler: HandlerClass;
    /** Table of allowed attributes. */
    attributeTbl: {
        [key: string]: MemberRef;
    };
    /** Table mapping the names of allowed child tags, to their parsing rules. */
    childTbl: {
        [key: string]: MemberRef;
    };
    /** Type has text content representable as JavaScript primitives. */
    isPrimitive: boolean;
    /** Primitive type is inherited without any additional attributes
      * or children, so is can be represented as a JavaScript primitive. */
    isPlainPrimitive: boolean;
    /** Text content is a whitespace-separated list of primitive types. */
    isList: boolean;
    /** JavaScript primitive type that can represent the text content. */
    primitiveType: string;
}
//# sourceMappingURL=Type.d.ts.map