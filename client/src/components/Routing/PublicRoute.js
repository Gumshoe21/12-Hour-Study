import React from 'react';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import LoadingScreen from './../UI/LoadingScreen/LoadingScreen';

const PublicRoute = ({
  component: Component,
  auth: { isAuthenticated, loading }
}) => {
  if (!isAuthenticated) return <Navigate replace to="/login" />;
  if (loading) return <LoadingScreen />;
  if (isAuthenticated) return <Component />;

  return <Navigate to="/dashboard" />;
};

PublicRoute.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps)(PublicRoute);