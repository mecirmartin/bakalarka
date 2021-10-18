import * as React from "react"
import { WeakEntityTypeModel } from "./WeakEntityTypeModel"

import { AbstractReactFactory } from "@projectstorm/react-canvas-core"
import { DiagramEngine } from "@projectstorm/react-diagrams-core"
import { WEAK_ENTITY_TYPE } from "../../helpers/nodeTypes"
import { WeakEntityTypeWidget } from "./WeakEntityTypeWidget"

export class WeakEntityTypeNodeFactory extends AbstractReactFactory<
  WeakEntityTypeModel,
  DiagramEngine
> {
  constructor() {
    super(WEAK_ENTITY_TYPE)
  }

  generateModel(initialConfig: any) {
    return new WeakEntityTypeModel()
  }

  generateReactWidget(event: any): JSX.Element {
    return (
      <WeakEntityTypeWidget
        engine={this.engine as DiagramEngine}
        node={event.model}
      />
    )
  }
}
