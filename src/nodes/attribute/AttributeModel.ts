import { NodeModel } from "@projectstorm/react-diagrams"

import { ATTRIBUTE } from "../../helpers/nodeTypes"
import { BidirectionalPortModel } from "../../components/BidirectionaPortModel"
import { AttributeTrayState } from "../../components/BodyWidget"

export class AttributeModel extends NodeModel {
  constructor(attributeState: AttributeTrayState) {
    super({
      type: ATTRIBUTE,
      extras: attributeState,
    })

    this.extras = attributeState

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

  private extras: AttributeTrayState

  serialize() {
    return { ...super.serialize(), state: this.extras }
  }

  deserialize(event: any) {
    console.log("des", event)
    super.deserialize(event)
    this.setState(event.data.extras)
  }

  getState() {
    return this.extras
  }

  setState(state: AttributeTrayState) {
    this.extras = state
  }
}
