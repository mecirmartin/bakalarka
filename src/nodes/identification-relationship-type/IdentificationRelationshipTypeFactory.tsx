import * as React from "react"
import { AbstractReactFactory } from "@projectstorm/react-canvas-core"
import { DiagramEngine } from "@projectstorm/react-diagrams-core"

import { IdentificationRelationshipTypeModel } from "./IdentificationRelationshipTypeModel"
import { IDENTIFICATION_RELATIONSHIP_TYPE } from "../../helpers/nodeTypes"
import { IdentificationRelationshipType } from "./IdentificationRelationshipTypeWidget"

export class IdentificationRelationshipTypeNodeFactory extends AbstractReactFactory<
  IdentificationRelationshipTypeModel,
  DiagramEngine
> {
  constructor() {
    super(IDENTIFICATION_RELATIONSHIP_TYPE)
  }

  generateModel(initialConfig: any) {
    return new IdentificationRelationshipTypeModel()
  }

  generateReactWidget(event: any): JSX.Element {
    return (
      <IdentificationRelationshipType
        engine={this.engine as DiagramEngine}
        node={event.model}
        title={event.model.title}
      />
    )
  }
}
