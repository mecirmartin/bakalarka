import { DefaultLinkFactory } from "@projectstorm/react-diagrams"
import React from "react"
// TODO some global state please!!!
import { lineType } from "../../components/BodyWidget"
import { SimpleLinkModel } from "./SimpleLinkModel"
import { SimpleLinkWidget } from "./SimpleLinkWidget"

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
}
