class Playlist extends React.Component {
  render() {
    return(
      <div>
        <Birdlist currentUser={this.props.currentUser} />
      </div>
    )
  }
}
