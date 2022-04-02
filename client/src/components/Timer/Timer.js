import React, { useState, useCallback, useEffect, useRef } from 'react';
import { connect, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import timerSlice from '../../store/slices/timer';
import SwitchTimer from './SwitchTimer.js/SwitchTimer';
import TimerToggleButton from './TimerToggleButton';
import TimerBox from './TimerBox';
import ProgressBar from './ProgressBar';
import Round from './Round';
import { Box, Flex, useColorModeValue, Progress } from '@chakra-ui/react';

dayjs.extend(duration);
const formatTime = (time) => {
  return dayjs.duration(time, 'seconds').format('mm:ss');
};

const Timer = ({ timer, auth }) => {
  const dispatch = useDispatch();
  // Timer Actions
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
    //    timer.modes[timer.active_mode].length * 60
    2
  );
  // COLORS

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
    if (reset === true) dispatch(resetRound());
    if (reset === false) dispatch(incrementRound());
  };

  const timerComplete = useEffect(() => {
    if (timeLeft === 0) {
      clearProgress();
      if (
        timer.active_mode === 'session' &&
        timer.round === timer.long_break_interval
      ) {
        onNoTimeLeft('short_break', true);
      } else if (
        timer.active_mode === 'session' &&
        timer.round < timer.long_break_interval &&
        timer.round !== timer.long_break_interval - 1
      ) {
        onNoTimeLeft('short_break', false);
      } else if (
        timer.active_mode === 'session' &&
        timer.round === timer.long_break_interval - 1
      ) {
        onNoTimeLeft('long_break', false);
      } else if (timer.active_mode === 'short_break') {
        onNoTimeLeft('session');
      } else if (timer.active_mode === 'long_break') {
        onNoTimeLeft('session', true);
      }
    }
  }, [timeLeft]);

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
      console.log(timer.active_mode);
    }
  }, [timeLeft]);

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
  }, [tick]);

  console.log(`time left: ${timeLeft}`);
  console.log(`ticking = ${timer.ticking}`);
  console.log(`progress: ${timer.modes[timer.active_mode].progress}`);
  console.log(`active mode: ${timer.active_mode}`);

  const countdownFontColor = useColorModeValue(
    'whiteAlpha.900',
    'whiteAlpha.900'
  );

  const Countdown = () => {
    return (
      <Flex justifyContent="center" mb={5} fontSize={96}>
        <Box
          color={countdownFontColor}
          letterSpacing=".5rem"
          fontWeight="600"
          fontFamily="Arial"
          overflow="hidden"
          width="100%"
        >
          {formatTime(timeLeft)}
        </Box>
      </Flex>
    );
  };

  const { progress } = timer.modes[timer.active_mode];
  const timerDuration = timer.modes[timer.active_mode].length * 60;

  return (
    <TimerBox>
      <SwitchTimer onClick={switchTimerMode} />
      <Countdown />
      <ProgressBar max={timerDuration} value={progress} />
      <Round round={timer.round} interval={timer.long_break_interval} />
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
