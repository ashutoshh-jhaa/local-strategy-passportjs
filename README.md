# Express Passport Local Authentication Example

This is a simple example demonstrating user authentication in an Express.js app using Passport.js with the local strategy and session management.

---

## Features

- User login with username and password (hardcoded users)
- Session management with `express-session`
- Protected routes accessible only to authenticated users
- Passport.js local strategy for authentication
- Serialization/deserialization of user sessions

---

## Lifecycle Overview

### First Login Request

1. Client sends POST `/login` with username and password.
2. `express-session` middleware parses cookies (none initially) and creates empty `req.session`.
3. `passport.initialize()` attaches helper methods to `req`.
4. `passport.authenticate('local')` runs local strategy to verify credentials.
5. On success:
   - Calls `req.login(user)` → serializes user ID into `req.session.passport.user`.
   - Session is saved and cookie `connect.sid` sent to client.
6. Client stores session cookie.

### Subsequent Requests

1. Client sends request with session cookie.
2. `express-session` reads session from store using cookie.
3. `passport.initialize()` adds helpers.
4. `passport.session()` calls `deserializeUser()` to get full user object.
5. User info attached to `req.user`.
6. Route handlers can check `req.isAuthenticated()` and access `req.user`.

---

## Getting Started

### Prerequisites

- Node.js (v14+ recommended)
- npm

### Installation

1. Clone or copy the files.
2. Install dependencies:
   ```bash
   npm install express passport passport-local express-session
   ```
3. Run the app
   ```bash
   node index.js
   ```
- Server runs at http://localhost:4000.

--- 

### API Endpoints
- POST /login
  Authenticate with username and password (in request body).
  On success, session created and status 200 returned.
  On failure, redirects to /error.

- GET /dashboard
  Protected route.
  Returns User is authenticated if logged in.
  Returns Not authenticated (401) if not.

- GET /error
  Returns login failure message
