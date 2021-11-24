import { PortModel } from "@projectstorm/react-diagrams-core"
import {
  DefaultLabelModel,
  DefaultLinkModel,
  DefaultPortModel,
} from "@projectstorm/react-diagrams-defaults"
import { AdvancedLinkModel } from "../links/advancedlink/AdvancedLinkModel"
import { SimpleLinkModel } from "../links/simplelink/SimpleLinkModel"
import { lineType } from "./BodyWidget"

export class BidirectionalPortModel extends DefaultPortModel {
  canLinkToPort(port: PortModel) {
    return true
  }
  createLinkModel() {
    if (lineType === "singleLine" || lineType === "multiLine") {
      return new SimpleLinkModel(lineType)
    } else if (
      lineType === "aggregation" ||
      lineType === "composition" ||
      lineType === "nonTransferableRelationship"
    ) {
      return new AdvancedLinkModel(lineType)
    }
  }
}
