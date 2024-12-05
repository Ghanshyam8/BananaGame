import React, { useState } from "react"; // Import React and useState for handling state
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation after successful registration

const Register = () => {
  const navigate = useNavigate(); // useNavigate hook to programmatically navigate
  const [formData, setFormData] = useState({
    name: "", // Username
    password: "", // Password
    confirmPassword: "", // Confirm Password
  });
  const [error, setError] = useState(""); // Error message state

  // Handle input changes and update formData state dynamically
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    const { name, password, confirmPassword } = formData;

    // Validation checks
    if (!name || !password || !confirmPassword) {
      setError("Please fill out all fields.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    try {
      // Send a POST request to the server for registration
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, password, confirmPassword }),
      });

      const data = await response.json(); // Parse the response data

      if (response.ok) {
        setError(""); // Clear any previous errors
        navigate("/login"); // Navigate to the login page upon successful registration
      } else {
        setError(data.message || "Registration failed."); // Show error if registration fails
      }
    } catch (error) {
      setError("Server error. Please try again later."); // Handle any server errors
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-green-400 to-yellow-500 relative">
      {/* Background gradient with a container */}
      <div className="absolute top-6 left-6 bg-white bg-opacity-90 p-4 rounded-xl shadow-lg">
        <p className="text-2xl font-bold text-green-700">🍌 Banana Game</p>
      </div>

      {/* Registration form */}
      <form
        className="w-full max-w-md bg-white bg-opacity-90 rounded-lg shadow-xl p-8 flex flex-col items-center"
        onSubmit={handleSubmit}
      >
        <h2 className="text-4xl font-bold text-yellow-600 mb-4">Register</h2>
        <p className="text-gray-600 text-center mb-6">
          Join the fun and start playing the Banana Game!
        </p>

        {/* Display error message if any */}
        {error && (
          <p className="text-red-600 bg-red-100 px-4 py-2 mb-4 rounded-lg">
            {error}
          </p>
        )}

        {/* Username input */}
        <input
          type="text"
          name="name"
          placeholder="Your Username"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-4 py-3 mb-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:outline-none"
        />
        
        {/* Password input */}
        <input
          type="password"
          name="password"
          placeholder="Your Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full px-4 py-3 mb-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:outline-none"
        />

        {/* Confirm password input */}
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          className="w-full px-4 py-3 mb-6 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:outline-none"
        />

        {/* Register button */}
        <button
          type="submit"
          className="w-full px-4 py-3 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700 transition duration-300"
        >
          Register
        </button>

        {/* Back to login button */}
        <button
          type="button"
          onClick={() => navigate("/login")} // Navigate to login page
          className="w-full px-4 py-3 mt-4 bg-yellow-500 text-white rounded-lg font-bold hover:bg-yellow-600 transition duration-300"
        >
          Back to Login
        </button>
      </form>
    </div>
  );
};

export default Register;
