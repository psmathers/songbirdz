class MatchCell extends React.Component {
  constructor() {
    super()
    this.state = {
      match: [],
      formPresent: false
    };
    this.showTier = this.showTier.bind(this)
    this.showDropDownButton= this.showDropDownButton.bind(this)
    this.toggleDropDown = this.toggleDropDown.bind(this)
    this.showDropDown= this.showDropDown.bind(this)
    this.showLikes= this.showLikes.bind(this)
  }

  componentDidMount() {
    this.setState({
      match: this.props.data,
    })
  }

  toggleDropDown() {
    let shouldToggle = !this.state.formPresent
    this.setState({
      formPresent: shouldToggle
    })
    if (shouldToggle) {
      return this.showDropDown()
    }
  }

  showDropDownButton() {
    if (!this.props.data.match_tier) {
      return (
        <button className="push-me" onClick={this.toggleDropDown}>Show Info</button>
      )
    };
  }

  showDropDown() {
    // debugger
    if (this.state.formPresent) {
      return(<DropDown match={this.props.data} />)
    } else {
      return null
    }
  }

  showTier() {
    if (this.props.data.match_tier) {
      return (
        <span><span> | </span><span>Tier: {this.props.data.match_tier}</span></span>
      )
    };
  }


  handleLike() {

  }

  showLikes(){
    if (this.props.data.match_tier) {

      return (
      <div className="buttons-container">
      <form onClick={this.handleLike} className="like" action="/matches" method="post">
      <input type="hidden" name="match_id" value={this.props.data.id} />
      <input type="submit" value="Like" />
      </form>

      <form className="like" action= {`/matches/:${this.props.data.id}`} method="post">
      <input type="hidden" name="_method" value="put" />
      <input type="hidden" name="match_id" value={this.props.data.id} />
      <input type="submit" value="Dislike"/>
      </form>
    </div>)
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
          {this.showLikes()}
        </div>
        <div className="dropdown">
          {this.showDropDownButton()}
          {this.showDropDown()}
        </div>
      </li>
    )
  }
}
