class UserShow extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: this.props.user,
      preferences: this.props.user.preferences,
      formPresent: false
    }

    this.updateUser = this.updateUser.bind(this)
    this.showPreferences = this.showPreferences.bind(this)
    this.toggleForm = this.toggleForm.bind(this)
    this.showForm = this.showForm.bind(this)
    this.showAge = this.showAge.bind(this)
    this.showMinMax = this.showMinMax.bind(this)
  }

  updateUser(response) {
    updatedUser = response.user
    this.setState({ user: updatedUser , preferences: response.user.preferences })
  }

  showPreferences() {
    return (this.state.preferences.map((pref) => {
      return(<p>{pref.looking_for}</p>)

    }))
  }

  toggleForm() {
    let shouldToggle = !this.state.formPresent
    this.setState({
      formPresent: shouldToggle
    })
    if (shouldToggle) {
      return this.showForm()
    }
  }

  showForm() {
    if (this.state.formPresent) {
      return(<ProfileEditForm onUpdate={this.updateUser} toggle={this.toggleForm} user={this.state.user}/>)
    } else {
      return null
    }
  }

  showAge() {
    let age = this.state.user.age
    if (age) {
      return (
        <p>{age} years old</p>
      )
    }
  }

   showMinMax() {
    let user = this.state.user
    if (user.min_age_choice) {
      return (
        <p>Looking for: Ages {user.min_age_choice} to {user.max_age_choice}</p>
      )
    }
  }

  render() {
    let user = this.state.user
    let user_img = this.state.user.avatar
//           <pre><code>
//         {JSON.stringify(this.props, null, 4)}
// </code></pre>
    return(

      <div>
      <div className="profile-container">
        <div className="profile-info">
          <div className="profile-image">
            <img src={user_img} />
          </div>
          <h3 id="username">{user.name}</h3>
          {this.showAge()}
          <p>{user.gender}</p>
          {this.showMinMax()}
          {this.showPreferences()}
          <p>About: {user.about}</p>
          <div>
            <button id="block-button" onClick={this.toggleForm}>Edit</button>
            {this.showForm()}
          </div>
        </div>
        <div>
          <Birdlist currentUser={user}/>
        </div>
      </div>
      </div>
    )
  }
}
