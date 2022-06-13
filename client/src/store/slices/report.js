import { createSlice } from '@reduxjs/toolkit';
const reportSlice = createSlice({
  name: 'report',
  initialState: {
    loading: true,
    reports: null
  },
  reducers: {
    getReports(state, action) {
      state.loading = false;
      state.reports = action.payload;
    }
  }
});

export default reportSlice;
