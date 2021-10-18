import * as React from "react"
import { AbstractReactFactory } from "@projectstorm/react-canvas-core"
import { DiagramEngine } from "@projectstorm/react-diagrams-core"

import { MultipleValueAttributeModel } from "./MultipleValueAttributeModel"
import { MULTIPLE_VALUE_ATTRIBUTE } from "../../helpers/nodeTypes"
import { MultipleValueAttribute } from "./MultipleValueAttributeWidget"

export class MultipleValueAttributeNodeFactory extends AbstractReactFactory<
  MultipleValueAttributeModel,
  DiagramEngine
> {
  constructor() {
    super(MULTIPLE_VALUE_ATTRIBUTE)
  }

  generateModel(initialConfig: any) {
    return new MultipleValueAttributeModel()
  }

  generateReactWidget(event: any): JSX.Element {
    return (
      <MultipleValueAttribute
        engine={this.engine as DiagramEngine}
        node={event.model}
        title={event.model.title}
      />
    )
  }
}
