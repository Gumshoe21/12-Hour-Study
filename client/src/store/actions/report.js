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
    /*
    try {
      const newReport = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/v1/reports/createReport`,
        body,
        config
      );
    } catch (err) {}
    try {
      */
    const req = await axios.patch(
      `${process.env.REACT_APP_API_URL}/api/v1/reports/updateReport`,
      body,
      config
    );
    /*
    } catch (err) {}
    */
  };
