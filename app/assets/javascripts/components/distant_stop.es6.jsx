class DistantStop extends React.Component {
  render () {
    const stopHref = `#/stops/${this.props.id}`;
    const pointHref = `#/point/${this.props.origin[0]}/${this.props.origin[1]}`;

    return (
      <div className='distant-stop'>
        <p>
          <a href={stopHref}>
            {this.props.street} at {this.props.cross_street}
          </a>
        </p>
        <dl className='stop-delta-info'>
          <dt>Location</dt>
          <dd><a href={pointHref}>{this.props.location.join(', ')}</a></dd>
          <dt>Distance</dt>
          <dd>{this.props.distance.round(2)} meters</dd>
        </dl>
      </div>
    );
  }
}

DistantStop.propTypes = {
  street: React.PropTypes.string,
  cross_street: React.PropTypes.string,
  location: React.PropTypes.array,
  origin: React.PropTypes.array,
  id: React.PropTypes.node
};
