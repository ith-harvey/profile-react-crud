
import React, { Component } from 'react';
import Person from './Person';

class PeopleList extends Component {
  render() {
    let peopleNodes = this.props.data.map(person => {
      return (
        <Person author={ person.author }
        uniqueID={ person['_id'] }
        onPersonDelete={ this.props.onPersonDelete }
        onPersonUpdate={ this.props.onPersonUpdate }
        key={ person['_id'] }>
        { person.text }
        </Person>
      )
    })

    return (
      <div>
      { peopleNodes }
      </div>
    )
  }

}

export default PeopleList;
