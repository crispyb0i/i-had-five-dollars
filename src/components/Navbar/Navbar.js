import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Home  from '../Home/Home'
import Profile  from '../Profile/Profile'
import About  from '../About/About'
import CreateFrame from '../CreateFrame/CreateFrame'
import PrivateRoute from '../PrivateRoute/PrivateRoute'
import Login from '../Login/Login'
import SignUp from '../SignUp/SignUp'
import Frame from '../Frame/Frame'
import './Navbar.css'

  function Navbar() {

    return (
      <Router>
        <div>
          <nav className="navbar">
            <ul className="navbar-nav mr-auto">
              <li><Link to={'/'} className="nav-item"> Home </Link></li>
              <li><Link to={'/profile'} className="nav-item">Profile</Link></li>
              <li><Link to={'/about'} className="nav-item">About</Link></li>
              <li><Link to={'/shop'} className="nav-item">Shop</Link></li>
            </ul>
          </nav>
          <Switch>
            <Route exact path='/' component={Home} />
            <PrivateRoute path='/profile' component={Profile} />
            <Route path='/about' component={About} />
            <Route exact path='/shop' component={CreateFrame} />
            <Route path = '/login' component={Login} />
            <Route path = '/signup' component={SignUp} />
            <Route path = '/frame/:id' component={Frame} />
          </Switch>
        </div>
      </Router>
    )
}

export default Navbar
