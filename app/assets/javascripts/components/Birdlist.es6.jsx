class Birdlist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      userPlaylists: [],
      playlistID: ""
    };
    this.currentBirdlist = this.currentBirdlist.bind(this);
    this.birdlistSearchResults = this.birdlistSearchResults.bind(this)
    this.updateSearchResults = this.updateSearchResults.bind(this);
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
          this.setState({playlistID: this.state.userPlaylists[i].id })
        }
      }
    })
  }

  updateSearchResults(tracks) {
    this.setState({searchResults: tracks})
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

  birdlistSearchResults() {
    let birdlistSearchResults
    if (this.state.searchResults.length > 0) {
      birdlistSearchResults = <birdlistSearchResults results={this.state.searchResults} />
    } else {
      birdlistSearchResults = null
    }
    return birdlistSearchResults
  }

  render() {
    return(
      <div>
        {this.currentBirdlist()}
        <BirdlistSearchBar onSearch={this.updateSearchResults} />
        {this.birdlistSearchResults()}
      </div>
    )
  }
}
