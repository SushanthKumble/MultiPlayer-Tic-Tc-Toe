import React, { useState } from "react";
import axios from "axios";
import "./Register.css"; // Import the CSS file

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    // Check if fields are empty
    if (!username || !password) {
      alert("Please fill in both username and password fields.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/register", { username, password });
      alert(response.data.message);
      setUsername(""); // Clear username field
      setPassword(""); // Clear password field
    } catch (error) {
      alert(error.response?.data?.error || "An error occurred during registration.");
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <input
        className="register-input"
        placeholder="Username"
        value={username} // Bind value to state to clear field on submit
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        className="register-input"
        type="password"
        placeholder="Password"
        value={password} // Bind value to state to clear field on submit
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="register-button" onClick={handleRegister}>Register</button>
    </div>
  );
};

export default Register;
