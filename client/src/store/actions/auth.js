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
      const req = await axios.post(
        `/api/${APIVersion}/users/login`,
        body,
        config
      );

      const res = await axios.get(`/api/${APIVersion}/users/me`);
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
      const req = await axios.post(
        `/api/${APIVersion}/users/signup`,
        body,
        config
      );
      const res = await axios.get(`/api/${APIVersion}/users/me`);
      await dispatch(authSlice.actions.register(res.data));
    } catch (err) {}
  };

export const logout = () => async (dispatch) => {
  const res = await axios.get(`/api/${APIVersion}/users/logout`);
  dispatch(authSlice.actions.logout());
};

export const updateUser =
  ({ auth, twitter, github }) =>
  async (dispatch) => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const body = JSON.stringify({
      socials: {
        twitter: {
          url: twitter
        },
        github: {
          url: github
        }
      }
    });
    try {
      const res = await axios.patch(
        `api/${APIVersion}/users/${auth.user._id}`,
        body,
        config
      );
      dispatch(authSlice.actions.updateUser(res.data));
    } catch (err) {
      console.log(err);
    }
  };
