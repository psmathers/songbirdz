class ColorKey extends React.Component {
  constructor() {
    super()
  }
  render() {
    return(
      <div className="color-key">
        <span>Match Affinity</span>
        <ul>
          <li className="purple">Purple: Your song matches their top song</li>
          <li className="blue">Blue: One of your songs matches a song on their main playlist </li>
          <li className="green">Green: You are matched with this pair </li>
          <li className="red">Red: No search results found</li>
        </ul>
      </div>
    )
  }
}
