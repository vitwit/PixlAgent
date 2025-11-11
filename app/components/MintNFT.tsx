"use client";

import { useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { createFareMeterClient } from "../lib/faremeter-client";

interface MintResponse {
  success: boolean;
  nftAddress: string;
  signature: string;
  imageUrl: string;
  metadataUri: string;
  prompt: string;
  name: string;
}

export default function MintNFT() {
  const { publicKey } = useWallet();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<MintResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleMint = async () => {
    if (!publicKey) {
      setError("Please connect your wallet first");
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const fetchWithPayment = await createFareMeterClient();
      const response = await fetchWithPayment("/api/mint", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userWallet: publicKey.toString(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to mint NFT");
      }

      setResult(data);
    } catch (err: any) {
      setError(err.message || "An error occurred while minting");
      console.error("Mint error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-white mb-2">
          Generate & Mint Your NFT
        </h2>
        <p className="text-gray-400 text-sm">
          Click the button below to generate a unique AI artwork and mint it to
          your wallet
        </p>
      </div>

      {/* Mint Button */}
      <div className="flex justify-center">
        <button
          onClick={handleMint}
          disabled={loading}
          className="bg-[#6366f1] hover:bg-[#5558e3] disabled:bg-[#3a3b5a] disabled:cursor-not-allowed text-white font-medium py-3 px-8 rounded-lg transition-all"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Generating & Minting...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <span>🎨</span>
              Mint NFT
            </span>
          )}
        </button>
      </div>

      {/* Loading Status */}
      {loading && (
        <div className="bg-[#1a1b35] border border-[#252640] rounded-lg p-6">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-[#6366f1] rounded-full animate-pulse" />
              <p className="text-gray-300 text-sm">Generating AI artwork...</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-[#6366f1] rounded-full animate-pulse" />
              <p className="text-gray-300 text-sm">Uploading to IPFS...</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-[#6366f1] rounded-full animate-pulse" />
              <p className="text-gray-300 text-sm">
                Minting NFT to your wallet...
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Error Display */}
      {error && (
        <div className="bg-[#2d1a1a] border border-[#4a2626] rounded-lg p-6">
          <div className="flex items-start gap-3">
            <span className="text-2xl">⚠️</span>
            <div>
              <h3 className="text-red-400 font-medium mb-1">Error</h3>
              <p className="text-red-300 text-sm">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Success Display */}
      {result && (
        <div className="space-y-4">
          <div className="bg-[#1a2d1a] border border-[#264a26] rounded-lg p-6">
            <div className="flex items-start gap-3">
              <span className="text-2xl">✅</span>
              <div>
                <h3 className="text-green-400 font-medium mb-1">
                  NFT Minted Successfully!
                </h3>
                <p className="text-green-300 text-sm">
                  Your NFT has been minted and transferred to your wallet
                </p>
              </div>
            </div>
          </div>

          {/* NFT Preview - Limited Size */}
          <div className="bg-[#1a1b35] border border-[#252640] rounded-lg overflow-hidden max-w-xl mx-auto">
            <div className="aspect-video bg-black relative">
              <img
                src={result.imageUrl}
                alt={result.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6 space-y-4">
              <div>
                <h3 className="text-white font-semibold text-lg mb-2">
                  {result.name}
                </h3>
                <p className="text-gray-400 text-sm">{result.prompt}</p>
              </div>

              <div className="space-y-2 pt-4 border-t border-[#252640]">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">NFT Address:</span>
                  <a
                    href={`https://explorer.solana.com/address/${result.nftAddress}?cluster=devnet`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#6366f1] hover:text-[#5558e3] font-mono text-xs transition-colors"
                  >
                    {result.nftAddress.slice(0, 8)}...
                    {result.nftAddress.slice(-8)}
                  </a>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Transaction:</span>
                  <a
                    href={`https://explorer.solana.com/tx/${result.signature}?cluster=devnet`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#6366f1] hover:text-[#5558e3] font-mono text-xs transition-colors"
                  >
                    {result.signature.slice(0, 8)}...
                    {result.signature.slice(-8)}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Info Box */}
      {!loading && !result && (
        <div className="bg-[#1a1b35] border border-[#252640] rounded-lg p-6">
          <h3 className="text-white font-medium mb-3 text-sm">How it works</h3>
          <ul className="text-gray-400 space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-[#6366f1]">•</span>
              <span>
                Our AI generates a unique artwork based on random parameters
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#6366f1]">•</span>
              <span>The image is uploaded to IPFS for permanent storage</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#6366f1]">•</span>
              <span>An NFT is minted to the PixlAgent collection</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#6366f1]">•</span>
              <span>The NFT is transferred directly to your wallet</span>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
