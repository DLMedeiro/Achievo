import * as express from "express";
// was not able to add const express... b/c already called on server.ts, this import method works and clears error

const router = express.Router()

// const {getSingleGoal, getGoals, setGoal, updateGoal, deleteGoal, updateProgress} = require('../controllers/goalController')
import GC from '../controllers/goalController.ts'

// const {protect} = require ("../middleware/authMiddleware")
import aM from "../middleware/authMiddleware.ts"

// router.route('/').post(aM.protect, GC.setGoal)
// Above code simplifies the code below
// router.get('/', getGoals)
// router.post('/', setGoal)
router.route('/user/:id').get(aM.protect, GC.getGoals).post(aM.protect, GC.setGoal)

router.route('/:id').delete(aM.protect, GC.deleteGoal).put( aM.protect, GC.updateGoal).put(aM.protect, GC.updateProgress).get(aM.protect, GC.getSingleGoal)
// Above code simplifies the code below
// router.put('/:id', updateGoal)
// router.delete('/:id', deleteGoal)

router.route('/progress/:id').put(aM.protect, GC.updateProgress)

// module.exports = router
export default router