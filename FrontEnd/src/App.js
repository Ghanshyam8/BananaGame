import React from "react"; // Importing React
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"; // Importing routing components from react-router-dom
import Login from "./components/Login"; // Importing Login component
import Register from "./components/Register"; // Importing Register component
import Game from "./components/Game"; // Importing Game component

const App = () => {
  return (
    <Router> {/* Wrapping the routes in Router for routing to work */}
      <Routes> {/* Defining the different routes in the app */}
        <Route path="/" element={<Navigate to="/login" replace />} /> {/* Redirect root path to /login */}
        <Route path="/login" element={<Login />} /> {/* Route for the Login page */}
        <Route path="/register" element={<Register />} /> {/* Route for the Register page */}
        <Route path="/game" element={<Game />} /> {/* Route for the Game page */}
      </Routes>
    </Router>
  );
};

export default App;
