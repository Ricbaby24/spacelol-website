// pages/LeaderboardPage.js
import React, { useEffect, useState } from 'react';

const BACKEND_URL = 'https://spacelol-backend.onrender.com';

export default function LeaderboardPage() {
  const [data, setData] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/api/leaderboard`);
        if (!res.ok) throw new Error('Failed to fetch leaderboard');
        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error(err);
        setError('⚠️ Failed to load leaderboard');
      }
    };

    loadData();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-8 font-mono">
      <h1 className="text-3xl mb-6 text-center">🚀 Spacelol Leaderboard</h1>

      {error ? (
        <p className="text-red-400">{error}</p>
      ) : (
        <table className="w-full border border-gray-600 text-sm">
          <thead>
            <tr className="bg-gray-800 text-left">
              <th className="p-2 border border-gray-700">#</th>
              <th className="p-2 border border-gray-700">Wallet</th>
              <th className="p-2 border border-gray-700">Amount (SOL)</th>
              <th className="p-2 border border-gray-700">Time</th>
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan="4" className="p-4 text-center text-gray-400">No contributions yet.</td>
              </tr>
            ) : (
              data.map((entry, index) => (
                <tr key={index} className="border-t border-gray-700 hover:bg-gray-800">
                  <td className="p-2">{index + 1}</td>
                  <td className="p-2">{entry.wallet.slice(0, 6)}...{entry.wallet.slice(-4)}</td>
                  <td className="p-2">{entry.amount}</td>
                  <td className="p-2">{new Date(entry.time).toLocaleString()}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}
