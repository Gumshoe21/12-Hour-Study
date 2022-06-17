import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container, Flex, useColorModeValue } from '@chakra-ui/react';
import { getReports } from './../../store/actions/report';
import store from './../../store/index';
import BarGraph from './BarGraph';
const Reports = ({ auth, report }) => {
  useEffect(() => {
    store.dispatch(getReports());
  }, []);
  return (
    <Fragment>{!report.loading && <BarGraph data={report.reports} />}</Fragment>
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
