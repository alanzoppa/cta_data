class DistantStop extends React.Component {
  render () {
    return (
      <div>
        <div>Street: {this.props.street}</div>
        <div>Cross Street: {this.props.crossStreet}</div>
        <div>Location: {this.props.location.join(', ')}</div>
        <div>Distance (m): {this.props.distance.round(2)}</div>
      </div>
    );
  }
}

DistantStop.propTypes = {
  street: React.PropTypes.string,
  crossStreet: React.PropTypes.string,
  location: React.PropTypes.array,
  origin: React.PropTypes.array,
  id: React.PropTypes.node
};
