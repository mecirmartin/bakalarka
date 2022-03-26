import styled from "@emotion/styled"
import {
  DefaultLinkFactory,
  DefaultLinkModel,
} from "@projectstorm/react-diagrams"
import React from "react"

import { lineType } from "../../components/BodyWidget"
import { SimpleLinkModel } from "./SimpleLinkModel"
import { SimpleLinkWidget } from "./SimpleLinkWidget"

export const Path = styled.path<{ selected: boolean }>`
  -webkit-filter: ${p =>
    p.selected && "drop-shadow(0 0 10px rgb(0, 192, 255))"};
  filter: ${p => p.selected && "drop-shadow(0 0 10px rgb(0, 192, 255))"};
  fill: none;
  pointer-events: auto;
`

export class SimpleLinkFactory extends DefaultLinkFactory {
  constructor() {
    super("simple")
  }

  generateModel(): SimpleLinkModel {
    return new SimpleLinkModel(lineType)
  }

  generateReactWidget(event): JSX.Element {
    return <SimpleLinkWidget link={event.model} diagramEngine={this.engine} />
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
