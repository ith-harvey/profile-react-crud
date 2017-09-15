import React, {Component} from 'react';
import Dropzone from 'react-dropzone';
import request from 'superagent';
import { Button } from 'react-materialize'

const CLOUDINARY_UPLOAD_PRESET = 'gjhwcukc';
const CLOUDINARY_UPLOAD_URL='https://api.cloudinary.com/v1_1/dexu2xpbl/upload';

class PersonPicture extends Component {
  constructor(props) {
    super(props);

    this.state = {
      uploadedFileCloudinaryUrl: '',
      hasImageDroped: false
    };

    //binding all our functions to this class
    this.onImageDrop = this.onImageDrop.bind(this)
    this.changeImage = this.changeImage.bind(this)
    this.resetImageString = this.resetImageString.bind(this)
  }
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
        console.log('is it here?',response.body.secure_url );
        if (response.body.secure_url !== '') {
          this.props.onImageUpload({
            profile_img_url: response.body.secure_url
          });

          this.setState({ hasImageDroped: true,
          uploadedFileCloudinaryUrl: response.body.secure_url });
        }
      });
    }

    resetImageString() {
      this.setState({ hasImageDroped: false})
    }


    changeImage() {
      this.setState({
        uploadedFileCloudinaryUrl: '',
        hasImageDroped: false
      })
    }

  render() {
    return (
      <div>
        {this.state.hasImageDroped ? <div>
          <Button onClick={this.changeImage}>Change image</Button>
        <div className="childtext-center">
          <img className="img-profile" src={this.state.uploadedFileCloudinaryUrl} />
          <p>{this.state.uploadedFile.name}</p>
        </div>
        </div> :
        <Dropzone
          multiple={false}
          accept="image/*"
          onDrop={this.onImageDrop}>
          <p>Drop an image or click to select a file to upload.</p>
        </Dropzone>
        }
      </div>

    )
  }

}

export default PersonPicture
