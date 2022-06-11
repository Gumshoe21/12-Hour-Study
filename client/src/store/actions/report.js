import axios from 'axios';
import reportSlice from '../slices/auth';
import { APIVERSION } from './../../constants/index';

export const updateReport =
  ({ auth, id, name, length, progress }) =>
  async (dispatch) => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: true,
      credentials: 'include'
    };
    const body = JSON.stringify({
      id,
      name,
      length,
      progress,
      user_id: auth.user._id
    });

    const req = await axios.patch(
      `${process.env.REACT_APP_API_URL}/api/v1/reports/updateReport`,
      body,
      config
    );
  };

export const updateTimerInstances =
  ({ instanceTime }) =>
  async (dispatch) => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: true,
      credentials: 'include'
    };

    const body = JSON.stringify({
      createdAt: new Date(Date.now - instanceTime * 1000),
      timeAccumulated: instanceTime,
      stoppedAt: new Date(Date.now)
    });

    try {
      const req = await axios.patch(
        `${process.env.REACT_APP_API_URL}/api/v1/reports/updateInstances`,
        body,
        config
      );
    } catch (err) {}
  };
