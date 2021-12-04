import { DefaultPortModel } from "@projectstorm/react-diagrams-defaults"
import { AdvancedLinkModel } from "../links/advancedlink/AdvancedLinkModel"
import { SimpleLinkModel } from "../links/simplelink/SimpleLinkModel"
import { lineType } from "./BodyWidget"

export class BidirectionalPortModel extends DefaultPortModel {
  canLinkToPort() {
    return true
  }
  createLinkModel() {
    let link: SimpleLinkModel | AdvancedLinkModel
    if (lineType === "singleLine" || lineType === "multiLine") {
      link = new SimpleLinkModel(lineType)
    } else if (
      lineType === "aggregation" ||
      lineType === "composition" ||
      lineType === "nonTransferableRelationship"
    ) {
      link = new AdvancedLinkModel(lineType)
    }

    link.registerListener({
      eventDidFire: e => {
        try {
          //@ts-ignore
          if (e.function === "selectionChanged" && e.isSelected) {
            link.setPoints([
              link.getFirstPoint(),
              link.generatePoint(this.getPosition().x, this.getPosition().y),
            ])
          }
        } catch (error) {
          console.log("Error trying to generate link position")
        }
      },
    })

    return link
  }
}
