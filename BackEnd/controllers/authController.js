// Import the User model to interact with the database.
const User = require("../models/User");
// Import bcrypt for hashing and comparing passwords.
const bcrypt = require("bcryptjs");
// Import jwt for generating JSON Web Tokens.
const jwt = require("jsonwebtoken");

/**
 * Handles user registration.
 * Validates user input, checks for existing users, hashes the password,
 * and saves a new user in the database.
 */
const registerUser = async (req, res) => {
  const { name, password, confirmPassword } = req.body;

  // Check if all required fields are filled.
  if (!name || !password || !confirmPassword) {
    return res.status(400).json({ message: "Please fill out all fields." });
  }
  // Ensure the passwords match.
  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match." });
  }
  // Ensure the password meets the minimum length requirement.
  if (password.length < 6) {
    return res.status(400).json({ message: "Password must be at least 6 characters." });
  }

  try {
    // Check if a user with the given name already exists.
    const existingUser = await User.findOne({ name });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists." });
    }

    // Hash the password with a salt of 10 rounds.
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user instance with the hashed password.
    const newUser = new User({ name, password: hashedPassword });

    // Save the new user to the database.
    await newUser.save();

    // Send a success response.
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error in registerUser:", error); // Log the error for debugging.
    res.status(500).json({ message: "Server error" }); // Send a server error response.
  }
};

/**
 * Handles user login.
 * Validates user input, checks user credentials, and generates a token.
 */
const loginUser = async (req, res) => {
  const { name, password } = req.body;

  // Check if all required fields are filled.
  if (!name || !password) {
    return res.status(400).json({ message: "Please fill out all fields." });
  }

  try {
    // Find a user by their name in the database.
    const user = await User.findOne({ name });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Compare the provided password with the stored hashed password.
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate a JSON Web Token (JWT) for authentication.
    const token = jwt.sign(
      { id: user._id }, // Payload containing the user's ID.
      process.env.JWT_SECRET, // Secret key from the environment variables.
      { expiresIn: "1h" } // Token expiration time.
    );

    // Send the token as the response.
    res.json({ token });
  } catch (error) {
    console.error("Error in loginUser:", error); // Log the error for debugging.
    res.status(500).json({ message: "Server error" }); // Send a server error response.
  }
};

// Export the functions for use in other parts of the application.
module.exports = { registerUser, loginUser };
