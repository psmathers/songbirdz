class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.renderUserConfiguration = this.renderUserConfiguration.bind(this)
    this.renderProfileEditForm = this.renderProfileEditForm.bind(this)
    this.renderOnboardingContainer = this.renderOnboardingContainer.bind(this)
  }


  componentDidMount() {

  }

  renderUserConfiguration() {
    this.renderProfileEditForm()
    this.renderOnboardingContainer()
  }

  renderProfileEditForm() {
    let availableSpace;
    // If the "this.props.current_user" has JUST clicked the sign up button and has not configured their personal details yet on the ProfileEditForm
    // availableSpace = <ProfileEditForm current_user={this.props.current_user}/>

    // else
    // availableSpace = null
    return availableSpace;
  }

  renderOnboardingContainer() {
    let availableSpace;
    // If the "this.props.current_user" has JUST finished filling out the ProfileEditForm and has NOT gone through the onboarding process yet
    // availableSpace = <OnboardingContainer current_user={this.props.current_user} />

    // else
    // availableSpace = null
    return availableSpace;
  }

  render() {
    return(
      // Return this only if there is NOT a "this.props.current_user"
      // <div className="unique-value-prop">
      //   <p>
      //     Discover romance through shared musical passion
      //   </p>
      // </div>
      // <Button signUp />
      // <Button logIn />

      // Return this only if there IS a "this.props.current_user"
      // {this.renderUserConfiguration()}
    )
  }
}
