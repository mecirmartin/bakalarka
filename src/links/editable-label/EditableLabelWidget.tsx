import * as React from "react";

import { EditableLabelModel } from "./EditableLabelModel";
import styled from "@emotion/styled";
import { InlineEdit } from "../../components/inline-edit/InlineEdit";
import { useEffect, useRef, useState } from "react";
import { useForceUpdate } from "../../components/BodyWidget";

export interface FlowAliasLabelWidgetProps {
  model: EditableLabelModel;
}

export const Label = styled.div<{ showLabel: boolean }>`
  user-select: none;
  pointer-events: auto;
  display: ${props => (props.showLabel ? "box" : "none")};
`;

// now we can render all what we want in the label
export const EditableLabelWidget: React.FunctionComponent<FlowAliasLabelWidgetProps> = props => {
  const [state, setState] = useState({
    value: props.model.getState().value || "ROLE",
    type: props.model.getState().type,
  });
  const [showLabel, setShowLabel] = useState(true);
  const labelRef = useRef(null);
  const forceUpdate = useForceUpdate();

  useEffect(() => {
    props.model.setState(state);
    forceUpdate();
  }, [state]);

  useEffect(() => {
    const handleClickOutside = event => {
      if (
        labelRef.current &&
        !labelRef.current.contains(event.target) &&
        !props.model.getState().value
      ) {
        setShowLabel(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [labelRef]);

  return (
    <Label ref={labelRef} showLabel={showLabel}>
      <InlineEdit
        style={{
          color: "#fff",
          backgroundColor: state.type === "MULTIPLICITY" ? "#333" : "#23395D",
          padding: state.type === "MULTIPLICITY" ? "0.5rem" : "0.5rem 2rem",
          borderRadius: "0.3rem",
          fontSize: state.type === "MULTIPLICITY" ? "1rem" : "1.3rem",
        }}
        state={state}
        setState={setState}
      />
    </Label>
  );
};
