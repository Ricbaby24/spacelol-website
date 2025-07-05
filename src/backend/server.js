// server.js
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Save purchases to a file (you can switch to a real DB later)
const LOG_FILE = path.join(__dirname, 'presale-log.json');

function readLogs() {
  try {
    return JSON.parse(fs.readFileSync(LOG_FILE));
  } catch {
    return [];
  }
}

function saveLogs(logs) {
  fs.writeFileSync(LOG_FILE, JSON.stringify(logs, null, 2));
}

app.get('/', (req, res) => {
  res.send('🛰️ Spacelol backend is running');
});

// Store each purchase
app.post('/api/presale-track', (req, res) => {
  const { wallet, amount, signature, timestamp } = req.body;

  if (!wallet || !amount || !signature || !timestamp) {
    return res.status(400).json({ error: 'Missing fields in request body' });
  }

  const logs = readLogs();
  logs.push({ wallet, amount, signature, timestamp });
  saveLogs(logs);

  console.log('✅ Purchase tracked:', { wallet, amount });
  res.status(200).json({ success: true });
});

// Optional: View all tracked purchases (e.g. for leaderboard)
app.get('/api/purchases', (req, res) => {
  const logs = readLogs();
  res.json(logs);
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
