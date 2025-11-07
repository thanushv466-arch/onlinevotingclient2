import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import VoterLogin from "./pages/VoterLogin";
import VoterRegister from "./pages/VoterRegister";
import VotingPage from "./pages/VotingPage";
import ResultPage from "./pages/ResultPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/voter-login" element={<VoterLogin />} />
        <Route path="/voter-register" element={<VoterRegister />} />
        <Route path="/vote" element={<VotingPage />} />
        <Route path="/result" element={<ResultPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
