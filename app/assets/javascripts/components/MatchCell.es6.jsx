class MatchCell extends React.Component {
  constructor() {
    super()
    this.state = {
      match: []
    };
  }
  componentDidMount() {
    this.setState({
      match: this.props.match
    })
  }

  render() {
    return(
      <li>
        <div className="player-container">
          <div className="playlist-owner">
            {this.props.data.name}
          </div>
          <iframe src="https://embed.spotify.com/?uri=spotify:user:spotify:playlist:3rgsDhGHZxZ9sB9DQWQfuf" name="playlist" width="300" height="300" frameBorder="0" allowTransparency="true"></iframe>
            <div className="buttons-container">
            <form className="like" action="/like" method="post">
            <input type="submit" value="Like"/>
            </form>

            <form className="like" action="/dislike" method="post">
            <input type="submit" value="Disike"/>
            </form>
          </div>
        </div>
      <DropDown match={this.props.match} />
      </li>
    )
  }
}
