class BirdsongCell extends React.Component {
  constructor(props) {
    super(props);
    this.birdsongCellType = this.birdsongCellType.bind(this)
  }

  birdsongCellType() {
    let cell
    if (this.props.deleteType) {
      cell =
      <div className="cell">
        <iframe src={`https://embed.spotify.com/?uri=${this.props.trackURI}`} width="300" height="80" frameBorder="0" allowTransparency="true"></iframe>
        <div className="alter-list-link">
        <a onClick={this.props.setAnthem}>Anthem</a>
        <a onClick={this.props.deleteSongFromBirdlist}>Delete</a>
        </div>
      </div>
    } else if (this.props.addType) {
      cell =
      <div className="cell">
        <iframe src={`https://embed.spotify.com/?uri=${this.props.trackURI}`} width="300" height="80" frameBorder="0" allowTransparency="true"></iframe>
        <div className="alter-list-link">
        <a onClick={this.props.addSongToBirdlist}>Add</a>
        </div>
      </div>
    }
    return cell
  }

  render() {
    return(
      <div id="birdcell">
        {this.birdsongCellType()}
      </div>
    )
  }
}
