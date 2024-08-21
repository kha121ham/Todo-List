import React, { Fragment, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { createProfile } from '../../actions/profile';
import { getCurrentProfile } from '../../actions/profile';
import { Link } from 'react-router-dom';
const EditProfile = ({ getCurrentProfile, createProfile,profile:{ profile, loading } }) => {
    const [formData,setFormData] = useState({
        jopTitle:'',
        bio:'',
        youtube:'',
        facebook:'',
        instagram:'',
        twitter:'',
        linkedin:''
    });
    useEffect(()=>{
        getCurrentProfile();
        profile &&
        setFormData({
          jopTitle:loading || !profile.jopTitle ? '' : profile.jopTitle,
          bio:loading || !profile.bio ? '' : profile.bio,
          twitter:loading || !profile.social ? '' : profile.social.twitter,
          facebook:loading || !profile.social ? '' : profile.social.facebook,
          linkedin:loading || !profile.social ? '' : profile.social.linkedin,
          youtube:loading || !profile.social ? '' : profile.social.youtube,
          instagram:loading || !profile.social ? '' : profile.social.instagram,
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[loading,getCurrentProfile]);
    const onChange = e => setFormData({ ...formData,[e.target.name]:e.target.value });
    const { jopTitle, bio, youtube, facebook, instagram, twitter, linkedin } = formData;
    const onSubmit = e => {
        e.preventDefault();
        createProfile(formData);
    }
  return (
    <Fragment>
     <section className="container">
      <h1 className="large text-primary">
        Create or Update Your Profile
      </h1>
      <p className="lead">
        <i className="fas fa-user"></i> Let's get some information to make your
        profile stand out
      </p>
      <form className="form" onSubmit={e=>onSubmit(e)}>
        <div className="form-group">
        </div>
        <div className="form-group">
          <input type="text" placeholder="Jop Title" name="jopTitle" value={jopTitle} onChange={e=>onChange(e)}/>
          <small className="form-text"
            >Your jop title</small
          >
        </div>
        <div className="form-group">
          <textarea placeholder="A short bio of yourself" name="bio" value={bio} onChange={e=>onChange(e)}></textarea>
          <small className="form-text">Tell us a little about yourself</small>
        </div>

        <div className="my-2">
          <button type="button" className="btn btn-light">
            Add Social Network Links
          </button>
          <span>Optional</span>
        </div>

        <div className="form-group social-input">
          <i className="fab fa-twitter fa-2x"></i>
          <input type="text" placeholder="Twitter URL" name="twitter" value={twitter} onChange={e=>onChange(e)}/>
        </div>

        <div className="form-group social-input">
          <i className="fab fa-facebook fa-2x"></i>
          <input type="text" placeholder="Facebook URL" name="facebook" value={facebook} onChange={e=>onChange(e)} />
        </div>

        <div className="form-group social-input">
          <i className="fab fa-youtube fa-2x"></i>
          <input type="text" placeholder="YouTube URL" name="youtube" value={youtube} onChange={e=>onChange(e)} />
        </div>

        <div className="form-group social-input">
          <i className="fab fa-linkedin fa-2x"></i>
          <input type="text" placeholder="Linkedin URL" name="linkedin" value={linkedin} onChange={e=>onChange(e)} />
        </div>

        <div className="form-group social-input">
          <i className="fab fa-instagram fa-2x"></i>
          <input type="text" placeholder="Instagram URL" name="instagram" value={instagram} onChange={e=>onChange(e)}/>
        </div>
        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/profile">Go Back</Link>
      </form>
    </section>
    </Fragment>
  )
}

EditProfile.propTypes = {
    getCurrentProfile:PropTypes.func.isRequired,
    createProfile:PropTypes.func.isRequired,
    profile:PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    profile:state.profile
})

export default connect(mapStateToProps, { getCurrentProfile, createProfile }) (EditProfile)
