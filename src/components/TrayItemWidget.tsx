import React from "react"

import GeneralizationPng from "./node-images/Generalization.png"
import { Tray } from "./EntityTrayItemWidget"

export const TrayItemWidget = ({
  color,
  model,
  name,
  isSelected,
  setSelectedDiv,
}) => (
  <>
    <img
      src={GeneralizationPng}
      width="100"
      style={{ width: 100, position: "absolute", left: -100, bottom: 0 }}
      id="drag-generalization"
    />
    <Tray
      color={color}
      draggable={true}
      onDragStart={e => {
        const image = document.getElementById("drag-generalization")
        e.dataTransfer.setDragImage(image, 100, 50)
        e.dataTransfer.setData("storm-diagram-node", JSON.stringify(model))
      }}
      className="tray-item"
      onClick={() =>
        !isSelected ? setSelectedDiv(model) : setSelectedDiv(null)
      }
      style={{ backgroundColor: isSelected && "rgb(0,192,255)" }}
    >
      {name}
    </Tray>
  </>
)
