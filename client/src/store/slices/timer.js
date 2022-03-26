import { createSlice } from '@reduxjs/toolkit';

const timerSlice = createSlice({
  name: 'timer',
  initialState: {
    active_mode: 'session',
    long_break_interval: 4,
    modes: {
      session: {
        name: 'Session',
        length: 30
      },
      short_break: {
        name: 'Short Break',
        length: 5
      },
      long_break: {
        name: 'Long Break',
        length: 15
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
      state.timeLeft = state.timeLeft - 1;
    }
  }
});

export default timerSlice;
