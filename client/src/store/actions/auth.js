import axios from 'axios';
import authSlice from '../slices/auth';
import { APIVERSION } from './../../constants/index';

// Load User
export const getUser = () => async (dispatch) => {
  // if the auth token is in the user's localStorage, set the auth token to that
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/${APIVERSION}/users/me`
    );
    dispatch(authSlice.actions.getUser(res.data));
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
        `${process.env.REACT_APP_API_URL}/api/${APIVERSION}/users/login`,
        body,
        config
      );
      /*
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/${APIVERSION}/users/me`
      );
      */
      dispatch(authSlice.actions.login(res.data));
    } catch (err) {
      console.log(err.response);
      dispatch(authSlice.actions.loginFail());
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

export const logout = () => async (dispatch) => {
  const res = await axios.get(
    `${process.env.REACT_APP_API_URL}/api/${APIVERSION}/users/logout`
  );
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
        `api/${APIVERSION}/users/${auth.user._id}`,
        body,
        config
      );
      dispatch(authSlice.actions.updateUser(res.data));
    } catch (err) {
      console.log(err);
    }
  };

export const forgotPassword =
  ({ email }) =>
  async (dispatch) => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const body = JSON.stringify({ email });
    try {
      const req = await axios.post(
        `/api/${APIVERSION}/users/forgotPassword`,
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
    } catch (err) {
      console.log(err);
      console.log('hi');
    }
  };
