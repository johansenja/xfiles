import * as types from './types';
import { Rule } from './Rule';
import { Context } from './Context';
import { Namespace } from './Namespace';
import { Source } from './Source';
import { Scope } from './Scope';
/** Parser state, passed around between functions. */
export declare class State {
    constructor(parent: State, rule: Rule, source?: Source);
    getScope(): Scope;
    setScope(scope: Scope): void;
    /** Begin capturing text content between tags, sent to the handler of the innermost tag. */
    startText(xsdElement: types.Base): void;
    /** Finish capturing text content. */
    endText(): void;
    parent: State;
    rule: Rule;
    source: Source;
    private scope;
    attributeTbl: {
        [name: string]: string;
    };
    xsdElement: types.Base;
    depth: number;
    index: number;
    stateStatic: {
        context: Context;
        addImport: (namespaceTarget: Namespace, urlRemote: string) => void;
        getLineNumber: () => number;
        getBytePos: () => number;
        textHandlerList: types.Base[];
        textDepth: number;
    };
}
//# sourceMappingURL=State.d.ts.map