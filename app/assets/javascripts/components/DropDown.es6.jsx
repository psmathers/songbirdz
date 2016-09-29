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
        <div className="dropdown-image">
          <img src={this.props.userImg}/>
        </div>
        <div className="about">
          <h5>{this.props.match.about}</h5>
        </div>
      </div>
    )
  }
}
