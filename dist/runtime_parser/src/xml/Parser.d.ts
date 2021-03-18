/// <reference types="node" />
import * as stream from "stream";
import * as Promise from "bluebird";
import { Context } from "./Context";
import { HandlerInstance } from "./Type";
export interface CxmlDate extends Date {
    cxmlTimezoneOffset: number;
}
export declare class Parser {
    attach<CustomHandler extends HandlerInstance>(handler: {
        new (): CustomHandler;
    }): void;
    parse<Output extends HandlerInstance>(stream: string | stream.Readable | NodeJS.ReadableStream, output: Output, context?: Context): Promise<Output>;
    _parse<Output extends HandlerInstance>(stream: string | stream.Readable | NodeJS.ReadableStream, output: Output, context: Context, resolve: (item: Output) => void, reject: (err: any) => void): void;
    context: Context;
}
//# sourceMappingURL=Parser.d.ts.map