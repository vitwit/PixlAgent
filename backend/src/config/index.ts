import dotenv from 'dotenv';
dotenv.config();

export const config = {
    port: process.env.PORT || 3000,
    solanaRpc: process.env.SOLANA_RPC!,
    solanaKey: process.env.SOLANA_PRIVATE_KEY!,
    ipfs: {
        projectId: process.env.IPFS_PROJECT_ID!,
        projectSecret: process.env.IPFS_PROJECT_SECRET!
    },
    x402ApiKey: process.env.X402_API_KEY!,
    replicateToken: process.env.REPLICATE_API_TOKEN!,
    ipfsApiUrl: process.env.IPFS_API_URL!,
    keyPair: process.env.KEYPAIR_PATH!,
};
