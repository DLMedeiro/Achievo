// This file is for making http requests and sending the data back, and setting any data in local storage
import axios from "axios";

const API_URL = process.env.REACT_APP_URL_DATA;

// Get single goal detail
const getSingleGoalDetail = async (id: string, user: any) => {
  // token that is stored is only the token, and need to change to a Bearer token
  //   * Not able to access token without setting user to any
  const config = {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };
  const response = await axios.get(`${API_URL}/api/goalDetails/${id}`, config);
  return response.data;
};

// Get all details for a goal
const getGoalDetails = async (
  user: {
    email: string;
    name: string;
    token: string;
    _id: string;
  },
  goalId: string
) => {
  // token that is stored is only the token, and need to change to a Bearer token
  const config = {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };
  if (API_URL) {
    const response = await axios.get(
      `${API_URL}/api/goalDetails/${user._id}/${goalId}`,
      config
    );

    return response.data;
  }
};

// Create a new detail record
const createGoalDetails = async (goalData: object, user: any) => {
  const config = {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };

  if (API_URL) {
    const response = await axios.post(
      `${API_URL}/api/goalDetails/${user._id}`,
      goalData,
      config
    );

    return response.data;
  }
};

const goalDetailService = {
  getSingleGoalDetail,
  getGoalDetails,
  createGoalDetails,
};
export default goalDetailService;
