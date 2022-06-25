import styled from "@emotion/styled";
import React from "react";

import { DiagramNodeType } from "../helpers/nodeTypes";
import { CustomLabel, Tray } from "./EntityTrayItemWidget";
import { AttributeTrayState, AttributeType, KeyType } from "../types";

export interface AttributeTrayItemWidgetProps {
  model: DiagramNodeType;
  name: string;
  attributeTrayState: AttributeTrayState;
  setAttributeTrayState: React.Dispatch<React.SetStateAction<AttributeTrayState>>;
  setDraggedNode: React.Dispatch<React.SetStateAction<DiagramNodeType>>;
  setSelectedDiv?: (model: DiagramNodeType) => void;
  isSelected?: boolean;
  color?: string;
  selected?: boolean;
}

const SelectContainer = styled.div`
  margin-top: 0.4rem;
`;

export const AttributeTrayItemWidget: React.FC<AttributeTrayItemWidgetProps> = ({
  model,
  name,
  color,
  setAttributeTrayState,
  attributeTrayState,
  isSelected,
  setSelectedDiv,
  setDraggedNode,
}) => (
  <Tray
    color={color}
    draggable={true}
    onDragStart={e => {
      setDraggedNode(model);
      e.dataTransfer.setData("storm-diagram-node", JSON.stringify(model));
    }}
    className="tray-item"
    onClick={() => setSelectedDiv && (!isSelected ? setSelectedDiv(model) : setSelectedDiv(null))}
    style={{ backgroundColor: isSelected && "rgb(0,192,255)" }}
    data-cy="attribute-widget"
  >
    {name}
    <SelectContainer>
      <CustomLabel htmlFor="attrType">Type</CustomLabel>
      <select
        id="attrType"
        onClick={e => e.stopPropagation()}
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
      </select>
    </SelectContainer>

    <SelectContainer>
      <CustomLabel htmlFor="keyType">Key</CustomLabel>
      <select
        id="keyType"
        onClick={e => e.stopPropagation()}
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
      </select>
    </SelectContainer>
  </Tray>
);
