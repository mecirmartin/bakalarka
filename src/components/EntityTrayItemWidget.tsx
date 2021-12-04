import * as React from "react"
import styled from "@emotion/styled"
import { DiagramNodeType } from "../helpers/nodeTypes"
import { EntityTrayState } from "./BodyWidget"

export interface EntityTrayItemWidgetProps {
  model: DiagramNodeType
  name: string
  setEntityTrayState: React.Dispatch<React.SetStateAction<EntityTrayState>>
  state?: EntityTrayState
  color?: string
}

export const Tray = styled.div<{ color: string }>`
  color: white;
  font-family: Helvetica, Arial;
  padding: 5px;
  margin: 0px 10px;
  border: solid 1px ${p => p.color};
  border-radius: 5px;
  margin-bottom: 2px;
  cursor: pointer;
`

export const ButtonTray = styled.div`
  display: flex;
  align-items: center;
  margin-top: 0.4rem;
`

// TODO Style this
export const CustomCheckbox = styled.input`
  background-color: rgb(0, 192, 255);
  border: none;
  cursor: pointer;
  padding: 0.2rem 0.4rem 0.2rem 0.4rem;
`

export const CustomLabel = styled.label`
  margin-right: 0.3rem;
  font-size: smaller;
`

export const EntityTrayItemWidget: React.FC<EntityTrayItemWidgetProps> = ({
  model,
  name,
  color,
  state,
  setEntityTrayState,
}) => (
  <Tray
    color={color}
    draggable={true}
    onDragStart={event =>
      event.dataTransfer.setData("storm-diagram-node", JSON.stringify(model))
    }
    className="tray-item"
  >
    {name}
    <ButtonTray>
      <CustomLabel htmlFor="type">
        {name === "Entity" ? "Weak" : "Identification"}
      </CustomLabel>
      <CustomCheckbox
        id="type"
        type="checkbox"
        onChange={e =>
          setEntityTrayState(entityTrayState => ({
            ...entityTrayState,
            isWeak: e.target.checked,
          }))
        }
        checked={state?.isWeak}
      />
    </ButtonTray>
  </Tray>
)
