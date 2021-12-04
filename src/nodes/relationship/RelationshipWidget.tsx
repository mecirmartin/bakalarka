import * as React from "react"
import { DiagramEngine, PortWidget } from "@projectstorm/react-diagrams-core"
import styled from "@emotion/styled"

import { RelationshipModel } from "./RelationshipModel"
import { InlineEdit } from "../../components/inline-edit/InlineEdit"
import { CirclePort } from "../../components/CirclePort"
import { RelationshipTrayState } from "../../components/BodyWidget"

export interface RelationshipProps {
  node: RelationshipModel
  engine: DiagramEngine
  title: string
  relationshipState: RelationshipTrayState
}

export interface RelationshipState {
  value: string
}

export const RelationshipDiv = styled.div<{ isSelected: boolean }>`
  box-shadow: ${props =>
    props.isSelected ? "0 0 10px rgb(0, 192, 255)" : " none"};
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

  transform: rotate(-45deg);
`

export class Relationship extends React.Component<
  RelationshipProps,
  RelationshipState
> {
  constructor(props: RelationshipProps & RelationshipState) {
    super(props)

    this.state = {
      value: this.props.node.getState().value || "Relationship",
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
      <div>
        <PortWidget
          engine={this.props.engine}
          port={this.props.node.getPort("left")!}
          style={{
            position: "absolute",
            left: "-23%",
            top: "43%",
          }}
        >
          <CirclePort />
        </PortWidget>
        <PortWidget
          engine={this.props.engine}
          port={this.props.node.getPort("right")!}
          style={{ position: "absolute", right: "-10.5%", top: "43%" }}
        >
          <CirclePort />
        </PortWidget>
        <PortWidget
          engine={this.props.engine}
          port={this.props.node.getPort("top")!}
          style={{ position: "absolute", right: "56%", top: "-23.5%" }}
        >
          <CirclePort />
        </PortWidget>
        <PortWidget
          engine={this.props.engine}
          port={this.props.node.getPort("bottom")!}
          style={{ position: "absolute", right: "56%", top: "110.5%" }}
        >
          <CirclePort />
        </PortWidget>
        <RelationshipDiv isSelected={this.props.node.isSelected()}>
          {this.props.node.getState().isWeak ? (
            <div
              style={{
                border: "3px solid #333",
                height: "86%",
                margin: "5%",
                width: "85%",
              }}
            >
              <WrapperDiv>
                <InlineEdit state={this.state} setState={this.setState} />
              </WrapperDiv>
            </div>
          ) : (
            <WrapperDiv>
              <InlineEdit state={this.state} setState={this.setState} />
            </WrapperDiv>
          )}
        </RelationshipDiv>
      </div>
    )
  }
}
