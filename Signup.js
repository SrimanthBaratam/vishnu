import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    axios.post("http://localhost/mybackend/register.php", {
      username: name,
      email,
      password
    })
    .then(res => {
      setMessage(res.data.message);
      if(res.data.status === "success"){
        localStorage.setItem("user", email);
        navigate("/");
      }
    })
    .catch(() => setMessage("Registration failed."));
  };

  return (
    <div className="page">
      <h1>Signup</h1>
      <form className="form" onSubmit={handleSignup}>
        <label>Name:</label>
        <input type="text" value={name} onChange={e => setName(e.target.value)} required />
        <label>Email:</label>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
        <label>Password:</label>
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
        <button type="submit">Signup</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default Signup;
