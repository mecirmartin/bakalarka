import { DefaultLinkFactory, DefaultLinkModel } from "@projectstorm/react-diagrams";
import React from "react";

import { lineType } from "../../components/BodyWidget";
import { Path } from "../simplelink/SimpleLinkFactory";
import { CustomLinkModel } from "./CustomLinkModel";
import { CustomLinkWidget } from "./CustomLinkWidget";

export class CustomLinkFactory extends DefaultLinkFactory {
  constructor() {
    super("custom");
  }

  generateModel(): CustomLinkModel {
    return new CustomLinkModel(lineType);
  }

  generateReactWidget(event): JSX.Element {
    return <CustomLinkWidget link={event.model} diagramEngine={this.engine} />;
  }

  generateLinkSegment(model: DefaultLinkModel, selected: boolean, path: string) {
    return (
      <Path
        selected={selected}
        stroke={selected ? model.getOptions().selectedColor : model.getOptions().color}
        strokeWidth={model.getOptions().width}
        d={path}
      />
    );
  }
}
