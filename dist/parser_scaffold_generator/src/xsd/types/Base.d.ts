import { Rule } from "../Rule";
import { State } from "../State";
import { Scope } from "../Scope";
import { QName } from "../QName";
export interface BaseClass {
    new (state?: State): Base;
    /** Returns other classes allowed as children. */
    mayContain(): BaseClass[];
    name: string;
    rule: Rule;
}
/** Common handler base class for all schema tags. */
export declare class Base {
    /** Returns other classes allowed as children. */
    static mayContain: () => BaseClass[];
    constructor(state?: State);
    /** Hook, runs after opening tag. */
    init(state: State): void;
    /** Hook, runs for text content. */
    addText(state: State, text: string): void;
    /** Hook, runs after closing tag. */
    loaded(state: State): void;
    /** Hook, runs after all dependencies have been loaded. */
    resolve(state: State): void;
    /** Add this named tag to scope, listed under given type.
     * Optionally set number of allowed occurrences, for optional elements, sequences etc.
     * @return fully qualified name. */
    define(state: State, type: string, min?: number, max?: number, scope?: Scope): QName;
    getScope(): Scope;
    protected scope: Scope;
    lineNumber: number;
    bytePos: number;
    name: string;
    static naame: string;
    static rule: Rule;
}
//# sourceMappingURL=Base.d.ts.map