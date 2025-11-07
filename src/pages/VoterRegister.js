import React, { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

export default function VoterRegister() {
  const [voter, setVoter] = useState({ name: "", email: "", password: "", phone: "", address: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => setVoter({ ...voter, [e.target.name]: e.target.value });

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    if (!voter.name || !voter.email || !voter.password) { setError("Name, Email, Password required"); return; }
    try {
      await API.post("/voter/register", voter);
      alert("Voter registered successfully!");
      navigate("/voter-login");
    } catch (err) {
      setError(err.response?.data.error || "Registration failed");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Register as Voter</h2>
      <form onSubmit={handleRegister}>
        <input name="name" placeholder="Name" onChange={handleChange} /><br />
        <input name="email" placeholder="Email" onChange={handleChange} /><br />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} /><br />
        <input name="phone" placeholder="Phone" onChange={handleChange} /><br />
        <input name="address" placeholder="Address" onChange={handleChange} /><br /><br />
        <button type="submit" style={{ padding:"10px 20px", backgroundColor:"orange", color:"white", border:"none", cursor:"pointer" }}>Register</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}