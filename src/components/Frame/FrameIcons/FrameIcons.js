import React from 'react'
import { FaRegComment, FaHeart, FaRegHeart, FaRegBookmark, FaBookmark } from "react-icons/fa";
import './FrameIcons.css'
import firebase from 'firebase'

function FrameIcons(props) {

  let test = () => {
    const likesRef = firebase.database().ref('/frames/' + props.id + '/likes')
    likesRef.on('value', (snapshot) => {
      console.log(snapshot.val())
    })
  }


  let heart = props.like ? <FaHeart size="2em" color="red" onClick={props.handleLike}/> : <FaRegHeart size="2em" onClick={props.handleLike}/>
  return (
    <div className='iconContainer'>
      {heart}{props.numberOfLikes}
      <FaRegComment size="2em" onClick={test} />3
      <FaRegBookmark size="2em"/>3
      <FaBookmark color="blue" size="2em"/>3
    </div>
  )
}

export default FrameIcons
