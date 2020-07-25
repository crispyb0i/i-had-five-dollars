import React, { Component } from 'react'
import firebase from '../firebase.js'
import { Link } from 'react-router-dom'

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
        <img src={imageURL} key={imageName} alt={imageName}/>
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
        <div className="homeWrapper">
          <ul>
            {this.state.frames.map((frame) => {
              return (
                <Link to={`/frame/${frame.id}`} key={frame.id}>
                <div className="frameDiv">
                    <li key={frame.id}>
                    <h3>{frame.name}</h3>
                    <img style={{width:'300px'}} src={frame.imageURL} data={frame.image} alt={this.state.imageName}/>
                    <p>{frame.message}</p>
                    <button onClick={() => this.removeItem(frame.id,frame.imageName)}>Remove Item</button>
                    </li>
                </div>
                </Link>
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
