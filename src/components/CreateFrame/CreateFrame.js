import React, { Component } from 'react'
import firebase from 'firebase'
import { Redirect } from 'react-router-dom';
import './CreateFrame.css'

class CreateFrame extends Component {
  constructor(){
    super()
    this.state = {
      name: '',
      message: '',
      imageName: '',
      imageURL: '',
      progress: 0,
      submitted: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    if(e.target.name === "image"){
      const image = e.target.files[0]
      if(this.state.imageName!=='' && image.name!==this.state.imageName){
        firebase.storage().ref(`frames/${this.state.imageName}`).delete().then(function() {
          alert("FILE DELETED SUCCESSFULLY")
        }).catch(function(error) {
          alert(error)
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

  async handleSubmit(e) {
    e.preventDefault()
    //make sure all parts of the form are filled in
    if(this.state.progress!==100 || this.state.name ==='' || this.state.message === ''){
      return alert("Please fill out all the forms")
    }
    const framesRef = firebase.database().ref('frames')
    const currentUser = firebase.auth().currentUser.uid
    const frame = {
      imageName: this.state.imageName,
      imageURL: this.state.imageURL,
      name: this.state.name,
      message: this.state.message,
      createdBy: currentUser
    }
    framesRef.push(frame);

    //get and set user frames immutably
    const userFramesRef = firebase.database().ref('/users/' + currentUser + '/frames/')
    let userFrames = {}
    let snap
    await userFramesRef.once('value').then(function(snapshot) {
      userFrames = {...snapshot.val()}
    })
    //get frame ID
    framesRef.limitToLast(1).on('child_added', function(childSnapshot) {
     snap = childSnapshot.key;
   });
    userFrames[snap]=true
    userFramesRef.set(userFrames)

    //set back to default values
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

    const charLeft = 200 - this.state.message.length;
    return (
      <div className='createContainer'>
        <h1>BUY A FRAME</h1>
        <form onSubmit={this.handleSubmit}>
          <input
           className="frameNameForm"
           maxLength="30"
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
             maxLength="200"
             placeholder="What do you want your frame to say? (200 character limit)" onChange={this.handleChange} value={this.state.message}
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
          {this.state.progress>0 && <progress className="progressBar uploader" value={this.state.progress} max="100" id="uploader">this.state.progress</progress>}
          <button className="frameSubmitButton">Add Frame</button>
          {this.state.imageURL!=='' &&
            <div className="frameImagePreview">
              <img
                src={this.state.imageURL}
                alt={this.state.imageName}
              />
            </div>
          }
        </form>
      </div>
    )
  }
}

export default CreateFrame
