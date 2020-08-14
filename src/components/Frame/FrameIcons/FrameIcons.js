import React from 'react'
import { FaRegComment, FaHeart, FaRegHeart, FaRegBookmark, FaBookmark } from "react-icons/fa";
import './FrameIcons.css'
import firebase from 'firebase'

function FrameIcons(props) {

  console.log(props)
  return (
    <div className='iconContainer'>
      {
        props.like ? (<FaHeart size="2em" color="red" onClick={props.handleLike}/>) : (<FaRegHeart size="2em" onClick={props.handleLike}/>)
      }
      <FaRegComment size="2em"/>3
      <FaRegBookmark size="2em"/>3
      <FaBookmark color="blue" size="2em"/>3
    </div>
  )
}

export default FrameIcons
