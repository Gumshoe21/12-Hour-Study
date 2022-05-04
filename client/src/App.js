import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/UI/Navbar/Navbar';
import Register from './components/Auth/Register/Register';
import Login from './components/Auth/Login/Login';
import Dashboard from './components/Dashboard/Dashboard';
import Profile from './components/Profile/Profile';
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
        {window.location.pathname !== '/' && <Navbar />}
        <Routes>
          <Route index element={<Landing />} />
          <Route exact path="/signup" element={<Register />} />
          <Route exact path="/login" element={<Login />} />
          <Route
            exact
            path="/profile"
            element={<PrivateRoute component={Profile} />}
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
