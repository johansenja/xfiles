import * as cxml from "../../../runtime_parser";
import { Namespace } from "./Namespace";
import { Scope } from "./Scope";
import * as schema from "../schema";
/** XML parser context, holding definitions of all imported namespaces. */
export declare class Context extends cxml.ContextBase<Context, Namespace> {
    constructor(schemaContext: schema.Context);
    registerNamespace(name: string, url?: string): Namespace;
    getPrimitiveScope(): Scope;
    /** Initialize special namespace containing primitive types. */
    private populatePrimitives;
    /** Scope containing XML primitive types.
     * Parent of global scopes of all other namespaces. */
    private primitiveScope;
    /** Namespace containing XML primitive types. */
    primitiveSpace: Namespace;
    /** The official "xml" namespace defining commonly used types.  */
    xmlSpace: Namespace;
    /** The official "xsd" namespace used for schema parsing.  */
    xsdSpace: Namespace;
}
//# sourceMappingURL=Context.d.ts.map