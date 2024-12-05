// Import the Express framework to create and manage routes.
const express = require('express');

// Create a new router instance for handling game-related routes.
const router = express.Router();

// Import the game controller, which contains the logic for handling game actions.
const gameController = require('../controllers/gameController');

// Define a GET route to start a new game.
// This route will invoke the `startGame` function from the gameController when accessed.
router.get('/start', gameController.startGame);

// Define a POST route to make a move in the game.
// This route will invoke the `makeMove` function from the gameController when accessed.
router.post('/move', gameController.makeMove);

// Define a GET route to retrieve the game result.
// This route will invoke the `getResult` function from the gameController when accessed.
router.get('/result', gameController.getResult);

// Export the router to be used in the main application or other modules.
module.exports = router;
