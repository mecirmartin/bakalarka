import React from "react"
import { AdvancedLinkModel } from "./AdvancedLinkMode"

export class AdvancedLinkSegment extends React.Component<{
  model: AdvancedLinkModel
  path: string
}> {
  path: SVGPathElement
  circle: SVGCircleElement
  callback: () => any
  percent: number
  handle: any
  mounted: boolean

  constructor(props) {
    super(props)
    this.percent = 0
  }

  componentDidMount() {
    //   this.props.model.getD
    // this.mounted = true
    // this.callback = () => {
    //   if (!this.circle || !this.path) {
    //     return
    //   }
    //   this.percent += 2
    //   if (this.percent > 100) {
    //     this.percent = 0
    //   }
    //   let point = this.path.getPointAtLength(
    //     this.path.getTotalLength() * (this.percent / 100.0)
    //   )
    //   this.circle.setAttribute("cx", "" + point.x)
    //   this.circle.setAttribute("cy", "" + point.y)
    //   if (this.mounted) {
    //     requestAnimationFrame(this.callback)
    //   }
    // }
    // requestAnimationFrame(this.callback)
  }

  render() {
    // console.log(this.path)
    return (
      <svg>
        <defs>
          <marker
            id="head"
            orient="auto"
            markerWidth="2"
            markerHeight="4"
            refX="0.1"
            refY="2"
          >
            <path d="M0,0 V4 L2,2 Z" fill="black" />
          </marker>
        </defs>
        <path
          fill="none"
          ref={ref => {
            this.path = ref
          }}
          strokeWidth={this.props.model.getOptions().width}
          stroke="rgba(255,0,0,0.5)"
          d={this.props.path}
          markerEnd="url(#head)"
        />
        {/* .+ "l 15 -10 l 15 10 l -15 10 l -15 -10" */}
        {/* <circle
          ref={ref => {
            this.circle = ref
          }}
          r={10}
          fill="orange"
        /> */}
      </svg>
    )
  }
}
