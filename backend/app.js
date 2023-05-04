// Using PlanetScale system and docs with w3Schools:
//www.w3schools.com/nodejs/nodejs_mysql_where.asp

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3001;

const mysql = require("mysql2");
const connection = mysql.createConnection(process.env.DATABASE_URL);

connection.connect();
app.use(cors());
app.use(express.json());
const userRoutes = require("./routes/users");
app.use("/users", userRoutes);

app.get("/", (req, res) => {
  connection.query(
    "SELECT * FROM users WHERE password = 'FinnFinn'",
    function (err, rows, fields) {
      if (err) throw err;

      res.send(rows);
    }
  );
});
app.get("/:user", (req, res) => {
  let request = req.params.user;
  let sqlRequest =
    "SELECT * FROM users WHERE username = " + mysql.escape(request);
  connection.query(sqlRequest, function (err, rows, fields) {
    if (err) throw err;

    res.send(rows);
  });
});

app.post("/createAccount", (req, res) => {
  const sqlRequest =
    "INSERT INTO users (email, password, username) VALUES (?, ?, ?)";
  const values = [req.body.email, req.body.password, req.body.username];
  connection.query(sqlRequest, values, (err, result) => {
    if (result) {
      res.send(result);
    } else {
      res.send({ message: "Please complete all fields" });
    }
  });
});

app.post("/login", (req, res) => {
  const sqlRequest = "SELECT * FROM users WHERE email = ? AND password = ?";
  const values = [req.body.email, req.body.password];
  connection.query(sqlRequest, values, (err, result) => {
    if (err) {
      req.setEncoding({ err: err });
    } else {
      if (result.length > 0) {
        res.send(result);
      } else {
        res.send({ message: "Incorrect credentials entered" });
      }
    }
  });
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
