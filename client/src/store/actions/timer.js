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
