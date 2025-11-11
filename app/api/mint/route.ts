import { NextRequest, NextResponse } from "next/server";
import { common } from "@faremeter/middleware";
import {
  x402Exact,
  isKnownCluster,
  isKnownSPLToken,
  type KnownCluster,
  type KnownSPLToken,
} from "@faremeter/info/solana";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import {
  keypairIdentity,
  generateSigner,
  publicKey,
} from "@metaplex-foundation/umi";
import {
  create,
  fetchAssetsByOwner,
  fetchCollection,
} from "@metaplex-foundation/mpl-core";
import { fromWeb3JsKeypair } from "@metaplex-foundation/umi-web3js-adapters";
import { Keypair, PublicKey } from "@solana/web3.js";
import Replicate from "replicate";
import axios from "axios";

const PAYTO_ADDRESS = process.env.PAYTO_ADDRESS!;
const FACILITATOR_URL =
  process.env.FAREMETER_FACILITATOR_URL || "https://facilitator.corbits.dev";
const NETWORK = process.env.FAREMETER_NETWORK || "devnet";
const ASSET = process.env.ASSET || "USDC";
const AMOUNT = process.env.PAYMENT_AMOUNT || "1000";
const GROQ_API_KEY = process.env.GROQ_API_KEY!;

if (!isKnownCluster(NETWORK)) {
  throw new Error(
    `Invalid FAREMETER_NETWORK: ${NETWORK}. Must be devnet, testnet, or mainnet-beta`
  );
}

if (!isKnownSPLToken(ASSET)) {
  throw new Error(`Invalid ASSET: ${ASSET}. Must be USDC`);
}

// if (!GROQ_API_KEY) {
//   throw new Error("GROQ_API_KEY environment variable is required");
// }

const network = NETWORK as KnownCluster;
const asset = ASSET as KnownSPLToken;

const { getPaymentRequiredResponse } =
  common.createPaymentRequiredResponseCache();

// Collection template for generating varied NFTs
const collectionTemplate = {
  collectionPrompt:
    "A cinematic portrait of an AI agent, ultra-detailed, futuristic, digital art style",
  environments: [
    "in a neon-lit cityscape",
    "inside a glowing data tunnel",
    "in a futuristic control room",
    "floating among shattered pixels",
    "under electric rain",
    "surrounded by holographic code streams",
    "within a quantum server core",
    "standing before a digital cathedral",
    "inside a holographic lab",
    "emerging from the void of cyberspace",
  ],
  styles: [
    "glitch art aesthetic",
    "blue neon lighting",
    "purple holographic tones",
    "chrome reflection finish",
    "soft cinematic blur",
    "fractured mirror composition",
    "electric fractal overlay",
    "hyperreal lens flare",
    "data-particle dispersion",
    "vaporwave pastel mood",
  ],
};

// Upload image to Pinata IPFS
async function uploadToPinata(imageUrl: string, prompt: string) {
  try {
    console.log("⬇️ Downloading image:", imageUrl);
    const response = await axios.get(imageUrl, { responseType: "arraybuffer" });
    const buffer = Buffer.from(response.data);

    // Upload image to Pinata
    const formData = new FormData();
    const blob = new Blob([buffer], { type: "image/png" });
    formData.append("file", blob, "nft-image.png");

    console.log("⬆️ Uploading image to Pinata...");
    const imageUpload = await fetch(
      "https://api.pinata.cloud/pinning/pinFileToIPFS",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.PINATA_JWT}`,
        },
        body: formData,
      }
    );

    if (!imageUpload.ok) {
      throw new Error(`Pinata image upload failed: ${imageUpload.statusText}`);
    }

    const imageData = await imageUpload.json();
    const imageCid = imageData.IpfsHash;
    console.log("✅ Image uploaded to IPFS:", imageCid);

    // Create and upload metadata
    const metadata = {
      name: `PixlAgent #${Date.now()}`,
      description: prompt,
      image: `ipfs://${imageCid}`,
      attributes: [
        {
          trait_type: "Generation",
          value: "AI Generated",
        },
        {
          trait_type: "Style",
          value: prompt.split(",").slice(-1)[0].trim(),
        },
      ],
    };

    console.log("⬆️ Uploading metadata to Pinata...");
    const metadataUpload = await fetch(
      "https://api.pinata.cloud/pinning/pinJSONToIPFS",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.PINATA_JWT}`,
        },
        body: JSON.stringify(metadata),
      }
    );

    if (!metadataUpload.ok) {
      throw new Error(
        `Pinata metadata upload failed: ${metadataUpload.statusText}`
      );
    }

    const metadataData = await metadataUpload.json();
    const metadataCid = metadataData.IpfsHash;
    console.log("✅ Metadata uploaded to IPFS:", metadataCid);

    return {
      imageUri: `ipfs://${imageCid}`,
      metadataUri: `ipfs://${metadataCid}`,
    };
  } catch (error) {
    console.error("❌ IPFS upload error:", error);
    throw error;
  }
}

// Generate image using Replicate
async function generateImage(prompt: string): Promise<string> {
  const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN!,
  });

  console.log("🎨 Generating image with prompt:", prompt);

  const output: any = await replicate.run("ideogram-ai/ideogram-v3-turbo", {
    input: {
      prompt,
      aspect_ratio: "3:2",
    },
  });

  // Handle different output formats
  if (Array.isArray(output) && output.length > 0) {
    return output[0];
  }

  if (typeof output === "string") {
    return output;
  }

  if (output?.url) {
    return typeof output.url === "function" ? output.url() : output.url;
  }

  throw new Error("Unexpected Replicate output format");
}

// Mint NFT to collection and transfer to user
async function mintNFTToUser(
  metadataUri: string,
  userWallet: string,
  name: string
) {
  try {
    // Initialize Umi with agent's keypair
    const agentSecretKey = JSON.parse(process.env.AGENT_PRIVATE_KEY!);
    const agentKeypair = Keypair.fromSecretKey(Uint8Array.from(agentSecretKey));

    const umi = createUmi(process.env.NEXT_PUBLIC_SOLANA_RPC!);
    const umiKeypair = fromWeb3JsKeypair(agentKeypair);
    umi.use(keypairIdentity(umiKeypair));

    // Collection address from your backend
    const collectionAddress = publicKey(process.env.COLLECTION_ADDRESS!);

    // Fetch the collection to get the full object
    // const collection = await fetchCollection(umi, collectionAddress);

    // Generate NFT signer
    const assetSigner = generateSigner(umi);

    console.log("🪙 Minting NFT to collection...");
    console.log("Collection:", collectionAddress);
    console.log("Asset:", assetSigner.publicKey);
    console.log("Owner (User):", userWallet);

    // Mint NFT directly to user's wallet
    const result = await create(umi, {
      asset: assetSigner,
      // collection: collection,
      name: name,
      uri: metadataUri,
      owner: publicKey(userWallet), // Mint directly to user
    }).sendAndConfirm(umi);

    console.log("✅ NFT minted and transferred!");
    console.log("Transaction:", result.signature.toString());
    console.log("NFT Address:", assetSigner.publicKey.toString());

    return {
      nftAddress: assetSigner.publicKey.toString(),
      signature: result.signature.toString(),
    };
  } catch (error) {
    console.error("❌ Minting error:", error);
    throw error;
  }
}

export async function POST(req: NextRequest) {
  const headers: Record<string, string> = {};
  req.headers.forEach((value, key) => {
    headers[key.toLowerCase()] = value;
  });

  const url = new URL(req.url);
  const resource = url.toString();

  let paymentResponse: { status: number; body: any } | undefined;

  const paymentRequirements = x402Exact({
    network,
    asset,
    amount: AMOUNT,
    payTo: PAYTO_ADDRESS,
  });

  const accepts = paymentRequirements.map((req) => ({
    ...req,
    resource,
    description: "Access to protected API endpoint",
    mimeType: "application/json",
  }));

  const middlewareResponse = await common.handleMiddlewareRequest({
    facilitatorURL: FACILITATOR_URL,
    accepts,
    resource,
    getPaymentRequiredResponse,
    getHeader: (key: string) => headers[key.toLowerCase()] || headers[key],
    sendJSONResponse: (status: number, body: any) => {
      paymentResponse = { status, body };
      return body;
    },
  });

  if (middlewareResponse || paymentResponse) {
    return NextResponse.json(paymentResponse!.body, {
      status: paymentResponse!.status,
    });
  }

  try {
    const body = await req.json();
    const { userWallet } = body;

    if (!userWallet) {
      return NextResponse.json(
        { error: "User wallet address is required" },
        { status: 400 }
      );
    }

    // Validate wallet address
    try {
      new PublicKey(userWallet);
    } catch {
      return NextResponse.json(
        { error: "Invalid Solana wallet address" },
        { status: 400 }
      );
    }

    // Step 1: Generate random prompt
    const randomEnv =
      collectionTemplate.environments[
        Math.floor(Math.random() * collectionTemplate.environments.length)
      ];
    const randomStyle =
      collectionTemplate.styles[
        Math.floor(Math.random() * collectionTemplate.styles.length)
      ];
    const finalPrompt = `${collectionTemplate.collectionPrompt}, ${randomEnv}, ${randomStyle}`;

    console.log("🎨 Final Prompt:", finalPrompt);

    // Step 2: Generate image
    const imageUrl = await generateImage(finalPrompt);
    console.log("✅ Image generated:", imageUrl);

    // Step 3: Upload to IPFS
    const { imageUri, metadataUri } = await uploadToPinata(
      imageUrl,
      finalPrompt
    );

    // Step 4: Mint NFT to user's wallet
    const nftName = `PixlAgent #${Date.now()}`;
    const { nftAddress, signature } = await mintNFTToUser(
      metadataUri,
      userWallet,
      nftName
    );

    return NextResponse.json({
      success: true,
      nftAddress,
      signature,
      imageUrl,
      imageUri,
      metadataUri,
      prompt: finalPrompt,
      name: nftName,
    });
  } catch (error: any) {
    console.error("❌ Mint API error:", error);
    return NextResponse.json(
      {
        error: error.message || "Failed to mint NFT",
        details: error.toString(),
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const userWallet = searchParams.get("wallet");

    if (!userWallet) {
      return NextResponse.json(
        { error: "Wallet address is required" },
        { status: 400 }
      );
    }

    // Validate wallet address
    try {
      new PublicKey(userWallet);
    } catch {
      return NextResponse.json(
        { error: "Invalid Solana wallet address" },
        { status: 400 }
      );
    }

    // Initialize Umi
    const agentSecretKey = JSON.parse(process.env.AGENT_PRIVATE_KEY!);
    const agentKeypair = Keypair.fromSecretKey(Uint8Array.from(agentSecretKey));

    const umi = createUmi(process.env.NEXT_PUBLIC_SOLANA_RPC!);
    umi.use(keypairIdentity(fromWeb3JsKeypair(agentKeypair)));

    console.log("🔍 Fetching NFTs for wallet:", userWallet);

    // ✅ Fetch ALL Core assets owned by wallet
    const assets = await fetchAssetsByOwner(umi, publicKey(userWallet));

    console.log(`✅ ${assets.length} total Core assets found`);

    // ✅ Format NFTs and load metadata
    const nfts = await Promise.all(
      assets.map(async (asset) => {
        try {
          // Fetch metadata JSON from IPFS or HTTPS
          let metadata: any = {};
          if (asset.uri) {
            const url = asset.uri.startsWith("ipfs://")
              ? asset.uri.replace(
                  "ipfs://",
                  "https://gateway.pinata.cloud/ipfs/"
                )
              : asset.uri;

            const res = await fetch(url);
            metadata = await res.json();
          }

          return {
            address: asset.publicKey.toString(),
            name: asset.name,
            uri: asset.uri,
            image: metadata.image
              ? metadata.image.replace(
                  "ipfs://",
                  "https://gateway.pinata.cloud/ipfs/"
                )
              : null,
            description: metadata.description || null,
            attributes: metadata.attributes || null,
          };
        } catch (err) {
          console.error(
            "Metadata fetch failed for",
            asset.publicKey.toString(),
            err
          );
          return {
            address: asset.publicKey.toString(),
            name: asset.name,
            uri: asset.uri,
          };
        }
      })
    );

    return NextResponse.json({
      success: true,
      count: nfts.length,
      nfts,
    });
  } catch (error: any) {
    console.error("❌ Get NFTs error:", error);
    return NextResponse.json(
      {
        error: error.message || "Failed to fetch NFTs",
        details: error.toString(),
      },
      { status: 500 }
    );
  }
}
