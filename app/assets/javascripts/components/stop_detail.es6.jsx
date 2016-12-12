class StopDetail extends React.Component {
  propTypes: {
    street: React.PropTypes.string,
    cross_street: React.PropTypes.string,
    location: React.PropTypes.array,
    origin: React.PropTypes.array,
    distance: React.PropTypes.number,
    id: React.PropTypes.node
  }

  render () {
    const stopHref = `#/stops/${this.props.id}`;
    const pointHref = `#/point/${this.props.location[0]}/${this.props.location[1]}`;
    let distance = (this.props.distance && this.props.distance.round(2));
    distance = distance ? `${distance} meters` : null

    if (this.props.distanceRequired && !this.props.distance) {
      return null;
    }

    return (
      <li className='stop-detail'>
        <a href={stopHref} className='stop-cross-street'>
          {this.props.street} at {this.props.cross_street}
        </a>

        <ul className='dictionary-list stop-delta-info'>
          <DictionaryEntry term="Routes" definition={<RouteList routes={this.props.routes} />} />
          <DictionaryEntry term="Location" definition={<a href={pointHref}>{this.props.location.length == 2 && this.props.location.join(', ')}</a>} />
          <DictionaryEntry term="Distance" definition={distance} />
        </ul>
      </li>
    );
  }
}



