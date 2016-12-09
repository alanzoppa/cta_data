class Stop extends React.Component {
  render () {
    var c = this.props.cross_street;
    var rs = this.props.routes;
    return (
      <li key={stop.id}>
        {c} ({rs.map((r)=> <RouteLink route={r} key={r} /> )})
      </li>
    );
  }
}

Stop.propTypes = {
  route: React.PropTypes.string
};
