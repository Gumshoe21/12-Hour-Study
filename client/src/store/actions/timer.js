import axios from 'axios';
import timerSlice from '../slices/timer';
import { APIVERSION } from './../../constants/index';

export const getUserTimer =
  ({ user }) =>
  async (dispatch) => {
    try {
      const res = await axios.get(
        `/api/${APIVERSION}/timers/getCurrentUserTimer`
      );
      await dispatch(timerSlice.actions.getTimer(res.data));
      console.log(res.data);
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
      }
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
        `/api/v1/timers/${auth.user.timer._id}`,
        body,
        config
      );
      const res = await axios.get(
        `/api/${APIVERSION}/timers/getCurrentUserTimer`
      );
      dispatch(timerSlice.actions.updateTimer(res.data));
    } catch (err) {
      console.log(err);
    }
  };
