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
    <Box>
      <Tabs variant="soft-rounded">
        <TabList>
          <Tab>Yearly Overview</Tab>
          <Tab>Weekly Overview</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <Flex
              h="100vh"
              position="relative"
              top="0"
              left="0"
              gap="8rem"
              direction="column"
              justify="center"
              align="center"
            >
              {!report.loading && (
                <ResponsiveCalendar
                  onClick={(d, e) => {
                    console.log(d, e);
                  }}
                  data={report.reports.timeRange}
                  from={new Date(new Date().getFullYear(), 0, 1)}
                  to={new Date(new Date().getFullYear(), 11, 31)}
                  emptyColor="white"
                  colors={['#9C7DAC', '#784E8E', '#592A71', '#3D1055']}
                  dayBorderWidth={1}
                  dayBorderColor="black"
                  yearLegend={(year) => `${year}`}
                  yearLegendPosition="before"
                  yearLegendOffset={-8}
                  align="center"
                  margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
                />
              )}
            </Flex>
          </TabPanel>
          <TabPanel>hi</TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

Reports.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  report: state.report
});

export default connect(mapStateToProps)(Reports);
