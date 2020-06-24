import React, { Component } from 'react'
import firebase from '../firebase.js'
import { Redirect } from 'react-router-dom';

class CreateFrame extends Component {
  constructor(){
    super()
    this.state = {
      name: '',
      message: '',
      imageName: '',
      imageURL: '',
      progress: 0,
      frames: [],
      submitted: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    if(e.target.name === "image"){
      const image = e.target.files[0]
      if(this.state.imageName!=='' && image.name!==this.state.imageName){
        console.log("HI")
        firebase.storage().ref(`frames/${this.state.imageName}`).delete().then(function() {
          alert("FILE DELETED SUCCESSFULLY")
        }).catch(function(error) {
          alert("HUH", error)
        })
      }
      this.setState({imageName:image.name})
      this.fileSelectedHandler(image)
    } else {
      this.setState({
        [e.target.name]: e.target.value
      })
    }
  }

  fileSelectedHandler = imageFile => {
    const image = imageFile
    const storageRef = firebase.storage().ref(`frames/${image.name}`)
    const uploadTask = storageRef.put(image)

    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
        this.setState({progress})
      },
      (error) => {
        alert(error)
      },
      () => {
        firebase.storage().ref('frames').child(image.name).getDownloadURL().then(url => this.setState({imageURL:url}))
      }
    )
  }

  handleSubmit(e) {
    e.preventDefault()
    if(this.state.progress!==100 || this.state.name ==='' || this.state.message === ''){
      return alert("Please fill out all the forms")
    }
    const framesRef = firebase.database().ref('frames')
    const frame = {
      imageName: this.state.imageName,
      imageURL: this.state.imageURL,
      name: this.state.name,
      message: this.state.message
    }
    framesRef.push(frame);
    document.getElementById('fileButton').value=''
    this.setState({
      image: '',
      imageURL: '',
      name: '',
      message: '',
      progress: 0,
      submitted: true
    })
  }

  render() {
    if (this.state.submitted === true) {
        return <Redirect to="/" />
    }

    const charLeft = 300 - this.state.message.length;
    return (
      <div className='createContainer'>
        <section className="add-item">
          <form onSubmit={this.handleSubmit}>
            <input
             className="frameNameForm"
             maxlength="30"
             type="text"
             name="name"
             autoComplete="off"
             placeholder="What's your name?" onChange={this.handleChange}
             value={this.state.name}
            />
            <br/>
            <textarea
              className="frameMessageForm"
              name="message"
              cols="50"
              rows="7"
               maxLength="300"
               placeholder="What do you want your frame to say?" onChange={this.handleChange} value={this.state.message}
             />
            <div className='char-length'>
              {charLeft <= 100
                ? <span>{charLeft} character(s) left</span>
                : <span> </span>
              }
            </div>
            <br/>
            <input
              className="frameImageUploader" 
              name="image"
              type="file"
              accept=".jpeg,.jpg,png"
              id="fileButton"
              onChange={this.handleChange}
            />
            <br/>
            {this.state.progress>0 && <progress className="progressBar" value={this.state.progress} max="100" id="uploader">this.state.progress</progress>}
            {this.state.imageURL!=='' &&
              <div>
                <img
                className="frameImagePreview" src={this.state.imageURL}
                alt={this.state.imageName}
                />
              </div>
            }
            <button className="frameSubmitButton">Add Frame</button>
          </form>
        </section>
      </div>
    )
  }
}

export default CreateFrame
