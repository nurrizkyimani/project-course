const express = require("express");
const router = express.Router();
const { ensureAuth } = require("../middleware/auth");

const Review = require("../models/Review");
const Student = require("../models/Student");
const { route } = require(".");
const { remove } = require("../models/Review");
const passport = require("passport");

// SUBMIT REVIEW
router.post(
  "/submit",
  // ensureAuth,
  async (req, res) => {
    console.log("find req user id");
    console.log(req.user);

    try {
      req.body.user = req.user.id;
      await Review.create(req.body);
      res.send({ data: req.body, message: "done" });
    } catch (error) {
      res.send(error);
      console.log(error);
    }
  }
);

// UPDATE REVIEW
router.put(
  "/:id",
  //  ensureAuth,
  async (req, res) => {
    let review = await Review.findById(req.params.id).lean();

    try {
      if (req.student.id != review.user) {
        res.send("not the same id");
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
    } catch (error) {
      res.send(error);
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
    } catch (error) {
      res.send(error);
      console.log(error);
    }
  }
);

//get specific review
router.get(
  "/:id",
  //  ensureAuth,
  async (req, res) => {
    try {
      let review = await Review.findById(req.params.id);
      res.send({ data: review });
    } catch (error) {
      console.error(err);
      res.render("error/500");
    }
  }
);

//get all review
router.get(
  "/reviews",
  // ensureAuth,
  async (req, res) => {
    try {
      const stories = await Review.find({ status: "public" })
        .populate("Student")
        .sort({ createdAt: "desc" })
        .lean();
      res.send({ data: stories });
    } catch (error) {
      res.send(error);
    }
  }
);

//get all reviews by specific user
router.get(
  "/user/:userId",
  // ensureAuth,
  async (req, res) => {
    try {
      let review = await Review.find({
        user: req.params.userId,
        status: "public",
      })
        .populate("Student")
        .lean(true);

      res.send({ data: review });
    } catch (error) {
      console.error(err);
      res.render("error/500");
    }
  }
);

module.exports = router;
