import React, { useState } from 'react'

import { Flex, VStack, Button, FormControl, Input, InputGroup, InputRightElement, Text } from '@chakra-ui/react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import useValidation, { requiredRule, minLengthRule, passwordMatchRule } from '../../..//hooks/useValidation/use-validation'
import { register } from '../../../store/actions/auth'
import ErrorMessage, { hasErrors } from './../ErrorMessage'
import TimezoneSelect from './TimezoneSelect'

const RegisterForm = ({ register }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    passwordConfirm: '',
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  })

  const { username, email, password, passwordConfirm, timezone } = formData

  const { configureValidations, isFormValid } = useValidation()

  const validationConfig = {
    username: {
      name: 'username',
      validationRules: [requiredRule('username', username), minLengthRule('username', username, 3)],
      errorMessages: new Set(),
    },
    email: {
      name: 'email',
      validationRules: [requiredRule('email', email), minLengthRule('email', email, 8)],
      errorMessages: new Set(),
    },
    password: {
      name: 'password',
      validationRules: [requiredRule('password', password), minLengthRule('password', password, 8)],
      errorMessages: new Set(),
    },
    passwordConfirm: {
      name: 'passwordConfirm',
      validationRules: [passwordMatchRule('passwordConfirm', password, passwordConfirm)],
      errorMessages: new Set(),
    },
  }

  const errorsObject = configureValidations(validationConfig)
  const disableSubmit = isFormValid(errorsObject)

  const onChange = (e) => {
    let { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    register({ username, email, password, passwordConfirm, timezone })
  }

  const handleSelectChange = (e) => {
    let { value } = e.target
    setFormData({ ...formData, timezone: value })
    console.log(e.target.value)
  }

  // Show password functionality.
  const [show, setShow] = useState(false)
  const handleClick = () => setShow(!show)

  const { username: usernameErrors, email: emailErrors, password: passwordErrors, passwordConfirm: passwordConfirmErrors } = errorsObject

  return (
    <form onSubmit={(e) => onSubmit(e)}>
      <VStack spacing={2} mb={10} display='inline-block' maxW={{ base: 'sm', md: 'lg' }}>
        <TimezoneSelect handleSelectChange={handleSelectChange} />
        <FormControl isInvalid={hasErrors(usernameErrors)}>
          <Input
            variant='filled'
            fontSize={16}
            height={16}
            type='username'
            placeholder='Username'
            name='username'
            value={username}
            onChange={(e) => onChange(e)}
          />
          <ErrorMessage errors={usernameErrors} label='Username' />
        </FormControl>

        <FormControl isInvalid={hasErrors(emailErrors)}>
          <Input variant='filled' fontSize={16} height={16} type='email' placeholder='Email Address' name='email' value={email} onChange={(e) => onChange(e)} />
          <ErrorMessage errors={emailErrors} label='Email' />
        </FormControl>
        <FormControl isInvalid={hasErrors(passwordErrors)}>
          <InputGroup size='md'>
            <Input
              variant='filled'
              fontSize={16}
              height={16}
              width='100%'
              type={show ? 'text' : 'password'}
              placeholder='Password'
              name='password'
              value={password}
              onChange={(e) => onChange(e)}
            />
            <InputRightElement flex='column' justify='center' align='center' h={8} mt={4} mr={4} width='4rem'>
              <Button h='inherit' size='lg' onClick={handleClick}>
                {show ? 'Hide' : 'Show'}
              </Button>
            </InputRightElement>
          </InputGroup>

          <ErrorMessage errors={Array.from(passwordErrors)} label='Password' />
        </FormControl>

        <FormControl isInvalid={hasErrors(passwordConfirmErrors)}>
          <Input
            variant='filled'
            fontSize={16}
            height={16}
            type='password'
            placeholder='Confirm Password'
            name='passwordConfirm'
            value={passwordConfirm}
            onChange={(e) => onChange(e)}
          />
          <ErrorMessage errors={passwordConfirmErrors} label='Password Confirmation' />
        </FormControl>
        <Button disabled={disableSubmit} h={16} fontSize={16} type='submit' value='Login' width='100%'>
          Sign Up
        </Button>
      </VStack>
      <Flex direction='column' justify='center' align='center' gap={4} textDecoration='underline'>
        <Link to='/login'>
          <Text fontSize={16}>Already Registered? Log In Here</Text>
        </Link>
      </Flex>
    </form>
  )
}

const mapStateToProps = (ownProps) => {
  return {
    props: ownProps,
  }
}

export default connect(mapStateToProps, { register })(RegisterForm)
