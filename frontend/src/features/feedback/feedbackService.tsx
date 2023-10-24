// This file is for making http requests and sending the data back, and setting any data in local storage
import axios from "axios";

const FEEDBACK_URL = process.env.REACT_APP_URL_FEEDBACK;

// Create new feedback
const createFeedback = async (feedbackData: object) => {
  if (FEEDBACK_URL) {
    const response = await axios.post(FEEDBACK_URL, feedbackData);

    return response.data;
  }
};

const goalService = {
  createFeedback,
};
export default goalService;
