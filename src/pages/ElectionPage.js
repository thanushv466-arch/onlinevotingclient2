import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api";

export default function ElectionPage() {
  const { id } = useParams();   // election id
  const navigate = useNavigate();

  const [election, setElection] = useState({});
  const [candidates, setCandidates] = useState([]);
  const [voters, setVoters] = useState([]);

  const [candidateName, setCandidateName] = useState("");
  const [candidateParty, setCandidateParty] = useState("");

  const [voterName, setVoterName] = useState("");
  const [voterEmail, setVoterEmail] = useState("");
  const [voterId, setVoterId] = useState("");

  // ---------------- Fetch election details ----------------
  const fetchElection = async () => {
    const res = await API.get('/election');
    const selected = res.data.find((e) => e._id === id);
    setElection(selected || {});
  };

  // ---------------- Fetch candidates ----------------
  const fetchCandidates = async () => {
    const res = await API.get('/candidate/${id}');
    setCandidates(res.data);
  };

  // ---------------- Fetch voters ----------------
  const fetchVoters = async () => {
    const res = await API.get('/voter/${id}');
    setVoters(res.data);
  };

  // ---------------- Add candidate ----------------
  const addCandidate = async () => {
    if (!candidateName || !candidateParty)
      return alert("Please enter candidate name and party");

    await API.post("/candidate", {
      name: candidateName,
      party: candidateParty,
      electionId: id,
    });

    setCandidateName("");
    setCandidateParty("");
    fetchCandidates();
  };

  // ---------------- Add voter ----------------
  const addVoter = async () => {
    if (!voterName || !voterEmail || !voterId)
      return alert("Fill all voter details");

    await API.post("/voter", {
      name: voterName,
      email: voterEmail,
      voterId,
      electionId: id,
    });

    setVoterName("");
    setVoterEmail("");
    setVoterId("");
    fetchVoters();
  };

  useEffect(() => {
    fetchElection();
    fetchCandidates();
    fetchVoters();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Election: {election?.name}</h2>

      <hr />

      {/* ---------------- Add Candidate ---------------- */}
      <h3>Add Candidate</h3>
      <input
        placeholder="Candidate Name"
        value={candidateName}
        onChange={(e) => setCandidateName(e.target.value)}
      />{" "}
      <input
        placeholder="Party"
        value={candidateParty}
        onChange={(e) => setCandidateParty(e.target.value)}
      />{" "}
      <button onClick={addCandidate}>Add Candidate</button>

      <h4>Candidate List</h4>
      <ul>
        {candidates.map((c) => (
          <li key={c._id}>
            {c.name} — {c.party}
          </li>
        ))}
      </ul>

      <hr />

      {/* ---------------- Add Voter ---------------- */}
      <h3>Add Voter</h3>
      <input
        placeholder="Voter Name"
        value={voterName}
        onChange={(e) => setVoterName(e.target.value)}
      />{" "}
      <input
        placeholder="Voter Email"
        value={voterEmail}
        onChange={(e) => setVoterEmail(e.target.value)}
      />{" "}
      <input
        placeholder="Voter ID"
        value={voterId}
        onChange={(e) => setVoterId(e.target.value)}
      />{" "}
      <button onClick={addVoter}>Add Voter</button>

      <h4>Voter List</h4>
      <ul>
        {voters.map((v) => (
          <li key={v._id}>
            {v.name} — {v.voterId}
          </li>
        ))}
      </ul>

      <hr />

      {/* ---------------- Navigation Buttons ---------------- */}
      <h3>Election Actions</h3>

      <button onClick={() => navigate('/vote/${id}')}>
        Go to Voting Page
      </button>{" "}
      <button onClick={() => navigate('/results/${id}')}>
        View Results
      </button>{" "}

      <button onClick={() => navigate("/admin")}>Back to Dashboard</button>
    </div>
  );
}