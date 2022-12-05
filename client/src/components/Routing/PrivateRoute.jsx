import React from 'react';

import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';

import LoadingScreen from './../UI/LoadingScreen/LoadingScreen';

const PrivateRoute = ({
  component: Component,
  auth: { isAuthenticated, loading }
}) => {
  if (loading) return <LoadingScreen />;
  if (!isAuthenticated) return <Navigate to="/" />;
  if (isAuthenticated) return <Component />;

  return <Navigate to="/" />;
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps)(PrivateRoute);
