import { Base, BaseClass } from "./Base";
import { State } from "../State";
import { QName } from "../QName";
import { NamedTypeMember } from "../Scope";
import * as schema from "../../schema";
export declare class TypeBase extends Base {
    init(state: State): void;
    getOutType(schemaContext: schema.Context): schema.Type;
    /** Find parent type inheriting from a base type. */
    getParent(base: BaseClass, breakAtContent: boolean): TypeBase;
    getListType(): NamedTypeMember[];
    id: string;
    name: string;
    parent: TypeBase | QName;
    qName: QName;
    surrogateKey: number;
    private static nextKey;
    outType: schema.Type;
    exported: boolean;
}
//# sourceMappingURL=TypeBase.d.ts.map