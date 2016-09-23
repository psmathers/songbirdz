class ProfileEditForm extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }

  render() {
    return(
      <div className="profile-edit-form">
        <h3>Create your profile</h3>
        <form onSubmit={this.handleSubmit}>
          <label for="age-range">Age Range</label>
          <div className="age-range">
            <label for="min-age">Min</label>
            <input name="min-age" type="number" min="18" max="99" />

            <span>to</span>

            <label for="max-age">max</label>
            <input name="max-age" type="number" min="19" max="100" />
          </div>

          <label for="gender">Gender</label>
          <select name="gender">
            {/* Determine all of the genders that we'll be adding here */}
            <option value="each gender we want">Some gender</option>
          </select>

          <legend>Preferences</legend>
          {/* Determine all of the "looking fors" that we'll be adding here */}
          <input type="checkbox" name="men" value="Men" />Men

          <label for="about-me">About Me</label>
          <textarea name="about-me"></textarea>

          <input type="submit" value="Submit" />
        </form>
      </div>
    )
  }
}
