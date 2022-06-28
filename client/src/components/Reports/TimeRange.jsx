// yarn add @nivo/core @nivo/calendar
import {
  ResponsiveCalendar,
  Calendar,
  ResponsiveTimeRange
} from '@nivo/calendar';
import { Box } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
let currentYear = new Date().getFullYear();
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
const TimeRange = ({ report }) => (
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
    monthLegend={(year, month, date) => months[month]}
    yearLegend={(year) => `${year}`}
    yearLegendPosition="before"
    yearLegendOffset={-8}
    align="center"
    margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
  />
  /*
  legends={
   
    [
      {
        anchor: 'bottom-right',
        direction: 'row',
        justify: false,
        itemCount: 4,
        itemWidth: 42,
        itemHeight: 96,
        itemsSpacing: 100,
        itemDirection: 'right-to-left',
        translateX: -60,
        translateY: -60,
        symbolSize: 40
      }
    ]}
  */
);

TimeRange.propTypes = {};

const mapStateToProps = (state, ownProps) => ({
  report: state.report,
  props: ownProps
});

export default connect(mapStateToProps)(TimeRange);
