// Import the Express framework to create and manage routes.
const express = require("express");

// Import the controller functions for handling user registration and login.
const { registerUser, loginUser } = require("../controllers/authController");

// Create a new router instance to define routes for authentication-related actions.
const router = express.Router();

// Define a POST route for user registration.
// This route will invoke the `registerUser` function from the authController when accessed.
router.post("/register", registerUser);

// Define a POST route for user login.
// This route will invoke the `loginUser` function from the authController when accessed.
router.post("/login", loginUser);

// Export the router to be used in the main application file or other modules.
module.exports = router;
