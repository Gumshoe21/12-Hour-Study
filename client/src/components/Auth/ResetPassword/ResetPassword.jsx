import React from 'react'

import { Flex } from '@chakra-ui/react'
import { connect } from 'react-redux'
import { Navigate } from 'react-router-dom'

import ResetPasswordForm from './ResetPasswordForm'

const ResetPassword = ({ auth }) => {
  if (auth.isAuthenticated) {
    return <Navigate to='/dashboard' />
  }
  return (
    <Flex align='center' flexDirection='column' justifyContent='center' width='100wv' height='100vh'>
      <Flex borderWidth='1px' borderColor='gray.400' borderRadius='8px' p='5rem' justifyContent='center' alignItems='center'>
        <ResetPasswordForm />
      </Flex>
    </Flex>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    auth: state.auth,
    props: ownProps,
  }
}
export default connect(mapStateToProps)(ResetPassword)
