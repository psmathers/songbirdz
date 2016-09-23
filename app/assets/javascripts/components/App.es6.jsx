class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current_user: this.props.current_user
    };
    this.renderLandingOrMatches = this.renderLandingOrMatches.bind(this)
  }

  componentDidMount() {

  }

  renderLandingOrMatches() {
    let availableSpace;
    // if (this.state.current_user is already signed up with omniauth and has filled out the profile edit form and gone through onboarding) {
    //   availableSpace = <Matches />
    // } else if (this.state.current_user is being configured for the very first time and has NOT filled out the profile edit form and gone through onboarding) {
    //   availableSpace = <Landing current_user={this.state.current_user} />
    // } else {
    //   availableSpace = <Landing />
    // }
    return availableSpace;
  }

  render() {
    return(
      {this.renderLandingOrMatches()}
    )
  }
}
