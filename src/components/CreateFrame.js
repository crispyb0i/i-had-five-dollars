import React, { Component } from 'react'
import firebase from '../firebase.js'

class CreateFrame extends Component {
  constructor(){
    super()
    this.state = {
      name: '',
      comment: '',
      image: '',
      frames: []

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
        comment: frames[frame].comment
      });
    }
    this.setState({
      frames: newState
    });
  });
}

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  fileSelectedHandler = event => {
    if (event.target.files[0]){
      let image = event.target.files[0]
      this.setState(() => ({image}))
      let storageRef = firebase.storage().ref('frames')
      let task = storageRef.put(image,{'contentType':'image/jpeg'});
      task.on('stage_changed',
        (snapshot) => {

        },
        (error) => {

        },
        () => {
          storageRef('frames').child(image.name).getDownloadURL().then(url => console.log(url))
        }
      )
    }
  }

  handleSubmit(e) {
    e.preventDefault()
    this.fileSelectedHandler(e)
    const framesRef = firebase.database().ref('frames')
    const frame = {
      image: this.state.image,
      name: this.state.name,
      comment: this.state.comment
    }
    framesRef.push(frame);
    let task = framesRef.put(this.state.image)

    task.on('state_changed',
      function progress(snapshot){
        let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        document.getElementById("uploader").innerHTML = percentage
      },
      function error(err) {

      },
      function complete() {

      }
    )
    this.setState({
      image: '',
      name: '',
      comment: ''
    })
  }

  removeItem(frameId) {
    const itemRef = firebase.database().ref(`/frames/${frameId}`);
    itemRef.remove()
  }

  render() {
    return (
      <div className='container'>
        <section className="add-item">
          <form onSubmit={this.handleSubmit}>
            <progress value="0" max="100" id="uploader">0%</progress>
            <input type="file" id="fileButton" onChange={this.fileSelectedHandler}/>
            <input type="text" name="name" placeholder="What's your name?" onChange={this.handleChange} value={this.state.name} />
            <textarea name="comment" cols="50" rows="10" maxLength="300" placeholder="What do you want your frame to say?" onChange={this.handleChange} value={this.state.comment} />
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
                    <p>{frame.comment}</p>
                    <button onClick={() => this.removeItem(frame.id)}>Remove Item</button>
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
