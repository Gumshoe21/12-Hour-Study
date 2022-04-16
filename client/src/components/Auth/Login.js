import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { login } from '../../store/actions/auth';
import { Box, Flex, VStack, Button, Text } from '@chakra-ui/react';
import { FormControl, Input } from '@chakra-ui/react';
import Dashboard from './../Dashboard/Dashboard';
import PrivateRoute from './../Routing/PrivateRoute';
const Login = ({ login, isAuthenticated, props }) => {
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
    //    return <Navigate replace to="/dashboard" />;

    //    return <Dashboard {...props.children} />;
    return <PrivateRoute component={Dashboard} />;
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
        <form onSubmit={(e) => onSubmit(e)}>
          <FormControl>
            <VStack spacing={2} mb={10} display="inline-block" maxW="sm">
              <Input
                fontSize={16}
                type="email"
                placeholder="Email Address"
                name="email"
                value={email}
                height={16}
                onChange={(e) => onChange(e)}
              />
              <Input
                fontSize={16}
                width="100%"
                type="password"
                placeholder="Password"
                name="password"
                value={password}
                height={16}
                onChange={(e) => onChange(e)}
              />
              <Button
                h={16}
                fontSize={16}
                type="submit"
                value="Login"
                width="100%"
              >
                Log In
              </Button>
            </VStack>
          </FormControl>
          <Flex justify="center">
            <Link to="/signup">
              <Text underline={2} fontSize={16}>
                Not Registered? Sign Up Here
              </Text>
            </Link>
          </Flex>
        </form>
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
