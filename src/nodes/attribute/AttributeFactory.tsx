import * as React from "react"
import { AbstractReactFactory } from "@projectstorm/react-canvas-core"
import { DiagramEngine } from "@projectstorm/react-diagrams-core"

import { AttributeModel } from "./AttributeModel"
import { ATTRIBUTE } from "../../helpers/nodeTypes"
import { Attribute } from "./AttributeWidget"

export class AttributeNodeFactory extends AbstractReactFactory<
  AttributeModel,
  DiagramEngine
> {
  constructor() {
    super(ATTRIBUTE)
  }

  generateModel(initialConfig: any) {
    return new AttributeModel()
  }

  generateReactWidget(event: any): JSX.Element {
    return (
      <Attribute
        engine={this.engine as DiagramEngine}
        node={event.model}
        title={event.model.title}
      />
    )
  }
}
