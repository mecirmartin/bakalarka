import * as React from "react"
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
import { LinkModel, LinkModelGenerics } from "@projectstorm/react-diagrams-core"
import {
  DefaultLabelFactory,
  DefaultLabelModel,
} from "@projectstorm/react-diagrams-defaults"
import { EditableLabelModel } from "../links/editable-label/EditableLabelModel"

export interface BodyWidgetProps {
  app: Application
}

export interface EntityTrayState {
  isWeak: boolean
}

export type RelationshipTrayState = EntityTrayState

export type AttributeType = "ATTRIBUTE" | "MULTIPLE_VALUE" | "DERIVED"
export type KeyType = "NONE" | "PRIMARY_KEY" | "PARTIAL_KEY"
export type LineTypeState =
  | "singleLine"
  | "multiLine"
  | "aggregation"
  | "composition"
  | "nonTransferableRelationship"

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
  const [_, setValue] = useState(0) // integer state
  return () => setValue(value => value + 1) // update the state to force render
}

export let lineType: LineTypeState = "singleLine"

export const BodyWidget: React.FC<BodyWidgetProps> = props => {
  const forceUpdate = useForceUpdate()

  // const [focusedLink, setFocusedLink] = useState(null)
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

  const [lineTypeState, setLineTypeState] =
    useState<LineTypeState>("singleLine")

  useEffect(() => {
    if (!focusedNode) return
    focusedNode.setState(selectedNodeState)

    props.app.getDiagramEngine().repaintCanvas()
  }, [selectedNodeState])

  useEffect(() => {
    props.app
      .getDiagramEngine()
      .getModel()
      .registerListener({
        linksUpdated: e => {
          console.log("links updated", e)
          // e.link.addLabel(
          //   new DefaultLabelModel({
          //     label: "iijfjsdjfjk",
          //     locked: true,
          //   })
          // )
          // e.link.addLabel(new DefaultLabelModel({ label: "xxx" }))
          // e.link.registerListener({
          //   selectionChanged: e => console.log("selchanged", e),
          // })
        },
      })
  }, [])

  const addLabelToSelectedLinks = (links: LinkModel[]) => {
    links.forEach(l => {
      console.log(l.getOptions())
      if (l.getOptions().selected) {
        l.addLabel(new EditableLabelModel())
        console.log(l.getLabels())
      }
    })
    props.app.getDiagramEngine().repaintCanvas()
  }

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

          <TrayHeader>Line type</TrayHeader>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <select
              name="lineSelect"
              onChange={e => {
                lineType = e.target.value as LineTypeState
                setLineTypeState(lineType)
              }}
              value={lineTypeState}
              id="lineSelect"
            >
              <option value="singleLine">Single line</option>
              <option value="multiLine">Multi line</option>
              <option value="aggregation">Aggregation</option>
              <option value="composition">Composition</option>
              <option value="nonTransferableRelationship">
                Non-transferable
              </option>
            </select>
          </div>

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
          <button
            onClick={() =>
              addLabelToSelectedLinks(
                props.app.getDiagramEngine().getModel().getLinks()
              )
            }
          >
            Clic
          </button>
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
              selectionChanged: e => {
                if (e.isSelected) {
                  setFocusedNode(e.entity)
                  //@ts-ignore
                  if (e.entity.getState) {
                    //@ts-ignore
                    setSelectedNodeState(e.entity.getState())
                  }
                }
              },
              linksUpdated: e => console.log("links updated", e),
            })

            props.app.getDiagramEngine().getModel().addAll(node)
            // props.app
            //   .getDiagramEngine()
            //   .getModel()
            //   .registerListener({
            //     linksUpdated: e => {
            //       // e.link.addLabel(
            //       //   new DefaultLabelModel({
            //       //     label: "iijfjsdjfjk",
            //       //     locked: true,
            //       //   })
            //       // )
            //       e.link.addLabel(new DefaultLabelModel({ label: "xxx" }))
            //       // e.link.registerListener({
            //       //   selectionChanged: e => console.log("selchanged", e),
            //       // })
            //     },
            //   })
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
