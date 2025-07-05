import React from 'react';

const Roadmap = () => {
  return (
    <div style={styles.wrapper}>
      <div style={styles.overlay}>
        <div style={styles.container}>
          <h1 style={styles.header}>🗺️ Spacelol Roadmap</h1>
          <p style={styles.subtitle}>
            From memecoin madness to interstellar missions, here’s our grand plan to take $SPLOL to the moon (and beyond).
          </p>

          <section style={styles.phase}>
            <h2 style={styles.phaseTitle}>✅ Phase 1: Launch Sequence</h2>
            <ul style={styles.list}>
              <li>🚀 Token creation ($SPLOL)</li>
              <li>🌍 Website & social launch</li>
              <li>🧑‍🚀 Meme branding & viral campaigns</li>
              <li>🎯 Presale for early community members</li>
              <li>📢 Telegram and Twitter shill blitz</li>
            </ul>
          </section>

          <section style={styles.phase}>
            <h2 style={styles.phaseTitle}>🌌 Phase 2: Orbit Expansion</h2>
            <ul style={styles.list}>
              <li>🛸 Launch on Solana DEX (Jupiter, Raydium)</li>
              <li>📈 CoinGecko & CoinMarketCap listings</li>
              <li>🎁 Meme contest with $SPLOL prizes</li>
              <li>🤝 Influencer collabs & viral growth</li>
              <li>🌐 Airdrops to loyal degens</li>
            </ul>
          </section>

          <section style={styles.phase}>
            <h2 style={styles.phaseTitle}>🧠 Phase 3: Meme Utility</h2>
            <ul style={styles.list}>
              <li>🎮 Meme-based mini-games</li>
              <li>🖼️ Spacelol NFT collection: Degen Astronauts</li>
              <li>💰 Staking for meme yield</li>
              <li>👽 Governance voting for future missions</li>
              <li>🌠 Meme Missions: surprise community events</li>
            </ul>
          </section>

          <p style={styles.footer}>
            We’re not just here for fun — we’re building the funniest damn token in the galaxy. 🌌
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
    lineHeight: 1.6,
  },
  header: {
    fontSize: '2rem',
    marginBottom: '1rem',
  },
  subtitle: {
    fontSize: '1.1rem',
    marginBottom: '2rem',
  },
  phase: {
    marginBottom: '2.5rem',
  },
  phaseTitle: {
    fontSize: '1.4rem',
    color: '#00ffcc',
    marginBottom: '0.5rem',
  },
  list: {
    paddingLeft: '1.2rem',
    fontSize: '1rem',
  },
  footer: {
    fontWeight: 'bold',
    marginTop: '2rem',
    fontSize: '1.1rem',
    color: '#ffcc00',
  },
};

export default Roadmap;
