import React from "react";
import { motion } from "framer-motion";

export const LandingPage: React.FC = () => {
    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-950 via-gray-900 to-black text-gray-100">

            {/* Hero Section */}
            <main className="flex flex-1 flex-col items-center justify-center text-center px-2">
                <motion.h2
                    className="text-4xl md:text-6xl font-extrabold mb-4 bg-gradient-to-r from-indigo-400 to-pink-500 bg-clip-text text-transparent"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    Build, Trade & Mint AI-Generated Art
                </motion.h2>

                <motion.p
                    className="max-w-2xl text-lg text-gray-400 mb-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                >
                    PixlAgent is a trustless AI image generation economy powered by Solana and x402 micropayments. Create stunning visuals, mint NFTs, and earn autonomously.
                </motion.p>

                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
                    <a href="/mint" className="bg-indigo-600 text-white px-6 py-3 rounded-xl text-lg font-semibold shadow-lg hover:bg-indigo-700">
                        Launch PixlAgent App
                    </a>
                </motion.div>
            </main>

            {/* Features Section */}
            <section id="features" className="py-20 bg-gray-900 border-t border-gray-800">
                <div className="max-w-5xl mx-auto px-6 text-center">
                    <h3 className="text-2xl font-bold mb-8 text-indigo-400">Key Features</h3>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                title: "AI Image Generation",
                                desc: "Generate art using advanced AI models hosted on Replicate.",
                            },
                            {
                                title: "Trustless Payments",
                                desc: "x402 protocol enables agent-to-agent micropayments on Solana.",
                            },
                            {
                                title: "NFT Minting",
                                desc: "Mint your creations as NFTs and store them securely on-chain.",
                            },
                        ].map((f) => (
                            <div key={f.title} className="p-6 border border-gray-800 rounded-2xl shadow-sm hover:shadow-indigo-900/30 transition bg-gray-950/50">
                                <h4 className="text-lg font-semibold mb-2 text-indigo-300">{f.title}</h4>
                                <p className="text-gray-400 text-sm">{f.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

        </div>
    );
};

export default LandingPage;