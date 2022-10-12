import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getReports } from './../../store/actions/report';
import store from './../../store/index';
import BarGraph from './BarGraph';
import TimeRange from './TimeRange';
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Container,
  Flex,
  Text,
  useColorModeValue
} from '@chakra-ui/react';

const Reports = ({ report }) => {

  useEffect(() => {
    store.dispatch(getReports());
  }, []);

  const CustomTab = ({ title }) => {
    return (
      <Tab
        variant='enclosed'
        fontSize="1.8rem"
        fontFamily="mono"
        textTransform="uppercase"
        transition="background-color 0.3s ease-in"
      >
        {title}
      </Tab >
    );
  };
  return (
    <Container maxW="container.xl"

    >
      {/* 7.25rem is subtracted from the full height of the viewport to account for the height made up of the navbar and the margin between the navbar and the graph */}
      <Tabs
        variant='unstyled'
        h="calc(100vh - 7.25rem)"
        isFitted

        borderRadius='8px'
      >
        <TabList
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
    </Container >
  );
};


const mapStateToProps = (state) => ({
  report: state.report
});

export default connect(mapStateToProps)(Reports);
