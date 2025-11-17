import React, { useEffect, useState } from "react";
import API from "../api";
import { useParams } from "react-router-dom";

export default function ResultPage() {
  const { id } = useParams();
  const [votes, setVotes] = useState([]);

  const loadResults = async () => {
    const res = await API.get(`/result/${id}`);
    setVotes(res.data);
  };

  useEffect(() => {
    loadResults();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>Election Results</h2>

      {votes.length === 0 && <p>No votes yet</p>}

      {votes.map(v => (
        <p key={v._id}>
          {v.candidate.name} — voted by {v.voter.email}
        </p>
      ))}
    </div>
  );
}