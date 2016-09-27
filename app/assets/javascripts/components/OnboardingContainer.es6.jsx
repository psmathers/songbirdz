// current_user is passed as a prop to OnboardingContainer from ProfileEditForm in order to relate Spotify user's auth to onboarding interface so that the
// dragging/dropping done in the onboarding interface is relayed to Spotify

class OnboardingContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stepsLeft: 3
    }
    this.nextStep = this.nextStep.bind(this)
    this.prevStep = this.prevStep.bind(this)
    this.switchOnboardingSteps = this.switchOnboardingSteps.bind(this)
    this.leftButtonRendering = this.leftButtonRendering.bind(this)
    this.rightButtonRendering = this.rightButtonRendering.bind(this)
  }

  componentDidMount() {
    
  }

  nextStep() {
    this.setState({stepsLeft: this.state.stepsLeft -= 1})
    if (this.state.stepsLeft == 0) {
      $.ajax({
        url: "/matches",
        method: "GET",
      })
      .done((response) => {
        window.location.replace("/matches")
      })
    }
  }

  prevStep() {
    this.setState({stepsLeft: this.state.stepsLeft += 1})
  }

  switchOnboardingSteps() {
    let onboardingStep
    if (this.state.stepsLeft == 3) {
      onboardingStep = <PlaylistInfo />
    } else if (this.state.stepsLeft == 2) {
      onboardingStep = <AnthemInfo />
    } else if (this.state.stepsLeft == 1) {
      onboardingStep = <Playlist currentUser={this.props.currentUser} />
    }
    return onboardingStep
  }

  leftButtonRendering() {
    let leftButton
    if (this.state.stepsLeft == 3) {
      leftButton = null
    } else if (this.state.stepsLeft == 2 || this.state.stepsLeft == 1) {
      leftButton = <Button prev
                           updateStepCount={this.prevStep} />
    }
    return leftButton
  }

  rightButtonRendering() {
    let rightButton
    if (this.state.stepsLeft == 3 || this.state.stepsLeft == 2) {
      leftButton = <Button next
                           updateStepCount={this.nextStep} />
    } else if (this.state.stepsLeft == 1) {
      leftButton = <Button finish
                           updateStepCount={this.nextStep} />
    }
    return leftButton
  }

  render() {
    return(
      <div>
        {this.switchOnboardingSteps()}
        {this.leftButtonRendering()}
        {this.rightButtonRendering()}
      </div>
    )
  }
}
