import React, { Component } from 'react'
import firebaseConfig from '../../firebase'
import firebase from 'firebase'
import defaultAvatar from '../../assets/default-avatar.jpg'
import './Profile.css'
import Frame from '../Frame/Frame'

class Profile extends Component {
  state = {
    user:firebase.auth().currentUser.uid,
    page: 'posts',
    avatar: defaultAvatar,
  }

  userRef = firebase.database().ref('users/' + this.state.user)
  avatar = ''
  userPosts = []

  async componentDidMount() {
    const framesRef = firebase.database().ref('/frames')
    await framesRef.orderByChild('createdBy').equalTo(this.state.user).on('child_added', snapshot => {
      this.userPosts.push({...snapshot.val(),frameID:snapshot.key})
    })
    this.setState({posts:this.userPosts})
  }

  render() {
    // const postsPage = () => {
    //   userRef.once('value').then(snapshot => {
    //
    //   })
    // }
    return (
      <div className='profileContainer'>
        <h1 className='header'>PROFILE</h1>
        <nav className='profileNav'>
          <ul>
            <li>Posts</li>
            <li>Favorites</li>
            <li>Comments</li>
            <li>Settings</li>
          </ul>
        </nav>
        <img src={defaultAvatar}/>
        <div className='profilePostsDiv'>
          {
            this.userPosts ?
            this.userPosts.map(frame => {
              return <Frame
                key={frame.frameID}
                frameID={frame.frameID}
                name={frame.name}
                imageURL={frame.imageURL}
                imageName={frame.imageName}
                message={frame.message}
                createdBy={frame.createdBy}
                />
            })
            :
            <p>no posts to show</p>
          }
        </div>
        <button className='signOutButton' onClick={() => firebaseConfig.auth().signOut()}>Sign out</button>
      </div>
    )
  }
}

export default Profile
