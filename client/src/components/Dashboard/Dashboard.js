import React, { Fragment, useEffect } from 'react';
import { Navigate } from 'react-router-dom';

import Timer from '../Timer/Timer';
import { Container, Flex } from '@chakra-ui/react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getUserTimer } from './../../store/actions/timer';
import { getUser } from './../store/actions/user';
import store from './../../store/index';
import LoadingScreen from '../UI/LoadingScreen/LoadingScreen';

const Dashboard = ({ auth, timer }) => {
  /* 
  useEffect(() => {
    if (auth.user) {
      store.dispatch(getUserTimer(auth.user));
    }
  }, [auth.user]);
*/
  useEffect(() => {
    store.dispatch(getUser());
  }, []);

  return (
    <Fragment>
      {!auth.isAuthenticated && <Navigate to="/" />}
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
