"use strict";
const mysql = require("mysql2");
const connection = mysql.createConnection(process.env.DATABASE_URL);

class User {
  static get() {
    const userRes = connection.query(`SELECT * FROM users`);

    return userRes;
  }
  //   static get(username) {
  //     const userRes = connection.query(
  //       `SELECT * FROM users WHERE username = $1`,
  //       [username]
  //     );
  //
}

module.exports = User;
