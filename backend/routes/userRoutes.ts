import * as express from "express";
// was not able to add const express... b/c already called on server.ts, this import method works and clears error

const router = express.Router()
const {registerUser, loginUser, getMe} = require('../controllers/userController')
const {protect} = require ("../middleware/authMiddleware")

router.post('/', registerUser)
router.post('/login', loginUser)
router.get('/me', protect, getMe)


module.exports = router