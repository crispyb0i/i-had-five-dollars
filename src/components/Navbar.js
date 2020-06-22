import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import  Home  from './Home'
import  Profile  from './Profile'
import  About  from './About'

class Navbar extends Component {
  render(){
    return (
      <Router>
          <div>
            <nav className="navbar">
              <ul className="navbar-nav mr-auto">
                <li><Link to={'/'} className="nav-item"> Home </Link></li>
                <li><Link to={'/profile'} className="nav-item">Profile</Link></li>
                <li><Link to={'/about'} className="nav-item">About</Link></li>
              </ul>
            </nav>
            <Switch>
                <Route exact path='/' component={Home} />
                <Route path='/profile' component={Profile} />
                <Route path='/about' component={About} />
            </Switch>
          </div>
        </Router>
    )
  }
}

export default Navbar
