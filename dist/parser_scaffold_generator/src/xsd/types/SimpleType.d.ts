import * as types from '../types';
/** <xsd:simpletype> */
export declare class SimpleType extends types.TypeBase {
    static mayContain: () => types.BaseClass[];
    setEnumerationList(enumerationList: string[]): void;
    getEnumerationList(): string[];
    private enumerationList;
}
//# sourceMappingURL=SimpleType.d.ts.map