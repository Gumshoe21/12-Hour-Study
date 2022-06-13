import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container, Flex, useColorModeValue } from '@chakra-ui/react';
import { getReports } from './../../store/actions/report';
import store from './../../store/index';

const Reports = ({ auth, report }) => {
  useEffect(() => {
    store.dispatch(getReports());
  }, []);
  return (
    <Container maxW="container.xl" overflow="hidden">
      <Flex align="center" overflow="hidden" justify="center">
        {!report.loading &&
          report.reports[0].stats.session.totalTimeAccumulated}
      </Flex>
    </Container>
  );
};

Reports.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  report: state.report
});

export default connect(mapStateToProps)(Reports);
