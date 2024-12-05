// Import necessary modules
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  // `useNavigate` is a hook from React Router for programmatic navigation.
  const navigate = useNavigate();

  // State for form data (username and password) and error messages.
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  // Function to handle input changes, dynamically updates the `formData` state.
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handles form submission and login logic.
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior.

    // Validation: Ensure both username and password are provided.
    if (!formData.username || !formData.password) {
      setError("Please fill out all fields.");
      return;
    }

    try {
      // Send a POST request to the login endpoint.
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Set the request content type to JSON.
        },
        body: JSON.stringify({
          name: formData.username, // Pass the username.
          password: formData.password, // Pass the password.
        }),
      });

      const data = await response.json(); // Parse the response JSON.
      console.log("Server Response:", data); // Log the server response for debugging.

      if (response.ok) {
        // Login successful:
        localStorage.setItem("username", formData.username); // Save the username in localStorage for session persistence.
        setError(""); // Clear any previous error messages.
        navigate("/game"); // Navigate to the game page.
      } else {
        // Login failed: Show the error message from the server or a default message.
        setError(data.message || "Login failed.");
      }
    } catch (error) {
      // Handle server or network errors.
      console.error("Error:", error);
      setError("Server error. Please try again later.");
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gradient-to-b from-indigo-600 via-blue-500 to-purple-700">
      {/* Outer container for the login form */}
      <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-2xl">
        {/* Header section */}
        <div className="text-center mb-6">
          {/* Banana Game logo */}
          <div className="flex items-center justify-center space-x-2">
            <div className="w-12 h-12 rounded-full bg-yellow-300 flex items-center justify-center">
              <span className="text-2xl font-extrabold text-black">🍌</span>
            </div>
            <p className="text-3xl font-extrabold text-indigo-800">Banana Game</p>
          </div>
          <p className="mt-2 text-gray-600">Welcome back! Please log in to continue.</p>
        </div>

        {/* Login form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Display error message, if any */}
          {error && (
            <p className="text-red-600 bg-red-100 px-4 py-2 rounded-md text-center">{error}</p>
          )}

          {/* Input fields */}
          <div className="space-y-2">
            {/* Username input */}
            <input
              type="text"
              name="username"
              placeholder="Enter your username"
              value={formData.username}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {/* Password input */}
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Buttons for login and registration */}
          <div className="space-y-2">
            {/* Login button */}
            <button
              type="submit"
              className="w-full py-3 text-white font-semibold bg-indigo-600 rounded-lg hover:bg-indigo-700 transition duration-300 shadow-md"
            >
              Login
            </button>
            {/* Navigate to registration page */}
            <button
              type="button"
              onClick={() => navigate("/register")}
              className="w-full py-3 text-indigo-600 font-semibold bg-indigo-100 rounded-lg hover:bg-indigo-200 transition duration-300"
            >
              Register
            </button>
          </div>
        </form>

        {/* Footer: Contact support */}
        <div className="text-center mt-4">
          <p className="text-sm text-gray-500">
            Trouble logging in?{" "}
            <span className="text-indigo-600 font-semibold cursor-pointer hover:underline">
              Contact Support
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
