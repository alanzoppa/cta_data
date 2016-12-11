class DeltaInfo extends React.Component {
  render() {
    const pointHref = `#/point/${this.props.location[0]}/${this.props.location[1]}`;
    let distance = (this.props.distance && this.props.distance.round(2));
    distance = distance ? `${distance} meters` : null
    return (
      <ul className='dictionary-list stop-delta-info'>
        <DictionaryEntry term="Location" definition={<a href={pointHref}>{this.props.location.length == 2 && this.props.location.join(', ')}</a>} />
        <DictionaryEntry term="Distance" definition={distance} />
      </ul>
    );
  }
};


DeltaInfo.propTypes = {
  location: React.PropTypes.array,
  origin: React.PropTypes.array,
  distance: React.PropTypes.number
}


