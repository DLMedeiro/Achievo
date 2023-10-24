import * as express from "express";
// was not able to add const express... b/c already called on server.ts, this import method works and clears error

const router = express.Router();
// const {registerUser, loginUser, getMe} = require('../controllers/userController')
import fC from "../controllers/feedbackController.ts";

router.post("/", fC.setFeedback);

export default router;
