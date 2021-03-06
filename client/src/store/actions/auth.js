import axios from 'axios';
import authSlice from '../slices/auth';
import { APIVERSION } from './../../constants/index';

// Load User
export const getUser = () => async (dispatch) => {
  // if the auth token is in the user's localStorage, set the auth token to that
  const config = {
    headers: {
      'Content-Type': 'application/json'
      //
    },
    withCredentials: true,
    credentials: 'include'
  };
  try {
    const req = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/${APIVERSION}/users/me`,
      config
    );
    dispatch(authSlice.actions.getUser(req.data));
  } catch (err) {}
};

export const login =
  ({ email, password }) =>
  async (dispatch) => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: true,
      credentials: 'include'
    };
    const body = JSON.stringify({ email, password });
    try {
      const req = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/${APIVERSION}/users/login`,
        body,
        config
      );
      dispatch(authSlice.actions.login(req.data.user));
    } catch (err) {
      dispatch(authSlice.actions.loginFail());
    }
  };
//
export const logout = () => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
      //
    },
    withCredentials: true,
    credentials: 'include'
  };
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/${APIVERSION}/users/logout`,
      config
    );
    dispatch(authSlice.actions.logout());
  } catch (err) {}
};

export const register =
  ({ email, password, passwordConfirm }) =>
  async (dispatch) => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: true,
      credentials: 'include'
    };
    const body = JSON.stringify({ email, password, passwordConfirm });
    try {
      const req = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/${APIVERSION}/users/signup`,
        body,
        config
      );
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/${APIVERSION}/users/me`
      );
      await dispatch(authSlice.actions.register(res.data));
    } catch (err) {}
  };

export const updateUser =
  ({ auth, twitter, github }) =>
  async (dispatch) => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: true,
      credentials: 'include'
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
        `${process.env.REACT_APP_API_URL}/api/${APIVERSION}/users/${auth.user._id}`,
        body,
        config
      );
      dispatch(authSlice.actions.updateUser(res.data));
    } catch (err) {}
  };

export const forgotPassword =
  ({ email }) =>
  async (dispatch) => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: true,
      credentials: 'include'
    };
    const API_URL = process.env.REACT_APP_API_URL;
    const body = JSON.stringify({ email, API_URL });
    try {
      const req = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/${APIVERSION}/users/forgotPassword`,
        body,
        config
      );
      await dispatch(authSlice.actions.emailNotFound(false));
    } catch (err) {
      await dispatch(authSlice.actions.emailNotFound(true));
    }
  };

export const resetPassword =
  ({ password, passwordConfirm, token }) =>
  async (dispatch) => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    let body = JSON.stringify({ password, passwordConfirm });
    try {
      const req = await axios.patch(
        `/api/${APIVERSION}/users/resetPassword/${token}`,
        body,
        config
      );
      const email = await req.data.user.email;
      body = await JSON.stringify({ password, email });
      const login = await axios.post(
        `/api/${APIVERSION}/users/login`,
        body,
        config
      );
      const res = await axios.get(`/api/${APIVERSION}/users/me`);
      await dispatch(authSlice.actions.login(res.data));
    } catch (err) {}
  };
