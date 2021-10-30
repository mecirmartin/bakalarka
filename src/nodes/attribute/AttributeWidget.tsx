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
  }
  render() {
    console.log(this.props)
    return (
      <div>
        <PortWidget
          engine={this.props.engine}
          port={this.props.node.getPort("left")!}
          style={{ position: "absolute", left: "-4%", top: "42%" }}
        >
          <CirclePort />
        </PortWidget>
        <PortWidget
          engine={this.props.engine}
          port={this.props.node.getPort("top")!}
          style={{ position: "absolute", right: "56%", top: "-8%" }}
        >
          <CirclePort />
        </PortWidget>
        <PortWidget
          engine={this.props.engine}
          port={this.props.node.getPort("bottom")!}
          style={{ position: "absolute", right: "56%", top: "87%" }}
        >
          <CirclePort />
        </PortWidget>
        <PortWidget
          engine={this.props.engine}
          port={this.props.node.getPort("right")!}
          style={{ position: "absolute", right: "7%", top: "42%" }}
        >
          <CirclePort />
        </PortWidget>

        {this.props.attributeState.type === "DERIVED" ? (
          <DerivedAttributeDiv>
            <InlineEdit text={"Attribute"} />
          </DerivedAttributeDiv>
        ) : this.props.attributeState.type === "MULTIPLE_VALUE" ? (
          <AttributeDiv>
            <MultipleValueAttributeDiv>
              <InlineEdit
                text={"Attribute"}
                attributeState={this.props.attributeState}
              />
            </MultipleValueAttributeDiv>
          </AttributeDiv>
        ) : (
          <AttributeDiv>
            <InlineEdit
              text={"Attribute"}
              attributeState={this.props.attributeState}
            />
          </AttributeDiv>
        )}
      </div>
    )
  }
}
