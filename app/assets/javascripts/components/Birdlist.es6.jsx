class Birdlist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: []
    };
  }

  componentDidMount() {

  }

  render() {
    <div>
      <CurrentBirdlist currentUser={this.props.currentUser}
                       playlistID={this.props.playlistID} />
      {/* <BirdlistSearchBar />

      // Appears after searching for a song in <BirdlistSearchBar />
      <BirdlistSearchResults /> */}
    </div>
  }
}
