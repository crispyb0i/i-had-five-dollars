import React from 'react'
import './About.css'
import image from '../../assets/Profile.jpg'
import Frame from '../Frame/Frame'

function About() {
  return (
    <div className='about'>
      <h1 className='header'>ABOUT</h1>
      <Frame
        className='aboutFrame'
        frameID='aboutme'
        name='David Shin'
        imageURL={image}
        imageName='David Shin'
        message='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ullamcorper quam purus, eget commodo est blandit nec. Pellentesque tempus felis ut magna pharetra, non congue arcu tincidunt. Maecenas in massa eu metus tincidunt consectetur. '
        />
    </div>
  )
}

export default About
