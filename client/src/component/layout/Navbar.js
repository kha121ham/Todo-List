import React, { Fragment } from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';
const PropTypes = require('prop-types');
const Navbar = ({ isAuthenticated, logout }) => {
  return (
    <Fragment>
       <nav className="navbar bg-dark">
        <h1>
          <Link to="/"><i class="fas fa-code"></i> Todo List</Link>
        </h1>
        
        {!isAuthenticated ? ( <ul>
          <li><Link to="/register">Register</Link></li>
          <li><Link to="/login">Login</Link></li>
        </ul>) : (<ul>
          <li><Link to="/tasks">Tasks</Link></li>
          <li><Link to='/profile'>Profile</Link></li>
          <li>
            <Link to='/' onClick={logout} >
              <i className="fas fa-sign-out-alt"></i>{' '} 
              <span className="hide-sm">Logout</span>
            </Link>
          </li>
        </ul>) }
      </nav>
    </Fragment>
  )
}
Navbar.propTypes = {
  isAuthenticated:PropTypes.bool,
  logout:PropTypes.func.isRequired,
}

const mapStateToProps = state =>({
  isAuthenticated:state.auth.isAuthenticated,
})
export default connect(mapStateToProps, { logout }) (Navbar)
