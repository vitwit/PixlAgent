import { motion } from "framer-motion";
import { Wallet, Coins, Image as ImageIcon, Upload, Stamp, Eye } from "lucide-react";

export default function HowItWorksPage() {
    const steps = [
        {
            icon: <Wallet className="w-10 h-10 text-indigo-400" />,
            title: "Connect Wallet",
            desc: "Securely link your Solana wallet to start.",
        },
        {
            icon: <Coins className="w-10 h-10 text-indigo-400" />,
            title: "Pay via x402",
            desc: "Complete a trustless micropayment using x402.",
        },
        {
            icon: <ImageIcon className="w-10 h-10 text-indigo-400" />,
            title: "Generate Image",
            desc: "PixlAgent creates your unique AI artwork.",
        },
        {
            icon: <Upload className="w-10 h-10 text-indigo-400" />,
            title: "Upload to IPFS",
            desc: "Your image is securely stored on decentralized IPFS.",
        },
        {
            icon: <Stamp className="w-10 h-10 text-indigo-400" />,
            title: "Mint NFT",
            desc: "Mint your image as an NFT in a verified Solana collection.",
        },
        {
            icon: <Eye className="w-10 h-10 text-indigo-400" />,
            title: "View on Solana",
            desc: "View your NFT and metadata on Solana explorer.",
        },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-950 to-black text-white flex flex-col items-center px-6 py-20">
            <motion.h1
                className="text-5xl font-bold mb-4 text-center bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                How It Works
            </motion.h1>

            <motion.p
                className="text-gray-400 mb-16 text-center max-w-2xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
            >
                A simple, trustless flow to generate and own your AI art on Solana.
            </motion.p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl">
                {steps.map((step, i) => (
                    <motion.div
                        key={i}
                        className="bg-gray-900/50 border border-gray-800 rounded-2xl p-8 text-center hover:border-indigo-500 transition-all"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.15 }}
                    >
                        <div className="flex justify-center mb-4">{step.icon}</div>
                        <h2 className="text-xl font-semibold mb-2">{step.title}</h2>
                        <p className="text-gray-400 text-sm">{step.desc}</p>
                    </motion.div>
                ))}
            </div>

            <motion.button
                className="mt-16 px-8 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-xl text-white font-semibold transition-all"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                disabled
            >
                Get Started
            </motion.button>
        </div>
    );
}
