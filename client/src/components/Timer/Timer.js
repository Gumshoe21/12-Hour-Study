import React, { useState, useCallback, useEffect, useRef } from 'react';

import { connect, useDispatch } from 'react-redux';

import PropTypes from 'prop-types';

import timerSlice from '../../store/slices/timer';

import SwitchTimer from './SwitchTimer.js/SwitchTimer';
import TimerToggleButton from './TimerToggleButton';
import TimerBox from './TimerBox';
import ProgressBar from './ProgressBar';
import Round from './Round';
import Countdown from './Countdown';
import { Box } from '@chakra-ui/react';

import sound from './../../utils/audioPlayer.js';
const tickingSound = sound('./../../../audio/tick.m4a', undefined, true);
const buttonSound = sound(
  './../../../audio/button_click.mp3',
  undefined,
  false
);
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
  );

  const timerActiveModeLength = [timer.modes[timer.activeMode].length];
  // gotta udpate the reports before this fires
  const updateActiveModeLength = useEffect(() => {
    setTimeLeft((timeLeft) => timer.modes[timer.activeMode].length * 60);
  }, [timerActiveModeLength, timer.activeMode, timer.modes]);

  // update reports before this fires
  const clearTimer = () => {
    clearInterval(tickingIntervalRef.current);
    tickingIntervalRef.current = null;
  };

  const switchTimerMode = (e) => {
    if (!tickingSound.paused) tickingSound.stop();
    dispatch(setTicking(false));
    /* 
    
    here's the ticket

    */
    dispatch(clearProgress());
    dispatch(setActiveMode(e.target.value));
    setTimeLeft(timer.modes[e.target.value].length * 60);
  };

  const onNoTimeLeft = (mode, reset = null) => {
    dispatch(setActiveMode(`${mode}`));
    setTimeLeft(timer.modes[`${mode}`].length * 60);
    reset ? dispatch(resetRound()) : dispatch(incrementRound());
  };

  const timerComplete = useEffect(() => {
    if (timeLeft === 0) {
      // update reports
      dispatch(clearProgress());
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

  const setTickingHandler = async () => {
    dispatch(setTicking(timer.ticking === true ? false : true));

    buttonSound.play();
    if (timer.ticking) {
      tickingSound.stop();
    } else if (!timer.ticking) {
      await new Promise((resolve) => setTimeout(resolve, 1000)).then(() => {
        tickingSound.stop();
        tickingSound.play();
      });
    }
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
      console.log(timer.modes[timer.activeMode].progress);
    }
  }, [
    tick,
    dispatch,
    incrementProgress,
    timer.ticking,
    timer.activeMode,
    timer.modes
  ]);

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
