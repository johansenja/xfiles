import { Namespace } from './Namespace';
import { Source } from './Source';
/** Qualified name, including reference to a namespace. */
export declare class QName {
    constructor(name?: string, source?: Source);
    /** Parse a name with a possible namespace prefix. */
    parse(name: string, source: Source, namespace?: Namespace): this;
    /** Parse a class name internally used by the XSD parser. */
    parseClass(name: string, namespace: Namespace): this;
    parsePrimitive(name: string, namespace: Namespace): this;
    /** Format name for printing (for debugging), together with namespace name. */
    format(): string;
    namespace: Namespace;
    name: string;
    nameFull: string;
}
//# sourceMappingURL=QName.d.ts.map