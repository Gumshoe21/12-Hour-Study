import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: null,
    loading: true,
    user: null
  },
  reducers: {
    // register
    register(state, action) {
      state.isAuthenticated = true;
      state.loading = false;
      state.user = action.payload;
    },
    registerFail(state, action) {},
    registerSuccess(state, action) {},
    // login
    login(state, action) {
      state.isAuthenticated = true;
      state.loading = false;
      state.user = action.payload;
    },
    loginFail(state, action) {},
    // logout
    logout(state) {
      state.isAuthenticated = false;
      state.loading = false;
      state.user = null;
    },
    // user loaded
    userLoaded(state, action) {
      state.isAuthenticated = true;
      state.loading = false;
      state.user = action.payload;
    }
  }
});

export default authSlice;
