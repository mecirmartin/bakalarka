import { DefaultLinkFactory } from "@projectstorm/react-diagrams"
import React from "react"
import { AdvancedLinkModel } from "./AdvancedLinkMode"
import { AdvancedLinkSegment } from "./AdvancedLinkWidget"

export class AdvancedLinkFactory extends DefaultLinkFactory {
  constructor() {
    super("advanced")
  }

  generateModel(): AdvancedLinkModel {
    return new AdvancedLinkModel()
  }

  generateLinkSegment(
    model: AdvancedLinkModel,
    selected: boolean,
    path: string
  ): JSX.Element {
    return (
      <g>
        <AdvancedLinkSegment model={model} path={path} />
      </g>
    )
  }
}
