class GenericStopList extends React.Component {
  render () {
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
