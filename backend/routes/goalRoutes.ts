import * as express from "express";
// was not able to add const express... b/c already called on server.ts, this import method works and clears error

const router = express.Router()

const {getGoals, setGoal, updateGoal, deleteGoal} = require('../controllers/goalController')

router.route('/').get( getGoals).post(setGoal)
// Above code simplifies the code below
// router.get('/', getGoals)
// router.post('/', setGoal)

router.route('/:id').delete( deleteGoal).put( updateGoal)
// Above code simplifies the code below
// router.put('/:id', updateGoal)
// router.delete('/:id', deleteGoal)

module.exports = router