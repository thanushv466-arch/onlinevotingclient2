import React, { useState, useEffect } from "react";
import API from "../api";
import { useParams } from "react-router-dom";

export default function VotingPage() {
  const { id } = useParams(); 
  const [voterId, setVoterId] = useState("");
  const [candidates, setCandidates] = useState([]);

  const load = async () => {
    const res = await API.get(`/candidate/${id}`);
    setCandidates(res.data);
  };

  const vote = async (cid) => {
    const voter = prompt("Enter your registered voter email:");
    const password = prompt("Enter your password:");

    const login = await API.post("/voter/login", {
      email: voter,
      password,
    });

    await API.post("/vote", {
      voter: login.data._id,
      candidate: cid,
      election: id,
    });

    alert("Vote recorded successfully!");
  };

  useEffect(() => { load(); }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>Voting Page</h2>
      {candidates.map((c) => (
        <div key={c._id} style={{ margin: "10px 0" }}>
          {c.name} — {c.party}
          <button onClick={() => vote(c._id)}>Vote</button>
        </div>
      ))}
    </div>
  );
}