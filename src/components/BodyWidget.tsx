import * as React from "react"
import * as _ from "lodash"
import styled from "@emotion/styled"
import { useEffect, useState } from "react"
import { CanvasWidget } from "@projectstorm/react-canvas-core"

import { TrayWidget } from "./TrayWidget"
import { Application } from "../Application"
import { EntityTrayItemWidget } from "./EntityTrayItemWidget"
import { DemoCanvasWidget } from "../helpers/DemoCanvasWidget"
import {
  ATTRIBUTE,
  ENTITY,
  GENERALIZATION_CATEGORY,
  RELATIONSHIP,
} from "../helpers/nodeTypes"
import { EntityModel } from "../nodes/entity/EntityModel"
import { RelationshipModel } from "../nodes/relationship/RelationshipModel"
import { AttributeModel } from "../nodes/attribute/AttributeModel"
import { AttributeTrayItemWidget } from "./AttributeTrayItemWidget"
import { TrayItemWidget } from "./TrayItemWidget"
import { TriangleNodeModel } from "../nodes/generalization-category/TriangleNodeModel"

export interface BodyWidgetProps {
  app: Application
}

export interface EntityTrayState {
  isWeak: boolean
}

export type RelationshipTrayState = EntityTrayState

export type AttributeType = "ATTRIBUTE" | "MULTIPLE_VALUE" | "DERIVED"
export type KeyType = "NONE" | "PRIMARY_KEY" | "PARTIAL_KEY"

export interface AttributeTrayState {
  type: AttributeType
  key: KeyType
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

const TrayHeader = styled.h3`
  color: white;
  font-family: Helvetica;
  text-align: center;
  margin-top: 1rem;
  margin-bottom: 0.5rem;
`

const useForceUpdate = () => {
  const [_value, setValue] = useState(0) // integer state
  return () => setValue(value => value + 1) // update the state to force render
}

export const BodyWidget: React.FC<BodyWidgetProps> = props => {
  const forceUpdate = useForceUpdate()

  const [focusedLink, setFocusedLink] = useState(null)
  const [focusedNode, setFocusedNode] = useState(null)
  const [selectedNodeState, setSelectedNodeState] = useState(null)
  const [entityTrayState, setEntityTrayState] = useState<EntityTrayState>({
    isWeak: false,
  })
  const [relationshipTrayState, setRelationshipTrayState] =
    useState<RelationshipTrayState>({
      isWeak: false,
    })
  const [attributeTrayState, setAttributeTrayState] =
    useState<AttributeTrayState>({
      type: "ATTRIBUTE",
      key: "NONE",
    })

  useEffect(() => {
    if (!focusedNode) return
    focusedNode.setState(selectedNodeState)

    props.app.getDiagramEngine().repaintCanvas()
  }, [selectedNodeState])

  // useEffect(() => {
  //   if (focusedNode instanceof EntityModel) {
  //     console.log("setujem", focusedNode.getState())
  //     setEntityTrayState(focusedNode.getState())
  //   } else if (focusedNode instanceof RelationshipModel) {
  //     setRelationshipTrayState(focusedNode.getState())
  //   } else if (focusedNode instanceof AttributeModel) {
  //     setAttributeTrayState(focusedNode.getState())
  //   }
  // }, [focusedNode])

  console.log(selectedNodeState)

  const createDiagramNode = (type: string) => {
    switch (type) {
      case ENTITY:
        return new EntityModel(entityTrayState)
      case RELATIONSHIP:
        return new RelationshipModel(relationshipTrayState)
      case ATTRIBUTE:
        return new AttributeModel(attributeTrayState)
      case GENERALIZATION_CATEGORY:
        return new TriangleNodeModel()
      default:
        throw new Error("Unknown diagram node type")
    }
  }

  return (
    <Body>
      <Header>
        <div className="title">Database diagram modeler</div>
      </Header>
      <Content>
        <TrayWidget>
          <EntityTrayItemWidget
            model={ENTITY}
            name="Entity"
            color="rgb(0,192,255)"
            setEntityTrayState={setEntityTrayState}
          />
          <EntityTrayItemWidget
            model={RELATIONSHIP}
            name="Relationship"
            color="rgb(0,192,255)"
            setEntityTrayState={setRelationshipTrayState}
          />
          <AttributeTrayItemWidget
            model={ATTRIBUTE}
            name="Attribute"
            color="rgb(0,192,255)"
            attributeTrayState={attributeTrayState}
            setAttributeTrayState={setAttributeTrayState}
          />
          <TrayItemWidget
            model={GENERALIZATION_CATEGORY}
            name="Generalization/category"
            color="rgb(0,192,255)"
          />
          <TrayHeader>Selected Node</TrayHeader>
          {focusedNode instanceof EntityModel && (
            <EntityTrayItemWidget
              model={ENTITY}
              name="Entity"
              color="rgb(144,238,144)"
              state={selectedNodeState}
              setEntityTrayState={setSelectedNodeState}
            />
          )}

          {focusedNode instanceof RelationshipModel && (
            <EntityTrayItemWidget
              model={RELATIONSHIP}
              name="Relationship"
              color="rgb(144,238,144)"
              state={selectedNodeState}
              setEntityTrayState={setSelectedNodeState}
            />
          )}

          {focusedNode instanceof AttributeModel && (
            <AttributeTrayItemWidget
              model={ATTRIBUTE}
              name="Attribute"
              color="rgb(144,238,144)"
              attributeTrayState={selectedNodeState}
              setAttributeTrayState={setSelectedNodeState}
            />
          )}
        </TrayWidget>
        <Layer
          onDrop={event => {
            const nodeType = JSON.parse(
              event.dataTransfer.getData("storm-diagram-node")
            )

            const node = createDiagramNode(nodeType)

            const point = props.app
              .getDiagramEngine()
              .getRelativeMousePoint(event)
            node.setPosition(point)

            node.registerListener({
              selectionChanged: e => e.isSelected && setFocusedNode(e.entity),
              linksUpdated: e => console.log("links updated", e),
            })

            console.log("serializer", node.serialize())

            props.app.getDiagramEngine().getModel().addAll(node)
            props.app
              .getDiagramEngine()
              .getModel()
              .registerListener({
                linksUpdated: e => {
                  // e.link.addLabel(
                  //   new DefaultLabelModel({
                  //     label: "iijfjsdjfjk",
                  //     locked: true,
                  //   })
                  // )
                  // e.link.addLabel(new DefaultLabelModel({ label: "xxx" }))
                  e.link.registerListener({
                    selectionChanged: e => console.log("selchanged", e),
                  })
                },
              })
            setFocusedNode(node)

            if (!(node instanceof TriangleNodeModel)) {
              setSelectedNodeState(node.getState())
            }
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
