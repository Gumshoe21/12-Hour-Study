import React, { useState } from 'react'

import { FormControl, VStack, Input, Button } from '@chakra-ui/react'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'

import { resetPassword } from '../../../store/actions/auth'

const ResetPasswordForm = ({ resetPassword, auth, props }) => {
  const [formData, setFormData] = useState({
    password: '',
    passwordConfirm: '',
  })

  const { password, passwordConfirm } = formData

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const { token } = useParams()

  const onSubmit = async (e) => {
    e.preventDefault()
    resetPassword({ password, passwordConfirm, token })
  }

  return (
    <form onSubmit={(e) => onSubmit(e)}>
      <FormControl>
        <VStack spacing='2rem' mb='1rem' display='inline-block' maxW='sm'>
          <Input fontSize='1.6rem' type='password' placeholder='New Password' name='password' value={props.password} height='4rem' onChange={(e) => onChange(e)} />
          <Input
            fontSize='1.6rem'
            type='password'
            placeholder='Confirm New Password'
            name='passwordConfirm'
            value={props.password}
            h='4rem'
            onChange={(e) => onChange(e)}
          />
          <Button h='4rem' fontSize='1.6rem' type='submit' value='Reset Password' width='100%'>
            Reset Password
          </Button>
        </VStack>
      </FormControl>
    </form>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    props: ownProps,
    auth: state.auth,
  }
}

export default connect(mapStateToProps, { resetPassword })(ResetPasswordForm)
