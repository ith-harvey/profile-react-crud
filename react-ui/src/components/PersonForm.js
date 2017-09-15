
import React, {Component} from 'react';
import PersonPicture from './PersonPicture';
import { Card, Row, Col, Button } from 'react-materialize'


class PersonForm extends Component {
  constructor(props) {
    super(props);

    this.state = { author: '', text: '', profile_img_url: '', validationFailed: '' };

    //binding all our functions to this class
    this.handleAuthorChange = this.handleAuthorChange.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleImageUpload = this.handleImageUpload.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleAuthorChange(e) {
    this.setState({author: e.target.value});
  }

  handleTextChange(e) {
    this.setState({ text: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    let author = this.state.author.trim();
    let text = this.state.text.trim();
    let profile_img_url = this.state.profile_img_url;


    if (!text || !author || !profile_img_url) {

      this.setState({ validationFailed: true })
      return
    } else {
      this.setState({ validationFailed: false})
    }

    this.props.onPersonSubmit({
      author: author,
      text: text,
      profile_img_url: profile_img_url
    });

    this.setState({ author: '', text: '', profile_img_url: '', hasImageDroped: false});
  }

  handleImageUpload({profile_img_url}) {
    this.setState({
      profile_img_url: profile_img_url,
     })
  }

  render() {
    return (
      <Card>
        <form onSubmit = {this.handleSubmit}>

        {this.state.validationFailed?
          <Card className="card-error">
            Please ensure that all text fields are filled and an image is uploaded before you save this profile.
          </Card>
           : '' }

          <Row>
          <Col s={3}>
            <PersonPicture ref={instance => { this.personpicture = instance; }} onImageUpload={this.handleImageUpload} />
          </Col>

          <Col className="button-child-rightalign" s={7} offset="s1">
            <input type = 'text' placeholder = 'Your name…'
            value = { this.state.author}
            onChange = { this.handleAuthorChange} />

            <input type = 'text' placeholder = 'Enter a description of yourself…'
            value = { this.state.text }
            onChange = {this.handleTextChange}/>
            <Button
              onClick={() => { this.personpicture.resetImageString(); }}
              type = 'submit'>Save
            </Button>
          </Col>
          </Row>
        </form>
      </Card>
    )
  }
}
export default PersonForm;
