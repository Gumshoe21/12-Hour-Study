import React, { Fragment, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from 'react-router-dom';

import Timer from '../Timer/Timer';
import Register from '../Auth/Register';
import {
  Heading,
  Container,
  Box,
  Flex,
  VStack,
  Grid,
  GridItem,
  AspectRatio
} from '@chakra-ui/react';
import { logout } from '../../store/actions/auth';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loadUserTimer } from './../../store/actions/timer';
import store from './../../store/index';

const Dashboard = ({ auth }) => {
  useEffect(() => {
    if (auth.user) store.dispatch(loadUserTimer(auth.user));
  });

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
