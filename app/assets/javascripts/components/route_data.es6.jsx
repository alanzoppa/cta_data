class RouteData extends React.Component {
  render () {
    if (this.props.route_info) {
      return (
        <div>
          <div>{this.props.route_info.map( (route)=> <RouteDatum {...route} stop={stop} key={route.route_name}/> )}</div>
        </div>
        );
    }
    return null;
  }
}

RouteData.propTypes = {
  route_info: React.PropTypes.array
};
