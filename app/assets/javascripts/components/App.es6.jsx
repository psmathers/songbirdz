class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: this.props.currentUser,
      playlistID: ""
    };
    this.renderLandingOrMatches = this.renderLandingOrMatches.bind(this)
  }

  componentDidMount() {
    let userID = this.props.currentUser.uid;
    let userToken = this.props.currentUser.token;

    $.ajax({
      url: `https://api.spotify.com/v1/users/${userID}/playlists`,
      method: "GET",
      headers: {
        "Authorization": `Bearer ${userToken}`
      }
    })
    .done((response) => {
      this.setState({userPlaylists: response.items})
      for (var i = 0; i < this.state.userPlaylists.length; i++) {
        if (this.state.userPlaylists[i].name === "Birdlist") {
          this.setState({playlistID: this.state.userPlaylists[i].id})
        }
      }
    })
  }

  renderLandingOrMatches() {
    let availableSpace;
    if (this.state.currentUser) {
      if (this.state.playlistID === "") {
        availableSpace =
        <Landing createUser
                 currentUser={this.state.currentUser}
                 playlistID={this.state.playlistID} />
      } else {
        availableSpace = <Matches />
      }
    } else {
      availableSpace = <Landing />
    }
    return availableSpace;
  }

  render() {
    return(
      <div>
        {this.renderLandingOrMatches()}
      </div>
    )
  }
}
