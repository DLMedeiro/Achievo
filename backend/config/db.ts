// Use this file to connect to mongoDB using mongoose
// All mongoose methods return a promise to async is required for all functions

import {  connect } from 'mongoose';

// const mongoose = require ('mongoose')

const connectDB = async() => {
    try {
        // Typescript adjustment to account for a chance process.env is undefined
        if (process.env.MONGO_URI){
            const conn = await connect(process.env.MONGO_URI)
            console.log(`MongoDB Connected: ${conn.connection.host}`)
        }

    } catch(error){
        console.log(error)
        process.exit(1)
        // exit process with failure => 1

    }
}

module.exports = connectDB
// export default connectDB

