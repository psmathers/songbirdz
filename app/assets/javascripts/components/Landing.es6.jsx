class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.renderProfileEditForm = this.renderProfileEditForm.bind(this)
  }


  componentDidMount() {

  }


  renderProfileEditForm() {
    let availableSpace;
    if (this.props.createUser) {
      availableSpace =
      <ProfileEditForm currentUser={this.props.currentUser}
                       onboardingContainer />
    } else {
      availableSpace =
      <div>
        <div className="unique-value-prop">
          <p>Discover romance through shared musical passion</p>
        </div>
        <Button signUp />
        <Button logIn />
      </div>
    }
    return availableSpace;
  }


  render() {
    return(
      <div>
        {this.renderProfileEditForm()}
      </div>
    )
  }
}
