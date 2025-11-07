import React, { useState, useEffect } from "react";
import API from "../api";

export default function VotingPage() {
  const [candidates, setCandidates] = useState([]);
  const voter = JSON.parse(localStorage.getItem("voter"));

  const fetchCandidates = async () => {
    const res = await API.get("/candidate");
    setCandidates(res.data);
  };

  const castVote = async (candidateId, electionId) => {
    try {
      await API.post("/vote", { voterId: voter._id, candidateId, electionId });
      alert("Vote recorded successfully!");
      voter.hasVoted = true;
      localStorage.setItem("voter", JSON.stringify(voter));
    } catch (err) {
      alert(err.response?.data.msg || "Voting failed");
    }
  };

  useEffect(() => { fetchCandidates(); }, []);

  return (
    <div style={{ padding:"30px" }}>
      <h2>Welcome, {voter?.name}</h2>
      {voter?.hasVoted ? <p>You have already voted.</p> :
        <>
          <h3>Vote for your Candidate</h3>
          {candidates.map(c => (
            <div key={c._id} style={{ border:"1px solid #ccc", margin:"10px", padding:"10px" }}>
              <h4>{c.name}</h4>
              <p>Party: {c.party?.name}</p>
              <button onClick={() => castVote(c._id, c.election._id)}>Vote</button>
            </div>
          ))}
        </>
      }
    </div>
  );
}