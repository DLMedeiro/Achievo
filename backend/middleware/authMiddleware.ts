import jwt from 'jsonwebtoken'

const asyncHandler = require('express-async-handler') 
// import asyncHandler from 'express-async-handler'

const User = require('../models/userModel')

const protect = asyncHandler(async(req, res, next) => {
    let token;

    //  Check the http header if the authorization header is present and starts with "Bearer" (when the token is sent in the authorization header it is formatted as "Bearer token")
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {

            // get token from header / "Bearer Token" -> split turns string into array split at space to get only token
            token = req.headers.authorization.split(' ')[1]
            
            // Verify token and for typescript verify token is present
            // Returns payload
            let decoded;
            if (process.env.JWT_Secret){
                decoded = jwt.verify(token, process.env.JWT_Secret)
                if (typeof decoded === "object"){   
                    // req.user = await User.findById(decoded.id).select('-password')
                    // ".select('-password') = remove password hash from the response, req.user.password will not be accessible"
                    res.locals.user =  await User.findById(decoded.id).select('-password')
                    // Using res.locals because setting req.user as shown in tutorial was not working
                }
            }

            // get user from the token (user id is in the payload) -> allows user to be accessed in any route that is protected

            next()
        } catch (error){
            console.log(error)
            res.status(401)
            // 401 = unauthorized
            throw new Error('Not Authorized')
        }
    }
    if(!token) {
        res.status(401)
        throw new Error('Not authorized, no token')
    }
}
)

module.exports = {protect}