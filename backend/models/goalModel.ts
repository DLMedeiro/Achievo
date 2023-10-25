import { Schema, model, Types } from "mongoose";

const goalSchema = new Schema(
  {
    user: {
      type: Types.ObjectId,
      required: true,
      ref: "User",
      // ref the User model to identify which model the ObjectID pertains to
    },
    activity: {
      type: String,
      required: [true, "please add a text value"],
    },
    start: {
      type: String,
      required: [true, "please add a text value"],
    },
    end: {
      type: String,
      required: [true, "please add a text value"],
    },
    target: {
      type: Number,
      required: [true, "please add a number value"],
    },
    progress: {
      type: Number,
    },
  },
  {
    timestamps: true,
    // Will create an updated at and created at field automatically
  }
);

export default model("Goal", goalSchema);
