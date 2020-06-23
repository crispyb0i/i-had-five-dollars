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

  componentDidMount() {
    this.setState({submitted: false})
  }

  handleChange(e) {
    if(e.target.name === "image"){
      const image = e.target.files[0]
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
    console.log(this.state)
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
    return (
      <div className='createContainer'>
        <section className="add-item">
          <form onSubmit={this.handleSubmit}>
            <input className="frameNameForm" type="text" name="name" placeholder="What's your name?" onChange={this.handleChange} value={this.state.name} />
            <br/>
            <textarea className="frameMessageForm" name="message" cols="50" rows="10" maxLength="300" placeholder="What do you want your frame to say?" onChange={this.handleChange} value={this.state.message} />
            <br/>
            <input className="frameImageUploader" name="image" type="file" accept=".jpeg,.jpg,png" id="fileButton" onChange={this.handleChange}/>
            <br/>
            {this.state.progress>0 && <progress className="progressBar" value={this.state.progress} max="100" id="uploader"></progress>}
            <button className="frameSubmitButton">Add Frame</button>
          </form>
        </section>
      </div>
    )
  }
}

export default CreateFrame
