import { NodeModel, DefaultPortModel } from "@projectstorm/react-diagrams"

import { WEAK_ENTITY_TYPE } from "../../helpers/nodeTypes"

export class WeakEntityTypeModel extends NodeModel {
  constructor() {
    super({
      type: WEAK_ENTITY_TYPE,
    })

    // setup an in and out port
    this.addPort(
      new DefaultPortModel({
        in: true,
        name: "in",
      })
    )
    this.addPort(
      new DefaultPortModel({
        in: false,
        name: "out",
      })
    )
  }

  serialize() {
    return { ...super.serialize() }
  }

  deserialize(event: any) {
    super.deserialize(event)
  }
}
