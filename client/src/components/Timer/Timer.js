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
import { updateReport } from './../../store/actions/report';

// when the timer is switched, prompt "are you sure? Reports won't count rest of time left." if sure then add the remaining time left to today's report before clearProgress()
// if you try to exit window or switch pages, ask if sure then add remaining time b4 clearProgress()
// once a timer progress = 0, increment modes completed and add the time to reports. you only icnrement modes completed if itmer progress is 0, not on switching timer or exit page. if exit page or switch timer then timer is NOT complete, doesn't count as full timer completion.
// bug where switching to profile doesn't prompt to finish timer. timer still runs and ticking sound still sounds.
//

/* 
  Sounds
*/
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

  let activeMode = timer.modes[timer.activeMode];
  const { id, name, length, progress } = activeMode;

  const tickingIntervalRef = useRef(null);

  const [timeLeft, setTimeLeft] = useState(activeMode.length * 60);
  // gotta udpate the reports before this fires
  const updateActiveModeLength = useEffect(() => {
    setTimeLeft((timeLeft) => 2);
  }, [activeMode.length]);

  // update reports before this fires
  const clearTimer = () => {
    clearInterval(tickingIntervalRef.current);
    tickingIntervalRef.current = null;
  };
  /////////////////////////////////////////////////
  const switchTimerMode = async (e) => {
    if (!tickingSound.paused) tickingSound.stop();
    dispatch(setTicking(false));
    /* 
    
    here's the ticket

    */
    dispatch(clearProgress());
    dispatch(setActiveMode(e.target.value));
    setTimeLeft(timer.modes[e.target.value].length * 60);
  };

  const onNoTimeLeft = async (mode, reset = null) => {
    dispatch(setActiveMode(`${mode}`));
    setTimeLeft(timer.modes[`${mode}`].length * 60);
    reset ? dispatch(resetRound()) : dispatch(incrementRound());
  };

  const timerComplete = useEffect(() => {
    if (timeLeft === 0) {
      // 'progress' is given as an argument so that we may update 'totalSessionTime' in today's report; 'timer.activeMode' is given to update the 'modeCompletions' array for that specific mode given. We will also need 'timer.activeMode' so we can update the 'sessionInstances' array if the mode given is 'session'.
      dispatch(updateReport({ auth, id, name, length, progress }));
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

  const timerDuration = activeMode.length * 60;

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
