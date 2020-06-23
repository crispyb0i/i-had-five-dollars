import React, { Component } from 'react'
import firebase from '../firebase.js'

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
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
  const framesRef = firebase.database().ref('frames')
  framesRef.on('value', (snapshot) => {
    let frames = snapshot.val()
    let newState = []
    for (let frame in frames) {
      newState.push({
        id: frame,
        name: frames[frame].name,
        message: frames[frame].message,
        imageName: frames[frame].imageName,
        imageURL: frames[frame].imageURL
      });
    }
    this.setState({
      frames: newState
    });
  });
}

  handleChange(e) {
    if(e.target.name === "image"){
      const image = e.target.files[0]
      console.log(image.name)
      this.setState({imageName:image.name})
      this.fileSelectedHandler(image)
    } else {
      this.setState({
        [e.target.name]: e.target.value
      })
    }
    console.log(this.state)
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

      },
      () => {
        firebase.storage().ref('frames').child(image.name).getDownloadURL().then(url => this.setState({imageURL:url}))
      }
    )
  }

  handleSubmit(e) {
    e.preventDefault()
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
      progress: 0
    })
  }

  removeItem(frameId,imageName) {
    const itemRef = firebase.database().ref(`/frames/${frameId}`);

    const imageRef = firebase.storage().ref(`/frames/${imageName}`)
    console.log(imageRef)
    itemRef.remove()
    imageRef.delete().then(function() {
      alert("FILE DELETED SUCCESSFULLY")
    }).catch(function(error) {
      alert(error)
    })
  }

  render() {
    return (
      <div className='createContainer'>
        <section className="add-item">
          <form onSubmit={this.handleSubmit}>
            <progress value={this.state.progress} max="100" id="uploader"></progress>
            <input name="image" type="file" accept=".jpeg,.jpg,png" id="fileButton" onChange={this.handleChange}/>
            <input type="text" name="name" placeholder="What's your name?" onChange={this.handleChange} value={this.state.name} />
            <textarea name="message" cols="50" rows="10" maxLength="300" placeholder="What do you want your frame to say?" onChange={this.handleChange} value={this.state.message} />
            <button>Add Frame</button>
          </form>
        </section>
        <section className='display-item'>
          <div className="wrapper">
            <ul>
              {this.state.frames.map((frame) => {
                return (
                  <li key={frame.id}>
                    <h3>{frame.name}</h3>
                    <img style={{width:'400px'}} src={frame.imageURL} data={frame.image}/>
                    <p>{frame.message}</p>
                    <button onClick={() => this.removeItem(frame.id,frame.imageName)}>Remove Item</button>
                  </li>
                )
              })}
            </ul>
          </div>
        </section>
      </div>
    )
  }
}

export default CreateFrame
