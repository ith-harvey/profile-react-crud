
import React, { Component } from 'react';
import axios from 'axios';
import PeopleList from './PeopleList';
import PersonForm from './PersonForm';

import {Container, Navbar} from 'react-materialize'


class PeopleBox extends Component {
  constructor(props) {
    super(props);
    this.state = { data:[] };
    
    //binding all our functions to this class
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

  // Posts new Person to DB
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

      }).catch(err => {
        console.error(err);
      });
  }

  //updates Person in DB based off of id
  handlePersonUpdate(id, person) {
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
        <Navbar brand=' People Profiles' offset="s1" right> </Navbar>
        <Container>
          <div className="childtext-center">
          <p className="caption">
          People Profiles is a profile management tool which allows users to read, create, edit and delete profiles.
          </p>
          </div>

          <PeopleList
            onPersonDelete = {this.handlePersonDelete}
            onPersonUpdate = {this.handlePersonUpdate}
            data = {this.state.data}/>

          <PersonForm onPersonSubmit = {this.handlePersonSubmit}/>
        </Container>
      </div>
    )
  }
}


export default PeopleBox;
