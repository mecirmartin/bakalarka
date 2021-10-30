import { NodeModel } from "@projectstorm/react-diagrams"

import { RELATIONSHIP } from "../../helpers/nodeTypes"
import { RelationshipTrayState } from "../../components/BodyWidget"
import { BidirectionalPortModel } from "../../components/BidirectionaPortModel"

export class RelationshipModel extends NodeModel {
  constructor(relationshipState: RelationshipTrayState) {
    super({
      type: RELATIONSHIP,
    })

    this.state = relationshipState

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

  private state: RelationshipTrayState

  serialize() {
    return { ...super.serialize(), state: this.state }
  }

  deserialize(event: any) {
    super.deserialize(event)
  }

  getState() {
    return this.state
  }

  setState(state: RelationshipTrayState) {
    this.state = state
  }
}
