import {
  DefaultLinkWidget,
  PointModel,
  LinkWidget,
  DefaultLinkSegmentWidget,
  DefaultLinkPointWidget,
} from "@projectstorm/react-diagrams"

export class SimpleLinkWidget extends DefaultLinkWidget {
  render() {
    console.log(this.props, this.refPaths)
    //ensure id is present for all points on the path
    const points = this.props.link.getPoints()
    const paths = []
    this.refPaths = []

    //draw the multiple anchors and complex line instead
    for (let j = 0; j < points.length - 1; j++) {
      paths.push(
        this.generateLink(
          LinkWidget.generateLinePath(points[j], points[j + 1]),
          {
            "data-linkid": this.props.link.getID(),
            "data-point": j,
            onMouseDown: (event: MouseEvent) => {
              this.addPointToLink(event as any, j + 1)
            },
            filter: "url(#double)",
          },
          j
        )
      )
    }

    //render the circles
    for (let i = 1; i < points.length - 1; i++) {
      paths.push(this.generatePoint(points[i]))
    }

    paths.push(this.generatePoint(points[points.length - 1]))

    const linkPaths = paths.filter(
      p => p.type.name === "DefaultLinkSegmentWidget"
    )
    const pointPaths = paths.filter(
      p => p.type.name === "DefaultLinkPointWidget"
    )
    console.log(linkPaths, pointPaths, paths)
    return (
      <svg>
        <defs>
          <filter id="double">
            <feMorphology
              in="SourceGraphic"
              result="a"
              operator="dilate"
              radius="1"
            />
            <feComposite
              in="SourceGraphic"
              in2="a"
              result="xx"
              operator="xor"
            />
          </filter>
        </defs>
        <g
          data-default-link-test={this.props.link.getOptions().testName}
          filter={
            this.props.link.getOptions().extras.lineType === "multiLine"
              ? "url(#double)"
              : ""
          }
        >
          {linkPaths}
        </g>
        <g>{pointPaths}</g>
      </svg>
    )
  }
}
