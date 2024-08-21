import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
const ProfileNotFound = () => {
  return (
    <Fragment>
    <main class="error-page">
  <div class="container">


    <div class="error-page__heading">
      <h1 class="error-page__heading-title">Please create profile</h1>
    </div>

    <Link to='/edit-profile' class="btn btn-primary my-1" aria-label="Back to home" title="back to home">Create Profile</Link>
  </div>
</main>

    </Fragment>
  )
}

export default ProfileNotFound
