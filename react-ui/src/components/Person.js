
import React, { Component } from 'react';
import marked from  'marked';

class Person extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toBeUpdated: false,
      author: '',
      text: ''
    };
    //binding all our functions to this class
    this.deletePerson = this.deletePerson.bind(this);
    this.updatePerson = this.updatePerson.bind(this);
    this.handleAuthorChange = this.handleAuthorChange.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handlePersonUpdate = this.handlePersonUpdate.bind(this);
  }
  updatePerson(e) {
    e.preventDefault();
    //brings up the update field when we click on the update link.
    this.setState({
      toBeUpdated: !this.state.toBeUpdated
    });
  }
  handlePersonUpdate(e) {
    e.preventDefault();
    let id = this.props.uniqueID;
    //if author or text changed, set it. if not, leave null and our PUT
    //request will ignore it.
    let author = (this.state.author) ? this.state.author : null;
    let text = (this.state.text) ? this.state.text : null;
    let person = {
      author: author,
      text: text
    };
    this.props.onPersonUpdate(id, person);
    this.setState({
      toBeUpdated: !this.state.toBeUpdated,
      author: '',
      text: ''
    })
  }

  deletePerson(e) {
    e.preventDefault();
    let id = this.props.uniqueID;
    this.props.onPersonDelete(id);
    console.log('oops deleted');
  }

  handleTextChange(e) {
    this.setState({
      text: e.target.value
    });
  }

  handleAuthorChange(e) {
    this.setState({
      author: e.target.value
    });
  }

  rawMarkup() {
    let rawMarkup = marked(this.props.children.toString());
    return {__html: rawMarkup};
  }
  render() {
    return (
      <div>
        <h3> {this.props.author} </h3>
        <span dangerouslySetInnerHTML = {this.rawMarkup()} />
        <a href ='#'onClick = { this.updatePerson}>
          update
        </a>
        <a href = '#' onClick = { this.deletePerson}>
         delete
        </a>
       {(this.state.toBeUpdated) ? (<form onSubmit={this.handlePersonUpdate}>
        <input type = 'text' placeholder = 'Update name…'
        value = {this.state.author}
        onChange = {this.handleAuthorChange}
        />

        <input type = 'text' placeholder = 'Update your description…'
        value = {this.state.text}
        onChange = {this.handleTextChange}/>
        <input type = 'submit' value = 'Update' />
        </form>) : null}
      </div>
    )
  }
}


export default Person;
