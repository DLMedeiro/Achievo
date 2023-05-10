// When interacting the the database, the response is returned in a promise -> therefore need to add async and await to these functions
// async / await => use Try / Catch
// Express Async Handler => skip try/catch and use the error handler instead

// const asyncHandler = require('express-async-handler')
import asyncHandler from 'express-async-handler'

const Goal = require('../models/goalModel')
// Has the mongoose methods to use in the database

// Desc: Get goals
// Route: GET /api/goals
// Access: Private
const getGoals = asyncHandler(async(req:any, res:any) => {

    const goals = await Goal.find()
    // Getting all of them, find is a built in mongoose method

    // console.log(req.body) 
    // shows in terminal when sending a postman request

    // not able to find alternative types for req and res, other option found was Express.Request / Response, but that wasn't closing out the error
    res.status(200).json(goals)
})

// Desc: Set goals
// Route: POST /api/goals
// Access: Private
const setGoal = asyncHandler(async(req:any, res:any) => {

    if(!req.body.name || !req.body.start || !req.body.end){
        // res.status(400).json({message: "Please add a text value"}) => remove and add express handler
        res.status(400)
        throw new Error("Please add a text value")
        // default error gives an HTML page in response to the error, to change default express error handler => add middleware

    }

    const goal = await Goal.create({
        name:req.body.name,
        start:req.body.start,
        end:req.body.end,

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

    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {new: true})

    // not able to find alternative types for req and res, other option found was Express.Request / Response, but that wasn't closing out the error
    res.status(200).json(updatedGoal)
})

// Desc: Delete goals
// Route: DELETE /api/goals/:id
// Access: Private
const deleteGoal = asyncHandler(async(req:any, res:any) => {

    const goal = await Goal.findById(req.params.id)

    if(!goal){
        res.status(400)
        throw new Error("Goal not found")
    }
    await goal.deleteOne()

    // not able to find alternative types for req and res, other option found was Express.Request / Response, but that wasn't closing out the error
    res.status(200).json({id: req.params.id})
})

module.exports = {getGoals, setGoal, updateGoal, deleteGoal}