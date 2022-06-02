import { DefaultLinkModel } from "@projectstorm/react-diagrams";

export class CustomLinkModel extends DefaultLinkModel {
  constructor(lineType: string) {
    super({
      type: "custom",
      width: 4,
      extras: { lineType },
    });
  }
}
