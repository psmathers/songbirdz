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
    $.ajax({
      url: `/chats/${this.props.pair.id}/messages`,
      method: "GET"
    })
    .done((response) => {
      let messages = []
      for (var i = 0; i < response.length; i++) {
        messages.push({name: response[i].user.name, text: response[i].content})
      }
      this.setState({messages: messages})
    })
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
            this.state.messages.map((message, index) => {
              return(
                <MessageCell key={index}
                             message={message} />
              )
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
    event.preventDefault();

    const message = this.refs.message.value;

    $.ajax({
      url: `/chats/${this.props.pair.chat_id}/messages`,
      method: "POST",
      data: {
        message: {
          chat_id: this.props.pair.chat_id,
          content: message
        }
      }
    })
    .done((response) => {
      this.setState({ messages: this.state.messages.concat({name: response.user.name, text: response.content}) })
    }.bind(this))
  }

  render() {
    return(
      <div>
        <button onClick={this.toggleChatVisibility}>Chat with {this.props.pair.name}</button>
        {this.showChat()}
      </div>
    )
  }
}
