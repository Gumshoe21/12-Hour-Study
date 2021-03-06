import React, { Fragment, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Container, Flex } from '@chakra-ui/react';
import LoadingScreen from '../UI/LoadingScreen/LoadingScreen';
import Timer from '../Timer/Timer';
import store from './../../store/index';
import { getUser } from './../../store/actions/auth';
import { getUserTimer } from './../../store/actions/timer';

const Dashboard = ({ auth, timer }) => {
  useEffect(() => {
    store.dispatch(getUser());
    if (auth.user) {
      store.dispatch(getUserTimer(auth.user));
    }
  }, []);

  if (!auth.isAuthenticated) return <Navigate to="/" />;

  return (
    <Fragment>
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
