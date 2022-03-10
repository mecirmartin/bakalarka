import {
  DefaultLinkFactory,
  DefaultLinkModel,
} from "@projectstorm/react-diagrams"
import React from "react"

import { lineType } from "../../components/BodyWidget"
import { Path } from "../simplelink/SimpleLinkFactory"
import { AdvancedLinkModel } from "./AdvancedLinkModel"
import { AdvancedLinkWidget } from "./AdvancedLinkWidget"

export class AdvancedLinkFactory extends DefaultLinkFactory {
  constructor() {
    super("advanced")
  }

  generateModel(): AdvancedLinkModel {
    return new AdvancedLinkModel(lineType)
  }

  generateReactWidget(event): JSX.Element {
    return <AdvancedLinkWidget link={event.model} diagramEngine={this.engine} />
  }

  generateLinkSegment(
    model: DefaultLinkModel,
    selected: boolean,
    path: string
  ) {
    return (
      <Path
        selected={selected}
        stroke={
          selected ? model.getOptions().selectedColor : model.getOptions().color
        }
        strokeWidth={model.getOptions().width}
        d={path}
      />
    )
  }
}
