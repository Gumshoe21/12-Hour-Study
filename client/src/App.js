import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/UI/Navbar/Navbar';
import Register from './components/Auth/Register/Register';
import Login from './components/Auth/Login/Login';
import ForgotPassword from './components/Auth/ForgotPassword/ForgotPassword';
import ResetPassword from './components/Auth/ResetPassword/ResetPassword';
import Dashboard from './components/Dashboard/Dashboard';
import Profile from './components/Profile/Profile';

import Report from './components/Reports/Reports';
import Landing from './components/Landing/Landing';
import { getUser } from './store/actions/auth';
import { connect } from 'react-redux';
import store from './store/index';
import PropTypes from 'prop-types';
import PrivateRoute from './components/Routing/PrivateRoute';

const App = ({ auth }) => {
  useEffect(() => {
    store.dispatch(getUser());
  }, []); // only run once with [] - this effectively makes it a componentDidMount() function
  return (
    <Fragment>
      <Router>
        <Navbar />
        <Routes>
          <Route index element={<Landing />} />
          <Route exact path="/signup" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route exact path="/forgotPassword" element={<ForgotPassword />} />
          <Route
            exact
            path="/resetPassword/:token"
            element={<ResetPassword />}
          />

          <Route
            exact
            path="/profile"
            element={<PrivateRoute component={Profile} />}
          />
          <Route
            exact
            path="/reports"
            element={<PrivateRoute component={Report} />}
          />
          <Route
            path="/dashboard"
            element={<PrivateRoute component={Dashboard} />}
          />
        </Routes>
      </Router>
    </Fragment>
  );
};

App.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps)(App);
