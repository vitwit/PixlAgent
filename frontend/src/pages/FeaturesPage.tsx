import React from "react";
import { motion } from "framer-motion";

const features = [
    {
        title: "AI-Powered Creativity",
        desc: "Generate unique, high-quality visuals using the ideogram-ai/ideogram-v3-turbo model from Replicate.",
        icon: "🎨",
    },
    {
        title: "x402 Micropayments",
        desc: "Enable agent-to-agent trustless payments for each AI image generation request.",
        icon: "⚡",
    },
    {
        title: "IPFS Storage",
        desc: "Securely store generated images on IPFS for decentralized access and permanence.",
        icon: "🗂️",
    },
    {
        title: "NFT Minting",
        desc: "Mint AI-generated artworks as NFTs directly on Solana and own them forever.",
        icon: "🪙",
    },
    {
        title: "Solana Integration",
        desc: "Harness the speed and scalability of Solana Devnet for instant transactions.",
        icon: "🔗",
    },
    {
        title: "Trustless Agent Economy",
        desc: "Create, verify, and trade digital assets autonomously through AI-powered agents.",
        icon: "🤖",
    },
];

export const FeaturesPage: React.FC = () => {
    return (
        <main className="max-w-6xl mx-auto px-6 py-20">
            <motion.h2
                className="text-4xl font-extrabold mb-12 text-center bg-gradient-to-r from-indigo-400 to-pink-500 bg-clip-text text-transparent"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                Powerful Features for AI Agents & Creators
            </motion.h2>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {features.map((f, idx) => (
                    <motion.div
                        key={f.title}
                        className="p-6 border border-gray-800 rounded-2xl bg-gray-950/40 shadow-sm hover:shadow-indigo-900/40 transition"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1, duration: 0.4 }}
                    >
                        <div className="text-3xl mb-3">{f.icon}</div>
                        <h3 className="text-xl font-semibold text-indigo-300 mb-2">{f.title}</h3>
                        <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
                    </motion.div>
                ))}
            </div>
        </main>
    );
};

export default FeaturesPage;
