class MatchesViewAll extends React.Component {
  constructor() {
    super()
    this.state = {
      matches: []
    };
  }
  componentDidMount() {
    this.setState({
      matches: this.props.matches
    })
  }

  render() {
    return(
       <ul>
       {
         this.state.matches.map((match,idx) =>{
           return (<MatchCell key={idx} data={match} />)
         })
       }
       </ul>

    )
  }
}
