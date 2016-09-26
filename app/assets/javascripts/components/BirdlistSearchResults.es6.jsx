class BirdlistSearchResults extends React.Component {
  constructor(props) {
    super(props);
    this.addSongToBirdlist = this.addSongToBirdlist.bind(this)
    this.state = {
      results: this.props.results
    }
  }

  addSongToBirdlist(trackURI, event) {
    this.props.addSearchResult(trackURI);
  }

  render() {
    return(
      <div>
        {
          this.props.results.map((result) => {
            let addWithTrack = this.addSongToBirdlist.bind(this, result);
            return(
              <BirdsongCell key={result}
                            addType
                            trackURI={result}
                            addSongToBirdlist={addWithTrack} />
            )
          })
        }
      </div>
    )
  }
}
