import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { register } from '../../store/actions/auth';
import {
  Flex,
  VStack,
  Button,
  FormControl,
  Input,
  InputGroup,
  InputRightElement,
  Text
} from '@chakra-ui/react';

const Register = ({ register, isAuthenticated }) => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    passwordConfirm: ''
  });
  const { email, password, passwordConfirm } = formData;

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
            <VStack
              spacing={2}
              mb={10}
              display="inline-block"
              maxW={{ base: 'sm', md: 'lg' }}
            >
              <Input
                variant="filled"
                fontSize={16}
                height={16}
                type="email"
                placeholder="Email Address"
                name="email"
                value={email}
                onChange={(e) => onChange(e)}
              />
              <InputGroup size="md">
                <Input
                  variant="filled"
                  fontSize={16}
                  height={16}
                  width="100%"
                  type={show ? 'text' : 'password'}
                  placeholder="Password"
                  name="password"
                  value={password}
                  onChange={(e) => onChange(e)}
                />
                <InputRightElement
                  flex="column"
                  justify="center"
                  align="center"
                  h={8}
                  mt={4}
                  mr={4}
                  width="4rem"
                >
                  <Button h="inherit" size="lg" onClick={handleClick}>
                    {show ? 'Hide' : 'Show'}
                  </Button>
                </InputRightElement>
              </InputGroup>
              <Input
                variant="filled"
                fontSize={16}
                height={16}
                type="password"
                placeholder="Confirm Password"
                name="passwordConfirm"
                value={passwordConfirm}
                onChange={(e) => onChange(e)}
              />
              <Button
                h={16}
                fontSize={16}
                type="submit"
                value="Login"
                width="100%"
              >
                Sign Up
              </Button>
            </VStack>
          </FormControl>
          <Flex justify="center">
            <Link to="/login">
              <Text underline={2} fontSize={16}>
                Already registered? Log In Here
              </Text>
            </Link>
          </Flex>
        </form>
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
