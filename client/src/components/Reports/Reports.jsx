import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container, Flex, Text, Heading, useColorModeValue } from '@chakra-ui/react';
import { getReports } from './../../store/actions/report';
import store from './../../store/index';
import BarGraph from './BarGraph';
import TimeRange from './TimeRange'

const Reports = ({ report }) => {
  useEffect(() => {
    store.dispatch(getReports());
  }, []);

  return (
    <Container maxW='container.xl'>
      <Flex px={9.6} pt={3.6} align="center" justify="center" direction="column" height="100vh">
        <Flex>
          <Heading fontSize='3.2rem'>Your Week In Review</Heading>
        </Flex>
        <Flex height='50%' width="100%">
          {!report.loading && <BarGraph data={report.reports} />}
        </Flex>
        <Flex height='50%' width="100%">
          {!report.loading && <TimeRange data={report.reports} />}
        </Flex>
      </Flex >
    </Container>
  );
};

Reports.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  report: state.report
});

export default connect(mapStateToProps)(Reports);
