import * as React from "react"

import { EditableLabelModel } from "./EditableLabelModel"
import styled from "@emotion/styled"
import { InlineEdit } from "../../components/inline-edit/InlineEdit"
import { useEffect, useState } from "react"
import { useForceUpdate } from "../../components/BodyWidget"

export interface FlowAliasLabelWidgetProps {
  model: EditableLabelModel
}

export const Label = styled.div<{ showLabel: boolean }>`
  user-select: none;
  pointer-events: auto;
  display: ${props => (props.showLabel ? "box" : "none")};
`

// now we can render all what we want in the label
export const EditableLabelWidget: React.FunctionComponent<
  FlowAliasLabelWidgetProps
> = props => {
  const [state, setState] = useState({
    value: props.model.getState().value || "ROLE",
    type: props.model.getState().type,
  })
  const forceUpdate = useForceUpdate()

  useEffect(() => {
    props.model.setState(state)
    forceUpdate()
  }, [state])

  console.log("state", state)

  return (
    <Label showLabel={!!props.model.getState().value}>
      <InlineEdit
        style={{
          color: "#fff",
          backgroundColor: state.type === "MULTIPLICITY" ? "#333" : "#23395D",
          padding: state.type === "MULTIPLICITY" ? "0.5rem" : "0.5rem 2rem",
          borderRadius: "0.3rem",
          fontSize: "1rem",
        }}
        state={state}
        setState={setState}
      />
    </Label>
  )
}
