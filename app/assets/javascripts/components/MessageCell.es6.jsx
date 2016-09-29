class MessageCell extends React.Component {
  render() {
    return(
      <div className="message-text">
        {this.props.message.name}: {this.props.message.text}
      </div>
    )
  }
}
