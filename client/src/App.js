import React, { Fragment, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from 'react-router-dom';
import styles from './App.module.scss';
import Navbar from './components/UI/Navbar';
import Timer from './components/Timer/Timer';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import Dashboard from './components/Dashboard/Dashboard';
import Profile from './components/Profile/Profile';
import { Container, Box, Flex, VStack } from '@chakra-ui/react';
import setAuthToken from './utils/setAuthToken';
import { loadUser } from './store/actions/auth';
import authSlice from './store/slices/auth';
import { useDispatch } from 'react-redux';
import { connect } from 'react-redux';
import store from './store/index';
import PropTypes from 'prop-types';
import PrivateRoute from './components/Routing/PrivateRoute';
if (localStorage.token) {
  setAuthToken(localStorage.token);
}
const App = ({ auth }) => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []); // only run once with [] - this effectively makes it a componentDidMount() function
  return (
    <Fragment>
      <Router>
        {auth.isAuthenticated && <Navbar />}
        <Routes>
          <Route index element={<Dashboard />} />
          <Route exact path="/signup" element={<Register />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/profile" element={<Profile />} />
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
