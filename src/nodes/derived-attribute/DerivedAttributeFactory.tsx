import * as React from "react"
import { AbstractReactFactory } from "@projectstorm/react-canvas-core"
import { DiagramEngine } from "@projectstorm/react-diagrams-core"

import { DerivedAttributeModel } from "./DerivedAttributeModel"
import { DERIVED_ATTRIBUTE } from "../../helpers/nodeTypes"
import { DerivedAttribute } from "./DerivedAttributeWidget"

export class DerivedAttributeNodeFactory extends AbstractReactFactory<
  DerivedAttributeModel,
  DiagramEngine
> {
  constructor() {
    super(DERIVED_ATTRIBUTE)
  }

  generateModel(initialConfig: any) {
    return new DerivedAttributeModel()
  }

  generateReactWidget(event: any): JSX.Element {
    return (
      <DerivedAttribute
        engine={this.engine as DiagramEngine}
        node={event.model}
        title={event.model.title}
      />
    )
  }
}
