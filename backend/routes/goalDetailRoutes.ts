import * as express from "express";

const router = express.Router();

import GDC from "../controllers/goalDetailController.ts";

import aM from "../middleware/authMiddleware.ts";

router.route("/:userId/:goalId").get(aM.protect, GDC.getGoalDetails);

router.route("/:userId").post(aM.protect, GDC.setGoalDetails);

router.route("/:goalDetailId").get(aM.protect, GDC.getSingleGoalDetail);
// router.route("/:goalDetailId").get(aM.protect, GDC.getSingleGoalDetail).delete(aM.protect, GDC.deleteGoal)
// .put(aM.protect, GDC.updateGoalDetail)

export default router;
