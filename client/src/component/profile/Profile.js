/* eslint-disable jsx-a11y/heading-has-content */
import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profile';
import { deleteAcount } from '../../actions/profile';
import Spinner from '../layout/Spinner';
import ProfileNotFound from '../layout/ProfileNotFound';
import TaskForm from '../tasks/TaskForm';
const Profile = ({ getCurrentProfile,profile :{ profile,loading },auth, deleteAcount, tasks }) => {
  useEffect(()=>{
    getCurrentProfile();
  },[getCurrentProfile])
  return  (
    <Fragment>
    {loading  ? <Spinner /> : profile ? <Fragment>
          <Link to='/edit-profile' className='btn btn-dark'>Edit Profile</Link>
   <div class="profile-top bg-primary p-2">
     <img
       class="round-img my-1"
       src={auth.user.avatar}
       alt="avatar img"
     />
     <h1 class="large"></h1>
     <p class="lead">{profile.jopTitle}</p>
     <div className="icons">
      <a href={profile.social.facebook} target='_blank' class="fa fa-facebook"></a>
      <a href={profile.social.twitter} target='_blank' class="fa fa-twitter"></a>
      <a href={profile.social.linkedin} target='_blank' class="fa fa-linkedin"></a>
      <a href={profile.social.youtube} target='_blank' class="fa fa-youtube"></a>
      <a href={profile.social.instagram} target='_blank' class="fa fa-instagram"></a>
   </div>
   </div>

   <div class="profile-about bg-light p-2">
     <h2 class="text-primary">{auth.user.name.split(' ')[0]}'s Bio</h2>
     <p>
     {profile.bio}
     </p>
     </div>
     <div class="my-2">
            <button class="btn btn-danger" onClick={()=>deleteAcount()}>
                <i class="fas fa-user-minus"></i>

                Delete My Account
            </button>
          </div>
        </Fragment> : <ProfileNotFound /> }
     
</Fragment>
  )
}
Profile.propTypes = {
  getCurrentProfile:PropTypes.func.isRequired,
  auth:PropTypes.object.isRequired,
  profile:PropTypes.object.isRequired,
  deleteAcount:PropTypes.func.isRequired,
  logout:PropTypes.func.isRequired,
  tasks:PropTypes.array.isRequired
}

const mapStateToProps = state =>({
    profile:state.profile,
    auth:state.auth,
    tasks:state.task.tasks
})
export default connect(mapStateToProps, { getCurrentProfile, deleteAcount }) (Profile);
