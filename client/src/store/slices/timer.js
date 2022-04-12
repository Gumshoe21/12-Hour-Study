import { createSlice } from '@reduxjs/toolkit';

const timerSlice = createSlice({
  name: 'timer',
  initialState: {
    activeMode: 'session',
    longBreakInterval: 4,
    round: 0,
    ticking: false,
    modes: {
      session: {
        name: 'Session',
        length: 30,
        progress: 0
      },
      shortBreak: {
        name: 'Short Break',
        length: 5,
        progress: 0
      },
      longBreak: {
        name: 'Long Break',
        length: 15,
        progress: 0
      }
    }
  },
  reducers: {
    updateTimer(state, action) {
      state.modes.session.length = action.payload.sessionRef;
      state.modes.shortBreak.length = action.payload.shortBreakRef;
      state.modes.longBreak.length = action.payload.longBreakRef;
      state.longBreakInterval = action.payload.LongBreakInterval;
    },
    loadTimer(state, action) {
      state.modes.session.length = action.payload.modes.session.length;
      state.modes.shortBreak.length = action.payload.modes.shortBreak.length;
      state.modes.longBreak.length = action.payload.modes.longBreak.length;
      state.longBreakInterval = action.payload.longBreakInterval;
    },
    setActiveMode(state, action) {
      state.activeMode = action.payload;
    },
    setTicking(state, action) {
      state.ticking = action.payload;
    },
    setLongBreakInterval(state, action) {
      state.longBreakInterval = action.payload.longBreakInterval;
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
      state.modes[state.activeMode].progress += 1;
    },
    clearProgress(state, action) {
      state.modes[state.activeMode].progress = 0;
    }
  }
});

export default timerSlice;
