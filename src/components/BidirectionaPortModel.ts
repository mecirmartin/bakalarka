import { PortModel } from "@projectstorm/react-diagrams-core"
import {
  DefaultLinkModel,
  DefaultPortModel,
} from "@projectstorm/react-diagrams-defaults"
import { AdvancedLinkModel } from "../links/custom-link/AdvancedLinkMode"

export class BidirectionalPortModel extends DefaultPortModel {
  canLinkToPort(port: PortModel) {
    return true
  }
  createLinkModel(): AdvancedLinkModel | null {
    return new DefaultLinkModel()
  }
}
