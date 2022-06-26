import React from 'react';
import { Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Flex } from '@chakra-ui/react';
import RegisterForm from './RegisterForm';
import { register } from '../../../store/actions/auth';

const Register = ({ isAuthenticated }) => {
  if (isAuthenticated) return <Navigate to="/dashboard" />;
  return (
    <Flex
      align="center"
      justifyContent="center"
      flexDirection="column"
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
        <RegisterForm />
      </Flex>
    </Flex>
  );
};
Register.propTypes = {
  isAuthenticated: PropTypes.bool
};
const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated
  };
};
export default connect(mapStateToProps)(Register);
