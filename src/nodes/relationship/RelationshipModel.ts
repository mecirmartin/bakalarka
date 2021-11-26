import { NodeModel } from "@projectstorm/react-diagrams"

import { RELATIONSHIP } from "../../helpers/nodeTypes"
import { RelationshipTrayState } from "../../components/BodyWidget"
import { BidirectionalPortModel } from "../../components/BidirectionaPortModel"

export class RelationshipModel extends NodeModel {
  constructor(relationshipState: RelationshipTrayState) {
    super({
      type: RELATIONSHIP,
      extras: relationshipState,
    })

    this.extras = relationshipState

    // setup an in and out port
    this.addPort(
      new BidirectionalPortModel({
        name: "left",
      })
    )
    this.addPort(
      new BidirectionalPortModel({
        name: "right",
      })
    )
    this.addPort(
      new BidirectionalPortModel({
        name: "top",
      })
    )
    this.addPort(
      new BidirectionalPortModel({
        name: "bottom",
      })
    )
  }

  private extras: RelationshipTrayState

  serialize() {
    return { ...super.serialize(), extras: this.extras }
  }

  deserialize(event: any) {
    super.deserialize(event)
  }

  getState() {
    return this.extras
  }

  setState(state: RelationshipTrayState) {
    this.extras = state
  }
}
