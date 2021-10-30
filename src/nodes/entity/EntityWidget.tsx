import * as React from "react"
import { DiagramEngine, PortWidget } from "@projectstorm/react-diagrams-core"
import styled from "@emotion/styled"

import { EntityModel } from "./EntityModel"
import { InlineEdit } from "../../components/inline-edit/InlineEdit"
import { CirclePort } from "../../components/CirclePort"
import { EntityTrayState } from "../../components/BodyWidget"

export interface EntityProps {
  node: EntityModel
  engine: DiagramEngine
  title: string
  entityState: EntityTrayState
}

export interface EntityState {}

export const EntityDiv = styled.div`
  position: relative;
  border: solid 3px #333;
  width: 250px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  background-color: #fff;
  padding-bottom: 10px;
  padding-top: 10px;
`

const WrapperDiv = styled.div`
  width: 100%;
  height: 100%;
  border: solid 3px #333;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 3%;
`

export class Entity extends React.Component<EntityProps, EntityState> {
  constructor(props: EntityProps & EntityState) {
    super(props)
  }

  render() {
    return (
      <EntityDiv>
        <PortWidget
          engine={this.props.engine}
          port={this.props.node.getPort("left")!}
          style={{ position: "absolute", left: "-4%", top: "44%" }}
        >
          <CirclePort />
        </PortWidget>
        <PortWidget
          engine={this.props.engine}
          port={this.props.node.getPort("top")!}
          style={{ position: "absolute", top: "-10%", right: "54%" }}
        >
          <CirclePort />
        </PortWidget>
        {this.props.entityState.isWeak ? (
          <WrapperDiv>
            <InlineEdit text={"Entity "} />
          </WrapperDiv>
        ) : (
          <InlineEdit text={"Entity "} />
        )}
        <PortWidget
          engine={this.props.engine}
          port={this.props.node.getPort("right")!}
          style={{ position: "absolute", top: "44%", right: "2.5%" }}
        >
          <CirclePort />
        </PortWidget>
        <PortWidget
          engine={this.props.engine}
          port={this.props.node.getPort("bottom")!}
          style={{ position: "absolute", top: "94%", right: "54%" }}
        >
          <CirclePort />
        </PortWidget>
      </EntityDiv>
    )
  }
}