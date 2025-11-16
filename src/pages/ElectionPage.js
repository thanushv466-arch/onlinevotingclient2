import React, { useState, useEffect } from "react";

const ElectionPage = () => {
  const [elections, setElections] = useState([]);   // Existing elections
  const [newElection, setNewElection] = useState(""); // New election name

  // Backend URL from .env
  const API_URL = process.env.REACT_APP_API_URL;

  // Fetch elections on page load
  useEffect(() => {
    fetchElections();
  }, []);

  const fetchElections = async () => {
    try {
      const res = await fetch({$API_URL}/getElections);
      const data = await res.json();
      setElections(data);  // Update state to display
    } catch (error) {
      console.error("Error fetching elections:", error);
    }
  };

  const handleAddElection = async () => {
    if (!newElection) {
      alert("Please enter election name");
      return;
    }

    try {
      const res = await fetch({$API_URL}/addElection, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newElection })
      });

      const data = await res.json();

      if (res.ok) {
        // Option 1: Add new election directly to state
        setElections([...elections, data]);  

        // Option 2 (alternative): Re-fetch all elections
        // await fetchElections();

        setNewElection(""); // Clear input
      } else {
        alert(data.message || "Failed to add election");
      }
    } catch (error) {
      console.error("Error adding election:", error);
      alert("Error adding election");
    }
  };

  return (
    <div>
      <h1>Election Management</h1>

      {/* Add Election */}
      <div>
        <input
          type="text"
          placeholder="Enter election name"
          value={newElection}
          onChange={(e) => setNewElection(e.target.value)}
        />
        <button onClick={handleAddElection}>Add Election</button>
      </div>

      {/* Existing Elections */}
      <h2>Existing Elections:</h2>
      {elections.length === 0 ? (
        <p>No elections yet.</p>
      ) : (
        <ul>
          {elections.map((e) => (
            <li key={e.id || e._id}>{e.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ElectionPage;