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
import { motion, scaleCorrectors } from 'framer-motion';
import { getReports } from './../../store/actions/report';
import store from './../../store/index';
import BarGraph from './BarGraph';
import TimeRange from './TimeRange';
import { ResponsiveCalendar } from '@nivo/calendar';
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  keyframes
} from '@chakra-ui/react';
const Reports = ({ report }) => {
  const selectedTabBg = useColorModeValue('gray.800', 'white');
  const nonSelectedTabBg = useColorModeValue('gray.700', 'white');
  useEffect(() => {
    store.dispatch(getReports());
  }, []);

  const CustomTab = ({ title }) => {
    return (
      <Tab
        bg={nonSelectedTabBg}
        _selected={{
          color: 'black',
          bg: `${selectedTabBg}`
          // transform: 'translateY(-.2rem)'
        }}
        fontSize="1.8rem"
        fontFamily="mono"
        textTransform="uppercase"
        transition="background-color 0.3s ease-in"
      >
        {title}
      </Tab>
    );
  };
  return (
    <Container maxW="container.xl">
      {/* 7.25rem is subtracted from the full height of the viewport to account for the height made up of the navbar and the margin between the navbar and the graph */}
      <Tabs
        h="calc(100vh - 7.25rem)"
        isFitted
        variant="enclosed"
        bg={selectedTabBg}
      >
        <TabList
          border="0"
          // border="1px solid red"
        >
          <CustomTab title="Last 7 Days" />
          <CustomTab title="Yearly Overview" />
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
              {!report.loading && report.reports.barGraph.length > 0 && (
                <BarGraph />
              )}
              {!report.loading && report.reports.barGraph.length === 0 && (
                <Text bg="yellow">
                  Sorry, there is no data for the given time period.
                </Text>
              )}
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
              {!report.loading && report.reports.timeRange.length > 0 && (
                <TimeRange />
              )}

              {!report.loading && report.reports.timeRange.length === 0 && (
                <Text bg="yellow">
                  Sorry, there is no data for the given time period.
                </Text>
              )}
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
