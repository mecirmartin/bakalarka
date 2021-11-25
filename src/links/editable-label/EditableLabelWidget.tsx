import * as React from "react"

import { EditableLabelModel } from "./EditableLabelModel"
import styled from "@emotion/styled"
import { InlineEdit } from "../../components/inline-edit/InlineEdit"

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
    const [str, setStr] = React.useState(props.model.value)

    return (
      <Label>
        {/* <input
          value={str}
          onChange={event => {
            const newVal = event.target.value

            // update value both in internal component state
            setStr(newVal)
            // and in model object
            props.model.value = newVal
          }}
        />

        <button onClick={() => console.log("clicked")}>Click me!</button> */}
        <InlineEdit
          style={{
            color: "#fff",
            backgroundColor: "#333",
            padding: "0.5rem",
            borderRadius: "0.3rem",
            fontSize: "1rem",
          }}
          text={"Label"}
        />
      </Label>
    )
  }
