"use client";

import { useEffect, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import MintNFT from "./components/MintNFT";
import ViewNFTs from "./components/ViewNFTs";
import { Connection, PublicKey } from "@solana/web3.js";
import { getAssociatedTokenAddress, getAccount } from "@solana/spl-token";
import Link from "next/link";

const USDC_MINT = new PublicKey("4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU");

export default function Home() {
  const { connected, publicKey } = useWallet();
  const [activeTab, setActiveTab] = useState<"mint" | "view">("mint");

  const [solBalance, setSolBalance] = useState("0");
  const [usdcBalance, setUsdcBalance] = useState("0");

  useEffect(() => {
    if (!publicKey) return;
    const connection = new Connection("https://api.devnet.solana.com");

    const fetchBalances = async () => {
      const lamports = await connection.getBalance(publicKey);
      setSolBalance((lamports / 1e9).toFixed(4));

      try {
        const ata = await getAssociatedTokenAddress(USDC_MINT, publicKey);
        const tokenAcc = await getAccount(connection, ata);
        setUsdcBalance((Number(tokenAcc.amount) / 1e6).toFixed(2));
      } catch {
        setUsdcBalance("0");
      }
    };

    fetchBalances();
  }, [publicKey]);

  return (
    <div className="min-h-screen bg-[#0a0b1e] relative">
      {/* Header */}
      <header className="border-b border-[#1e1f3a] bg-[#0f1023]">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-[#6366f1] rounded-lg flex items-center justify-center">
                <span className="text-xl">🤖</span>
              </div>
              <div>
                <h1 className="text-xl font-semibold text-white">PixlAgent</h1>
                <p className="text-xs text-gray-400">
                  AI-Generated NFT Collection
                </p>
              </div>
            </div>

            <div className="flex gap-6 items-center">
              {connected && (
                <div className="flex gap-6 text-sm">
                  <div className="text-gray-300">
                    <span className="text-gray-500">SOL:</span>{" "}
                    <span className="font-medium text-white">{solBalance}</span>
                  </div>
                  <div className="text-gray-300">
                    <span className="text-gray-500">USDC:</span>{" "}
                    <span className="font-medium text-white">
                      {usdcBalance}
                    </span>
                  </div>
                </div>
              )}
              <WalletMultiButton
                style={{
                  backgroundColor: "#6366f1",
                  color: "white",
                  padding: "8px 16px",
                  borderRadius: "8px",
                  fontSize: "0.875rem", // text-sm
                  fontWeight: 500, // font-medium
                  transition: "background-color 0.2s ease",
                }}
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12 pb-32">
        {!connected ? (
          <div className="max-w-2xl mx-auto">
            <div className="bg-[#13142b] border border-[#1e1f3a] rounded-xl p-12 text-center">
              <div className="w-20 h-20 mx-auto mb-6 bg-[#1a1b35] rounded-2xl flex items-center justify-center">
                <span className="text-4xl">🎨</span>
              </div>
              <h2 className="text-3xl font-semibold text-white mb-4">
                Welcome to PixlAgent
              </h2>
              <p className="text-gray-400 mb-8 text-base leading-relaxed">
                Generate unique AI-powered NFTs and mint them directly to your
                wallet. Each NFT is a one-of-a-kind digital artwork created by
                advanced AI.
              </p>
              <div className="bg-[#1a1b35] border border-[#252640] rounded-lg p-6 mb-8">
                <h3 className="text-white font-medium mb-4 text-left">
                  Features
                </h3>
                <ul className="text-gray-400 space-y-3 text-left text-sm">
                  <li className="flex items-center gap-3">
                    <span className="text-[#6366f1]">•</span>
                    AI-generated unique artwork
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-[#6366f1]">•</span>
                    Instant minting to your wallet
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-[#6366f1]">•</span>
                    Diverse styles and environments
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-[#6366f1]">•</span>
                    Part of exclusive collection
                  </li>
                </ul>
              </div>
              <WalletMultiButton
                style={{
                  backgroundColor: "#6366f1",
                  color: "white",
                  padding: "8px 16px",
                  borderRadius: "8px",
                  fontSize: "0.875rem", // text-sm
                  fontWeight: 500, // font-medium
                  transition: "background-color 0.2s ease",
                }}
              />
            </div>
          </div>
        ) : (
          <div className="max-w-5xl mx-auto">
            {/* Tabs */}
            <div className="flex gap-3 mb-8">
              <button
                onClick={() => setActiveTab("mint")}
                className={`flex-1 py-3 px-6 rounded-lg font-medium transition-all text-sm ${
                  activeTab === "mint"
                    ? "bg-[#6366f1] text-white"
                    : "bg-[#13142b] text-gray-400 hover:bg-[#1a1b35] border border-[#1e1f3a]"
                }`}
              >
                🎨 Mint NFT
              </button>
              <button
                onClick={() => setActiveTab("view")}
                className={`flex-1 py-3 px-6 rounded-lg font-medium transition-all text-sm ${
                  activeTab === "view"
                    ? "bg-[#6366f1] text-white"
                    : "bg-[#13142b] text-gray-400 hover:bg-[#1a1b35] border border-[#1e1f3a]"
                }`}
              >
                🖼️ My NFTs
              </button>
            </div>

            {/* Content */}
            <div className="bg-[#13142b] border border-[#1e1f3a] rounded-xl p-8">
              {activeTab === "mint" ? <MintNFT /> : <ViewNFTs />}
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-[#1e1f3a] bg-[#0f1023] fixed bottom-0 left-0 right-0">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <p className="text-gray-500 text-sm">
            PixlAgent. Powered by AI & Solana Blockchain
          </p>
          <div className="flex gap-6 text-sm text-gray-500">
            <Link
              href="/pitch-deck"
              className="hover:text-gray-300 transition-colors"
            >
              View Pitch Deck
            </Link>
            <Link
              href="https://github.com/vitwit/pixlAgent"
              target="_blank"
              className="hover:text-gray-300 transition-colors"
            >
              Github
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
