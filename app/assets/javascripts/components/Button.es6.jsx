class Button extends React.Component {
  constructor(props) {
    super(props);
    this.buttonType = this.buttonType.bind(this)
  }

  buttonType() {
    let button
    if (this.props.next) {
      button = <a onClick={this.props.updateStepCount}>Next</a>
    } else if (this.props.prev) {
      button = <a onClick={this.props.updateStepCount}>Previous</a>
    } else if (this.props.finish) {
      button = <a onClick={this.props.updateStepCount}>Finish</a>
    }
    return button
  }


  render() {
    return(
      <div>
        {this.buttonType()}
      </div>
    )
  }
}
