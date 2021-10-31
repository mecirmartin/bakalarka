import React from "react"

import { Tray } from "./EntityTrayItemWidget"

export const TrayItemWidget = ({ color, model, name }) => (
  <Tray
    color={color}
    draggable={true}
    onDragStart={event => {
      event.dataTransfer.setData("storm-diagram-node", JSON.stringify(model))
    }}
    className="tray-item"
  >
    {name}
  </Tray>
)
