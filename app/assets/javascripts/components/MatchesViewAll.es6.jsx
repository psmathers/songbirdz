class MatchesViewAll extends React.Component {
  constructor() {
    super()
    this.state = {
      matches: []
    };
    this.showMatchedPairs = this.showMatchedPairs.bind(this)
    this.showMatches = this.showMatches.bind(this)
  }

  componentDidMount() {
    // debugger
    this.setState({
      matches: this.props.matches
    })
  }

  showMatches() {
    // debugger
    if (this.state.matches.length > 0) {
      return (this.state.matches.map((match,idx) =>{
           return (<MatchCell key={idx} data={match} />)
         })
      )
    };
  }

  showMatchedPairs() {
    if (this.props.matchedPairs.length > 0) {
      return (this.props.matchedPairs.map((match,idx) =>{
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
