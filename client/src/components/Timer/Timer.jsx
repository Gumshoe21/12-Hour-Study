import React, { useState, useCallback, useEffect, useRef } from 'react'

import { Box } from '@chakra-ui/react'
import { connect, useDispatch } from 'react-redux'

import timerSlice from '../../store/slices/timer'
import { updateReport } from './../../store/actions/report'
import { updateInstances } from './../../store/actions/report'
import { tickingSound, buttonSound } from './../../utils/audioPlayer.js'
import Countdown from './Countdown'
import ProgressBar from './ProgressBar'
import Round from './Round'
import SwitchTimer from './SwitchTimer.js/SwitchTimer'
import TimerBox from './TimerBox'
import TimerToggleButton from './TimerToggleButton'

const Timer = ({ timer, auth }) => {
  const { setTicking, clearProgress, setActiveMode, incrementRound, resetRound, incrementProgress, setInstanceTime } = timerSlice.actions
  const dispatch = useDispatch()
  let activeMode = timer.modes[timer.activeMode]
  const { id, name, length } = activeMode
  const tickingIntervalRef = useRef(null)
  const [timeLeft, setTimeLeft] = useState(length * 60)
  const { instanceTime, progress } = timer
  const timerDuration = activeMode.length * 60
  const instanceTimeRef = useRef(instanceTime)

  useEffect(() => {
    instanceTimeRef.current = instanceTime
  }, [instanceTime])

  // Mute sounds based on tickingSoundMuted state .
  useEffect(
    function muteSounds() {
      tickingSound.mute(timer.tickingSoundMuted)
      buttonSound.mute(timer.buttonSoundMuted)
    },
    [timer.tickingSoundMuted]
  )

  // Stops tickingSound if timer isn't ticking.
  useEffect(
    function stopTickingSound() {
      if (!timer.ticking) {
        tickingSound.stop()
      }
    },
    [timer.ticking]
  )

  // Sets the tickingSoundVolume when the volume slider changes.
  useEffect(
    function onTickingSoundVolumeChanged() {
      tickingSound.setVolume(timer.tickingSoundVolume)
    },
    [timer.tickingSoundVolume]
  )

  // Updates the timeLeft state when the active mode is changed.
  useEffect(
    function updateActiveModeLength() {
      setTimeLeft((timeLeft) => length * 60)
    },
    [length]
  )

  // Updates report instances if the timer is active when the component unmounts.
  useEffect(function onLeaveDashboard() {
    return function cleanUp() {
      if (!tickingSound.paused) tickingSound.stop()
      dispatch(setTicking(false))

      if (true) {
        dispatch(updateInstances({ id, instanceTime, auth }))
      }
    }
  }, [])

  // Switches timer mode when a new timer mode is selected and confirmed in the modal.
  const switchTimerMode = async (e) => {
    if (!tickingSound.paused) tickingSound.stop()
    dispatch(setTicking(false))

    if (instanceTime > 0) {
      dispatch(updateInstances({ id, instanceTime, auth }))
      dispatch(setInstanceTime(0))
    }

    dispatch(clearProgress())
    dispatch(setActiveMode(e.target.value))
    setTimeLeft(timer.modes[e.target.value].length * 60)
  }

  useEffect(
    function onTimerComplete() {
      if (timeLeft === 0) {
        dispatch(updateInstances({ id, instanceTime, auth }))
        dispatch(setInstanceTime(0))
        dispatch(updateReport({ auth, id, name, length, progress }))
        dispatch(clearProgress())
        if (timer.activeMode === 'session' && timer.round === timer.longBreakInterval) {
          dispatch(setActiveMode(`longBreak`))
          setTimeLeft(timer.modes[`longBreak`].length * 60)
          dispatch(incrementRound())
        } else if (timer.activeMode === 'session' && timer.round < timer.longBreakInterval && timer.round !== timer.longBreakInterval - 1) {
          dispatch(setActiveMode(`shortBreak`))
          setTimeLeft(timer.modes[`shortBreak`].length * 60)
          dispatch(incrementRound())
        } else if (timer.activeMode === 'session' && timer.round === timer.longBreakInterval - 1) {
          dispatch(setActiveMode(`longBreak`))
          setTimeLeft(timer.modes[`longBreak`].length * 60)
          dispatch(incrementRound())
        } else if (timer.activeMode === 'shortBreak') {
          dispatch(setActiveMode(`session`))
          setTimeLeft(timer.modes[`session`].length * 60)
        } else if (timer.activeMode === 'longBreak') {
          dispatch(setActiveMode(`session`))
          dispatch(resetRound())
        }
      }
    },
    [timeLeft]
  )

  /* Ticking-related functions. */

  const setTickingHandler = () => {
    tickingSound.toggle()
    dispatch(setTicking(timer.ticking === true ? false : true))
    buttonSound.play()
    dispatch(setInstanceTime(0))
    if (instanceTime > 0) {
      dispatch(updateInstances({ id, instanceTime, auth }))
    }
  }

  const clearTimer = () => {
    clearInterval(tickingIntervalRef.current)
    tickingIntervalRef.current = null
  }

  const tick = useCallback(() => {
    if (timeLeft > 0) {
      setTimeLeft(timeLeft - 1)
      dispatch(incrementProgress())
      dispatch(setInstanceTime(instanceTime + 1))
    }
    if (timeLeft < 1) {
      dispatch(setTicking(false))
      clearTimer()
    }
    if (timer.ticking === false) {
      dispatch(setInstanceTime(0))
    }
  }, [timer.ticking, timeLeft, dispatch, setTicking, timer.modes[timer.activeMode].length])

  useEffect(
    function setTickingInterval() {
      if (timer.ticking) {
        tickingIntervalRef.current = setInterval(tick, 1000)
      } else {
        clearTimer()
      }
      return clearTimer
    },
    [tick, timer.ticking]
  )

  return (
    <TimerBox>
      <SwitchTimer onClick={switchTimerMode} />
      <Box>{!isNaN(timer.modes[timer.activeMode].length) && <Countdown timeLeft={timeLeft} />}</Box>
      <ProgressBar max={timerDuration} value={progress} />
      <Round round={timer.round} interval={timer.longBreakInterval} />
      <TimerToggleButton onClick={setTickingHandler} text={timer.ticking ? 'STOP' : 'START'} />
    </TimerBox>
  )
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  timer: state.timer,
})

export default connect(mapStateToProps)(Timer)
