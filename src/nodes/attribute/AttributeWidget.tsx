import * as React from "react"
import { DiagramEngine, PortWidget } from "@projectstorm/react-diagrams-core"
import styled from "@emotion/styled"

import { AttributeModel } from "./AttributeModel"
import { InlineEdit } from "../../components/inline-edit/InlineEdit"
import { LeftCirclePort, RightCirclePort } from "../../components/CirclePort"

export interface AttributeProps {
  node: AttributeModel
  engine: DiagramEngine
  title: string
}

export interface AttributeState {}

export const AttributeDiv = styled.div`
  position: relative;
  border: solid 3px #333;
  width: 8rem;
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  background-color: #fff;
  border-radius: 50%;
`

export class Attribute extends React.Component<AttributeProps, AttributeState> {
  constructor(props: AttributeProps & AttributeState) {
    super(props)
  }

  render() {
    return (
      <div>
        <PortWidget
          engine={this.props.engine}
          port={this.props.node.getPort("in")!}
          style={{ position: "absolute", left: "-9%", top: "42%" }}
        >
          <LeftCirclePort />
        </PortWidget>
        <AttributeDiv>
          <InlineEdit text={"Attribute"} />
        </AttributeDiv>
        <PortWidget
          engine={this.props.engine}
          port={this.props.node.getPort("out")!}
          style={{ position: "absolute", right: 0, top: "42%" }}
        >
          <RightCirclePort />
        </PortWidget>
      </div>
    )
  }
}
