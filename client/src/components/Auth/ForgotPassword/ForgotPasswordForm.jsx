import React, { useState } from 'react'

import { Flex, Text, Button, VStack, FormControl, FormErrorMessage, Input } from '@chakra-ui/react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { forgotPassword } from '../../../store/actions/auth'

const ForgotPasswordForm = ({ forgotPassword, auth }) => {
  const [formData, setFormData] = useState({
    email: '',
  })

  const { email } = formData

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value })

  const onSubmit = async (e) => {
    e.preventDefault()
    forgotPassword({ email })
  }

  let emailNotFound = auth.emailNotFound === true

  return (
    <form onSubmit={(e) => onSubmit(e)}>
      <FormControl isInvalid={emailNotFound}>
        {!emailNotFound ? null : (
          <FormErrorMessage fontSize='1.4rem' mb='1rem'>
            Email not found.
          </FormErrorMessage>
        )}
        <VStack spacing='2rem' mb='1rem' display='inline-block' maxW='sm'>
          <Input fontSize='1.6rem' type='email' placeholder='Email Address' name='email' value={email} height='4rem' onChange={(e) => onChange(e)} />
          <Button h='4rem' fontSize='1.6rem' type='submit' value='Forogt Password' width='100%'>
            Submit
          </Button>
        </VStack>
      </FormControl>
      <Flex direction='column' justify='center' align='center' gap='1rem' textDecoration='underline'>
        <Link to='/login'>
          <Text fontSize='1.6rem'>Back to Log In</Text>
        </Link>
        <Link to='/signup'>
          <Text fontSize='1.6rem'>Not Registered? Sign Up Here</Text>
        </Link>
      </Flex>
    </form>
  )
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  }
}

export default connect(mapStateToProps, { forgotPassword })(ForgotPasswordForm)
