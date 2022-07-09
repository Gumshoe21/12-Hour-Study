import React, { Fragment, useEffect } from 'react';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { connect } from 'react-redux';
import store from '../../store/index';
import { ResponsiveBar } from '@nivo/bar';
import { getReports } from '../../store/actions/report';
import { Text } from '@chakra-ui/react';

dayjs.extend(duration);
const formatTime = (time) => {
  return dayjs
    .duration(time, 'seconds')
    .format(time >= 3600 ? 'HH:mm:ss' : 'mm:ss');
};
const theme = {
  axis: {
    legend: {
      text: {
        fill: 'white',
        fontWeight: 'bold',
        fontSize: '1.8rem',
        textTransform: 'uppercase',
        letterSpacing: '0.5rem'
      }
    },
    ticks: {
      line: {
        stroke: 'white'
      },
      text: {
        fontSize: '1.2rem',
        fontWeight: 'bold',
        fill: 'white'
      }
    }
  },
  grid: {
    line: {
      stroke: 'white',
      strokeWidth: 2
    }
  }
};
const BarGraph = ({ report, props }) => {
  return (
    report.reports.barGraph && (
      <ResponsiveBar
        theme={theme}
        data={report.reports.barGraph}
        keys={['session', 'shortBreak', 'longBreak']}
        indexBy={(e) => {
          return dayjs(e.id).format('M/DD');
        }}
        margin={{ top: 0, right: 60, bottom: 50, left: 60 }}
        padding={0.7}
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        colors={['#784E8E', '#592A71', '#3D1055']}
        groupMode={'stacked'}
        borderWidth=".2rem"
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
          legend: 'DATE',
          legendPosition: 'middle',
          legendOffset: 43
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          tickColor: '#fff',
          legend: 'Timer',
          legendPosition: 'middle',
          legendOffset: -50
        }}
        label={(d) => `${formatTime(d.value)}`}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor="#ffffff"
        role="application"
        ariaLabel="Weekly Report"
        barAriaLabel={function (e) {
          return e.id + ': ' + e.formattedValue + ' in id: ' + e.indexValue;
        }}
        layers={['grid', 'axes', 'bars', 'markers', 'legends', 'annontations']}
      />
    )
  );
};

const mapStateToProps = (state, ownProps) => ({
  report: state.report,
  props: ownProps
});

export default connect(mapStateToProps)(BarGraph);
