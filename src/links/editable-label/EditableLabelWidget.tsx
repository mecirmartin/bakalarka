import * as React from "react"

import { EditableLabelModel } from "./EditableLabelModel"
import styled from "@emotion/styled"
import { InlineEdit } from "../../components/inline-edit/InlineEdit"
import { useEffect, useState } from "react"

export interface FlowAliasLabelWidgetProps {
  model: EditableLabelModel
}

export const Label = styled.div`
  user-select: none;
  pointer-events: auto;
`

// now we can render all what we want in the label
export const EditableLabelWidget: React.FunctionComponent<FlowAliasLabelWidgetProps> =
  props => {
    const [state, setState] = useState({
      value: props.model.getState() || "Label",
    })

    useEffect(() => {
      props.model.setState(state.value)
    }, [state])

    return (
      <Label>
        <InlineEdit
          style={{
            color: "#fff",
            backgroundColor: "#333",
            padding: "0.5rem",
            borderRadius: "0.3rem",
            fontSize: "1rem",
          }}
          state={state}
          setState={setState}
        />
      </Label>
    )
  }
