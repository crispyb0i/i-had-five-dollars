import React, { Component } from 'react'
import firebaseConfig from '../firebase'

class Profile extends Component {
  constructor(){
    super()
    this.state = {
    };
  }

  render() {
    return (
      <div className='container'>
        <h1 className='header'>PROFILE</h1>
        <h3>Posts</h3>
        <h3>Favorites</h3>
        <button onClick={() => firebaseConfig.auth().signOut()}>Sign out</button>
      </div>
    )
  }
}

export default Profile
