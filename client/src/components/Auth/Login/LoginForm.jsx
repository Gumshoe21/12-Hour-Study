import React, { useState, useEffect } from 'react'

import { Flex, Text, Button, VStack, FormControl, FormErrorMessage, Input } from '@chakra-ui/react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { login } from '../../../store/actions/auth'
import { getUser } from './../../../store/actions/auth'
import store from './../../../store/index'

const LoginForm = ({ login, auth, props }) => {
  useEffect(() => {
    store.dispatch(getUser())
  }, [])

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const { email, password } = formData

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value })

  const onSubmit = async (e) => {
    e.preventDefault()
    login({ email, password })
  }

  let loginFailed = auth.loginFailed === true

  return (
    <form onSubmit={(e) => onSubmit(e)}>
      <FormControl isInvalid={loginFailed}>
        {!loginFailed ? null : (
          <FormErrorMessage fontSize={14} mb={4}>
            Email and/or password is wrong.
          </FormErrorMessage>
        )}
        <VStack spacing='1rem' mb='1rem' display='inline-block' maxW='sm'>
          <Input fontSize='1.6rem' type='email' placeholder='Email Address' name='email' value={props.email} height='4rem' onChange={(e) => onChange(e)} />
          <Input
            fontSize='1.6rem'
            w='100%'
            type='password'
            placeholder='Password'
            name='password'
            value={props.password}
            h='4rem'
            onChange={(e) => onChange(e)}
          />
          <Button h='4rem' fontSize='1.6rem' type='submit' value='Login' width='100%'>
            Log In
          </Button>
        </VStack>
      </FormControl>
      <Flex direction='column' justify='center' align='center' textDecoration='underline' gap='1rem'>
        <Link to='/signup'>
          <Text fontSize='1.6rem'>Not Registered? Sign Up Here</Text>
        </Link>
        <Link to='/forgotpassword'>
          <Text fontSize='1.6rem'>Forgot Your Password?</Text>
        </Link>
      </Flex>
    </form>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    props: ownProps,
    auth: state.auth,
  }
}

export default connect(mapStateToProps, { login })(LoginForm)
