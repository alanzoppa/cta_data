class Panel extends React.Component {
  render () {
    return (
        <section id="panel">
          <RouteData route_info={this.props.route_info} stop={stop[0]} />
          <ul>
            {this.props.stops.map((stop)=> <Stop {...stop} key={stop.id} /> )}
          </ul>
        </section>
        )
  }
}
