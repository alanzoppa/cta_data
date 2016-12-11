class DictionaryEntry extends React.Component {
  render() {
    if (this.props.term && this.props.definition) {
      return (
        <li>
          <span className="term">{this.props.term}</span>
          <span className="definition">{this.props.definition}</span>
        </li>
      );
    }
    return null;
  }
};

DictionaryEntry.propTypes = {
  term: React.PropTypes.string,
}


