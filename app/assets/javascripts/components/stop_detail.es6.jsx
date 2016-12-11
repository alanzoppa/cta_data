class StopDetail extends React.Component {
  propTypes: {
    street: React.PropTypes.string,
    cross_street: React.PropTypes.string,
    location: React.PropTypes.array,
    origin: React.PropTypes.array,
    id: React.PropTypes.node
  }

  render () {
    const stopHref = `#/stops/${this.props.id}`;

    return (
      <div className='distant-stop'>
        <p>
          <a href={stopHref}>
            {this.props.street} at {this.props.cross_street}
          </a>
        </p>
        <DeltaInfo location={this.props.location} distance = {this.props.distance} />
      </div>
    );
  }
}



