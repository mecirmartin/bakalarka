import * as React from "react"
import { DiagramEngine, PortWidget } from "@projectstorm/react-diagrams-core"
import { TriangleNodeModel } from "./TriangleNodeModel"
import { CirclePort } from "../../components/CirclePort"
import styled from "@emotion/styled"
import { InlineEdit } from "../../components/inline-edit/InlineEdit"

export interface TriangleNodeWidgetProps {
  node: TriangleNodeModel
  engine: DiagramEngine
}

export interface TriangleNodeWidgetState {
  value: string
}

const TriangleNode = styled.div<{ isSelected: boolean }>`
  box-shadow: ${props =>
    props.isSelected ? "0 0 10px rgb(0, 192, 255)" : " none"};
  position: relative;
  width: 0;
  border-bottom: solid 80px black;
  border-right: solid 45px transparent;
  border-left: solid 45px transparent;
`

const Empty = styled.div`
  position: absolute;
  top: 7px;
  left: -39px;
  width: 0;
  border-bottom: solid 70px white;
  border-right: solid 39px transparent;
  border-left: solid 39px transparent;
`

export class TriangleNodeWidget extends React.Component<
  TriangleNodeWidgetProps,
  TriangleNodeWidgetState
> {
  constructor(props: TriangleNodeWidgetProps) {
    super(props)
    this.state = {
      value: this.props.node.getState().value || "Attribute",
    }
    this.setState = this.setState.bind(this)
  }

  componentDidUpdate() {
    this.props.node.setState({
      ...this.props.node.getState(),
      value: this.state.value,
    })
  }

  render() {
    return (
      <TriangleNode isSelected={this.props.node.isSelected()}>
        <Empty></Empty>
        <PortWidget
          engine={this.props.engine}
          port={this.props.node.getPort("top")}
          style={{ position: "absolute", top: "-4px", right: "8px" }}
        >
          <CirclePort />
        </PortWidget>
        <PortWidget
          engine={this.props.engine}
          port={this.props.node.getPort("bottom")}
          style={{ position: "absolute", top: "69px", right: "8px" }}
        >
          <CirclePort />
        </PortWidget>
        <div style={{ position: "absolute", top: 40, right: -6 }}>
          <InlineEdit state={this.state} setState={this.setState} text={"d"} />
        </div>
      </TriangleNode>
    )
  }
}
