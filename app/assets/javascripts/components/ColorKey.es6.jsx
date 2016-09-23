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
          <li className="green">Green: One of your songs matches a song on one of their other playlists </li>
          <li className="yellow">Yellow: Matches songs in their genre</li>
          <li className="red">Red: No search results found</li>
        </ul>
      </div>
    )
  }
}
