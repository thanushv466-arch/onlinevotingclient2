import React, { useState, useEffect } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const [elections, setElections] = useState([]);
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const fetchElections = async () => {
    const res = await API.get("/election");
    setElections(res.data);
  };

  const createElection = async () => {
    if (!name) return alert("Enter election name");
    await API.post("/election", {
      name,
      date: new Date(),
      type: "General",
      constituency: "Chennai"
    });
    setName("");
    fetchElections();
  };

  useEffect(() => { fetchElections(); }, []);

  return (
    <div style={{ padding: "30px" }}>
      <h2>🗳 Admin Dashboard</h2>

      <input
        placeholder="New Election Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={createElection}>Add Election</button>

      <h3>Existing Elections</h3>

      {elections.map((e) => (
        <div key={e._id} style={{ marginBottom: "15px", border: "1px solid #ddd", padding: "10px" }}>
          <b>{e.name}</b><br />
          <button onClick={() => navigate('/election/${e._id}')}>Open Election Page</button>
          <button onClick={() => navigate('/results/${e._id}')}>View Results</button>
        </div>
      ))}
    </div>
  );
}