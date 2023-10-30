// When interacting the the database, the response is returned in a promise -> therefore need to add async and await to these functions
// async / await => use Try / Catch
// Express Async Handler => skip try/catch and use the error handler instead

import asyncHandler from "express-async-handler";
import GoalDetail from "../models/goalDetailModel.ts";
// Has the mongoose methods to use in the database

// Desc: Get single detail
// Route: GET /api/goalDetails/:goalDetailId
// Access: Private
const getSingleGoalDetail = asyncHandler(async (req: any, res: any) => {
  const goalDetail = await GoalDetail.findById(req.params.goalDetailId);

  // shows in terminal when sending a postman request

  res.status(200).json(goalDetail);
});

// Desc: Get all goal details
// Route: GET /api/goalDetails/:userId/:goalId
// Access: Private
const getGoalDetails = asyncHandler(async (req: any, res: any) => {
  const query = {
    user: req.params.userId,
    goal: req.params.goalId,
  };
  const goalDetails = await GoalDetail.find(query);

  res.status(200).json(goalDetails);
});

// Desc: Set goal details
// Route: POST /api/goalDetails/:userId/:goalId
// Access: Private
const setGoalDetails = asyncHandler(async (req: any, res: any) => {
  if (!req.params.userId || !req.body) {
    res.status(400);
    throw new Error("Id error");
  }

  const detail = await GoalDetail.create({
    user: req.params.userId,
    goal: req.body.goalData.goal,
    progressChange: req.body.goalData.progressChange,
    date: req.body.goalData.date,
  });

  res.status(200).json(detail);
});
// ***********

// *************
// Desc: Update goals
// Route: PUT /api/goals/:id
// Access: Private
// const updateGoalDetail = asyncHandler(async (req: any, res: any) => {
//   const goal = await Goal.findById(req.params.id);
//   if (!goal) {
//     res.status(400);
//     throw new Error("Goal not found");
//   } else {
//     if (!req.body.userId) {
//       res.status(401);
//       throw new Error("User not found");
//     }

//     if (goal.user.toString() !== req.body.userId) {
//       res.status(401);
//       throw new Error("User Not Authorized");
//     }

//     const updatedGoal = await Goal.findByIdAndUpdate(
//       req.params.id,
//       req.body.goal,
//       { new: true }
//     );

//     if (updatedGoal) {
//       let goals = await Goal.find({ user: req.body.userId });
//       res.status(200).json(goals);
//     }
//   }
// });
// *********

// ************
// Desc: Delete goals
// Route: DELETE /api/goals/:id
// Access: Private
// const deleteGoal = asyncHandler(async (req: any, res: any) => {
//   const goal = await Goal.findById(req.params.id);

//   if (goal) {
//     // Check for user
//     if (!req.body._id) {
//       res.status(401);
//       throw new Error("User not found");
//     }

//     if (goal.user.toString() !== req.body._id) {
//       res.status(401);
//       throw new Error("User Not Authorized");
//     }

//     if (!goal) {
//       res.status(400);
//       throw new Error("Goal not found");
//     }
//     await goal.deleteOne();

//     res.status(200).json({ id: req.params.id });
//   }
// });
// **************

export default {
  getGoalDetails,
  getSingleGoalDetail,
  setGoalDetails,
};
// export default {
//   getSingleGoal,
//   getGoals,
//   setGoal,
//   updateGoal,
//   deleteGoal,
//   updateProgress,
// };
