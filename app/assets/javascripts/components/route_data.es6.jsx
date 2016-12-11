class RouteData extends React.Component {
  render () {
    return (
        <div>
          <div>{this.props.route_info.map(
            (route)=> <RouteDatum
              {...route}
              stop={this.props.stop}
              key={route.route_name}
            /> )}</div>
        </div>
        );
  }
}

RouteData.defaultProps = {stop: {}}

RouteData.propTypes = {
  route_info: React.PropTypes.array
};
