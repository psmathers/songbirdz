// current_user is passed as a prop to OnboardingContainer from ProfileEditForm in order to relate Spotify user's auth to onboarding interface so that the
// dragging/dropping done in the onboarding interface is relayed to Spotify

class OnboardingContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stepsLeft: 3
    }
    this.updateNumberOfStepsLeft = this.updateNumberOfStepsLeft.bind(this)
    this.switchOnboardingSteps = this.switchOnboardingSteps.bind(this)
    this.leftButtonRendering = this.leftButtonRendering.bind(this)
    this.rightButtonRendering = this.rightButtonRendering.bind(this)
  }

  componentDidMount() {

  }

  updateNumberOfStepsLeft() {
    this.setState({steps: this.state.stepsLeft -= 1})
    if (this.state.stepsLeft == 0) {
      // Redirect to the matches page
    }
  }

  switchOnboardingSteps() {
    let onboardingStep
    if (this.state.stepsLeft == 3) {
      onboardingStep = <PlaylistInfo nextStep={this.updateNumberOfStepsLeft}/>
    } else if (this.state.stepsLeft == 2) {
      onboardingStep = <AnthemInfo nextStep={this.updateNumberOfStepsLeft} />
    } else if (this.state.stepsLeft == 1) {
      onboardingStep = <Playlist nextStep={this.updateNumberOfStepsLeft} />
    }
    return onboardingStep
  }

  leftButtonRendering() {
    let leftButton
    if (this.state.stepsLeft == 3) {
      leftButton = null
    } else if (this.state.stepsLeft == 2 || this.state.stepsLeft == 1) {
      leftButton = <Button prev />
    }
    return leftButton
  }

  rightButtonRendering() {
    let rightButton
    if (this.state.stepsLeft == 3 || this.state.stepsLeft == 2) {
      leftButton = <Button next />
    } else if (this.state.stepsLeft == 1) {
      leftButton = <Button finish />
    }
    return leftButton
  }

  render() {
    {this.switchOnboardingSteps()}
    {this.leftButtonRendering()}
    {this.rightButtonRendering()}
  }
}
