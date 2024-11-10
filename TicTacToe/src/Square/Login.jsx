import React, { useState } from "react";
import axios from "axios";
import "./Login.css"; // Import the CSS file

const Login = ({ setToken }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    // Check if fields are empty
    if (!username || !password) {
      alert("Please fill in both username and password fields.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/login", { username, password });
      alert(response.data.message);
      setUsername(""); // Clear username field
      setPassword(""); // Clear password field
      setToken(response.data.token); // Store token for use
    } catch (error) {
      alert(error.response?.data?.error || "An error occurred during login.");
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <input
        className="login-input"
        placeholder="Username"
        value={username} // Bind value to state to clear field on submit
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        className="login-input"
        type="password"
        placeholder="Password"
        value={password} // Bind value to state to clear field on submit
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="login-button" onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
