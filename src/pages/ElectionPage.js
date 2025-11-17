import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api";

export default function ElectionPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [candidates, setCandidates] = useState([]);
  const [voters, setVoters] = useState([]);

  const [candidateName, setCandidateName] = useState("");
  const [candidateParty, setCandidateParty] = useState("");

  const [voterName, setVoterName] = useState("");
  const [voterEmail, setVoterEmail] = useState("");
  const [voterPassword, setVoterPassword] = useState("");

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
      return alert("Enter candidate name + party");

    await API.post("/candidate", {
      name: candidateName,
      party: candidateParty,
      election: id      // FIXED
    });

    setCandidateName("");
    setCandidateParty("");
    fetchCandidates();
  };

  // ADD VOTER
  const addVoter = async () => {
    if (!voterName || !voterEmail || !voterPassword)
      return alert("Enter all voter details");

    await API.post("/voter", {
      name: voterName,
      email: voterEmail,
      password: voterPassword,
      election: id      // FIXED
    });

    setVoterName("");
    setVoterEmail("");
    setVoterPassword("");
    fetchVoters();
  };

  useEffect(() => {
    fetchCandidates();
    fetchVoters();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>Election Panel</h2>

      <h3>Add Candidate</h3>
      <input placeholder="Name" value={candidateName} onChange={e => setCandidateName(e.target.value)} />
      <input placeholder="Party" value={candidateParty} onChange={e => setCandidateParty(e.target.value)} />
      <button onClick={addCandidate}>Add Candidate</button>

      <h4>Candidates</h4>
      {candidates.map(c => (
        <p key={c._id}>{c.name} — {c.party}</p>
      ))}

      <hr />

      <h3>Add Voter</h3>
      <input placeholder="Name" value={voterName} onChange={e => setVoterName(e.target.value)} />
      <input placeholder="Email" value={voterEmail} onChange={e => setVoterEmail(e.target.value)} />
      <input placeholder="Password" value={voterPassword} onChange={e => setVoterPassword(e.target.value)} />
      <button onClick={addVoter}>Add Voter</button>

      <h4>Voters</h4>
      {voters.map(v => (
        <p key={v._id}>{v.name} — {v.email}</p>
      ))}

      <hr />
      <button onClick={() => navigate(`/vote/${id}`)}>Go to Voting</button>
      <button onClick={() => navigate(`/results/${id}`)}>View Results</button>
    </div>
  );
}