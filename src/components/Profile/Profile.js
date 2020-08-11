import React, { Component, useContext } from 'react'
import firebaseConfig from '../../firebase'
import firebase from 'firebase'
import './Profile.css'
import { AuthContext } from '../Auth/Auth';

class Profile extends Component {
  state = {
    user:firebase.auth().currentUser
  }


  componentDidMount(){
    console.log(this.state.user)
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
