import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api";

export default function ElectionPage() {
  const { id } = useParams();  
  const navigate = useNavigate();

  const [election, setElection] = useState({});
  const [candidates, setCandidates] = useState([]);
  const [voters, setVoters] = useState([]);

  const [candidateName, setCandidateName] = useState("");
  const [candidateParty, setCandidateParty] = useState("");

  const [voterName, setVoterName] = useState("");
  const [voterEmail, setVoterEmail] = useState("");
  const [voterPassword, setVoterPassword] = useState("");

  // LOAD ELECTION
  const fetchElection = async () => {
    const res = await API.get("/election");
    setElection(res.data.find((e) => e._id === id) || {});
  };

  // LOAD CANDIDATES
  const fetchCandidates = async () => {
    const res = await API.get(`/candidate/${id}`);
    setCandidates(res.data);
  };

  // LOAD VOTERS
  const fetchVoters = async () => {
    const res = await API.get(`/voter/${id}`);
    setVoters(res.data);
  };

  // ADD CANDIDATE
  const addCandidate = async () => {
    if (!candidateName || !candidateParty)
      return alert("Enter all fields");

    await API.post("/candidate", {
      name: candidateName,
      party: candidateParty,
      election: id,
    });

    setCandidateName("");
    setCandidateParty("");
    fetchCandidates();
  };

  // ADD VOTER
  const addVoter = async () => {
    if (!voterName || !voterEmail || !voterPassword)
      return alert("Enter all voter fields");

    await API.post("/voter", {
      name: voterName,
      email: voterEmail,
      password: voterPassword,
      election: id,
    });

    setVoterName("");
    setVoterEmail("");
    setVoterPassword("");
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

      <h3>Add Candidate</h3>
      <input
        placeholder="Candidate Name"
        value={candidateName}
        onChange={(e) => setCandidateName(e.target.value)}
      />
      <input
        placeholder="Party Name"
        value={candidateParty}
        onChange={(e) => setCandidateParty(e.target.value)}
      />
      <button onClick={addCandidate}>Add Candidate</button>

      <h4>Candidate List</h4>
      <ul>
        {candidates.map((c) => (
          <li key={c._id}>{c.name} — {c.party}</li>
        ))}
      </ul>

      <hr />

      <h3>Add Voter</h3>
      <input
        placeholder="Voter Name"
        value={voterName}
        onChange={(e) => setVoterName(e.target.value)}
      />
      <input
        placeholder="Voter Email"
        value={voterEmail}
        onChange={(e) => setVoterEmail(e.target.value)}
      />
      <input
        placeholder="Password"
        value={voterPassword}
        onChange={(e) => setVoterPassword(e.target.value)}
      />
      <button onClick={addVoter}>Add Voter</button>

      <h4>Voter List</h4>
      <ul>
        {voters.map((v) => (
          <li key={v._id}>{v.name} — {v.email}</li>
        ))}
      </ul>

      <hr />

      <button onClick={() => navigate(`/vote/${id}`)}>Go to Voting Page</button>
      <button onClick={() => navigate(`/results/${id}`)}>View Results</button>
      <button onClick={() => navigate("/admin")}>Back</button>
    </div>
  );
}