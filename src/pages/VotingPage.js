import React, { useState, useEffect } from "react";
import API from "../api";
import { useParams, useLocation } from "react-router-dom";

export default function VotingPage() {
  const { id } = useParams(); // election
  const query = new URLSearchParams(useLocation().search);
  const voterId = query.get("voter");

  const [candidates, setCandidates] = useState([]);

  const load = async () => {
    const res = await API.get('/candidate/${id}');
    setCandidates(res.data);
  };

  const vote = async (cid) => {
    await API.post("/vote", {
      electionId: id,
      candidateId: cid,
      voterId,
    });
    alert("Vote recorded");
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>Voting Page</h2>
      {candidates.map((c) => (
        <div key={c._id}>
          {c.name} — {c.party}
          <button onClick={() => vote(c._id)}>Vote</button>
        </div>
      ))}
    </div>
  );
}