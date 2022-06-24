import { createSlice } from '@reduxjs/toolkit';
const reportSlice = createSlice({
  name: 'report',
  initialState: {
    loading: true,
    reports: {
      barGraph: null,
      timeRange: null,
    }
  },
  reducers: {
    getReports(state, action) {
      state.loading = false;
      state.reports.barGraph = action.payload.barGraph;
      state.reports.timeRange = action.payload.timeRange;
    }
  }
});

export default reportSlice;
