import React, { Fragment, useEffect } from 'react'

import { Container, Flex } from '@chakra-ui/react'
import { connect } from 'react-redux'
import { Navigate } from 'react-router-dom'

import Timer from '../Timer/Timer'
import LoadingScreen from '../UI/LoadingScreen/LoadingScreen'
import { getUser } from './../../store/actions/auth'
import { getUserTimer } from './../../store/actions/timer'
import store from './../../store/index'

const Dashboard = ({ auth, timer }) => {
  useEffect(() => {
    store.dispatch(getUser())
    if (!auth.isAuthenticated) {
      store.dispatch(getUserTimer(auth.user))
    }
  }, [auth.isAuthenticated])

  if (!auth.isAuthenticated) return <Navigate to='/' />

  return (
    <Fragment>
      <Container maxW='container.xl'>
        <Flex align='center' overflow='hidden' justify='center'>
          {Object.values(timer).every((el) => el !== undefined) ? <Timer /> : <LoadingScreen />}
        </Flex>
      </Container>
    </Fragment>
  )
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  timer: state.timer,
})

export default connect(mapStateToProps)(Dashboard)
