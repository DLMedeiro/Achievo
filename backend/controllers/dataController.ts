// const jwt = require('jsonwebtoken')
import jwt from 'jsonwebtoken'

import bcrypt from 'bcrypt'

import asyncHandler from 'express-async-handler'

import User from '../models/userModel.ts'

// .env file was not being read prior to bringing this in
import dotenv from 'dotenv'
dotenv.config()
const SECRET_KEY = process.env.JWT_SECRET;


// Description: Ping database to initiate data flow.
// Route: GET api/users/

const ping =  asyncHandler(async(req:any, res:any) => {
    const response = await User.find({})
    // Using res.locals because req.user.id was not working

if(response){
    res.status(200)
}
})

export default {ping}