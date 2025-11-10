import { useState } from "react";
import { motion } from "framer-motion";
import { Wallet } from "lucide-react";

export default function MintPage() {
    const [walletConnected, setWalletConnected] = useState(false);

    const connectWallet = async () => {
        try {
            // Placeholder for Solana wallet connect logic (e.g., window.solana.connect())
            setWalletConnected(true);
        } catch (err) {
            console.error("Wallet connection failed:", err);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-900 via-gray-950 to-black text-white px-6 py-20">
            <motion.h1
                className="text-4xl sm:text-5xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                Mint Your AI NFT
            </motion.h1>

            {!walletConnected ? (
                <motion.div
                    className="flex flex-col items-center gap-4 mt-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                >
                    <Wallet className="w-16 h-16 text-indigo-400" />
                    <p className="text-gray-400 text-center max-w-md">
                        Connect your Solana wallet to start generating and minting your AI artwork.
                    </p>
                    <button
                        onClick={connectWallet}
                        className="mt-4 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-xl text-white font-semibold transition-all"
                    >
                        Connect Wallet
                    </button>
                </motion.div>
            ) : (
                <motion.div
                    className="text-center mt-10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                >
                    <p className="text-gray-400 mb-4">Wallet connected ✅</p>
                    <button className="px-8 py-3 bg-purple-600 hover:bg-purple-700 rounded-xl text-white font-semibold transition-all">
                        Mint NFT
                    </button>
                </motion.div>
            )}
        </div>
    );
}
