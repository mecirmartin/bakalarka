import { NodeModel } from "@projectstorm/react-diagrams"
import { BaseModelOptions } from "@projectstorm/react-canvas-core"
import { GENERALIZATION_CATEGORY } from "../../helpers/nodeTypes"
import { BidirectionalPortModel } from "../../components/BidirectionaPortModel"

export interface TriangleNodeModelOptions extends BaseModelOptions {
  color?: string
}

export class TriangleNodeModel extends NodeModel {
  color: string

  constructor(options: TriangleNodeModelOptions = {}) {
    super({ ...options, type: GENERALIZATION_CATEGORY })
    this.color = options.color || "red"

    // setup an in and out port
    this.addPort(new BidirectionalPortModel({ name: "top" }))
    this.addPort(new BidirectionalPortModel({ name: "bottom" }))
  }

  serialize() {
    return {
      ...super.serialize(),
      color: this.color,
    }
  }

  deserialize(event): void {
    super.deserialize(event)
    this.color = event.data.color
  }
}
