import React, { useEffect, useState } from "react";
import API from "../api";

export default function ResultPage() {
  const [results, setResults] = useState([]);

  useEffect(() => {
    API.get("/result").then((res) => setResults(res.data));
  }, []);

  return (
    <div style={{ padding: "30px" }}>
      <h2>Election Results</h2>
      {results.map((r) => (
        <div key={r._id} style={{ margin: "10px", padding: "10px", border: "1px solid gray" }}>
          <h4>{r.election?.name}</h4>
          <p>Winner: {r.winner?.name}</p>
          <p>Total Votes: {r.totalVotes}</p>
          <p>Status: {r.status}</p>
        </div>
      ))}
    </div>
  );
}