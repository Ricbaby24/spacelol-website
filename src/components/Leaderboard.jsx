import React, { useEffect, useState } from 'react';

const BACKEND_URL = 'https://spacelol-backend.onrender.com';

const Leaderboard = () => {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/api/leaderboard`);
        const data = await res.json();
        setEntries(data);
      } catch (error) {
        console.error('Failed to fetch leaderboard:', error);
        setEntries([]);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  return (
    <div className="p-4 bg-black text-white max-w-4xl mx-auto rounded-xl shadow-lg mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center">🚀 Spacelol Leaderboard</h2>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : entries.length === 0 ? (
        <p className="text-center">No contributions yet. Be the first degen!</p>
      ) : (
        <table className="w-full table-auto text-left border-collapse">
          <thead>
            <tr className="text-purple-400 border-b border-gray-600">
              <th className="p-2">Wallet</th>
              <th className="p-2">SOL</th>
              <th className="p-2">Time</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry, i) => (
              <tr key={i} className="border-b border-gray-700 hover:bg-gray-800">
                <td className="p-2">{entry.wallet.slice(0, 4)}...{entry.wallet.slice(-4)}</td>
                <td className="p-2">{entry.amount.toFixed(2)} SOL</td>
                <td className="p-2">{new Date(entry.time).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Leaderboard;
