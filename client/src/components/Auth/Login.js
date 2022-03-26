import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { login } from '../../store/actions/auth';
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

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    login({ email, password });
  };

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
        borderRadius={8}
        p={10}
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
              <Button type="submit" value="Login" width="100%">
                Log In
              </Button>
            </VStack>
          </FormControl>
        </form>
      </Flex>
      <Flex mt={5}>
        <Box>
          <Link to="/signup">Sign up here</Link>
        </Box>
      </Flex>
    </Flex>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};
const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated
  };
};
export default connect(mapStateToProps, { login })(Login);
