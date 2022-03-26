import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { register } from '../../store/actions/auth';
import {
  Spacer,
  Container,
  Box,
  Flex,
  Stack,
  VStack,
  HStack,
  Heading,
  Button,
  ButtonGroup,
  Center
} from '@chakra-ui/react';
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input
} from '@chakra-ui/react';

const Register = ({ register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    passwordConfirm: ''
  });
  const { name, email, password, passwordConfirm } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== passwordConfirm) {
      console.log("passwords don't match!");
    } else {
      register({ email, password, passwordConfirm });
    }
  };

  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <Flex
      align="center"
      justifyContent="center"
      flexDirection="column"
      height="100vh"
      width="100wv"
    >
      <Flex
        borderWidth={1}
        borderRadius={8}
        p="1.2rem"
        justifyContent="center"
        alignItems="center"
      >
        <form onSubmit={(e) => onSubmit(e)}>
          <FormControl>
            <VStack spacing={2} display="inline-block" maxW="sm">
              <Input
                type="email"
                placeholder="Email Address"
                _placeholder={{ color: 'red.500' }}
                name="email"
                value={email}
                onChange={(e) => onChange(e)}
              />
              <Input
                width="100%"
                type="password"
                placeholder="Password"
                name="password"
                value={password}
                onChange={(e) => onChange(e)}
              />
              <Input
                type="password"
                placeholder="Confirm Password"
                name="passwordConfirm"
                value={passwordConfirm}
                onChange={(e) => onChange(e)}
              />
              <Button
                type="submit"
                className="btn btn-primary"
                value="Register"
                width="100%"
              >
                Sign Up
              </Button>
            </VStack>
          </FormControl>
        </form>
      </Flex>
      <Flex mt={5}>
        <Box>
          <Link to="/login">Already registered?</Link>
        </Box>
      </Flex>
    </Flex>
  );
};
Register.propTypes = {
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};
const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated
  };
};
export default connect(mapStateToProps, { register })(Register);
