import { Flex } from '@chakra-ui/react'
import { connect } from 'react-redux'

import SwitchTimerButton from './SwitchTimerButton'

const SwitchTimer = ({ props, timer }) => {
  return (
    <Flex flexDirection='row' mb='0.5rem' gap='1.25rem' justifyContent='space-between'>
      <SwitchTimerButton onClick={props.onClick} text={'Session'} mode={timer.modes['session'].id} />
      <SwitchTimerButton onClick={props.onClick} text={'Short Break'} mode={timer.modes['shortBreak'].id} />
      <SwitchTimerButton onClick={props.onClick} text={'Long Break'} mode={timer.modes['longBreak'].id} />
    </Flex>
  )
}

const mapStateToProps = (state, ownProps) => ({
  timer: state.timer,
  props: ownProps,
})

export default connect(mapStateToProps)(SwitchTimer)
