import React, { Component } from 'react'
import './App.css';
import firebase from './firebase.js'
import Navbar from './components/Navbar'
import CreateFrame from './components/CreateFrame'
import About from './components/About'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

class App extends Component {
  constructor() {
    super();
    this.state = {
      number:5,
    }
  }

  render() {
    return (
      <Router>
        <div className='app'>
          <h1 className='logo'>I HAD FIVE DOLLARS</h1>
          <Navbar/>
        </div>
      </Router>
    );
  }
}

export default App;
