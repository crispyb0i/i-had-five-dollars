import React, { Component } from 'react'
import firebaseConfig from '../../firebase'
import firebase from 'firebase'
import './Profile.css'


class Profile extends Component {
  state = {
    user:firebase.auth().currentUser.uid,
    page: 'posts'
  }


  render() {
    const postsPage = () => {

    }
    console.log(this.state)
    return (
      <div className='container'>
        <h1 className='header'>PROFILE</h1>
        <nav className='profileNav'>
          <ul>
            <li>Posts</li>
            <li>Favorites</li>
            <li>Comments</li>
            <li>Settings</li>
          </ul>
        </nav>
        <button onClick={() => firebaseConfig.auth().signOut()}>Sign out</button>
      </div>
    )
  }
}

export default Profile
