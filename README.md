# PixlAgent – AI NFT Generator 🎨✨

## Live Demo: *[https://pixl-agent-ten.vercel.app/](https://pixl-agent-ten.vercel.app/)*

PixlAgent is a fully on-chain AI NFT generator and minting DApp built on Solana.
Users pay a tiny micro-fee in USDC using FareMeter, and PixlAgent automatically generates a unique AI artwork, uploads it to IPFS, mints an NFT, and transfers it directly to the user’s wallet.

---

## 🌟 Features

✅ **AI-Generated Art** – each NFT is unique

✅ **Fully On-Chain Minting** – token minted and transferred to your wallet

✅ **IPFS Storage** – permanent decentralized image + metadata

✅ **Micro-Payments with FareMeter** – pay only per mint

✅ **Phantom Wallet Integration**

✅ **Professional UI with Dark Theme**

✅ **Works on Solana Devnet**

---

## 🏗️ Tech Stack

| Component           | Technology                                 |
| ------------------- | ------------------------------------------ |
| Frontend            | Next.js 14 (App Router), React, TypeScript |
| Wallet              | Phantom, Solana Wallet Adapter             |
| Blockchain          | Solana Web3.js, SPL Token, Metaplex        |
| Payments            | FareMeter (pay-per-mint)                   |
| AI Image Generation | Replicate API                              |
| Storage             | Pinata IPFS                                |
| Styling             | TailwindCSS                                |

---

## 📋 Prerequisites

Before running the project, install:

✅ Node.js 18+

✅ Phantom Wallet (browser extension)

✅ Git

---

## 🚀 Setup Instructions

### 1. Clone Repo

```bash
git clone <repo-url>
cd pixl-agent
```

### 2. Install dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Create `.env.local`

Create a new `.env.local` file in the root folder and add:

```properties
# Your Solana wallet address that will receive payments
PAYTO_ADDRESS=your_solana_wallet_address_here

# FareMeter Configuration
FAREMETER_FACILITATOR_URL=https://facilitator.corbits.dev
FAREMETER_NETWORK=devnet

# Payment Configuration
ASSET=USDC
PAYMENT_AMOUNT=1000  # 0.001 USDC (6 decimals)


# IPFS Upload (Pinata)
PINATA_JWT=your_pinata_jwt_here

# Replicate AI Model Token (for image generation)
REPLICATE_API_TOKEN=your_replicate_api_token_here

# Private key of the NFT minting agent in array format
AGENT_PRIVATE_KEY=<solana private key json>

# Solana RPC endpoint
NEXT_PUBLIC_SOLANA_RPC=https://api.devnet.solana.com
```

✅ If using your own wallet as the receiver, replace `PAYTO_ADDRESS` with your Phantom public key.

---

## 🔑 Get Required API Keys

| Key                     | Where to get it                                                                      |
| ----------------------- | ------------------------------------------------------------------------------------ |
| **PINATA_JWT**          | [https://www.pinata.cloud](https://www.pinata.cloud)                                 |
| **REPLICATE_API_TOKEN** | [https://replicate.com/account/api-tokens](https://replicate.com/account/api-tokens) |
| **PAYTO_ADDRESS**       | Your Phantom wallet (Devnet)                                                         |

---

## 🧪 Configure Phantom for Devnet

1. Install Phantom extension
2. Open settings → **Developer Settings**
3. Set **Network: Devnet**

---

## 💰 Get Free Devnet Tokens

✅ **Devnet USDC:** [https://faucet.circle.com](https://faucet.circle.com)
✅ **Devnet SOL:** [https://faucet.solana.com](https://faucet.solana.com)

You need:

* A small amount of SOL (for fees)
* 0.001+ USDC per mint

---

## ▶️ Run the Development Server

```bash
npm run dev
```

Open your browser:

➡️ [http://localhost:3000](http://localhost:3000)

---

## 💡 How to Use

1. Connect Phantom wallet (Devnet)
2. Get free Devnet SOL + USDC
3. Go to **Mint NFT**
4. Approve micro-payment in Phantom (0.001 USDC)
5. NFT is generated, uploaded to IPFS, minted to your wallet
6. View all owned NFTs in **My NFTs** tab

---

## 📁 Project Structure

```
├── app/
│   ├── page.tsx                # Main UI
│   ├── api/
│   │   └── mint/route.ts       # Minting API + FareMeter middleware
├── components/
│   ├── MintNFT.tsx             # Frontend mint UI
│   └── ViewNFTs.tsx            # NFT gallery UI
├── lib/
│   └── faremeter-client.ts     # FareMeter payment integration
├── public/
├── .env.local
└── package.json
```

---

## 🔁 What Happens During Mint?

✔ Generates AI image using Replicate
✔ Uploads image + metadata JSON to IPFS using Pinata
✔ Creates NFT mint via agent private key
✔ Sends NFT to user's wallet
✔ All paid for via FareMeter micro transaction

---

## ❗ Troubleshooting

| Issue                       | Fix                                   |
| --------------------------- | ------------------------------------- |
| Phantom not connecting      | Refresh page after installing Phantom |
| "Insufficient USDC"         | Get USDC from Circle faucet           |
| NFT doesn't show in gallery | Check Phantom is on Devnet + refresh  |
| Payment fails               | Ensure USDC & SOL balances > 0        |

---
