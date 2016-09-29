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
    this.handleLike = this.handleLike.bind(this)
    this.handleDislike = this.handleDislike.bind(this)
  }

  componentDidMount() {
    // debugger
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
        <button className="push-me" onClick={this.toggleDropDown}>About {this.props.data.name}</button>
      )
    };
  }

  showDropDown() {
    // debugger
    if (this.state.formPresent) {
      return(<DropDown userImg={this.props.userImg} match={this.props.data} />)
    } else {
      return null
    }
  }

  showTier() {
    if (this.props.data.match_tier) {
      let styling;
      if (this.props.data.match_tier === 1) {
        styling=  <div className="purple">{this.props.data.name}</div>
      } else if (this.props.data.match_tier === 2){
        styling=  <div className="blue">{this.props.data.name}</div>
      }
      return styling;
    }
    else {
      return (<div className="green">{this.props.data.name}</div>)
    }

  }

  handleLike(event) {
    event.preventDefault()
    $.ajax({
      url: event.target.action,
      method: event.target.method,
      data: $(event.target).serialize()
    }).done((response) => {
        this.props.onUpdate(response)
    })
  }

  handleDislike(event) {
    event.preventDefault()
    $.ajax({
      url: event.target.action,
      method: event.target.method,
      data: $(event.target).serialize()
    }).done((response) => {
        this.props.onDislike(response)
    })
  }

  showLikes(){
    if (this.props.data.match_tier) {

      return (
        <div id= "tier-1" className="buttons-container">
          <form onSubmit={this.handleLike} className="like" action="/matches" method="post">
          <input type="hidden" name="match_id" value={this.props.data.id} />
          <input type="submit" value="Like" />
          </form>

          <form onSubmit={this.handleDislike} className="like" action= {`/matches/:${this.props.data.id}`} method="post">
          <input type="hidden" name="_method" value="put" />
          <input type="hidden" name="match_id" value={this.props.data.id} />
          <input type="submit" value="Dislike"/>
          </form>
        </div>
      )
    };
  }

  render() {
    let anthemID = this.props.data.anthem_id

    return(
      <div>

      <li className="match-cell">
        <div className="player-container">
          <div id="tier-1" className="playlist-owner">
            {this.showTier()}
          </div>
          <div className="iframe">
           <iframe src={`https://embed.spotify.com/?uri=spotify:track:${anthemID}`} width="300" height="80" frameborder="0" allowtransparency="true"></iframe>
          </div>
          {this.showLikes()}
          <br/>
          <div className="container-push-me">
            {this.showDropDownButton()}
          </div>
          <div>
            {this.showDropDown()}
          </div>
        </div>

      </li>
      </div>
    )
  }
}
