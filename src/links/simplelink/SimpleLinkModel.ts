import { DefaultLinkModel } from "@projectstorm/react-diagrams"

export class SimpleLinkModel extends DefaultLinkModel {
  constructor(lineType: string) {
    super({
      type: "simple",
      width: 4,
      extras: { lineType },
    })
  }
}
