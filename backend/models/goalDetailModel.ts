import { Schema, model, Types } from "mongoose";

const goalDetailSchema = new Schema(
  {
    user: {
      type: Types.ObjectId,
      required: true,
      ref: "User",
      // ref the User model to identify which model the ObjectID pertains to
    },
    goal: {
      type: Types.ObjectId,
      required: true,
      ref: "Goal",
      // ref the User model to identify which model the ObjectID pertains to
    },
    progressChange: {
      type: Number,
    },
    detail: {
      type: String,
    },
  },
  {
    timestamps: true,
    // Will create an updated at and created at field automatically
  }
);

export default model("GoalDetail", goalDetailSchema);
