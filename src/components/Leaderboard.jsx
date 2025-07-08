import React, { useEffect, useState } from 'react';

const BACKEND_URL = 'https://spacelol-backend.onrender.com';

const LeaderboardPage = () => {
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
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#0f0f0f',
        color: 'white',
        padding: '2rem',
        fontFamily: 'Inter, sans-serif',
      }}
    >
      <h1 style={{ fontSize: '2rem', marginBottom: '1rem', textAlign: 'center' }}>
        🏆 Spacelol Presale Leaderboard
      </h1>

      {error ? (
        <p style={{ color: '#ff4d4d', textAlign: 'center' }}>{error}</p>
      ) : (
        <table style={{ width: '100%', maxWidth: '800px', margin: '0 auto', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #555' }}>
              <th style={{ padding: '0.5rem' }}>#</th>
              <th style={{ padding: '0.5rem' }}>Wallet</th>
              <th style={{ padding: '0.5rem' }}>Amount (SOL)</th>
              <th style={{ padding: '0.5rem' }}>Date</th>
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan="4" style={{ textAlign: 'center', padding: '1rem', color: '#ccc' }}>
                  No contributions yet.
                </td>
              </tr>
            ) : (
              data.map((entry, index) => (
                <tr key={index} style={{ borderBottom: '1px solid #333' }}>
                  <td style={{ padding: '0.5rem', textAlign: 'center' }}>{index + 1}</td>
                  <td style={{ padding: '0.5rem', fontFamily: 'monospace' }}>
                    {entry.wallet.slice(0, 6)}...{entry.wallet.slice(-4)}
                  </td>
                  <td style={{ padding: '0.5rem' }}>{entry.amount} SOL</td>
                  <td style={{ padding: '0.5rem', fontSize: '0.9rem', color: '#aaa' }}>
                    {new Date(entry.timestamp).toLocaleString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Leaderboard;
