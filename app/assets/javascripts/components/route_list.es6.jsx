class RouteList extends React.Component {
  render () {
    return (
      <span className='route-links'>
        {this.props.routes.map((route)=> {
          return(<a key={route} href={`#/route/${route}`}>{route}, </a>)
        })}
      </span>
    );
  }
}

RouteList.propTypes = {
  routes: React.PropTypes.array
};
