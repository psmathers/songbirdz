class Birdlist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      userPlaylists: [],
      playlistID: ""
    };
    this.currentBirdlist = this.currentBirdlist.bind(this);
  }

  componentDidMount() {
    let userID = this.props.currentUser.uid;
    let userToken = this.props.currentUser.token;

    $.ajax({
      url: `https://api.spotify.com/v1/users/${userID}/playlists`,
      method: "GET",
      headers: {
        "Authorization": `Bearer ${userToken}`,
      }
    })
    .done((response) => {
      this.setState({userPlaylists: response.items})
      for (var i = 0; i < this.state.userPlaylists.length; i++) {
        if (this.state.userPlaylists[i].name === "Birdlist") {
          this.setState({playlistID: this.state.userPlaylists[i].id })
        }
      }
    })
  }

  currentBirdlist() {
    let currentBirdlist
    if (this.state.playlistID !== "") {
      currentBirdlist = <CurrentBirdlist currentUser={this.props.currentUser}
                                         playlistID={this.state.playlistID} />
    } else {
      currentBirdlist = null
    }
    return currentBirdlist
  }

  render() {
    return(
      <div>
        {this.currentBirdlist()}
        {/* <BirdlistSearchBar />

          // Appears after searching for a song in <BirdlistSearchBar />
          <BirdlistSearchResults /> */}
      </div>
    )
  }
}
