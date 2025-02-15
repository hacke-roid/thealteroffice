const express = require("express");
const passport = require("passport");
const { loginUser, getUserDetails } = require("../controllers/authController");
const verifyGoogleToken = require("../middlewares/authMiddleware");

const router = express.Router();

// 🔹 Google OAuth Routes
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "https://thealteroffice-client-chi.vercel.app/dashboard",
    failureRedirect: "https://thealteroffice-client-chi.vercel.app/login",
  })
);

// 🔹 Login using Google Token
router.get("/login", verifyGoogleToken, loginUser);

// 🔹 Get user details
router.get("/userdetails/:userId", getUserDetails);

module.exports = router;
