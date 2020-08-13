import React from 'react'
import { Link } from 'react-router-dom'
import firebase from '../../firebase.js'
import FrameIcons from './FrameIcons/FrameIcons'
import './Frame.css'

function Frame(props) {

  function removeItem(frameId,imageName) {
    const itemRef = firebase.database().ref(`/frames/${frameId}`)
    const imageRef = firebase.storage().ref(`/frames/${imageName}`)
    itemRef.remove()
    imageRef.delete().then(function() {
      alert("FILE DELETED SUCCESSFULLY")
    }).catch(function(error) {
      alert(error)
    })
  }

  return (
    <div className='frameDiv' key={props.frameID}>
      <Link to={`/frame/${props.frameID}`}>
        <h3>{props.name}</h3>
        <img src={props.imageURL} key={props.imageName} alt={props.imageName}/>
        <p>{props.message}</p>
      </Link>
      <FrameIcons />
      <button onClick={() => removeItem(props.frameID,props.imageName)}>Remove Item</button>
    </div>
  )
}

export default Frame
