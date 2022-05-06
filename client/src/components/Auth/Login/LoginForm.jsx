import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { login } from '../../../store/actions/auth';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  FormControl,
  VStack,
  Input,
  Button,
  Flex,
  Text,
  FormErrorMessage,
  FormHelperText
} from '@chakra-ui/react';

const LoginForm = ({ login, auth, props }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(login({ email, password }));
  };

  let loginFailed = auth.loginFailed === true;

  return (
    <form onSubmit={(e) => onSubmit(e)}>
      <FormControl isInvalid={loginFailed}>
        {!loginFailed ? (
          <FormHelperText></FormHelperText>
        ) : (
          <FormErrorMessage fontSize={14} mb={4}>
            Email and/or password is wrong.
          </FormErrorMessage>
        )}
        <VStack spacing={2} mb={10} display="inline-block" maxW="sm">
          <Input
            fontSize={16}
            type="email"
            placeholder="Email Address"
            name="email"
            value={props.email}
            height={16}
            onChange={(e) => onChange(e)}
          />
          <Input
            fontSize={16}
            width="100%"
            type="password"
            placeholder="Password"
            name="password"
            value={props.password}
            height={16}
            onChange={(e) => onChange(e)}
          />
          <Button h={16} fontSize={16} type="submit" value="Login" width="100%">
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
  );
};

LoginForm.propTypes = {
  login: PropTypes.func.isRequired
};
const mapStateToProps = (state, ownProps) => {
  return {
    props: ownProps,
    auth: state.auth
  };
};
export default connect(mapStateToProps, { login })(LoginForm);
