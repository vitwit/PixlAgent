"use client";

import { useState, useEffect } from "react";
import { useWallet } from "@solana/wallet-adapter-react";

interface NFT {
  address: string;
  name: string;
  image?: string;
  description?: string;
  attributes?: Array<{ trait_type: string; value: string }>;
  uri: string;
}

export default function ViewNFTs() {
  const { publicKey } = useWallet();
  const [nfts, setNfts] = useState<NFT[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (publicKey) {
      fetchNFTs();
    }
  }, [publicKey]);

  const fetchNFTs = async () => {
    if (!publicKey) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/mint?wallet=${publicKey.toString()}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch NFTs");
      }

      setNfts(data.nfts || []);
    } catch (err: any) {
      setError(err.message || "An error occurred while fetching NFTs");
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block">
          <svg
            className="animate-spin h-12 w-12 text-[#6366f1]"
            viewBox="0 0 24 24"
          >
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
        </div>
        <p className="text-gray-400 mt-4">Loading your NFTs...</p>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="bg-red-900/30 border border-red-500/30 rounded-xl p-6">
        <div className="flex items-start gap-3">
          <span className="text-2xl">⚠️</span>
          <div>
            <h3 className="text-red-300 font-semibold mb-1">Error</h3>
            <p className="text-red-200">{error}</p>
            <button
              onClick={fetchNFTs}
              className="mt-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (nfts.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-20 h-20 mx-auto mb-6 bg-[#1a1b35] rounded-2xl flex items-center justify-center">
          <span className="text-4xl">🎨</span>
        </div>
        <h3 className="text-white text-xl font-semibold mb-2">No NFTs Yet</h3>
        <p className="text-gray-400 mb-6 text-sm">
          You don't have any PixlAgent NFTs in your wallet yet.
        </p>
        <button className="bg-[#6366f1] hover:bg-[#5558e3] text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors">
          Refresh
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold text-white mb-2">
            Your NFT Collection
          </h2>
          <p className="text-gray-400 text-sm">
            You own {nfts.length} PixlAgent NFT{nfts.length !== 1 ? "s" : ""}
          </p>
        </div>
        <button className="bg-[#1a1b35] hover:bg-[#252640] text-gray-300 px-4 py-2 rounded-lg flex items-center gap-2 text-sm border border-[#252640] transition-colors">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
          Refresh
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {nfts.map((nft) => (
          <div
            key={nft.address}
            className="bg-[#1a1b35] border border-[#252640] rounded-lg overflow-hidden hover:border-[#3a3b5a] transition-all"
          >
            <div className="aspect-square bg-black relative">
              {nft.image ? (
                <img
                  src={nft.image}
                  alt={nft.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-6xl">🎨</span>
                </div>
              )}
            </div>
            <div className="p-4 space-y-3">
              <div>
                <h3 className="text-white font-semibold text-base mb-1">
                  {nft.name}
                </h3>
                {nft.description && (
                  <p className="text-gray-400 text-sm line-clamp-2">
                    {nft.description}
                  </p>
                )}
              </div>

              {nft.attributes && nft.attributes.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {nft.attributes.map((attr, idx) => (
                    <div
                      key={idx}
                      className="bg-[#13142b] border border-[#252640] rounded px-2 py-1"
                    >
                      <p className="text-xs text-gray-500">{attr.trait_type}</p>
                      <p className="text-xs text-white font-medium">
                        {attr.value}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              <div className="pt-3 border-t border-[#252640]">
                <a
                  href={`https://explorer.solana.com/address/${nft.address}?cluster=devnet`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#6366f1] hover:text-[#5558e3] text-sm flex items-center gap-2 transition-colors"
                >
                  <span>View on Explorer</span>
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
