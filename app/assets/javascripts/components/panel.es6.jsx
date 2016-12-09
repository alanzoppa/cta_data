class Panel extends React.Component {
  render () {
    return (
        <div id="panel">
          <ul>
            {this.props.stops.map((stop)=> <Stop {...stop} key={stop.id} /> )}
          </ul>
        </div>
        )
  }
}

