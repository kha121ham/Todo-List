import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from './component/layout/Navbar';
import Landing from './component/layout/Landing';
import Register from './component/auth/Register';
import Login from './component/auth/Login';
import Alert from './component/layout/Alert';
import setAuthToken from './utils/setAuthToken';
import { loadUser } from './actions/auth';
import Task from './component/tasks/Task';
import PrivateRoute from './routing/PrivateRoute';
import Profile from './component/profile/Profile';
import EditProfile from './component/profile/EditProfile';
import PageNotFound from './component/layout/PageNotFound';
//redux
import { Provider } from 'react-redux';
import store from './store';

import './App.css';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

//app
const App = () => {
  useEffect(() => {
      store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
    <Router>
    <Fragment>
    <Navbar />
    <Routes>
    <Route exact path='/' Component={Landing} />
    </Routes>
    <section className="container">
    <Alert />
    <Routes>
    <Route exact path='/register' Component={Register} />
    <Route exact path='/login' Component={Login} />
    <Route exact path='/tasks' element={<PrivateRoute><Task/></PrivateRoute>} />
    <Route exact path='/profile' element={<PrivateRoute><Profile/></PrivateRoute>} />
    <Route exact path='/edit-profile' element={<PrivateRoute><EditProfile/></PrivateRoute>} />
    <Route path='*' Component={PageNotFound} />
    </Routes>
    </section>
    </Fragment>
    </Router>
    </Provider>
  );
}

export default App;
