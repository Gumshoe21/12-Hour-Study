import { createSlice, isAnyOf, addCase } from '@reduxjs/toolkit';
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: null,
    loading: true,
    user: null
  },
  reducers: {
    register(state, action) {
      state.isAuthenticated = true;
      state.loading = false;
      state.user = action.payload;
    },
    login(state, action) {
      state.isAuthenticated = true;
      state.loading = false;
      state.user = action.payload;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.loading = false;
      state.user = null;
    },
    getUser(state, action) {
      state.isAuthenticated = true;
      state.loading = false;
      state.user = action.payload;
    },
    updateUser(state, action) {
      state.user.socials.twitter.url =
        action.payload.data.data.socials.twitter.url;

      state.user.socials.github.url =
        action.payload.data.data.socials.github.url;
    }
  }
});

export default authSlice;
