class Birdlist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

      searchResults = []
    };
  }

  componentDidMount() {

  }

  render() {
    // Always appears
    <CurrentBirdlist />
    <BirdlistSearchBar />

    // Appears after searching for a song in <BirdlistSearchBar />
    <BirdlistSearchResults />
  }
}
