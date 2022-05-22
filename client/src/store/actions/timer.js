import axios from 'axios';
import timerSlice from '../slices/timer';
import { APIVERSION } from './../../constants/index';

export const getUserTimer =
  ({ user }) =>
  async (dispatch) => {
    console.log(user);
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/${APIVERSION}/timers/getCurrentUserTimer`,
        {
          withCredentials: true,
          credentials: 'include'
        }
      );
      dispatch(timerSlice.actions.getTimer(res.data));
    } catch (err) {
      console.log(err);
    }
  };

export const updateTimer =
  ({ auth, session, shortBreak, longBreak, longBreakInterval }) =>
  async (dispatch) => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: true,
      credentials: 'include'
    };
    const body = JSON.stringify({
      modes: {
        session: {
          length: session
        },
        shortBreak: {
          length: shortBreak
        },
        longBreak: {
          length: longBreak
        }
      },
      longBreakInterval: longBreakInterval
    });
    try {
      const req = await axios.patch(
        `${process.env.REACT_APP_API_URL}/api/v1/timers/${auth.user.timer._id}`,
        body,
        config
      );
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/${APIVERSION}/timers/getCurrentUserTimer`,
        { withCredentials: true, credentials: 'include' }
      );
      dispatch(timerSlice.actions.updateTimer(res.data));
    } catch (err) {
      console.log(err);
    }
  };
