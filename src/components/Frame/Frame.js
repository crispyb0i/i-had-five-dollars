import React, { Component } from 'react'
import firebase from '../../firebase'
import './Frame.css'

class Frame extends Component {
  constructor(){
    super()
    this.state={
      imageName:'',
      imageURL:'',
      message:'',
      name:''
    }
  }

  componentDidMount() {
    if(this.props.match) {
      const id = this.props.match.params.id
      const itemRef = firebase.database().ref(`/frames/${id}`)
      console.log(itemRef)
      itemRef.on('value', (snapshot) => {
        if(snapshot.val()){
          this.setState({
            imageName: snapshot.val().imageName,
            imageURL: snapshot.val().imageURL,
            message: snapshot.val().message,
            name: snapshot.val().name
          })
        }
        console.log(snapshot.val())
      })
    }
  }

  render(){
    if(this.state.name===''){
      return <p className="emptyPage">This frame doesn't exist</p>
    }
    return (
      <div className='frameContainer'>
        <h1 className='header'>{this.state.name}</h1>
        <img alt={this.state.imageName} src={this.state.imageURL}/>
        <p>{this.state.message}</p>
      </div>
    )
  }
}

export default Frame
