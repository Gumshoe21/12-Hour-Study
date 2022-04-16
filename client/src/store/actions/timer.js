import axios from 'axios';
import timerSlice from '../slices/timer';

export const loadUserTimer =
  ({ user }) =>
  async (dispatch) => {
    const APIVersion = 'v1';

    try {
      const res = await axios.get(
        `/api/${APIVersion}/timers/getCurrentUserTimer`
      );
      await dispatch(timerSlice.actions.loadTimer(res.data));
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
      const res = await axios.patch(
        `/api/v1/timers/${auth.user.timer._id}`,
        body,
        config
      );
      dispatch(timerSlice.actions.updateTimer(res.data));
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };
