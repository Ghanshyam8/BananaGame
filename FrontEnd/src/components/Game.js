import React, { useState, useEffect } from 'react'; // React hooks for state and lifecycle management.
import axios from 'axios'; // HTTP client for API calls.
import { useNavigate } from 'react-router-dom'; // Navigation hook for routing.

function Game() {
  const navigate = useNavigate(); // React Router hook to navigate between pages.

  // State variables to manage game state, user input, and feedback.
  const [number, setNumber] = useState(''); // Input number from the user.
  const [gameData, setGameData] = useState(null); // Data for the current game session.
  const [error, setError] = useState(null); // Error messages for user feedback.
  const [gameOver, setGameOver] = useState(false); // Tracks if the game has ended.
  const [showResult, setShowResult] = useState(false); // Toggles display of game results.
  const [loading, setLoading] = useState(false); // Tracks loading state for API calls.
  const [isIncorrect, setIsIncorrect] = useState(false); // Tracks if the user's guess is incorrect.
  const [hint, setHint] = useState(''); // Hint for the user based on their guess.
  const [score, setScore] = useState(0); // User's current score.
  const [attemptsLeft, setAttemptsLeft] = useState(5); // Remaining attempts for the user.
  const [username, setUsername] = useState(''); // Logged-in user's name.

  // Retrieve the logged-in user's username from local storage on component mount.
  useEffect(() => {
    const loggedInUsername = localStorage.getItem("username");
    if (loggedInUsername) {
      setUsername(loggedInUsername);
    }
  }, []);

  // Function to start a new game by making an API call.
  const startGame = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/api/game/start');
      setGameData(response.data.data); // Set game data from API response.
      // Reset game state.
      setError(null);
      setGameOver(false);
      setShowResult(false);
      setIsIncorrect(false);
      setScore(0);
      setAttemptsLeft(5);
      setHint('');
    } catch (err) {
      setError('Error starting the game.');
    } finally {
      setLoading(false);
    }
  };

  // Function to handle user moves.
  const makemove = async () => {
    setError(null); // Clear previous errors.
    if (!number) {
      setError('Please enter a number.');
      return;
    }

    const selectedNumber = parseInt(number, 10);
    if (isNaN(selectedNumber) || selectedNumber < 0 || selectedNumber > 9) {
      setError('Please enter a valid number between 0 and 9.');
      return;
    }

    if (gameData) {
      const solution = gameData.solution;

      if (selectedNumber === solution) {
        // Correct guess: increase score, show success message, and end the game.
        setScore(prevScore => prevScore + 10);
        setGameOver(true);
        setShowResult(true);
        setHint('Congratulations! Correct Answer!');
        setError(null);
        setIsIncorrect(false);
      } else {
        // Incorrect guess: deduct points, decrease attempts, provide hints.
        setAttemptsLeft(prevAttempts => prevAttempts - 1);
        setScore(prevScore => prevScore - 2);
        setError(`Wrong number! You entered ${selectedNumber}.`);
        setHint(selectedNumber < solution ? 'Try a higher number!' : 'Try a lower number!');
        setIsIncorrect(true);

        // End the game if no attempts are left.
        if (attemptsLeft <= 1) {
          setGameOver(true);
          setShowResult(true);
          setError(`Game Over! The correct answer was ${solution}.`);
          setHint('');
        }
      }
    }

    setNumber(''); // Clear the input field.
  };

  // Update state as the user types a number.
  const handleChange = (e) => {
    setNumber(e.target.value);
  };

  // Reset the game state for a new session.
  const handlePlayAgain = () => {
    setNumber('');
    setGameData(null);
    setGameOver(false);
    setShowResult(false);
    setIsIncorrect(false);
    startGame(); // Start a new game session.
  };

  // Log out the user by clearing local storage and navigating to the login page.
  const handleLogout = () => {
    localStorage.removeItem("username");
    navigate('/login');
  };

  return (
    <div className="game-container p-4 max-w-xl mx-auto mt-6 bg-gradient-to-r from-yellow-300 via-orange-300 to-red-400 rounded-xl shadow-lg">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold text-white">Banana Game</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white py-1 px-4 rounded-full"
        >
          Logout
        </button>
      </div>

      {/* User Info */}
      <div className="user-info text-center text-white mb-4">
        <p>{username}</p>
      </div>

      {/* Score and Attempts */}
      <div className="score-attempts text-center text-white mb-4">
        <p>Score: {score}</p>
        <p>Attempts Left: {attemptsLeft}</p>
      </div>

      {/* Start Game Button */}
      {!gameData && !gameOver && (
        <button
          className="bg-green-500 hover:bg-green-600 text-white py-2 px-6 rounded-full shadow-md w-full"
          onClick={startGame}
          disabled={loading}
        >
          {loading ? 'Loading...' : 'New Game'}
        </button>
      )}

      {/* Game Content */}
      {gameData && (
        <div className="game-content text-center">
          {/* Game Question */}
          <div className="image-container mb-4">
            <img src={gameData.question} alt="Game Question" className="mx-auto mb-4 border-4 border-white rounded-lg shadow-lg" />
          </div>

          {/* Result or Hint Section */}
          {showResult && gameOver ? (
            <div className="result mt-4 text-center">
              <p className={`text-xl ${isIncorrect ? 'text-red-500' : 'text-green-500 font-bold'}`}>
                {isIncorrect ? error : 'Correct answer! Well done!'}
              </p>
            </div>
          ) : (
            <>
              <div className="hint text-center text-yellow-600 font-semibold mb-2">{hint}</div>
              <div className="move flex justify-center space-x-4 mb-4">
                <input
                  type="number"
                  placeholder="Enter a number"
                  value={number}
                  onChange={handleChange}
                  className="border-2 border-gray-300 p-2 rounded w-24 text-center"
                />
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-lg shadow-md"
                  onClick={makemove}
                >
                  Make Move
                </button>
              </div>
            </>
          )}
        </div>
      )}

      {/* Error Message */}
      {error && <p className="error text-red-500 text-center">{error}</p>}

      {/* Play Again Button */}
      {gameOver && (
        <div className="mt-4 text-center">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-full w-full shadow-lg"
            onClick={handlePlayAgain}
          >
            Play Again
          </button>
        </div>
      )}
    </div>
  );
}

export default Game;
