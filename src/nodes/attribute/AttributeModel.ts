import { NodeModel } from "@projectstorm/react-diagrams"

import { ATTRIBUTE } from "../../helpers/nodeTypes"
import { BidirectionalPortModel } from "../../components/BidirectionaPortModel"
import { AttributeTrayState } from "../../components/BodyWidget"

export class AttributeModel extends NodeModel {
  constructor(attributeState: AttributeTrayState) {
    super({
      type: ATTRIBUTE,
    })

    this.state = attributeState

    // setup an in and out ports
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

  private state: AttributeTrayState

  serialize() {
    return { ...super.serialize(), state: this.state }
  }

  deserialize(event: any) {
    super.deserialize(event)
  }

  getState() {
    return this.state
  }

  setState(state: AttributeTrayState) {
    this.state = state
  }
}