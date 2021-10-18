import * as React from "react"
import { DiagramEngine, PortWidget } from "@projectstorm/react-diagrams-core"
import styled from "@emotion/styled"

import { InlineEdit } from "../../components/inline-edit/InlineEdit"
import { LeftCirclePort, RightCirclePort } from "../../components/CirclePort"
import { WeakEntityTypeModel } from "./WeakEntityTypeModel"

export interface WeakEntityTypeProps {
  node: WeakEntityTypeModel
  engine: DiagramEngine
}

export interface WeakEntityTypeState {}

const WeakEntityTypeDiv = styled.div`
  border: solid 2px black;
  width: 15rem;
  height: 5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  background-color: #fff;
  padding-bottom: 10px;
  padding-top: 10px;
`

const WrapperDiv = styled.div`
  width: 100%;
  height: 100%;
  border: 2px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 5%;
`

export class WeakEntityTypeWidget extends React.Component<
  WeakEntityTypeProps,
  WeakEntityTypeState
> {
  constructor(props: WeakEntityTypeProps & WeakEntityTypeState) {
    super(props)
  }

  render() {
    return (
      <WeakEntityTypeDiv>
        <PortWidget
          engine={this.props.engine}
          port={this.props.node.getPort("in")!}
        >
          <LeftCirclePort top={"44%"} left={"-6%"} />
        </PortWidget>
        <WrapperDiv>
          <InlineEdit text={"Entity Type"} />
        </WrapperDiv>
        <PortWidget
          engine={this.props.engine}
          port={this.props.node.getPort("out")!}
        >
          <RightCirclePort top={"44%"} right={"-6%"} />
        </PortWidget>
      </WeakEntityTypeDiv>
    )
  }
}
