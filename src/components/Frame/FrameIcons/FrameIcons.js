import React from 'react'
import { FaRegComment, FaHeart, FaRegHeart, FaRegBookmark, FaBookmark } from "react-icons/fa";
import './FrameIcons.css'
import firebase from 'firebase'

function FrameIcons(props) {

  let test = () => {
    const likesRef = firebase.database().ref('/users/')

    likesRef.on('value', (snapshot) => {
      snapshot.forEach(snapshot => console.log(snapshot.child("username").val()))
    })
  }

  let heart = props.like ?
  <div>
    <FaHeart size="2em" color="red" onClick={props.handleLike}/>{props.numberOfLikes}
  </div>
  :
  <div>
    <FaRegHeart size="2em" onClick={props.handleLike}/>{props.numberOfLikes}
  </div>

let bookmark = props.bookmarked ? <FaBookmark color="blue" size="2em" onClick={props.handleBookmark}/> : <FaRegBookmark size="2em" onClick={props.handleBookmark}/>

  return (
    <div className='iconContainer'>
      {heart}
      <FaRegComment size="2em" onClick={test} />
      {bookmark}
    </div>
  )
}

export default FrameIcons
