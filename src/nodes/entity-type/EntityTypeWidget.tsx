import * as React from "react"
import { DiagramEngine, PortWidget } from "@projectstorm/react-diagrams-core"
import styled from "@emotion/styled"

import { EntityTypeModel } from "./EntityTypeModel"
import { InlineEdit } from "../../components/inline-edit/InlineEdit"
import { LeftCirclePort, RightCirclePort } from "../../components/CirclePort"

export interface EntityTypeProps {
  node: EntityTypeModel
  engine: DiagramEngine
  title: string
}

export interface EntityTypeState {}

export const EntityTypeDiv = styled.div`
  position: relative;
  border: solid 3px #333;
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

export class EntityType extends React.Component<
  EntityTypeProps,
  EntityTypeState
> {
  constructor(props: EntityTypeProps & EntityTypeState) {
    super(props)
  }

  render() {
    return (
      <EntityTypeDiv>
        <PortWidget
          engine={this.props.engine}
          port={this.props.node.getPort("in")!}
        >
          <LeftCirclePort top={"44%"} left={"-6%"} />
        </PortWidget>
        <div>
          <InlineEdit text={"Entity Type"} />
        </div>
        <PortWidget
          engine={this.props.engine}
          port={this.props.node.getPort("out")!}
        >
          <RightCirclePort top={"44%"} right={"-6%"} />
        </PortWidget>
      </EntityTypeDiv>
    )
  }
}
