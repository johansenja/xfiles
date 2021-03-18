import * as Promise from 'bluebird';
import { CacheResult } from 'cget';
import { Context } from './Context';
import { State } from './State';
import { Loader } from './Loader';
import { Source } from './Source';
export declare class Parser {
    constructor(context: Context);
    startElement(state: State, name: string, attrTbl: {
        [name: string]: string;
    }): State;
    init(cached: CacheResult, source: Source, loader: Loader): Promise<Source[]>;
    /** Bind references, call after all imports have been initialized. */
    resolve(): void;
    private context;
    /** Temporarily holds a qualified name, re-used to avoid allocating objects. */
    private qName;
    /** List of parser states still needing further processing
      * after previous stage is done. */
    private pendingList;
    /** Defines valid contents for the XML file root element. */
    private rootRule;
}
//# sourceMappingURL=Parser.d.ts.map