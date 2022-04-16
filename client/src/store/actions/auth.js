import axios from 'axios';
import authSlice from '../slices/auth';

import timerSlice from '../slices/timer';
export const APIVersion = 'v1';
// Load User
export const loadUser = () => async (dispatch) => {
  // if the auth token is in the user's localStorage, set the auth token to that
  try {
    const res = await axios.get(`/api/${APIVersion}/users/me`);
    dispatch(authSlice.actions.userLoaded(res.data));
  } catch (err) {
    console.log(err);
  }
};

export const login =
  ({ email, password }) =>
  async (dispatch) => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const body = JSON.stringify({ email, password });
    try {
      const res = await axios.post(
        `/api/${APIVersion}/users/login`,
        body,
        config
      );
      dispatch(authSlice.actions.login(res.data));
    } catch (err) {
      console.log(err.response);
    }
  };

export const register =
  ({ email, password, passwordConfirm }) =>
  async (dispatch) => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const body = JSON.stringify({ email, password, passwordConfirm });
    try {
      const res = await axios.post(
        `/api/${APIVersion}/users/signup`,
        body,
        config
      );
      await dispatch(authSlice.actions.register(res.data));
      dispatch(timerSlice.actions.loadUserTimer(res.data));
    } catch (err) {}
  };

export const logout = () => async (dispatch) => {
  const res = await axios.get(`/api/${APIVersion}/users/logout`);
  dispatch(authSlice.actions.logout());
};
