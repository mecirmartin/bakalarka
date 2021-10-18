import * as React from "react"
import { DiagramEngine, PortWidget } from "@projectstorm/react-diagrams-core"
import styled from "@emotion/styled"

import { MultipleValueAttributeModel } from "./MultipleValueAttributeModel"
import { InlineEdit } from "../../components/inline-edit/InlineEdit"
import { LeftCirclePort, RightCirclePort } from "../../components/CirclePort"

export interface MultipleValueAttributeProps {
  node: MultipleValueAttributeModel
  engine: DiagramEngine
  title: string
}

export interface MultipleValueAttributeState {}

export const MultipleValueAttributeDiv = styled.div`
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
const WrapperDiv = styled.div`
  width: 89%;
  height: 82%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  border: solid 3px #333;
`

export class MultipleValueAttribute extends React.Component<
  MultipleValueAttributeProps,
  MultipleValueAttributeState
> {
  constructor(
    props: MultipleValueAttributeProps & MultipleValueAttributeState
  ) {
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
        <MultipleValueAttributeDiv>
          <WrapperDiv>
            <InlineEdit text={"Attribute"} />
          </WrapperDiv>
        </MultipleValueAttributeDiv>
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
