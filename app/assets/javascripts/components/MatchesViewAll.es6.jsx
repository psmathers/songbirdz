class MatchesViewAll extends React.Component {
  constructor() {
    super()
    this.state = {
      matches: [],
      matchedPairs: []
    };
    this.showMatchedPairs = this.showMatchedPairs.bind(this)
    this.showMatches = this.showMatches.bind(this)
    this.updatePairs = this.updatePairs.bind(this)
    this.removeUser = this.removeUser.bind(this)
    this.destroyPairs = this.destroyPairs.bind(this)
  }

  componentDidMount() {
    // debugger
    this.setState({
      matches: this.props.matches,
      matchedPairs: this.props.matchedPairs

    })
  }

  removeUser(user) {
    for (var i = 0; i < this.state.matches.length; i++) {
      if (this.state.matches[i].id === user.id) {
        return(this.state.matches.splice(i, 1));
      }
    };
  }

  updatePairs(response) {
    if (this.props.user.id == response.pair.receiver.id) {
       newPair = response.pair.sender
       this.removeUser(newPair)
       if (response.pair.accepted === true) {
         this.setState({
          matchedPairs: this.state.matchedPairs.concat(newPair),
          matches: this.state.matches
          })
       } else {
        this.setState({matches: this.state.matches})
       }
    } else {
      newPair = response.pair.receiver
      this.removeUser(newPair)
      this.setState({matches: this.state.matches})
    }
  }

  destroyPairs(response) {
    debugger
    if (this.props.user.id == response.pair.receiver.id) {
      newPair = response.pair.sender
    } else {
      newPair = response.pair.receiver
    }
      this.removeUser(newPair)
      this.setState({matches: this.state.matches})
  }


  showMatches() {
    if (this.state.matches.length > 0) {
      return (this.state.matches.map((match,idx) =>{
           return (<MatchCell key={idx} data={match} onUpdate={this.updatePairs} onDislike={this.destroyPairs}/>)
         })
      )
    };
  }

  showMatchedPairs() {
    if (this.state.matchedPairs.length > 0) {
      return (this.state.matchedPairs.map((match,idx) =>{
           return (<MatchCell key={idx} data={match} />)
         })
      )
    };
  }

  render() {
    return(
      <div>
        <ul>
          {this.showMatchedPairs()}
        </ul>
       <ul>
        {this.showMatches()}
       </ul>
       </div>
    )
  }
}
