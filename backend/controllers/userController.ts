

// Description: Register a new user
// Route: POST api/users
// Access: Public
// Have to wrap the async functions with asyncHandler to handle exceptions
const registerUser = (req:any, res:any) => {
    res.json({message: 'Register User'})
}


// Description: Authenticate a user
// Route: POST api/users/login
// Access: Public
const loginUser = (req:any, res:any) => {
  res.json({message: 'Login user'})

}

// Description: Get user data
// Route: GET api/users/me
// Access: Private -> use middleware to accomplish -> during the request response cycle middleware will check the token
const getMe =  (req:any, res:any) => {
    res.json({message: 'User Data'})
}

module.exports = { registerUser, loginUser, getMe}