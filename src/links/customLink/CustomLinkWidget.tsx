import { DefaultLinkWidget, PointModel, LinkWidget } from "@projectstorm/react-diagrams";
import React from "react";
import { CustomLinkSegmentWidget } from "../LinkSegment";

const CustomLinkArrowWidget = props => {
  const {
    point,
    previousPoint,
    link: { sourcePort, targetPort },
  } = props;

  const angle =
    (Math.atan2(
      point.getPosition().y - previousPoint.getPosition().y,
      point.getPosition().x - previousPoint.getPosition().x
    ) *
      180) /
    Math.PI;

  const position = sourcePort.position;
  const previousPosition = targetPort.position;
  const xOffset = (position.x - previousPosition.x) / 2;
  const yOffset = (position.y - previousPosition.y) / 2;
  const offset =
    props.lineType === "nonTransferableRelationship"
      ? (Math.abs(xOffset) + Math.abs(yOffset)) / 2
      : 0;

  return (
    <g
      className="arrow"
      transform={"translate(" + point.getPosition().x + ", " + point.getPosition().y + ")"}
    >
      <g style={{ transform: "rotate(" + angle + "deg)" }}>
        <g transform={"translate(-38, 0)"}>
          <path
            d={`M ${0 - offset} 0 L ${20 - offset} -13.3333 L ${40 - offset} 0 L ${
              20 - offset
            } 13.3333 L ${0 - offset} 0`}
            fill={
              props.lineType === "aggregation"
                ? "white"
                : props.lineType === "composition"
                ? "gray"
                : "rgba(255, 255, 255, 0)"
            }
            stroke="gray"
            strokeWidth={2}
            data-id={point.getID()}
            data-linkid={point.getLink().getID()}
          />
        </g>
      </g>
    </g>
  );
};

export class CustomLinkWidget extends DefaultLinkWidget {
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

  generateArrow(point: PointModel, previousPoint: PointModel): JSX.Element {
    return (
      <CustomLinkArrowWidget
        key={point.getID()}
        point={point as any}
        previousPoint={previousPoint as any}
        colorSelected={this.props.link.getOptions().selectedColor}
        color={this.props.link.getOptions().color}
        lineType={this.props.link.getOptions().extras.lineType}
        link={this.props.link}
      />
    );
  }

  render() {
    //ensure id is present for all points on the path
    var points = this.props.link.getPoints();
    var paths = [];
    this.refPaths = [];

    //draw the multiple anchors and complex line instead
    for (let j = 0; j < points.length - 1; j++) {
      paths.push(
        this.generateLink(
          LinkWidget.generateLinePath(points[j], points[j + 1]),
          {
            "data-linkid": this.props.link.getID(),
            "data-point": j,
            onMouseDown:
              this.props.link.getOptions().extras.lineType !== "nonTransferableRelationship"
                ? (event: MouseEvent) => this.addPointToLink(event as any, j + 1)
                : null,
          },
          j
        )
      );
    }

    for (let i = 1; i < points.length - 1; i++) {
      paths.push(this.generatePoint(points[i]));
    }

    if (
      this.props.link.getOptions().extras.lineType === "singleLine" ||
      this.props.link.getOptions().extras.lineType === "multiLine"
    ) {
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

    if (this.props.link.getTargetPort() !== null) {
      paths.push(this.generateArrow(points[points.length - 1], points[points.length - 2]));
    } else {
      paths.push(this.generatePoint(points[points.length - 1]));
    }

    return <g data-default-link-test={this.props.link.getOptions().testName}>{paths}</g>;
  }
}
