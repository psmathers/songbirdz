class ProfileEditForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      onboarding: false
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.renderOnboardingContainer = this.renderOnboardingContainer.bind(this)
  }

  componentDidMount() {

  }

  handleSubmit(event) {
    event.preventDefault()
    $.ajax({
        url: event.target.action,
        method: event.target.method,
        data: $(event.target).serialize()
    }).done((response) => {
      if (this.props.onUpdate) {
        this.props.onUpdate(response)
        this.props.toggle()
      } else if (this.props.onboardingContainer) {
        this.setState({onboarding: true})
      }
    }.bind(this))
  }

  renderOnboardingContainer() {
    let availableSpace;
    if (this.state.onboarding === true) {
      availableSpace =
      <OnboardingContainer current_user={this.props.current_user} />
    } else {
      availableSpace = null
    }
    return availableSpace;
  }

  render() {
    let user;
    let route;
    if (this.props.user) {
      user = this.props.user;
      route = `/users/${this.props.user.id}`
    } else {
      user = this.props.currentUser
      route = `/users/${this.props.currentUser.id}`
    }
    return(
      <div className="form-onboarding-container">
        <div className="form-container">
          <h3>Create your profile</h3>
          <form action={route} method="post" className="edit-form" onSubmit={this.handleSubmit}>
            <input type="hidden" name="_method" value="put"/>
            <div className="form-input">
              <input ref="age" className="age" type="number" name="age" placeholder="Your Age" defaultValue={user.age} />
            </div>

            <div className="form-input">
              <label for="age-range">Age Range:</label><br/>
              <input ref="min" className="min-max" name="minAge" type="number" min="18" max="99" placeholder="min" defaultValue={user.min_age_choice}/>

              <span id="btwn"> to </span>

              <input ref="max" className="min-max" name="maxAge" type="number" min="19" max="100" placeholder="max" defaultValue={user.max_age_choice}/>
            </div>

            <div className="form-input">
              <label for="gender">Gender:</label><br/>
              <select ref="gender" name="gender" defaultValue={user.gender}>
              {/* Determine all of the genders that we'll be adding here */}
              <option value="male">Male</option>
              <option value="female">Female</option>
              </select>
            </div>

            <div className="form-input">
              <label>Looking for: </label><br/>
                            {/* Determine all of the "looking fors" that we'll be adding here */}
              <input ref="men" type="checkbox" id="c1" name="men" value="1"/>
              <label className="check" for="c1"><span></span>Men</label>
              <input ref="women" type="checkbox" id="c2" name="women" value="2"/>
              <label className="check" checked="on" for="c2"><span></span>Women</label>
              <input ref="other" type="checkbox" id="c3" name="other" value="3"/>
              <label className="check" for="c3"><span></span>Other</label>
            </div>

            <div className="form-input">
              <textarea ref="about" name="about" placeholder="Tell us about yourself!" defaultValue={user.about}></textarea>
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
