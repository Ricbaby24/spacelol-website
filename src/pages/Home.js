import React, { useState } from 'react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { PublicKey, Transaction, SystemProgram } from '@solana/web3.js';
import CountdownTimer from '../components/CountdownTimer';

const PRESALE_ADDRESS = new PublicKey('EKrh19F53n9v5Wt8CaGy6fAAzZ75Jxo48jq8APqJoJry');
const BUY_LIMIT_SOL = 1;

const Home = () => {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  const [amount, setAmount] = useState(0.05);

 const handleBuy = async () => {
  try {
    if (!publicKey) {
      alert('Connect your wallet first!');
      return;
    }

    if (amount < 0.05 || amount > BUY_LIMIT_SOL) {
      alert('Please enter an amount between 0.01 and 1 SOL');
      return;
    }

    const lamports = amount * 1e9; // Use dynamic amount
    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: publicKey,
        toPubkey: PRESALE_ADDRESS,
        lamports,
      })
    );

    const signature = await sendTransaction(transaction, connection);
    await connection.confirmTransaction(signature, 'confirmed');

    // ✅ Notify backend of the purchase
    await fetch('https://spacelol-backend.onrender.com/purchase', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        wallet: publicKey.toBase58(),
        amount,
        signature,
      }),
    });

    alert(`✅ Purchase successful!\nTransaction Signature:\n${signature}`);
  } catch (err) {
    console.error(err);
    alert('❌ Transaction failed.');
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

        <div style={{ marginBottom: '1.5rem' }}>
          <WalletMultiButton />
        </div>

        <div style={{ marginBottom: '1rem' }}>
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
              marginRight: '1rem',
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

        <p style={{ marginTop: '1.5rem', fontSize: '0.95rem', color: '#ccc' }}>
          Make history by becoming a founding degen. Presale buyers will receive limited NFTs.
        </p>
      </div>
    </div>
  );
};

export default Home;
