import React from 'react';

const Whitepaper = () => {
  return (
    <div style={styles.wrapper}>
      <div style={styles.overlay}>
        <div style={styles.container}>
          <h1 style={styles.header}>📜 Spacelol Whitepaper</h1>
          <p style={styles.subtitle}>
            $SPLOL is the engine behind the most chaotic meme mission in Solana’s history. Here's the breakdown:
          </p>

          <section style={styles.section}>
            <h2 style={styles.title}>🪐 Tokenomics</h2>
            <ul style={styles.list}>
              <li><strong>Total Supply:</strong> 1,000,000,000 $SPLOL</li>
              <li><strong>Presale:</strong> 20% (200,000,000)</li>
              <li><strong>DEX Liquidity:</strong> 30%</li>
              <li><strong>Community Rewards:</strong> 25%</li>
              <li><strong>Development & Treasury:</strong> 15%</li>
              <li><strong>Team:</strong> 10% (locked 6 months)</li>
            </ul>
          </section>

          <section style={styles.section}>
            <h2 style={styles.title}>🌌 Vision</h2>
            <p>
              We’re not just here to pump — we’re here to meme responsibly.
              $SPLOL fuels the community with fun and utility through NFTs, staking,
              meme contests, and governance by degens.
            </p>
          </section>

          <section style={styles.section}>
            <h2 style={styles.title}>🔐 Security</h2>
            <ul style={styles.list}>
              <li>✅ Liquidity will be locked</li>
              <li>✅ Ownership renounced</li>
              <li>✅ Transparent presale wallet</li>
            </ul>
          </section>

          <p style={styles.warning}>
            💡 Always verify info on our official channels:<br />
            <a href="https://x.com/SPLOLofficial" target="_blank" rel="noreferrer">Twitter/X</a> | <a href="https://t.me/+gyOLH39iCh1iMGI0" target="_blank" rel="noreferrer">Telegram</a>
          </p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  wrapper: {
    minHeight: '100vh',
    backgroundImage: 'url(https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?fit=crop&w=1920&q=80)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '2rem',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    borderRadius: '16px',
    padding: '2rem',
    width: '100%',
    maxWidth: '900px',
  },
  container: {
    color: 'white',
    fontFamily: 'Inter, sans-serif',
    lineHeight: 1.6
  },
  header: {
    fontSize: '2rem',
    marginBottom: '1rem'
  },
  subtitle: {
    fontSize: '1.1rem',
    marginBottom: '2rem'
  },
  section: {
    marginBottom: '2rem'
  },
  title: {
    fontSize: '1.3rem',
    marginBottom: '0.5rem',
    color: '#00ffcc'
  },
  list: {
    paddingLeft: '1.2rem'
  },
  warning: {
    marginTop: '2rem',
    fontWeight: 'bold',
    fontSize: '1rem',
    color: '#ff6666'
  }
};

export default Whitepaper;
