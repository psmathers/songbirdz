class Playlist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tracks: []
    }
    this.addTracksToBirdlist = this.addTracksToBirdlist.bind(this)
    this.delayBirdlistPopulating = this.delayBirdlistPopulating.bind(this)
    this.getBirdlist = this.getBirdlist.bind(this)
  }

  componentDidMount() {
    let userID = this.props.currentUser.uid;
    let userToken = this.props.currentUser.token;
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
      {/* Add those 5 tracks to Birdlist */}
    }.bind(this))
  }

  addTracksToBirdlist(tracks, userToken, userID, playlistID) {
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

  getBirdlist() {
    return <iframe src={`https://embed.spotify.com/?uri=spotify:user:${this.props.current_user.uid}:playlist:${this.props.playlistID}`} width="300" height="380" frameborder="0" allowtransparency="true"></iframe>
  }

  delayBirdlistPopulating(tracks, userToken, userID, playlistID) {
    if (tracks.length > 0) {
      this.addTracksToBirdlist(tracks, userToken, userID, playlistID)
    }
  }

  render() {
    return(
      <div>
        {this.delayBirdlistPopulating(this.state.tracks, this.props.currentUser.token, this.props.currentUser.uid, this.props.playlistID)}
        {this.state.tracks.length > 0 ? this.getBirdlist() : null}
      </div>
    )
  }
}
