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
  }

  componentDidMount() {
    // $.ajax({
    //   url: `/chats/${chatID}/messages`,
    //   method: "GET"
    // })
    // .done((response) => {
    //   this.setState({messages: response.content})
    // })
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
      </div>
    } else {
      availableSpace = null;
    }
    return availableSpace;
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.index !== nextProps.chatIndexOpen) {
      this.setState({showFull: false})
    }
  }

  handleSubmit(event) {
    const message = this.refs.message.value;
    event.preventDefault();
    $.ajax({
      url: `/chats/${chatID}/messages`,
      method: "POST",
      data: {
        message: {
          user_id: someUserID.username,
          chat_id: chatID,
          content: message
        }
      }
    })
    .done((response) => {
      this.setState({ messages: this.state.messages.concat(response.content) })
    })
  }

  render() {
    return(
      <div>
        <button onClick={this.toggleChatVisibility}>Chat with batgirl</button>
        {this.showChat()}
      </div>
    )
  }
}
