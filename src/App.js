import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Whitepaper from './pages/Whitepaper';
import Roadmap from './pages/Roadmap';
import ClaimNFT from './pages/ClaimNFT';
import Leaderboard from './pages/Leaderboard';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/whitepaper" element={<Whitepaper />} />
        <Route path="/roadmap" element={<Roadmap />} />
        <Route path="/claim" element={<ClaimNFT />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
      </Routes>
    </Router>
  );
}

export default App;
