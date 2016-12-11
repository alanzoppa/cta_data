class GenericStopList extends React.Component {
  render () {
    return (
      <ul>
        {this.props.stops.map((stop)=> <Stop {...stop} key={stop.id} /> )}
      </ul>
    );
  }
}

GenericStopList.propTypes = {
  stops: React.PropTypes.array
};
