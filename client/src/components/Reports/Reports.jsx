import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Box,
  Container,
  Flex,
  Text,
  Heading,
  useColorModeValue
} from '@chakra-ui/react';
import { getReports } from './../../store/actions/report';
import store from './../../store/index';
import BarGraph from './BarGraph';
import TimeRange from './TimeRange';
import { ResponsiveCalendar } from '@nivo/calendar';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
const Reports = ({ report }) => {
  useEffect(() => {
    store.dispatch(getReports());
  }, []);

  return (
    <Container maxW="container.xl">
      <Tabs
        h="calc(100vh - 7.25rem)"
        border="1px solid gray"
        borderRadius="2rem"
        isFitted
        variant="enclosed"
        bg="tint.100"
      >
        <TabList
          bg="primary.200"
          borderRadius="2rem 2rem 0rem 0rem"
          // border="1px solid red"
        >
          <Tab borderRadius="2rem 0rem 0rem" fontSize="2.0rem">
            Weekly Report
          </Tab>
          <Tab borderRadius="0rem 2rem 0rem 0rem" fontSize="2.0rem">
            Yearly Overview
          </Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <Flex
              py="20rem"
              h="calc(100vh - 7.25rem)"
              top="0"
              left="0"
              gap="8rem"
              direction="column"
              justify="center"
              align="center"
            >
              {!report.loading && <BarGraph />}
            </Flex>
          </TabPanel>
          <TabPanel>
            <Flex
              py="20rem"
              h="calc(100vh - 7.25rem)"
              top="0"
              left="0"
              gap="8rem"
              direction="column"
              justify="center"
              align="center"
            >
              {!report.loading && <TimeRange />}
            </Flex>
          </TabPanel>
        </TabPanels>
      </Tabs>
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
