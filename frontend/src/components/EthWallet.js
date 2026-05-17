import React, { useState } from "react";
import { Clipboard } from "lucide-react";

function EthWalletDisplay({ wallet }) {
  const [copied, setCopied] = useState(false);

  const shortWallet =
    wallet?.length > 8
      ? `${wallet.slice(0, 6)}...${wallet.slice(-4)}`
      : wallet;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(wallet);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Ошибка копирования:", err);
    }
  };

  return (
    <div className="eth-wallet-wrapper" title={wallet}>
      <span className="eth-wallet-text">{shortWallet}</span>
      <button className="copy-btn" onClick={handleCopy}>
        <Clipboard size={16} />
      </button>
      {copied && <span className="copy-hint">Copied!</span>}
    </div>
  );
}

export default EthWalletDisplay;
