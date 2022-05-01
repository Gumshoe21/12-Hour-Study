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
  minLengthRule,
  passwordMatchRule
} from '../../..//hooks/useValidation/use-validation';
import ErrorMessage, { hasErrors } from './../ErrorMessage';

const RegisterForm = ({ register }) => {
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
    },
    passwordConfirm: {
      name: 'passwordConfirm',
      validationRules: [
        passwordMatchRule('passwordConfirm', password, passwordConfirm)
      ],
      errorMessages: new Set()
    }
  };

  const errorsObject = configureValidations(validationConfig);
  const disableSubmit = isFormValid(errorsObject);

  const onChange = (e) => {
    let { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    register({ email, password, passwordConfirm });
  };

  // Show password functionality.
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  const {
    email: emailErrors,
    password: passwordErrors,
    passwordConfirm: passwordConfirmErrors
  } = errorsObject;

  const arrayEmailErrors = Array.from(emailErrors);
  return (
    <form onSubmit={(e) => onSubmit(e)}>
      <VStack
        spacing={2}
        mb={10}
        display="inline-block"
        maxW={{ base: 'sm', md: 'lg' }}
      >
        <FormControl isInvalid={hasErrors(emailErrors)}>
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
          <ErrorMessage errors={emailErrors} label="Email" />
        </FormControl>
        <FormControl isInvalid={hasErrors(passwordErrors)}>
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

          <ErrorMessage errors={Array.from(passwordErrors)} label="Password" />
        </FormControl>

        <FormControl isInvalid={hasErrors(passwordConfirmErrors)}>
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
          <ErrorMessage
            errors={passwordConfirmErrors}
            label="Password Confirmation"
          />
        </FormControl>
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
const mapStateToProps = (ownProps) => {
  return {
    props: ownProps
  };
};
export default connect(mapStateToProps, { register })(RegisterForm);
