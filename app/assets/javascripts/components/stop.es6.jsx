class Stop extends React.Component {
  render () {
    const [lat,lng] = this.props.location;
    const c = this.props.cross_street;
    const rs = this.props.routes;
    return (
      <li className='stop'>
        <ReactRouter.Link to={`/stops/${this.props.id}`}>{c}</ReactRouter.Link>
        <ul className='route-links'>
          {rs.map((r)=> <li key={r}><RouteLink route={r} /></li> )}
        </ul>
      </li>
    );
  }
}

Stop.propTypes = {
  route: React.PropTypes.string
};
