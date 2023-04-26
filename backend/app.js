require("dotenv").config();
const express = require("express");
const mysql = require("mysql2");
const connection = mysql.createConnection(process.env.DATABASE_URL);
console.log("Connected to PlanetScale!");
connection.end();
const app = express();
const testRoutes = require("./routes/test");
const testRoutes = require("./routes/users");
app.use("/test", testRoutes);
app.use("/users", userRoutes);

const PORT = +process.env.PORT || 3001;

app.listen(PORT, function () {
  console.log(`Started on http://localhost:${PORT}`);
});
