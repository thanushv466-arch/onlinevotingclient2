import React, { useState, useEffect } from "react";
import API from "../api";
import { useParams } from "react-router-dom";

export default function VotingPage() {
  const { id } = useParams();
  const [candidates, setCandidates] = useState([]);

  const load = async () => {
    const res = await API.get(`/candidate/${id}`);
    setCandidates(res.data);
  };

  const vote = async (cid) => {
    const email = prompt("Voter email:");
    const password = prompt("Password:");

    const login = await API.post("/voter/login", { email, password });

    await API.post("/vote", {
      election: id,
      candidate: cid,
      voter: login.data._id
    });

    alert("Vote Submitted!");
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>Vote Your Candidate</h2>
      {candidates.map(c => (
        <div key={c._id}>
          {c.name} — {c.party} 
          <button onClick={() => vote(c._id)}>Vote</button>
        </div>
      ))}
    </div>
  );
}