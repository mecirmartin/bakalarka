import * as React from "react"
import { TriangleNodeModel } from "./TriangleNodeModel"
import { TriangleNodeWidget } from "./TriangleNodeWidget"
import { AbstractReactFactory } from "@projectstorm/react-canvas-core"
import { DiagramEngine } from "@projectstorm/react-diagrams-core"
import { GENERALIZATION_CATEGORY } from "../../helpers/nodeTypes"

export class TriangleNodeFactory extends AbstractReactFactory<
  TriangleNodeModel,
  DiagramEngine
> {
  constructor() {
    super(GENERALIZATION_CATEGORY)
  }

  generateModel(initialConfig) {
    return new TriangleNodeModel()
  }

  generateReactWidget(event): JSX.Element {
    return (
      <TriangleNodeWidget
        engine={this.engine as DiagramEngine}
        node={event.model}
      />
    )
  }
}
