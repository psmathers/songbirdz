class ChatSidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chatIndexOpen: null
    };
    this.toggleSingleChat = this.toggleSingleChat.bind(this)
    this.showMatchChatHeader = this.showMatchChatHeader.bind(this)
  }

  toggleSingleChat(chatIndex) {
    this.setState({chatIndexOpen: chatIndex})
  }

  componentDidMount() {

  }

  showMatchChatHeader() {
    let availableSpace;
    if (this.props.matchedPairs.length > 0) {
      availableSpace = <div id="chat-h"><p id="match-chat">Match Chat</p></div>
    } else {
      availableSpace = null;
    }
    return availableSpace;
  }

  render() {
    return(
      <div className="chat-sidebar">
        {this.showMatchChatHeader()}
        {
          this.props.matchedPairs.map((pair, index) => {
            let toggleWithChat = this.toggleSingleChat.bind(this, index)
            return(<ChatCell toggleChat={toggleWithChat}
                             chatIndexOpen={this.state.chatIndexOpen}
                             pair={pair}
                             key={index}
                             index={index}/> )
          })
        }
      </div>
    )
  }
}
