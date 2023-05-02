"use strict";

const User = require("../models/user");

const express = require("express");

const router = express.Router();

router.get("/", function (req, res, next) {
  try {
    const user = User.get();
    return res.json();
  } catch (err) {
    return next(err);
  }
});
// router.get("/:username", async function (req, res, next) {
//   try {
//     const user = await User.get(req.params.username);
//     return res.json({ user });
//   } catch (err) {
//     return next(err);
//   }
// });

module.exports = router;
