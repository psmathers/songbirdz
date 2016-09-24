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
    let route = `/users/${this.props.user.id}`
    return(
      <div className="form-onboarding-container">
        <div className="form-container">
          <h3>Create your profile</h3>
          <form action={route} method="post" className="edit-form" onSubmit={this.handleSubmit}>
            <input type="hidden" name="_method" value="put"/>
            <div className="form-input">
              <input className="age" type="number" name="age" placeholder="Your Age" />
            </div>

            <div className="form-input">
              <label for="age-range">Age Range:</label><br/>
              <input className="min-max" name="minAge" type="number" min="18" max="99" placeholder="min" />

              <span id="btwn"> to </span>

              <input className="min-max" name="maxAge" type="number" min="19" max="100" placeholder="max" />
            </div>

            <div className="form-input">
              <label for="gender">Gender:</label><br/>
              <select name="gender">
              {/* Determine all of the genders that we'll be adding here */}
              <option value="male">Male</option>
              <option value="female">Female</option>
              </select>
            </div>

            <div className="form-input">
              <label>Looking for: </label><br/>
                            {/* Determine all of the "looking fors" that we'll be adding here */}
              <input type="checkbox" id="c1" name="men" />
              <label className="check" for="c1"><span></span>Men</label>
              <input type="checkbox" id="c2" name="women" />
              <label className="check" for="c2"><span></span>Women</label>
              <input type="checkbox" id="c3" name="other" />
              <label className="check" for="c3"><span></span>Other</label>
            </div>

            <div className="form-input">
              <textarea name="about" placeholder="Tell us about yourself!"></textarea>
            </div>

            <div className="form-input">
              <input type="submit" value="Submit" />
            </div>

          </form>
        </div>
        {this.renderOnboardingContainer()}
      </div>
    )
  }
}
