import { configureStore } from '@reduxjs/toolkit';

import authSlice from './slices/auth';
import reportSlice from './slices/report';
import timerSlice from './slices/timer';
const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    timer: timerSlice.reducer,
    report: reportSlice.reducer
  }
});
export default store;
