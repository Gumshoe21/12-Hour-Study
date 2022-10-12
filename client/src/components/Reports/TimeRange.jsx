// yarn add @nivo/core @nivo/calendar
import {
  ResponsiveCalendar,
} from '@nivo/calendar';
import { Box, useColorModeValue } from '@chakra-ui/react';
import { connect } from 'react-redux';

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec'
];

const TimeRange = ({ report }) => {
  const monthBorderColor = useColorModeValue('#A0AEC0', '#2D3748')
  const emptyColor = useColorModeValue('#e2e8f0', '#d3d3d3');
  const textColor = useColorModeValue('black', 'white');

  const theme = {
    textColor: `${textColor}`,
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

  return (
    <ResponsiveCalendar
      theme={theme}
      onClick={(d, e) => {
        console.log(d, e);
      }}
      data={report.reports.timeRange}
      from={new Date(new Date().getFullYear(), 0, 1)}
      to={new Date(new Date().getFullYear(), 11, 31)}
      emptyColor={emptyColor}
      colors={['#9c7dac', '#592A71', '#3D1055']} ///////
      dayBorderWidth={1}
      dayBorderColor={monthBorderColor}
      daySpacing={4}
      monthBorderColor={monthBorderColor}
      monthLegend={(y, m, d) => months[m]}
      monthLegendOffset={8}
      yearLegend={(year) => `${year}`}
      yearLegendPosition="before"
      yearLegendOffset={-8}
      align="center"
      margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
    />
  );
};

const mapStateToProps = (state) => ({
  report: state.report,
});

export default connect(mapStateToProps)(TimeRange);
