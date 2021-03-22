import * as sax from "sax";
import { Context } from "./Context";
import { State } from "./State";
import { Loader } from "./Loader";
import { Source } from "./Source";
export declare class Parser {
    constructor(context: Context);
    startElement(state: State, name: string, attrTbl: sax.Tag["attributes"] | sax.QualifiedTag["attributes"]): State;
    init(xml: string, source: Source, loader: Loader): Source[];
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