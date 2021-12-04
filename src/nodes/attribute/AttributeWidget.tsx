import * as React from "react"
import { DiagramEngine, PortWidget } from "@projectstorm/react-diagrams-core"
import styled from "@emotion/styled"

import { AttributeModel } from "./AttributeModel"
import { InlineEdit } from "../../components/inline-edit/InlineEdit"
import { CirclePort } from "../../components/CirclePort"
import { AttributeTrayState } from "../../components/BodyWidget"

export interface AttributeProps {
  node: AttributeModel
  engine: DiagramEngine
  title: string
  attributeState: AttributeTrayState
}

export interface AttributeState {
  value: string
}

export const AttributeDiv = styled.div<{ isSelected: boolean }>`
  box-shadow: ${props =>
    props.isSelected ? "0 0 10px rgb(0, 192, 255)" : " none"};
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
export const DerivedAttributeDiv = styled.div<{ isSelected: boolean }>`
  box-shadow: ${props =>
    props.isSelected ? "0 0 10px rgb(0, 192, 255)" : " none"};
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

const MultipleValueAttributeDiv = styled.div`
  width: 89%;
  height: 82%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  border: solid 3px #333;
`

export class Attribute extends React.Component<AttributeProps, AttributeState> {
  constructor(props: AttributeProps & AttributeState) {
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
      <div>
        <PortWidget
          engine={this.props.engine}
          port={this.props.node.getPort("left")!}
          style={{ position: "absolute", left: "-5%", top: "40%", zIndex: 2 }}
        >
          <CirclePort />
        </PortWidget>
        <PortWidget
          engine={this.props.engine}
          port={this.props.node.getPort("top")!}
          style={{ position: "absolute", right: "45%", top: "-10%", zIndex: 2 }}
        >
          <CirclePort />
        </PortWidget>
        <PortWidget
          engine={this.props.engine}
          port={this.props.node.getPort("bottom")!}
          style={{ position: "absolute", right: "45%", top: "87%", zIndex: 2 }}
        >
          <CirclePort />
        </PortWidget>
        <PortWidget
          engine={this.props.engine}
          port={this.props.node.getPort("right")!}
          style={{ position: "absolute", right: "-5%", top: "40%", zIndex: 2 }}
        >
          <CirclePort />
        </PortWidget>

        {this.props.node.getState().type === "DERIVED" ? (
          <DerivedAttributeDiv isSelected={this.props.node.isSelected()}>
            <InlineEdit state={this.state} setState={this.setState} />
          </DerivedAttributeDiv>
        ) : this.props.node.getState().type === "MULTIPLE_VALUE" ? (
          <AttributeDiv isSelected={this.props.node.isSelected()}>
            <MultipleValueAttributeDiv>
              <InlineEdit
                state={this.state}
                setState={this.setState}
                attributeState={this.props.node.getState()}
              />
            </MultipleValueAttributeDiv>
          </AttributeDiv>
        ) : (
          <AttributeDiv isSelected={this.props.node.isSelected()}>
            <InlineEdit
              state={this.state}
              setState={this.setState}
              attributeState={this.props.node.getState()}
            />
          </AttributeDiv>
        )}
      </div>
    )
  }
}
