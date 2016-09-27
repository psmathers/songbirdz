class ChatCell extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      showFull: false
    };
    this.handleSubmit = this.handleSubmit.bind(this)
    this.toggleChatVisibility = this.toggleChatVisibility.bind(this)
    this.showChat = this.showChat.bind(this)
    this.hideChatsNotOpen = this.hideChatsNotOpen.bind(this)
  }

  toggleChatVisibility() {
    this.setState({showFull: !this.state.showFull})
    this.props.toggleChat()
  }

  showChat() {
    let availableSpace;
    if (this.state.showFull === true) {
      availableSpace =
      <div>
        {
          this.state.messages.map((message) => {
            return(<MessageCell message={message} />)
          })
        }
      </div>
      <form onSubmit={this.handleSubmit}>
        <input type="text" ref="message" placeholder="Say hi to your match, don't be afraid" />
        <input type="submit" value="Send" />
      </form>
    } else {
      availableSpace = null;
    }
    return availableSpace;
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.key !== nextProps.chatIndexOpen) {
      this.setState({showFull: false})
    }
  }

  handleSubmit(event) {
    const message = this.refs.message.value;

    event.preventDefault();
    $.ajax({
      url: `/chats/${chatID}/messages/${messageID}`,
      method: "POST",
      data: {
        user_id: someUserID.username,
        chat_id: chatID,
        content: message
      }
    })
    .done({
      this.setState({messages: this.state.message.concat([response])})
    })
  }

  render() {
    return(
      <div>
        <button onClick={this.toggleChatVisibility}></button>
        {this.showChat()}
      </div>
    )
  }
}
