import React, { Component } from 'react'
import './App.css';
import firebase from './firebase.js'
import Navbar from './components/Navbar'
import CreateFrame from './components/CreateFrame'
import About from './components/About'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Home from './components/Home'
import Frame from './components/Frame'

class App extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <Router>
        <div className='app'>
          <Navbar/>
        </div>
      </Router>
    );
  }
}

export default App;
