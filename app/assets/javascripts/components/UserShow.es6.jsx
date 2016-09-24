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
      return(<ProfileEditForm onUpdate={this.updateUser} user={this.state.user}/>)
    } else {
      return null
    }
  }


  render() {
    let user = this.state.user
//           <pre><code>
//         {JSON.stringify(this.props, null, 4)}
// </code></pre>
    return(
      <div>
        <h2>{user.name}</h2>
        <p>{user.age} years old</p>
        <p>{user.gender}</p>
        <p>Looking for:</p>
        <p>Ages {user.min_age_choice} to {user.max_age_choice}</p>
        {this.showPreferences()}
        <p>{user.about}</p>
        <button onClick={this.toggleForm}>Edit</button>
        {this.showForm()}
      </div>
    )
  }
}
