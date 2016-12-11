class RouteDatum extends React.Component {
  render () {
    return (
      <div className='route-datum'>
        <h4>Route {this.props.route_name}</h4>
        <DistantStop
          {...this.props.route_farthest_stops.farthest}
          distance={this.props.route_farthest_stops.meters_to_farthest}
          origin={this.props.stop.location}
        />
        <DistantStop
          {...this.props.route_farthest_stops.farthest_from_farthest}
          distance={this.props.route_farthest_stops.meters_to_farthest_from_farthest}
          origin={this.props.stop.location}
        /> 
      </div>
    );
  }
}

RouteDatum.propTypes = {
  route_name: React.PropTypes.string,
  stops: React.PropTypes.object
};
