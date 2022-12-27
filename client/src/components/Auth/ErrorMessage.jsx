import { Flex, FormErrorMessage, FormHelperText } from '@chakra-ui/react'

export const hasErrors = (errors) => {
  return errors.length !== 0
}

const ErrorMessage = (props) => {
  const { errors, label } = props
  return (
    <Flex direction='column'>
      {hasErrors(errors) ? (
        <Flex direction='column' fontSize='1.2rem'>
          {Array.from(errors).map((err) => {
            return <FormErrorMessage fontSize='1.4rem'>{err}</FormErrorMessage>
          })}
        </Flex>
      ) : (
        <FormHelperText fontSize='1.4.rem'>{label}</FormHelperText>
      )}
    </Flex>
  )
}

export default ErrorMessage
