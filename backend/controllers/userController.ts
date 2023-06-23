// const jwt = require('jsonwebtoken')
import jwt from 'jsonwebtoken'

import bcrypt from 'bcrypt'

import asyncHandler from 'express-async-handler'

import User from '../models/userModel.ts'
// const User = require('../models/userModel')

// .env file was not being read prior to bringing this in
import dotenv from 'dotenv'
dotenv.config()
const SECRET_KEY = process.env.JWT_SECRET;



// Description: Register a new user
// Route: POST api/users
// Access: Public
// Have to wrap the async functions with asyncHandler to handle exceptions
const registerUser = asyncHandler(async(req:any, res:any) => {
    const {name, password} = req.body
    const email = req.body.email.toLowerCase()
    // Since email is required for logging in, I Chose to change to lowercase to prevent accidental errors when user inputs data.

    if(!name || !email || !password){
        res.status(400)
        throw new Error('Please add all fields')
    }

    

    // check if user exists and send error if they do
    const userExists = await User.findOne({email: email})
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

    // JWT malformed due to token input not being accurate
    // _id: new ObjectId("6494dd2cd06c0a6046e9662a"),
    // workaround temp solution
    // let startIndex = String(user._id).indexOf('"') + 1;
    // let endIndex = String(user._id).lastIndexOf('"');
    // let extractedString = String(user._id).slice(startIndex, endIndex);
    if (user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
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

    const email = req.body.email.toLowerCase()
    const password = req.body.password


        // Check for user email
        const user = await User.findOne({email: email})
        // console.log(user)
        
        // Check the password using bcrypt method to compare password input with hashed password
        if(user && user.password){
            


            
     
    if (user && (await bcrypt.compare(password, user.password))){
    // JWT malformed due to token input not being accurate
    // _id: new ObjectId("6494dd2cd06c0a6046e9662a"),
    // workaround temp solution
    // let startIndex = String(user._id).indexOf('"') + 1;
    // let endIndex = String(user._id).lastIndexOf('"');
    // let extractedString = String(user._id).slice(startIndex, endIndex);

    if (SECRET_KEY){
        let token = jwt.sign(user._id, SECRET_KEY)
        return(res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: token
            // token: generateToken(user._id)
        })
        )
  
    } else {
        res.status(400)
        throw new Error('Invalid credentials')
    }
    }
}
})

// Description: Get user data
// Route: GET api/users/me
// Access: Private -> use middleware to accomplish -> during the request response cycle middleware will check the token
const getMe =  asyncHandler(async(req:any, res:any) => {
    const user = await User.findById(res.locals.user.id)
    // Using res.locals because req.user.id shown in tutorial was not working
if(user){


    res.status(200).json({
        id:user._id,
        name:user.name, 
        email: user.email
    })
}
})

// Generate JWT -> create a JWT_Secret in .env
const generateToken = (id: object) => {
    // For typescript verify token is present
    if (SECRET_KEY){
        return jwt.sign({id}, SECRET_KEY)
    }
}

export default { registerUser, loginUser, getMe}
// module.exports = { registerUser, loginUser, getMe}