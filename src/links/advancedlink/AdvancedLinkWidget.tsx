import {
  DefaultLinkWidget,
  PointModel,
  LinkWidget,
} from "@projectstorm/react-diagrams"

const CustomLinkArrowWidget = props => {
  const {
    point,
    previousPoint,
    link: { sourcePort, targetPort },
  } = props

  const angle =
    (Math.atan2(
      point.getPosition().y - previousPoint.getPosition().y,
      point.getPosition().x - previousPoint.getPosition().x
    ) *
      180) /
    Math.PI

  const position = sourcePort.position
  const previousPosition = targetPort.position
  const xOffset = (position.x - previousPosition.x) / 2
  const yOffset = (position.y - previousPosition.y) / 2
  const offset =
    props.lineType === "nonTransferableRelationship"
      ? (Math.abs(xOffset) + Math.abs(yOffset)) / 2
      : 0

  return (
    <g
      className="arrow"
      transform={
        "translate(" +
        point.getPosition().x +
        ", " +
        point.getPosition().y +
        ")"
      }
    >
      <g style={{ transform: "rotate(" + angle + "deg)" }}>
        <g transform={"translate(-38, 0)"}>
          <path
            d={`M ${0 - offset} 0 L ${20 - offset} -13.3333 L ${
              40 - offset
            } 0 L ${20 - offset} 13.3333 L ${0 - offset} 0`}
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
  )
}

export class AdvancedLinkWidget extends DefaultLinkWidget {
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
    )
  }

  render() {
    console.log(this.props)
    //ensure id is present for all points on the path
    var points = this.props.link.getPoints()
    var paths = []
    this.refPaths = []

    //draw the multiple anchors and complex line instead
    for (let j = 0; j < points.length - 1; j++) {
      paths.push(
        this.generateLink(
          LinkWidget.generateLinePath(points[j], points[j + 1]),
          {
            "data-linkid": this.props.link.getID(),
            "data-point": j,
            onMouseDown:
              this.props.link.getOptions().extras.lineType !==
              "nonTransferableRelationship"
                ? (event: MouseEvent) =>
                    this.addPointToLink(event as any, j + 1)
                : null,
          },
          j
        )
      )
    }

    //render the circles
    for (let i = 1; i < points.length - 1; i++) {
      paths.push(this.generatePoint(points[i]))
    }

    if (this.props.link.getTargetPort() !== null) {
      console.log(
        this.props.link.getRenderedPath().length,
        this.props.link.getRenderedPath()
      )
      paths.push(
        this.generateArrow(points[points.length - 1], points[points.length - 2])
      )
    } else {
      paths.push(this.generatePoint(points[points.length - 1]))
    }

    return (
      <g data-default-link-test={this.props.link.getOptions().testName}>
        {paths}
      </g>
    )
  }
}
