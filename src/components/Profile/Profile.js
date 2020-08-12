import React, { Component } from 'react'
import firebaseConfig from '../../firebase'
import firebase from 'firebase'
import './Profile.css'


class Profile extends Component {
  state = {
    user:firebase.auth().currentUser
  }


  render() {
    console.log(this.state)
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
