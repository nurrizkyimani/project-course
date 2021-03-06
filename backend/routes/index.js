const express = require("express");
const router = express.Router();
const { ensureAuth, ensureGuest } = require("../middleware/auth");

const Review = require("../models/Review");
const Student = require("../models/Student");

router.get("/dashboard", ensureAuth, async (req, res) => {
  console.log("dashboard route, ensure auth");
  try {
    const stories = await Review.find({ user: req.student.id }).lean();
    res.send({ stories });
  } catch (error) {
    console.error(error);
  }
});

router.get("/", ensureGuest, (req, res) => {
  res.send("This is main page");
  res.status(200);
});

module.exports = router;
