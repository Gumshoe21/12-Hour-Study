import React, {
  useState,
  useCallback,
  useEffect,
  useRef,
  Fragment
} from 'react';
import { connect, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import timerSlice from '../../store/slices/timer';
import SwitchTimer from './SwitchTimer.js/SwitchTimer';
import TimerToggleButton from './TimerToggleButton';
import TimerBox from './TimerBox';
import ProgressBar from './ProgressBar';
import Round from './Round';
import Countdown from './Countdown';
import { Spinner, Box } from '@chakra-ui/react';
const Timer = ({ timer, auth }) => {
  const dispatch = useDispatch();

  const {
    setTicking,
    clearProgress,
    setActiveMode,
    incrementRound,
    resetRound,
    incrementProgress
  } = timerSlice.actions;

  const tickingIntervalRef = useRef(null);
  const [timeLeft, setTimeLeft] = useState(
    timer.modes[timer.activeMode].length * 60
    //2
  );

  const updateActiveModeLength = useEffect(() => {
    setTimeLeft((timeLeft) => timer.modes[timer.activeMode].length * 60);
    dispatch(setTicking(false));
  }, [timer.modes[timer.activeMode].length]);

  const clearTimer = () => {
    clearInterval(tickingIntervalRef.current);
    tickingIntervalRef.current = null;
  };

  const switchTimerMode = (e) => {
    dispatch(setTicking(false));
    dispatch(clearProgress());
    dispatch(setActiveMode(e.target.value));
    console.log(e.target.value);
    // setTimeLeft(timer.modes[e.target.value].length * 60);
    setTimeLeft(2);
    console.log(timeLeft);
  };

  const onNoTimeLeft = (mode, reset = null) => {
    dispatch(setActiveMode(`${mode}`));
    setTimeLeft(timer.modes[`${mode}`].length * 60);
    reset ? dispatch(resetRound()) : dispatch(incrementRound());
  };

  const timerComplete = useEffect(() => {
    if (timeLeft === 0) {
      clearProgress();
      if (
        timer.activeMode === 'session' &&
        timer.round === timer.longBreakInterval
      ) {
        onNoTimeLeft('shortBreak', true);
      } else if (
        timer.activeMode === 'session' &&
        timer.round < timer.longBreakInterval &&
        timer.round !== timer.longBreakInterval - 1
      ) {
        onNoTimeLeft('shortBreak', false);
      } else if (
        timer.activeMode === 'session' &&
        timer.round === timer.longBreakInterval - 1
      ) {
        onNoTimeLeft('longBreak', false);
      } else if (timer.activeMode === 'shortBreak') {
        onNoTimeLeft('session');
      } else if (timer.activeMode === 'longBreak') {
        onNoTimeLeft('session', true);
      }
    }
  }, [
    timeLeft,
    clearProgress,
    timer.activeMode,
    timer.longBreakInterval,
    timer.round
  ]);

  const setTickingHandler = () => {
    dispatch(setTicking(timer.ticking === true ? false : true));
  };

  const tick = useCallback(() => {
    if (timeLeft > 0) {
      setTimeLeft(timeLeft - 1);
    }
    if (timeLeft === 0) {
      dispatch(setTicking(false));
      clearTimer();
      console.log(timer.activeMode);
    }
  }, [timeLeft, dispatch, setTicking, timer.activeMode]);

  const setTickingInterval = useEffect(() => {
    if (timer.ticking) {
      tickingIntervalRef.current = setInterval(tick, 1000);
    } else {
      clearTimer();
    }
    return clearTimer;
  }, [tick, timer.ticking]);

  const setProgressHandler = useEffect(() => {
    if (timer.ticking) {
      dispatch(incrementProgress());
    }
  }, [tick, dispatch, incrementProgress, timer.ticking]);

  /*
  console.log(`time left: ${timeLeft}`);
  console.log(`ticking = ${timer.ticking}`);
  console.log(`progress: ${timer.modes[timer.activeMode].progress}`);
  console.log(`active mode: ${timer.activeMode}`);
  */

  const { progress } = timer.modes[timer.activeMode];
  const timerDuration = timer.modes[timer.activeMode].length * 60;

  return (
    <TimerBox>
      <SwitchTimer onClick={switchTimerMode} />
      <Box>
        {isNaN(timer.modes[timer.activeMode].length) && (
          <Countdown timeLeft={'hi'} visibility="hidden" />
        )}

        {!isNaN(timer.modes[timer.activeMode].length) && (
          <Countdown timeLeft={timeLeft} />
        )}
      </Box>
      <ProgressBar max={timerDuration} value={progress} />
      <Round round={timer.round} interval={timer.longBreakInterval} />
      <TimerToggleButton
        onClick={setTickingHandler}
        text={timer.ticking ? 'STOP' : 'START'}
      />
    </TimerBox>
  );
};

Timer.propTypes = {
  auth: PropTypes.object.isRequired,
  timer: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  timer: state.timer
});

export default connect(mapStateToProps)(Timer);
