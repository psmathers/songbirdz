class ChatSidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chatIndexOpen: null
    };
    this.toggleSingleChat = this.toggleSingleChat.bind(this)
  }

  toggleSingleChat(chatIndex) {
    this.setState({chatIndexOpen: chatIndex})
  }

  componentDidMount() {

  }

  render() {
    return(
      <div>
        {
          this.props.matchedPairs.map((pair, index) => {
            let toggleWithChat = this.toggleSingleChat.bind(this, index)
            return(<ChatCell toggleChat={toggleWithChat}
                             chatIndexOpen={this.state.chatIndexOpen}
                             pair={pair}
                             key={index} />)
          })
        }
      </div>
    )
  }
}
