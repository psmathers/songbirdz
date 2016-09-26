class BirdsongCell extends React.Component {
  constructor(props) {
    super(props);
    this.birdsongCellType = this.birdsongCellType.bind(this)
  }

  birdsongCellType() {
    let cell
    if (this.props.deleteType) {
      cell =
      <div>
        <a onClick={this.props.setAnthem}>Anthem</a>
        <iframe src={`https://embed.spotify.com/?uri=${this.props.trackURI}`} width="300" height="80" frameBorder="0" allowTransparency="true"></iframe>
        <a onClick={this.props.deleteSongFromBirdlist}>Delete</a>
      </div>
    } else if (this.props.addType) {
      cell =
      <div>
        <iframe src={`https://embed.spotify.com/?uri=${this.props.trackURI}`} width="300" height="80" frameBorder="0" allowTransparency="true"></iframe>
        <a onClick={this.props.addSongToBirdlist}>Add</a>
      </div>
    }
    return cell
  }

  render() {
    return(
      <div>
        {this.birdsongCellType()}
      </div>
    )
  }
}
