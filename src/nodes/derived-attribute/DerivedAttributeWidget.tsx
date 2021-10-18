import * as React from "react"
import { DiagramEngine, PortWidget } from "@projectstorm/react-diagrams-core"
import styled from "@emotion/styled"

import { DerivedAttributeModel } from "./DerivedAttributeModel"
import { InlineEdit } from "../../components/inline-edit/InlineEdit"
import { LeftCirclePort, RightCirclePort } from "../../components/CirclePort"

export interface DerivedAttributeProps {
  node: DerivedAttributeModel
  engine: DiagramEngine
  title: string
}

export interface DerivedAttributeState {}

export const DerivedAttributeDiv = styled.div`
  position: relative;
  border: dashed 3px #333;
  width: 8rem;
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  background-color: #fff;
  border-radius: 50%;
`

export class DerivedAttribute extends React.Component<
  DerivedAttributeProps,
  DerivedAttributeState
> {
  constructor(props: DerivedAttributeProps & DerivedAttributeState) {
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
        <DerivedAttributeDiv>
          <InlineEdit text={"Attribute"} />
        </DerivedAttributeDiv>
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
