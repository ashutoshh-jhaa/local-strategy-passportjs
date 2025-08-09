import express from "express";
import passport from "../config/passport-local-auth.js";

const router = express.Router();

// Handle user login using Passport's local strategy
// The middleware authenticates username/password from req.body
// On failure, redirects to /error; on success, proceeds to the callback
router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/error",
    // session: false // Uncomment to disable session-based authentication
  }),
  (req, res) => {
    // This callback runs only if authentication succeeds
    console.log("Login successful");
    res.status(200).send("Login was successful");
  },
);

// Protect the dashboard route by checking if the user is authenticated
// req.isAuthenticated() checks if a user is logged in via session
router.get("/dashboard", (req, res) => {
  if (req.isAuthenticated()) {
    // User is logged in, serve the dashboard
    res.status(200).send("User is authenticated");
  } else {
    // User is not logged in, deny access
    res.status(401).send("Not authenticated");
  }
});

// Handle failed login attempts
// This route is triggered when passport.authenticate fails
router.get("/error", (req, res) => {
  console.log("Authentication error");
  res.status(401).send("Invalid credentials");
});

export default router;
