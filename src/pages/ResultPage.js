import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api";

export default function ResultPage() {
  const { id } = useParams();
  const [results, setResults] = useState([]);

  const load = async () => {
    const res = await API.get(`/result/${id}`);
    setResults(res.data);
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>Election Results</h2>

      {results.length === 0 ? (
        <p>No votes yet.</p>
      ) : (
        <ul>
          {results.map((r) => (
            <li key={r.candidateId}>
              <b>{r.name}</b> ({r.party}) — Votes: {r.votes}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}