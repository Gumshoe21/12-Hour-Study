import { Flex, FormErrorMessage, FormHelperText } from '@chakra-ui/react';

export const hasErrors = (errors) => {
  return errors.length !== 0;
};

const ErrorMessage = (props) => {
  const { errors, label } = props;
  return (
    <Flex direction="column">
      {hasErrors(errors) ? (
        <Flex direction="column" fontSize={12}>
          {Array.from(errors).map((err) => {
            return <FormErrorMessage fontSize={14}>{err}</FormErrorMessage>;
          })}
        </Flex>
      ) : (
        <FormHelperText fontSize={14}>{label}</FormHelperText>
      )}
    </Flex>
  );
};

export default ErrorMessage;
