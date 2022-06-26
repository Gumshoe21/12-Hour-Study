import React from 'react';
import { Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import LoginForm from './LoginForm';
import { Flex } from '@chakra-ui/react';

const Login = ({ isAuthenticated }) => {
  if (isAuthenticated) return <Navigate to="/dashboard" />

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
        <LoginForm />
      </Flex>
    </Flex>
  );
};

Login.propTypes = {
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
  };
};
export default connect(mapStateToProps)(Login);
