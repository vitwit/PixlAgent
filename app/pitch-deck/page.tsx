"use client";

import { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Zap,
  DollarSign,
  Brain,
  Rocket,
  Image,
  Wallet,
  Shield,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";

export default function PitchDeck() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 0,
      title: "PixlAgent",
      content: (
        <div className="flex flex-col items-center justify-center h-full text-center">
          <div className="text-[120px] mb-6">🎨</div>
          <h1
            className="text-6xl font-bold mb-4"
            style={{
              background:
                "linear-gradient(to right, #6366f1, #818cf8, #a5b4fc)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            PixlAgent
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mb-8">
            AI-powered NFT creator that generates unique artwork, uploads to
            IPFS, mints on Solana, and transfers directly to your wallet.
          </p>

          <div className="flex gap-10 mt-6">
            <div className="flex items-center gap-3 text-[#6366f1]">
              <Brain size={36} />
              <span className="text-xl font-semibold">AI Generated</span>
            </div>
            <div className="flex items-center gap-3 text-[#8b5cf6]">
              <Zap size={36} />
              <span className="text-xl font-semibold">Instant Minting</span>
            </div>
            <div className="flex items-center gap-3 text-green-400">
              <DollarSign size={36} />
              <span className="text-xl font-semibold">Micro-Payments</span>
            </div>
          </div>
        </div>
      ),
    },

    {
      id: 1,
      title: "The Problem",
      content: (
        <div className="space-y-8">
          <h2 className="text-5xl font-bold text-white">The Problem ❌</h2>

          <div className="space-y-6">
            <div className="bg-[#1a1b35] border border-[#252640] p-6 rounded-xl border-l-4 border-red-500">
              <h3 className="text-2xl font-semibold text-red-300 mb-2">
                Hard to Create NFTs
              </h3>
              <p className="text-gray-400 text-lg">
                Most users lack design skills and on-chain knowledge to mint
                NFTs.
              </p>
            </div>

            <div className="bg-[#1a1b35] border border-[#252640] p-6 rounded-xl border-l-4 border-yellow-400">
              <h3 className="text-2xl font-semibold text-yellow-200 mb-2">
                Complex On-Chain Process
              </h3>
              <p className="text-gray-400 text-lg">
                IPFS uploads, NFT metadata, minting, and transfers are
                technical.
              </p>
            </div>

            <div className="bg-[#1a1b35] border border-[#252640] p-6 rounded-xl border-l-4 border-blue-400">
              <h3 className="text-2xl font-semibold text-blue-200 mb-2">
                Expensive & Time-Consuming
              </h3>
              <p className="text-gray-400 text-lg">
                Most NFT creation tools are costly and slow.
              </p>
            </div>
          </div>
        </div>
      ),
    },

    {
      id: 2,
      title: "Our Solution",
      content: (
        <div>
          <h2 className="text-5xl font-bold text-white mb-8">
            Our Solution ✅
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#1a1b35] border border-[#252640] p-8 rounded-xl text-center">
              <div className="text-6xl mb-4">🤖</div>
              <h3 className="text-2xl font-semibold text-[#6366f1] mb-2">
                AI-Generated Artwork
              </h3>
              <p className="text-gray-400">
                Every NFT is one-of-a-kind, created instantly with Replicate AI.
              </p>
            </div>

            <div className="bg-[#1a1b35] border border-[#252640] p-8 rounded-xl text-center">
              <div className="text-6xl mb-4">🧾</div>
              <h3 className="text-2xl font-semibold text-[#6366f1] mb-2">
                IPFS Storage
              </h3>
              <p className="text-gray-400">
                Metadata & image stored permanently via Pinata.
              </p>
            </div>

            <div className="bg-[#1a1b35] border border-[#252640] p-8 rounded-xl text-center">
              <div className="text-6xl mb-4">⚡</div>
              <h3 className="text-2xl font-semibold text-[#6366f1] mb-2">
                One-Click Mint
              </h3>
              <p className="text-gray-400">
                NFT minted on Solana and transferred to your wallet
                automatically.
              </p>
            </div>

            <div className="bg-[#1a1b35] border border-[#252640] p-8 rounded-xl text-center">
              <div className="text-6xl mb-4">💰</div>
              <h3 className="text-2xl font-semibold text-[#6366f1] mb-2">
                Micro-Payments
              </h3>
              <p className="text-gray-400">
                Only 0.001 USDC per mint using FareMeter.
              </p>
            </div>
          </div>
        </div>
      ),
    },

    {
      id: 3,
      title: "How It Works",
      content: (
        <div>
          <h2 className="text-5xl font-bold text-white mb-12">
            How It Works 🔥
          </h2>

          <div className="space-y-6">
            {[
              { num: 1, icon: Wallet, text: "Connect Phantom Wallet" },
              {
                num: 2,
                icon: Brain,
                text: "Click Mint – AI generates artwork",
              },
              { num: 3, icon: DollarSign, text: "Make tiny USDC payment" },
              { num: 4, icon: Shield, text: "Image uploaded to IPFS" },
              { num: 5, icon: Rocket, text: "NFT minted & sent to wallet" },
            ].map(({ num, icon: Icon, text }) => (
              <div
                key={num}
                className="flex items-center gap-6 bg-[#13142b] p-6 rounded-xl border border-[#1e1f3a]"
              >
                <div className="bg-[#6366f1] w-12 h-12 rounded-full flex items-center justify-center font-bold text-white">
                  {num}
                </div>
                <Icon className="text-[#6366f1]" size={30} />
                <p className="text-gray-300 text-xl">{text}</p>
              </div>
            ))}
          </div>
        </div>
      ),
    },

    {
      id: 4,
      title: "Tech Stack",
      content: (
        <div className="space-y-6">
          <h2 className="text-5xl font-bold text-white">Tech Stack 🧩</h2>

          <div className="space-y-4">
            <div className="bg-[#13142b] border border-[#1e1f3a] p-6 rounded-xl">
              <h3 className="text-[#6366f1] text-2xl font-semibold">
                Frontend
              </h3>
              <p className="text-gray-400">
                Next.js 14, React, TypeScript, Tailwind
              </p>
            </div>

            <div className="bg-[#13142b] border border-[#1e1f3a] p-6 rounded-xl">
              <h3 className="text-[#6366f1] text-2xl font-semibold">
                Blockchain
              </h3>
              <p className="text-gray-400">
                Solana Web3.js, Phantom Wallet, SPL Token
              </p>
            </div>

            <div className="bg-[#13142b] border border-[#1e1f3a] p-6 rounded-xl">
              <h3 className="text-[#6366f1] text-2xl font-semibold">
                AI + Storage
              </h3>
              <p className="text-gray-400">Replicate API, Pinata IPFS</p>
            </div>

            <div className="bg-[#13142b] border border-[#1e1f3a] p-6 rounded-xl">
              <h3 className="text-[#6366f1] text-2xl font-semibold">
                Payments
              </h3>
              <p className="text-gray-400">FareMeter micro-payments, USDC</p>
            </div>
          </div>
        </div>
      ),
    },

    {
      id: 5,
      title: "Business Model",
      content: (
        <div className="space-y-8">
          <h2 className="text-5xl font-bold text-white">Business Model 💰</h2>

          <div className="space-y-6">
            <div className="bg-[#13142b] border border-[#1e1f3a] p-6 rounded-xl">
              <h3 className="text-xl text-[#6366f1] font-semibold">
                Pay-Per-Mint
              </h3>
              <p className="text-gray-400 text-lg">
                Users pay only 0.001 USDC per NFT minted — cheap & scalable.
              </p>
            </div>

            <div className="bg-[#13142b] border border-[#1e1f3a] p-6 rounded-xl">
              <h3 className="text-xl text-[#6366f1] font-semibold">
                No Subscriptions
              </h3>
              <p className="text-gray-400 text-lg">
                Actual usage = actual cost.
              </p>
            </div>

            <div className="bg-[#13142b] border border-[#1e1f3a] p-6 rounded-xl">
              <h3 className="text-xl text-[#6366f1] font-semibold">
                Scales Globally
              </h3>
              <p className="text-gray-400 text-lg">
                Anyone with a Phantom wallet can mint.
              </p>
            </div>
          </div>
        </div>
      ),
    },

    {
      id: 6,
      title: "Roadmap",
      content: (
        <div className="space-y-6">
          <h2 className="text-5xl font-bold text-white">Roadmap 🚀</h2>

          <div className="space-y-4">
            <div className="bg-[#13142b] border border-[#1e1f3a] p-6 rounded-xl border-l-4 border-[#6366f1]">
              <h3 className="text-xl text-[#6366f1] font-semibold">
                Mainnet Launch
              </h3>
              <p className="text-gray-400">
                Deploy PixlAgent to Solana mainnet
              </p>
            </div>

            <div className="bg-[#13142b] border border-[#1e1f3a] p-6 rounded-xl border-l-4 border-green-400">
              <h3 className="text-xl text-green-400 font-semibold">
                Custom Prompted Artwork
              </h3>
              <p className="text-gray-400">
                Users will enter text prompts to influence NFT generation
              </p>
            </div>

            <div className="bg-[#13142b] border border-[#1e1f3a] p-6 rounded-xl border-l-4 border-blue-400">
              <h3 className="text-xl text-blue-400 font-semibold">
                Full NFT Marketplace
              </h3>
              <p className="text-gray-400">
                Trade minted NFTs directly inside the app
              </p>
            </div>

            <div className="bg-[#13142b] border border-[#1e1f3a] p-6 rounded-xl border-l-4 border-yellow-400">
              <h3 className="text-xl text-yellow-400 font-semibold">
                Batch Minting
              </h3>
              <p className="text-gray-400">
                Mint multiple NFTs in one transaction
              </p>
            </div>
          </div>
        </div>
      ),
    },
  ];

  const nextSlide = () => setCurrentSlide((prev) => prev + 1);
  const prevSlide = () => setCurrentSlide((prev) => prev - 1);

  // keyboard navigation
  useEffect(() => {
    const handleKey = (e: any) => {
      if (e.key === "ArrowRight" && currentSlide < slides.length - 1)
        nextSlide();
      if (e.key === "ArrowLeft" && currentSlide > 0) prevSlide();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [currentSlide]);

  return (
    <div className="min-h-screen bg-[#0a0b1e] flex flex-col">
      <Link
        href="/"
        className="absolute top-6 left-6 bg-[#13142b] border border-[#1e1f3a] p-3 rounded-lg text-gray-300 hover:bg-[#1a1b35] transition"
      >
        <ChevronLeft size={20} className="inline mr-2" /> Home
      </Link>

      {/* Slide */}
      <div className="flex-1 flex items-center justify-center px-6 py-20">
        <div className="w-full max-w-5xl bg-[#13142b] border border-[#1e1f3a] rounded-2xl p-10 shadow-xl min-h-[550px] flex items-center justify-center">
          {slides[currentSlide].content}
        </div>
      </div>

      {/* Controls */}
      <div className="pb-10 flex items-center justify-between max-w-5xl mx-auto w-full px-6">
        <button
          onClick={prevSlide}
          disabled={currentSlide === 0}
          className={`p-4 rounded-full ${
            currentSlide === 0
              ? "bg-[#1a1b35] text-gray-500 cursor-not-allowed"
              : "bg-[#1a1b35] text-white hover:bg-[#23243f]"
          }`}
        >
          <ChevronLeft size={26} />
        </button>

        <div className="flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`h-3 rounded-full transition ${
                currentSlide === i ? "bg-[#6366f1] w-10" : "bg-gray-600 w-3"
              }`}
            />
          ))}
        </div>

        <button
          onClick={nextSlide}
          disabled={currentSlide === slides.length - 1}
          className={`p-4 rounded-full ${
            currentSlide === slides.length - 1
              ? "bg-[#1a1b35] text-gray-500 cursor-not-allowed"
              : "bg-[#1a1b35] text-white hover:bg-[#23243f]"
          }`}
        >
          <ChevronRight size={26} />
        </button>
      </div>

      <p className="text-center text-gray-500 text-sm pb-6">
        Slide {currentSlide + 1} / {slides.length}
      </p>
    </div>
  );
}
