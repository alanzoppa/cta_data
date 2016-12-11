class RouteData extends React.Component {
  render () {
    if (this.props.stop) {
      return (
        <div>
          <h3>Stop Detail</h3>
          <ul className='stop-list'><StopDetail {...this.props.stop} /></ul>
          <div>{this.props.route_info.map(
            (route)=> <RouteDatum
              {...route}
              stop={this.props.stop}
              key={route.route_name}
            /> )}</div>
        </div>
        );
    }
    return null;
  }
}

RouteData.propTypes = {
  route_info: React.PropTypes.array
};
