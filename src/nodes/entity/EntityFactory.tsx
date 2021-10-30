import * as React from "react"
import { EntityModel } from "./EntityModel"

import { AbstractReactFactory } from "@projectstorm/react-canvas-core"
import { DiagramEngine } from "@projectstorm/react-diagrams-core"
import { ENTITY } from "../../helpers/nodeTypes"
import { Entity } from "./EntityWidget"

export class EntityNodeFactory extends AbstractReactFactory<
  EntityModel,
  DiagramEngine
> {
  constructor() {
    super(ENTITY)
  }

  generateModel(initialConfig: any) {
    //TODO
    return new EntityModel({} as any)
  }

  generateReactWidget(event: any): JSX.Element {
    return (
      <Entity
        engine={this.engine as DiagramEngine}
        node={event.model}
        title={event.model.title}
        entityState={event.model.state}
      />
    )
  }
}
