import * as React from "react"
import { DiagramEngine, PortWidget } from "@projectstorm/react-diagrams-core"
import styled from "@emotion/styled"

import { IdentificationRelationshipTypeModel } from "./IdentificationRelationshipTypeModel"
import { InlineEdit } from "../../components/inline-edit/InlineEdit"
import { LeftCirclePort, RightCirclePort } from "../../components/CirclePort"

export interface IdentificationRelationshipTypeProps {
  node: IdentificationRelationshipTypeModel
  engine: DiagramEngine
  title: string
}

export interface IdentificationRelationshipTypeState {}

export const IdentificationRelationshipTypeDiv = styled.div`
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

const WrapperDiv = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 5%;

  transform: rotate(-45deg);
`

export class IdentificationRelationshipType extends React.Component<
  IdentificationRelationshipTypeProps,
  IdentificationRelationshipTypeState
> {
  constructor(
    props: IdentificationRelationshipTypeProps &
      IdentificationRelationshipTypeState
  ) {
    super(props)
  }

  render() {
    return (
      <div>
        <PortWidget
          engine={this.props.engine}
          port={this.props.node.getPort("in")!}
          style={{ position: "absolute", left: "-29%", top: "44.5%" }}
        >
          <LeftCirclePort />
        </PortWidget>
        <IdentificationRelationshipTypeDiv>
          <div
            style={{
              border: "3px solid #333",
              height: "86%",
              margin: "5%",
              width: "85%",
            }}
          >
            <WrapperDiv>
              <InlineEdit text={"Relationship Type"} marginTop={14} />
            </WrapperDiv>
          </div>
        </IdentificationRelationshipTypeDiv>

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
