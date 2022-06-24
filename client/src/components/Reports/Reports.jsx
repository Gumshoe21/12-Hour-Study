import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container, Flex, useColorModeValue } from '@chakra-ui/react';
import { getReports } from './../../store/actions/report';
import store from './../../store/index';
import BarGraph from './BarGraph';
import TimeRange from './TimeRange'

const Reports = ({ auth, report }) => {
  useEffect(() => {
    store.dispatch(getReports());
  }, []);

  return (
    <Flex align="center" justify="center" direction="column" height="100vh">
      <Flex height='50%' width="100vw">
        {!report.loading && <BarGraph data={report.reports} />}
      </Flex>
      <Flex height='50%' width="100vw">
        {!report.loading && <TimeRange data={report.reports} />}
      </Flex>
    </Flex >
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
