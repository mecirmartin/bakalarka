import { NodeModel } from "@projectstorm/react-diagrams"
import { BaseModelOptions } from "@projectstorm/react-canvas-core"
import { GENERALIZATION_CATEGORY } from "../../helpers/nodeTypes"
import { BidirectionalPortModel } from "../../components/BidirectionaPortModel"

export interface TriangleNodeModelOptions extends BaseModelOptions {
  color?: string
}

export class TriangleNodeModel extends NodeModel {
  color: string

  constructor(triangleState) {
    super({
      type: GENERALIZATION_CATEGORY,
      extras: triangleState,
    })

    this.extras = triangleState

    // setup an in and out port
    this.addPort(new BidirectionalPortModel({ name: "top" }))
    this.addPort(new BidirectionalPortModel({ name: "bottom" }))
  }

  private extras: { value: string }

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

  setState(state: { value: string }) {
    this.extras = state
  }
}
