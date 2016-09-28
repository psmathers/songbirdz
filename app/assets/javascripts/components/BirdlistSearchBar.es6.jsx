class BirdlistSearchBar extends React.Component {
  constructor(props) {
    super(props);
    // this.state = ;
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {

  }

  handleSubmit(event) {
    event.preventDefault();
    var title = this.refs.title.value
    $.ajax({
      url: `https://api.spotify.com/v1/search?q=${title}&type=track`,
      method: "GET"
    })
    .done((response) => {
      let trackURIs = []
      for (var i = 0; i < response.tracks.items.length; i++) {
        trackURIs.push(response.tracks.items[i].uri)
      }
      this.props.onSearch(trackURIs)
    })
  }

  render() {
    return(
        <form id="search" onSubmit={this.handleSubmit}>
          <input type="text" placeholder="Track to add to Birdlist" ref="title"/>
          <input type="submit" value="Search"/>
        </form>
    )
  }
}
