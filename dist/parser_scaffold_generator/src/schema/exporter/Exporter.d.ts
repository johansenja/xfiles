import * as Promise from 'bluebird';
import { Cache } from 'cget';
import { Transform } from '../transform/Transform';
import { Type } from '../Type';
export interface State {
    cache: Cache;
}
export declare abstract class Exporter extends Transform<Exporter, boolean, State> {
    constructor(doc: Type, cache: Cache);
    writeHeader(): string[];
    abstract writeImport(shortName: string, relativePath: string, absolutePath: string): string;
    /** Output namespace contents to cache, if not already exported. */
    prepare(): Promise<boolean>;
    abstract writeContents(): string;
    /** Get relative path to another namespace within the cache. */
    getPathTo(name: string): string;
    protected abstract getOutName(name: string): string;
    protected state: State;
    /** Full path of directory containing exported output for the current namespace. */
    protected cacheDir: string;
}
//# sourceMappingURL=Exporter.d.ts.map