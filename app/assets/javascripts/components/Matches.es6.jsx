class Matches extends React.Component {
  constructor() {
    super()
    this.state = {
      matches: []
    };
  }
  componentDidMount() {
    // this.setState({
    //   matches: this.props.matches
    // })
  }

  render() {
    return(
      <div>
        <MatchesViewAll matches={this.props.matches} />
        <ColorKey />
      </div>
    )
  }
}
