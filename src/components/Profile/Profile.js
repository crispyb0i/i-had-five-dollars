import React, { Component } from 'react'
import firebaseConfig from '../../firebase'
import firebase from 'firebase'
import defaultAvatar from '../../assets/default-avatar.jpg'
import './Profile.css'
import Frame from '../Frame/Frame'

class Profile extends Component {
  state = {
    user: firebase.database().ref('users/' + firebase.auth().currentUser.uid),
    page: 'default',
    posts: '',
    avatar: defaultAvatar,
  }

  //needs fixing
  // async componentDidMount() {
  //   let userPosts = {}
  //   const framesRef = firebase.database().ref('/frames/')
  //   await framesRef.orderByChild('createdBy').equalTo(firebase.auth().currentUser.uid).on('value',
  //    snapshot => {
  //     userPosts = snapshot.val()
  //     console.log(userPosts)
  //     this.setState({posts:userPosts})
  //   })
  //   console.log(this.state)
  //
  // }

  handleNav = (e) => {
    this.setState({page:e.currentTarget.getAttribute('value')})
    console.log(this.state)
  }

  render() {
    return (
      <div className='profileContainer'>
        <h1 className='header'>PROFILE</h1>
        <nav className='profileNav'>
          <ul>
            <li>Posts</li>
            <li onClick={(e)=>this.handleNav(e)} value='saved'>Saved</li>
            <li>Comments</li>
            <li>Settings</li>
          </ul>
        </nav>
        <img className='avatarPic' src={defaultAvatar}/>
        <h1>YOUR POSTS</h1>
        <div className='profilePostsDiv'>
          // needs fixing
          {
            this.state.posts.length>0 ?
            //frame[Object.keys(frame)]
            this.state.posts.map(frame => {
              console.log(Object.keys(frame))
              return <Frame
                key={Object.keys(frame)}
                frameID={Object.keys(frame)}
                name={frame[Object.keys(frame)].name}
                imageURL={frame[Object.keys(frame)].imageURL}
                imageName={frame[Object.keys(frame)].imageName}
                message={frame[Object.keys(frame)].message}
                createdBy={frame[Object.keys(frame)].createdBy}
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
