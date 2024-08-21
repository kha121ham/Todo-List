import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';
const PropTypes = require('prop-types');
const Landing = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return <Navigate  replace to ='/tasks' />;
  }

  return (
    <div>
      <section className="landing">
        <div className="dark-overlay">
          <div className="landing-inner">
            <h1 className="x-large">ToDo List App</h1>
            <p className="lead">
              Create a Tasks and finshed it
            </p>
            <div className="buttons">
              <Link to="/register" className="btn btn-primary">Sign Up</Link>
              <Link to="/login" className="btn btn-light">Login</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
Landing.propTypes = {
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps) (Landing)
