// When interacting the the database, the response is returned in a promise -> therefore need to add async and await to these functions
// async / await => use Try / Catch
// Express Async Handler => skip try/catch and use the error handler instead

// const asyncHandler = require('express-async-handler')
import asyncHandler from 'express-async-handler'

const Goal = require('../models/goalModel')
// Has the mongoose methods to use in the database
const User = require('../models/userModel')

// Desc: Get goals
// Route: GET /api/goals
// Access: Private
const getGoals = asyncHandler(async(req:any, res:any) => {

    const goals = await Goal.find({user: res.locals.user.id})
    // Getting all goals for user, find is a built in mongoose method

    // console.log(req.body) 
    // shows in terminal when sending a postman request

    // not able to find alternative types for req and res, other option found was Express.Request / Response, but that wasn't closing out the error
    res.status(200).json(goals)
})

// Desc: Set goals
// Route: POST /api/goals
// Access: Private
const setGoal = asyncHandler(async(req:any, res:any) => {
    // console.log(req.body)
    // console.log(res.locals.user.id)

    if(!req.body.activity || !req.body.start || !req.body.end || !req.body.target){
        // res.status(400).json({message: "Please add a text value"}) => remove and add express handler
        res.status(400)
        throw new Error("Please add a text value")
        // default error gives an HTML page in response to the error, to change default express error handler => add middleware

    }

    const goal = await Goal.create({
        user:  res.locals.user.id,
        activity:req.body.activity,
        start:req.body.start,
        end:req.body.end,
        target: req.body.target,
        progress: 0

    })

    // not able to find alternative types for req and res, other option found was Express.Request / Response, but that wasn't closing out the error
    res.status(200).json(goal)
})

// Desc: Update goals
// Route: PUT /api/goals/:id
// Access: Private
const updateGoal = asyncHandler(async(req:any, res:any) => {
    const goal = await Goal.findById(req.params.id)

    if(!goal){
        res.status(400)
        throw new Error("Goal not found")
    }

    // Check for user
    if(!res.locals.user.id) {
        res.status(401)
        throw new Error('User not found')
    }

    // Prevent updating other id's goals
    // user.id comes from the findById using locals
    // goal.user = user attached to goal
    // goal.user = objectID -> must change into a string
    if(goal.user.toString() !== res.locals.user.id){
        res.status(401)
        throw new Error('User Not Authorized')
    }

    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {new: true})

    // not able to find alternative types for req and res, other option found was Express.Request / Response, but that wasn't closing out the error
    res.status(200).json(updatedGoal)
})

// Desc: Delete goals
// Route: DELETE /api/goals/:id
// Access: Private
const deleteGoal = asyncHandler(async(req:any, res:any) => {

    const goal = await Goal.findById(req.params.id)


    // Check for user
    if(!res.locals.user.id) {
        res.status(401)
        throw new Error('User not found')
    }

    // Prevent updating other id's goals
    // user.id comes from the findById using locals
    // goal.user = user attached to goal
    if(goal.user.toString() !== res.locals.user.id){
        res.status(401)
        throw new Error('User Not Authorized')
    }

    if(!goal){
        res.status(400)
        throw new Error("Goal not found")
    }
    await goal.deleteOne()

    // not able to find alternative types for req and res, other option found was Express.Request / Response, but that wasn't closing out the error
    res.status(200).json({id: req.params.id})
})

// Desc: Add / Subtract from progress
// Route: PUT /api/goals/progress/:id
// Access: Private
const updateProgress = asyncHandler(async(req:any, res:any) => {

    const goal = await Goal.findById(req.params.id)

    if(!goal){
        res.status(400)
        throw new Error("Goal not found")
    }

    // Check for user
    if(!res.locals.user.id) {
        res.status(401)
        throw new Error('User not found')
    }

    // Prevent updating other id's goals
    // user.id comes from the findById using locals
    // goal.user = user attached to goal
    // goal.user = objectID -> must change into a string
    if(goal.user.toString() !== res.locals.user.id){
        res.status(401)
        throw new Error('User Not Authorized')
    }

    // req.body = "add" or "subtract"

    if(req.body.change == "add" && goal.progress < goal.target){
        let progressChange = {progress: goal.progress + 1}
        const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, progressChange, {new: true})
        res.status(200).json(updatedGoal)
    } else if (req.body.change == "subtract" && goal.progress > 0){
        let progressChange = {progress: goal.progress - 1}
        const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, progressChange, {new: true})
        res.status(200).json(updatedGoal)
    }
    


    // not able to find alternative types for req and res, other option found was Express.Request / Response, but that wasn't closing out the error

})



module.exports = {getGoals, setGoal, updateGoal, deleteGoal, updateProgress}