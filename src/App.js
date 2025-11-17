import { BrowserRouter, Routes, Route } from "react-router-dom";

import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import ElectionPage from "./pages/ElectionPage";
import ResultPage from "./pages/ResultPage";
import VoterLogin from "./pages/VoterLogin";
import VotingPage from "./pages/VotingPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminDashboard />} />

        <Route path="/election/:id" element={<ElectionPage />} />
        <Route path="/results/:id" element={<ResultPage />} />

        <Route path="/voter/login/:id" element={<VoterLogin />} />
        <Route path="/vote/:id" element={<VotingPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;