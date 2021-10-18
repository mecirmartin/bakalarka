import * as React from "react"
import { DiagramEngine, PortWidget } from "@projectstorm/react-diagrams-core"
import styled from "@emotion/styled"

import { RelationshipTypeModel } from "./RelationshipTypeModel"
import { InlineEdit } from "../../components/inline-edit/InlineEdit"
import { LeftCirclePort, RightCirclePort } from "../../components/CirclePort"

export interface RelationshipTypeProps {
  node: RelationshipTypeModel
  engine: DiagramEngine
  title: string
}

export interface RelationshipTypeState {}

export const RelationshipTypeDiv = styled.div`
  position: relative;
  border: solid 3px #333;
  width: 8rem;
  height: 8rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  background-color: #fff;
  transform: rotate(45deg);
`

export class RelationshipType extends React.Component<
  RelationshipTypeProps,
  RelationshipTypeState
> {
  constructor(props: RelationshipTypeProps & RelationshipTypeState) {
    super(props)
  }

  render() {
    return (
      <div>
        <PortWidget
          engine={this.props.engine}
          port={this.props.node.getPort("in")!}
          style={{
            position: "absolute",
            left: "-29%",
            top: "44.5%",
          }}
        >
          <LeftCirclePort />
        </PortWidget>
        <RelationshipTypeDiv>
          <div style={{ transform: "rotate(-45deg)" }}>
            <InlineEdit text={"Relationship Type"} />
          </div>
        </RelationshipTypeDiv>

        <PortWidget
          engine={this.props.engine}
          port={this.props.node.getPort("out")!}
          style={{ position: "absolute", right: "-19.5%", top: "44.5%" }}
        >
          <RightCirclePort />
        </PortWidget>
      </div>
    )
  }
}
