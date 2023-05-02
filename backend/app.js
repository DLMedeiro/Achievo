// Using PlanetScale system and docs with w3Schools:
//www.w3schools.com/nodejs/nodejs_mysql_where.asp

https: require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

const mysql = require("mysql2");
const connection = mysql.createConnection(process.env.DATABASE_URL);

connection.connect();

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
app.get("/:user", (req, res) => {
  let request = req.params.user;
  let sqlRequest = "SELECT * FROM users WHERE username = ?";
  connection.query(sqlRequest, request, function (err, rows, fields) {
    if (err) throw err;

    res.send(rows);
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
