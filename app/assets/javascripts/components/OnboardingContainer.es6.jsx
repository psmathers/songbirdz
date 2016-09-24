// current_user is passed as a prop to OnboardingContainer from ProfileEditForm in order to relate Spotify user's auth to onboarding interface so that the
// dragging/dropping done in the onboarding interface is relayed to Spotify

class OnboardingContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stepsLeft: 3,
      playlistID: ""
    }
    this.nextStep = this.nextStep.bind(this)
    this.prevStep = this.prevStep.bind(this)
    this.switchOnboardingSteps = this.switchOnboardingSteps.bind(this)
    this.leftButtonRendering = this.leftButtonRendering.bind(this)
    this.rightButtonRendering = this.rightButtonRendering.bind(this)
  }

  componentDidMount() {
    let userID = this.props.current_user.uid;
    let userToken = this.props.current_user.token;
    $.ajax({
      url: `https://api.spotify.com/v1/users/${userID}/playlists`,
      method: "POST",
      headers: {
        "Authorization": `Bearer ${userToken}`,
        "Content-Type": "application/json"
      },
      dataType: "json",
      data: "{\"name\": \"Birdlist\", \"public\": false}"
    })
    .done((response) => {
      this.setState({playlistID: response.id})
    })
  }

  nextStep() {
    this.setState({stepsLeft: this.state.stepsLeft -= 1})
    if (this.state.stepsLeft == 0) {
      // Redirect to the matches page
      console.log("Done with onboarding, redirect to matches page")
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
      onboardingStep = <Playlist current_user={this.props.current_user}
                                 playlistID={this.state.playlistID} />
    }
    return onboardingStep
  }

  leftButtonRendering() {
    let leftButton
    if (this.state.stepsLeft == 3) {
      leftButton = null
    } else if (this.state.stepsLeft == 2 || this.state.stepsLeft == 1) {
      leftButton = <Button prev
                           updateStepCount={this.prevStep}/>
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
                           updateStepCount={this.nextStep}/>
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
