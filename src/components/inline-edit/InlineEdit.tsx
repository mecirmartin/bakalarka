import React from "react"
import ContentEditable from "react-contenteditable"
import { AttributeTrayState } from "../../types"

interface InlineEditState {
  html: string
}
interface InlineEditProps {
  text?: string
  bold?: boolean
  marginTop?: number
  attributeState?: AttributeTrayState
  style?: Object
  state?: { value: string }
  setState?: Function
}

export class InlineEdit extends React.Component<
  InlineEditProps,
  InlineEditState
> {
  constructor(props) {
    super(props)
  }

  render = () => {
    return (
      <ContentEditable
        style={
          this.props.style ?? {
            fontSize: "1.4rem",
            textAlign: "center",
            minWidth: "3rem",
            marginTop: this.props.marginTop,
            textDecoration:
              this.props.attributeState?.key === "PRIMARY_KEY" ||
              this.props.attributeState?.key === "PARTIAL_KEY"
                ? "underline"
                : "none",
            textDecorationStyle:
              this.props.attributeState?.key === "PARTIAL_KEY"
                ? "dashed"
                : this.props.attributeState?.key === "PRIMARY_KEY"
                ? "solid"
                : "none",
          }
        }
        html={this.props.state.value} // innerHTML of the editable div
        disabled={false} // use true to disable edition
        onChange={e => this.props.setState({ value: e.target.value })} // handle innerHTML change
        onKeyDown={e => e.stopPropagation()}
      />
    )
  }
}
