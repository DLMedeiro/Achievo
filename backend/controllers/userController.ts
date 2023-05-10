// const jwt = require('jsonwebtoken')
import jwt from 'jsonwebtoken'

import bcrypt from 'bcrypt'

import asyncHandler from 'express-async-handler'

// import User from '../models/userModel'
const User = require('../models/userModel')
const SECRET_KEY = process.env.JWT_SECRET;


// Description: Register a new user
// Route: POST api/users
// Access: Public
// Have to wrap the async functions with asyncHandler to handle exceptions
const registerUser = asyncHandler(async(req:any, res:any) => {
    const {name, email, password} = req.body

    if(!name || !email || !password){
        res.status(400)
        throw new Error('Please add all fields')
    }

    
    // Since email is required for logging in, I Chose to change to lowercase to prevent accidental errors when user inputs data.

    // check if user exists and send error if they do
    const userExists = await User.findOne({email})
    if (userExists) {
        res.status(400)
        throw new Error ('User already exists')
    }

    // Hash the password using bcrypt
    // generate salt to hash the password
    const salt = await bcrypt.genSalt(12)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Create user
    const user = await User.create({
        name, email, password: hashedPassword
    })

    if (user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
})


// Description: Authenticate a user
// Route: POST api/users/login
// Access: Public
const loginUser = asyncHandler(async(req:any, res:any) => {
  res.json({message: 'Login user'})

})

// Description: Get user data
// Route: GET api/users/me
// Access: Private -> use middleware to accomplish -> during the request response cycle middleware will check the token
const getMe =  asyncHandler(async(req:any, res:any) => {
    res.json({message: 'User Data'})
})

module.exports = { registerUser, loginUser, getMe}