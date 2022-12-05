import React, { Fragment, useEffect } from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import ForgotPassword from './components/Auth/ForgotPassword/ForgotPassword';
import Login from './components/Auth/Login/Login';
import Register from './components/Auth/Register/Register';
import ResetPassword from './components/Auth/ResetPassword/ResetPassword';
import Dashboard from './components/Dashboard/Dashboard';
import Landing from './components/Landing/Landing';
import Profile from './components/Profile/Profile';
import Report from './components/Reports/Reports';
import PrivateRoute from './components/Routing/PrivateRoute';
import PublicRoute from './components/Routing/PublicRoute';
import Navbar from './components/UI/Navbar/Navbar';
import { getUser } from './store/actions/auth';
import store from './store/index';

const App = ({ auth }) => {
  useEffect(() => {
    store.dispatch(getUser());
  }, []); // only run once with [] - this effectively makes it a componentDidMount() function
  return (
    <Fragment>
      <Router>
        <Navbar />
        <Routes>
          <Route index element={<PublicRoute component={Landing} />} />
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
