class BirdlistSearchResults extends React.Component {

  
  render() {
    return(
      <div>
        {
          this.props.results.map((result) => {
            let addWithTrack = this.addSongToBirdlist.bind(this, track);
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
