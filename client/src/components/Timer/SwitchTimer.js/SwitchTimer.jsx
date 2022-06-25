import SwitchTimerButton from './SwitchTimerButton';
import { Flex } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const SwitchTimer = ({ props, timer }) => {
  return (
    <Flex flexDirection="row" mb={2} gap={5} justifyContent="space-between">
      <SwitchTimerButton
        onClick={props.onClick}
        text={'Session'}
        mode={timer.modes['session'].id}
      />
      <SwitchTimerButton
        onClick={props.onClick}
        text={'Short Break'}
        mode={timer.modes['shortBreak'].id}
      />
      <SwitchTimerButton
        onClick={props.onClick}
        text={'Long Break'}
        mode={timer.modes['longBreak'].id}
      />
    </Flex>
  );
};

SwitchTimer.propTypes = {
  timer: PropTypes.object.isRequired,
  props: PropTypes.object.isRequired
};

const mapStateToProps = (state, ownProps) => ({
  timer: state.timer,
  props: ownProps
});

export default connect(mapStateToProps)(SwitchTimer);
