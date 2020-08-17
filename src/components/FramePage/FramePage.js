import React, { Component } from 'react'
import firebase from '../../firebase'
import Frame from '../Frame/Frame'
import './FramePage.css'

class FramePage extends Component {

  state = {
    frame:''
  }

  async componentDidMount() {
    if(this.props.match) {
      const id = this.props.match.params.id
      const itemRef = firebase.database().ref(`/frames/${id}`)
      await itemRef.on('value', (snapshot) => {
        if(snapshot.val()){
          console.log(snapshot.val())
          this.setState({
            frame:snapshot.val()
          })
        }
      })
    }
  }

  render() {
    let frame = "This frame doesn't exist"
    if(this.state.frame===''){
      frame = <p className="emptyPage">{this.state.frame}</p>
      console.log(frame)
    } else {
      frame = <Frame
        frameID={this.props.match.params.id}
        name={this.state.frame.name}
        imageURL={this.state.frame.imageURL}
        imageName={this.state.frame.imageName}
        message={this.state.frame.message}
        createdBy={this.state.frame.createdBy}/>
    }
    return (
      <div>
        {frame}
      </div>
    )
  }
}

export default FramePage
