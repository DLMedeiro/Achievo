import * as express from "express";
// was not able to add const express... b/c already called on server.ts, this import method works and clears error

const router = express.Router()
// const {registerUser, loginUser, getMe} = require('../controllers/userController')
import uC from '../controllers/userController.ts'
// const {protect} = require ("../middleware/authMiddleware")
import aM from "../middleware/authMiddleware.ts"

router.post('/', uC.registerUser)
router.post('/login', uC.loginUser)
router.get('/me', aM.protect, uC.getMe)


// module.exports = router
export default router