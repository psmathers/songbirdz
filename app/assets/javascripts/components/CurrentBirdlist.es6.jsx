class CurrentBirdlist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tracks: []
    };
    this.moveUpOne = this.moveUpOne.bind(this)
    this.moveDownOne = this.moveDownOne.bind(this)
    this.deleteSongFromBirdlist = this.deleteSongFromBirdlist.bind(this)
  }

  componentDidMount() {

  }

  moveUpOne() {
    // Delete itself from the this.state.tracks array, add itself back in 1 // index closer to the TOP of the this.state.tracks array
    var removedElement = 
  }

  moveDownOne() {
    // Delete itself from the this.state.tracks array, add itself back in 1 // index closer to the BOTTOM of the this.state.tracks array
  }

  deleteSongFromBirdlist() {

  }

  render() {
    {
      this.state.tracks.map((track, index) => {
        <BirdsongCell key={index}
                      deleteType
                      trackURI={track}
                      moveUpOne={this.moveUpOne}
                      moveDownOne={this.moveDownOne}
                      deleteSongFromBirdlist={this.deleteSongFromBirdlist} />
      })
    }
  }
}
