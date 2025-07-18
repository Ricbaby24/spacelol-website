import { useEffect, useState } from 'react';

const BACKEND_URL = 'https://spacelol-backend.onrender.com';
const PRESALE_WALLET = 'EKrh19F53n9v5Wt8CaGy6fAAzZ75Jxo48jq8APqJoJry';
const ALCHEMY_RPC = 'https://solana-mainnet.g.alchemy.com/v2/jMkXZky_t4wBBnOQqMtojkWwlmHwrfIk';

export default function BuyButton() {
  const [walletAddress, setWalletAddress] = useState(null);
  const [amountSOL, setAmountSOL] = useState(0.05);
  const [loading, setLoading] = useState(false);
  const [txSig, setTxSig] = useState(null);
  const [result, setResult] = useState(null);

  useEffect(() => {
    if (window.solana?.isPhantom) {
      window.solana.connect({ onlyIfTrusted: true }).then(({ publicKey }) => {
        setWalletAddress(publicKey.toString());
      });
    }
  }, []);

  const connectWallet = async () => {
    try {
      const response = await window.solana.connect();
      setWalletAddress(response.publicKey.toString());
    } catch (err) {
      console.error('Wallet connection failed', err);
    }
  };

  const sendSol = async () => {
    try {
      setLoading(true);
      const provider = window.solana;
      const lamports = Math.floor(amountSOL * 1e9);

      const connection = new window.solanaWeb3.Connection(ALCHEMY_RPC);
      const { blockhash } = await connection.getLatestBlockhash('confirmed');

      const transaction = new window.solanaWeb3.Transaction({
        recentBlockhash: blockhash,
        feePayer: provider.publicKey,
      }).add(
        window.solanaWeb3.SystemProgram.transfer({
          fromPubkey: provider.publicKey,
          toPubkey: new window.solanaWeb3.PublicKey(PRESALE_WALLET),
          lamports,
        })
      );

      const signedTx = await provider.signTransaction(transaction);
      const txid = await connection.sendRawTransaction(signedTx.serialize());
      await connection.confirmTransaction(txid, 'confirmed');

      setTxSig(txid);

      const response = await fetch(`${BACKEND_URL}/api/purchase`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          wallet: provider.publicKey.toString(),
          amount: amountSOL,
          txSig: txid,
        }),
      });

      const json = await response.json();
      setResult(json);
    } catch (err) {
      console.error('❌ Transaction error:', err);
      alert('❌ Transaction failed. See console for details.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 bg-gray-900 rounded-xl text-white space-y-4 max-w-sm mx-auto">
      {!walletAddress ? (
        <button onClick={connectWallet} className="bg-purple-600 p-2 rounded w-full">
          Connect Phantom
        </button>
      ) : (
        <>
          <input
            type="number"
            step="0.01"
            min="0.01"
            max="1"
            value={amountSOL}
            onChange={(e) => setAmountSOL(parseFloat(e.target.value))}
            className="w-full p-2 rounded bg-gray-800 text-white"
            placeholder="Amount in SOL"
          />
          <button
            onClick={sendSol}
            disabled={loading}
            className="bg-green-500 p-2 rounded w-full"
          >
            {loading ? 'Processing...' : 'Buy $SPLOL'}
          </button>
          {txSig && (
            <div>
              <p className="text-sm text-gray-300">Tx Signature:</p>
              <a
                href={`https://solscan.io/tx/${txSig}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 break-all"
              >
                {txSig}
              </a>
            </div>
          )}
          {result?.success && (
            <div className="text-green-400">
              ✅ Received {result.tokensSent} $SPLOL!
            </div>
          )}
          {result?.error && (
            <div className="text-red-400">
              ❌ {result.error}
            </div>
          )}
        </>
      )}
    </div>
  );
}
