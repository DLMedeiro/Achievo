// Entry point
// If changes are made to this file, the server needs to be reset

// backend web framework
// const express = require("express");
import express from 'express'

// Bring in environment variables
const dotenv = require("dotenv").config();
// make sure this is called before items requiring this file are used.  ConnectDB will have an error if this requirement is after it.

// Port for server to run on, 5000 if the .env port is not found
const port = process.env.PORT || 5000;

// initialize express
const app = express();


// when api/goals is hit on the front end, goalRoutes will respond
app.use("/api/goals", require('./routes/goalRoutes'));





// call listen on app object
app.listen(port, () => {
    console.log(`Server started on port: ${port}`);
  });