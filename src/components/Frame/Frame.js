import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import firebase from '../../firebase.js'
import FrameIcons from './FrameIcons/FrameIcons'
import './Frame.css'

class Frame extends Component {

  state = {
    liked: false
  }

  currentUser = firebase.auth().currentUser.uid
  frameRef = firebase.database().ref('/frames/' + this.props.frameID + '/likes/')

  componentDidMount() {
    let currentUser = firebase.auth().currentUser.uid
    let likeObj = {}
    this.frameRef.once('value').then(function(snapshot) {

      likeObj = {...snapshot.val()}
      console.log(likeObj)

    })
    if(likeObj[currentUser]==undefined){
      this.setState({liked:!likeObj[this.currentUser]})
    }else{
      this.setState({liked:true})
    }
    console.log(likeObj)
  }



  removeItem = (frameId,imageName) => {
    const itemRef = firebase.database().ref(`/frames/${frameId}`)
    const imageRef = firebase.storage().ref(`/frames/${imageName}`)
    itemRef.remove()
    imageRef.delete().then(function() {
      alert("FILE DELETED SUCCESSFULLY")
    }).catch(function(error) {
      alert(error)
    })
  }

  handleLike = () => {
    let currentUser = firebase.auth().currentUser.uid
    let frameRef = firebase.database().ref('/frames/' + this.props.frameID + '/likes/')
    frameRef.once('value').then(function(snapshot) {
      let likeObj = {...snapshot.val()}
      console.log(currentUser)
      if(likeObj[currentUser]){
        console.log('THIS PERSON LIKED THIS PHOTO')
        likeObj[currentUser]=!likeObj[currentUser]
        frameRef.set(likeObj)
      }else{
        console.log('THIS PERSON DID NOT LIKE THIS PHOTO')
        likeObj[currentUser]=!likeObj[currentUser]
        frameRef.set(likeObj)
      }
    })
  }

  render() {
    return (
      <div className='frameDiv' key={this.props.frameID}>
        <Link to={`/frame/${this.props.frameID}`}>
          <h3>{this.props.name}</h3>
          <img src={this.props.imageURL} key={this.props.imageName} alt={this.props.imageName}/>
          <p>{this.props.message}</p>
        </Link>
        <FrameIcons handleLike={this.handleLike} like={this.state.liked}/>
        <button onClick={() => this.removeItem(this.props.frameID,this.props.imageName)}>X</button>
      </div>
    )
  }
}

export default Frame
