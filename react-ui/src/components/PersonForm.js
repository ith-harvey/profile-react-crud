
import React, {Component} from 'react';
import Dropzone from 'react-dropzone';
import request from 'superagent';

const CLOUDINARY_UPLOAD_PRESET ='gjhwcukc';
const CLOUDINARY_UPLOAD_URL='https://api.cloudinary.com/v1_1/dexu2xpbl/upload';


class PersonForm extends Component {
  constructor(props) {
    super(props);

    this.state = { author: '', text: '', uploadedFileCloudinaryUrl: '', profile_img_url: '' };

    this.handleAuthorChange = this.handleAuthorChange.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  // image methods

  onImageDrop(files) {
    this.setState({
      uploadedFile: files[0]
    });

    this.handleImageUpload(files[0]);
  }


  handleImageUpload(file) {
    let upload = request.post(CLOUDINARY_UPLOAD_URL)
                        .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
                        .field('file', file);

    upload.end((err, response) => {
      if (err) {
        console.error(err);
      }
      console.log('url!',response.body.secure_url);

      if (response.body.secure_url !== '') {
        this.setState({
          uploadedFileCloudinaryUrl: response.body.secure_url
        });
      }
    });
  }

  // end image methods


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
    let profile_img_url = this.state.uploadedFileCloudinaryUrl;

    if (!text || !author) {
      return
    }

    this.props.onPersonSubmit({
      author: author,
      text: text,
      profile_img_url: profile_img_url
    });

    this.setState({ author: '', text: '', profile_img_url: ''});
  }

  render() {
    return (
      <form onSubmit = {this.handleSubmit}>
        <input type = 'text' placeholder = 'Your name…'
        value = { this.state.author}
        onChange = { this.handleAuthorChange} />

        <input type = 'text' placeholder = 'Say something…'
        value = { this.state.text }
        onChange = {this.handleTextChange}/>

        <div>
          <Dropzone
            multiple={false}
            accept="image/*"
            onDrop={this.onImageDrop.bind(this)}>
            <p>Drop an image or click to select a file to upload.</p>
          </Dropzone>

          <div>
            {this.state.uploadedFileCloudinaryUrl === '' ? null :
            <div>
              <p>{this.state.uploadedFile.name}</p>
              <img className="img-profile" src={this.state.uploadedFileCloudinaryUrl} />
            </div>}
          </div>
        </div>

        <input type = 'submit' value = 'Save' />
      </form>
    )
  }
}
export default PersonForm;
