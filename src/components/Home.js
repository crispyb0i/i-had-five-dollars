import React, { Component } from 'react'
import CreateFrame from './CreateFrame'
import firebase from '../firebase.js'

class Home extends Component {
  constructor(){
    super()
    this.state = {
      frames:[]
    }
  }

  componentDidMount() {
    const framesRef = firebase.database().ref('frames')
    framesRef.on('value', (snapshot) => {
      let frames = snapshot.val()
      console.log(frames)
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
      })
    })
  }

  formatFrame(name,imageURL,message,imageName,id){
    return (
      <div className='frameContainer' key={id}>
        <h3>{name}</h3>
        <img src={imageURL} key={imageName}/>
        <p>{message}</p>
      </div>
    )
  }

  removeItem(frameId,imageName) {
    const itemRef = firebase.database().ref(`/frames/${frameId}`)
    const imageRef = firebase.storage().ref(`/frames/${imageName}`)
    itemRef.remove()
    imageRef.delete().then(function() {
      alert("FILE DELETED SUCCESSFULLY")
    }).catch(function(error) {
      alert(error)
    })
  }

  render() {
    return (
      <div className='container'>
      <section className='display-frames'>
        <div className="wrapper">
          <ul>
            {this.state.frames.map((frame) => {
              return (
                <div className="frameDiv">
                  <li key={frame.id}>
                  <h3>{frame.name}</h3>
                  <img style={{width:'300px'}} src={frame.imageURL} data={frame.image}/>
                  <p>{frame.message}</p>
                  <button onClick={() => this.removeItem(frame.id,frame.imageName)}>Remove Item</button>
                  </li>
                </div>
              )
            })}
          </ul>
        </div>
      </section>
      </div>
    )
  }
}

export default Home
