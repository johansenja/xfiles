import * as cxml from "../../../runtime_parser";
import { Context } from "./Context";
import { Source } from "./Source";
import { Scope } from "./Scope";
/** XML namespace, binding it to syntax definitions. */
export declare class Namespace extends cxml.NamespaceBase<Context, Namespace> {
    constructor(name: string, id: number, context: Context);
    /** Initialize names and addresses. Can be called multiple times. */
    init(url?: string, short?: string): this;
    addSource(source: Source): void;
    /** Update final address of schema file if HTTP request was redirected. */
    updateUrl(urlOld: string, urlNew: string): void;
    /** Fetch the root scope with published attributes, groups, elements... */
    getScope(): Scope;
    /** @return List of all source files potentially contributing to this namespace. */
    getSourceList(): Source[];
    /** List of all source files potentially contributing to this namespace. */
    private sourceList;
    /** Source files potentially contributing to this namespace. */
    private sourceTbl;
    /** Global scope where exported members will be published. */
    private scope;
}
//# sourceMappingURL=Namespace.d.ts.map