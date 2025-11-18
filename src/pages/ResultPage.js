import React, { useEffect, useState } from "react";
import API from "../api";
import { useParams } from "react-router-dom";

export default function ResultPage() {
  const { id } = useParams();
  const [liveResults, setLiveResults] = useState([]);
  const [savedResult, setSavedResult] = useState(null);

  const load = async () => {
    // LIVE RESULTS
    const r = await API.get(`/result/${id}`);
    setLiveResults(r.data);

    // SAVED RESULT (if exists)
    try {
      const s = await API.get(`/result/saved/${id}`);
      setSavedResult(s.data);
    } catch (err) {
      // ignore (saved result not declared yet)
    }
  };

  const declareWinner = async () => {
    try {
      const r = await API.post(`/result/declare/${id}`);
      alert("Winner Declared!");
      setSavedResult(r.data);
    } catch (err) {
      alert(err.response?.data?.msg || "Error");
    }
  };

  useEffect(() => load(), []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Election Results</h2>
  {/* SHOW SAVED RESULT IF DECLARED */}
      {savedResult ? (
        <>
          <h3 style={{ color: "green" }}>🏆 Winner: {savedResult.winner}</h3>
          <h4>Saved Final Results</h4>
          {savedResult.results.map((r, index) => (
            <p key={index}>{r.candidateName} — {r.count} votes</p>
          ))}
        </>
      ) : (
        <>
          <h3>Live Results (Not Declared)</h3>
          {liveResults.length === 0 ? (
            <p>No votes yet</p>
          ) : (
            liveResults.map((r) => (
              <p key={r.candidateId}>
                {r.candidateName} — {r.count} votes
              </p>
            ))
          )}

          <button onClick={declareWinner} style={{ marginTop: 20 }}>
            Declare Winner
          </button>
        </>
      )}
    </div>
  );
}