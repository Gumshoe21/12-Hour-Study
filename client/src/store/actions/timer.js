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
      dispatch(timerSlice.actions.loadTimer(res.data));
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

export const updateTimer =
  ({ session, short_break, long_break, long_break_interval, id }) =>
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
        }
      }
    });
    try {
      const res = await axios.patch(`/api/v1/timers/${id}`, body, config);
      // dispatch(timerSlice.actions.updateTimer(res.data));
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };
