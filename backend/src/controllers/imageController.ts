import { Request, Response } from "express";
import Replicate from "replicate";
import { config } from "../config";
import { uploadToIPFS } from "../utils/ipfs";
import { expectPayment } from "../agents/paymentAgent";
import { mintToCollection } from "../solana/mintNFT";
import { collectionTemplate } from "../config/collection";

const replicate = new Replicate({ auth: config.replicateToken });

export const generateAndMintNFT = async (req: Request, res: Response) => {
  const xPaymentHeader = req.header("X-Payment");

  // Step 1: Require payment
  if (!xPaymentHeader) {
    return res.status(402).json({
      payment: {
        recipient: config.x402.publicKey,
        mint: config.x402.usdcMint,
        amount: config.x402.priceUsdc * 1e6,
        network: "solana-devnet",
      },
    });
  }

  try {
    // Step 2: Verify x402 payment
    const paymentData = JSON.parse(
      Buffer.from(xPaymentHeader, "base64").toString("utf-8")
    );
    const txSignature = await expectPayment(paymentData.payload.serializedTransaction);

    // Step 3: Random environment + style
    const env =
      collectionTemplate.environments[
      Math.floor(Math.random() * collectionTemplate.environments.length)
      ];
    const style =
      collectionTemplate.styles[
      Math.floor(Math.random() * collectionTemplate.styles.length)
      ];

    const finalPrompt = `${collectionTemplate.collectionPrompt}, ${env}, ${style}`;
    console.log("🎨 Final Prompt:", finalPrompt);

    // Step 4: Generate image via Replicate
    const input = { prompt: finalPrompt, aspect_ratio: "3:2" };
    const output = await replicate.run("ideogram-ai/ideogram-v3-turbo", { input });
    const imageUrl = output?.[0] || output?.url || output;
    console.log("✅ Image generated:", imageUrl);

    // Step 5: Upload to IPFS
    const ipfsCid = await uploadToIPFS(imageUrl);

    // Step 6: Mint NFT to collection
    const nftAddress = await mintToCollection(ipfsCid, finalPrompt);

    res.json({
      success: true,
      tx: txSignature,
      image: imageUrl,
      ipfs: ipfsCid,
      nft: nftAddress,
      prompt: finalPrompt,
    });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
};
