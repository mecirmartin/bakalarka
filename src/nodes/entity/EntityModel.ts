import { NodeModel } from "@projectstorm/react-diagrams"

import { BidirectionalPortModel } from "../../components/BidirectionaPortModel"
import { EntityTrayState } from "../../components/BodyWidget"
import { ENTITY } from "../../helpers/nodeTypes"

export class EntityModel extends NodeModel {
  constructor(entityState: EntityTrayState) {
    super({
      type: ENTITY,
      extras: entityState,
    })

    this.extras = entityState

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

  private extras: EntityTrayState

  serialize() {
    return {
      ...super.serialize(),
      extras: this.extras,
    }
  }

  deserialize(event: any) {
    super.deserialize(event)
  }

  getState() {
    return this.extras
  }

  setState(state: EntityTrayState) {
    this.extras = state
  }
}
