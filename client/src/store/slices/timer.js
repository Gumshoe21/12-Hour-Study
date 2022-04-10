import { createSlice } from '@reduxjs/toolkit';

const timerSlice = createSlice({
  name: 'timer',
  initialState: {
    active_mode: 'session',
    long_break_interval: 4,
    round: 0,
    ticking: false,
    modes: {
      session: {
        name: 'Session',
        length: 30,
        progress: 0
      },
      short_break: {
        name: 'Short Break',
        length: 5,
        progress: 0
      },
      long_break: {
        name: 'Long Break',
        length: 15,
        progress: 0
      }
    }
  },
  reducers: {
    updateTimer(state, action) {
      state.modes.session.length = action.payload;
      // state.modes.short_break.length = action.payload.shortBreakRef;
      // state.modes.long_break.length = action.payload.longBreakRef;
      // state.long_break_interval = action.payload.setLongBreakInterval;
    },
    loadTimer(state, action) {
      state.modes.session.length = action.payload.modes.session.length;
    },
    setActiveMode(state, action) {
      state.active_mode = action.payload;
    },
    setTicking(state, action) {
      state.ticking = action.payload;
    },
    setLongBreakInterval(state, action) {
      state.long_break_interval = action.payload.long_break_interval;
    },
    setTimeLeft(state, action) {
      state.timeLeft -= 1;
    },
    incrementRound(state, action) {
      state.round += 1;
    },
    resetRound(state, action) {
      state.round = 0;
    },
    incrementProgress(state, action) {
      state.modes[state.active_mode].progress += 1;
    },
    clearProgress(state, action) {
      state.modes[state.active_mode].progress = 0;
    }
  }
});

export default timerSlice;
