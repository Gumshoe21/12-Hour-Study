import React, { Fragment, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

import Timer from '../Timer/Timer';
import { Container, Flex, Spinner } from '@chakra-ui/react';
import { connect, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { loadUserTimer } from './../../store/actions/timer';
import store from './../../store/index';
import LoadingScreen from '../UI/LoadingScreen/LoadingScreen';

const Dashboard = ({ auth, timer }) => {
  const dispatch = useDispatch();
  const loadUserHandler = useEffect(() => {
    if (auth.user) {
      store.dispatch(loadUserTimer(auth.user));
    }
  }, []);

  return (
    <Fragment>
      {!auth.isAuthenticated && <Navigate to="/signup" />}
      <Container maxW="container.xl">
        <Flex align="center" overflow="hidden" justify="center">
          {Object.values(timer).every((el) => el !== undefined) ? (
            <Timer />
          ) : (
            <LoadingScreen />
          )}
        </Flex>
      </Container>
    </Fragment>
  );
};

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
  timer: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  timer: state.timer
});

export default connect(mapStateToProps)(Dashboard);
