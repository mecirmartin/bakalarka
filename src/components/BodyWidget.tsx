import * as React from "react"
import { useEffect, useState, forwardRef, useImperativeHandle } from "react"
import { CanvasWidget } from "@projectstorm/react-canvas-core"
import { LinkModel } from "@projectstorm/react-diagrams-core"

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
import { EditableLabelModel } from "../links/editable-label/EditableLabelModel"
import {
  ButtonTray,
  Body,
  Content,
  Header,
  Layer,
  TrayButton,
  TrayHeader,
} from "./BodyWidgetComponents"

export interface BodyWidgetProps {
  app: Application
  ref: any
}

export interface EntityTrayState {
  isWeak: boolean
  value: string
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
  value: string
}

const useForceUpdate = () => {
  const [_, setValue] = useState(0) // integer state
  return () => setValue(value => value + 1) // update the state to force render
}

export let lineType: LineTypeState = "singleLine"

export const BodyWidget: React.FC<BodyWidgetProps> = forwardRef(
  (props, ref) => {
    const forceUpdate = useForceUpdate()
    const [focusedNode, setFocusedNode] = useState(null)
    const [selectedNodeState, setSelectedNodeState] = useState(null)
    const [entityTrayState, setEntityTrayState] = useState<EntityTrayState>({
      isWeak: false,
      value: "",
    })
    const [relationshipTrayState, setRelationshipTrayState] =
      useState<RelationshipTrayState>({
        isWeak: false,
        value: "",
      })
    const [attributeTrayState, setAttributeTrayState] =
      useState<AttributeTrayState>({
        type: "ATTRIBUTE",
        key: "NONE",
        value: "",
      })
    const [lineTypeState, setLineTypeState] =
      useState<LineTypeState>("singleLine")
    const [shiftPressed, setShiftPressed] = useState(false)

    useEffect(() => {
      if (!focusedNode) return
      focusedNode.setState(selectedNodeState)

      props.app.getDiagramEngine().repaintCanvas()
    }, [selectedNodeState])

    // The component instance will be extended
    // with whatever you return from the callback passed
    // as the second argument
    useImperativeHandle(ref, () => ({ handleDeserialize, handleSerialize }))

    const setMaxPointsOnLine = (maxNumber: number) => {
      props.app.getDiagramEngine().setMaxNumberPointsPerLink(maxNumber)
    }

    useEffect(() => {
      if (shiftPressed) setMaxPointsOnLine(1000)
      else setMaxPointsOnLine(0)
      console.log(props.app.getDiagramEngine().maxNumberPointsPerLink)
      props.app.getDiagramEngine().repaintCanvas()
    }, [shiftPressed])

    useEffect(() => {
      document.addEventListener(
        "keydown",
        e =>
          (e.code === "ShiftRight" || e.code === "ShiftLeft") &&
          setShiftPressed(true)
      )
      document.addEventListener(
        "keyup",
        e =>
          (e.code === "ShiftRight" || e.code === "ShiftLeft") &&
          setShiftPressed(false)
      )
    }, [])

    console.log(shiftPressed)

    const addLabelToSelectedLinks = (links: LinkModel[]) => {
      links.forEach(l => {
        if (l.getOptions().selected) {
          l.addLabel(new EditableLabelModel({ value: "" }))
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
          return new TriangleNodeModel({ value: "" })
        default:
          throw new Error("Unknown diagram node type")
      }
    }

    const handleSerialize = () => {
      const serialized = props.app.getDiagramEngine().getModel().serialize()
      const blob = new Blob([JSON.stringify(serialized)], {
        type: "text/plain;charset=utf-8",
      })

      const href = URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = href
      link.download = "ErdDiagram.json"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }

    const handleDeserialize = () =>
      (document.querySelector("#file") as HTMLInputElement).click()

    const handleDeserializeString = (serializedString: string) => {
      const serialized = JSON.parse(serializedString)
      props.app
        .getDiagramEngine()
        .getModel()
        .deserializeModel(serialized, props.app.getDiagramEngine())
      props.app
        .getDiagramEngine()
        .getModel()
        .getNodes()
        .forEach(n =>
          n.registerListener({
            selectionChanged: e => {
              if (e.isSelected) {
                //@ts-ignore
                setFocusedNode(e.entity)
                //@ts-ignore
                if (e.entity.getState) {
                  //@ts-ignore
                  setSelectedNodeState(e.entity.getState())
                }
              }
            },
          })
        )
      props.app.getDiagramEngine().repaintCanvas()
    }

    const handleFileChosen = (file: File) => {
      const fileReader = new FileReader()
      fileReader.onloadend = () => {
        const content = fileReader.result.toString()
        handleDeserializeString(content)
      }
      fileReader.readAsText(file)
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
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "0.5rem",
                color: "#fff",
              }}
            >
              <label htmlFor="add-points">Add line points</label>
              <input
                name="add-points"
                type="checkbox"
                style={{ marginLeft: "0.3rem" }}
                checked={shiftPressed}
                onChange={e =>
                  e.target.checked
                    ? setShiftPressed(true)
                    : setShiftPressed(false)
                }
              />
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
            <ButtonTray>
              <TrayButton
                onClick={() =>
                  addLabelToSelectedLinks(
                    props.app.getDiagramEngine().getModel().getLinks()
                  )
                }
              >
                Add label
              </TrayButton>
              <TrayButton onClick={handleSerialize}>Serialize graph</TrayButton>
              <TrayButton onClick={handleDeserialize}>
                Deserialize graph
              </TrayButton>
              <input
                type="file"
                id="file"
                style={{ display: "none" }}
                accept=".json,.txt"
                onChange={e => handleFileChosen(e.target.files[0])}
              />
            </ButtonTray>
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
                    if (e.entity.getState()) {
                      //@ts-ignore
                      setSelectedNodeState(e.entity.getState())
                    }
                  } else {
                    setFocusedNode(null)
                  }
                },
              })

              props.app.getDiagramEngine().getModel().addAll(node)
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
)
