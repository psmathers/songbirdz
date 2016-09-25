class CurrentBirdlist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tracks: []
    };
    this.deleteSongFromBirdlist = this.deleteSongFromBirdlist.bind(this)
    this.setAnthem = this.setAnthem.bind(this)
  }

  componentDidMount() {
    let userID = this.props.current_user.uid;
    let userToken = this.props.current_user.token;
    let playlistID = this.props.playlistID;

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
    }.bind(this))
  }

  setAnthem(trackURI, event) {
    var oldTracksArray = this.state.tracks;
    var relevantSongIndex = oldTracksArray.indexOf(trackURI);
    var removedElement = oldTracksArray.splice(relevantSongIndex, 1);
    oldTracksArray.splice(0, 0, removedElement[0]);
    var newTracksArray = oldTracksArray;
    this.setState({tracks: newTracksArray});
  }

  deleteSongFromBirdlist(trackURI, event) {
    var oldTracksArray = this.state.tracks;
    var relevantSongIndex = oldTracksArray.indexOf(trackURI);
    oldTracksArray.splice(relevantSongIndex, 1);
    var newTracksArray = oldTracksArray;
    this.setState({tracks: newTracksArray});
  }

  render() {
    return(
      <div>
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
