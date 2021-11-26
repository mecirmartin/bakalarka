import * as React from "react"
import { RelationshipModel } from "./RelationshipModel"

import { AbstractReactFactory } from "@projectstorm/react-canvas-core"
import { DiagramEngine } from "@projectstorm/react-diagrams-core"
import { RELATIONSHIP } from "../../helpers/nodeTypes"
import { Relationship } from "./RelationshipWidget"

export class RelationshipNodeFactory extends AbstractReactFactory<
  RelationshipModel,
  DiagramEngine
> {
  constructor() {
    super(RELATIONSHIP)
  }

  generateModel(initialConfig: any) {
    return new RelationshipModel(initialConfig.initialConfig.extras)
  }

  generateReactWidget(event: any): JSX.Element {
    return (
      <Relationship
        engine={this.engine as DiagramEngine}
        node={event.model}
        title={event.model.title}
        relationshipState={event.model.state}
      />
    )
  }
}
