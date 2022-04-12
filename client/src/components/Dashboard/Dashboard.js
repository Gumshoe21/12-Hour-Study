import React, { Fragment, useEffect } from 'react';
import { Navigate } from 'react-router-dom';

import Timer from '../Timer/Timer';
import { Container, Flex } from '@chakra-ui/react';
import { connect, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { loadUserTimer } from './../../store/actions/timer';
import store from './../../store/index';

const Dashboard = ({ auth }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (auth.user) store.dispatch(loadUserTimer(auth.user));
  }, [auth.user]);

  return (
    <Fragment>
      {!auth.isAuthenticated && <Navigate to="/signup" />}
      <Container maxW="container.xl">
        <Flex align="center" overflow="hidden" justify="center">
          <Timer />
        </Flex>
      </Container>
    </Fragment>
  );
};

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Dashboard);
