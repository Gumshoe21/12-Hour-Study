import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { forgotPassword } from '../../../store/actions/auth';
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

const ForgotPasswordForm = ({ forgotPassword, auth, props }) => {
  const [formData, setFormData] = useState({
    email: ''
  });
  const { email } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    forgotPassword({ email });
  };

  return (
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
          <Button h={16} fontSize={16} type="submit" value="Login" width="100%">
            Submit
          </Button>
        </VStack>
      </FormControl>
      <Flex justify="center">
        <Link to="/login">
          <Text underline={2} fontSize={16}>
            Back to Log In
          </Text>
        </Link>
      </Flex>

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

ForgotPasswordForm.propTypes = {
  forgotPassword: PropTypes.func.isRequired
};
const mapStateToProps = (state, ownProps) => {
  return {
    props: ownProps,
    auth: state.auth
  };
};
export default connect(mapStateToProps, { forgotPassword })(ForgotPasswordForm);
