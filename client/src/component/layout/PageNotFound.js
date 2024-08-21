import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
const PageNotFound = () => {
  return (
    <Fragment>
    <main class="error-page">
  <div class="container">


    <div class="error-page__heading">
      <h1 class="error-page__heading-title">Looks like you're lost</h1>
      <p class="error-page__heading-desciption">404 error</p>
    </div>

    <Link to='/tasks' class="btn btn-primary my-1" aria-label="Back to home" title="back to home">back to home</Link>
  </div>
</main>

    </Fragment>
  )
}

export default PageNotFound
