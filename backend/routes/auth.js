const express = require("express");
const passport = require("passport");
const router = express.Router();

const CLIENT_HOME_PAGE_URL = "http://localhost:3000";

//auth with google;
router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

//login callback from google auth;
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/auth/login/failed",
    successRedirect: CLIENT_HOME_PAGE_URL,
  }),
  //send respond json respond authenticated
  (req, res) => {
    console.log("authentication from google is done");
    if (req.user) {
      res.json({
        success: true,
        message: "user has successfully authenticated",
        user: req.user,
        // cookies: req.cookies,
      });
    }
  }
);

//when login failed, send 401 status;
router.get("/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "user failed to authenticate.",
  });
});

//route for logout;
router.get("/logout", (req, res) => {
  req.logOut();

  res.json({
    success: true,
    message: "user has successfully log out",
    // user: req.user,
    // cookies: req.cookies,
  });
});

module.exports = router;
