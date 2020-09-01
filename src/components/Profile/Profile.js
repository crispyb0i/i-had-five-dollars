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
    bookmarks: '',
    avatar: defaultAvatar,
  }

  async componentDidMount() {
    const framesRef = firebase.database().ref('/frames/')
    const userBookmarksRef = firebase.database().ref('/users/' + firebase.auth().currentUser.uid + '/bookmarks')
    let bookmarked = []

    await framesRef.orderByChild('createdBy').equalTo(firebase.auth().currentUser.uid).on('value',
     snapshot => {
      this.setState({posts:snapshot.val()})
    })
    await userBookmarksRef.on('value',
     snapshot => {
      Object.keys(snapshot.val()).map(key => framesRef.child(key).on('value',snapshot => {
        // console.log(snapshot.val())
        // snapshot.val().id=key
        // console.log(snapshot.val())
        // bookmarked.push(obj)
      }))
    })
    this.setState({bookmarks:bookmarked})
    console.log(this.state)
  }

  handleNav = (e) => {
    this.setState({page:e.currentTarget.getAttribute('value')})
  }

  renderNav = () => {
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
        case 'saved':
          let bookmarks = []
          for(let bookmark of this.state.bookmarks){
            bookmarks.push(
            <Frame
              key={bookmark.id}
              frameID={bookmark.id}
              name={bookmark.name}
              imageURL={bookmark.imageURL}
              imageName={bookmark.imageName}
              message={bookmark.message}
              createdBy={bookmark.createdBy}
            />)
          }
          return (
            bookmarks
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
        <img className='avatarPic' alt='profile' src={defaultAvatar}/>
        {this.renderNav()}
        <button className='signOutButton' onClick={() => firebaseConfig.auth().signOut()}>Sign out</button>
      </div>
    )
  }
}

export default Profile
