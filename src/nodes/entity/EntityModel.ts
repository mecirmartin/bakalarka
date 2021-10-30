import { NodeModel } from "@projectstorm/react-diagrams"

import { BidirectionalPortModel } from "../../components/BidirectionaPortModel"
import { EntityTrayState } from "../../components/BodyWidget"
import { ENTITY } from "../../helpers/nodeTypes"

export class EntityModel extends NodeModel {
  constructor(entityState: EntityTrayState) {
    super({
      type: ENTITY,
    })

    this.state = entityState

    this.addPort(
      new BidirectionalPortModel({
        in: true,
        name: "left",
      })
    )
    this.addPort(
      new BidirectionalPortModel({
        in: true,
        name: "bottom",
      })
    )
    this.addPort(
      new BidirectionalPortModel({
        in: true,
        name: "right",
      })
    )
    this.addPort(
      new BidirectionalPortModel({
        in: true,
        name: "top",
      })
    )
  }

  private state: EntityTrayState

  serialize() {
    return {
      ...super.serialize(),
      // You may need to transform these to be serializable
      state: this.state,
    }
  }

  deserialize(event: any) {
    super.deserialize(event)
  }

  getState() {
    return this.state
  }

  setState(state: EntityTrayState) {
    this.state = state
  }
}
