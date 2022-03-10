import * as React from "react"
import { DiagramEngine } from "@projectstorm/react-diagrams-core"
import {
  DefaultLinkModel,
  DefaultLinkFactory,
} from "@projectstorm/react-diagrams"

export interface DefaultLinkSegmentWidgetProps {
  path: string
  link: DefaultLinkModel
  selected: boolean
  forwardRef: React.RefObject<SVGPathElement>
  factory: DefaultLinkFactory
  diagramEngine: DiagramEngine
  onSelection: (selected: boolean) => any
  extras: object
}

export class CustomLinkSegmentWidget extends React.Component<DefaultLinkSegmentWidgetProps> {
  render() {
    console.log("toto", this.props.selected, this.props.link.isSelected())
    const Bottom = React.cloneElement(
      this.props.factory.generateLinkSegment(
        this.props.link,
        this.props.selected || this.props.link.isSelected(),
        this.props.path
      ),
      {
        ref: this.props.forwardRef,
      }
    )

    const Top = React.cloneElement(Bottom, {
      strokeLinecap: "round",

      ...this.props.extras,
      ref: null,
      "data-linkid": this.props.link.getID(),
      strokeOpacity: this.props.selected ? 0.1 : 0,
      strokeWidth: 20,
      fill: "none",
      onContextMenu: event => {
        if (!this.props.link.isLocked()) {
          event.preventDefault()
          this.props.link.remove()
        }
      },
    })

    return (
      <g>
        {Bottom}
        {Top}
      </g>
    )
  }
}