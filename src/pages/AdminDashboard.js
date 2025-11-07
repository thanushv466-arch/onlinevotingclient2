import React, { useEffect, useState } from "react";
import API from "../api";

export default function AdminDashboard() {
  const [elections, setElections] = useState([]);
  const [name, setName] = useState("");

  const fetchElections = async () => {
    const res = await API.get("/election");
    setElections(res.data);
  };

  const createElection = async () => {
    await API.post("/election", {
      name,
      date: new Date(),
      type: "General",
      constituency: "Chennai",
    });
    setName("");
    fetchElections();
  };

  useEffect(() => {
    fetchElections();
  }, []);

  return (
    <div style={{ padding: "30px" }}>
      <h2>🗳️ Admin Dashboard</h2>
      <input
        placeholder="New Election Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={createElection}>Add Election</button>

      <h3>Existing Elections</h3>
      <ul>
        {elections.map((e) => (
          <li key={e._id}>
            {e.name} — {e.status}
          </li>
        ))}
      </ul>
    </div>
  );
}