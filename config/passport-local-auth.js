import passport from "passport";
import { Strategy } from "passport-local";

// In-memory user data (replace with a database in production)
// Passwords should be hashed using bcrypt for security
const users = [
  { id: 1, username: "ashutosh", password: "1234" },
  { id: 2, username: "john", password: "123" },
];

// Configure Passport's local strategy for username/password authentication
// Extracts username and password from req.body, validates against users array
passport.use(
  new Strategy((username, password, done) => {
    // Check if user exists with matching username and password
    const user = users.find(
      (u) => u.username === username && u.password === password,
    );
    if (user) {
      // Authentication successful, pass user to serializeUser
      console.log("Login successful");
      return done(null, user);
    }
    // Authentication failed, return false
    console.log("Login failed");
    return done(null, false);
  }),
);

// Serialize user into session
// Stores user ID in req.session.passport.user for session persistence
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user from session
// Retrieves full user object from user ID stored in session
passport.deserializeUser((userId, done) => {
  const user = users.find((u) => u.id === userId);
  if (user) {
    // Pass user object to req.user
    done(null, user);
  } else {
    // Handle case where user ID is not found
    done(new Error("User not found"));
  }
});

export default passport;
