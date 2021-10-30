import { DefaultLinkModel } from "@projectstorm/react-diagrams"

export class AdvancedLinkModel extends DefaultLinkModel {
  constructor() {
    console.log("KONSTRUUJEM")
    super({
      type: "advanced",
      width: 4,
    })
  }
}
