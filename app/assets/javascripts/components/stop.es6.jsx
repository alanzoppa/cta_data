class Stop extends React.Component {
  render () {
    const [lat,lng] = this.props.location;
    const c = this.props.cross_street;
    const rs = this.props.routes;
    const stopHref = `#/stops/${this.props.id}`;
    return (
      <li className='stop'>
        <a href={stopHref}>{c}</a>
        <ul className='route-links'>
          {rs.map((r)=> {
            const stopHref = `#/route/${r}`
            return(
              <li key={r}>
                <a href={stopHref}>{r}</a>
              </li>)
          })}
        </ul>
      </li>
    );
  }
}

Stop.propTypes = {
  route: React.PropTypes.string
};
