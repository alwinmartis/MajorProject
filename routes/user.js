const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");

const userConstroller = require("../controllers/users.js");

// for render template of signup
// for signup
router
  .route("/signup")
  .get(userConstroller.renderSignUpForm)
  .post(userConstroller.signup);

// for render login page
// for post login
router
  .route("/login")
  .get(userConstroller.renderLoginForm)
  .post(
    saveRedirectUrl,
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: true,
    }),
    userConstroller.login
  );

//  for logout
router.get("/logout", userConstroller.logout);

module.exports = router;
