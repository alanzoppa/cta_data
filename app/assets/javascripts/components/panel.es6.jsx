class Panel extends React.Component {
  render () {
    console.log(this.props.params)
    return (
        <div id="panel">
          <ul>
            {this.props.stops.map((stop)=> <Stop {...stop} key={stop.id} /> )}
          </ul>
        </div>
        )
  }
}

