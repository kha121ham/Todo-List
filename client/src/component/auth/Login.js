import React, { Fragment, useState } from 'react'
import { Link, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../../actions/auth';
import { setAlert } from '../../actions/alert';
const PropTypes = require('prop-types');
const Login = ({ login, isAuthenticated, setAlert }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
 
  const { email, password } = formData;
 
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
 
  const onSubmit = async (e) => {
    e.preventDefault();
    login(email, password);
  };
 
  if (isAuthenticated) {
    return <Navigate  replace to ='/tasks' />;
  }
 
  return (
    <Fragment>
         <h1 className="large text-primary">Sign In</h1>
      <p className="lead"><i class="fas fa-user"></i> Sign Into Your Account</p>
      <form className="form" onSubmit={e=>onSubmit(e)}>
        <div className="form-group">
          <input type="email" placeholder="Email Address" name="email" value={email} onChange={e=>onChange(e)} required />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            minLength="6"
            value={password} onChange={e=>onChange(e)}
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Login" />
      </form>
      <p className='my-1'>
        Don't have an account? <Link to='/register'>Sign Up</Link>
      </p>
      </Fragment>
  );
};
 
Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  setAlert:PropTypes.func.isRequired
};
 
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});
 
export default connect(mapStateToProps, { login, setAlert })(Login);
