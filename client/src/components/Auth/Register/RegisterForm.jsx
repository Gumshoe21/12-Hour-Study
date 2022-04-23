import { Link } from 'react-router-dom';
import React, { useState } from 'react';
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
import { register } from '../../../store/actions/auth';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import useValidation, {
  requiredRule,
  minLengthRule
} from '../../../hooks/use-validation';
const RegisterForm = ({ register }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    passwordConfirm: ''
  });
  const { email, password, passwordConfirm } = formData;

  const { errors, isFormValid } = useValidation();
  const errorsObject = isFormValid({
    email: {
      name: 'email',
      value: email || '',
      rules: [requiredRule('email', email), minLengthRule('email', email, 8)],
      errMsg: new Set()
    }
  });
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  console.log(errorsObject);
  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== passwordConfirm) {
      console.log("passwords don't match!");
    } else {
      register({ email, password, passwordConfirm });
    }
  };
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  return (
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
          <p>{errorsObject.email.length !== 0 && errorsObject.email}</p>
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
          <Button h={16} fontSize={16} type="submit" value="Login" width="100%">
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
  );
};

RegisterForm.propTypes = {
  register: PropTypes.func.isRequired
};
const mapStateToProps = (state, ownProps) => {
  return {
    props: ownProps
  };
};
export default connect(mapStateToProps, { register })(RegisterForm);
