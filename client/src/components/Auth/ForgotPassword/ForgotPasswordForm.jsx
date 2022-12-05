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
          <FormErrorMessage fontSize={14} mb={4}>
            Email not found.
          </FormErrorMessage>
        )}
        <VStack spacing={8} mb={4} display='inline-block' maxW='sm'>
          <Input fontSize={16} type='email' placeholder='Email Address' name='email' value={email} height={16} onChange={(e) => onChange(e)} />
          <Button h={16} fontSize={16} type='submit' value='Forogt Password' width='100%'>
            Submit
          </Button>
        </VStack>
      </FormControl>
      <Flex direction='column' justify='center' align='center' gap={4} textDecoration='underline'>
        <Link to='/login'>
          <Text fontSize={16}>Back to Log In</Text>
        </Link>
        <Link to='/signup'>
          <Text fontSize={16}>Not Registered? Sign Up Here</Text>
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
