// src/components/BuySection.jsx
import React, { useState } from 'react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { PublicKey, Transaction, SystemProgram } from '@solana/web3.js';

const PRESALE_ADDRESS = new PublicKey('EKrh19F53n9v5Wt8CaGy6fAAzZ75Jxo48jq8APqJoJry');
const BUY_LIMIT_SOL = 1;

const BuySection = () => {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  const [amount, setAmount] = useState(0.05);
  const [status, setStatus] = useState('');

  const handleBuy = async () => {
    try {
      if (!publicKey) {
        alert('Connect your wallet first!');
        return;
      }

      if (amount < 0.01 || amount > BUY_LIMIT_SOL) {
        alert('Enter amount between 0.001 and 1 SOL');
        return;
      }

      const lamports = amount * 1e9;

      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: PRESALE_ADDRESS,
          lamports,
        })
      );

      const signature = await sendTransaction(transaction, connection);
      await connection.confirmTransaction(signature, 'confirmed');

      // Notify backend
      const res = await fetch('https://spacelol-backend.onrender.com/purchase', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          wallet: publicKey.toBase58(),
          amount,
          signature,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus(`✅ Purchase successful! ${data.tokensSent} $SPLOL sent.`);
      } else {
        setStatus(`❌ Error: ${data.error || 'Something went wrong.'}`);
      }

    } catch (err) {
      console.error(err);
      setStatus('❌ Transaction failed.');
    }
  };

  return (
    <div style={{ textAlign: 'center', color: 'white' }}>
      <div style={{ marginBottom: '1.5rem' }}>
        <WalletMultiButton />
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <input
          type="number"
          min="0.001"
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

      {status && (
        <p style={{ marginTop: '1rem', color: '#ccc', fontSize: '0.95rem' }}>{status}</p>
      )}
    </div>
  );
};

export default BuySection;
