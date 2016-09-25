class MatchCell extends React.Component {
  constructor() {
    super()
    this.state = {
      match: []
    };
  }
  componentDidMount() {
    this.setState({
      match: this.props.data
    })
  }

  render() {
    let anthemID = this.props.data.object.anthem_id
    return(
      <li className="match-cell">
        <div className="player-container">
          <div className="playlist-owner">
            {this.props.data.object.name}:
             Tier: {this.props.data.tier}
          </div>
          <iframe src={`https://embed.spotify.com/?uri=spotify:track:${anthemID}`} width="300" height="80" frameborder="0" allowtransparency="true"></iframe>
            <div className="buttons-container">
            <form className="like" action="/like" method="post">
            <input type="submit" value="Like"/>
            </form>

            <form className="like" action="/dislike" method="post">
            <input type="submit" value="Disike"/>
            </form>
          </div>
        </div>
      <DropDown match={this.props.data.object} />
      </li>
    )
  }
}
