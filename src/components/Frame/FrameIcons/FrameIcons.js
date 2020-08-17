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
  console.log(props)

  let heart = props.like ? <FaHeart size="2em" color="red" onClick={props.handleLike}/> : <FaRegHeart size="2em" onClick={props.handleLike}/>

let bookmark = props.bookmarked ? <FaBookmark color="blue" size="2em" onClick={props.handleBookmark}/> : <FaRegBookmark size="2em" onClick={props.handleBookmark}/>

  return (
    <div className='iconContainer'>
      {heart}{props.numberOfLikes}
      <FaRegComment size="2em" onClick={test} />3
      {bookmark}
    </div>
  )
}

export default FrameIcons
