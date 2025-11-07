import React, { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError("Enter both email and password");
      return;
    }
    try {
      const res = await API.post("/auth/login", { email, password });
      localStorage.setItem("admin", JSON.stringify(res.data.admin));
      navigate("/admin");
    } catch (err) {
      setError(err.response?.data.msg || "Login failed");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>Admin Login</h2>
      <form onSubmit={handleLogin}>
        <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} /><br /><br />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} /><br /><br />
        <button type="submit" style={{ padding:"10px 20px", backgroundColor:"orange", color:"white", border:"none", cursor:"pointer" }}>Login</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}