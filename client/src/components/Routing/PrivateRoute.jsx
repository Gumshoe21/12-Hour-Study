import React from 'react';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import LoadingScreen from './../UI/LoadingScreen/LoadingScreen';

const PrivateRoute = ({
  component: Component,
  auth: { isAuthenticated, loading }
}) => {
  if (!isAuthenticated) return <Navigate to="/" />;
  if (loading) return <LoadingScreen />;
  if (isAuthenticated) return <Component />;

  return <Navigate to="/" />;
};

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps)(PrivateRoute);