import React, { Component } from 'react'
import './App.css';
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './components/Auth/Auth'
import Navbar from './components/Navbar/Navbar'

class App extends Component {

  render() {
    return (
      <AuthProvider>
        <BrowserRouter>
          <Navbar />
        </BrowserRouter>
      </AuthProvider>
    )
  }
}

export default App;
