import React, { Fragment } from 'react';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { connect } from 'react-redux';
import { ResponsiveBar } from '@nivo/bar';
import { useColorModeValue } from '@chakra-ui/react'

const BarGraph = ({ report }) => {

  const tickStrokeColor = useColorModeValue('#4A5568', '#718096')
  const legendTextFillColor = useColorModeValue('#171923', '#F7FAFC')
  const tickTextFillColor = useColorModeValue('#171923', '#F7FAFC')
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
          fontSize: '1.8rem',
          fontWeight: '500',
          fontFamily: 'Futura',
          fill: legendTextFillColor,
          textTransform: 'uppercase',
          letterSpacing: '0.5rem'
        }
      },
      ticks: {
        line: {
          stroke: `${tickStrokeColor}`
        },
        text: {
          fontSize: '1.2rem',
          fontFamily: 'Futura',
          fill: tickTextFillColor,
        }
      }
    },
    grid: {
      line: {
        stroke: tickStrokeColor,
        strokeWidth: 1.5 // graph line width
      }
    }
  };

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
        padding={0.9}
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        colors={['#784E8E', '#592A71', '#3D1055']}
        groupMode={'stacked'}
        borderWidth=".07rem"
        borderColor={
          'white'}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Date',
          legendPosition: 'middle',
          legendOffset: 43
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Time',
          legendPosition: 'middle',
          legendOffset: -50
        }}
        label={(d) => `${formatTime(d.value)}`}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor="white"
        role="application"
        ariaLabel="Weekly Report"
        barAriaLabel={function(e) {
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
