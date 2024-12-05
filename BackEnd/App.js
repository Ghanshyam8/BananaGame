// Import required modules.
const express = require('express'); // Express framework for building the server.
const cors = require('cors'); // Middleware to enable Cross-Origin Resource Sharing (CORS).
const dotenv = require('dotenv'); // Module to load environment variables from a `.env` file.
const gameRoutes = require('./routes/gameRoutes'); // Import routes for game-related actions.
const connectDB = require("./config/Connection"); // Function to connect to the database.

// Load environment variables from a `.env` file into `process.env`.
dotenv.config();

// Initialize the Express application.
const app = express();

// Connect to the database.
connectDB();

// Middleware
app.use(cors()); // Enable CORS to allow requests from other origins.
app.use(express.json()); // Parse incoming JSON payloads in request bodies.

// Define routes
// Route for game-related API endpoints.
app.use('/api/game', gameRoutes);

// Route for authentication-related API endpoints.
app.use("/api/auth", require("./routes/authRoutes"));

// Start the server
// Define the port number, either from environment variables or default to 5000.
const PORT = process.env.PORT || 5000;

// Start listening for incoming requests.
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
