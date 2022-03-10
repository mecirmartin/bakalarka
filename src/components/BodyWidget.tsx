import * as React from "react"
import { useEffect, useState, forwardRef, useImperativeHandle } from "react"
import { CanvasWidget } from "@projectstorm/react-canvas-core"
import { LinkModel, NodeModel } from "@projectstorm/react-diagrams-core"

import { TrayWidget } from "./TrayWidget"
import { EntityTrayItemWidget } from "./EntityTrayItemWidget"
import { DemoCanvasWidget } from "../helpers/DemoCanvasWidget"
import {
  ATTRIBUTE,
  DiagramNodeType,
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
import {
  LineTypeState,
  BodyWidgetProps,
  EntityTrayState,
  RelationshipTrayState,
  AttributeTrayState,
} from "../types"

const useForceUpdate = () => {
  const [_, setValue] = useState(0) // integer state
  return () => setValue(value => value + 1) // update the state to force render
}

export let lineType: LineTypeState = "singleLine"

export const BodyWidget: React.FC<BodyWidgetProps> = forwardRef(
  ({ app }, ref) => {
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
    const [selectedDiv, setSelectedDiv] = useState<DiagramNodeType | null>(null)
    const [skeletonNode, setSkeletonNode] = useState<NodeModel | null>(null)
    const [draggedNode, setDraggedNode] = useState<DiagramNodeType | null>()
    const [mousePosition, setMousePosition] =
      useState<{ clientX: number; clientY: number }>()

    useEffect(() => {
      if (!focusedNode) return
      focusedNode.setState(selectedNodeState)

      app.getDiagramEngine().repaintCanvas()
    }, [selectedNodeState])

    // The component instance will be extended
    // with whatever you return from the callback passed
    // as the second argument
    useImperativeHandle(ref, () => ({ handleDeserialize, handleSerialize }))

    const setMaxPointsOnLine = (maxNumber: number) =>
      app.getDiagramEngine().setMaxNumberPointsPerLink(maxNumber)

    useEffect(() => {
      if (shiftPressed) setMaxPointsOnLine(1000)
      else setMaxPointsOnLine(0)
      console.log(app.getDiagramEngine().maxNumberPointsPerLink)
      app.getDiagramEngine().repaintCanvas()
    }, [shiftPressed])

    useEffect(() => {
      // TODO Discuss this
      // const keydownCb = e =>
      //   (e.code === "ShiftRight" || e.code === "ShiftLeft") &&
      //   setShiftPressed(!shiftPressed)
      // window.addEventListener("keydown", keydownCb)
      // return () => window.removeEventListener("keydown", keydownCb)
    }, [shiftPressed])

    const addLabelToSelectedLinks = (links: LinkModel[]) => {
      links.forEach(l => {
        if (l.getOptions().selected) {
          l.addLabel(new EditableLabelModel({ value: "" }))
        }
      })
      app.getDiagramEngine().repaintCanvas()
    }

    useEffect(() => {
      window.addEventListener("mousemove", e => {
        setMousePosition({ clientX: e.clientX, clientY: e.clientY })
      })
    }, [])

    const createDiagramNode = (type: DiagramNodeType) => {
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
          throw new Error(`Unknown diagram node type: ${type}`)
      }
    }

    const addNodeToCanvas = (event, nodeType: DiagramNodeType) => {
      const node = createDiagramNode(nodeType)

      const point = app.getDiagramEngine().getRelativeMousePoint(event)
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

      app.getDiagramEngine().getModel().addAll(node)
      setFocusedNode(node)

      if (!(node instanceof TriangleNodeModel)) {
        setSelectedNodeState(node.getState())
      }
      forceUpdate()
    }

    const handleSerialize = () => {
      const serialized = app.getDiagramEngine().getModel().serialize()
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
      app
        .getDiagramEngine()
        .getModel()
        .deserializeModel(serialized, app.getDiagramEngine())
      app
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
      app.getDiagramEngine().repaintCanvas()
    }

    const handleFileChosen = (file: File) => {
      const fileReader = new FileReader()
      fileReader.onloadend = () => {
        const content = fileReader.result.toString()
        handleDeserializeString(content)
      }
      fileReader.readAsText(file)
    }

    const handleKeyDown = e => {
      e.clientX = mousePosition.clientX
      e.clientY = mousePosition.clientY
      if (e.key === "e") addNodeToCanvas(e, ENTITY)
      if (e.key === "r") addNodeToCanvas(e, RELATIONSHIP)
      if (e.key === "a") addNodeToCanvas(e, ATTRIBUTE)
      if (e.key === "g") addNodeToCanvas(e, GENERALIZATION_CATEGORY)
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
              setSelectedDiv={setSelectedDiv}
              isSelected={selectedDiv === ENTITY}
              name="Entity"
              color="rgb(0,192,255)"
              setEntityTrayState={setEntityTrayState}
              setDraggedNode={setDraggedNode}
            />
            <EntityTrayItemWidget
              model={RELATIONSHIP}
              setSelectedDiv={setSelectedDiv}
              isSelected={selectedDiv === RELATIONSHIP}
              name="Relationship"
              color="rgb(0,192,255)"
              setEntityTrayState={setRelationshipTrayState}
              setDraggedNode={setDraggedNode}
            />
            <AttributeTrayItemWidget
              model={ATTRIBUTE}
              setSelectedDiv={setSelectedDiv}
              isSelected={selectedDiv === ATTRIBUTE}
              name="Attribute"
              color="rgb(0,192,255)"
              attributeTrayState={attributeTrayState}
              setAttributeTrayState={setAttributeTrayState}
              setDraggedNode={setDraggedNode}
            />
            <TrayItemWidget
              model={GENERALIZATION_CATEGORY}
              setSelectedDiv={setSelectedDiv}
              isSelected={selectedDiv === GENERALIZATION_CATEGORY}
              name="Generalization/category"
              color="rgb(0,192,255)"
              setDraggedNode={setDraggedNode}
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
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <TrayButton
                onClick={() =>
                  addLabelToSelectedLinks(
                    app.getDiagramEngine().getModel().getLinks()
                  )
                }
              >
                Add label
              </TrayButton>
            </div>

            <TrayHeader>Selected Node</TrayHeader>
            {focusedNode instanceof EntityModel && (
              <EntityTrayItemWidget
                model={ENTITY}
                name="Entity"
                color="rgb(144,238,144)"
                state={selectedNodeState}
                setEntityTrayState={setSelectedNodeState}
                setDraggedNode={setDraggedNode}
              />
            )}

            {focusedNode instanceof RelationshipModel && (
              <EntityTrayItemWidget
                model={RELATIONSHIP}
                name="Relationship"
                color="rgb(144,238,144)"
                state={selectedNodeState}
                setEntityTrayState={setSelectedNodeState}
                setDraggedNode={setDraggedNode}
              />
            )}

            {focusedNode instanceof AttributeModel && (
              <AttributeTrayItemWidget
                model={ATTRIBUTE}
                name="Attribute"
                color="rgb(144,238,144)"
                attributeTrayState={selectedNodeState}
                setAttributeTrayState={setSelectedNodeState}
                setDraggedNode={setDraggedNode}
              />
            )}
            <ButtonTray>
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
            tabIndex={0}
            onKeyDown={handleKeyDown}
            onClick={e => selectedDiv && addNodeToCanvas(e, selectedDiv)}
            onDrop={e => {
              const nodeType = JSON.parse(
                e.dataTransfer.getData("storm-diagram-node")
              )
              addNodeToCanvas(e, nodeType)
              skeletonNode.remove()
              setSkeletonNode(null)
            }}
            onDragOver={e => {
              e.preventDefault()
              console.log("dragover", e)
              if (!skeletonNode) {
                const skeleton = createDiagramNode(draggedNode)
                setSkeletonNode(skeleton)
                app.getDiagramEngine().getModel().addAll(skeleton)
              } else {
                const point = app.getDiagramEngine().getRelativeMousePoint(e)
                skeletonNode.setPosition(point)
              }

              forceUpdate()
              e.preventDefault()
            }}
          >
            <DemoCanvasWidget>
              <CanvasWidget engine={app.getDiagramEngine()} />
            </DemoCanvasWidget>
          </Layer>
        </Content>
      </Body>
    )
  }
)
