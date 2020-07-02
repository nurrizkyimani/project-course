const express = require("express");
const passport = require("passport");
const router = express.Router();

const CLIENT_HOME_PAGE_URL = "http://localhost:3001";

router.get("/login/success", async (req, res) => {
  console.log("login start");
  console.log(req.user);
  if (req.user) {
    console.log(req.isAuthenticated());
    console.log("auth true; req user exist");
    res.status(200).send({
      success: true,
      message: "user has successfully authenticated",
      user: req.user,
      cookies: req.cookies,
      isAuthenticated: req.isAuthenticated(),
    });
  } else {
    console.log("not yet login");
    res.send({
      success: false,
      message: "user is not authenticated",
      // data: res,
    });
  }
});

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

// http://localhost:3000/login/failed

//auth with google;
router.get(
  "/google",
  passport.authenticate(
    "google",
    { scope: ["profile"] },
    { successRedirect: "auth/login/succes" }
  )
);

//login callback from google auth;
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "auth/login/failed",
    successRedirect: CLIENT_HOME_PAGE_URL,
  })
);

module.exports = router;
