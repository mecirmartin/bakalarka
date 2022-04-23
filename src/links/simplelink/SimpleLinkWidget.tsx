import { DefaultLinkWidget, LinkWidget } from "@projectstorm/react-diagrams";
import React from "react";
import { CustomLinkSegmentWidget } from "../LinkSegment";

export class SimpleLinkWidget extends DefaultLinkWidget {
  generateLink(path: string, extraProps: any, id: string | number): JSX.Element {
    const ref = React.createRef<SVGPathElement>();
    this.refPaths.push(ref);
    return (
      <CustomLinkSegmentWidget
        key={`link-${id}`}
        path={path}
        selected={this.state.selected}
        diagramEngine={this.props.diagramEngine}
        factory={this.props.diagramEngine.getFactoryForLink(this.props.link)}
        link={this.props.link}
        forwardRef={ref}
        onSelection={selected => {
          this.setState({ selected: selected });
        }}
        extras={extraProps}
      />
    );
  }

  render() {
    //ensure id is present for all points on the path
    const points = this.props.link.getPoints();
    const paths = [];
    this.refPaths = [];

    //draw the multiple anchors and complex line instead
    for (let j = 0; j < points.length - 1; j++) {
      paths.push(
        this.generateLink(
          LinkWidget.generateLinePath(points[j], points[j + 1]),
          {
            "data-linkid": this.props.link.getID(),
            "data-point": j,
            onMouseDown: (event: MouseEvent) => {
              this.addPointToLink(event as any, j + 1);
            },
            filter: "url(#double)",
          },
          j
        )
      );
    }

    //render the circles
    for (let i = 1; i < points.length - 1; i++) {
      paths.push(this.generatePoint(points[i]));
    }

    // paths.push(this.generatePoint(points[points.length - 1]))

    const linkPaths = paths.filter(p => p.props.link);
    const pointPaths = paths.filter(p => p.props.point);

    return (
      <>
        <g
          data-default-link-test={this.props.link.getOptions().testName}
          filter={
            this.props.link.getOptions().extras.lineType === "multiLine" ? "url(#double)" : ""
          }
        >
          {linkPaths}
        </g>
        <g>{pointPaths}</g>
        <defs>
          <filter id="double" filterUnits="userSpaceOnUse">
            <feMorphology in="SourceGraphic" result="a" operator="dilate" radius="2" />
            <feComposite in="SourceGraphic" in2="a" result="xx" operator="xor" />
          </filter>
        </defs>
      </>
    );
  }
}
