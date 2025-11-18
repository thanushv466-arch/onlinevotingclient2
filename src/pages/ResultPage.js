import React, { useEffect, useState } from "react";
import API from "../api";
import { useParams } from "react-router-dom";

export default function ResultPage() {
  const { id } = useParams();
  const [results, setResults] = useState([]);

  const load = async () => {
    const r = await API.get(`/result/${id}`);
    setResults(r.data);
  };

  useEffect(() => load(), []);

  return (
    <div style={{ padding: 20 }}>
      <h2>Election Results</h2>

      {results.length === 0 ? (
        <h3>No votes yet</h3>
      ) : (
        results.map((r, index) => (
          <p key={index}>
            {r.candidateName} — {r.count} votes
          </p>
        ))
      )}
    </div>
  );
}
