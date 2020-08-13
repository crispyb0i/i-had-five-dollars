import React from 'react'
import { FaRegComment, FaHeart, FaRegHeart, FaRegBookmark, FaBookmark } from "react-icons/fa";
import './FrameIcons.css'

function FrameIcons() {
  return (
    <div className='iconContainer'>
      <FaRegComment size="2em"/>3
      <FaHeart size="2em" color="red"/>3
      <FaRegHeart size="2em"/>3
      <FaRegBookmark size="2em"/>3
      <FaBookmark color="blue" size="2em"/>3
    </div>
  )
}

export default FrameIcons
