import React from 'react'

import { Flex } from '@chakra-ui/react'
import { connect } from 'react-redux'
import { Navigate } from 'react-router-dom'

import RegisterForm from './RegisterForm'

const Register = ({ isAuthenticated }) => {
  if (isAuthenticated) return <Navigate to='/dashboard' />

  return (
    <Flex align='center' justifyContent='center' flexDirection='column' height='100vh'>
      <Flex borderWidth='1px' borderColor='gray.400' borderRadius='8px' p='5rem' justifyContent='center' alignItems='center'>
        <RegisterForm />
      </Flex>
    </Flex>
  )
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
  }
}

export default connect(mapStateToProps)(Register)
