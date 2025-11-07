import React, { useState } from "react";
import API from "../api";

export default function VoterRegister() {
  const [voter, setVoter] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
  });

  const handleChange = (e) =>
    setVoter({ ...voter, [e.target.name]: e.target.value });

  const handleRegister = async () => {
    await API.post("/voter/register", voter);
    alert("Voter registered!");
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Register as Voter</h2>
      <input name="name" placeholder="Name" onChange={handleChange} /><br />
      <input name="email" placeholder="Email" onChange={handleChange} /><br />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} /><br />
      <input name="phone" placeholder="Phone" onChange={handleChange} /><br />
      <input name="address" placeholder="Address" onChange={handleChange} /><br /><br />
      <button onClick={handleRegister}>Register</button>
    </div>
  );
}