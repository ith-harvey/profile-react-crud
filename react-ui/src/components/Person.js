
import React, { Component } from 'react';
import marked from  'marked';
import PersonPicture from './PersonPicture'
import { Card, Col, Button, Row } from 'react-materialize'

class Person extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toBeUpdated: false,
      author: '',
      text: '',
      profile_img_url: '',
      validationFailed: ''
    };

    //binding all our functions to this class
    this.deletePerson = this.deletePerson.bind(this);
    this.updatePerson = this.updatePerson.bind(this);
    this.handleAuthorChange = this.handleAuthorChange.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleImageUpload = this.handleImageUpload.bind(this);
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
    //request will ignore it
    let author = (this.state.author) ? this.state.author : null;
    let text = (this.state.text) ? this.state.text : null;
    let profile_img_url = (this.state.profile_img_url) ? this.state.profile_img_url : null;

    // if all fields are null then we display the error
    if (text === null
      && author === null
      && profile_img_url === null) {

      this.setState({ validationFailed: true })
      return
    } else {
      this.setState({ validationFailed: false})
    }

    let person = {
      author: author,
      text: text,
      profile_img_url: profile_img_url
    };

    this.props.onPersonUpdate(id, person);
    this.setState({
      toBeUpdated: !this.state.toBeUpdated,
      author: '',
      text: '',
      profile_img_url: ''
    })
  }

  deletePerson(e) {
    e.preventDefault();
    let id = this.props.uniqueID;
    this.props.onPersonDelete(id);
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

  handleImageUpload({profile_img_url}) {
    this.setState({ profile_img_url: profile_img_url })
  }

  rawMarkup() {
    let rawMarkup = marked(this.props.children.toString());
    return {__html: rawMarkup};
  }
  render() {
    return (
        <Col s={4}>
          <Card>
            <Row>
              <Col s={4} >
                <img className="img-profile" src={this.props.profile_img_url} />
                </Col>
                <Col s={5} >
                <h5>{this.props.author}</h5>
                </Col>
            </Row>
            <span className="description-card" dangerouslySetInnerHTML = {this.rawMarkup()} />
            <Row>
              <Col s={5}>
                <Button onClick = { this.updatePerson}>
                  update
                </Button>
              </Col>
              <Col s={5} offset="s1">
                <Button onClick = { this.deletePerson}>
                 delete
                </Button>
              </Col>
            </Row>
           {(this.state.toBeUpdated) ? (<form onSubmit={this.handlePersonUpdate}>

           {this.state.validationFailed?
             <Card className="card-error">
               Please ensure that at least one of the inputs are filled.
             </Card>
              : '' }

            <input type = 'text' placeholder = 'Update name…'
            value = {this.state.author}
            onChange = {this.handleAuthorChange}
            />

            <input type = 'text' placeholder = 'Update your description…'
            value = {this.state.text}
            onChange = {this.handleTextChange}/>

            <PersonPicture onImageUpload = {this.handleImageUpload} />
              <Button className="button-update" type = 'submit'>Save</Button>
            </form>) : null}
          </Card>
        </Col>
    )
  }
}


export default Person;
