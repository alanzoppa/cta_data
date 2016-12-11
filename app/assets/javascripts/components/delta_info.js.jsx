var DeltaInfo = React.createClass({
  propTypes: {
    location: React.PropTypes.array,
    origin: React.PropTypes.array,
    distance: React.PropTypes.number
  },

  render: function() {
    const pointHref = `#/point/${this.props.location[0]}/${this.props.location[1]}`;
    if (this.props.location && this.props.distance) {
      return (
        <ul className='dictionary-list stop-delta-info'>
          <DictionaryEntry term="Location" definition={<a href={pointHref}>{this.props.location.join(', ')}</a>} />
          <DictionaryEntry term="Distance" definition={this.props.distance.round(2)} />
        </ul>
      );
    }
    return null;
  }
});
