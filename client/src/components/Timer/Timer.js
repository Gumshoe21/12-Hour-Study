import React, { useState, useCallback, useEffect, useRef } from 'react';
import { connect, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import timerSlice from '../../store/slices/timer';
import TimerSwitcher from './TimerSwitcher';
import TimerToggleButton from './TimerToggleButton';

import { Box, Flex, useColorModeValue, Progress } from '@chakra-ui/react';

dayjs.extend(duration);

const formatTime = (time) => {
  return dayjs.duration(time, 'seconds').format('mm:ss');
};

const Timer = ({ timer, auth }) => {
  // STATE
  const { clearProgress, setActiveMode, incrementRound, resetRound } =
    timerSlice.actions;
  const [ticking, setTicking] = useState(false);
  const tickingIntervalRef = useRef(null);

  const clearTimer = () => {
    clearInterval(tickingIntervalRef.current);
    tickingIntervalRef.current = null;
  };

  const timerBgColor = useColorModeValue('gray.400', 'whiteAlpha.100');
  const countdownFontColor = useColorModeValue(
    'whiteAlpha.900',
    'whiteAlpha.900'
  );

  const [timeLeft, setTimeLeft] = useState(
    //    timer.modes[timer.active_mode].length * 60
    2
  );

  const switchTimerMode = (e) => {
    setTicking(false);
    dispatch(timerSlice.actions.clearProgress());
    dispatch(timerSlice.actions.setActiveMode(e.target.value));
    console.log(e.target.value);
    //    setTimeLeft(timer.modes[e.target.value].length * 60);
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
    setTicking(ticking === false ? true : false);
  };

  const tick = useCallback(() => {
    if (timeLeft > 0) {
      setTimeLeft(timeLeft - 1);
    }
    if (timeLeft === 0) {
      setTicking(false);
      clearTimer();
      console.log(timer.active_mode);
    }
  }, [timeLeft]);

  const setTickingInterval = useEffect(() => {
    if (ticking) {
      tickingIntervalRef.current = setInterval(tick, 1000);
    } else {
      clearTimer();
    }
    return clearTimer;
  }, [tick, ticking]);

  const setProgressHandler = useEffect(() => {
    if (ticking) {
      dispatch(timerSlice.actions.incrementProgress());
    }
  }, [tick]);

  console.log(`time left: ${timeLeft}`);
  console.log(`ticking = ${ticking}`);
  console.log(`progress: ${timer.modes[timer.active_mode].progress}`);
  console.log(`active mode: ${timer.active_mode}`);

  const dispatch = useDispatch();

  const ProgressBar = () => {
    const progress = timer.modes[timer.active_mode].progress;
    const timerDuration = timer.modes[timer.active_mode].length * 60;
    return (
      <Progress
        size="xs"
        colorScheme="purple"
        max={timerDuration}
        value={progress}
      />
    );
  };

  const Round = () => {
    return (
      <Box fontSize={24}>
        {timer.round} / {timer.long_break_interval}
      </Box>
    );
  };
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

  return (
    <Box
      py={10}
      textAlign="center"
      maxW="480px"
      display="block"
      px={20}
      fontSize={10}
      bg={timerBgColor}
      borderRadius="8"
      flexDirection="column"
    >
      <TimerSwitcher onClick={switchTimerMode} />
      <Countdown />

      <Box mb={8}>
        <ProgressBar />
      </Box>
      <Box mb={8}>
        <Round />
      </Box>

      <TimerToggleButton
        onClick={setTickingHandler}
        text={ticking ? 'STOP' : 'START'}
      />
    </Box>
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
