import asyncHandler from "express-async-handler";

import Feedback from "../models/feedbackModel.ts";

// .env file was not being read prior to bringing this in
import dotenv from "dotenv";
dotenv.config();

// Description: Add feedback to database
// Route: POST api/feedback
// Access: Public
// Have to wrap the async functions with asyncHandler to handle exceptions
const setFeedback = asyncHandler(async (req: any, res: any) => {
  if (!req.body.feedback) {
    // res.status(400).json({message: "Please add a text value"}) => remove and add express handler
    res.status(400);
    throw new Error("Please add a text value");
    // default error gives an HTML page in response to the error, to change default express error handler => add middleware
  }

  const feedback = await Feedback.create({
    feedback: req.body.feedback,
  });

  res.status(200).json(feedback);
});

export default { setFeedback };
