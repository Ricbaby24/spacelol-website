import React, { useEffect, useState } from 'react';

const Leaderboard = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('https://spacelol-backend.onrender.com/api/leaderboard')
      .then((res) => res.json())
      .then(setData)
      .catch(console.error);
  }, []);

  return (
    <div style={{ marginTop: '2rem', color: 'white' }}>
      <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>🏆 Leaderboard</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {data.map((entry, index) => (
          <li key={index} style={{ marginBottom: '0.75rem' }}>
            <strong>{index + 1}.</strong> {entry.wallet.slice(0, 6)}...{entry.wallet.slice(-4)} — 💰 {entry.amount} SOL
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Leaderboard;
