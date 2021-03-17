// This file is part of cxsd, copyright (c) 2015-2016 BusFaster Ltd.
// Released under the MIT license, see LICENSE.

import { Base, BaseClass } from "./Base";
import { State } from "../State";
import { QName } from "../QName";
import { NamedTypeMember } from "../Scope";
import * as schema from "../../schema";

export class TypeBase extends Base {
  init(state: State) {
    if (!this.scope) this.scope = state.getScope();

    this.qName = this.define(state, "type");
    // Set type of parent element, in case it has none.
    this.scope.setParentType(this);
    // Add reference from current scope to allow naming nested anonymous types.
    this.scope.setType(this);
    this.surrogateKey = TypeBase.nextKey++;
  }

  getOutType(schemaContext: schema.Context): schema.Type {
    var outType = this.outType;

    if (!outType) {
      outType = new schema.Type(this.name);

      if (this.scope) {
        schemaContext.copyNamespace(this.scope.namespace).addType(outType);
      }

      this.outType = outType;
    }

    return outType;
  }

  /** Find parent type inheriting from a base type. */

  getParent(base: BaseClass, breakAtContent: boolean) {
    var next: TypeBase | QName = this;
    var typ: TypeBase | QName;
    /** Maximum iterations in case type inheritance forms a loop. */
    var iter = 100;

    while (--iter) {
      typ = next;

      if (!(typ instanceof TypeBase)) {
        break;
      } else if (typ instanceof base) {
        return typ;
      } else if (
        breakAtContent &&
        ((typ as unknown) as any).scope &&
        (((typ as unknown) as any).scope.dumpTypes("attribute") ||
          ((typ as unknown) as any).scope.dumpTypes("attributeGroup"))
      ) {
        break;
      } else {
        next = ((typ as unknown) as any).parent;
      }
    }

    return null;
  }

  getListType() {
    var next: TypeBase | QName = this;
    var type: TypeBase | QName;
    /** Maximum iterations in case type inheritance forms a loop. */
    var iter = 100;

    while (--iter) {
      type = next;

      if (!(type instanceof TypeBase)) break;
      else {
        var listType = type.scope && type.scope.dumpTypes("list");

        if (listType) return listType;
        else next = type.parent;
      }
    }

    return null;
  }

  id: string = null;
  name: string = null;

  // Internally used members
  parent: TypeBase | QName;
  qName: QName;
  surrogateKey: number;
  private static nextKey = 0;

  outType: schema.Type;

  // TODO: remove this and detect circular types (anonymous types inside elements referencing the same element) before exporting.
  exported: boolean;
}
