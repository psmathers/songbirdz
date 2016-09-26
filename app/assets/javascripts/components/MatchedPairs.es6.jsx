class MatchedPairs extends React.Component {
  render() {
    // <pre><code>
    //     {JSON.stringify(this.props, null, 4)}
    //   </code></pre>
    return(

      <div>
      <MatchesViewAll matchedPairs={this.props.matchedPairs} />
      </div>
    )
  }
}
