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
      <div className="dropdown">
        <div className="prof-pic"> THIS IS SUPPOSED TO BE A PICTURE! </div>
        <div className="about"> About: THIS USER IS A SOUR PATCH KID LOOKING FOR OTHER SOUR PATCH KIDS PLZ NO SWEEDISH FISH </div>
        <form className="chat" action="/chat" method="get">
          <input type="submit" value="Start Chirp"/>
        </form>
      </div>
    )
  }
}
