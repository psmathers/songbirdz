class UserShow extends React.Component {
  constructor(props) {
    super(props)
    this.state = { user: this.props.user, preferences: this.props.user.preferences }
    this.updateUser = this.updateUser.bind(this)
    this.showPreferences = this.showPreferences.bind(this)
  }

  updateUser(response) {
    updatedUser = response.user
    this.setState({ user: updatedUser , preferences: response.user.preferences })
  }

  showPreferences() {
    // debugger
    return (this.state.preferences.map((pref) => {
      // debugger
      return(<p>{pref.looking_for}</p>)

    }))
  }


  render() {
    let user = this.state.user
//           <pre><code>
//         {JSON.stringify(this.props, null, 4)}
// </code></pre>
    return(
      <div className="profile-container">
        <div className="profile">
          <h2>{user.name}</h2>
          <p>{user.age} years old</p>
          <p>{user.gender}</p>
          <p>Looking for:</p>
          <p>Ages {user.min_age_choice} to {user.max_age_choice}</p>
          {this.showPreferences()}
          <p>{user.about}</p>
        </div>
        <ProfileEditForm onUpdate={this.updateUser} user={this.state.user}/>
      </div>
    )
  }
}
