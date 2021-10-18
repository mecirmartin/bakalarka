import { NodeModel, DefaultPortModel } from "@projectstorm/react-diagrams"

import { RELATIONSHIP_TYPE } from "../../helpers/nodeTypes"

export class RelationshipTypeModel extends NodeModel {
  constructor() {
    super({
      type: RELATIONSHIP_TYPE,
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
