import styled from "@emotion/styled"
import React from "react"

import { DiagramNodeType } from "../helpers/nodeTypes"
import { CustomLabel, Tray } from "./EntityTrayItemWidget"
import { AttributeTrayState, AttributeType, KeyType } from "../types"
import AttributePng from "./node-images/Attribute.png"

export interface AttributeTrayItemWidgetProps {
  model: DiagramNodeType
  name: string
  attributeTrayState: AttributeTrayState
  setAttributeTrayState: React.Dispatch<
    React.SetStateAction<AttributeTrayState>
  >
  setSelectedDiv?: (model: DiagramNodeType) => void
  isSelected?: boolean
  color?: string
  selected?: boolean
}

const CustomSelect = styled.select``

const SelectContainer = styled.div`
  margin-top: 0.4rem;
`

export const AttributeTrayItemWidget: React.FC<AttributeTrayItemWidgetProps> =
  ({
    model,
    name,
    color,
    setAttributeTrayState,
    attributeTrayState,
    isSelected,
    setSelectedDiv,
  }) => {
    return (
      <>
        <img
          src={AttributePng}
          width="100"
          style={{ width: 100, position: "absolute", right: -100, bottom: 0 }}
          id="drag-attribute"
        />
        <Tray
          color={color}
          draggable={true}
          onDragStart={e => {
            const image = document.getElementById("drag-attribute")
            e.dataTransfer.setDragImage(image, 100, 200)
            e.dataTransfer.setData("storm-diagram-node", JSON.stringify(model))
          }}
          className="tray-item"
          onClick={() =>
            !isSelected ? setSelectedDiv(model) : setSelectedDiv(null)
          }
          style={{ backgroundColor: isSelected && "rgb(0,192,255)" }}
        >
          {name}
          <SelectContainer>
            <CustomLabel htmlFor="attrType">Type</CustomLabel>
            <CustomSelect
              id="attrType"
              onChange={e =>
                setAttributeTrayState((attributeState: AttributeTrayState) => ({
                  ...attributeState,
                  type: e.target.value as AttributeType,
                }))
              }
              value={attributeTrayState.type}
            >
              <option value="ATTRIBUTE">Attribute</option>
              <option value="MULTIPLE_VALUE">Multi-value</option>
              <option value="DERIVED">Derived</option>
            </CustomSelect>
          </SelectContainer>

          <SelectContainer>
            <CustomLabel htmlFor="keyType">Key</CustomLabel>
            <CustomSelect
              id="keyType"
              onChange={e =>
                setAttributeTrayState((attributeState: AttributeTrayState) => ({
                  ...attributeState,
                  key: e.target.value as KeyType,
                }))
              }
              value={attributeTrayState.key}
            >
              <option value="NONE">None</option>
              {attributeTrayState.type !== "DERIVED" && (
                <>
                  <option value="PRIMARY_KEY">Key</option>
                  <option value="PARTIAL_KEY">Partial key</option>
                </>
              )}
            </CustomSelect>
          </SelectContainer>
        </Tray>
      </>
    )
  }
