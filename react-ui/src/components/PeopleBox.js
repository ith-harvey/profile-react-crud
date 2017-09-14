
import React, { Component } from 'react';
import axios from 'axios';
import PeopleList from './PeopleList';
import PersonForm from './PersonForm';


class PeopleBox extends Component {
  constructor(props) {
    super(props);
    this.state = { data:[] };

    this.loadPeopleFromServer = this.loadPeopleFromServer.bind(this);
    this.handlePersonSubmit = this.handlePersonSubmit.bind(this);
    this.handlePersonDelete = this.handlePersonDelete.bind(this);
    this.handlePersonUpdate = this.handlePersonUpdate.bind(this);
  }

  loadPeopleFromServer() {
    axios.get(this.props.url).then(res => {
        this.setState({ data: res.data });
    })
  }

  handlePersonSubmit(person) {
    let people = this.state.data;
    person.id = Date.now();
    let newPeople = people.concat([person]);

    this.setState({ data: newPeople });

    axios.post(this.props.url, person).catch(err => {
        console.error(err);
        this.setState({ data: people });
    });
  }

  handlePersonDelete(id) {
    axios.delete(`${this.props.url}/${id}`).then(res => {
        console.log('Person deleted');

      }).catch(err => {
        console.error(err);
      });
  }

  handlePersonUpdate(id, person) {
    //sends the person id and new author/text to our api
    axios.put(`${this.props.url}/${id}`, person).catch(err => {
        console.log(err);
      })
  }

  componentDidMount() {
    this.loadPeopleFromServer();
    setInterval(this.loadPeopleFromServer, this.props.pollInterval);
  }

  render() {
    return (
      <div>
        <h2> People: </h2>
        <PeopleList
          onPersonDelete = {this.handlePersonDelete}
          onPersonUpdate = {this.handlePersonUpdate}
          data = {this.state.data}/>

        <PersonForm onPersonSubmit = {this.handlePersonSubmit}/>
      </div>
    )
  }
}


export default PeopleBox;
