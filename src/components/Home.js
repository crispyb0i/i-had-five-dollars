import React, { Component } from 'react'
import CreateFrame from './CreateFrame'

class Home extends Component {
  constructor(){
    super()
    this.state = {
      frames:[]
    }
  }

  componentDidMount() {
    //grab all frames from firebase
  }


  render() {
    return (
      <div className='container'>
        <h1 className='header'>HOME PAGE</h1>
      </div>
    )
  }
}

export default Home
