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
  likeRef = firebase.database().ref('/frames/' + this.props.frameID + '/likes/')

  async componentDidMount() {
    let currentUser = firebase.auth().currentUser.uid
    let likeObj = {}
    await this.likeRef.once('value').then(function(snapshot) {
      likeObj = {...snapshot.val()}
    })
    if(likeObj[currentUser]){
      this.setState({liked:likeObj[currentUser]})
    }
  }



  removeItem = (frameId,imageName) => {
    const itemRef = firebase.database().ref(`/frames/${frameId}`)
    const imageRef = firebase.storage().ref(`/frames/${imageName}`)
    const userFrameRef = firebase.database().ref(`/users/${this.currentUser}/frames/${frameId}`)
    itemRef.remove()
    userFrameRef.remove()
    imageRef.delete().then(function() {
      alert("FILE DELETED SUCCESSFULLY")
    }).catch(function(error) {
      alert(error)
    })
  }

  handleLike = () => {
    let currentUser = firebase.auth().currentUser.uid
    let likeRef = firebase.database().ref('/frames/' + this.props.frameID + '/likes/')
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
    this.setState({liked:!this.state.liked})
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
