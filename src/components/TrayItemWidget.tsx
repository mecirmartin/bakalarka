import React from "react";
import { Tray } from "./EntityTrayItemWidget";

export const TrayItemWidget = ({
  color,
  model,
  name,
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
    onClick={() => (!isSelected ? setSelectedDiv(model) : setSelectedDiv(null))}
    style={{ backgroundColor: isSelected && "rgb(0,192,255)" }}
    data-cy="generalization-widget"
  >
    {name}
  </Tray>
);
