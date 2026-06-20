import React, { useState } from 'react';

export default function Web3Terminal() {
  const [status, setStatus] = useState<'disconnected' | 'connecting' | 'connected' | 'signing' | 'signed'>('disconnected');
  const [address, setAddress] = useState('');
  const [signature, setSignature] = useState('');

  const connectWallet = async () => {
    setStatus('connecting');
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setAddress('0x10DEv0ps7fC5b7C79B7B9fB84C87D81E94958703');
    setStatus('connected');
  };

  const signMessage = async () => {
    setStatus('signing');
    await new Promise((resolve) => setTimeout(resolve, 1800));
    setSignature('0x6ee7b7d399ba8bfa72b6f472b6a78bfa72b6...605');
    setStatus('signed');
  };

  return (
    <div className="w-full max-w-2xl mx-auto my-8 font-mono bg-lacquer-deep border border-gold/30 rounded-sm overflow-hidden p-6 text-sm">
      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between border-b border-gold/20 pb-4 mb-4">
        <div className="flex items-center space-x-2">
          <span className="w-3 h-3 rounded-full bg-red-500"></span>
          <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
          <span className="w-3 h-3 rounded-full bg-green-500"></span>
        </div>
        <span className="text-xs text-text-muted">NO.10 SHADOW TERMINAL v1.0.0</span>
        <span className="text-xs text-gold">[ON-CHAIN WATCH]</span>
      </div>

      {/* Terminal Outputs */}
      <div className="space-y-3 min-h-[180px] text-text-warm">
        <div className="flex items-center space-x-2">
          <span className="text-gold">&gt;</span>
          <span>Initializing secure transport protocols...</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-gold">&gt;</span>
          <span>Status: <span className="text-patina">SECURE</span> | Host: LXC 110 (ai-core)</span>
        </div>

        {status === 'disconnected' && (
          <div className="pt-4">
            <p className="text-text-muted mb-4">Connect on-chain signature key to access decentralized console.</p>
            <button
              onClick={connectWallet}
              className="px-6 py-2 bg-gold text-lacquer-deep font-sans font-medium rounded-xs hover:bg-gold-rich transition-colors cursor-pointer"
            >
              Connect Wallet
            </button>
          </div>
        )}

        {status === 'connecting' && (
          <div className="flex items-center space-x-2 pt-4">
            <span className="animate-pulse text-gold">⚡</span>
            <span>Querying RPC providers for Sepolia node...</span>
          </div>
        )}

        {status === 'connected' && (
          <div className="pt-4 space-y-4">
            <div className="space-y-1">
              <div className="text-text-muted">Wallet Connected:</div>
              <div className="text-patina truncate select-all">{address}</div>
            </div>
            <button
              onClick={signMessage}
              className="px-6 py-2 border border-gold text-gold font-sans font-medium rounded-xs hover:bg-gold/10 transition-colors cursor-pointer"
            >
              Sign Verification Token
            </button>
          </div>
        )}

        {status === 'signing' && (
          <div className="flex items-center space-x-2 pt-4">
            <span className="animate-spin text-gold">☯</span>
            <span>Awaiting cryptographic signature verification...</span>
          </div>
        )}

        {status === 'signed' && (
          <div className="pt-4 space-y-4">
            <div className="space-y-1">
              <div className="text-text-muted">Signature Confirmed:</div>
              <div className="text-patina break-all text-xs select-all bg-raised p-3 rounded-xs border border-gold/10">
                {signature}
              </div>
            </div>
            <div className="text-xs text-text-muted flex items-center space-x-2 pt-2">
              <span className="text-patina">✓</span>
              <span>Identity Verified: No.10 X is authenticated.</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
