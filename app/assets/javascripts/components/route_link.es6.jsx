class RouteLink extends React.Component {
  render () {
    return (
      <ReactRouter.Link to={`/route/${this.props.route}`}>
        #{this.props.route}
      </ReactRouter.Link>
    );
  }
}

RouteLink.propTypes = {
  route: React.PropTypes.string
};
