import * as Promise from "bluebird";
import * as sax from "sax";
import { Context } from "./Context";
import { Namespace } from "./Namespace";
/** Details of a single XSD source file. */
export declare class Source {
    constructor(urlRemote: string, context: Context, targetNamespace?: Namespace);
    /** Called by the parser, converts XSD attributes describing the schema into references to internal objects. */
    parse(attrTbl: sax.Tag["attributes"] | sax.QualifiedTag["attributes"]): void;
    /** Find a namespace according to its full name or the short name as used in this source file. */
    lookupNamespace(ref: string): Namespace;
    /** Resolve a possible relative URL in the context of this source file. */
    urlResolve(urlRemote: string): string;
    /** Update current remote address, in case the previous address got redirected. */
    updateUrl(urlOld: string, urlNew: string): void;
    getNamespaceRefs(): {
        [name: string]: Namespace;
    };
    /** Internal list of source files indexed by a surrogate key. */
    private static list;
    private context;
    /** Surrogate key, used internally as a unique source file ID. */
    id: number;
    /** Remote address of the file, after possible redirections. */
    url: string;
    /** Original remote address of the file, before any redirections. */
    urlOriginal: string;
    /** New definitions are exported into the target namespace. */
    targetNamespace: Namespace;
    /** Unqualified names are assumed to belong to the default namespace. */
    defaultNamespace: Namespace;
    /** Loader used for retrieving this file. */
    private loader;
    /** Table of namespace shorthand references (xmlns:...) used in this file. */
    private namespaceRefTbl;
    /** Promise, resolves when the file and its dependencies have been completely parsed. */
    parsed: Promise<any>;
}
//# sourceMappingURL=Source.d.ts.map