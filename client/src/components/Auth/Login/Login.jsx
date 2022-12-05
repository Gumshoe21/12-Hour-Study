import React from 'react'

import { Flex } from '@chakra-ui/react'
import { connect } from 'react-redux'
import { Navigate } from 'react-router-dom'

import LoginForm from './LoginForm'

const Login = ({ isAuthenticated }) => {
  if (isAuthenticated) return <Navigate to='/dashboard' />

  return (
    <Flex align='center' flexDirection='column' justifyContent='center' width='100wv' height='100vh'>
      <Flex borderWidth={1} borderColor='gray.400' borderRadius={8} p={20} justifyContent='center' alignItems='center'>
        <LoginForm />
      </Flex>
    </Flex>
  )
}


const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
  }
}

export default connect(mapStateToProps)(Login)
