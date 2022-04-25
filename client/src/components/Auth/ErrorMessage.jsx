import { FormErrorMessage, FormHelperText } from '@chakra-ui/react';

export const hasErrors = (errors) => {
  return errors.size > 0;
};

const ErrorMessage = (props) => {
  return hasErrors(props.errors) ? (
    <FormErrorMessage>{props.errors}</FormErrorMessage>
  ) : (
    <FormHelperText>{props.label}</FormHelperText>
  );
};

export default ErrorMessage;
