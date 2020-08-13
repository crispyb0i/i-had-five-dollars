import React, { Component } from 'react'
import firebase from '../../firebase.js'
import { Link } from 'react-router-dom'
import './Home.css'
import { FaComments } from 'react-icons/fa';
import Frame from '../Frame/Frame'

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

  render() {
    return (
      <div className='container'>
        <h1 className='header'>I HAD FIVE DOLLARS</h1>
        <ul>
          {this.state.frames.map(frame =>
            (
              <li>
                <Frame frameID={frame.id} name={frame.name} imageURL={frame.imageURL} imageName={frame.imageName} message={frame.message}/>
              </li>
            )
          )}
        </ul>
      </div>
    )
  }
}

export default Home
