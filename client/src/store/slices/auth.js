import { createSlice } from '@reduxjs/toolkit';
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: false,
    loginFailed: null,
    emailNotFound: null,
    loading: false,
    user: null
  },
  reducers: {
    register(state, action) {
      state.isAuthenticated = true;
      state.loading = false;
      state.user = action.payload;
    },
    login(state, action) {
      state.loginFailed = false;
      state.isAuthenticated = true;
      state.loading = false;
      state.user = action.payload;
    },
    loginFail(state, action) {
      state.loginFailed = true;
    },
    emailNotFound(state, action) {
      state.emailNotFound = action.payload;
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
