import React from "react"
import ContentEditable from "react-contenteditable"

interface InlineEditState {
  html: string
}
interface InlineEditProps {
  text: string
  bold?: boolean
  marginTop?: number
}

export class InlineEdit extends React.Component<
  InlineEditProps,
  InlineEditState
> {
  constructor(props) {
    super(props)
    this.state = {
      html: this.props.bold
        ? `<b>${this.props.text}</b>`
        : `<p>${this.props.text}</p>`,
    }
  }

  handleChange = evt => {
    this.setState({ html: evt.target.value })
  }

  render = () => {
    return (
      <ContentEditable
        style={{
          fontSize: "1.4rem",
          textAlign: "center",
          marginTop: this.props.marginTop,
        }}
        html={this.state.html} // innerHTML of the editable div
        disabled={false} // use true to disable edition
        onChange={this.handleChange} // handle innerHTML change
        onKeyDown={e => e.stopPropagation()}
      />
    )
  }
}
