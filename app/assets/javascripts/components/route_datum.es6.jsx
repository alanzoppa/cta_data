class RouteDatum extends React.Component {
  render () {
    console.log(this.props)
    return (
      <div>
        <div>Route Name: {this.props.route_name}</div>
      </div>
    );
  }
}

RouteDatum.propTypes = {
  route_name: React.PropTypes.string,
  stops: React.PropTypes.object
};

        //<div>Stops: {this.props.stops}</div>

