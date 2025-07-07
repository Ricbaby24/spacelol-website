import React, { useEffect, useState } from 'react';

const BACKEND_URL = 'https://spacelol-backend.onrender.com';

const Leaderboard = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadLeaderboard = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/api/leaderboard`);
        if (!res.ok) throw new Error('Failed to load leaderboard');
        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error(err);
        setError('⚠️ Could not load leaderboard');
      }
    };

    loadLeaderboard();
  }, []);

  return (
    <div style={{ marginTop: '2rem', color: 'white', textAlign: 'left' }}>
      <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>🏆 Leaderboard</h2>

      {error ? (
        <p style={{ color: '#ff4d4d' }}>{error}</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {data.length === 0 ? (
            <li style={{ color: '#ccc' }}>No contributions yet.</li>
          ) : (
            data.map((entry, index) => (
              <li key={index} style={{ marginBottom: '0.75rem' }}>
                <strong>{index + 1}.</strong>{' '}
                {entry.wallet.slice(0, 6)}...{entry.wallet.slice(-4)} — 💰{' '}
                {parseFloat(entry.amount).toFixed(3)} SOL
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
};

export default Leaderboard;
