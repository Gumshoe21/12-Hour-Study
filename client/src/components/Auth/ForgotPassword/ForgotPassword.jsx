import React from 'react';
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Flex } from '@chakra-ui/react';
import ForgotPasswordForm from './ForgotPasswordForm';

const ForgotPassword = ({ auth }) => {
  if (auth.isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }
  return (
    <Flex
      align="center"
      flexDirection="column"
      justifyContent="center"
      width="100wv"
      height="100vh"
    >
      <Flex
        borderWidth={1}
        borderColor="gray.400"
        borderRadius={8}
        p={20}
        justifyContent="center"
        alignItems="center"
      >
        <ForgotPasswordForm />
      </Flex>
    </Flex>
  );
};

ForgotPassword.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state, ownProps) => {
  return {
    auth: state.auth,
    props: ownProps
  };
};
export default connect(mapStateToProps)(ForgotPassword);
