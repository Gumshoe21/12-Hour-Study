import { configureStore } from '@reduxjs/toolkit';

import authSlice from './slices/auth';
import timerSlice from './slices/timer';
const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    timer: timerSlice.reducer
  }
});
export default store;
