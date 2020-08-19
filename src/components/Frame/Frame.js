import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'
import firebase from 'firebase'
import FrameIcons from './FrameIcons/FrameIcons'
import './Frame.css'

class Frame extends Component {

  state = {
    liked: false,
    bookmarked: false,
    numberOfLikes: 0,
  }


  async componentDidMount() {
    if(firebase.auth().currentUser){
      const currentUser = firebase.auth().currentUser.uid
      const likeRef = firebase.database().ref('/frames/' + this.props.frameID + '/likes/')
      const bookmarkRef = firebase.database().ref('/users/' + currentUser + '/bookmarks/')
      let likeNum = 0;
      let likeObj = {}
      let bookmarkObj = {}
      //set like num
      await likeRef.once('value').then(function(snapshot) {
        likeObj = {...snapshot.val()}
      })
      if(likeObj[currentUser]){
        this.setState({liked:likeObj[currentUser]})
      }
      for(let like in likeObj){
        if(likeObj[like]===true){
          likeNum++
        }
      }
      this.setState({numberOfLikes:likeNum})
      //set bookmarked
      await bookmarkRef.once('value').then(function(snapshot) {
        bookmarkObj = {...snapshot.val()}
      })
      if(bookmarkObj[this.props.frameID]){
        this.setState({bookmarked:bookmarkObj[this.props.frameID]})
      }
    }
  }

  removeItem = (frameId,imageName) => {
    const itemRef = firebase.database().ref(`/frames/${frameId}`)
    const imageRef = firebase.storage().ref(`/frames/${imageName}`)
    const userFrameRef = firebase.database().ref(`/users/${this.props.createdBy}/frames/${frameId}`)
    itemRef.remove()
    userFrameRef.remove()
    imageRef.delete().then(function() {
      alert("FILE DELETED SUCCESSFULLY")
    }).catch(function(error) {
      alert(error)
    })
  }

  handleLike = () => {
    if(firebase.auth().currentUser){
      const currentUser = firebase.auth().currentUser.uid
      const frameID = this.props.frameID
      const likeRef = firebase.database().ref('/frames/' + this.props.frameID + '/likes/')
      const userLikesRef = firebase.database().ref('/users/' + currentUser + '/likes/')

      likeRef.once('value').then(function(snapshot) {
        let likeObj = {...snapshot.val()}
        if(likeObj[currentUser]){
          likeObj[currentUser]=!likeObj[currentUser]
          likeRef.set(likeObj)
        }else{
          likeObj[currentUser]=!likeObj[currentUser]
          likeRef.set(likeObj)
        }
      })
      userLikesRef.once('value').then(function(snapshot) {
        let userLikeObj = {...snapshot.val()}
        if(userLikeObj[frameID]){
          userLikeObj[frameID]=!userLikeObj[frameID]
          userLikesRef.set(userLikeObj)
        }else{
          userLikeObj[frameID]=true
          userLikesRef.set(userLikeObj)
        }
      })
      this.setState({liked:!this.state.liked})
      if(!this.state.liked){
        this.setState(prev=> {numberOfLikes:prev.numberOfLikes++})
      }else{
        this.setState(prev=> {numberOfLikes:prev.numberOfLikes--})
      }
    }else{
      this.props.history.push('/login')
    }
  }

  handleBookmark = async () => {
    const currentUser = firebase.auth().currentUser.uid
    const frameID = this.props.frameID
    const userBookmarkRef = firebase.database().ref('/users/' + currentUser + '/bookmarks')
    const frameBookmarkRef = firebase.database().ref('/frames/' + frameID + '/bookmarks/')
    let bookmarkObj = {}
    //set bookmarks in frame data
    await frameBookmarkRef.once('value').then(function(snapshot) {
      bookmarkObj = {...snapshot.val()}
      if(bookmarkObj[currentUser]){
        bookmarkObj[currentUser]=!bookmarkObj[currentUser]
        frameBookmarkRef.set(bookmarkObj)
      }else{
        bookmarkObj[currentUser]=true
        frameBookmarkRef.set(bookmarkObj)
      }
    })
    //set bookmarks in user data
    await userBookmarkRef.once('value').then(function(snapshot) {
      bookmarkObj = {...snapshot.val()}
      if(bookmarkObj[frameID]){
        bookmarkObj[frameID]=!bookmarkObj[frameID]
        userBookmarkRef.set(bookmarkObj)
      }else{
        bookmarkObj[frameID]=true
        userBookmarkRef.set(bookmarkObj)
      }
    })
    this.setState({bookmarked:bookmarkObj[frameID]})
    //
  }

  render() {
    return (
      <div className='frameDiv' key={this.props.frameID}>
        <Link to={`/frame/${this.props.frameID}`}>
          <h3>{this.props.name}</h3>
          <img
            src={this.props.imageURL}
            key={this.props.imageName}
            alt={this.props.imageName}
          />
          <p>{this.props.message}</p>
        </Link>
        <FrameIcons
          handleBookmark={this.handleBookmark}
          bookmarked={this.state.bookmarked}
          handleLike={this.handleLike}
          like={this.state.liked}
          id={this.props.frameID}
          numberOfLikes={this.state.numberOfLikes}
        />
        <button onClick={() => this.removeItem(this.props.frameID,this.props.imageName)}>X</button>
      </div>
    )
  }
}

export default withRouter(Frame)
