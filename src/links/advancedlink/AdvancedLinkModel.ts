import { DefaultLinkModel } from "@projectstorm/react-diagrams"

export class AdvancedLinkModel extends DefaultLinkModel {
  constructor(lineType: string) {
    super({
      type: "advanced",
      width: 4,
      extras: { lineType },
    })
  }
}
