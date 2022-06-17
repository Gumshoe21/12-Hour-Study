import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container, Flex, useColorModeValue } from '@chakra-ui/react';
import store from '../../store/index';
import { ResponsiveBar } from '@nivo/bar';
import { getReports } from '../../store/actions/report';

const BarGraph = ({ report, props }) => (
  <ResponsiveBar
    data={report.reports}
    keys={['session', 'shortBreak', 'longBreak']}
    indexBy="id"
    margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
    padding={0.3}
    valueScale={{ type: 'linear' }}
    indexScale={{ type: 'band', round: true }}
    colors={{ scheme: 'nivo' }}
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
      legendOffset: -40
    }}
    labelSkipWidth={12}
    labelSkipHeight={12}
    labelTextColor={{
      from: 'color',
      modifiers: [['darker', 1.6]]
    }}
    legends={[
      {
        dataFrom: 'keys',
        anchor: 'bottom-right',
        direction: 'column',
        justify: false,
        translateX: 120,
        translateY: 0,
        itemsSpacing: 2,
        itemWidth: 100,
        itemHeight: 20,
        itemDirection: 'left-to-right',
        itemOpacity: 0.85,
        symbolSize: 20,
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
    barAriaLabel={function (e) {
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
