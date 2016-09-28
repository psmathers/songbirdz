class MessageCell extends React.Component {
  render() {
    return(
      <div>
        {this.props.message.name}: {this.props.message.text}
      </div>
    )
  }
}
