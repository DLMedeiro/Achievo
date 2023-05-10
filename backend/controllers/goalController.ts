// When interacting the the database, the response is returned in a promise -> therefore need to add async and await to these functions
// async / await => use Try / Catch
// Express Async Handler => skip try/catch and use the error handler instead

// const asyncHandler = require('express-async-handler')
import asyncHandler from 'express-async-handler'

// Desc: Get goals
// Route: GET /api/goals
// Access: Private
const getGoals = asyncHandler(async(req:any, res:any) => {

    // console.log(req.body) 
    // shows in terminal when sending a postman request

    if(!req.body.text){
        // res.status(400).json({message: "Please add a text value"}) => remove and add express handler
        res.status(400)
        throw new Error("Please add a text value")
        // default error gives an HTML page in response to the error, to change default express error handler => add middleware

    }
    // not able to find alternative types for req and res, other option found was Express.Request / Response, but that wasn't closing out the error
    res.status(200).json({message: 'Get goals'})
})

// Desc: Set goals
// Route: POST /api/goals
// Access: Private
const setGoal = asyncHandler(async(req:any, res:any) => {
    // not able to find alternative types for req and res, other option found was Express.Request / Response, but that wasn't closing out the error
    res.status(200).json({message: 'Set goals'})
})

// Desc: Update goals
// Route: PUT /api/goals/:id
// Access: Private
const updateGoal = asyncHandler(async(req:any, res:any) => {
    // not able to find alternative types for req and res, other option found was Express.Request / Response, but that wasn't closing out the error
    res.status(200).json({message: `Update goal: ${req.params.id}`})
})

// Desc: Delete goals
// Route: DELETE /api/goals/:id
// Access: Private
const deleteGoal = asyncHandler(async(req:any, res:any) => {
    // not able to find alternative types for req and res, other option found was Express.Request / Response, but that wasn't closing out the error
    res.status(200).json({message: `Delete goal: ${req.params.id}`})
})

module.exports = {getGoals, setGoal, updateGoal, deleteGoal}