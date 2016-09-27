class DropDown extends React.Component {
  constructor() {
    super()
    this.state = {
      match: []
    };
  }
  componentDidMount() {
    this.setState({
      match: this.props.match
    })
  }

  render() {
    return(
      <div>
        <div className="prof-pic"> THIS IS SUPPOSED TO BE A PICTURE! </div>
        <div className="about"> Traits: {this.props.match.about} </div>
        <form className="chat" action="/chat" method="get">
          <input type="submit" value="Start Chirp"/>
        </form>
      </div>
    )
  }
}
