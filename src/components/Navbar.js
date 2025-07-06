import React from 'react';
import { Link } from 'react-router-dom';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

const Navbar = () => (
  <nav
    style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1rem 2rem',
      backgroundColor: '#0d0d0d',
      boxShadow: '0 2px 10px rgba(0,0,0,0.5)',
      borderBottom: '1px solid #222',
      fontFamily: 'Inter, sans-serif',
      flexWrap: 'wrap',
    }}
  >
    <h2
      style={{
        color: '#00ffcc',
        fontWeight: 'bold',
        fontSize: '1.5rem',
        margin: 0,
      }}
    >
      🚀 Spacelol
    </h2>

    <div
      style={{
        display: 'flex',
        gap: '1rem',
        alignItems: 'center',
        flexWrap: 'wrap',
      }}
    >
      {[
        { label: 'Home', to: '/' },
        { label: 'Leaderboard', to: '/leaderboard' },
        { label: 'Whitepaper', to: '/whitepaper' },
        { label: 'Roadmap', to: '/roadmap' },
      ].map((item) => (
        <Link
          key={item.to}
          to={item.to}
          style={{
            color: '#ffffff',
            textDecoration: 'none',
            padding: '0.5rem 0.75rem',
            borderRadius: '8px',
            transition: 'background 0.3s ease',
          }}
          onMouseEnter={(e) => (e.target.style.background = '#1a1a1a')}
          onMouseLeave={(e) => (e.target.style.background = 'transparent')}
        >
          {item.label}
        </Link>
      ))}

      <WalletMultiButton style={{ backgroundColor: '#00ffcc', color: '#000' }} />
    </div>
  </nav>
);

export default Navbar;
