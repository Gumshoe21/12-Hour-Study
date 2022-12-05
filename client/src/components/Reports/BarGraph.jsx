import React from 'react'

import { Flex, Text, useColorModeValue } from '@chakra-ui/react'
import { ResponsiveBar } from '@nivo/bar'
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import { connect } from 'react-redux'

import formatTime from './../../utils/formatTime'

const BarGraph = ({ report }) => {
  const tickStrokeColor = useColorModeValue('#4A5568', '#718096')
  const legendTextFillColor = useColorModeValue('#171923', '#F7FAFC')
  const tickTextFillColor = useColorModeValue('#171923', '#F7FAFC')
  const annotationTextColor = useColorModeValue('gray.100', 'gray.900')
  const annotationBgColor = useColorModeValue('gray.700', 'gray.400')

  dayjs.extend(duration)

  const theme = {
    axis: {
      legend: {
        text: {
          fontSize: '1.8rem',
          fontWeight: '500',
          fontFamily: 'Futura',
          fill: legendTextFillColor,
          textTransform: 'uppercase',
          letterSpacing: '0.5rem',
        },
      },
      ticks: {
        line: {
          stroke: `${tickStrokeColor}`,
        },
        text: {
          fontSize: '1.2rem',
          fontFamily: 'Futura',
          fill: tickTextFillColor,
        },
      },
    },
    grid: {
      line: {
        stroke: tickStrokeColor,
        strokeWidth: 1.5, // Graph line width.
      },
    },
  }

  return (
    report.reports.barGraph && (
      <ResponsiveBar
        theme={theme}
        data={report.reports.barGraph}
        keys={['session', 'shortBreak', 'longBreak']}
        indexBy={(e) => {
          return dayjs(e.id).format('M/DD')
        }}
        margin={{ top: 0, right: 60, bottom: 50, left: 60 }}
        padding={0.3}
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        colors={['#784E8E', '#592A71', '#3D1055']}
        groupMode={'stacked'}
        borderWidth='.07rem'
        borderColor={'white'}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Date',
          legendPosition: 'middle',
          legendOffset: 43,
        }}
        axisLeft={{
          tickSize: 0,
          tickPadding: 5,
          tickRotation: -25,
          legend: 'Time',
          legendPosition: 'middle',
          legendOffset: -52,
          format: (v) => `${formatTime(v)}`,
        }}
        label={(d) => `${formatTime(d.value)}`}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor='white'
        role='application'
        ariaLabel='Weekly Report'
        barAriaLabel={function (e) {
          return e.id + ': ' + e.formattedValue + ' in id: ' + e.indexValue
        }}
        layers={['grid', 'axes', 'bars', 'markers', 'legends', 'annontations']}
        /*
                    id: {id},
                    value: {value},
                    formattedValue: {formattedValue},
                    index: {index},
                    <Text>Date: {indexValue}</Text>
                    label: {label}
                    */
        tooltip={({ id, value, formattedValue, index, indexValue, data, label }) => (
          <Flex
            color={annotationTextColor}
            align='center'
            justify='center'
            direction='column'
            rowGap='.8rem'
            fontSize='1.6em'
            background={annotationBgColor}
            py='4rem'
            px='2rem'
          >
            <Text>{data.id}</Text>
            <Text>{formatTime(value)}</Text>
          </Flex>
        )}
        onClick={(d, e) => console.log(d, e)}
      />
    )
  )
}

const mapStateToProps = (state, ownProps) => ({
  report: state.report,
  props: ownProps,
})

export default connect(mapStateToProps)(BarGraph)
