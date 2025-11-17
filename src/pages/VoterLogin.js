import React, { useState } from "react";
import API from "../api";
import { useNavigate, useParams } from "react-router-dom";

export default function VoterLogin() {
  const [voterId, setVoterId] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  const login = async () => {
    navigate('/vote/${id}?voter=${voterId}');
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Voter Login</h2>
      <input placeholder="Your Voter ID" value={voterId} onChange={(e)=>setVoterId(e.target.value)} />
      <button onClick={login}>Enter Voting</button>
    </div>
  );
}