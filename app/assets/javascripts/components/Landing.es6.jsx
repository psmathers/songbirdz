class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playlistID: "",
      tracks: []
    }
    this.getFiveTopTracks = this.getFiveTopTracks.bind(this)
    this.addFiveTopTracks = this.addFiveTopTracks.bind(this)
    this.getTopBeatlesTracks = this.getTopBeatlesTracks.bind(this)
    this.renderProfileEditForm = this.renderProfileEditForm.bind(this)
  }


  componentDidMount() {
    if (this.props.createUser) {
      let userID = this.props.currentUser.uid;
      let userToken = this.props.currentUser.token;

      if (this.props.playlistID !== "") {
        this.setState({playlistID: this.props.playlistID})
        let playlistID = this.state.playlistID;
        this.getFiveTopTracks()
      } else {
        $.ajax({
          url: `https://api.spotify.com/v1/users/${userID}/playlists`,
          method: "POST",
          headers: {
            "Authorization": `Bearer ${userToken}`,
            "Content-Type": "application/json"
          },
          dataType: "json",
          data: "{ \"name\" : \"Birdlist\", \"public\" : false}"
        })
        .done((response) => {
          this.setState({playlistID: response.id})
          let playlistID = this.state.playlistID;
          this.getFiveTopTracks()
        })
      }
    }
  }

  getFiveTopTracks() {
    let userID = this.props.currentUser.uid;
    let userToken = this.props.currentUser.token;

    {/* Get a list of current user's 5 top tracks */}
    $.ajax({
      url: "https://api.spotify.com/v1/me/top/tracks?limit=5",
      method: "GET",
      headers: {
        "Authorization": `Bearer ${userToken}`,
      }
    })
    .done((response) => {
      let trackURIs = []
      for (var i = 0; i < response.items.length; i++) {
        trackURIs.push(response.items[i].uri)
      }
      this.setState({tracks: this.state.tracks.concat(trackURIs)})
      this.addFiveTopTracks()
      if (this.state.tracks.length === 0) {
        this.getTopBeatlesTracks()
      }
    }.bind(this))
  }

  getTopBeatlesTracks() {
    $.ajax({
      url: "https://api.spotify.com/v1/artists/3WrFJ7ztbogyGnTHbHJFl2/top-tracks?country=US",
      method: "GET"
    })
    .done((response) => {
      let trackURIs = []
      for (var i = 0; i < response.tracks.length; i++) {
        trackURIs.push(response.tracks[i].uri)
      }
      this.setState({tracks: this.state.tracks.concat(trackURIs)})
      this.addFiveTopTracks()
    }.bind(this))
  }

  addFiveTopTracks() {
    if (this.state.tracks.length > 0) {
      let tracks = this.state.tracks;
      let userID = this.props.currentUser.uid;
      let userToken = this.props.currentUser.token;
      let playlistID = this.state.playlistID;

      $.ajax({
        url: `https://api.spotify.com/v1/users/${userID}/playlists/${playlistID}/tracks?uris=${tracks[0]},${tracks[1]},${tracks[2]},${tracks[3]},${tracks[4]}`,
        method: "POST",
        headers: {
          "Authorization": `Bearer ${userToken}`,
          "Content-Type": "application/json"
        }
      })
      .done((response) => {
        console.log(response)
      })
    }
  }

  renderProfileEditForm() {
    let availableSpace;
    if (this.props.createUser) {
      availableSpace =
      <ProfileEditForm currentUser={this.props.currentUser}
                       onboardingContainer />
    } else {
      availableSpace =
      <div>
        <div className="unique-value-prop">
          <p>Discover romance through shared musical passion</p>
        </div>
        <Button signUp />
        <Button logIn />
      </div>
    }
    return availableSpace;
  }


  render() {
    return(
      <div>
        {this.renderProfileEditForm()}
      </div>
    )
  }
}
