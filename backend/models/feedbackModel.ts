import { Schema, model, Types } from "mongoose";

const feedbackSchema = new Schema(
  {
    feedback: {
      type: String,
      required: [true, "please add a text value"],
    },
  },
  {
    timestamps: true,
    // Will create an updated at and created at field automatically
  }
);

export default model("Feedback", feedbackSchema);
