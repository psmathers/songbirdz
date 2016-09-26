class MatchCell extends React.Component {
  constructor() {
    super()
    this.state = {
      match: []
    };
    this.showTier = this.showTier.bind(this)
  }

  componentDidMount() {
    this.setState({
      match: this.props.data
    })
  }

  showTier() {
    if (this.props.data.match_tier) {
      return (
        <span><span> | </span><span>Tier: {this.props.data.match_tier}</span></span>
      )
    };
  }

  render() {
    let anthemID = this.props.data.anthem_id
      // <pre><code>
      //   {JSON.stringify(this.props, null, 4)}
      // </code></pre>
    return(
      <li className="match-cell">
        <div className="player-container">
          <div className="playlist-owner">
            {this.props.data.name}
            {this.showTier()}
          </div>
          <iframe src={`https://embed.spotify.com/?uri=spotify:track:${anthemID}`} width="300" height="80" frameborder="0" allowtransparency="true"></iframe>
            <div className="buttons-container">
            <form className="like" action="/matches" method="post">
            <input type="hidden" name="match_id" value={this.props.data.id} />
            <input type="submit" value="Like" />
            </form>

            <form className="like" action= {`/matches/:${this.props.data.id}`} method="post">
            <input type="hidden" name="_method" value="put" />
            <input type="hidden" name="match_id" value={this.props.data.id} />
            <input type="submit" value="Dislike"/>
            </form>
          </div>
        </div>
      <DropDown match={this.props.data} />
      </li>
    )
  }
}
