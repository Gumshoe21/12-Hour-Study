import React from 'react';
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Flex } from '@chakra-ui/react';
import LoginForm from './LoginForm';

import { login } from '../../../store/actions/auth';
const Login = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <Flex
      align="center"
      flexDirection="column"
      justifyContent="center"
      height="100vh"
      width="100wv"
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
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};
const mapStateToProps = (state, ownProps) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    props: ownProps
  };
};
export default connect(mapStateToProps, { login })(Login);
