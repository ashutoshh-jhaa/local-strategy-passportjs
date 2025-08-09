import express from "express";
import router from "./routes/index.js";
import passport from "passport";
import session from "express-session";

const app = express();
const PORT = 4000;

// Parse URL-encoded form data (e.g., username and password from login form)
app.use(express.urlencoded({ extended: true }));

// Set up CORS headers manually to allow cross-origin requests
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000"); // Restrict to trusted origin
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  next();
});

// Handle CORS preflight requests (OPTIONS) for all routes
app.options("/*", (req, res) => {
  res.status(200).end();
});

// Set up session middleware to manage user sessions
// Stores session ID in a cookie named 'connect.sid' and creates a new session if none exists
app.use(
  session({
    secret: "some-random-secret-key", // Secret for signing session cookies (use a strong, unique value)
    resave: false, // Don't save session if unmodified
    saveUninitialized: false, // Don't create session until something is stored
  }),
);

// Initialize Passport for authentication
// Adds methods like req.login(), req.logout(), and req.isAuthenticated() to requests
app.use(passport.initialize());

// Enable Passport session support
// Populates req.user by deserializing user data from session (req.session.passport.user)
app.use(passport.session());

// Mount the router for all routes
app.use("/", router);

// Global error handler for unexpected errors
app.use((err, req, res, next) => {
  console.error("Server error:", err.stack);
  res.status(500).send("Something went wrong!");
});

// Start the Express server
app.listen(PORT, "localhost", (error) => {
  if (error) {
    console.error("Server error:", error);
  } else {
    console.log(`Server is running on localhost:${PORT}`);
  }
});
