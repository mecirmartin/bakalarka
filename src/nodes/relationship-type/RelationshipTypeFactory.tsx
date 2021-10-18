import * as React from "react"
import { RelationshipTypeModel } from "./RelationshipTypeModel"

import { AbstractReactFactory } from "@projectstorm/react-canvas-core"
import { DiagramEngine } from "@projectstorm/react-diagrams-core"
import { RELATIONSHIP_TYPE } from "../../helpers/nodeTypes"
import { RelationshipType } from "./RelationshipTypeWidget"

export class RelationshipTypeNodeFactory extends AbstractReactFactory<
  RelationshipTypeModel,
  DiagramEngine
> {
  constructor() {
    super(RELATIONSHIP_TYPE)
  }

  generateModel(initialConfig: any) {
    return new RelationshipTypeModel()
  }

  generateReactWidget(event: any): JSX.Element {
    return (
      <RelationshipType
        engine={this.engine as DiagramEngine}
        node={event.model}
        title={event.model.title}
      />
    )
  }
}
