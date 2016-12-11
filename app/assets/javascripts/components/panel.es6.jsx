class Panel extends React.Component {
  render () {
    return (
        <section id="panel">
          {this.props.route_info ? <RouteData route_info={this.props.route_info} stop={this.props.stops[0]} /> : <GenericStopList stops={this.props.stops} /> }
        </section>
        )
  }
}
