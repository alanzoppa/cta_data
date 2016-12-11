class GenericStopList extends React.Component {
  render () {
    if (!this.props.stops) {return null;}
    return (
      <ul className='stop-list'>
        {this.props.stops.map((stop)=> <StopDetail {...stop} key={stop.id} /> )}
      </ul>
    );
  }
}

GenericStopList.propTypes = {
  stops: React.PropTypes.array
};
