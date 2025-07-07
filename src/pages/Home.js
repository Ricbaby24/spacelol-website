import React, { useState } from 'react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { PublicKey, Transaction, SystemProgram } from '@solana/web3.js';
import CountdownTimer from '../components/CountdownTimer';
import Leaderboard from '../components/Leaderboard';

const BACKEND_URL = 'https://spacelol-backend.onrender.com';
const PRESALE_ADDRESS = new PublicKey('EKrh19F53n9v5Wt8CaGy6fAAzZ75Jxo48jq8APqJoJry');
const BUY_LIMIT_SOL = 1;

const Home = () => {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();

  const [amount, setAmount] = useState(0.05);
  const [status, setStatus] = useState('');

  const handleBuy = async () => {
    setStatus('');
    try {
      if (!publicKey) {
        setStatus('❌ Please connect your wallet first!');
        return;
      }

      if (amount < 0.01 || amount > BUY_LIMIT_SOL) {
        setStatus('❌ Amount must be between 0.01 and 1 SOL');
        return;
      }

      const lamports = Math.floor(amount * 1e9);

      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: PRESALE_ADDRESS,
          lamports,
        })
      );

      const signature = await sendTransaction(transaction, connection);
      await connection.confirmTransaction(signature, 'confirmed');

      const res = await fetch(`${BACKEND_URL}/api/purchase`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          wallet: publicKey.toBase58(),
          amount,
          txSig: signature,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus(`✅ Purchase successful!\n${data.tokensSent || 'Tokens'} sent.\nTx: ${signature}`);
      } else {
        setStatus(`❌ Backend error: ${data.error || 'Try again later.'}`);
      }
    } catch (err) {
      console.error('Transaction failed:', err);
      setStatus('❌ Transaction failed. Please try again.');
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundImage: 'url(https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?fit=crop&w=1920&q=80)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.85)',
          padding: '2.5rem',
          borderRadius: '18px',
          maxWidth: '720px',
          width: '100%',
          textAlign: 'center',
          color: 'white',
          fontFamily: 'Inter, sans-serif',
        }}
      >
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
          🚀 Welcome to Spacelol ($SPLOL)
        </h1>

        <p style={{ marginBottom: '1.5rem', fontSize: '1.1rem' }}>
          The funniest memecoin on Solana — powered by laughs, degens, and interstellar dreams.
        </p>

        <p style={{ fontSize: '1rem', marginBottom: '1.5rem' }}>
          ⏳ Presale ends in: <CountdownTimer />
        </p>

        <WalletMultiButton />

        <div style={{ margin: '1.5rem 0' }}>
          <input
            type="number"
            min="0.01"
            max="1"
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            style={{
              padding: '0.5rem',
              fontSize: '1rem',
              width: '150px',
              marginRight: '0.5rem',
              borderRadius: '6px',
              border: '1px solid #ccc',
            }}
          />
          <span style={{ fontSize: '1rem' }}>SOL</span>
        </div>

        <button
          onClick={handleBuy}
          style={{
            padding: '0.75rem 1.5rem',
            fontSize: '1rem',
            backgroundColor: '#00ffcc',
            color: '#000',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            boxShadow: '0 0 12px #00ffcc',
            transition: 'transform 0.2s ease',
          }}
          onMouseEnter={(e) => (e.target.style.transform = 'scale(1.05)')}
          onMouseLeave={(e) => (e.target.style.transform = 'scale(1)')}
        >
          🚀 Buy $SPLOL Now
        </button>

        {status && (
          <p
            style={{
              marginTop: '1.2rem',
              color: status.startsWith('✅') ? '#00ffcc' : '#ff5050',
              fontSize: '0.95rem',
              whiteSpace: 'pre-wrap',
            }}
          >
            {status}
          </p>
        )}

        <p style={{ marginTop: '1.5rem', fontSize: '0.95rem', color: '#ccc' }}>
          Make history by becoming a founding degen. Presale buyers will receive limited NFTs.
        </p>

        <div style={{ marginTop: '2.5rem' }}>
          <Leaderboard />
        </div>
      </div>
    </div>
  );
};

export default Home;
