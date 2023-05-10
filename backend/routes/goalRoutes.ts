import * as express from "express";
// was not able to add const express... b/c already called on server.ts, this import method works and clears error

const router = express.Router()

const {getGoals, setGoal, updateGoal, deleteGoal} = require('../controllers/goalController')

const {protect} = require ("../middleware/authMiddleware")

router.route('/').get(protect, getGoals).post(protect, setGoal)
// Above code simplifies the code below
// router.get('/', getGoals)
// router.post('/', setGoal)

router.route('/:id').delete(protect, deleteGoal).put( protect, updateGoal)
// Above code simplifies the code below
// router.put('/:id', updateGoal)
// router.delete('/:id', deleteGoal)

module.exports = router