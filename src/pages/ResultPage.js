import React, { useEffect, useState } from "react";
import API from "../api";
import { useParams } from "react-router-dom";

export default function ResultPage() {
  const { id } = useParams();
  const [result, setResult] = useState([]);
  const [candidates, setCandidates] = useState([]);

  const load = async () => {
    const r = await API.get('/result/${id}');
    setResult(r.data);

    const c = await API.get('/candidate/${id}');
    setCandidates(c.data);
  };

  const getName = (cid) => {
    const c = candidates.find((x) => x._id === cid);
    return c ? c.name : "Unknown";
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>Election Results</h2>

      {result.map((r) => (
        <div key={r._id}>
          {getName(r._id)} — <b>{r.votes} votes</b>
        </div>
      ))}
    </div>
  );
}