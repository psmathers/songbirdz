class CurrentBirdlist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tracks: []
    };
    this.deleteSongFromBirdlist = this.deleteSongFromBirdlist.bind(this)
    this.setAnthem = this.setAnthem.bind(this)
    this.setAnthemId = this.setAnthemId.bind(this)
  }

  componentDidMount() {
    let userID = this.props.currentUser.uid;
    let userToken = this.props.currentUser.token;
    let playlistID = this.props.playlistID;

    {/* Get a list of current user's 5 top tracks */}
    $.ajax({
      url: `https://api.spotify.com/v1/users/${userID}/playlists/${playlistID}/tracks`,
      method: "GET",
      headers: {
        "Authorization": `Bearer ${userToken}`,
      }
    })
    .done((response) => {
      let trackURIs = []
      for (var i = 0; i < response.items.length; i++) {
        trackURIs.push(response.items[i].track.uri)
      }
      this.setState({tracks: this.state.tracks.concat(trackURIs)})
    }.bind(this))
  }

  componentWillReceiveProps(nextProps) {
    let searchResults = nextProps.songsFromSearchResults
    if (searchResults.length > 0) {
      this.setState({tracks: this.state.tracks.concat(searchResults)})

      let userID = this.props.currentUser.uid;
      let userToken = this.props.currentUser.token;
      let playlistID = this.props.playlistID;

      $.ajax({
        url: `https://api.spotify.com/v1/users/${userID}/playlists/${playlistID}/tracks?uris=${searchResults[searchResults.length - 1]}`,
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

  setAnthemId() {
    // debugger
    $.ajax({
      url: `/users/${this.props.currentUser.id}`,
      method: "GET",
      // data: {anthem_id: ""}
    })
  }

  setAnthem(trackURI, event) {
    var oldTracksArray = this.state.tracks;
    var relevantSongIndex = oldTracksArray.indexOf(trackURI);
    var removedElement = oldTracksArray.splice(relevantSongIndex, 1);
    oldTracksArray.splice(0, 0, removedElement[0]);
    var newTracksArray = oldTracksArray;
    this.setState({tracks: newTracksArray});

    let userID = this.props.currentUser.uid;
    let userToken = this.props.currentUser.token;
    let playlistID = this.props.playlistID;

    $.ajax({
      url: `https://api.spotify.com/v1/users/${userID}/playlists/${playlistID}/tracks`,
      method: "PUT",
      headers: {
        "Authorization": `Bearer ${userToken}`,
        "Content-Type": "application/json"
      },
      dataType: "json",
      data: `{ \"range_start\" : ${relevantSongIndex}, \"insert_before\" : 0 }`
    })
    .done((response) => {
      console.log(response)
      this.setAnthemId()
    })
  }

  deleteSongFromBirdlist(trackURI, event) {
    var oldTracksArray = this.state.tracks;
    var relevantSongIndex = oldTracksArray.indexOf(trackURI);
    oldTracksArray.splice(relevantSongIndex, 1);
    var newTracksArray = oldTracksArray;
    this.setState({tracks: newTracksArray});

    let userID = this.props.currentUser.uid;
    let userToken = this.props.currentUser.token;
    let playlistID = this.props.playlistID;

    $.ajax({
      url: `https://api.spotify.com/v1/users/${userID}/playlists/${playlistID}/tracks`,
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${userToken}`,
        "Content-Type": "application/json"
      },
      dataType: "json",
      data: `{ \"tracks\" : [{ \"positions\": [${relevantSongIndex}], \"uri\": \"${trackURI}\"}] }`
    })
    .done((response) => {
      console.log(response)
    })
  }

  render() {
    return(
      <div id="current-list">
        {
          this.state.tracks.map((track) => {
            let anthemWithTrack = this.setAnthem.bind(this, track);
            let deleteWithTrack = this.deleteSongFromBirdlist.bind(this, track);
            return(
              <BirdsongCell key={track}
                            deleteType
                            trackURI={track}
                            setAnthem={anthemWithTrack}
                            deleteSongFromBirdlist={deleteWithTrack} />
            )
          })
        }
      </div>
    )
  }
}
