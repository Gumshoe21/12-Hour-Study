import React, { useState, useCallback, useEffect, useRef } from 'react';
import { connect, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import timerSlice from '../../store/slices/timer';
import ModeSwitcherButton from './ModeSwitcherButton';
import {
  Button,
  Box,
  Flex,
  useColorMode,
  useColorModeValue
} from '@chakra-ui/react';

dayjs.extend(duration);
const formatTime = (time) => {
  return dayjs.duration(time, 'seconds').format('mm:ss');
};

const Timer = ({ timer, auth }) => {
  // STATE
  const [ticking, setTicking] = useState(false);
  const tickingIntervalRef = useRef(null);

  const clear = () => {
    clearInterval(tickingIntervalRef.current);
    tickingIntervalRef.current = null;
  };

  const { colorMode, toggleColorMode } = useColorMode();
  const timerBgColor = useColorModeValue('gray.500', 'whiteAlpha.100');
  const countdownFontColor = useColorModeValue(
    'whiteAlpha.900',
    'whiteAlpha.900'
  );

  const [timeLeft, setTimeLeft] = useState(
    timer.modes[timer.active_mode].length
  );

  const setActiveMode = (e) => {
    dispatch(timerSlice.actions.setActiveMode(e.target.value));
    console.log(e.target.value);
    setTimeLeft(timer.modes[e.target.value].length);

    console.log(timeLeft);
  };

  /*
	const [timeLeft, setTimeLeft] = useState(4);
	*/
  const setTickingHandler = () => {
    setTicking(ticking === false ? true : false);
  };

  const tick = useCallback(() => {
    if (timeLeft > 0) {
      setTimeLeft(timeLeft - 1);
    }
    if (timeLeft === 0) {
      setTicking(false);
      clear();
    }
  }, [ticking, timeLeft]);

  const setTickingInterval = useEffect(() => {
    if (ticking) {
      tickingIntervalRef.current = setInterval(tick, 1000);
    } else {
      clear();
    }
    return clear;
  }, [tick, ticking]);

  console.log(timeLeft);
  console.log(ticking);
  const dispatch = useDispatch();

  const TimerSwitcher = () => {
    return (
      <Flex flexDirection="row" mb={2} gap={5} justifyContent="space-between">
        <ModeSwitcherButton
          onClick={setActiveMode}
          text={'Session'}
          mode={'session'}
        />
        <ModeSwitcherButton
          onClick={setActiveMode}
          text={'Short Break'}
          mode={'short_break'}
        />
        <ModeSwitcherButton
          onClick={setActiveMode}
          text={'Long Break'}
          mode={'long_break'}
        />
      </Flex>
    );
  };

  const Countdown = () => {
    return (
      <Flex justifyContent="center" mb={5} fontSize={96}>
        <Box
          color={countdownFontColor}
          letterSpacing="1rem"
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

  const TimerToggleButton = () => {
    return (
      <Button
        onClick={setTickingHandler}
        fontSize={24}
        padding={10}
        letterSpacing={10}
        textAlign="center"
        borderRadius={8}
        size="lg"
      >
        START
      </Button>
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
      <TimerSwitcher />
      <Countdown />
      <TimerToggleButton />
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
