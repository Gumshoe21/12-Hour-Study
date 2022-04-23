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
  Text,
  FormErrorMessage,
  FormHelperText
} from '@chakra-ui/react';
import { register } from '../../../store/actions/auth';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import useValidation, {
  requiredRule,
  minLengthRule
} from '../../../hooks/use-validation';

const RegisterForm = ({ register }) => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    passwordConfirm: ''
  });
  const { email, password, passwordConfirm } = formData;

  const { configureValidations, isFormValid } = useValidation();
  const validationConfig = {
    email: {
      name: 'email',
      validationRules: [
        requiredRule('email', email),
        minLengthRule('email', email, 8)
      ],
      errorMessages: new Set()
    },
    password: {
      name: 'password',
      validationRules: [
        requiredRule('password', password),
        minLengthRule('password', password, 8)
      ],
      errorMessages: new Set()
    }
  };
  const errorsObject = configureValidations(validationConfig);
  const disableSubmit = isFormValid(errorsObject);

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== passwordConfirm) {
      console.log("passwords don't match!");
    } else {
      register({ email, password, passwordConfirm });
    }
  };

  return (
    <form onSubmit={(e) => onSubmit(e)}>
      <VStack
        spacing={2}
        mb={10}
        display="inline-block"
        maxW={{ base: 'sm', md: 'lg' }}
      >
        <FormControl isInvalid={errorsObject.email.size > 0}>
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
          {errorsObject.email.size > 0 && (
            <FormErrorMessage>{errorsObject?.email}</FormErrorMessage>
          )}
        </FormControl>

        <FormControl isInvalid={errorsObject.password.size > 0}>
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
          {errorsObject.password.size > 0 ? (
            <FormErrorMessage>{errorsObject.password}</FormErrorMessage>
          ) : (
            <FormHelperText>
              Enter the email you'd like to receive the newsletter on.
            </FormHelperText>
          )}
        </FormControl>
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
          disabled={disableSubmit}
          h={16}
          fontSize={16}
          type="submit"
          value="Login"
          width="100%"
        >
          Sign Up
        </Button>
      </VStack>
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
