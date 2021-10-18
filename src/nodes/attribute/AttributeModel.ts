import { NodeModel, DefaultPortModel } from "@projectstorm/react-diagrams"

import { ATTRIBUTE } from "../../helpers/nodeTypes"

export class AttributeModel extends NodeModel {
  constructor() {
    super({
      type: ATTRIBUTE,
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
