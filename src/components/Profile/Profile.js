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

  async componentDidMount() {
    let userPosts = {}
    const framesRef = firebase.database().ref('/frames/')
    await framesRef.orderByChild('createdBy').equalTo(firebase.auth().currentUser.uid).on('value',
     snapshot => {
      userPosts = snapshot.val()
      this.setState({posts:userPosts})
    })
  }

  handleNav = (e) => {
    this.setState({page:e.currentTarget.getAttribute('value')})
    console.log(this.state.page)
  }

  renderNav = () => {
    console.log(this.state.page)
    switch (this.state.page) {
      case 'posts':
        let posts = []
        for(let key in this.state.posts){
          posts.push(
            <Frame 
              key={key}
              frameID={key}
              name={this.state.posts[key].name}
              imageURL={this.state.posts[key].imageURL}
              imageName={this.state.posts[key].imageName}
              message={this.state.posts[key].message}
              createdBy={this.state.posts[key].createdBy}
            />
          )
        }
        return (
          <div>
            <h1>Your Posts</h1>
            <div className='profilePostsDiv'>
              {
                this.state.posts ?
                posts.map(frame => {
                  return frame
                })
                :
                <p>no posts to show</p>
              }
            </div>
          </div>
          )    
      default :
        return null
    }
  }


  render() {
    

    return (
      <div className='profileContainer'>
        <h1 className='header'>PROFILE</h1>
        <nav className='profileNav'>
          <ul>
            <li onClick={(e)=>this.handleNav(e)} value='posts'>Posts</li>
            <li onClick={(e)=>this.handleNav(e)} value='saved'>Saved</li>
            <li onClick={(e)=>this.handleNav(e)} value='settings'>Settings</li>
          </ul>
        </nav>
        <img className='avatarPic' src={defaultAvatar}/>
        {this.renderNav()}
       
        <button className='signOutButton' onClick={() => firebaseConfig.auth().signOut()}>Sign out</button>
      </div>
    )
  }
}

export default Profile
