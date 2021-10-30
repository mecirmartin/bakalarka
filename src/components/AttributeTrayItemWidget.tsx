import styled from "@emotion/styled"
import React from "react"
import { DiagramNodeType } from "../helpers/nodeTypes"
import { CustomLabel, Tray } from "./EntityTrayItemWidget"
import { AttributeTrayState, AttributeType, KeyType } from "./BodyWidget"

export interface AttributeTrayItemWidgetProps {
  model: DiagramNodeType
  name: string
  attributeTrayState: AttributeTrayState
  setAttributeTrayState: React.Dispatch<
    React.SetStateAction<AttributeTrayState>
  >
  color?: string
  selected?: boolean
}

const CustomSelect = styled.select``

const SelectContainer = styled.div`
  margin-top: 0.4rem;
`

export const AttributeTrayItemWidget: React.FC<AttributeTrayItemWidgetProps> =
  ({ model, name, color, setAttributeTrayState, attributeTrayState }) => (
    <Tray
      color={color}
      draggable={true}
      onDragStart={event => {
        event.dataTransfer.setData("storm-diagram-node", JSON.stringify(model))
      }}
      className="tray-item"
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
        >
          <option value="NONE">None</option>
          {attributeTrayState.type !== "DERIVED" && (
            <>
              <option value="PRIMARY_KEY">Primary key</option>
              <option value="PARTIAL_KEY">Partial key</option>
            </>
          )}
        </CustomSelect>
      </SelectContainer>
    </Tray>
  )