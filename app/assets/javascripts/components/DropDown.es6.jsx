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
        <img src={this.props.userImg}/>
        <div className="about"> Traits: {this.props.match.about} </div>
        <form className="chat" action="/chat" method="get">
          <input type="submit" value="Start Chirp"/>
        </form>
      </div>
    )
  }
}
