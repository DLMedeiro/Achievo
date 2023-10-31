// Entry point
// If changes are made to this file, the server needs to be reset

// backend web framework
import express from "express";
import goalRoutes from "./routes/goalRoutes.ts";
import userRoutes from "./routes/userRoutes.ts";
import dataRoutes from "./routes/dataRoutes.ts";
import feedbackRoutes from "./routes/feedbackRoutes.ts";
// import goalDetailRoutes from "./routes/goalDetailRoutes.ts";
import path from "path";
// Bring in environment variables
import dotenv from "dotenv";
dotenv.config();
// make sure this is called before items requiring this file are used.  ConnectDB will have an error if this requirement is after it.

import connectDB from "./config/db.ts";
connectDB();
// initialize express
const app = express();

// add this middleware so req.body within the controller will not show as undefined
// body parser for raw json
app.use(express.json());
// parses urlencoded
app.use(express.urlencoded({ extended: true }));

// Port for server to run on, 5000 if the .env port is not found
const port = process.env.PORT || 5000;

// const cors = require('cors')
import cors from "cors";

// Bring in error handler
import errorHandler from "./middleware/errorMiddleware.ts";

if (process.env.ORIGIN) {
  console.log(process.env.ORIGIN);
  app.use(
    cors({
      origin: [process.env.ORIGIN],
      credentials: true,
    })
  );
}
// when api/goals is hit on the front end, goalRoutes will respond

app.use("/api/feedback", feedbackRoutes);
app.use("/api/goals", goalRoutes);
app.use("/api/users", userRoutes);
// app.use("/api/goalDetails", goalDetailRoutes);
app.use("/", dataRoutes);

// Serve frontend
// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static(path.join(__dirname, '../frontend/build')))
//   //

//   app.get('*', (req, res) =>
//     res.sendFile(
//       path.resolve(__dirname, '../', 'frontend', 'build', 'index.html'),
//     ),
//   )
//   // * -> any route aside from API routes and point it towards the index.html file that is in the build folder
// } else {
//   app.get('/', (req, res) => res.send('Please set to production'))
// }

app.use(errorHandler);
// This will overwrite the express default handler

// call listen on app object
app.listen(port, () => {
  console.log(`Server started on port: ${port}`);
});
