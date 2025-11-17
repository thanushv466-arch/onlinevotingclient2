import React, { useState } from "react";
import API from "../api";

export default function VoterRegister({ electionId }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const register = async () => {
    if (!name || !email || !password)
      return alert("All fields required");

    await API.post("/voter", {
      name,
      email,
      password,
      election: electionId,
    });

    alert("Voter added!");
  };

  return (
    <div>
      <h3>Register Voter</h3>

      <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} /><br />
      <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} /><br />
      <input placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} /><br />

      <button onClick={register}>Add Voter</button>
    </div>
  );
}