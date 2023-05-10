


// Desc: Get goals
// Route: GET /api/goals
// Access: Private
const getGoals = (req:any, res:any) => {
    // not able to find alternative types for req and res, other option found was Express.Request / Response, but that wasn't closing out the error
    res.status(200).json({message: 'Get goals'})
}

// Desc: Set goals
// Route: POST /api/goals
// Access: Private
const setGoal = (req:any, res:any) => {
    // not able to find alternative types for req and res, other option found was Express.Request / Response, but that wasn't closing out the error
    res.status(200).json({message: 'Set goals'})
}

// Desc: Update goals
// Route: PUT /api/goals/:id
// Access: Private
const updateGoal = (req:any, res:any) => {
    // not able to find alternative types for req and res, other option found was Express.Request / Response, but that wasn't closing out the error
    res.status(200).json({message: `Update goal: ${req.params.id}`})
}

// Desc: Delete goals
// Route: DELETE /api/goals/:id
// Access: Private
const deleteGoal = (req:any, res:any) => {
    // not able to find alternative types for req and res, other option found was Express.Request / Response, but that wasn't closing out the error
    res.status(200).json({message: `Delete goal: ${req.params.id}`})
}

module.exports = {getGoals, setGoal, updateGoal, deleteGoal}