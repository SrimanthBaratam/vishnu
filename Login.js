import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    axios.post("http://localhost/mybackend/login.php", { email, password })
      .then(res => {
        setMessage(res.data.message);
        if (res.data.status === "success") {
          localStorage.setItem("user", email);  // Store user info in localStorage
          navigate("/home");  // Correct route path
        }
      })
      .catch(() => setMessage("Login failed."));
  };

  return (
    <div className="page">
      <h1>Login</h1>
      <form className="form" onSubmit={handleLogin}>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default Login;
