// install (please make sure versions match peerDependencies)
// yarn add @nivo/core @nivo/calendar
import { ResponsiveTimeRange } from '@nivo/calendar'

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
let currentYear = new Date().getFullYear();
const TimeRange = ({ report }) => (

  <ResponsiveTimeRange
    onClick={(d, e) => {
      console.log(d, e)
    }}
    data={report.reports.timeRange}
    from={`${currentYear}-01-01`}
    to={`${currentYear}-12-31`}
    emptyColor="#eeeeee"
    colors={['#61cdbb', '#97e3d5', '#e8c1a0', '#f47560']}
    margin={{ top: 40, right: 40, bottom: 100, left: 40 }}
    dayBorderWidth={2}
    dayBorderColor="#fffff"
    daySpacing={2}
    legends={[
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
  />
)

TimeRange.propTypes = {};

const mapStateToProps = (state, ownProps) => ({
  report: state.report,
  props: ownProps
});

export default connect(mapStateToProps)(TimeRange);
