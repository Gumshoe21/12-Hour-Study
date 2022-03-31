import { createSlice } from '@reduxjs/toolkit';

const timerSlice = createSlice({
  name: 'timer',
  initialState: {
    active_mode: 'session',
    long_break_interval: 4,
    round: 0,
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
    loadTimer(state, action) {},
    setActiveMode(state, action) {
      state.active_mode = action.payload;
    },
    setLongBreakInterval(state, action) {
      state.long_break_interval = action.payload.long_break_interval;
    },
    setTicking(state, action) {
      state.ticking = action.payload;
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
