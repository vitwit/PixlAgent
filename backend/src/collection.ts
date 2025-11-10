import fs from "fs";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { keypairIdentity } from "@metaplex-foundation/umi";
import { Keypair } from "@solana/web3.js";
import { createCollection, fetchCollection } from "@metaplex-foundation/mpl-core";
import { generateSigner } from "@metaplex-foundation/umi";
import { config } from "./config";
import { fromWeb3JsKeypair } from "@metaplex-foundation/umi-web3js-adapters";

const secretKey = JSON.parse(fs.readFileSync(config.keyPair, "utf8"));
const web3Keypair = Keypair.fromSecretKey(Uint8Array.from(secretKey));

const umi = createUmi(config.solanaRpc);
const umiKeypair = fromWeb3JsKeypair(web3Keypair);
umi.use(keypairIdentity(umiKeypair));

const COLLECTION_FILE = "./src/data/collection.json";

const initCollection = async () => {
    if (fs.existsSync(COLLECTION_FILE)) {
        console.log(
            `❌ Collection already exists. Delete ${COLLECTION_FILE} to recreate.`
        );
        return;
    }

    const collectionSigner = generateSigner(umi);

    console.log("🪩 Creating collection...");
    const result = await createCollection(umi, {
        collection: collectionSigner,
        name: "PixlAgent – AI Generated Collection",
        uri: "https://your-domain.com/pixlagent-collection.json",
        updateAuthority: umi.identity.publicKey,
    }).sendAndConfirm(umi);

    console.log("✅ Transaction confirmed:", result.signature.toString());

    // Wait for finalization
    await new Promise((r) => setTimeout(r, 10000));

    const collection = await fetchCollection(umi, collectionSigner.publicKey);
    console.log("✅ Collection created:", collectionSigner.publicKey.toString());

    // Store collection details
    const data = {
        collectionAddress: collectionSigner.publicKey.toString(),
        updateAuthority: umi.identity.publicKey.toString(),
        name: collection.name,
        uri: collection.uri,
        createdAt: new Date().toISOString(),
    };

    fs.writeFileSync(COLLECTION_FILE, JSON.stringify(data, null, 2));
    console.log(`📁 Collection details saved to ${COLLECTION_FILE}`);
};

initCollection().catch((err) => console.error("err =", err));
