import axios from 'axios';
import reportSlice from '../slices/report';
import { APIVERSION } from './../../constants/index';

export const getReports = () => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    },
    withCredentials: true,
    credentials: 'include'
  };
  try {
    const req = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/${APIVERSION}/reports/getCurrentUserReports?modes=session`,
      config
    );
    dispatch(reportSlice.actions.getReports(req.data));
  } catch (err) {
    console.log(err);
  }
};
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
        user_id: auth.user._id,
        timezone: auth.user.timezone
      });

      const req = await axios.patch(
        `${process.env.REACT_APP_API_URL}/api/v1/reports/updateReport`,
        body,
        config
      );
    };

export const updateInstances =
  ({ instanceTime, id, auth }) =>
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
        timeAccumulated: instanceTime,

        user_id: auth.user._id,
        timezone: auth.user.timezone
      });

      try {
        const req = await axios.patch(
          `${process.env.REACT_APP_API_URL}/api/v1/reports/updateReportInstances`,
          body,
          config
        );
      } catch (err) { }
    };
