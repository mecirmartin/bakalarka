import * as React from "react"
import { EntityTypeModel } from "./EntityTypeModel"

import { AbstractReactFactory } from "@projectstorm/react-canvas-core"
import { DiagramEngine } from "@projectstorm/react-diagrams-core"
import { ENTITY_TYPE } from "../../helpers/nodeTypes"
import { EntityType } from "./EntityTypeWidget"

export class EntityTypeNodeFactory extends AbstractReactFactory<
  EntityTypeModel,
  DiagramEngine
> {
  constructor() {
    super(ENTITY_TYPE)
  }

  generateModel(initialConfig: any) {
    return new EntityTypeModel()
  }

  generateReactWidget(event: any): JSX.Element {
    return (
      <EntityType
        engine={this.engine as DiagramEngine}
        node={event.model}
        title={event.model.title}
      />
    )
  }
}
