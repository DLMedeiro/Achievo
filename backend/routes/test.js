"use strict";

const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  console.log("testing");
  res.send("TESTING");
});

module.exports = router;
