const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const questionRouter = require("./Question");
const answerRouter = require("./Answer");
const commentRouter = require('./Comments')

router.get("/", (req, res) => {
  res.send("Welcome to DBMSFLOW");
});

router.use("/question", questionRouter);
router.use("/answer", answerRouter);
router.use("/comment", commentRouter)

module.exports = router;