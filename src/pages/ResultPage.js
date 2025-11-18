import React, { useEffect, useState } from "react";
import API from "../api";
import { useParams } from "react-router-dom";
import { Pie } from "react-chartjs-2";
import "chart.js/auto";

export default function ResultPage() {
  const { id } = useParams();

  const [results, setResults] = useState([]);
  const [winner, setWinner] = useState(null);
  const [declared, setDeclared] = useState(false);

  const loadResults = async () => {
    const res = await API.get(`/result/${id}`);
    setResults(res.data.results || []);
    setWinner(res.data.winner || null);
  };

  const declareWinner = async () => {
    const res = await API.post(`/result/declare/${id}`);
    alert(res.data.msg);
    setWinner(res.data.winner);
    setResults(res.data.results);
    setDeclared(true);
  };

  useEffect(() => {
    loadResults();
  }, []);

  return (
    <div style={{ padding: 30 }}>
      <h2>Election Results</h2>

      {!results.length ? (
        <h3>No votes yet</h3>
      ) : (
        <>
          <h3>Vote Count</h3>
          {results.map(r => (
            <p key={r._id}>
              <b>{r.name}</b> ({r.party}) — {r.votes} votes
            </p>
          ))}

          {/* PIE CHART */}
          <div style={{ width: "320px", marginTop: 20 }}>
            <Pie
              data={{
                labels: results.map(r => r.name),
                datasets: [
                  {
                    data: results.map(r => r.votes),
                    backgroundColor: ["#ff6384", "#36a2eb", "#ffce56", "#4bc0c0"],
                  },
                ],
              }}
            />
          </div>

          {/* WINNER SECTION */}
          {winner && (
            <div style={{ marginTop: 30, padding: 20, border: "2px solid green" }}>
              <h2>🏆 Winner: {winner.name}</h2>
              <h3>Party: {winner.party}</h3>
              <h3>Total Votes: {winner.votes}</h3>
            </div>
          )}

          {/* DECLARE WINNER BUTTON */}
          {!declared && (
            <button
              style={{ marginTop: 30, padding: "10px 20px", fontSize: 18 }}
              onClick={declareWinner}
            >
              Declare Winner
            </button>
          )}
        </>
      )}
    </div>
  );
}
