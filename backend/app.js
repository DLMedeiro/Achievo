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

app.get("/", (req, res) => {
  connection.query(
    "SELECT username FROM users WHERE username = 'HarryPotter'",
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
  const sqlRequest = "INSERT INTO users (email, password, username) VALUES (?)";
  const values = [req.body.username, req.body.email, req.body.password];
  connection.query(sqlRequest, [values], (err, data) => {
    if (err) {
      return res.json(err);
    }
    return res.json(data);
  });
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
