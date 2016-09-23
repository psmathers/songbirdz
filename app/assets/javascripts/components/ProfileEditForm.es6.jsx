class ProfileEditForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this)
    this.renderOnboardingContainer = this.renderOnboardingContainer.bind(this)
  }

  componentDidMount() {

  }

  handleSubmit() {
    // Handle put request to the appropriate "Users" controller route
  }

  renderOnboardingContainer() {
    let availableSpace;
    // If the "this.props.current_user" has JUST finished filling out the ProfileEditForm and has NOT gone through the onboarding process yet AND
    // this.props.onboardingContainer IS present:
    // availableSpace = <OnboardingContainer current_user={this.props.current_user} />

    // If the "this.props.current_user" is already an established user and HAS gone through the onboarding process while back AND
    // this.props.onboardingContainer is NOT present:
    // availableSpace = null
    return availableSpace;
  }

  render() {
    return(
      <div className="form-onboarding-container">
        <div className="form-container">
          <h3>Create your profile</h3>
          <form className="edit-form" onSubmit={this.handleSubmit}>
            <div className="form-input">
              <label for="age-range">Age Range:</label>
              <input name="min-age" type="number" min="18" max="99" placeholder="min" />

              <span> to </span>

              <input name="max-age" type="number" min="19" max="100" placeholder="max" />
            </div>

            <div className="form-input">
              <label for="gender">Gender:</label><br/>
              <select name="gender">
              {/* Determine all of the genders that we'll be adding here */}
              <option value="each gender we want">Some gender</option>
              </select>
            </div>

            <div className="form-input">
              <legend>Preferences: </legend>
              {/* Determine all of the "looking fors" that we'll be adding here */}
              <input type="checkbox" name="men" />Men<br/>

              <label for="about-me">About Me</label><br/>
              <textarea name="about-me"></textarea>
            </div>

            <input type="submit" value="Submit" />
          </form>
        </div>
        {this.renderOnboardingContainer()}
      </div>
    )
  }

}
