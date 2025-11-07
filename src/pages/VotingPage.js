import React, { useEffect, useState } from "react";
import API from "../api";

export default function VotingPage() {
  const [candidates, setCandidates] = useState([]);
  const voter = JSON.parse(localStorage.getItem("voter"));

  const fetchCandidates = async () => {
    const res = await API.get("/candidate");
    setCandidates(res.data);
  };

  const castVote = async (candidateId, electionId) => {
    await API.post("/vote", {
      voterId: voter._id,
      candidateId,
      electionId,
    });
    alert("Vote recorded!");
  };

  useEffect(() => {
    fetchCandidates();
  }, []);

  return (
    <div style={{ padding: "30px" }}>
      <h2>Welcome, {voter?.name}</h2>
      <h3>Vote for your Candidate</h3>
      {candidates.map((c) => (
        <div key={c._id} style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
          <h4>{c.name}</h4>
          <p>Party: {c.party?.name}</p>
          <button onClick={() => castVote(c._id, c.election._id)}>Vote</button>
        </div>
      ))}
    </div>
  );
}