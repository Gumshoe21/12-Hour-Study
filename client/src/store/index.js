import { configureStore } from '@reduxjs/toolkit';

import authSlice from './slices/auth';
import timerSlice from './slices/timer';
import reportSlice from './slices/report';
const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    timer: timerSlice.reducer,
    report: reportSlice.reducer
  }
});
export default store;
