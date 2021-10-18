import * as React from "react"
import * as _ from "lodash"
import styled from "@emotion/styled"
import { useState } from "react"
import { CanvasWidget } from "@projectstorm/react-canvas-core"

import { TrayWidget } from "./TrayWidget"
import { Application } from "../Application"
import { TrayItemWidget } from "./TrayItemWidget"
import { DemoCanvasWidget } from "../helpers/DemoCanvasWidget"
import {
  ATTRIBUTE,
  DERIVED_ATTRIBUTE,
  ENTITY_TYPE,
  IDENTIFICATION_RELATIONSHIP_TYPE,
  MULTIPLE_VALUE_ATTRIBUTE,
  RELATIONSHIP_TYPE,
  WEAK_ENTITY_TYPE,
} from "../helpers/nodeTypes"
import { EntityTypeModel } from "../nodes/entity-type/EntityTypeModel"
import { WeakEntityTypeModel } from "../nodes/weak-entity-type/WeakEntityTypeModel"
import { RelationshipTypeModel } from "../nodes/relationship-type/RelationshipTypeModel"
import { IdentificationRelationshipTypeModel } from "../nodes/identification-relationship-type/IdentificationRelationshipTypeModel"
import { AttributeModel } from "../nodes/attribute/AttributeModel"
import { MultipleValueAttributeModel } from "../nodes/multiple-value-attribute/MultipleValueAttributeModel"
import { DerivedAttributeModel } from "../nodes/derived-attribute/DerivedAttributeModel"

export interface BodyWidgetProps {
  app: Application
}

export const Body = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  min-height: 100%;
`

export const Header = styled.div`
  display: flex;
  background: rgb(30, 30, 30);
  flex-grow: 0;
  flex-shrink: 0;
  color: white;
  font-family: Helvetica, Arial, sans-serif;
  padding: 10px;
  align-items: center;
`

export const Content = styled.div`
  display: flex;
  flex-grow: 1;
`

export const Layer = styled.div`
  position: relative;
  flex-grow: 1;
`

const createDiagramNode = (type: string) => {
  switch (type) {
    case ENTITY_TYPE:
      return new EntityTypeModel()
    case WEAK_ENTITY_TYPE:
      return new WeakEntityTypeModel()
    case RELATIONSHIP_TYPE:
      return new RelationshipTypeModel()
    case IDENTIFICATION_RELATIONSHIP_TYPE:
      return new IdentificationRelationshipTypeModel()
    case ATTRIBUTE:
      return new AttributeModel()
    case MULTIPLE_VALUE_ATTRIBUTE:
      return new MultipleValueAttributeModel()
    case DERIVED_ATTRIBUTE:
      return new DerivedAttributeModel()
    default:
      throw new Error("Unknown diagram node type")
  }
}

const useForceUpdate = () => {
  const [_value, setValue] = useState(0) // integer state
  return () => setValue(value => value + 1) // update the state to force render
}

export const BodyWidget: React.FC<BodyWidgetProps> = props => {
  const forceUpdate = useForceUpdate()

  return (
    <Body>
      <Header>
        <div className="title">Database diagram modeler</div>
      </Header>
      <Content>
        <TrayWidget>
          <TrayItemWidget
            model={ENTITY_TYPE}
            name="Entity Type"
            color="rgb(0,192,255)"
          />
          <TrayItemWidget
            model={WEAK_ENTITY_TYPE}
            name="Weak Entity Type"
            color="rgb(0,192,255)"
          />
          <TrayItemWidget
            model={RELATIONSHIP_TYPE}
            name="Relationship"
            color="rgb(0,192,255)"
          />
          <TrayItemWidget
            model={IDENTIFICATION_RELATIONSHIP_TYPE}
            name="Identification Relationship"
            color="rgb(0,192,255)"
          />
          <TrayItemWidget
            model={ATTRIBUTE}
            name="Attribute"
            color="rgb(0,192,255)"
          />
          <TrayItemWidget
            model={MULTIPLE_VALUE_ATTRIBUTE}
            name="Multiple Value Attribute"
            color="rgb(0,192,255)"
          />
          <TrayItemWidget
            model={DERIVED_ATTRIBUTE}
            name="Derived Attribute"
            color="rgb(0,192,255)"
          />
        </TrayWidget>
        <Layer
          onDrop={event => {
            const nodeType = JSON.parse(
              event.dataTransfer.getData("storm-diagram-node")
            )
            console.log("e", event, nodeType)

            const node = createDiagramNode(nodeType)

            const point = props.app
              .getDiagramEngine()
              .getRelativeMousePoint(event)
            node.setPosition(point)
            props.app.getDiagramEngine().getModel().addNode(node)
            forceUpdate()
          }}
          onDragOver={event => {
            event.preventDefault()
          }}
        >
          <DemoCanvasWidget>
            <CanvasWidget engine={props.app.getDiagramEngine()} />
          </DemoCanvasWidget>
        </Layer>
      </Content>
    </Body>
  )
}
