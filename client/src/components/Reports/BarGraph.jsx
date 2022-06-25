import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container, Flex, useColorModeValue, Box } from '@chakra-ui/react';
import store from '../../store/index';
import { ResponsiveBar } from '@nivo/bar';
import { getReports } from '../../store/actions/report';
import dayjs from 'dayjs';
const BarGraph = ({ report, props }) => (
  <ResponsiveBar
    borderWidth="2px"
    data={report.reports.barGraph}
    keys={['session', 'shortBreak', 'longBreak']}
    indexBy={(e) => {
      return dayjs(e.id).format('M/DD');
    }}
    margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
    padding={0.3}
    valueScale={{ type: 'linear' }}
    indexScale={{ type: 'band', round: true }}
    colors={['#9C7DAC', '#784E8E', '#592A71', '#3D1055']}
    groupMode={'stacked'}
    fill={[
      {
        match: {
          id: 'session'
        },
        id: 'dots'
      },
      {
        match: {
          id: 'shortBreak'
        },
        id: 'lines'
      }
    ]}
    borderColor={{
      from: 'color',
      modifiers: [['darker', 1.6]]
    }}
    axisTop={null}
    axisRight={null}
    axisBottom={{
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: 'id',
      legendPosition: 'middle',
      legendOffset: 32
    }}
    axisLeft={{
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: 'food',
      legendPosition: 'middle',
      legendOffset: -50
    }}
    labelSkipWidth={12}
    labelSkipHeight={12}
    labelTextColor="#ffffff"
    legends={[
      {
        dataFrom: 'keys',
        anchor: 'top',
        direction: 'row',
        justify: false,
        translateX: 100,
        translateY: -40,
        itemsSpacing: 8,
        itemWidth: 120,
        itemHeight: 40,
        itemDirection: 'left-to-right',
        itemOpacity: 0.85,
        symbolSize: 20,
        symbolShape: 'circle',
        effects: [
          {
            on: 'hover',
            style: {
              itemOpacity: 1
            }
          }
        ]
      }
    ]}
    role="application"
    ariaLabel="Nivo bar chart demo"
    barAriaLabel={function(e) {
      return e.id + ': ' + e.formattedValue + ' in id: ' + e.indexValue;
    }}
  />
);
BarGraph.propTypes = {};

const mapStateToProps = (state, ownProps) => ({
  report: state.report,
  props: ownProps
});

export default connect(mapStateToProps)(BarGraph);
