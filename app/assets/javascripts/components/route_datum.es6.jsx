class RouteDatum extends React.Component {
  render () {
    return (
      <div className='route-datum'>
        <h4>Most Distant Stops on Route #{this.props.route_name}</h4>

        <ul className='stop-list'>
          <StopDetail
            {...this.props.route_farthest_stops.farthest}
            distance={this.props.route_farthest_stops.meters_to_farthest}
          />
          <StopDetail
            {...this.props.route_farthest_stops.farthest_from_farthest}
            distance={this.props.route_farthest_stops.meters_to_farthest_from_farthest}
          /> 
        </ul>
      </div>
    );
  }
}

RouteDatum.propTypes = {
  route_name: React.PropTypes.string,
  stops: React.PropTypes.object
};
