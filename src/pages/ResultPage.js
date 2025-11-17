import React, { useEffect, useState } from "react";
import API from "../api";
import { useParams } from "react-router-dom";

export default function ResultPage() {
  const { id } = useParams();
  const [winner, setWinner] = useState(null);
  const [results, setResults] = useState([]);
  const [totalVotes, setTotalVotes] = useState(0);

  const loadResults = async () => {
    const res = await API.get(`/result/${id}`);

    setWinner(res.data.winner);
    setResults(res.data.results);
    setTotalVotes(res.data.totalVotes);
  };

  useEffect(() => {
    loadResults();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>📊 Election Results</h2>

      {/* No votes */}
      {results.length === 0 && <p>No votes yet</p>}

      {/* Winner Section */}
      {winner && (
        <div
          style={{
            padding: 20,
            marginBottom: 20,
            background: "#ffe8a1",
            border: "2px solid #ffb100",
            borderRadius: 10
          }}
        >
          <h3>🏆 Winner</h3>
          <h2>
            {winner.candidate.name} ({winner.candidate.party})
          </h2>
          <p style={{ fontSize: "18px", fontWeight: "bold" }}>
            Votes: {winner.count}
          </p>
        </div>
      )}

      {/* Full Results */}
      <h3>📌 Vote Count</h3>
      <ul>
        {results.map((r) => (
          <li key={r.candidate._id}>
            {r.candidate.name} ({r.candidate.party}) — 
            <b> {r.count} votes</b>
          </li>
        ))}
      </ul>

      <p style={{ marginTop: 20, fontStyle: "italic" }}>
        Total votes: {totalVotes}
      </p>
    </div>
  );
}