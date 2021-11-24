import {
  DefaultLabelModel,
  DefaultLinkFactory,
} from "@projectstorm/react-diagrams"
import React from "react"
// TODO some global state please!!!
import { lineType } from "../../components/BodyWidget"
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
}
