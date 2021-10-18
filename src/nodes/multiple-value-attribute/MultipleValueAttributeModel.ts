import { NodeModel, DefaultPortModel } from "@projectstorm/react-diagrams"

import { MULTIPLE_VALUE_ATTRIBUTE } from "../../helpers/nodeTypes"

export class MultipleValueAttributeModel extends NodeModel {
  constructor() {
    super({
      type: MULTIPLE_VALUE_ATTRIBUTE,
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
