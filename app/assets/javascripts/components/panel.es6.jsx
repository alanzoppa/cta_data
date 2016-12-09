class Panel extends React.Component {
  render () {
    this.props.stops.sort(
      (a,b)=> {
        if (a.cross_street==b.cross_street) {return 0}
        else if (a.cross_street>b.cross_street) {return 1}
        return -1;
        }
      );
    return (
      <div id="panel">
        <ul>
          {this.props.stops.map((stop)=> <li key={stop.id}>{stop.cross_street} ({stop.routes.join(', ')})</li> )}
        </ul>
      </div>
    )
  }
}

