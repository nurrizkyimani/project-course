const express = require("express");
const router = express.Router();
const { ensureAuth } = require("../middleware/auth");

const Review = require("../models/Review");
const Student = require("../models/Student");
const { route } = require(".");
const { remove } = require("../models/Review");
const passport = require("passport");

//get all review
router.get(
  "/",
  // ensureAuth,
  async (req, res) => {
    try {
      const reviews = await Review.find({ status: "public" })
        .populate("student")
        .sort({ createdAt: "desc" })
        .lean();

      res.status(200).json({
        success: true,
        info: "success get all review",
        data: reviews,
      });
    } catch (err) {
      console.log(err);
      res.json({
        success: false,
        info: `error info : ${err}`,
      });
    }
  }
);

// SUBMIT REVIEW
router.post(
  "/submit",
  // ensureAuth,
  async (req, res, next) => {
    req.body.user = req.user.id;

    try {
      const result = await Review.create(req.body);
      console.log(result);

      if (!result) return res.status(400).send("User not Found");

      res.status(200).json({
        success: true,
        info: "success submit review",
        data: req.body,
      });
    } catch (err) {
      console.log(err);
      res.json({
        success: false,
        info: `error info : ${err}`,
      });
    }
  }
);

// UPDATE REVIEW
router.put(
  "/:id",
  // ensureAuth,
  async (req, res) => {
    let review = await Review.findById(req.params.id).lean();
    try {
      if (req.student.id != review.user) {
        res.send("not the same user id");
      } else {
        review = await Review.findByIdAndUpdate(
          { _id: req.params.id },
          req.body,
          {
            new: true,
            runValidators: true,
          }
        );
      }
      res.status(200).json({
        success: true,
        info: "success update review",
        data: req.body,
      });
    } catch (err) {
      console.log(err);
      res.json({
        success: false,
        info: `error info : ${err}`,
      });
    }
  }
);

//delete the review
router.delete(
  "/:id",
  // ensureAuth,
  async (req, res) => {
    try {
      let review = await Review.findById(req.params.id);
      if (!review) {
        res.render("error", { error: "no review" });
      }
      Review.remove(review);

      res.status(200).json({
        success: true,
        info: "success delete review",
      });
    } catch (err) {
      console.log(err);
      res.json({
        success: false,
        info: `error info : ${err}`,
      });
    }
  }
);

//get specific review by id
router.get(
  "/:id",
  //  ensureAuth,
  async (req, res) => {
    try {
      let review = await Review.findById(req.params.id);

      res.status(200).json({
        success: true,
        data: req.body,
      });
    } catch (error) {
      console.error(err);
      res.json({
        success: false,
        info: `error info : ${err}`,
      });
    }
  }
);

// get all reviews by specific user
router.get(
  "/user/:userid",
  // ensureAuth,
  async (req, res) => {
    try {
      let review = await Review.find({
        user: req.params.userid,
        status: "public",
      })
        .populate("student")
        .sort({ createdAt: "desc" })
        .lean();

      res.send({
        success: true,
        data: review,
      });
    } catch (err) {
      console.error(err);
      res.json({
        success: false,
        info: `error info : ${err}`,
      });
    }
  }
);

module.exports = router;
